#!/bin/bash
echo "Starting development environment with hot reloading..."
docker-compose down
docker-compose build
docker-compose up "$@" 