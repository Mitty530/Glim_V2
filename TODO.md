# NetworkAI Landing Page - TODO

## Setup Steps
1. Run the fix-linters.sh script to create required directories and fix configuration:
   ```bash
   ./fix-linters.sh
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   ./start-dev.sh
   ```

## Remaining Tasks

### Priority 1: Fix Linter Errors
- [ ] Check logs for any remaining linter errors after running fix-linters.sh
- [ ] Install any missing dependencies that might be causing errors

### Priority 2: Enhance Features
- [ ] Add actual images to replace placeholders in sections
- [ ] Enable the 3D components in Hero section once dependencies are properly installed
- [ ] Test dark mode toggle functionality 
- [ ] Make sure all animations and transitions work correctly

### Priority 3: Deployment
- [ ] Build the project with `npm run build`
- [ ] Deploy to a hosting platform like Vercel or Netlify
- [ ] Set up custom domain if needed

## Notes
- The landing page includes the following sections:
  - Hero Section
  - Value Proposition (Before/After)
  - How It Works
  - AI Demo
  - Waitlist Form
- Dark mode is supported using the next-themes library
- The theme toggle is available in the navigation bar 