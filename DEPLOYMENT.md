# Deployment Guide for Namecheap cPanel

## Pre-rendering Setup Complete ✅

Your React application is now configured with pre-rendering using `react-snap`. This means Google and other search engines will see actual HTML content instead of an empty `<div id="root"></div>`.

## Building for Production

### Step 1: Build the Application

```bash
npm run build
```

This command will:
1. Run `vite build` to create optimized production files
2. Automatically run `react-snap` (via postbuild script) to pre-render all routes
3. Generate static HTML files in the `dist` folder

**Expected output:**
- `dist/index.html` - Pre-rendered home page
- `dist/about/index.html` - Pre-rendered about page
- `dist/contact/index.html` - Pre-rendered contact page
- `dist/services/index.html` - Pre-rendered services page
- `dist/testimonials/index.html` - Pre-rendered testimonials page
- `dist/blog/index.html` - Pre-rendered blog page

### Step 2: Verify Pre-rendering Worked

Before uploading, verify the HTML files contain actual content:

**Windows PowerShell:**
```powershell
Get-Content dist\index.html | Select-String "Sysfotech"
```

**Expected result:** You should see multiple matches showing your actual page content.

## Deploying to Namecheap cPanel

### Step 1: Access cPanel File Manager

1. Log in to your Namecheap account
2. Go to cPanel
3. Open **File Manager**
4. Navigate to `public_html` directory

### Step 2: Backup Existing Files (if any)

1. Select all files in `public_html`
2. Click **Compress** to create a backup
3. Download the backup to your computer

### Step 3: Upload New Files

1. **Delete old files** from `public_html` (after backing up)
2. Navigate to your local `dist` folder
3. **Select ALL files and folders** inside `dist` (not the dist folder itself)
4. Upload to `public_html` using one of these methods:
   - **Drag and drop** into File Manager
   - Use **Upload** button in File Manager
   - Use **FTP client** (FileZilla, WinSCP)

**Important:** Upload the CONTENTS of the dist folder, not the folder itself.

### Step 4: Verify .htaccess File

1. In cPanel File Manager, make sure `.htaccess` is visible in `public_html`
2. If you don't see it, click **Settings** (top right) and enable "Show Hidden Files"
3. The `.htaccess` file should already be included from your `public` folder

### Step 5: Set Permissions

1. Right-click `.htaccess` → **Change Permissions**
2. Set to `644` (Read/Write for owner, Read for others)

## Testing Your Deployment

### 1. Basic Functionality Test

Visit your website: `https://sysfotech.uk`

- ✅ Home page loads correctly
- ✅ Navigation works
- ✅ All pages are accessible
- ✅ Contact form works
- ✅ No console errors

### 2. Pre-rendering Verification

**View Page Source:**
1. Right-click on your homepage → "View Page Source"
2. Search for "Sysfotech" or "Web Development Company UK"
3. ✅ You should see actual content in the HTML (not just `<div id="root"></div>`)

**Google Rich Results Test:**
1. Go to: https://search.google.com/test/rich-results
2. Enter your URL: `https://sysfotech.uk/contact`
3. ✅ Google should be able to read your page content
4. ✅ Meta tags and structured data should be visible

### 3. SEO Verification

**Check all main pages:**
- https://sysfotech.uk/
- https://sysfotech.uk/about
- https://sysfotech.uk/services
- https://sysfotech.uk/contact
- https://sysfotech.uk/testimonials
- https://sysfotech.uk/blog

For each page:
1. View page source
2. Verify content is visible in HTML
3. Check meta tags are present

## Troubleshooting

### Issue: Pages show 404 error

**Solution:** Check `.htaccess` file is present and has correct permissions (644)

### Issue: Styles not loading

**Solution:** 
1. Check if CSS files are in `public_html/assets/` folder
2. Clear browser cache (Ctrl + Shift + Delete)
3. Check cPanel error logs

### Issue: React Router not working

**Solution:** Verify `.htaccess` contains the rewrite rules for React Router

### Issue: Pre-rendered content not showing

**Solution:**
1. Rebuild locally: `npm run build`
2. Check `dist` folder for HTML files with content
3. Re-upload to cPanel

## Google Search Console

After deployment, submit your sitemap to Google Search Console:

1. Go to: https://search.google.com/search-console
2. Add property: `https://sysfotech.uk`
3. Submit sitemap: `https://sysfotech.uk/sitemap.xml`
4. Request indexing for main pages

**Expected timeline:**
- 1-3 days: Google recrawls your pages
- 1-2 weeks: Pages start appearing in search results
- Status should change from "Crawled – currently not indexed" to "Indexed"

## Support

If you encounter issues:
1. Check cPanel error logs
2. Test locally with `npm run preview`
3. Verify all files uploaded correctly
4. Check browser console for errors
