# GitHack Migration Guide

## What is GitHack?
GitHack is a CDN service that serves raw files from GitHub with proper Content-Type headers and faster cache invalidation (5 minutes vs jsDelivr's 10+ minutes).

## URL Changes

### OLD URLs (jsDelivr)
```
https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@latest/github-hosted/jrcc-styles.css
https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@latest/github-hosted/jrcc-form-styles-all-complete-fixed.js
https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@latest/github-hosted/jrcc-scripts.js
```

### NEW URLs (GitHack)
```
https://raw.githack.com/Makra-ca/JRCC/main/github-hosted/jrcc-styles.css
https://raw.githack.com/Makra-ca/JRCC/main/github-hosted/jrcc-form-styles-all-complete-fixed.js
https://raw.githack.com/Makra-ca/JRCC/main/github-hosted/jrcc-scripts.js
```

## Migration Steps

### 1. Update Each Page Footer

In the Chabad One CMS, find the footer section where you added the scripts/styles.

**OLD footer code:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@latest/github-hosted/jrcc-styles.css">
<script src="https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@latest/github-hosted/jrcc-form-styles-all-complete-fixed.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@latest/github-hosted/jrcc-scripts.js"></script>
```

**NEW footer code:**
```html
<link rel="stylesheet" href="https://raw.githack.com/Makra-ca/JRCC/main/github-hosted/jrcc-styles.css">
<script src="https://raw.githack.com/Makra-ca/JRCC/main/github-hosted/jrcc-form-styles-all-complete-fixed.js"></script>
<script src="https://raw.githack.com/Makra-ca/JRCC/main/github-hosted/jrcc-scripts.js"></script>
```

### 2. Pages to Update

Update the footer on ALL pages that use the styling:
- ✅ About Us page
- ✅ Volunteer Form page
- ✅ FAQ page
- ✅ Donate Now (KFB) page
- ✅ Donate page
- ✅ Matanot La'evyonim page
- ✅ Kosher Food Bank page
- ✅ Get Help page
- ✅ Purim Matanot La'evyonim page (when you re-enable it)

### 3. Test on One Page First

**Recommended approach:**
1. Update ONE page footer (e.g., About Us)
2. Save the page
3. Open that page in browser
4. Check console (F12) for errors
5. Verify styling works
6. If all good → update remaining pages

### 4. Verify Changes Work

After updating a page:
1. **Hard refresh** the page (Ctrl+Shift+R or Cmd+Shift+R)
2. **Open console** (F12)
3. **Check Network tab** - verify files load from `raw.githack.com`
4. **Verify styling** appears correctly

## Benefits of GitHack

- ✅ **Faster cache updates** - 5 minutes instead of 10+
- ✅ **No manual purging** needed
- ✅ **No account required**
- ✅ **Global CDN** - fast worldwide
- ✅ **Free forever**
- ✅ **Proper MIME types** - serves CSS as `text/css`, JS as `application/javascript`

## Future Workflow

When you make changes to CSS/JS:
1. Edit files locally
2. Commit and push to GitHub
3. **Wait ~5 minutes** (no purging needed!)
4. Hard refresh browser
5. Changes appear automatically

## Troubleshooting

### If styles don't appear after migration:
1. Check browser console for 404 errors
2. Verify the URLs are spelled correctly
3. Make sure you're using `/main/` not `/@latest/`
4. Hard refresh (Ctrl+Shift+R)

### If you see old cached version:
1. Wait 5 minutes after pushing to GitHub
2. Hard refresh browser (Ctrl+Shift+R)
3. If still old, clear browser cache completely

## Rollback Plan

If GitHack doesn't work for some reason, just swap back to jsDelivr URLs - they'll still work!

---

**Ready to migrate? Start with one page and test!**
