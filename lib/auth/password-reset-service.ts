import crypto from 'crypto'
import { sql } from '@/lib/database/connection'
import { config } from '@/lib/config/environment'
import { logger } from '@/lib/monitoring/logger'
import { NotFoundError, ValidationError } from '@/lib/errors/error-handler'
import { AuthService } from './auth-service'

/**
 * Service for handling password reset processes
 */
export class PasswordResetService {
  /**
   * Generate a password reset token for a user
   */
  static async generateResetToken(email: string): Promise<{ token: string; userId: string } | null> {
    try {
      // First check if user exists
      const userResult = await sql`
        SELECT id, name, email, is_active 
        FROM users 
        WHERE email = ${email} AND is_active = true
      `
      
      if (userResult.length === 0) {
        logger.warn('Password reset requested for non-existent user', {
          metadata: { email }
        })
        return null
      }
      
      const user = userResult[0]
      
      // Generate a random token
      const token = crypto.randomBytes(32).toString('hex')
      const hashedToken = this.hashToken(token)
      
      // Set expiry time - 1 hour from now
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 1)
      
      // Invalidate any existing tokens for this user
      await sql`
        UPDATE password_reset_tokens
        SET is_used = true
        WHERE user_id = ${user.id} AND is_used = false
      `
      
      // Store the new token
      await sql`
        INSERT INTO password_reset_tokens (user_id, token, expires_at)
        VALUES (${user.id}, ${hashedToken}, ${expiresAt})
      `
      
      logger.info('Password reset token generated', {
        metadata: { userId: user.id }
      })
      
      return { token, userId: user.id }
    } catch (error) {
      logger.error('Failed to generate password reset token', error as Error, {
        metadata: { email }
      })
      throw error
    }
  }
  
  /**
   * Validate a password reset token
   */
  static async validateResetToken(userId: string, token: string): Promise<boolean> {
    try {
      const hashedToken = this.hashToken(token)
      
      const result = await sql`
        SELECT id, expires_at
        FROM password_reset_tokens
        WHERE user_id = ${userId} AND token = ${hashedToken} AND is_used = false
      `
      
      if (result.length === 0) {
        return false
      }
      
      const tokenRecord = result[0]
      const expiresAt = new Date(tokenRecord.expires_at)
      
      // Check if token has expired
      if (expiresAt < new Date()) {
        return false
      }
      
      return true
    } catch (error) {
      logger.error('Failed to validate password reset token', error as Error, {
        metadata: { userId }
      })
      return false
    }
  }
  
  /**
   * Reset a user's password using a valid token
   */
  static async resetPassword(userId: string, token: string, newPassword: string): Promise<boolean> {
    try {
      const hashedToken = this.hashToken(token)
      
      // Find the token in the database
      const result = await sql`
        SELECT id, expires_at
        FROM password_reset_tokens
        WHERE user_id = ${userId} AND token = ${hashedToken} AND is_used = false
      `
      
      if (result.length === 0) {
        throw new NotFoundError('Reset token not found or already used')
      }
      
      const tokenRecord = result[0]
      const expiresAt = new Date(tokenRecord.expires_at)
      
      // Check if the token has expired
      if (expiresAt < new Date()) {
        throw new ValidationError('Reset token has expired')
      }
      
      // Hash the new password
      const hashedPassword = await AuthService.hashPassword(newPassword)
      
      // Update the user's password
      await sql`
        UPDATE users
        SET password_hash = ${hashedPassword}, updated_at = NOW()
        WHERE id = ${userId}
      `
      
      // Mark the token as used
      await sql`
        UPDATE password_reset_tokens
        SET is_used = true, used_at = NOW()
        WHERE id = ${tokenRecord.id}
      `
      
      // Revoke all refresh tokens for this user for security
      await sql`
        UPDATE user_refresh_tokens
        SET is_revoked = true
        WHERE user_id = ${userId}
      `
      
      logger.info('Password reset successful', {
        metadata: { userId }
      })
      
      return true
    } catch (error) {
      logger.error('Failed to reset password', error as Error, {
        metadata: { userId }
      })
      throw error
    }
  }
  
  /**
   * Hash a token for secure storage
   */
  private static hashToken(token: string): string {
    return crypto
      .createHash('sha256')
      .update(`${token}${config.auth.jwtSecret}`)
      .digest('hex')
  }
}

/**
 * Migration to create password_reset_tokens table
 * This should be added to the migrations file
 */
export const passwordResetTokensMigration = {
  up: `
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token VARCHAR(255) NOT NULL,
      is_used BOOLEAN DEFAULT false,
      expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
      used_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
    CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
  `,
  down: `
    DROP TABLE IF EXISTS password_reset_tokens;
  `,
} 