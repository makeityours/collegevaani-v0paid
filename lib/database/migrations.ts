import { DatabaseConnection } from './connection'
import { ErrorLogger } from '@/lib/errors/error-handler'

/**
 * Migration schema to track database versions
 */
interface Migration {
  id: number;
  name: string;
  up: string;
  down: string;
}

/**
 * Database migrations manager
 */
export class MigrationManager {
  private db: DatabaseConnection;

  constructor() {
    this.db = DatabaseConnection.getInstance();
  }

  /**
   * Initialize migrations table if it doesn't exist
   */
  async initMigrationsTable(): Promise<void> {
    try {
      await this.db.query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          applied_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
    } catch (error) {
      ErrorLogger.log(error as Error, { context: 'initMigrationsTable' });
      throw new Error('Failed to initialize migrations table');
    }
  }

  /**
   * Get all migrations that have been applied
   */
  async getAppliedMigrations(): Promise<string[]> {
    try {
      const result = await this.db.query(`
        SELECT name FROM migrations ORDER BY id ASC
      `);
      return result.map((row: { name: string }) => row.name);
    } catch (error) {
      ErrorLogger.log(error as Error, { context: 'getAppliedMigrations' });
      throw new Error('Failed to get applied migrations');
    }
  }

  /**
   * Apply a single migration
   */
  async applyMigration(migration: Migration): Promise<void> {
    try {
      // Start a transaction
      await this.db.query('BEGIN');

      // Apply the migration
      await this.db.query(migration.up);

      // Record the migration
      await this.db.query(
        `INSERT INTO migrations (name) VALUES ($1)`,
        [migration.name]
      );

      // Commit the transaction
      await this.db.query('COMMIT');

      console.log(`Migration applied: ${migration.name}`);
    } catch (error) {
      // Rollback on error
      await this.db.query('ROLLBACK');
      ErrorLogger.log(error as Error, { context: 'applyMigration', migration: migration.name });
      throw new Error(`Failed to apply migration ${migration.name}: ${(error as Error).message}`);
    }
  }

  /**
   * Rollback a single migration
   */
  async rollbackMigration(migration: Migration): Promise<void> {
    try {
      // Start a transaction
      await this.db.query('BEGIN');

      // Apply the down migration
      await this.db.query(migration.down);

      // Remove the migration record
      await this.db.query(
        `DELETE FROM migrations WHERE name = $1`,
        [migration.name]
      );

      // Commit the transaction
      await this.db.query('COMMIT');

      console.log(`Migration rolled back: ${migration.name}`);
    } catch (error) {
      // Rollback on error
      await this.db.query('ROLLBACK');
      ErrorLogger.log(error as Error, { context: 'rollbackMigration', migration: migration.name });
      throw new Error(`Failed to rollback migration ${migration.name}: ${(error as Error).message}`);
    }
  }

  /**
   * Run all pending migrations
   */
  async runMigrations(migrations: Migration[]): Promise<void> {
    // Initialize migrations table
    await this.initMigrationsTable();

    // Get applied migrations
    const appliedMigrations = await this.getAppliedMigrations();

    // Filter out migrations that have already been applied
    const pendingMigrations = migrations.filter(
      (migration) => !appliedMigrations.includes(migration.name)
    );

    // Apply pending migrations in order
    for (const migration of pendingMigrations) {
      await this.applyMigration(migration);
    }

    if (pendingMigrations.length === 0) {
      console.log('No pending migrations to apply');
    } else {
      console.log(`Applied ${pendingMigrations.length} migrations`);
    }
  }

  /**
   * Rollback the last applied migration
   */
  async rollbackLastMigration(migrations: Migration[]): Promise<void> {
    // Get applied migrations
    const appliedMigrations = await this.getAppliedMigrations();

    if (appliedMigrations.length === 0) {
      console.log('No migrations to rollback');
      return;
    }

    // Get the last applied migration
    const lastMigrationName = appliedMigrations[appliedMigrations.length - 1];
    const lastMigration = migrations.find(
      (migration) => migration.name === lastMigrationName
    );

    if (!lastMigration) {
      throw new Error(`Migration ${lastMigrationName} not found in migration list`);
    }

    // Rollback the last migration
    await this.rollbackMigration(lastMigration);
  }

  /**
   * Reset the database by rolling back all migrations and then re-applying them
   * WARNING: This will destroy all data in the database
   */
  async resetDatabase(migrations: Migration[]): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot reset database in production environment');
    }

    // Get applied migrations in reverse order
    const appliedMigrations = (await this.getAppliedMigrations()).reverse();

    // Find and rollback all applied migrations
    for (const migrationName of appliedMigrations) {
      const migration = migrations.find(m => m.name === migrationName);
      if (migration) {
        await this.rollbackMigration(migration);
      }
    }

    // Re-apply all migrations
    await this.runMigrations(migrations);
  }
} 