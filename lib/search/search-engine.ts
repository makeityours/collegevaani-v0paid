import { sql } from "@vercel/postgres"

interface SearchFilters {
  query?: string
  location?: string
  type?: string
  fees?: { min?: number; max?: number }
  rating?: number
  facilities?: string[]
  courses?: string[]
}

interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  filters: SearchFilters
  suggestions?: string[]
}

export class SearchEngine {
  // Advanced college search with full-text search
  static async searchColleges(filters: SearchFilters, page = 1, limit = 20): Promise<SearchResult<any>> {
    const offset = (page - 1) * limit
    const whereConditions = ["c.is_active = true"]
    const params: any[] = []
    let paramIndex = 1

    // Full-text search on name and description
    if (filters.query) {
      whereConditions.push(`(
        c.name ILIKE $${paramIndex} OR 
        c.description ILIKE $${paramIndex} OR
        c.location ILIKE $${paramIndex}
      )`)
      params.push(`%${filters.query}%`)
      paramIndex++
    }

    // Location filter
    if (filters.location) {
      whereConditions.push(`(c.city ILIKE $${paramIndex} OR c.state ILIKE $${paramIndex})`)
      params.push(`%${filters.location}%`)
      paramIndex++
    }

    // Type filter
    if (filters.type) {
      whereConditions.push(`c.college_type = $${paramIndex}`)
      params.push(filters.type)
      paramIndex++
    }

    // Fees filter
    if (filters.fees?.min !== undefined) {
      whereConditions.push(`(c.fees_structure->>'min')::numeric >= $${paramIndex}`)
      params.push(filters.fees.min)
      paramIndex++
    }

    if (filters.fees?.max !== undefined) {
      whereConditions.push(`(c.fees_structure->>'max')::numeric <= $${paramIndex}`)
      params.push(filters.fees.max)
      paramIndex++
    }

    // Facilities filter
    if (filters.facilities?.length) {
      whereConditions.push(`c.facilities ?& $${paramIndex}`)
      params.push(filters.facilities)
      paramIndex++
    }

    const whereClause = whereConditions.join(" AND ")

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM colleges c
      WHERE ${whereClause}
    `

    // Get results with ranking
    const searchQuery = `
      SELECT 
        c.*,
        CASE 
          WHEN c.name ILIKE $1 THEN 100
          WHEN c.description ILIKE $1 THEN 50
          ELSE 10
        END as relevance_score
      FROM colleges c
      WHERE ${whereClause}
      ORDER BY 
        c.is_featured DESC,
        relevance_score DESC,
        c.ranking ASC NULLS LAST,
        c.name ASC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `

    params.push(limit, offset)

    try {
      const [countResult, searchResult] = await Promise.all([
        sql.unsafe(countQuery, params.slice(0, -2)),
        sql.unsafe(searchQuery, params),
      ])

      const total = Number.parseInt(countResult[0]?.total || "0")

      // Generate search suggestions
      const suggestions = await this.generateSuggestions(filters.query || "")

      return {
        items: searchResult,
        total,
        page,
        limit,
        filters,
        suggestions,
      }
    } catch (error) {
      console.error("Search error:", error)
      throw new Error("Search failed")
    }
  }

  // Generate search suggestions
  static async generateSuggestions(query: string): Promise<string[]> {
    if (!query || query.length < 2) return []

    try {
      const suggestions = await sql`
        SELECT DISTINCT name
        FROM colleges
        WHERE name ILIKE ${`%${query}%`}
        AND is_active = true
        ORDER BY name
        LIMIT 5
      `

      return suggestions.map((s: any) => s.name)
    } catch (error) {
      console.error("Suggestions error:", error)
      return []
    }
  }

  // Autocomplete for search
  static async autocomplete(query: string, type: "colleges" | "courses" = "colleges"): Promise<string[]> {
    if (!query || query.length < 2) return []

    const table = type === "colleges" ? "colleges" : "courses"

    try {
      const results = await sql.unsafe(
        `
        SELECT name
        FROM ${table}
        WHERE name ILIKE $1
        AND is_active = true
        ORDER BY 
          CASE WHEN name ILIKE $2 THEN 1 ELSE 2 END,
          name
        LIMIT 10
      `,
        [`%${query}%`, `${query}%`],
      )

      return results.map((r: any) => r.name)
    } catch (error) {
      console.error("Autocomplete error:", error)
      return []
    }
  }
}
