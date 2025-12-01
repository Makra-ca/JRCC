# Chabad Rural Arizona - Website Redesign

## Overview

This project contains the custom styling and scripts for the Chabad Rural Arizona website, hosted on Chabad One CMS. Similar to Paradise Valley Events, we use minimal header/footer injection that fetches assets from Vercel for instant updates.

## Project Structure

```
chabad-rural-arizona/
├── README.md                    # This file
├── test-main-page.js            # Development script (CSS + JS combined)
├── github-hosted/               # Production files for Vercel deployment
│   ├── README.md                # Deployment instructions
│   ├── DEPLOY.md                # Quick deploy reference
│   ├── vercel.json              # Vercel configuration
│   ├── .gitignore               # Ignore .vercel folder
│   ├── cra-styles.css           # Production CSS (extracted from .js)
│   ├── cra-scripts.js           # Production JavaScript
│   ├── custom-header-code-vercel.html  # Minimal header for CMS
│   └── custom-footer-code-vercel.html  # Minimal footer for CMS
└── mockups/                     # Design mockups (if needed)
```

## Development Workflow

### Phase 1: Development (Current)

1. **Edit the combined script**: Work in `test-main-page.js`
   - Contains both CSS and JavaScript
   - Inject directly into browser console for testing
   - Iterate quickly without touching CMS

2. **Test on live site**:
   - Open the Chabad Rural Arizona website
   - Open browser DevTools (F12)
   - Paste the script into Console
   - See changes immediately

### Phase 2: Production (Once Working)

1. **Extract CSS**: Copy CSS from script into `github-hosted/cra-styles.css`
2. **Extract JS**: Copy JS logic into `github-hosted/cra-scripts.js`
3. **Deploy to Vercel**: Push to GitHub, Vercel auto-deploys
4. **Update CMS**: Paste minimal loader code into Chabad One

## Color Palette (Suggested)

| Purpose | Color | Hex |
|---------|-------|-----|
| Primary | Desert Orange | `#D2691E` |
| Secondary | Sage Green | `#87A96B` |
| Accent | Desert Gold | `#C19A6B` |
| Background | Warm Cream | `#FAF8F5` |
| Text | Dark Brown | `#3D2914` |

*Adjust based on brand guidelines*

## CMS Integration

### Minimal Header Code
```html
<!-- CHABAD RURAL ARIZONA - Custom Header Code -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="https://YOUR-VERCEL-URL.vercel.app/cra-styles.css">
```

### Minimal Footer Code
```html
<!-- CHABAD RURAL ARIZONA - Custom Footer Code -->
<script src="https://YOUR-VERCEL-URL.vercel.app/cra-scripts.js"></script>
```

## Pages to Redesign

- [ ] Main/Home page (primary focus)
- [ ] Events page
- [ ] About page
- [ ] Contact page

## Benefits of This Approach

1. **~98% smaller CMS footprint**: From 1000+ lines → ~15 lines
2. **Instant updates**: Push to GitHub → live in ~5 seconds
3. **Version control**: Track all changes in Git
4. **Easy rollback**: Revert to previous version if needed
5. **No CMS errors**: Avoids file size/character limitations

## Related Projects

- [Paradise Valley Events](../paradise-valley-events/) - Same architecture, good reference

## Quick Start

```bash
# 1. Create your development script
touch chabad-rural-arizona/test-main-page.js

# 2. Add your CSS + JS code
# 3. Test by pasting into browser console
# 4. Once working, extract to github-hosted/
# 5. Deploy with Vercel
```
