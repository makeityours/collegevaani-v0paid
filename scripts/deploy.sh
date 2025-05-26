#!/bin/bash

echo "🚀 Starting CollegeVaani deployment..."

# Check if all required environment variables are set
required_vars=("DATABASE_URL" "RAZORPAY_KEY_ID" "RAZORPAY_KEY_SECRET")

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Error: $var is not set"
    exit 1
  fi
done

echo "✅ Environment variables validated"

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

if [ $? -eq 0 ]; then
  echo "✅ Type check passed"
else
  echo "❌ Type check failed"
  exit 1
fi

echo "🎉 Deployment preparation complete!"
echo "📋 Next steps:"
echo "1. Push to your Git repository"
echo "2. Deploy to Vercel"
echo "3. Set environment variables in Vercel dashboard"
echo "4. Test the deployed application"
