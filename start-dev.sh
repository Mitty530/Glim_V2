#!/bin/bash

# Fix linter errors first if the script exists
if [ -f "fix-linters.sh" ]; then
  echo "Running linter fixes..."
  ./fix-linters.sh
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting development server..."
npm run dev 