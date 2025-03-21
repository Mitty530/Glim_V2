# Glim

Glim is an AI smart card contact app that helps professionals manage their contacts and relationships.

## Features

- Modern UI with Tailwind CSS
- Smooth animations with Framer Motion
- Dark mode support with next-themes
- Responsive design for all devices
- Interactive AI demo section
- Waitlist signup form

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Next Themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
# or
./start-dev.sh
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the project for production:

```bash
npm run build
```

### Start Production Server

Start the production server:

```bash
npm run start
```

## Project Structure

- `src/app`: Next.js app router files
- `src/components`: React components
  - `sections`: Main page sections
  - `ui`: UI components
  - `providers`: Context providers
- `src/styles`: Global styles
- `public`: Static assets

## License

This project is licensed under the MIT License.

## Supabase Integration

This project uses Supabase to store waitlist data. Follow these steps to set up Supabase:

1. Create a free account at [Supabase](https://supabase.com/)
2. Create a new project
3. Set up a database table called `waitlist` with the following columns:
   - `id` (UUID, primary key)
   - `firstName` (text)
   - `email` (text, unique)
   - `comments` (text, nullable)
   - `position` (integer)
   - `createdAt` (timestamp with timezone)
4. Get your Supabase URL and service role key from the project settings
5. Add these values to your environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```
6. Make sure to add these variables to your Vercel deployment settings
