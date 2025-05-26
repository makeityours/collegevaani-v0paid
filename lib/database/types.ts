export interface User {
  id: string
  email: string
  passwordHash: string
  name: string
  phone?: string
  role: "student" | "admin" | "counselor" | "parent" | "college_rep"
  avatar?: string
  isVerified: boolean
  isActive: boolean
  preferences: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface College {
  id: string
  name: string
  slug: string
  description?: string
  location?: string
  state?: string
  city?: string
  establishedYear?: number
  collegeType?: "government" | "private" | "deemed"
  affiliation?: string
  ranking?: number
  logoUrl?: string
  websiteUrl?: string
  contactEmail?: string
  contactPhone?: string
  admissionProcess?: string
  facilities: string[]
  coursesOffered: string[]
  feesStructure: Record<string, any>
  placementStats: Record<string, any>
  isFeatured: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  name: string
  slug: string
  description?: string
  duration?: string
  courseType: "undergraduate" | "postgraduate" | "diploma" | "certificate"
  fieldOfStudy?: string
  eligibilityCriteria?: string
  careerProspects?: string
  averageSalaryRange?: string
  skillsGained: string[]
  isPopular: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  courseInterest?: string
  collegeInterest?: string
  locationPreference?: string
  budgetRange?: string
  source: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  leadScore: number
  notes?: string
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  planName: string
  planType: "basic" | "premium" | "enterprise"
  amount: number
  currency: string
  billingCycle: "monthly" | "yearly"
  status: "active" | "cancelled" | "expired" | "pending"
  razorpaySubscriptionId?: string
  razorpayCustomerId?: string
  startDate: Date
  endDate?: Date
  autoRenew: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  userId: string
  subscriptionId?: string
  amount: number
  currency: string
  paymentMethod?: string
  razorpayPaymentId?: string
  razorpayOrderId?: string
  razorpaySignature?: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentDate?: Date
  createdAt: Date
  updatedAt: Date
}
