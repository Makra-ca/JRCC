# CDN Cache Purge Instructions

## The Problem
JSDelivr CDN caches files from GitHub, so when you push updates to GitHub, the changes might not appear immediately on your website.

## Quick Solution - Use @latest Tag
The footer file has been updated to use `@latest` instead of `@main`:
- **@latest**: Caches for up to 10 minutes
- **@main**: Caches for up to 1 week

## Manual Cache Purge (Immediate Update)
If you need changes to appear immediately:

1. **Push your changes to GitHub first**
2. **Wait 2 minutes** for GitHub to update
3. **Purge the CDN cache** by visiting these URLs in your browser:
   - https://purge.jsdelivr.net/gh/Makra-ca/JRCC@main/github-hosted/jrcc-form-styles-all-complete-fixed.js
   - https://purge.jsdelivr.net/gh/Makra-ca/JRCC@main/github-hosted/jrcc-scripts.js
4. **Clear your browser cache** (Ctrl+F5 or Cmd+Shift+R)
5. **Test your page** - changes should now be visible

## What Was Fixed
✅ **Dropdown Selected Text Issue**: All select elements now excluded from padding styles that were hiding the selected text
✅ **CDN Caching**: Changed from `@main` to `@latest` for faster updates
✅ **Clear Instructions**: Added cache purge instructions directly in the footer file

## Files Updated
- `jrcc-form-styles-all-complete-fixed.js` - Fixed ALL select element styling issues
- `custom-footer-code-final-fixed.html` - Updated to use @latest tag for faster CDN updates

## Testing After Push
1. Push changes to GitHub
2. Either wait 10 minutes OR use the manual purge URLs above
3. Update your CMS with the content from `custom-footer-code-final-fixed.html`
4. Test the dropdown functionality on:
   - Healthy At Home Registration page
   - Seniors Night Out page
   - All other form pages