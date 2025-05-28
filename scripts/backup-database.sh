#!/bin/bash

# CollegeVaani Database Backup Script
# This script automates the backup of the database to local storage and optionally to remote storage

set -e  # Exit immediately if a command exits with a non-zero status

# Configuration (override with environment variables)
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-"5432"}
DB_NAME=${DB_NAME:-"collegevaani"}
DB_USER=${DB_USER:-"postgres"}
BACKUP_DIR=${BACKUP_DIR:-"/var/backups/collegevaani/database"}
REMOTE_BACKUP=${REMOTE_BACKUP:-"false"}  # Set to "true" to enable remote backups
S3_BUCKET=${S3_BUCKET:-"collegevaani-backups"}
KEEP_LOCAL_DAYS=${KEEP_LOCAL_DAYS:-"7"}  # Number of days to keep local backups
KEEP_REMOTE_DAYS=${KEEP_REMOTE_DAYS:-"30"}  # Number of days to keep remote backups

# Timestamp for backup files
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_FILE="$BACKUP_DIR/collegevaani-db-$TIMESTAMP.sql.gz"
LOG_FILE="/var/log/collegevaani/backup-$TIMESTAMP.log"

# Ensure directories exist
mkdir -p "$BACKUP_DIR"
mkdir -p "/var/log/collegevaani"

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Error handling
handle_error() {
    log "ERROR: Backup failed at line $1"
    exit 1
}

trap 'handle_error $LINENO' ERR

# Check if required programs are installed
check_dependencies() {
    log "Checking dependencies..."
    if ! command -v pg_dump &> /dev/null; then
        log "pg_dump could not be found. Please install PostgreSQL client."
        exit 1
    fi
    
    if [ "$REMOTE_BACKUP" = "true" ] && ! command -v aws &> /dev/null; then
        log "aws CLI could not be found. Please install AWS CLI for remote backups."
        exit 1
    fi
}

# Create database backup
create_backup() {
    log "Creating database backup: $BACKUP_FILE"
    PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -F p | gzip > "$BACKUP_FILE"
    
    if [ $? -eq 0 ]; then
        log "Backup created successfully. Size: $(du -h "$BACKUP_FILE" | cut -f1)"
    else
        log "Backup failed!"
        exit 1
    fi
}

# Upload backup to S3 (if enabled)
upload_to_s3() {
    if [ "$REMOTE_BACKUP" = "true" ]; then
        log "Uploading backup to S3..."
        aws s3 cp "$BACKUP_FILE" "s3://$S3_BUCKET/database/"
        
        if [ $? -eq 0 ]; then
            log "Backup uploaded to S3 successfully."
        else
            log "S3 upload failed!"
            # Don't exit, continue with cleanup
        fi
    else
        log "Remote backup is disabled. Skipping S3 upload."
    fi
}

# Clean up old backups
cleanup_old_backups() {
    log "Cleaning up old backups..."
    
    # Clean up local backups older than KEEP_LOCAL_DAYS
    find "$BACKUP_DIR" -name "collegevaani-db-*.sql.gz" -type f -mtime +$KEEP_LOCAL_DAYS -delete
    log "Local backups older than $KEEP_LOCAL_DAYS days deleted."
    
    # Clean up remote backups if enabled
    if [ "$REMOTE_BACKUP" = "true" ]; then
        log "Cleaning up old remote backups..."
        # List S3 objects older than KEEP_REMOTE_DAYS and delete them
        aws s3 ls "s3://$S3_BUCKET/database/" --recursive | grep "collegevaani-db-" | awk '{print $4}' | while read -r object; do
            # Extract date from filename (assumes collegevaani-db-YYYYMMDDHHMMSS.sql.gz format)
            filename=$(basename "$object")
            datepart=$(echo "$filename" | grep -o "[0-9]\{14\}")
            
            # Skip if file doesn't match expected format
            if [ -z "$datepart" ]; then
                continue
            fi
            
            # Convert to date for comparison
            filedate=$(date -d "${datepart:0:4}-${datepart:4:2}-${datepart:6:2}" +%s 2>/dev/null)
            
            # Skip if date conversion failed
            if [ -z "$filedate" ]; then
                continue
            fi
            
            # Current date minus KEEP_REMOTE_DAYS
            cutoff=$(date -d "-$KEEP_REMOTE_DAYS days" +%s)
            
            # Delete if older than cutoff
            if [ "$filedate" -lt "$cutoff" ]; then
                log "Deleting old remote backup: $object"
                aws s3 rm "s3://$S3_BUCKET/$object"
            fi
        done
        log "Remote backups older than $KEEP_REMOTE_DAYS days deleted."
    fi
}

# Main function
main() {
    log "Starting database backup process..."
    check_dependencies
    create_backup
    upload_to_s3
    cleanup_old_backups
    log "Backup process completed successfully!"
}

# Execute main function
main 