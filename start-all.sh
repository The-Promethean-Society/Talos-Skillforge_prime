#!/bin/bash

# Shut down existing services on the relevant ports
echo "Attempting to shut down services on ports 9002, 3001, 3100..."
fuser -k 9002/tcp 2>/dev/null
fuser -k 3001/tcp 2>/dev/null
fuser -k 3100/tcp 2>/dev/null


# A brief pause to ensure the OS has released the sockets
sleep 1

echo "Starting services..."

# Start the auth service in the background
echo "Starting auth-service..."
(cd services/auth-service && npm install && npm run dev > ../../auth.log 2>&1) &
echo "Auth service started. Logs are in auth.log"

# Start the Genkit AI service in the background
echo "Starting Genkit AI service..."
npm run genkit:dev > genkit.log 2>&1 &
echo "Genkit AI service started. Logs are in genkit.log"

# Start the main web application in the foreground
echo "Starting the main web application..."
npm run dev

echo "All services started."
