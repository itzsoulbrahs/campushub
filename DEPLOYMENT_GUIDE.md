# Deployment Guide for Render

This guide explains how to deploy the CampusHub application to Render and other production environments.

## Build and Start

The project builds successfully with:
```bash
npm install && npm run build
```

This creates a production-ready bundle at:
- `dist/index.cjs` - Production backend server
- `dist/public/` - Frontend static files

The app starts with:
```bash
node dist/index.cjs
```

The server listens on `process.env.PORT` (defaults to port 5000).

## Environment Variables

Required environment variables for production:

### Port Configuration
- `PORT` - Server port (default: 5000)
  - Render automatically sets PORT for you, no configuration needed

### Node Environment
- `NODE_ENV` - Set to `production` (the build script does this automatically)

### Database (if using PostgreSQL)
- `DATABASE_URL` - PostgreSQL connection string (e.g., `postgresql://user:password@host/dbname`)
  - Only required if using database features; currently using in-memory storage by default

## Deployment on Render

### Step 1: Connect Repository
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository

### Step 2: Configure Build & Start
- **Build Command**: `npm install && npm run build`
- **Start Command**: `node dist/index.cjs`
- **Node Version**: 20+ (auto-detected from package.json)

### Step 3: Set Environment Variables (if needed)
In Render Dashboard → Your Service → Environment:
- `NODE_ENV=production` (optional, build script sets this)
- `DATABASE_URL` (only if using database)

### Step 4: Deploy
Click "Create Web Service" and Render will handle the rest.

## Key Changes for Production Compatibility

The following changes were made to ensure the app works on Render:

1. **Path Resolution Fix** (`server/static.ts`)
   - Changed from `__dirname` (doesn't work in bundled CommonJS) to `process.cwd()`
   - This fixes the "Cannot find module" error on Render

2. **Port Configuration** (`server/index.ts`)
   - Already configured to use `process.env.PORT` with fallback to 5000
   - Works correctly on Render which sets PORT automatically

3. **Build Output**
   - Build script outputs to `dist/index.cjs` at repository root
   - Frontend built to `dist/public/`
   - Both are at the correct locations for production

## Troubleshooting

### Error: "Cannot find module /opt/render/project/dist/public"
- This means the build didn't complete successfully
- Check that `npm run build` completes without errors
- Verify `dist/public/index.html` exists locally before deploying

### Error: "ENOENT: no such file or directory"
- This usually means a required environment variable is missing
- Check the Environment Variables section above
- Review logs in Render Dashboard

### Port Already in Use
- Render handles port assignment automatically via the PORT env var
- No need to configure specific ports

## Local Testing

Before deploying to Render, test locally:

```bash
# Build
npm run build

# Test production build
node dist/index.cjs

# Should output:
# HH:MM:SS AM [express] serving on port 5000
```

Then visit `http://localhost:5000` in your browser.

## Notes

- The app serves both the API and frontend from a single port
- All static assets are bundled in `dist/public/`
- No additional configuration files needed for Render
- If using a database, ensure DATABASE_URL is set before deploying
