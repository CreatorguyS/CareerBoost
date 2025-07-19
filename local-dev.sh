#!/bin/bash

echo "Starting CareerBoost Platform..."
echo

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please copy .env.example to .env and configure your environment variables."
    echo
    echo "Run this command:"
    echo "cp .env.example .env"
    echo
    echo "Then edit .env with your actual values."
    exit 1
fi

# Load environment variables from .env file
export $(cat .env | grep -v '^#' | xargs)

# Set development environment
export NODE_ENV=development
export PORT=5000
export HOST=127.0.0.1

echo "Environment: $NODE_ENV"
echo "Port: $PORT"
echo "Host: $HOST"
echo

# Start the development server
echo "Starting development server..."
npx tsx server/index.ts