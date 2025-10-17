# Chabad One CMS - Styling Approach

## The Problem
- Chabad One only provides a basic WYSIWYG text editor
- Staff need to edit content easily without code knowledge
- Design/styling needs to be controlled separately and updated globally
- No external stylesheet support, CDN caching issues

## The Solution: Minimal Template + External CSS

### Architecture
1. **One-time HTML template** - Pasted into Chabad One CMS once
2. **External CSS from GitHub** - Controls all styling, loaded via `@import`
3. **Staff edit visually** - Use WYSIWYG editor, copy/paste existing content

### Why This Works
✅ Staff edit content like a Word document (no code needed)
✅ Design updates via GitHub CSS (no CMS edits needed)
✅ No JSON/complex structures for staff to understand
✅ Copy/paste workflow is intuitive for non-technical users
✅ No CDN caching issues with `@import`

---

## Implementation Steps

### Step 1: Create Minimal HTML Template
**File:** `[page-name]-minimal-template.html`

```html
<!-- Load styling from GitHub -->
<style>
@import url('https://cdn.jsdelivr.net/gh/USER/REPO@main/path/to/styles.css');
</style>

<div class="content-wrapper">
<!-- Example content with proper structure -->
<h1>Page Title</h1>
<p class="subtitle"><em>Subtitle text</em></p>

<h2>Section Name</h2>

<div class="card-item">
<h3>Card Title</h3>
<p>Card content...</p>
</div>

</div>
```

**Key Points:**
- Use `<style>@import</style>` not `<link>` (avoids XML errors)
- Wrap content in a container div with unique class
- Provide example content showing structure
- Include HTML comments explaining how to edit

### Step 2: Create Smart CSS File
**File:** `[page-name]-minimal.css`

**Strategy:**
- Target standard HTML elements (h1, h2, h3, p, a, div)
- Use structural selectors based on container class
- Don't require staff to add custom classes
- Style by HTML hierarchy/position

**Example Structure:**
```css
/* Container */
.content-wrapper { ... }

/* Headers */
.content-wrapper > h1 { ... }
.content-wrapper h2 { ... }
.content-wrapper h3 { ... }

/* Cards/Items */
.content-wrapper .card-item { ... }
.content-wrapper .card-item:hover { ... }

/* Links, paragraphs */
.content-wrapper a { ... }
.content-wrapper p { ... }
```

### Step 3: Create Staff Guide
**File:** `STAFF-EDITING-GUIDE.md`

**Include:**
- How to add new items using copy/paste
- How to use Source view for templates
- Copy/paste templates for different card types
- What to edit (just the text content)
- What NOT to change (class names, structure)

---

## Staff Workflow

### Adding New Content:
1. **Find similar existing item** in visual editor
2. **Copy it** (Ctrl+C)
3. **Paste where you want it** (Ctrl+V)
4. **Edit the text** (change names, links, details)
5. **Save**

### Alternative (Source View):
1. Click **"Source"** button in toolbar
2. **Copy existing `<div class="card-item">...</div>` block**
3. **Paste it** where needed
4. Click **"Source"** to return to visual editor
5. **Edit the text**
6. **Save**

---

## Developer Workflow

### Updating Design:
1. Edit CSS file locally
2. Push to GitHub
3. Changes apply automatically (jsDelivr CDN picks it up)
4. No CMS edits needed

### Adding New Card Types:
1. Add new CSS classes to stylesheet
2. Update staff guide with new template
3. Staff copy/paste the new template

---

## Key Principles

### ✅ DO:
- Use semantic HTML (h1, h2, h3, p, div)
- Style by structure, not custom classes
- Provide copy/paste templates for staff
- Use `@import` in `<style>` tags (not `<link>`)
- Give content wrapper a unique class name
- Include example content in template

### ❌ DON'T:
- Don't use JSON or complex data structures
- Don't require staff to add classes manually
- Don't use `<link>` tags (causes XML errors in Chabad One)
- Don't rely on external JavaScript if possible
- Don't create complex editing workflows

---

## File Structure

```
/pages/[page-name]/
├── [page-name]-minimal-template.html  # One-time paste into CMS
├── [page-name]-minimal.css            # External CSS on GitHub
├── STAFF-EDITING-GUIDE.md             # How to edit content
└── QUICK-ADD-CARD-GUIDE.md            # Quick reference with templates
```

---

## Example: Jewish Identity Worldwide Page

**Files Created:**
- `worldwide-minimal-template.html` - Template with example services
- `worldwide-minimal.css` - Styles all cards, headers, links automatically
- `STAFF-EDITING-GUIDE.md` - Comprehensive editing guide
- `QUICK-ADD-CARD-GUIDE.md` - Quick copy/paste reference

**How It Works:**
- Staff paste template once into Chabad One
- They copy existing service cards and modify text to add new services
- All styling (gradients, shadows, fonts, colors) comes from CSS on GitHub
- Design updates happen via CSS push, no CMS changes needed

**Result:**
- Non-technical staff can add/edit services easily
- Designer has full control via external CSS
- No JSON, no complex code, no training needed

---

## Troubleshooting

### CSS Not Loading:
- Check `@import` syntax is correct
- Verify GitHub CSS file path is correct
- Clear browser cache
- Check jsDelivr CDN: `https://cdn.jsdelivr.net/gh/USER/REPO@main/path/file.css`

### Styling Not Applied:
- Use browser DevTools to check CSS specificity
- May need to add `!important` to override Chabad One defaults
- Check if content wrapper class name matches CSS selectors

### XML Errors:
- Use `<style>@import url(...);</style>` not `<link>`
- Ensure all tags are properly closed
- Check for special characters in content

---

## Summary

**This approach gives you:**
1. **Separation of concerns** - Content vs Design
2. **Easy editing** - Copy/paste for non-technical staff
3. **Global design control** - Update CSS once, affects all instances
4. **No training needed** - Intuitive WYSIWYG workflow
5. **Maintainable** - Clear structure, documented approach

**Perfect for Chabad One CMS limitations!** 🎉
