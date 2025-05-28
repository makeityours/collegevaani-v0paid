# CollegeVaani API Documentation

This document provides an overview of the CollegeVaani API endpoints, their purpose, required parameters, and response formats.

## Base URL

All API endpoints are prefixed with `/api/v1/`.

## Authentication

The API uses Laravel Sanctum for token-based authentication.

### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged in",
  "data": {
    "token": "your-api-token",
    "user": {
      "id": "user-uuid",
      "name": "User Name",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

### Register

```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "your-api-token",
    "user": {
      "id": "user-uuid",
      "name": "New User",
      "email": "newuser@example.com",
      "role": "user"
    }
  }
}
```

### Logout

```
POST /auth/logout
```

**Headers:**
```
Authorization: Bearer your-api-token
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

## College Endpoints

### Get All Colleges

```
GET /colleges
```

**Query Parameters:**
- `type` - Filter by college type (government, private, deemed, autonomous)
- `category` - Filter by category
- `location` - Filter by location (city or state)
- `search` - Search term for college name or description
- `sort` - Field to sort by (name, ranking, fees)
- `order` - Sort order (asc, desc)
- `per_page` - Number of results per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "college-uuid",
        "name": "Sample College",
        "slug": "sample-college",
        "description": "College description",
        "logo": "logo-url",
        "images": ["image1", "image2"],
        "location": {
          "city": "City",
          "state": "State",
          "address": "Full address"
        },
        "contact": {
          "phone": "1234567890",
          "email": "college@example.com",
          "website": "https://college.example.com"
        },
        "type": "private",
        "category": "engineering",
        "accreditation": {},
        "rankings": [],
        "facilities": [],
        "fees": {},
        "admissions": {},
        "stats": {},
        "is_verified": true,
        "is_active": true,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    ],
    "meta": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 20,
      "total": 100
    }
  }
}
```

### Get College by Slug

```
GET /colleges/{slug}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "college-uuid",
    "name": "Sample College",
    "slug": "sample-college",
    "description": "College description",
    "logo": "logo-url",
    "images": ["image1", "image2"],
    "location": {
      "city": "City",
      "state": "State",
      "address": "Full address"
    },
    "contact": {
      "phone": "1234567890",
      "email": "college@example.com",
      "website": "https://college.example.com"
    },
    "type": "private",
    "category": "engineering",
    "accreditation": {},
    "rankings": [],
    "facilities": [],
    "fees": {},
    "admissions": {},
    "stats": {},
    "is_verified": true,
    "is_active": true,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

### Compare Colleges

```
POST /colleges/compare
```

**Request Body:**
```json
{
  "slugs": ["college1-slug", "college2-slug"]
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "college1-uuid",
      "name": "College 1",
      "slug": "college1-slug",
      "...": "..."
    },
    {
      "id": "college2-uuid",
      "name": "College 2",
      "slug": "college2-slug",
      "...": "..."
    }
  ]
}
```

## Course Endpoints

### Get All Courses

```
GET /courses
```

**Query Parameters:**
- `college_id` - Filter by college
- `category` - Filter by category
- `degree` - Filter by degree type (diploma, undergraduate, postgraduate, doctoral)
- `search` - Search term for course name or description
- `sort` - Field to sort by (name, fees, duration)
- `order` - Sort order (asc, desc)
- `per_page` - Number of results per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "course-uuid",
        "name": "Sample Course",
        "slug": "sample-course",
        "description": "Course description",
        "college_id": "college-uuid",
        "category": "engineering",
        "degree": "undergraduate",
        "duration": {
          "years": 4,
          "semesters": 8
        },
        "eligibility": {},
        "curriculum": {},
        "fees": {},
        "seats": {},
        "is_active": true,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    ],
    "meta": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 20,
      "total": 100
    }
  }
}
```

### Get Courses by College

```
GET /colleges/{collegeSlug}/courses
```

## Application Endpoints

### Get User Applications

```
GET /applications
```

**Headers:**
```
Authorization: Bearer your-api-token
```

**Query Parameters:**
- `status` - Filter by status (draft, submitted, under_review, accepted, rejected, waitlisted)
- `college_id` - Filter by college
- `course_id` - Filter by course
- `sort` - Field to sort by (created_at, updated_at, submitted_at)
- `order` - Sort order (asc, desc)
- `per_page` - Number of results per page (default: 20)

### Create Application

```
POST /applications
```

**Headers:**
```
Authorization: Bearer your-api-token
```

**Request Body:**
```json
{
  "college_id": "college-uuid",
  "course_id": "course-uuid",
  "personal_info": {
    "name": "Applicant Name",
    "email": "applicant@example.com",
    "phone": "1234567890",
    "address": "Full address",
    "education": {},
    "date_of_birth": "2000-01-01"
  },
  "documents": {}
}
```

### Submit Application

```
POST /applications/{id}/submit
```

**Headers:**
```
Authorization: Bearer your-api-token
```

## Payment Endpoints

### Create Order

```
POST /payments/create-order
```

**Headers:**
```
Authorization: Bearer your-api-token
```

**Request Body:**
```json
{
  "amount": 1000,
  "currency": "INR",
  "payment_for": "application",
  "description": "Application fee for Sample Course"
}
```

### Verify Payment

```
POST /payments/verify
```

**Headers:**
```
Authorization: Bearer your-api-token
```

**Request Body:**
```json
{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature"
}
```

## Lead Endpoints

### Create Lead (Public)

```
POST /leads
```

**Request Body:**
```json
{
  "name": "Lead Name",
  "email": "lead@example.com",
  "phone": "1234567890",
  "course": "Desired Course",
  "budget": "500000",
  "timeline": "3 months",
  "message": "I'm interested in this course",
  "source": "website"
}
```

### Get Counselor Leads

```
GET /leads/my-leads
```

**Headers:**
```
Authorization: Bearer your-api-token
```

**Query Parameters:**
- `status` - Filter by status (new, contacted, qualified, converted, lost)
- `source` - Filter by source
- `search` - Search term for lead name, email, or phone
- `sort` - Field to sort by (created_at, score, name)
- `order` - Sort order (asc, desc)
- `per_page` - Number of results per page (default: 20)

## Error Responses

All API endpoints return a consistent error format:

```json
{
  "success": false,
  "message": "Error message",
  "data": {
    "errors": {
      "field": [
        "Error message for field"
      ]
    }
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- Authentication endpoints: 10 requests per minute per IP
- Payment endpoints: 30 requests per minute per user/IP
- General API endpoints: 60 requests per minute per user/IP

When a rate limit is exceeded, a 429 Too Many Requests response is returned. 