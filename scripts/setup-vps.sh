#!/bin/bash

# CollegeVaani VPS Setup Script
# This script prepares a fresh Ubuntu 22.04 server for hosting the CollegeVaani application

set -e  # Exit immediately if a command exits with a non-zero status

# Check if script is run as root
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root. Please use sudo."
    exit 1
fi

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting VPS setup..."

# Update system packages
log "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install required packages
log "Installing required packages..."
apt-get install -y curl wget git nginx ufw build-essential python3-pip postgresql postgresql-contrib certbot python3-certbot-nginx redis-server

# Install Node.js LTS
log "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 globally
log "Installing PM2..."
npm install -g pm2

# Configure firewall
log "Configuring firewall..."
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 5432/tcp  # PostgreSQL (restrict this in production to specific IPs)
ufw allow 6379/tcp  # Redis (restrict this in production to specific IPs)
ufw --force enable

# Create application directory
log "Creating application directory..."
mkdir -p /var/www/collegevaani
chown -R $SUDO_USER:$SUDO_USER /var/www/collegevaani

# Create logs directory
log "Creating logs directory..."
mkdir -p /var/log/collegevaani
chown -R $SUDO_USER:$SUDO_USER /var/log/collegevaani

# Create backup directory
log "Creating backup directory..."
mkdir -p /var/backups/collegevaani
chown -R $SUDO_USER:$SUDO_USER /var/backups/collegevaani

# Configure Nginx
log "Configuring Nginx..."
cat > /etc/nginx/sites-available/collegevaani << EOF
server {
    listen 80;
    server_name collegevaani.com www.collegevaani.com;
    
    # Redirect all HTTP requests to HTTPS
    location / {
        return 301 https://\$host\$request_uri;
    }
    
    # For Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}
EOF

ln -sf /etc/nginx/sites-available/collegevaani /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Configure PostgreSQL
log "Configuring PostgreSQL..."
sudo -u postgres psql -c "CREATE USER collegevaani WITH PASSWORD 'secure_password_here';"
sudo -u postgres psql -c "CREATE DATABASE collegevaani OWNER collegevaani;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE collegevaani TO collegevaani;"

# Configure Redis
log "Configuring Redis..."
sed -i 's/supervised no/supervised systemd/g' /etc/redis/redis.conf
systemctl restart redis-server

# Set up daily cron jobs
log "Setting up cron jobs..."
cat > /etc/cron.d/collegevaani << EOF
# Database backup - every day at 2 AM
0 2 * * * $SUDO_USER /var/www/collegevaani/scripts/backup-database.sh >> /var/log/collegevaani/backup.log 2>&1

# Let's Encrypt renewal - twice daily
0 */12 * * * root certbot renew --quiet
EOF

chmod 0644 /etc/cron.d/collegevaani

# Final setup instructions
log "Setup completed successfully!"
log ""
log "Next steps:"
log "1. Clone your repository to /var/www/collegevaani"
log "2. Create a .env file with your environment variables"
log "3. Set up SSL certificate using ./scripts/setup-ssl.sh"
log "4. Install dependencies and build the application"
log "5. Set up PM2 using ecosystem.config.js"
log ""
log "Example commands:"
log "git clone https://github.com/yourusername/collegevaani.git /var/www/collegevaani"
log "cd /var/www/collegevaani && npm ci"
log "npm run build"
log "pm2 start ecosystem.config.js --env production"
log "pm2 save && pm2 startup" 