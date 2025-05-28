# CollegeVaani - College Application Platform

![CollegeVaani Logo](public/logo.png)

CollegeVaani is a comprehensive platform for students to discover colleges, apply for courses, and access educational resources. The platform also provides lead generation for colleges and monetization features.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, PostgreSQL, Redis
- **Authentication**: JWT-based auth with refresh tokens
- **Deployment**: Docker, Nginx, PM2
- **Monitoring**: Sentry, structured logging
- **Payment Processing**: Razorpay integration

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis (optional for development)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/collegevaani.git
   cd collegevaani
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file with required environment variables (see `.env.example`)

4. Setup the database
   ```bash
   npm run db:setup
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

6. Access the application at http://localhost:3000

### Running Tests

```bash
npm run test
```

For watch mode during development:
```bash
npm run test:watch
```

## Production Deployment

### Option 1: Deployment on Ubuntu VPS

1. Provision an Ubuntu 22.04 server with at least 4GB RAM
2. SSH into your server and run our setup script
   ```bash
   curl -fsSL https://raw.githubusercontent.com/yourusername/collegevaani/main/scripts/setup-vps.sh | sudo bash
   ```

3. Clone the repository and set up environment variables
   ```bash
   git clone https://github.com/yourusername/collegevaani.git /var/www/collegevaani
   cd /var/www/collegevaani
   cp .env.example .env
   # Edit .env with your production values
   ```

4. Install dependencies and build the application
   ```bash
   npm ci
   npm run build
   ```

5. Set up SSL certificates
   ```bash
   sudo bash scripts/setup-ssl.sh
   ```

6. Start the application with PM2
   ```bash
   pm2 start ecosystem.config.js --env production
   pm2 save && pm2 startup
   ```

7. Set up database backups
   ```bash
   chmod +x scripts/backup-database.sh
   ```

### Option 2: Docker Deployment

1. Clone the repository on your server
   ```bash
   git clone https://github.com/yourusername/collegevaani.git
   cd collegevaani
   ```

2. Create a `.env` file with your production environment variables

3. Build and start the Docker containers
   ```bash
   docker-compose up -d
   ```

4. Set up SSL certificates (if not using the built-in certbot container)
   ```bash
   sudo bash scripts/setup-ssl.sh
   ```

## Project Structure

```
├── app/                  # Next.js App Router directory
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   └── ...               # Other page routes
├── components/           # React components
│   ├── ui/               # UI components
│   ├── forms/            # Form components
│   └── ...               # Other components
├── lib/                  # Utility functions and modules
│   ├── auth/             # Authentication utilities
│   ├── database/         # Database utilities
│   │   └── migrations/   # Database migrations
│   ├── payments/         # Payment processing utilities
│   └── ...               # Other utilities
├── public/               # Static assets
├── scripts/              # Deployment and setup scripts
└── ...                   # Configuration files
```

## Environment Variables

See `.env.example` for a list of required environment variables.

## Database Migrations

Run migrations:
```bash
npm run db:setup
```

Rollback the latest migration:
```bash
npm run db:rollback
```

Reset the database (development only):
```bash
npm run db:reset
```

## Monitoring and Maintenance

- **Error tracking**: Access the Sentry dashboard to monitor errors
- **Logs**: Check the logs in `/var/log/collegevaani/`
- **Database backups**: Automated daily at 2 AM in `/var/backups/collegevaani/`

## Security Features

- SSL/TLS encryption
- HTTP security headers
- Rate limiting
- Input validation
- Token-based authentication
- Secure password hashing
- Database connection security

## License

Proprietary - All rights reserved
