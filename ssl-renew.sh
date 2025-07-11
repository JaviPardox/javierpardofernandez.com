#!/bin/bash

# Use webroot method instead of standalone since nginx is running
docker run --rm \
  -v $(pwd)/ssl/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/ssl/certbot/data:/var/www/certbot \
  certbot/certbot renew --webroot --webroot-path=/var/www/certbot

# Check if renewal was successful by looking at the exit code
if [ $? -eq 0 ]; then
  echo "Renewal process completed successfully."
  
  # Reload nginx to apply new certificates if renewed
  docker-compose -f docker-compose.prod.yml exec frontend nginx -s reload
  
  echo "Nginx reloaded with new certificates."
else
  echo "Renewal process failed. Check the Let's Encrypt logs for more information."
fi 