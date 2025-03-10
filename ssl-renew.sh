#!/bin/bash

# Run SSL certificate renewal check while the docker compose is running
# within 30 days of expiration
echo "Starting SSL certificate renewal check..."

docker-compose -f docker-compose.prod.yml run --rm certbot renew
docker-compose -f docker-compose.prod.yml exec frontend nginx -s reload

echo "SSL renewal process completed." 