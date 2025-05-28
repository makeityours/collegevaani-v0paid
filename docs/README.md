# CollegeVaani - College Discovery Platform

CollegeVaani is a comprehensive platform for students to discover, compare, and apply to colleges in India. The platform provides information about colleges, courses, exams, and various educational resources.

## Features

- **College Discovery**: Find and compare colleges across India
- **Course Information**: Detailed information about various courses and programs
- **Exam Details**: Information about entrance exams and important dates
- **Online Degree Programs**: Explore online education options
- **Educational Resources**: Access study materials and guides
- **User Dashboards**: Personalized dashboards for students, parents, counselors, and college representatives
- **Application Management**: Apply to colleges and track applications
- **Admin Panel**: Comprehensive admin dashboard for content management

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL (with Neon Database)
- **Authentication**: JWT with refresh tokens
- **Payment Processing**: Razorpay
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (or Neon Database account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/collegevaani.git
   cd collegevaani
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # App Configuration
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Database
   DATABASE_URL=postgres://username:password@host:port/database

   # Authentication
   JWT_SECRET=your-32-character-jwt-secret-key
   JWT_REFRESH_SECRET=your-32-character-refresh-secret-key
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   # Payment Gateway (Razorpay)
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook-secret
   ```

4. Set up the database:
   ```bash
   npm run db:setup
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Management

- **Setup database**: `npm run db:setup`
- **Reset database** (development only): `npm run db:reset`
- **Rollback last migration**: `npm run db:rollback`

## Project Structure

```
collegevaani/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── admin/            # Admin panel pages
│   └── ...               # Other pages
├── components/           # Reusable UI components
├── lib/                  # Shared utilities
│   ├── auth/             # Authentication utilities
│   ├── config/           # Configuration
│   ├── database/         # Database utilities
│   ├── errors/           # Error handling
│   └── middleware/       # Middleware
├── public/               # Static assets
├── scripts/              # Utility scripts
└── styles/               # Global styles
```

## Authentication

The application uses JWT for authentication with a dual token system:
- **Access Token**: Short-lived token for API authorization
- **Refresh Token**: Long-lived token for obtaining new access tokens

Tokens are stored in HTTP-only cookies for enhanced security.

## API Routes

- **Authentication**: `/api/auth/*`
- **Colleges**: `/api/colleges/*`
- **Courses**: `/api/courses/*`
- **Applications**: `/api/applications/*`
- **Payments**: `/api/payments/*`

## Deployment

The application is deployed on Vercel. The deployment process is automated through GitHub integration.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 