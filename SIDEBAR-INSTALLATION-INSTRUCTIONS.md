# JRCC Modern Glassmorphism Sidebar - Installation Instructions

## Overview
This will add a modern glassmorphism sidebar to **ALL pages** on your JRCC website:
- **Desktop**: Sidebar slides in from right edge on hover with glass effect
- **Mobile**: iOS-style bottom sheet that slides up when tapped

---

## Step 1: Add Custom Header Code

1. Log into **Chabad One CMS**
2. Go to **Settings** → **Custom Header Code**
3. **Copy the entire contents** of the file: `custom-header-code.html`
4. **Paste it** into the Custom Header Code field
5. Click **Save**

This adds the CSS styling for the sidebar (both desktop and mobile).

---

## Step 2: Add Custom Footer Code

1. Still in **Chabad One CMS Settings**
2. Go to **Custom Footer Code**
3. **Copy the entire contents** of the file: `custom-footer-code.html`
4. **Paste it** into the Custom Footer Code field
5. Click **Save**

This adds the JavaScript that creates the mobile bottom sheet sidebar.

---

## Step 3: Remove Old Mobile Sidebar Code (Optional Cleanup)

Since the sidebar is now site-wide, you can **optionally** clean up your individual templates:

### In these files:
- `pages/yeshiva-scholarship/LIVE/yeshiva-scholarship-template.html`
- `pages/education-subsidies/LIVE/education-subsidies-template.html`

### Remove these sections:
1. The mobile CSS inside `@media (max-width: 768px)` that hides `.g260`
2. The entire `<script>` section that creates the mobile sidebar
3. Keep the desktop glassmorphism CSS (it won't conflict, just be redundant)

**Note:** This cleanup is optional - the site-wide code will override the template-specific code anyway.

---

## How It Works

### Desktop (screen width > 768px):
- Sidebar appears as a tab on the right edge of the screen
- Hovers over to reveal full sidebar with smooth spring animation
- Glassmorphism effect with blur and transparency
- Custom blue gradient indicator that rotates on hover

### Mobile (screen width ≤ 768px):
- Original sidebar is hidden
- Custom bottom sheet is created with:
  - iOS-style handle pill at top
  - 85vh height on small phones (iPhone SE), 80vh on larger phones
  - Glassmorphism frosted glass effect
  - Slides up when tapped or swiped up
  - Dark backdrop overlay appears when open
  - Tap backdrop or press Escape to close

### Content Loading:
The footer JavaScript waits for the CMS to load the full navigation content (not just the search form) before creating the mobile sidebar. It tries multiple times at intervals: 500ms, 1s, 1.5s, 2s, 3s, 4s, 5s to ensure the navigation is fully loaded.

---

## Testing

1. **Desktop**: Hover over the right edge of any page - sidebar should slide out smoothly
2. **Mobile**: Look for a small tab at the bottom of the screen with a pill-shaped handle
3. **Mobile Tap**: Tap the bottom tab - sidebar should slide up
4. **Mobile Close**: Tap the dark area outside the sidebar to close it

---

## Console Logs (for debugging)

Open browser console on mobile to see:
- `JRCC Mobile Sidebar: Sidebar element not found yet...` (if sidebar hasn't loaded)
- `JRCC Mobile Sidebar: Only search form loaded (87 chars), waiting for navigation...` (waiting for nav)
- `JRCC Mobile Sidebar: Creating mobile sidebar with 456 chars of content` (success!)
- `JRCC Mobile Sidebar: Initialization complete!` (ready to use)
- `JRCC Mobile Sidebar: Opened` (when you tap to open)
- `JRCC Mobile Sidebar: Closed` (when you close it)

---

## Files Reference

- **custom-header-code.html** - CSS styling (paste in Custom Header Code)
- **custom-footer-code.html** - JavaScript functionality (paste in Custom Footer Code)

---

## Benefits

✅ **Site-wide** - Works on all pages automatically
✅ **Responsive** - Adapts to all screen sizes
✅ **Modern design** - Glassmorphism and smooth animations
✅ **Single source** - Easy to maintain in one place
✅ **CMS-friendly** - Waits for dynamic content to load
✅ **No template changes** - Works with existing CMS structure

---

## Support

If you encounter issues:
1. Check browser console for error messages
2. Verify both header and footer code were pasted correctly
3. Clear browser cache and reload
4. Test on different devices/browsers
