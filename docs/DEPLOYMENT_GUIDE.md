# Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### Environment Setup
- [ ] Set up production database (PostgreSQL)
- [ ] Configure Redis cache
- [ ] Set up file storage (AWS S3)
- [ ] Configure email service (SMTP)
- [ ] Set up monitoring (Sentry)
- [ ] Configure analytics (Google Analytics)

### Security Configuration
- [ ] Generate secure JWT secret
- [ ] Configure CORS settings
- [ ] Set up SSL certificates
- [ ] Configure rate limiting
- [ ] Enable security headers
- [ ] Set up firewall rules

### Performance Optimization
- [ ] Enable CDN (Cloudflare/AWS CloudFront)
- [ ] Configure image optimization
- [ ] Set up database indexing
- [ ] Enable compression
- [ ] Configure caching strategies

## 🔧 Environment Variables

Create a `.env.production` file with the following variables:

\`\`\`env
# App Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://user:password@host:port/database
DATABASE_POOL_SIZE=20

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-here
JWT_EXPIRES_IN=7d

# Payment Gateway
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# External APIs
HUBSPOT_API_KEY=your-hubspot-api-key
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA_API_SECRET=your-ga-api-secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Storage
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket

# Cache
REDIS_URL=redis://localhost:6379

# Monitoring
SENTRY_DSN=https://your-sentry-dsn

# Admin
ADMIN_EMAIL=admin@your-domain.com
\`\`\`

## 🐳 Docker Deployment

### Build and Run
\`\`\`bash
# Build the Docker image
docker build -t collegevaani .

# Run with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f app
\`\`\`

### Production Docker Compose
\`\`\`yaml
version: '3.8'
services:
  app:
    image: collegevaani:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    restart: unless-stopped
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: collegevaani
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
\`\`\`

## ☁️ Vercel Deployment

### Automatic Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set up custom domain
4. Configure build settings

### Build Configuration
\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "framework": "nextjs"
}
\`\`\`

## 🔍 Monitoring Setup

### Health Check Endpoint
\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  })
}
\`\`\`

### Monitoring Checklist
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Set up performance monitoring
- [ ] Configure log aggregation
- [ ] Set up alerting

## 🔒 Security Hardening

### Security Headers
\`\`\`typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
\`\`\`

## 📊 Performance Monitoring

### Key Metrics to Track
- Response time
- Error rate
- Throughput
- Database performance
- Memory usage
- CPU usage

### Alerts Configuration
- Response time > 2 seconds
- Error rate > 1%
- Database connections > 80%
- Memory usage > 85%
- Disk usage > 90%

## 🔄 Backup Strategy

### Database Backup
\`\`\`bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
\`\`\`

### File Backup
- Automated S3 backups
- Cross-region replication
- Point-in-time recovery

## 🚨 Incident Response

### Monitoring Alerts
1. Set up PagerDuty/OpsGenie
2. Configure escalation policies
3. Create runbooks for common issues
4. Set up status page

### Recovery Procedures
1. Database recovery
2. Application rollback
3. Cache invalidation
4. DNS failover
\`\`\`

This comprehensive documentation provides everything needed for production deployment and future development. The application is now fully production-ready with proper error handling, security measures, monitoring, and scalability considerations.
