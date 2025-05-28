#!/usr/bin/env node

/**
 * CollegeVaani Scheduled Tasks
 * 
 * This script runs background tasks and scheduled jobs for the application.
 * It is designed to be run by PM2 or a similar process manager.
 */

const { sql } = require('../lib/database/connection');
const { config } = require('../lib/config/environment');
const { logger } = require('../lib/monitoring/logger');

// Track execution time
const startTime = Date.now();

// Main execution function
async function main() {
  try {
    logger.info('Starting scheduled tasks');
    
    // Run tasks in parallel for efficiency
    await Promise.all([
      cleanupExpiredTokens(),
      cleanupOldLogs(),
      pruneUnverifiedAccounts(),
      processSubscriptionRenewals(),
      updateLeadScores(),
      sendReminderEmails(),
    ]);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.info(`Scheduled tasks completed in ${duration}s`);
    
    // Exit cleanly
    process.exit(0);
  } catch (error) {
    logger.error('Error in scheduled tasks', error);
    process.exit(1);
  }
}

/**
 * Clean up expired tokens from the database
 */
async function cleanupExpiredTokens() {
  try {
    logger.info('Cleaning up expired tokens');
    
    // Delete expired refresh tokens
    const refreshResult = await sql`
      DELETE FROM user_refresh_tokens 
      WHERE expires_at < NOW() OR is_revoked = true
    `;
    
    // Delete expired verification tokens
    const verificationResult = await sql`
      DELETE FROM verification_tokens 
      WHERE expires_at < NOW()
    `;
    
    // Delete expired password reset tokens
    const resetResult = await sql`
      DELETE FROM password_reset_tokens 
      WHERE expires_at < NOW()
    `;
    
    logger.info('Token cleanup completed', {
      metadata: {
        refreshTokensRemoved: refreshResult.count,
        verificationTokensRemoved: verificationResult.count,
        resetTokensRemoved: resetResult.count,
      }
    });
  } catch (error) {
    logger.error('Failed to clean up expired tokens', error);
  }
}

/**
 * Clean up old logs from the database
 */
async function cleanupOldLogs() {
  try {
    logger.info('Cleaning up old logs');
    
    // Keep logs for 30 days by default
    const days = process.env.LOG_RETENTION_DAYS || 30;
    
    const result = await sql`
      DELETE FROM system_logs 
      WHERE created_at < NOW() - INTERVAL '${days} days'
    `;
    
    logger.info(`Removed ${result.count} old log entries`);
  } catch (error) {
    logger.error('Failed to clean up old logs', error);
  }
}

/**
 * Prune unverified accounts after a certain period
 */
async function pruneUnverifiedAccounts() {
  try {
    logger.info('Pruning unverified accounts');
    
    // Delete unverified accounts older than 7 days
    const days = process.env.UNVERIFIED_ACCOUNT_RETENTION_DAYS || 7;
    
    const result = await sql`
      DELETE FROM users 
      WHERE is_verified = false 
      AND created_at < NOW() - INTERVAL '${days} days'
    `;
    
    logger.info(`Pruned ${result.count} unverified accounts`);
  } catch (error) {
    logger.error('Failed to prune unverified accounts', error);
  }
}

/**
 * Process subscription renewals
 */
async function processSubscriptionRenewals() {
  try {
    logger.info('Processing subscription renewals');
    
    // Find subscriptions due for renewal in the next 24 hours
    const subscriptions = await sql`
      SELECT id, user_id, plan, billing_cycle, amount, currency
      FROM subscriptions
      WHERE status = 'active'
      AND auto_renew = true
      AND end_date BETWEEN NOW() AND NOW() + INTERVAL '24 hours'
    `;
    
    logger.info(`Found ${subscriptions.length} subscriptions due for renewal`);
    
    // Process each subscription
    for (const subscription of subscriptions) {
      try {
        // Here you would implement the actual renewal logic using your payment gateway
        // This is just a placeholder for the actual implementation
        logger.info(`Processing renewal for subscription ${subscription.id}`);
        
        // Update subscription record
        await sql`
          UPDATE subscriptions
          SET 
            start_date = end_date,
            end_date = CASE 
              WHEN billing_cycle = 'monthly' THEN end_date + INTERVAL '1 month'
              WHEN billing_cycle = 'yearly' THEN end_date + INTERVAL '1 year'
              ELSE end_date + INTERVAL '1 month'
            END,
            updated_at = NOW()
          WHERE id = ${subscription.id}
        `;
      } catch (subError) {
        logger.error(`Failed to process renewal for subscription ${subscription.id}`, subError);
      }
    }
  } catch (error) {
    logger.error('Failed to process subscription renewals', error);
  }
}

/**
 * Update lead scores based on activity and data
 */
async function updateLeadScores() {
  try {
    logger.info('Updating lead scores');
    
    // This is a placeholder for a more sophisticated lead scoring algorithm
    // In a real implementation, you would consider factors like:
    // - Lead age
    // - Interaction history
    // - Profile completeness
    // - Previous conversions
    // - etc.
    
    const result = await sql`
      UPDATE leads
      SET 
        score = CASE
          WHEN status = 'contacted' THEN 40
          WHEN status = 'qualified' THEN 70
          WHEN status = 'new' AND created_at > NOW() - INTERVAL '3 days' THEN 30
          WHEN status = 'new' THEN 20
          ELSE score
        END,
        updated_at = NOW()
      WHERE updated_at < NOW() - INTERVAL '1 day'
    `;
    
    logger.info(`Updated scores for ${result.count} leads`);
  } catch (error) {
    logger.error('Failed to update lead scores', error);
  }
}

/**
 * Send reminder emails for various events
 */
async function sendReminderEmails() {
  try {
    logger.info('Sending reminder emails');
    
    // Send reminders for expiring subscriptions
    const expiringSubscriptions = await sql`
      SELECT s.id, u.email, u.name, s.plan, s.end_date
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.status = 'active' 
      AND s.auto_renew = false
      AND s.end_date BETWEEN NOW() AND NOW() + INTERVAL '7 days'
    `;
    
    logger.info(`Found ${expiringSubscriptions.length} expiring subscriptions to send reminders for`);
    
    // Send reminders for incomplete applications
    const incompleteApplications = await sql`
      SELECT a.id, u.email, u.name, c.name as college_name, co.name as course_name
      FROM applications a
      JOIN users u ON a.user_id = u.id
      JOIN colleges c ON a.college_id = c.id
      JOIN courses co ON a.course_id = co.id
      WHERE a.status = 'draft'
      AND a.updated_at < NOW() - INTERVAL '3 days'
      AND a.updated_at > NOW() - INTERVAL '14 days'
    `;
    
    logger.info(`Found ${incompleteApplications.length} incomplete applications to send reminders for`);
    
    // In a real implementation, you would send actual emails here
    // This is just a placeholder
  } catch (error) {
    logger.error('Failed to send reminder emails', error);
  }
}

// Run the main function
main().catch(error => {
  logger.error('Fatal error in scheduled tasks', error);
  process.exit(1);
}); 