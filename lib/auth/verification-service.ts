import crypto from 'crypto'
import { sql } from '@/lib/database/connection'
import { config } from '@/lib/config/environment'
import { logger } from '@/lib/monitoring/logger'
import { NotFoundError, ValidationError } from '@/lib/errors/error-handler'

/**
 * Service for handling user verification processes
 */
export class VerificationService {
  /**
   * Generate a verification token for a user
   */
  static async generateVerificationToken(userId: string): Promise<string> {
    // Generate a random token
    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = this.hashToken(token)
    
    // Set expiry time - 24 hours from now
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)
    
    // Store the token in the database
    try {
      // First, invalidate any existing tokens
      await sql`
        UPDATE verification_tokens
        SET is_used = true
        WHERE user_id = ${userId} AND is_used = false
      `
      
      // Create a new token
      await sql`
        INSERT INTO verification_tokens (user_id, token, expires_at)
        VALUES (${userId}, ${hashedToken}, ${expiresAt})
      `
      
      return token
    } catch (error) {
      logger.error('Failed to generate verification token', error as Error, {
        metadata: { userId }
      })
      throw error
    }
  }
  
  /**
   * Verify a user's email using their verification token
   */
  static async verifyEmail(userId: string, token: string): Promise<void> {
    try {
      const hashedToken = this.hashToken(token)
      
      // Find the token in the database
      const result = await sql`
        SELECT id, expires_at
        FROM verification_tokens
        WHERE user_id = ${userId} AND token = ${hashedToken} AND is_used = false
      `
      
      if (result.length === 0) {
        throw new NotFoundError('Verification token not found or already used')
      }
      
      const tokenRecord = result[0]
      const expiresAt = new Date(tokenRecord.expires_at)
      
      // Check if the token has expired
      if (expiresAt < new Date()) {
        throw new ValidationError('Verification token has expired')
      }
      
      // Mark the token as used
      await sql`
        UPDATE verification_tokens
        SET is_used = true, used_at = NOW()
        WHERE id = ${tokenRecord.id}
      `
      
      // Update the user's verification status
      await sql`
        UPDATE users
        SET is_verified = true, updated_at = NOW()
        WHERE id = ${userId}
      `
      
      logger.info('User email verified successfully', {
        metadata: { userId }
      })
    } catch (error) {
      logger.error('Failed to verify email', error as Error, {
        metadata: { userId }
      })
      throw error
    }
  }
  
  /**
   * Request a new verification email
   */
  static async requestNewVerificationEmail(userId: string): Promise<string> {
    try {
      // Check if the user exists and is not already verified
      const userResult = await sql`
        SELECT is_verified
        FROM users
        WHERE id = ${userId} AND is_active = true
      `
      
      if (userResult.length === 0) {
        throw new NotFoundError('User not found or inactive')
      }
      
      const user = userResult[0]
      
      if (user.is_verified) {
        throw new ValidationError('User is already verified')
      }
      
      // Generate a new verification token
      const token = await this.generateVerificationToken(userId)
      
      return token
    } catch (error) {
      logger.error('Failed to request new verification email', error as Error, {
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
 * Migration to create verification_tokens table
 * This should be added to the migrations file
 */
export const verificationTokensMigration = {
  up: `
    CREATE TABLE IF NOT EXISTS verification_tokens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token VARCHAR(255) NOT NULL,
      is_used BOOLEAN DEFAULT false,
      expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
      used_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    CREATE INDEX idx_verification_tokens_user_id ON verification_tokens(user_id);
    CREATE INDEX idx_verification_tokens_token ON verification_tokens(token);
  `,
  down: `
    DROP TABLE IF EXISTS verification_tokens;
  `,
} 