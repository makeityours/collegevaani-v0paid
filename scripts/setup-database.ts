#!/usr/bin/env ts-node

/**
 * Database setup script
 * 
 * This script sets up the database schema by running all migrations.
 * It can also be used to reset the database (in development only).
 * 
 * Usage:
 *   npm run db:setup         # Run migrations
 *   npm run db:reset         # Reset database (dev only)
 *   npm run db:rollback      # Rollback last migration
 */

import { runMigrations, rollbackLastMigration, resetDatabase } from '../lib/database/migrations/index';
import { config } from '../lib/config/environment';

// Get command from arguments
const command = process.argv[2] || 'migrate';

async function main() {
  console.log(`Using database: ${config.database.url.split('@')[1]}`);
  
  try {
    switch (command) {
      case 'migrate':
        console.log('Running migrations...');
        await runMigrations();
        console.log('Migrations completed successfully.');
        break;
      
      case 'rollback':
        console.log('Rolling back last migration...');
        await rollbackLastMigration();
        console.log('Rollback completed successfully.');
        break;
      
      case 'reset':
        if (process.env.NODE_ENV === 'production') {
          console.error('Cannot reset database in production environment.');
          process.exit(1);
        }
        
        console.log('WARNING: This will delete all data in the database.');
        console.log('Are you sure you want to continue? (y/N)');
        
        process.stdin.once('data', async (data) => {
          const answer = data.toString().trim().toLowerCase();
          
          if (answer === 'y' || answer === 'yes') {
            console.log('Resetting database...');
            await resetDatabase();
            console.log('Database reset completed successfully.');
          } else {
            console.log('Database reset cancelled.');
          }
          
          process.exit(0);
        });
        
        // Keep process alive for stdin
        return;
      
      default:
        console.error(`Unknown command: ${command}`);
        console.error('Usage: npm run db:setup | db:reset | db:rollback');
        process.exit(1);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run main function
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 