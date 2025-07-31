# 🚀 Deploying EventHub to Netlify

## Quick Deploy Options

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EventHub testing website"
   git branch -M main
   git remote add origin https://github.com/yourusername/eventhub-testing.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Netlify will auto-detect the settings from `netlify.toml`
   - Click "Deploy site"

### Option 2: Drag & Drop Deploy

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Drag & Drop:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area
   - Your site will be live instantly!

### Option 3: Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

## Configuration Files Included

✅ **netlify.toml** - Build settings and redirects for React Router
✅ **public/_redirects** - Backup redirect rules
✅ **public/404.html** - Custom 404 page
✅ **package.json** - Updated with proper metadata

## Build Settings (Auto-configured)

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18
- **Redirects:** All routes redirect to `/index.html` (SPA support)

## Environment Variables (Optional)

If you want to add environment variables in Netlify:

1. Go to Site Settings → Environment variables
2. Add any variables you need:
   ```
   VITE_API_URL=https://jsonplaceholder.typicode.com
   VITE_SITE_NAME=EventHub Testing
   ```

## Custom Domain (Optional)

1. Go to Site Settings → Domain management
2. Add your custom domain
3. Follow DNS configuration instructions

## Performance Optimizations Included

- Static asset caching (1 year)
- Security headers
- Gzip compression (automatic)
- CDN distribution (automatic)

## Testing Your Deployment

Once deployed, test these key features:

1. **Navigation:** All routes work (/, /events, /book/1, /my-tickets, /settings)
2. **Refresh:** Page refresh works on any route (SPA routing)
3. **404 handling:** Non-existent routes show custom 404 page
4. **Mobile:** Responsive design works on mobile devices
5. **Bugs:** All intentional bugs are working for testing

## Troubleshooting

### Build Fails?
- Check Node version (should be 18+)
- Run `npm install` and `npm run build` locally first

### Routes Don't Work?
- Ensure `_redirects` file is in the `public` folder
- Check `netlify.toml` redirect rules

### Site Looks Broken?
- Check browser console for errors
- Ensure all assets are loading correctly
- Verify CSS is being applied

## Site URL

Your site will be available at:
- **Netlify subdomain:** `https://your-site-name.netlify.app`
- **Custom domain:** (if configured)

## Continuous Deployment

With GitHub connection:
- Every push to `main` branch automatically deploys
- Pull request previews available
- Branch deploys for testing

---

🎪 **Your EventHub testing website is now live and ready for testing!**