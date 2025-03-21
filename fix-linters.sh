#!/bin/bash

# Stop on first error
set -e

echo "🔍 Fixing linter errors..."

# Make sure all dependencies are installed
echo "📦 Installing dependencies..."
npm install 

# Create missing directories if they don't exist
echo "📁 Creating missing directories..."
mkdir -p src/components/ui
mkdir -p src/components/sections
mkdir -p src/components/providers
mkdir -p src/styles

# Fix tsconfig paths
echo "🔧 Fixing path configurations..."
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

echo "✅ Script completed successfully" 