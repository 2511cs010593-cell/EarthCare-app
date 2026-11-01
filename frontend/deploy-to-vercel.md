# Deploy EarthCare App to Vercel

## Option 1: Using Vercel Dashboard (EASIEST - RECOMMENDED)

1. Go to https://vercel.com/new
2. Log in to your Vercel account
3. Click **"Browse"** button
4. Navigate to and select the `frontend/dist` folder from this project
5. Click **"Deploy"**
6. Wait for deployment to complete
7. Your app will be live at the URL shown!

## Option 2: Using Vercel CLI

1. Open terminal in the `frontend` folder
2. Run: `vercel login`
3. Follow the login prompts
4. Run: `vercel --prod`
5. Follow the prompts:
   - Select "Create a new project"
   - Enter project name: `earth-care-app`
   - Accept defaults for other options
6. Wait for deployment to complete

## Your Production Build

✅ Your production build is ready in `frontend/dist/` folder
✅ `vercel.json` configuration file is created
✅ All routes are configured to work with client-side routing

## Project Details

- **Project Name**: earth-care-app (or earthcare-app)
- **Build Output**: frontend/dist/
- **Framework**: React + Vite
- **Routing**: Client-side routing enabled via vercel.json

## After Deployment

Your app will be available at: `https://[your-project-name].vercel.app`

### Login Credentials for Demo:
- Any email/username works
- Regular user: any password
- Admin access: password = `1234567890`

## Notes

- First-time users get 20 bonus points automatically
- All features work in demo mode without backend
- Admin dashboard accessible with admin password
