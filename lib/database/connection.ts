import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Create SQL client
export const sql = neon(process.env.DATABASE_URL)

// Database connection utility
export class DatabaseConnection {
  private static instance: DatabaseConnection
  private sql: any

  private constructor() {
    this.sql = neon(process.env.DATABASE_URL!)
  }

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  async query(text: string, params?: any[]) {
    try {
      return await this.sql(text, params)
    } catch (error) {
      console.error("Database query error:", error)
      throw error
    }
  }

  async transaction(queries: Array<{ text: string; params?: any[] }>) {
    try {
      return await this.sql.transaction(async (tx: any) => {
        const results = []
        for (const query of queries) {
          const result = await tx(query.text, query.params)
          results.push(result)
        }
        return results
      })
    } catch (error) {
      console.error("Database transaction error:", error)
      throw error
    }
  }
}

export default DatabaseConnection.getInstance()
