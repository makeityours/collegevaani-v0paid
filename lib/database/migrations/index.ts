import { MigrationManager } from '../migrations';
import { verificationTokensMigration } from '@/lib/auth/verification-service';
import { passwordResetTokensMigration } from '@/lib/auth/password-reset-service';

/**
 * List of all migrations in order
 */
export const migrations = [
  {
    id: 1,
    name: '001_initial_schema',
    up: `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'student', 'counselor', 'parent', 'college_rep')),
        is_verified BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        avatar VARCHAR(255),
        preferences JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- User refresh tokens table
      CREATE TABLE IF NOT EXISTS user_refresh_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL UNIQUE,
        is_revoked BOOLEAN DEFAULT FALSE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX idx_user_refresh_tokens_user_id ON user_refresh_tokens(user_id);
      CREATE INDEX idx_user_refresh_tokens_token ON user_refresh_tokens(token);
      
      -- Colleges table
      CREATE TABLE IF NOT EXISTS colleges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        logo VARCHAR(255),
        images JSONB DEFAULT '[]',
        location JSONB NOT NULL,
        contact JSONB NOT NULL,
        type VARCHAR(50) NOT NULL CHECK (type IN ('government', 'private', 'deemed', 'autonomous')),
        category VARCHAR(50) NOT NULL,
        accreditation JSONB DEFAULT '[]',
        rankings JSONB DEFAULT '[]',
        facilities JSONB DEFAULT '[]',
        fees JSONB NOT NULL,
        admissions JSONB NOT NULL,
        stats JSONB DEFAULT '{}',
        is_verified BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX idx_colleges_slug ON colleges(slug);
      CREATE INDEX idx_colleges_category ON colleges(category);
      CREATE INDEX idx_colleges_type ON colleges(type);
      
      -- Courses table
      CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        description TEXT,
        college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        category VARCHAR(100) NOT NULL,
        degree VARCHAR(50) NOT NULL CHECK (degree IN ('diploma', 'undergraduate', 'postgraduate', 'doctoral')),
        duration JSONB NOT NULL,
        eligibility JSONB DEFAULT '[]',
        curriculum JSONB DEFAULT '[]',
        fees JSONB NOT NULL,
        seats JSONB NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE (college_id, slug)
      );
      CREATE INDEX idx_courses_college_id ON courses(college_id);
      CREATE INDEX idx_courses_degree ON courses(degree);
      CREATE INDEX idx_courses_category ON courses(category);
      
      -- Applications table
      CREATE TABLE IF NOT EXISTS applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted')),
        documents JSONB DEFAULT '[]',
        personal_info JSONB NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE,
        reviewed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX idx_applications_user_id ON applications(user_id);
      CREATE INDEX idx_applications_college_id ON applications(college_id);
      CREATE INDEX idx_applications_course_id ON applications(course_id);
      CREATE INDEX idx_applications_status ON applications(status);
      
      -- Payments table
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        order_id VARCHAR(255) NOT NULL,
        payment_id VARCHAR(255),
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'INR',
        status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
        gateway VARCHAR(50) NOT NULL DEFAULT 'razorpay',
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX idx_payments_user_id ON payments(user_id);
      CREATE INDEX idx_payments_order_id ON payments(order_id);
      CREATE INDEX idx_payments_payment_id ON payments(payment_id);
      
      -- Leads table
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        course VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        budget VARCHAR(100),
        timeline VARCHAR(100),
        source VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
        score INTEGER DEFAULT 0,
        assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
        notes JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX idx_leads_email ON leads(email);
      CREATE INDEX idx_leads_status ON leads(status);
      CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
      
      -- Subscriptions table
      CREATE TABLE IF NOT EXISTS subscriptions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        plan VARCHAR(50) NOT NULL CHECK (plan IN ('free', 'premium', 'pro', 'enterprise')),
        status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
        billing_cycle VARCHAR(20) NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'INR',
        start_date TIMESTAMP WITH TIME ZONE NOT NULL,
        end_date TIMESTAMP WITH TIME ZONE NOT NULL,
        auto_renew BOOLEAN DEFAULT TRUE,
        features JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
      CREATE INDEX idx_subscriptions_status ON subscriptions(status);
    `,
    down: `
      DROP TABLE IF EXISTS subscriptions;
      DROP TABLE IF EXISTS leads;
      DROP TABLE IF EXISTS payments;
      DROP TABLE IF EXISTS applications;
      DROP TABLE IF EXISTS courses;
      DROP TABLE IF EXISTS colleges;
      DROP TABLE IF EXISTS user_refresh_tokens;
      DROP TABLE IF EXISTS users;
    `,
  },
  {
    id: 2,
    name: '002_verification_tokens',
    ...verificationTokensMigration
  },
  {
    id: 3,
    name: '003_password_reset_tokens',
    ...passwordResetTokensMigration
  },
  // Add more migrations here as the project evolves
];

/**
 * Run migrations
 */
export async function runMigrations(): Promise<void> {
  const migrationManager = new MigrationManager();
  await migrationManager.runMigrations(migrations);
}

/**
 * Rollback last migration
 */
export async function rollbackLastMigration(): Promise<void> {
  const migrationManager = new MigrationManager();
  await migrationManager.rollbackLastMigration(migrations);
}

/**
 * Reset database (development only)
 * WARNING: This will destroy all data
 */
export async function resetDatabase(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot reset database in production environment');
  }
  
  const migrationManager = new MigrationManager();
  await migrationManager.resetDatabase(migrations);
} 