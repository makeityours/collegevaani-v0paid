import { sql } from "./connection"
import type { User, College, Course, Lead, Subscription, Payment } from "./types"

export class UserModel {
  static async create(userData: Omit<User, "id" | "createdAt" | "updatedAt">) {
    const result = await sql`
      INSERT INTO users (email, password_hash, name, phone, role, avatar, is_verified, is_active, preferences)
      VALUES (${userData.email}, ${userData.passwordHash}, ${userData.name}, ${userData.phone}, ${userData.role}, ${userData.avatar}, ${userData.isVerified}, ${userData.isActive}, ${JSON.stringify(userData.preferences)})
      RETURNING *
    `
    return result[0]
  }

  static async findByEmail(email: string) {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email} AND is_active = true
    `
    return result[0] || null
  }

  static async findById(id: string) {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id} AND is_active = true
    `
    return result[0] || null
  }

  static async update(id: string, updates: Partial<User>) {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = $${Object.keys(updates).indexOf(key) + 2}`)
      .join(", ")

    const result = await sql`
      UPDATE users 
      SET ${sql.unsafe(setClause)}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  }

  static async delete(id: string) {
    await sql`
      UPDATE users SET is_active = false, updated_at = NOW()
      WHERE id = ${id}
    `
  }
}

export class CollegeModel {
  static async create(collegeData: Omit<College, "id" | "createdAt" | "updatedAt">) {
    const result = await sql`
      INSERT INTO colleges (
        name, slug, description, location, state, city, established_year,
        college_type, affiliation, ranking, logo_url, website_url,
        contact_email, contact_phone, admission_process, facilities,
        courses_offered, fees_structure, placement_stats, is_featured, is_active
      )
      VALUES (
        ${collegeData.name}, ${collegeData.slug}, ${collegeData.description},
        ${collegeData.location}, ${collegeData.state}, ${collegeData.city},
        ${collegeData.establishedYear}, ${collegeData.collegeType},
        ${collegeData.affiliation}, ${collegeData.ranking}, ${collegeData.logoUrl},
        ${collegeData.websiteUrl}, ${collegeData.contactEmail}, ${collegeData.contactPhone},
        ${collegeData.admissionProcess}, ${JSON.stringify(collegeData.facilities)},
        ${JSON.stringify(collegeData.coursesOffered)}, ${JSON.stringify(collegeData.feesStructure)},
        ${JSON.stringify(collegeData.placementStats)}, ${collegeData.isFeatured}, ${collegeData.isActive}
      )
      RETURNING *
    `
    return result[0]
  }

  static async findAll(filters: { state?: string; city?: string; type?: string; featured?: boolean } = {}) {
    let query = sql`SELECT * FROM colleges WHERE is_active = true`

    if (filters.state) {
      query = sql`${query} AND state = ${filters.state}`
    }
    if (filters.city) {
      query = sql`${query} AND city = ${filters.city}`
    }
    if (filters.type) {
      query = sql`${query} AND college_type = ${filters.type}`
    }
    if (filters.featured) {
      query = sql`${query} AND is_featured = true`
    }

    query = sql`${query} ORDER BY ranking ASC, name ASC`
    return await query
  }

  static async findBySlug(slug: string) {
    const result = await sql`
      SELECT * FROM colleges WHERE slug = ${slug} AND is_active = true
    `
    return result[0] || null
  }

  static async search(searchTerm: string) {
    const result = await sql`
      SELECT * FROM colleges 
      WHERE (name ILIKE ${"%" + searchTerm + "%"} OR location ILIKE ${"%" + searchTerm + "%"})
      AND is_active = true
      ORDER BY ranking ASC
      LIMIT 20
    `
    return result
  }
}

export class CourseModel {
  static async create(courseData: Omit<Course, "id" | "createdAt" | "updatedAt">) {
    const result = await sql`
      INSERT INTO courses (
        name, slug, description, duration, course_type, field_of_study,
        eligibility_criteria, career_prospects, average_salary_range,
        skills_gained, is_popular, is_active
      )
      VALUES (
        ${courseData.name}, ${courseData.slug}, ${courseData.description},
        ${courseData.duration}, ${courseData.courseType}, ${courseData.fieldOfStudy},
        ${courseData.eligibilityCriteria}, ${courseData.careerProspects},
        ${courseData.averageSalaryRange}, ${JSON.stringify(courseData.skillsGained)},
        ${courseData.isPopular}, ${courseData.isActive}
      )
      RETURNING *
    `
    return result[0]
  }

  static async findAll(filters: { type?: string; field?: string; popular?: boolean } = {}) {
    let query = sql`SELECT * FROM courses WHERE is_active = true`

    if (filters.type) {
      query = sql`${query} AND course_type = ${filters.type}`
    }
    if (filters.field) {
      query = sql`${query} AND field_of_study = ${filters.field}`
    }
    if (filters.popular) {
      query = sql`${query} AND is_popular = true`
    }

    query = sql`${query} ORDER BY name ASC`
    return await query
  }

  static async findBySlug(slug: string) {
    const result = await sql`
      SELECT * FROM courses WHERE slug = ${slug} AND is_active = true
    `
    return result[0] || null
  }
}

