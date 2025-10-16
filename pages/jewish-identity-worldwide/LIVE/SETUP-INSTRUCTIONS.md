# Setup Instructions

## For Technical Staff - One-Time Setup

---

## Step 1: Upload CSS to GitHub

1. Create a GitHub repository (or use existing one)
2. Upload `worldwide-styles.css` to your repo
3. Get the raw file URL (click "Raw" button on GitHub)
4. It will look like: `https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/worldwide-styles.css`

---

## Step 2: Update HTML File

1. Open `worldwide-content-only.html`
2. Find this line at the top:
   ```html
   <link rel="stylesheet" href="https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/pages/jewish-identity-worldwide/LIVE/worldwide-styles.css">
   ```
3. Replace with YOUR actual GitHub raw URL

---

## Step 3: Upload to Chabad One

1. Copy the entire contents of `worldwide-content-only.html`
2. Paste into Chabad One CMS body/content area
3. Save and publish

---

## Benefits of This Approach

✅ **Staff only edit data** - No risk of breaking CSS/JavaScript
✅ **Centralized styling** - Update CSS once, affects all pages
✅ **Easy maintenance** - Staff can add content without technical help
✅ **Version control** - GitHub tracks all styling changes

---

## Updating Styles in Future

To change the page design:
1. Edit `worldwide-styles.css`
2. Upload to GitHub
3. Changes automatically apply to the live page
4. **Staff don't need to do anything!**

---

## For Staff Editing Content

See [EDITING-INSTRUCTIONS.md](EDITING-INSTRUCTIONS.md) for how to add/edit services.
