# Chabad Rural Arizona - GitHub Hosted Version

## Overview

This solution hosts the Chabad Rural Arizona CSS and JavaScript externally, dramatically reducing the file size in the Chabad One CMS.

## Benefits

- **Reduced CMS file size**: From ~1,000+ lines → ~15 lines
- **Easier maintenance**: Update styles without touching the CMS
- **Version control**: Track all changes in Git
- **Instant updates**: Vercel deploys in ~5 seconds after push
- **No more CMS errors**: Avoids file size limitations

## Files in this Directory

| File | Description |
|------|-------------|
| `cra-styles.css` | All CSS styling for the site |
| `cra-scripts.js` | All JavaScript functionality |
| `custom-header-code-vercel.html` | Minimal header loader (~10 lines) |
| `custom-footer-code-vercel.html` | Minimal footer loader (~5 lines) |
| `vercel.json` | Vercel configuration (CORS headers) |

## Setup Instructions

### Step 1: Deploy to Vercel

First time setup:
```bash
cd chabad-rural-arizona/github-hosted/
npx vercel
# Follow prompts, select your team/account
# Note the deployment URL
```

For production:
```bash
npx vercel --prod
```

### Step 2: Update CMS Loader Files

Edit `custom-header-code-vercel.html` and `custom-footer-code-vercel.html`:
- Replace `YOUR-VERCEL-URL` with your actual Vercel deployment URL

### Step 3: Update Chabad One CMS

1. Log into the Chabad One CMS admin panel
2. Navigate to the custom code section

**For the Header:**
- Copy the entire contents of `custom-header-code-vercel.html`
- Paste into the custom header field
- Save

**For the Footer:**
- Copy the entire contents of `custom-footer-code-vercel.html`
- Paste into the custom footer field
- Save

## Vercel URLs

After deployment, your files will be available at:

```
https://YOUR-PROJECT.vercel.app/cra-styles.css
https://YOUR-PROJECT.vercel.app/cra-scripts.js
```

## Updating Styles

1. Edit `cra-styles.css` or `cra-scripts.js` locally
2. Commit and push to GitHub:
   ```bash
   git add . && git commit -m "Update styles" && git push
   ```
3. Vercel auto-deploys in ~5 seconds
4. Changes are live immediately (60-second cache)

## Testing

After setup, test:

1. Visit the main page
2. Open browser DevTools (F12)
3. Check Console tab for errors
4. Check Network tab to ensure CSS and JS load successfully
5. Verify styles are applied correctly

## Troubleshooting

### Styles/Scripts not loading
- Verify Vercel deployment succeeded
- Check the URLs are correct in the CMS loader files
- Check browser console for CORS or 404 errors

### Changes not appearing
- Vercel cache is 60 seconds (per vercel.json)
- Clear browser cache or hard refresh (Ctrl+Shift+R)
- Verify git push completed successfully

### CORS Errors
- The vercel.json includes `Access-Control-Allow-Origin: *`
- If still getting CORS errors, check Vercel deployment logs

## File Size Comparison

| Location | Original (inline) | GitHub Hosted |
|----------|------------------|---------------|
| CMS Header | ~500+ lines | ~10 lines |
| CMS Footer | ~500+ lines | ~5 lines |
| **Total in CMS** | **~1,000+ lines** | **~15 lines** |

**Reduction: ~98% smaller in CMS!**
