# JRCC Website Styles - GitHub Hosting Setup

## Overview

This solution hosts all JRCC website CSS and JavaScript on GitHub, dramatically reducing the file size in the Chabad One CMS from 3,500+ lines to just ~50 lines.

## Benefits

- **Reduced CMS file size**: From 2,226 lines → ~20 lines
- **Easier maintenance**: Update styles without touching the CMS
- **Version control**: Track all changes in Git
- **Faster loading**: CDN-cached resources
- **No more CMS errors**: Avoids file size limitations

## Files in this Directory

- `jrcc-styles.css` - All page styling (1,800+ lines)
- `jrcc-scripts.js` - All JavaScript functionality (600+ lines)
- `custom-header-code-minimal.html` - Minimal header loader (~50 lines)
- `custom-footer-code-minimal.html` - Minimal footer loader (~20 lines)

## Setup Instructions

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Sign in or create a free account
3. Click the green "New" button to create a repository
4. Name it something like `jrcc-website-styles`
5. Make sure it's set to **Public** (required for free hosting)
6. Click "Create repository"

### Step 2: Upload the Files

1. In your new repository, click "uploading an existing file"
2. Upload these two files:
   - `jrcc-styles.css`
   - `jrcc-scripts.js`
3. Click "Commit changes"

### Step 3: Get Your URLs

Your files will be available at:
- CSS: `https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/jrcc-styles.css`
- JS: `https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/jrcc-scripts.js`

**Better option - Use jsDelivr CDN (faster):**
- CSS: `https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/jrcc-styles.css`
- JS: `https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/jrcc-scripts.js`

Replace:
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO` with your repository name

### Step 4: Update the Minimal Loader Files

1. Open `custom-header-code-minimal.html`
2. Find this line:
   ```html
   <link rel="stylesheet" href="https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/jrcc-styles.css">
   ```
3. Replace `YOUR-USERNAME` and `YOUR-REPO` with your actual values

4. Open `custom-footer-code-minimal.html`
5. Find this line:
   ```html
   <script src="https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/jrcc-scripts.js"></script>
   ```
6. Replace `YOUR-USERNAME` and `YOUR-REPO` with your actual values

### Step 5: Add to Chabad One CMS

1. Log into your Chabad One CMS admin panel
2. Navigate to the custom code section
3. **For the Header:**
   - Copy the entire contents of `custom-header-code-minimal.html`
   - Paste into the custom header field
   - Save

4. **For the Footer:**
   - Copy the entire contents of `custom-footer-code-minimal.html`
   - Paste into the custom footer field
   - Save

## Testing

After setup, test that everything works:

1. Visit your website
2. Open browser developer tools (F12)
3. Check the Console tab for any errors
4. Check the Network tab to ensure CSS and JS files load successfully
5. Test different pages:
   - Kosher Food Bank pages
   - Volunteer forms
   - Scholarship forms
   - Education subsidies pages

## Updating Styles

To update styles after initial setup:

1. Edit `jrcc-styles.css` or `jrcc-scripts.js` locally
2. Go to your GitHub repository
3. Click on the file you want to update
4. Click the pencil icon to edit
5. Paste your updated code
6. Click "Commit changes"
7. Changes will be live within 1-2 minutes (CDN cache refresh)

## Using jsDelivr CDN (Recommended)

jsDelivr is faster and more reliable than raw GitHub URLs:

**In custom-header-code-minimal.html:**
```html
<!-- Replace this: -->
<link rel="stylesheet" href="https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/jrcc-styles.css">

<!-- With this: -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/jrcc-styles.css">
```

**In custom-footer-code-minimal.html:**
```html
<!-- Replace this: -->
<script src="https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/jrcc-scripts.js"></script>

<!-- With this: -->
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/jrcc-scripts.js"></script>
```

## Troubleshooting

### Styles/Scripts not loading
- Check that your repository is **public**
- Verify the URLs are correct (username and repo name)
- Check browser console for errors
- Try using jsDelivr CDN instead of raw GitHub URLs

### Changes not appearing
- jsDelivr CDN caches for up to 24 hours
- To force refresh, add a version tag: `@main` → `@latest`
- Or clear your browser cache

### CMS still showing errors
- Make sure you're using the minimal loader files
- Check that no old inline code remains in the CMS

## Page-Specific Styles Included

The external files include styling for:

1. **Kosher Food Bank Pages**
   - Black/White/Gold theme
   - Navigation enhancements
   - Donate button animations

2. **Volunteer Forms**
   - Purple gradient background
   - Enhanced form controls
   - Loading states

3. **Scholarship Forms**
   - Progress indicators
   - Form section styling
   - Submit animations

4. **Education Subsidies**
   - Carousel navigation
   - Card-based layout
   - Interactive elements

5. **JVS Template**
   - Dark modern design
   - Service cards
   - Animated particles

6. **Kehilla Template**
   - Clean blue theme
   - Program cards
   - Event listings

7. **Sidebar Enhancements**
   - Desktop hover sidebar
   - Mobile bottom drawer
   - Smooth animations

## Support

If you need help:
1. Check the browser console for error messages
2. Verify all URLs are correct
3. Ensure GitHub repository is public
4. Try the jsDelivr CDN option

## Future Improvements

Consider these enhancements:
- Minify CSS/JS files for faster loading
- Add versioning for cache busting
- Create separate files for each page template
- Add a build process for optimization

---

**File Size Comparison:**

| File | Original (inline) | GitHub Hosted |
|------|------------------|---------------|
| custom-header-code.html | 1,327 lines | ~50 lines |
| custom-footer-code.html | 2,225 lines | ~20 lines |
| **Total** | **3,552 lines** | **~70 lines** |

**Reduction: 98% smaller!**