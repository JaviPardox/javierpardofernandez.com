#!/bin/bash

# Production deployment script
echo "Starting production environment..."

# Create required directories
mkdir -p ./ssl/certbot/conf
mkdir -p ./ssl/certbot/data

# Stop any running containers
echo "Stopping any running containers..."
docker-compose -f docker-compose.prod.yml down

# Build the containers
echo "Building containers..."
docker-compose -f docker-compose.prod.yml build

# Start the frontend and backend first
echo "Starting frontend and backend containers..."
docker-compose -f docker-compose.prod.yml up -d frontend backend

# Wait for frontend to start
echo "Waiting for frontend to start..."
sleep 15

# Check if Nginx is running
echo "Checking if Nginx is running..."
docker-compose -f docker-compose.prod.yml exec frontend nginx -t

# Run certbot to get certificates
echo "Running certbot to obtain certificates..."
docker-compose -f docker-compose.prod.yml up certbot

# Restart frontend to apply certificates
echo "Restarting frontend to apply certificates..."
docker-compose -f docker-compose.prod.yml restart frontend

echo "Deployment complete!" 