#!/usr/bin/env node

/**
 * CollegeVaani Database Backup Script (JavaScript version)
 * 
 * This script creates database backups and can upload them to cloud storage
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { logger } = require('../lib/monitoring/logger');
const { config } = require('../lib/config/environment');

// Promisify exec
const execAsync = util.promisify(exec);

// Configuration
const DB_URL = process.env.DATABASE_URL || config.database.url;
const BACKUP_DIR = process.env.BACKUP_DIR || '/var/backups/collegevaani/database';
const REMOTE_BACKUP = process.env.REMOTE_BACKUP === 'true';
const S3_BUCKET = process.env.S3_BUCKET || 'collegevaani-backups';
const KEEP_LOCAL_DAYS = parseInt(process.env.KEEP_LOCAL_DAYS || '7', 10);
const KEEP_REMOTE_DAYS = parseInt(process.env.KEEP_REMOTE_DAYS || '30', 10);

// Parse database URL for connection info
function parseDatabaseUrl(url) {
  const regex = /^postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/;
  const match = url.match(regex);
  
  if (!match) {
    throw new Error('Invalid database URL format');
  }
  
  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: match[4],
    database: match[5]
  };
}

// Ensure backup directory exists
function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    logger.info(`Created backup directory: ${BACKUP_DIR}`);
  }
}

// Create database backup
async function createBackup(timestamp) {
  try {
    const dbInfo = parseDatabaseUrl(DB_URL);
    const backupFile = path.join(BACKUP_DIR, `collegevaani-db-${timestamp}.sql.gz`);
    
    logger.info(`Creating database backup: ${backupFile}`);
    
    // Set environment variables for pg_dump
    const env = {
      ...process.env,
      PGPASSWORD: dbInfo.password,
    };
    
    // Create backup command
    const cmd = `pg_dump -h ${dbInfo.host} -p ${dbInfo.port} -U ${dbInfo.user} -d ${dbInfo.database} -F p | gzip > ${backupFile}`;
    
    await execAsync(cmd, { env });
    
    // Get file size
    const stats = fs.statSync(backupFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    logger.info(`Backup created successfully. Size: ${fileSizeMB} MB`);
    return backupFile;
  } catch (error) {
    logger.error('Backup creation failed', error);
    throw error;
  }
}

// Upload backup to S3
async function uploadToS3(backupFile) {
  if (!REMOTE_BACKUP) {
    logger.info('Remote backup is disabled. Skipping S3 upload.');
    return;
  }
  
  try {
    logger.info(`Uploading backup to S3: s3://${S3_BUCKET}/database/`);
    
    // Upload to S3 using AWS CLI
    const cmd = `aws s3 cp ${backupFile} s3://${S3_BUCKET}/database/`;
    await execAsync(cmd);
    
    logger.info('Backup uploaded to S3 successfully');
  } catch (error) {
    logger.error('S3 upload failed', error);
    // Don't throw, continue with cleanup
  }
}

// Clean up old backups
async function cleanupOldBackups() {
  try {
    logger.info('Cleaning up old backups...');
    
    // Clean up local backups older than KEEP_LOCAL_DAYS
    const cmd = `find ${BACKUP_DIR} -name "collegevaani-db-*.sql.gz" -type f -mtime +${KEEP_LOCAL_DAYS} -delete`;
    await execAsync(cmd);
    
    logger.info(`Local backups older than ${KEEP_LOCAL_DAYS} days deleted`);
    
    // Clean up S3 backups if enabled
    if (REMOTE_BACKUP) {
      await cleanupS3Backups();
    }
  } catch (error) {
    logger.error('Cleanup failed', error);
    // Don't throw, continue execution
  }
}

// Clean up old S3 backups
async function cleanupS3Backups() {
  try {
    logger.info(`Cleaning up old S3 backups older than ${KEEP_REMOTE_DAYS} days`);
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - KEEP_REMOTE_DAYS);
    
    // List objects in S3 bucket
    const listCmd = `aws s3 ls s3://${S3_BUCKET}/database/ --recursive`;
    const { stdout } = await execAsync(listCmd);
    
    // Parse output and find files to delete
    const lines = stdout.split('\n').filter(line => line.includes('collegevaani-db-'));
    
    for (const line of lines) {
      try {
        // Extract file name from S3 list output
        // Format is typically: 2023-04-25 12:34:56    1234 database/collegevaani-db-20230425123456.sql.gz
        const parts = line.trim().split(/\s+/);
        const fileName = parts[parts.length - 1];
        
        // Extract date from filename (format: collegevaani-db-YYYYMMDDHHMMSS.sql.gz)
        const dateMatch = fileName.match(/collegevaani-db-(\d{4})(\d{2})(\d{2})/);
        
        if (!dateMatch) continue;
        
        const year = parseInt(dateMatch[1], 10);
        const month = parseInt(dateMatch[2], 10) - 1; // Months are 0-indexed in JS
        const day = parseInt(dateMatch[3], 10);
        
        const fileDate = new Date(year, month, day);
        
        // Delete if older than cutoff date
        if (fileDate < cutoffDate) {
          logger.info(`Deleting old S3 backup: ${fileName}`);
          await execAsync(`aws s3 rm s3://${S3_BUCKET}/${fileName}`);
        }
      } catch (parseError) {
        logger.error(`Failed to parse S3 file: ${line}`, parseError);
      }
    }
    
    logger.info('S3 backup cleanup completed');
  } catch (error) {
    logger.error('S3 backup cleanup failed', error);
  }
}

// Main function
async function main() {
  const timestamp = new Date().toISOString().replace(/[:.T-]/g, '').slice(0, 14);
  
  try {
    logger.info('Starting database backup process...');
    
    // Ensure backup directory exists
    ensureBackupDir();
    
    // Create backup
    const backupFile = await createBackup(timestamp);
    
    // Upload to S3 if enabled
    await uploadToS3(backupFile);
    
    // Clean up old backups
    await cleanupOldBackups();
    
    logger.info('Backup process completed successfully');
  } catch (error) {
    logger.error('Backup process failed', error);
    process.exit(1);
  }
}

// Run main function
main().catch(error => {
  logger.error('Fatal error in backup script', error);
  process.exit(1);
}); 