export class LeadModel {
  static async create(leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">) {
    const result = await sql`
      INSERT INTO leads (
        name, email, phone, course_interest, college_interest,
        location_preference, budget_range, source, status, lead_score, notes
      )
      VALUES (
        ${leadData.name}, ${leadData.email}, ${leadData.phone},
        ${leadData.courseInterest}, ${leadData.collegeInterest},
        ${leadData.locationPreference}, ${leadData.budgetRange},
        ${leadData.source}, ${leadData.status}, ${leadData.leadScore}, ${leadData.notes}
      )
      RETURNING *
    `
    return result[0]
  }

  static async findAll(filters: { status?: string; assignedTo?: string } = {}) {
    let query = sql`SELECT * FROM leads WHERE 1=1`

    if (filters.status) {
      query = sql`${query} AND status = ${filters.status}`
    }
    if (filters.assignedTo) {
      query = sql`${query} AND assigned_to = ${filters.assignedTo}`
    }

    query = sql`${query} ORDER BY created_at DESC`
    return await query
  }

  static async updateStatus(id: string, status: string, notes?: string) {
    const result = await sql`
      UPDATE leads 
      SET status = ${status}, notes = ${notes || ""}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  }
}

export class SubscriptionModel {
  static async create(subscriptionData: Omit<Subscription, "id" | "createdAt" | "updatedAt">) {
    const result = await sql`
      INSERT INTO subscriptions (
        user_id, plan_name, plan_type, amount, currency, billing_cycle,
        status, razorpay_subscription_id, razorpay_customer_id,
        start_date, end_date, auto_renew
      )
      VALUES (
        ${subscriptionData.userId}, ${subscriptionData.planName}, ${subscriptionData.planType},
        ${subscriptionData.amount}, ${subscriptionData.currency}, ${subscriptionData.billingCycle},
        ${subscriptionData.status}, ${subscriptionData.razorpaySubscriptionId},
        ${subscriptionData.razorpayCustomerId}, ${subscriptionData.startDate},
        ${subscriptionData.endDate}, ${subscriptionData.autoRenew}
      )
      RETURNING *
    `
    return result[0]
  }

  static async findByUserId(userId: string) {
    const result = await sql`
      SELECT * FROM subscriptions 
      WHERE user_id = ${userId} AND status = 'active'
      ORDER BY created_at DESC
      LIMIT 1
    `
    return result[0] || null
  }

  static async updateStatus(id: string, status: string) {
    const result = await sql`
      UPDATE subscriptions 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  }
}

export class PaymentModel {
  static async create(paymentData: Omit<Payment, "id" | "createdAt" | "updatedAt">) {
    const result = await sql`
      INSERT INTO payments (
        user_id, subscription_id, amount, currency, payment_method,
        razorpay_payment_id, razorpay_order_id, razorpay_signature,
        status, payment_date
      )
      VALUES (
        ${paymentData.userId}, ${paymentData.subscriptionId}, ${paymentData.amount},
        ${paymentData.currency}, ${paymentData.paymentMethod}, ${paymentData.razorpayPaymentId},
        ${paymentData.razorpayOrderId}, ${paymentData.razorpaySignature},
        ${paymentData.status}, ${paymentData.paymentDate}
      )
      RETURNING *
    `
    return result[0]
  }

  static async updateStatus(id: string, status: string, paymentId?: string, signature?: string) {
    const result = await sql`
      UPDATE payments 
      SET status = ${status}, 
          razorpay_payment_id = ${paymentId || null},
          razorpay_signature = ${signature || null},
          payment_date = ${status === "completed" ? new Date() : null},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  }

  static async findByOrderId(orderId: string) {
    const result = await sql`
      SELECT * FROM payments WHERE razorpay_order_id = ${orderId}
    `
    return result[0] || null
  }
}

export class AnalyticsModel {
  static async track(eventData: {
    eventType: string
    eventData?: any
    userId?: string
    sessionId?: string
    ipAddress?: string
    userAgent?: string
    pageUrl?: string
    referrer?: string
  }) {
    await sql`
      INSERT INTO analytics (
        event_type, event_data, user_id, session_id,
        ip_address, user_agent, page_url, referrer
      )
      VALUES (
        ${eventData.eventType}, ${JSON.stringify(eventData.eventData || {})},
        ${eventData.userId || null}, ${eventData.sessionId || null},
        ${eventData.ipAddress || null}, ${eventData.userAgent || null},
        ${eventData.pageUrl || null}, ${eventData.referrer || null}
      )
    `
  }

  static async getEventCounts(startDate: Date, endDate: Date) {
    const result = await sql`
      SELECT event_type, COUNT(*) as count
      FROM analytics
      WHERE created_at BETWEEN ${startDate} AND ${endDate}
      GROUP BY event_type
      ORDER BY count DESC
    `
    return result
  }

  static async getPageViews(startDate: Date, endDate: Date) {
    const result = await sql`
      SELECT page_url, COUNT(*) as views
      FROM analytics
      WHERE event_type = 'page_view' 
      AND created_at BETWEEN ${startDate} AND ${endDate}
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 20
    `
    return result
  }
}
