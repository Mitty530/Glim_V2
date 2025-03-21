#!/bin/bash

echo "=== Starting Landing Page Fix Script ==="

# Remove build artifacts
echo "Removing build artifacts..."
rm -rf node_modules
rm -rf .next

# Ensure tailwind dependencies are installed
echo "Installing Tailwind dependencies..."
npm install -D tailwindcss postcss autoprefixer
npm install tailwindcss-animate

# Install core dependencies
echo "Installing core dependencies..."
npm install framer-motion next react react-dom

# Run the development server
echo "Setup complete! Starting the development server..."
echo "If you encounter any more errors, try: npm run dev"
echo "==="
npm run dev 