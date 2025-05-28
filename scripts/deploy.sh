#!/bin/bash

# CollegeVaani Production Deployment Script
# This script automates the deployment process on Ubuntu VPS

set -e  # Exit immediately if a command exits with a non-zero status

# Configuration
APP_DIR="/var/www/collegevaani"
BACKUP_DIR="/var/backups/collegevaani"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
LOG_FILE="/var/log/collegevaani/deploy-$TIMESTAMP.log"

# Ensure log directory exists
mkdir -p /var/log/collegevaani

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Error handling
handle_error() {
    log "ERROR: Deployment failed at line $1"
    exit 1
}

trap 'handle_error $LINENO' ERR

# Start deployment
log "Starting deployment process..."

# 1. Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# 2. Backup database
log "Creating database backup..."
pg_dump -U "$DB_USER" -h "$DB_HOST" -d "$DB_NAME" > "$BACKUP_DIR/db-backup-$TIMESTAMP.sql"

# 3. Backup application files
log "Creating application backup..."
if [ -d "$APP_DIR" ]; then
    tar -czf "$BACKUP_DIR/app-backup-$TIMESTAMP.tar.gz" -C "$(dirname "$APP_DIR")" "$(basename "$APP_DIR")"
fi

# 4. Pull latest changes
log "Pulling latest changes..."
cd "$APP_DIR"
git pull origin main

# 5. Install dependencies
log "Installing dependencies..."
npm ci

# 6. Build application
log "Building application..."
npm run build

# 7. Run database migrations
log "Running database migrations..."
npm run db:setup

# 8. Restart services
log "Restarting services..."
# Using PM2 for process management
pm2 reload collegevaani || pm2 start npm --name "collegevaani" -- start

# 9. Reload Nginx
log "Reloading Nginx..."
nginx -t && systemctl reload nginx

# 10. Check application health
log "Checking application health..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health | grep 200 > /dev/null
if [ $? -eq 0 ]; then
    log "Health check passed!"
else
    log "Health check failed! Rolling back..."
    # Rollback logic here if needed
    exit 1
fi

# 11. Clean up old backups (keep last 5)
log "Cleaning up old backups..."
ls -t "$BACKUP_DIR"/db-backup-*.sql | tail -n +6 | xargs -r rm
ls -t "$BACKUP_DIR"/app-backup-*.tar.gz | tail -n +6 | xargs -r rm

log "Deployment completed successfully!"
