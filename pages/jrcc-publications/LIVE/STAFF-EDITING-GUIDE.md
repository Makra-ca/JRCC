# JRCC Publications Page - Staff Editing Guide

## Overview
The JRCC Publications page uses a modern card-based grid layout that automatically styles all publication articles. This guide explains how to manage publications using the Chabad One CMS.

---

## Initial Setup (ONE-TIME ONLY)

### Step 1: Paste the Template
1. Log into Chabad One CMS
2. Navigate to the JRCC Publications page
3. Switch to "Source Code" or "HTML" view
4. **Delete all existing content**
5. Copy the entire contents of `publications-minimal-template.html`
6. Paste into the page editor
7. Save and publish

**That's it!** The template is now active. All styling is controlled by CSS from GitHub.

---

## Adding a New Publication

### Method 1: Using Chabad One Article System (Recommended)

1. **Navigate to Articles Section**
   - In Chabad One CMS, go to the articles management area
   - This is where existing publications (Exodus, Ascend, etc.) are listed

2. **Create New Article**
   - Click "Add New Article" or similar button
   - Fill in the article details:
     - **Title**: Publication name (e.g., "Exodus Magazine", "Ascend")
     - **Image**: Upload the publication cover image
     - **Link**: URL where the publication can be accessed
     - **Description** (optional): Add a subtitle (e.g., "A weekly publication in Russian")

3. **Publish**
   - Save and publish the article
   - The styling will automatically apply!

### Method 2: Manual HTML (Advanced Users Only)

If you need to add HTML directly:

```html
<div class="publications-content">
  <h1>JRCC Publications</h1>

  <!-- Existing articles will appear here automatically -->

</div>
```

**Note:** It's recommended to use Method 1 (Chabad One's article system) as it's simpler and less error-prone.

---

## Editing Existing Publications

1. **Find the Article**
   - Go to the articles management section in Chabad One
   - Locate the publication you want to edit

2. **Make Changes**
   - Update the title, image, link, or description
   - Save changes

3. **View Results**
   - Refresh the JRCC Publications page
   - The changes will appear automatically with proper styling

---

## Removing a Publication

1. Navigate to articles management in Chabad One
2. Find the publication to remove
3. Delete or unpublish the article
4. The publication will be removed from the page

---

## Design Features

### Automatic Styling
All publications automatically receive:
- **Modern card layout** with white background
- **Rounded corners** (16px border-radius)
- **Drop shadows** for depth
- **Hover effects**: Cards lift up and shadow intensifies
- **Image zoom** on hover
- **Responsive grid**: 3 columns desktop, 2 tablet, 1 mobile

### Typography
- **Font**: Urbanist (modern, clean)
- **Title size**: Large, bold, in JRCC blue (#1e5a8e)
- **Description**: Italic, gray text below title

### Image Handling
- Images are automatically cropped to 300px height
- Maintains aspect ratio with `object-fit: cover`
- Zooms slightly on hover for interactive feel

---

## Responsive Behavior

### Mobile (< 768px)
- **Single column** layout
- Larger touch targets
- Images: 250px height

### Tablet (769px - 1024px)
- **Two column** grid
- Balanced spacing

### Desktop (> 1024px)
- **Three column** grid
- Maximum width: 1400px centered
- Generous spacing between cards

---

## Troubleshooting

### Problem: New publications don't appear
**Solution:**
- Check that the article is published (not draft)
- Clear browser cache and refresh
- Verify the article has both a title and image

### Problem: Styling looks wrong
**Solution:**
- Make sure the template from `publications-minimal-template.html` was pasted correctly
- Check that no old HTML code remains from the previous page
- Try clearing browser cache

### Problem: Images look stretched or distorted
**Solution:**
- Upload higher resolution images (recommended: at least 600px wide)
- Images should be landscape orientation (wider than tall)
- The CSS automatically crops to 300px height, so vertical images work best

### Problem: Changes to CSS not appearing
**Solution:**
- The CSS is loaded from GitHub via jsDelivr CDN
- CDN cache may take a few minutes to update
- Add `?v=2` to the CSS URL to force refresh (change number each time)

---

## Important Notes

### DO:
✅ Use Chabad One's article system to add publications
✅ Upload high-quality images
✅ Keep publication titles concise
✅ Add descriptions for context (optional)
✅ Test on mobile after adding new content

### DON'T:
❌ Edit the inline CSS in the template (it will be overwritten)
❌ Remove the `.publications-content` wrapper div
❌ Delete the CSS import lines
❌ Mix different styling methods
❌ Add custom HTML inside article cards

---

## File Structure

```
/pages/jrcc-publications/
├── LIVE/
│   ├── publications-minimal-template.html  ← Paste this into Chabad One
│   ├── publications-minimal.css            ← External CSS (on GitHub)
│   └── STAFF-EDITING-GUIDE.md             ← This guide
└── archive/
    └── original-source.html                ← Original backup
```

---

## Need Help?

If you encounter issues:
1. Review this guide carefully
2. Check that the template was pasted correctly
3. Contact the web developer for assistance
4. Provide screenshots of any errors

---

## Developer Notes

**For developers updating the styling:**
- Edit `publications-minimal.css` on GitHub
- Changes propagate via jsDelivr CDN (may take 1-5 minutes)
- Inline CSS in template provides immediate fallback
- Both CSS files should be kept in sync

**CSS Approach:**
- Targets Chabad One's existing `.co_index` and `.item` classes
- Uses `!important` to override Chabad One's default styles
- Grid layout with `auto-fill` for flexible columns
- Mobile-first responsive design

---

*Last updated: 2025-10-17*
