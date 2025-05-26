import { z } from "zod"

// User Schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  phone: z.string().optional(),
  role: z.enum(["student", "admin", "counselor", "parent", "college_rep"]),
  avatar: z.string().url().optional(),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  preferences: z.record(z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// College Schema
export const CollegeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(200),
  slug: z.string(),
  description: z.string(),
  logo: z.string().url().optional(),
  images: z.array(z.string().url()),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string().default("India"),
    pincode: z.string(),
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
  }),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    website: z.string().url().optional(),
  }),
  type: z.enum(["government", "private", "deemed", "autonomous"]),
  category: z.enum(["engineering", "medical", "management", "arts", "science", "law", "other"]),
  accreditation: z.array(z.string()),
  rankings: z.array(
    z.object({
      agency: z.string(),
      rank: z.number(),
      year: z.number(),
      category: z.string().optional(),
    }),
  ),
  facilities: z.array(z.string()),
  fees: z.object({
    tuition: z.object({
      min: z.number(),
      max: z.number(),
      currency: z.string().default("INR"),
    }),
    hostel: z
      .object({
        min: z.number(),
        max: z.number(),
        currency: z.string().default("INR"),
      })
      .optional(),
    other: z.number().optional(),
  }),
  admissions: z.object({
    process: z.string(),
    eligibility: z.array(z.string()),
    exams: z.array(z.string()),
    deadlines: z.array(
      z.object({
        type: z.string(),
        date: z.date(),
      }),
    ),
  }),
  stats: z.object({
    totalStudents: z.number().optional(),
    facultyCount: z.number().optional(),
    placementRate: z.number().min(0).max(100).optional(),
    averagePackage: z.number().optional(),
  }),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Course Schema
export const CourseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(200),
  slug: z.string(),
  description: z.string(),
  collegeId: z.string().uuid(),
  category: z.string(),
  degree: z.enum(["diploma", "undergraduate", "postgraduate", "doctoral"]),
  duration: z.object({
    years: z.number(),
    months: z.number().optional(),
  }),
  eligibility: z.array(z.string()),
  curriculum: z.array(
    z.object({
      semester: z.number(),
      subjects: z.array(z.string()),
    }),
  ),
  fees: z.object({
    total: z.number(),
    perYear: z.number(),
    currency: z.string().default("INR"),
  }),
  seats: z.object({
    total: z.number(),
    reserved: z.record(z.number()).optional(),
  }),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Application Schema
export const ApplicationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  collegeId: z.string().uuid(),
  courseId: z.string().uuid(),
  status: z.enum(["draft", "submitted", "under_review", "accepted", "rejected", "waitlisted"]),
  documents: z.array(
    z.object({
      type: z.string(),
      url: z.string().url(),
      verified: z.boolean().default(false),
    }),
  ),
  personalInfo: z.object({
    academicRecords: z.array(
      z.object({
        level: z.string(),
        institution: z.string(),
        percentage: z.number(),
        year: z.number(),
      }),
    ),
    examScores: z.array(
      z.object({
        exam: z.string(),
        score: z.number(),
        percentile: z.number().optional(),
        year: z.number(),
      }),
    ),
    extracurricular: z.array(z.string()).optional(),
  }),
  submittedAt: z.date().optional(),
  reviewedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Payment Schema
export const PaymentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  orderId: z.string(),
  paymentId: z.string().optional(),
  amount: z.number(),
  currency: z.string().default("INR"),
  status: z.enum(["pending", "completed", "failed", "refunded"]),
  gateway: z.string().default("razorpay"),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Lead Schema
export const LeadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string(),
  course: z.string(),
  location: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  source: z.string(),
  status: z.enum(["new", "contacted", "qualified", "converted", "lost"]),
  score: z.number().min(0).max(100).default(0),
  assignedTo: z.string().uuid().optional(),
  notes: z
    .array(
      z.object({
        content: z.string(),
        createdBy: z.string().uuid(),
        createdAt: z.date(),
      }),
    )
    .default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Subscription Schema
export const SubscriptionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  plan: z.enum(["free", "premium", "pro", "enterprise"]),
  status: z.enum(["active", "cancelled", "expired", "trial"]),
  billingCycle: z.enum(["monthly", "yearly"]),
  amount: z.number(),
  currency: z.string().default("INR"),
  startDate: z.date(),
  endDate: z.date(),
  autoRenew: z.boolean().default(true),
  features: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Export types
export type User = z.infer<typeof UserSchema>
export type College = z.infer<typeof CollegeSchema>
export type Course = z.infer<typeof CourseSchema>
export type Application = z.infer<typeof ApplicationSchema>
export type Payment = z.infer<typeof PaymentSchema>
export type Lead = z.infer<typeof LeadSchema>
export type Subscription = z.infer<typeof SubscriptionSchema>
