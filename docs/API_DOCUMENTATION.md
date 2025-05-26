# CollegeVaani API Documentation

## 🔗 Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## 🔐 Authentication

### Headers
\`\`\`
Authorization: Bearer <jwt_token>
Content-Type: application/json
\`\`\`

## 📚 API Endpoints

### Authentication APIs

#### POST /api/auth/login
Login user with credentials.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "student"
  }
}
\`\`\`

#### POST /api/auth/register
Register new user account.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
\`\`\`

### College APIs

#### GET /api/colleges
Get list of colleges with filtering and pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search term
- `location`: Filter by location
- `course`: Filter by course type

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "colleges": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1000,
      "pages": 50
    }
  }
}
\`\`\`

#### GET /api/colleges/[id]
Get detailed college information.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "college_id",
    "name": "IIT Delhi",
    "location": "New Delhi",
    "courses": [...],
    "facilities": [...],
    "admissions": {...}
  }
}
\`\`\`

### Payment APIs

#### POST /api/payments/create-order
Create Razorpay order for payment.

**Request Body:**
\`\`\`json
{
  "amount": 49900,
  "currency": "INR",
  "plan": "premium",
  "billingCycle": "yearly",
  "customerData": {...}
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "order": {
    "id": "order_id",
    "amount": 49900,
    "currency": "INR"
  }
}
\`\`\`

#### POST /api/payments/verify
Verify payment after successful transaction.

**Request Body:**
\`\`\`json
{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature",
  "customerData": {...}
}
\`\`\`

### Lead Generation APIs

#### POST /api/leads/capture
Capture lead information from forms.

**Request Body:**
\`\`\`json
{
  "name": "Student Name",
  "email": "student@example.com",
  "phone": "+91XXXXXXXXXX",
  "course": "engineering",
  "source": "website"
}
\`\`\`

### Admin APIs

#### GET /api/admin/analytics
Get admin dashboard analytics.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "users": {
      "total": 10000,
      "growth": 12.5
    },
    "revenue": {
      "total": 500000,
      "growth": 8.3
    },
    "leads": {
      "total": 2500,
      "conversion": 15.2
    }
  }
}
\`\`\`

#### POST /api/admin/ads/campaigns
Create new advertising campaign.

**Request Body:**
\`\`\`json
{
  "title": "Campaign Title",
  "description": "Campaign description",
  "type": "banner",
  "ctaText": "Learn More",
  "ctaLink": "/target-page",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}
\`\`\`

## 🚨 Error Handling

### Error Response Format
\`\`\`json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {...}
}
\`\`\`

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Rate Limited
- `500`: Internal Server Error

## 🔄 Rate Limiting
- **General APIs**: 100 requests per minute
- **Authentication**: 5 requests per minute
- **Payment APIs**: 10 requests per minute
\`\`\`

## 3. **PRODUCTION-READY ENVIRONMENT CONFIGURATION**
