#!/bin/bash

# CollegeVaani SSL Certificate Setup Script
# This script automates the process of obtaining and installing SSL certificates using Let's Encrypt

set -e  # Exit immediately if a command exits with a non-zero status

# Configuration
DOMAIN="collegevaani.com"
EMAIL="admin@collegevaani.com"
WEB_ROOT="/var/www/html"
NGINX_CONF="/etc/nginx/nginx.conf"
SSL_DIR="/etc/nginx/ssl"

# Check if script is run as root
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root. Please use sudo."
    exit 1
fi

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Install Certbot if not already installed
install_certbot() {
    log "Installing Certbot..."
    apt-get update
    apt-get install -y certbot
}

# Create directories if they don't exist
create_directories() {
    log "Creating required directories..."
    mkdir -p "$WEB_ROOT/.well-known/acme-challenge"
    mkdir -p "$SSL_DIR"
}

# Obtain SSL certificate
get_certificate() {
    log "Obtaining SSL certificate for $DOMAIN..."
    certbot certonly --webroot \
        --webroot-path "$WEB_ROOT" \
        --domain "$DOMAIN" \
        --domain "www.$DOMAIN" \
        --email "$EMAIL" \
        --agree-tos \
        --non-interactive \
        --rsa-key-size 4096
}

# Install certificate to Nginx directory
install_certificate() {
    log "Installing certificate to Nginx directory..."
    # Copy certificate to nginx ssl directory
    cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem "$SSL_DIR/fullchain.pem"
    cp /etc/letsencrypt/live/$DOMAIN/privkey.pem "$SSL_DIR/privkey.pem"
    
    # Set proper permissions
    chmod 644 "$SSL_DIR/fullchain.pem"
    chmod 600 "$SSL_DIR/privkey.pem"
}

# Set up auto-renewal
setup_renewal() {
    log "Setting up auto-renewal..."
    # Create renewal hook to copy certificates to nginx directory
    RENEWAL_HOOK="/etc/letsencrypt/renewal-hooks/post/nginx-copy.sh"
    
    cat > "$RENEWAL_HOOK" << EOF
#!/bin/bash
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem "$SSL_DIR/fullchain.pem"
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem "$SSL_DIR/privkey.pem"
chmod 644 "$SSL_DIR/fullchain.pem"
chmod 600 "$SSL_DIR/privkey.pem"
systemctl reload nginx
EOF
    
    chmod +x "$RENEWAL_HOOK"
    
    # Test renewal
    certbot renew --dry-run
}

# Test Nginx configuration
test_nginx() {
    log "Testing Nginx configuration..."
    nginx -t
    if [ $? -eq 0 ]; then
        log "Nginx configuration test successful"
        log "Reloading Nginx..."
        systemctl reload nginx
    else
        log "Nginx configuration test failed. Please check your nginx.conf file."
        exit 1
    fi
}

# Run all functions
main() {
    log "Starting SSL certificate setup..."
    install_certbot
    create_directories
    get_certificate
    install_certificate
    setup_renewal
    test_nginx
    log "SSL certificate setup completed successfully!"
    log "Your site should now be accessible via https://$DOMAIN"
}

# Execute main function
main 