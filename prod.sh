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

# Start the frontend first (it will handle port 80)
echo "Starting frontend container..."
docker-compose -f docker-compose.prod.yml up -d frontend

# Wait for frontend to start
echo "Waiting for frontend to start..."
sleep 10

# Run certbot to get certificates
echo "Running certbot to obtain certificates..."
docker-compose -f docker-compose.prod.yml up -d certbot

# Start the backend
echo "Starting backend container..."
docker-compose -f docker-compose.prod.yml up -d backend

echo "Deployment complete!" 