# Paradise Valley Events - GitHub Hosted Version

## Overview

This solution hosts the Paradise Valley Events CSS and JavaScript on GitHub, dramatically reducing the file size in the Chabad One CMS.

## Benefits

- **Reduced CMS file size**: From ~1,300 lines → ~15 lines
- **Easier maintenance**: Update styles without touching the CMS
- **Version control**: Track all changes in Git
- **Faster loading**: CDN-cached resources
- **No more CMS errors**: Avoids file size limitations

## Files in this Directory

| File | Description | Lines |
|------|-------------|-------|
| `pv-events-styles.css` | All CSS styling for events pages | ~1,200 lines |
| `pv-events-scripts.js` | All JavaScript functionality | ~500 lines |
| `custom-header-code-minimal.html` | Minimal header loader | ~15 lines |
| `custom-footer-code-minimal.html` | Minimal footer loader | ~20 lines |

## Setup Instructions

### Step 1: Push Changes to GitHub

Make sure the files in this directory are pushed to the `Makra-ca/JRCC` repository:

```bash
git add paradise-valley-events/github-hosted/
git commit -m "Add Paradise Valley events GitHub-hosted files"
git push
```

### Step 2: Update Chabad One CMS

1. Log into the Chabad One CMS admin panel for Paradise Valley
2. Navigate to the custom code section

**For the Header:**
- Copy the entire contents of `custom-header-code-minimal.html`
- Paste into the custom header field
- Save

**For the Footer:**
- Copy the entire contents of `custom-footer-code-minimal.html`
- Paste into the custom footer field
- Save

### Step 3: Clear CDN Cache (if updating)

If you've made changes and they're not appearing:

1. jsDelivr caches for up to 24 hours
2. To force refresh, you can purge the cache at:
   - https://www.jsdelivr.com/tools/purge
3. Enter the full URLs:
   - `https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@main/paradise-valley-events/github-hosted/pv-events-styles.css`
   - `https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@main/paradise-valley-events/github-hosted/pv-events-scripts.js`

## CDN URLs

### CSS
```
https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@main/paradise-valley-events/github-hosted/pv-events-styles.css
```

### JavaScript
```
https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@main/paradise-valley-events/github-hosted/pv-events-scripts.js
```

## Testing

After setup, test that everything works:

1. Visit the events listing page: `/tools/events/`
2. Visit a single event registration page: `/tools/events/register_cdo/...`
3. Open browser developer tools (F12)
4. Check the Console tab for any errors
5. Check the Network tab to ensure CSS and JS files load successfully

## Pages Covered

This styling applies to:

1. **Events Listing Page** (`/tools/events/`)
   - Modern card-based grid layout
   - Responsive design
   - Orange and blue color theme

2. **Single Event Registration** (`/tools/events/register_cdo/...`)
   - Modern form styling
   - Info cards for location/date
   - Orange border around form
   - White background overrides

## Updating Styles

To update styles after initial setup:

1. Edit `pv-events-styles.css` or `pv-events-scripts.js` locally
2. Commit and push to GitHub
3. Purge jsDelivr cache (optional, for immediate effect)
4. Changes will be live within 1-24 hours (CDN cache refresh)

## Troubleshooting

### Styles/Scripts not loading
- Check that the repository is **public**
- Verify the file paths are correct
- Check browser console for errors
- Try the raw GitHub URL as backup

### Changes not appearing
- jsDelivr CDN caches for up to 24 hours
- Purge the cache at https://www.jsdelivr.com/tools/purge
- Or clear your browser cache

### CMS still showing errors
- Make sure you're using the minimal loader files
- Check that no old inline code remains in the CMS

## File Size Comparison

| File | Original (inline) | GitHub Hosted |
|------|------------------|---------------|
| custom-header-code.html | ~1,300 lines | ~15 lines |
| custom-footer-code.html | ~700 lines | ~20 lines |
| **Total** | **~2,000 lines** | **~35 lines** |

**Reduction: 98% smaller in CMS!**
