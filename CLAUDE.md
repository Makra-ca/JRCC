# JRCC Website Development Context

## Project Overview
- **Organization**: JRCC (Jewish Russian Community Center)
- **Platform**: Chabad One CMS (constraint: must continue using this platform)
- **Development Approach**: HTML injection into basic text editor

## Technical Constraints & Approach
- **Platform Limitation**: Chabad One only provides a basic text editor
- **Solution**: Inject complete HTML/CSS/JavaScript code into the CMS
- **Styling Method**: Inline CSS within the HTML files (no external stylesheets)
- **Current Focus**: History page redesign

## User Requirements
- **End Users**: Non-technical staff at JRCC
- **Goal**: Make content updates accessible to non-coders
- **Solution**: JSON-based data structure for timeline events
- **Primary File**: `history-json-based.html` - recommended for easy editing

## File Structure
- `history-json-based.html` - ✅ **MAIN FILE** - Easy JSON editing for non-technical users
- `history-for-chabad-one.html` - Legacy version with manual HTML
- `History - JRCC.org.html` - Original archive from website
- `history-original.html` - Original backup version
- `EDITING-INSTRUCTIONS.md` - User guide for non-technical staff

## Development Guidelines
1. **Self-contained Files**: All CSS and JavaScript must be inline/embedded
2. **User-friendly Editing**: Use JSON data structures for content that needs regular updates
3. **Clear Documentation**: Provide simple editing instructions for non-technical users
4. **Chabad One Compatible**: Ensure all code works when injected into their CMS platform
5. **Responsive Design**: Must work across different devices and screen sizes

## Chabad One CMS Animation Constraints

### What DOESN'T Work ❌
The CMS strips or breaks these animation types:
- **Complex multi-property animations** (transform + box-shadow + background changes together)
- **Typewriter effects** using `overflow: hidden` and `white-space: nowrap` (interferes with CMS text editor)
- **Transform animations** (scale, translate, rotate) on editable content
- **Gradient background animations** (animating gradient color stops)
- **Multiple simultaneous property changes** on the same element

### What WORKS ✅
**Simple opacity-only animations** are the most reliable:

```css
@keyframes opacityPulse {
    0%, 100% {
        opacity: 0.85 !important;
    }
    50% {
        opacity: 1 !important;
    }
}

.animated-element {
    animation: opacityPulse 2s ease-in-out infinite !important;
}
```

### Text Readability Requirements
- **High contrast is essential**: Dark text on light backgrounds
- **Avoid**: White or light text on dark gradient backgrounds
- **Prefer**: Dark blue text (#1e5a8e) on light blue backgrounds (#e3f2fd → #bbdefb)
- **Add borders**: 3px solid borders help define elements with subtle backgrounds
- **No text-shadow**: Can reduce readability on gradient backgrounds

### Example Working Button
```css
.call-to-action-button {
    animation: opacityPulse 2s ease-in-out infinite !important;
    font-weight: 700 !important;
    font-size: 1.875rem !important;
    color: #1e5a8e !important;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%) !important;
    padding: 1.5rem 3rem !important;
    border-radius: 18px !important;
    border: 3px solid #2a75b8 !important;
}
```

### Key Principle
**Keep animations simple and separated from content areas that need to be editable in the CMS text editor.**

## CSS Specificity Issue ⚠️
**CRITICAL**: Inline styles in HTML content override CSS classes, even with `!important`.

When Chabad One's visual editor adds inline styles like `<span style="font-size:26px;">`, these will override your CSS class definitions.

**Solution**: Either remove inline style wrappers from the HTML content, or edit the inline style values directly to match your desired size. CSS classes alone won't override inline styles.

## Git Workflow
**IMPORTANT**: Do NOT use `git commit` or `git push` unless explicitly requested by the user.
- The user will handle all git commits and pushes themselves
- You may use `git add` to stage files if needed
- Wait for explicit permission before committing changes

## Timeline Data Structure
Events stored in JSON format within `<script type="application/json" id="timeline-data">` tags:
```json
{
  "YEAR": [
    "Event description 1",
    "Event description 2"
  ]
}
```

This approach allows non-technical users to easily add/edit timeline events without touching HTML/CSS code.

---

## LIVE Template Fixes - Hamburger Navigation & H1 Clipping

### Background
Multiple LIVE template pages had critical issues preventing proper hamburger navigation and causing H1 title text to clip on larger screens. These issues were systematically debugged and fixed in `holiday-tickets-template.html` and `event-tickets-template.html`, serving as reference implementations.

### Issues Discovered

#### Issue #1: Hamburger Navigation Menu "Whited Out"
**Symptom**: When hamburger menu opens, dark overlay appears but menu items are invisible/white.

**Root Cause**: `.clearfix` element with cream/white background and `z-index: 999` was covering the dark overlay backdrop.

**Debugging Method**:
```javascript
// Browser console script to check overlay elements
const overlay = document.querySelector('[class*="overlay"]');
const clearfix = document.querySelector('.clearfix');
console.log('Overlay z-index:', window.getComputedStyle(overlay).zIndex);
console.log('Clearfix z-index:', window.getComputedStyle(clearfix).zIndex);
console.log('Clearfix background:', window.getComputedStyle(clearfix).background);
```

**The Problem Pattern**:
```css
/* ❌ WRONG - This breaks hamburger nav */
body.cco_body,
#BodyContainer,
#co_content_container,
.clearfix,  /* ← THIS CAUSES THE ISSUE */
.some-content-class {
    background: #faf8f5 !important;
}
```

**The Solution**:
```css
/* ✅ CORRECT - Hamburger nav works */
body,
body.cco_body {
    background-image: none !important;
    background: #faf8f5 !important;
}

#BodyContainer,
#co_content_container,
.body_wrapper,
#content {
    background-image: none !important;
    background: transparent !important;  /* ← transparent, not colored */
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

.master-content-wrapper,
.master-content-wrapper.g960,
div.master-content-wrapper,
div.master-content-wrapper.g960 {
    background-image: none !important;
    background: transparent !important;  /* ← transparent, not colored */
    background-color: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    min-height: 0 !important;
}
/* Note: .clearfix is NEVER mentioned in background declarations */
```

**Key Principle**: Only `body` elements get the page background color. All container elements must be `transparent` to preserve sidebar backgrounds and hamburger menu overlays.

---

#### Issue #2: H1 Text Clipping at Top on Large Screens
**Symptom**: Top of tall letters like "H" in "Holiday" get cut off when viewing on screens >1190px width.

**Root Causes** (Multiple factors):
1. **CMS-injected SECTION wrapper**: Chabad One wraps H1 in a `<section>` tag that restricts height (e.g., 142.5px wrapper for 143px H1)
2. **Insufficient padding-top**: Font size 45px (4.5rem) needs more than 40px (4rem) padding for ascenders
3. **Sub-pixel rendering issues**: Parent containers 0.5px shorter than child causing visual clipping
4. **Non-responsive padding**: Fixed padding doesn't scale with responsive font sizes

**Debugging Method**:
```javascript
// Browser console script to diagnose clipping
const h1 = document.querySelector('.PAGENAME-hero h1');
const parent = h1.parentElement;
const styles = window.getComputedStyle(h1);
const parentStyles = window.getComputedStyle(parent);

console.log('H1 dimensions:', {
    offsetHeight: h1.offsetHeight,
    scrollHeight: h1.scrollHeight,
    fontSize: styles.fontSize,
    lineHeight: styles.lineHeight,
    paddingTop: styles.paddingTop
});

console.log('Parent dimensions:', {
    height: parentStyles.height,
    overflow: parentStyles.overflow,
    tagName: parent.tagName  // ← Often shows SECTION (CMS-injected)
});

console.log('Clipping?', h1.scrollHeight > h1.clientHeight);
```

**Real Example Output** (from holiday-tickets page at 1190px):
```
H1 dimensions: {
    offsetHeight: 143,
    scrollHeight: 143,
    fontSize: '45px',
    paddingTop: '50px'  // 5rem, but still not enough!
}

Parent dimensions: {
    height: '142.5px',  // ← 0.5px SHORTER than H1!
    tagName: 'SECTION'  // ← CMS injected this!
}
```

**The Complete Solution** (Multi-part fix):

**Part A: Fix CMS-Injected SECTION Wrapper**
```css
/* Add BEFORE H1 styles in HERO SECTION */

/* Hero Container - Ensure no clipping */
.PAGENAME-hero {  /* Change PAGENAME to match your page */
    overflow: visible !important;
    height: auto !important;
    min-height: auto !important;
}

/* Fix CMS-injected SECTION wrapper that clips H1 */
.PAGENAME-hero section,
.PAGENAME-hero > section {
    overflow: visible !important;
    height: auto !important;
    min-height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
}
```

**Part B: Update H1 Styles with Responsive Padding**
```css
/* Main Page Title (H1) - Burgundy Background */
.PAGENAME-content > h1,
.PAGENAME-content h1:first-child,
.PAGENAME-hero h1 {
    font-family: 'Urbanist', sans-serif !important;
    font-size: clamp(2.5rem, 8vw, 4.5rem) !important;  /* ← CHANGED: max 4.5rem (was 7.5rem) */
    font-weight: 800 !important;
    color: #ffffff !important;
    text-align: center !important;
    background: linear-gradient(135deg, #7d2e4d 0%, #9b3d5f 100%) !important;
    padding: clamp(2.5rem, 8vw, 8rem) 2rem clamp(1rem, 2vw, 2rem) !important;  /* ← CHANGED: responsive padding */
    margin: 0 !important;
    text-shadow: 0 2px 10px rgba(0,0,0,0.2) !important;
    letter-spacing: -1px !important;
    line-height: 1.5 !important;  /* ← CHANGED: from 1.2 */
    overflow: visible !important;  /* ← ADDED */
    position: relative !important;  /* ← ADDED */
    display: block !important;  /* ← ADDED */
}
```

**Part C: Fix H2 Gap**
```css
/* Subtitle (H2 in hero) - Part of burgundy banner */
.PAGENAME-hero h2 {
    font-family: 'Urbanist', sans-serif !important;
    font-size: clamp(1.6rem, 5vw, 2.5rem) !important;  /* ← CHANGED: max 2.5rem (was 3.75rem) */
    font-weight: 600 !important;
    color: #f4e4c1 !important;
    text-align: center !important;
    background: linear-gradient(135deg, #7d2e4d 0%, #9b3d5f 100%) !important;
    padding: 0 2rem 4rem !important;  /* ← CHANGED: top padding 0 (was 1rem) */
    margin: 0 0 3rem 0 !important;
    font-style: italic !important;
    line-height: 1.3 !important;
}
```

**Part D: Add Responsive Media Queries**
```css
/* Add AFTER mobile @media (max-width: 768px) section */
/* Add BEFORE "OVERRIDE CHABAD ONE SPECIFICITY" section */

/* Large screens - Extra padding for larger font sizes */
@media (min-width: 769px) and (max-width: 1199px) {
    .PAGENAME-content > h1,
    .PAGENAME-content h1:first-child,
    .PAGENAME-hero h1 {
        padding: 7rem 2rem 2rem !important;  /* 112px top for 45px font */
        line-height: 1.6 !important;
        min-height: 150px !important;
    }
}

/* Extra large screens - Maximum padding for maximum font size */
@media (min-width: 1200px) {
    .PAGENAME-content > h1,
    .PAGENAME-content h1:first-child,
    .PAGENAME-hero h1 {
        padding: 9rem 2rem 2.5rem !important;  /* 144px top for max 72px font */
        line-height: 1.6 !important;
        min-height: 180px !important;
    }
}
```

---

#### Issue #3: Duplicate Override Sections
**Symptom**: After fixing Issues #1 and #2, hamburger nav and sidebar still broken.

**Root Cause**: Duplicate `<style>` blocks at the end of the HTML file re-applying the problematic background rules.

**Location**: After closing `</div>` of main content, before final closing tags.

**The Problem**:
```html
</div>

<!-- ❌ DELETE THIS ENTIRE SECTION -->
<!-- Force remove background image (overrides Chabad One inline styles) -->
<style type="text/css">
/* Additional overrides to ensure cream background */
body,
body.cco_body,
#BodyContainer,
#co_content_container,
.clearfix,  /* ← Re-introduces the hamburger nav bug! */
.body_wrapper,
#content,
div[class*="wrapper"],
div[class*="content"] {
    background-image: none !important;
    background: #faf8f5 !important;  /* ← Breaks sidebar! */
}
</style>
```

**Solution**: Delete the entire duplicate style block. The correct styles at the top of the file are sufficient.

---

### Step-by-Step Fix Guide for Remaining Pages

#### Files Requiring Fixes (15 remaining):
Located in `pages/[page-name]/LIVE/[page-name]-template.html`:
- jewish-identity-grant-template.html
- jewish-identity-grants-template.html
- kosher-grant-template.html
- sheitel-grant-template.html
- employment-assistance-template.html
- tax-clinic-template.html
- legal-consulting-template.html
- mezuzah-tefillin-template.html
- seniors-building-services-template.html
- welcome-meeting-template.html
- publications-minimal-template.html
- worldwide-content-only-inline.html
- worldwide-inline-template.html
- worldwide-minimal-template.html
- mezuzah-bank-template.html
- tefillin-bank-template.html

#### Reference Implementations (Already Fixed):
- ✅ `pages/holiday-tickets/LIVE/holiday-tickets-template.html` - COMPLETE REFERENCE
- ✅ `pages/event-tickets/LIVE/event-tickets-template.html` - COMPLETE REFERENCE
- ✅ `pages/financial-assistance/LIVE/financial-assistance-template.html` - Original working example

---

### Detailed Fix Procedure

**STEP 1: Identify Page-Specific Class Names**

Each page uses unique class prefixes. Find them in the HTML:
```html
<div class="PAGENAME-content">
    <div class="PAGENAME-hero">
        <h1>Page Title</h1>
```

Example mappings:
- `holiday-tickets-template.html` → `.holiday-tickets-content`, `.holiday-tickets-hero`
- `event-tickets-template.html` → `.event-tickets-content`, `.event-tickets-hero`
- `jewish-identity-grant-template.html` → `.jewish-identity-grant-content`, `.jewish-identity-grant-hero`

**Throughout this guide, replace `PAGENAME` with the actual prefix for the page you're fixing.**

---

**STEP 2: Fix Background CSS Section**

**Location**: After "Reset and Base Styles" comment, before "Hide Breadcrumbs" comment.

**Find and Delete**: The entire existing background section (usually 20-40 lines). Look for sections containing:
- `body.cco_body`
- `.clearfix` ← KEY INDICATOR
- `[class*="wrapper"]` or `[class*="container"]` ← KEY INDICATOR
- Comments like "Clean Background" or "Remove background images from all Chabad One containers"

**Example of what to DELETE**:
```css
/* ❌ DELETE THIS ENTIRE SECTION */
/* Clean Background */
body.cco_body,
#BodyContainer,
#co_content_container,
.clearfix,
.PAGENAME-content {
    background: #faf8f5 !important;
}

/* Remove background images from all Chabad One containers */
body,
body.cco_body,
#BodyContainer,
[class*="wrapper"],
[class*="container"] {
    background: #faf8f5 !important;
}
/* ❌ END DELETE */
```

**Replace with this EXACT pattern**:
```css
/* Remove default background images and spacing - but preserve sidebar */
body,
body.cco_body {
    background-image: none !important;
    background: #faf8f5 !important;
}

/* Base overflow and spacing fixes for main containers */
#BodyContainer,
#co_content_container,
.body_wrapper,
#content {
    background-image: none !important;
    background: transparent !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

/* Remove background images from CMS wrappers */
.master-content-wrapper,
.master-content-wrapper.g960,
div.master-content-wrapper,
div.master-content-wrapper.g960 {
    background-image: none !important;
    background: transparent !important;
    background-color: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    min-height: 0 !important;
}
```

**Critical Verification**:
- ✅ Only `body` and `body.cco_body` have the page background color
- ✅ All other containers are `transparent`
- ✅ `.clearfix` is NOT mentioned anywhere
- ✅ NO broad selectors like `[class*="wrapper"]`

---

**STEP 3: Add CMS Section Wrapper Fix**

**Location**: In the HERO SECTION, immediately BEFORE the H1 styles comment.

**Find this**:
```css
/* ===================================================================
   HERO SECTION - [THEME NAME]
   =================================================================== */

/* Main Page Title (H1) - ... */
```

**Insert BETWEEN the section comment and H1 comment**:
```css
/* ===================================================================
   HERO SECTION - [THEME NAME]
   =================================================================== */

/* Hero Container - Ensure no clipping */
.PAGENAME-hero {
    overflow: visible !important;
    height: auto !important;
    min-height: auto !important;
}

/* Fix CMS-injected SECTION wrapper that clips H1 */
.PAGENAME-hero section,
.PAGENAME-hero > section {
    overflow: visible !important;
    height: auto !important;
    min-height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
}

/* Main Page Title (H1) - ... */
```

**Remember**: Replace `.PAGENAME-hero` with the actual class name from your page (e.g., `.holiday-tickets-hero`).

---

**STEP 4: Update H1 Styles**

**Location**: Find the H1 selector block (usually `.PAGENAME-content > h1`).

**Find the existing H1 block**:
```css
.PAGENAME-content > h1,
.PAGENAME-content h1:first-child,
.PAGENAME-hero h1 {
    /* existing styles */
}
```

**Update these specific properties** (keep other properties unchanged):

| Property | Old Value | New Value | Why |
|----------|-----------|-----------|-----|
| `font-size` | `clamp(3rem, 10vw, 7.5rem)` | `clamp(2.5rem, 8vw, 4.5rem)` | Prevent overflow on large screens |
| `padding` | `4rem 2rem 2rem` | `clamp(2.5rem, 8vw, 8rem) 2rem clamp(1rem, 2vw, 2rem)` | Responsive padding that scales with screen size |
| `line-height` | `1.2` | `1.5` | More vertical space for ascenders |
| `overflow` | (add new) | `visible !important` | Ensure text not cut off |
| `position` | (add new) | `relative !important` | Better positioning control |
| `display` | (add new) | `block !important` | Proper block-level rendering |

**Complete Updated H1 Block**:
```css
.PAGENAME-content > h1,
.PAGENAME-content h1:first-child,
.PAGENAME-hero h1 {
    font-family: 'Urbanist', sans-serif !important;
    font-size: clamp(2.5rem, 8vw, 4.5rem) !important;
    font-weight: 800 !important;
    color: #ffffff !important;
    text-align: center !important;
    background: linear-gradient(135deg, #7d2e4d 0%, #9b3d5f 100%) !important;
    padding: clamp(2.5rem, 8vw, 8rem) 2rem clamp(1rem, 2vw, 2rem) !important;
    margin: 0 !important;
    text-shadow: 0 2px 10px rgba(0,0,0,0.2) !important;
    letter-spacing: -1px !important;
    line-height: 1.5 !important;
    overflow: visible !important;
    position: relative !important;
    display: block !important;
}
```

**Note**: Keep the existing `background` gradient colors from the original file - they vary by page theme.

---

**STEP 5: Update H2 Styles**

**Location**: Find the H2 hero subtitle block (usually `.PAGENAME-hero h2`).

**Update these specific properties**:

| Property | Old Value | New Value | Why |
|----------|-----------|-----------|-----|
| `font-size` | `clamp(1.8rem, 6vw, 3.75rem)` | `clamp(1.6rem, 5vw, 2.5rem)` | Prevent overflow, proportional to H1 |
| `padding` | `1rem 2rem 4rem` | `0 2rem 4rem` | Remove top padding to eliminate gap |

**Complete Updated H2 Block**:
```css
.PAGENAME-hero h2 {
    font-family: 'Urbanist', sans-serif !important;
    font-size: clamp(1.6rem, 5vw, 2.5rem) !important;
    font-weight: 600 !important;
    color: #f4e4c1 !important;
    text-align: center !important;
    background: linear-gradient(135deg, #7d2e4d 0%, #9b3d5f 100%) !important;
    padding: 0 2rem 4rem !important;
    margin: 0 0 3rem 0 !important;
    font-style: italic !important;
    line-height: 1.3 !important;
}
```

---

**STEP 6: Add Responsive Media Queries**

**Location**: In the RESPONSIVE DESIGN section, AFTER the mobile media query `@media (max-width: 768px) { }`, BEFORE the "OVERRIDE CHABAD ONE SPECIFICITY" comment.

**Find this structure**:
```css
/* ===================================================================
   RESPONSIVE DESIGN
   =================================================================== */

@media (max-width: 768px) {
    /* mobile styles */
}

/* ===================================================================
   OVERRIDE CHABAD ONE SPECIFICITY
   =================================================================== */
```

**Insert BETWEEN the mobile closing brace and OVERRIDE comment**:
```css
@media (max-width: 768px) {
    /* mobile styles */
}

/* Large screens - Extra padding for larger font sizes */
@media (min-width: 769px) and (max-width: 1199px) {
    .PAGENAME-content > h1,
    .PAGENAME-content h1:first-child,
    .PAGENAME-hero h1 {
        padding: 7rem 2rem 2rem !important;
        line-height: 1.6 !important;
        min-height: 150px !important;
    }
}

/* Extra large screens - Maximum padding for maximum font size */
@media (min-width: 1200px) {
    .PAGENAME-content > h1,
    .PAGENAME-content h1:first-child,
    .PAGENAME-hero h1 {
        padding: 9rem 2rem 2.5rem !important;
        line-height: 1.6 !important;
        min-height: 180px !important;
    }
}

/* ===================================================================
   OVERRIDE CHABAD ONE SPECIFICITY
   =================================================================== */
```

**Padding Rationale**:
- **769-1199px screens**: 7rem (112px) top padding for ~45px font = 2.5× font size
- **1200px+ screens**: 9rem (144px) top padding for ~72px max font = 2× font size
- **min-height** guarantees: Forces container to be tall enough even with sub-pixel rendering issues

---

**STEP 7: Remove Duplicate Style Blocks**

**Location**: At the END of the file, after the closing `</div>` tag.

**Search for**: Duplicate `<style>` tags or comments mentioning "Force remove background" or "Additional overrides".

**Example of what to DELETE**:
```html
</div>

<!-- ❌ DELETE EVERYTHING FROM HERE -->
<!-- Force remove background image (overrides Chabad One inline styles) -->
<style type="text/css">
/* Additional overrides to ensure cream background */
body,
body.cco_body,
#BodyContainer,
#co_content_container,
.clearfix,
.body_wrapper,
#content,
.master-content-wrapper,
.master-content-wrapper.g960,
div.master-content-wrapper.g960,
div[class*="master-content"],
div[class*="wrapper"],
div[class*="content"] {
    background-image: none !important;
    background: #faf8f5 !important;
    padding-top: 0 !important;
    margin-top: 0 !important;
    min-height: 0 !important;
}
</style>
<!-- ❌ TO HERE - DELETE ALL OF THIS -->
```

**Verification**: The file should end with just the closing `</div>` tag, no additional style blocks.

---

### Testing Checklist

After applying all fixes, test each page:

#### Test 1: Hamburger Navigation
- [ ] Open hamburger menu
- [ ] Dark overlay appears behind menu
- [ ] Menu items are visible (white text on dark background)
- [ ] Menu items are clickable
- [ ] Closing menu removes overlay properly

**If menu is invisible**: Check for `.clearfix` in background CSS or duplicate style blocks.

#### Test 2: H1 Title - Small Screens (Mobile)
- [ ] Resize browser to 375px width
- [ ] H1 title fully visible
- [ ] No horizontal scrolling
- [ ] Text not clipped at top or bottom

#### Test 3: H1 Title - Medium Screens (Tablet/Small Desktop)
- [ ] Resize browser to 1024px width
- [ ] H1 title fully visible
- [ ] Top of tall letters (H, T, L) not clipped
- [ ] Comfortable padding above text

**If clipping occurs**: Increase padding in 769-1199px media query from `7rem` to `8rem`.

#### Test 4: H1 Title - Large Screens (Desktop)
- [ ] Resize browser to 1920px width
- [ ] H1 title fully visible
- [ ] Top of tall letters not clipped
- [ ] Generous padding above text
- [ ] Font size doesn't exceed 4.5rem (72px)

**If clipping occurs**: Increase padding in 1200px+ media query from `9rem` to `10rem`.

#### Test 5: H1/H2 Gap
- [ ] No visible line or gap between H1 and H2
- [ ] Burgundy background flows seamlessly
- [ ] H2 appears immediately below H1 with appropriate spacing

**If gap exists**: Verify H2 `padding-top` is `0`, not `1rem`.

#### Test 6: Sidebar
- [ ] Sidebar visible with its own background color
- [ ] Sidebar not covered by cream/white background
- [ ] Sidebar content readable

**If sidebar broken**: Check for containers set to colored backgrounds instead of transparent.

---

### Debug Console Scripts

**Script 1: Check Hamburger Menu Issue**
```javascript
// Paste in browser console while hamburger menu is OPEN
const clearfix = document.querySelector('.clearfix');
const overlay = document.querySelector('[class*="overlay"], [class*="menu-open"]');

console.log('🔍 HAMBURGER MENU DEBUG');
console.log('Clearfix background:', clearfix ? window.getComputedStyle(clearfix).background : 'Not found');
console.log('Clearfix z-index:', clearfix ? window.getComputedStyle(clearfix).zIndex : 'Not found');
console.log('Overlay found:', overlay ? 'Yes' : 'No');

if (clearfix) {
    console.log('⚠️ ISSUE: .clearfix has background, will block menu');
} else {
    console.log('✅ OK: .clearfix not affecting menu');
}
```

**Script 2: Check H1 Clipping**
```javascript
// Paste in browser console
const h1 = document.querySelector('.PAGENAME-hero h1');  // Change PAGENAME
const parent = h1.parentElement;
const styles = window.getComputedStyle(h1);
const parentStyles = window.getComputedStyle(parent);

console.log('🔍 H1 CLIPPING DEBUG');
console.log('📐 H1:', {
    height: h1.offsetHeight + 'px',
    scrollHeight: h1.scrollHeight + 'px',
    fontSize: styles.fontSize,
    lineHeight: styles.lineHeight,
    paddingTop: styles.paddingTop
});

console.log('👨 Parent:', {
    tagName: parent.tagName,
    height: parentStyles.height,
    overflow: parentStyles.overflow
});

if (h1.scrollHeight > h1.clientHeight) {
    console.log('⚠️ CLIPPING: H1 content exceeds container');
} else if (h1.offsetHeight > parseFloat(parentStyles.height)) {
    console.log('⚠️ CLIPPING: Parent too small for H1');
} else {
    console.log('✅ OK: No clipping detected');
}
```

---

### Quick Reference - Before & After

#### Before (Broken):
```css
/* ❌ WRONG */
body, .clearfix, [class*="wrapper"] {
    background: #faf8f5 !important;
}

.page-hero h1 {
    font-size: clamp(3rem, 10vw, 7.5rem) !important;
    padding: 4rem 2rem 2rem !important;
    line-height: 1.2 !important;
}

.page-hero h2 {
    padding: 1rem 2rem 4rem !important;
}
```

#### After (Fixed):
```css
/* ✅ CORRECT */
body, body.cco_body {
    background: #faf8f5 !important;
}

#BodyContainer, .master-content-wrapper {
    background: transparent !important;
}

.page-hero {
    overflow: visible !important;
    height: auto !important;
}

.page-hero section {
    overflow: visible !important;
    height: auto !important;
}

.page-hero h1 {
    font-size: clamp(2.5rem, 8vw, 4.5rem) !important;
    padding: clamp(2.5rem, 8vw, 8rem) 2rem clamp(1rem, 2vw, 2rem) !important;
    line-height: 1.5 !important;
    overflow: visible !important;
    position: relative !important;
    display: block !important;
}

.page-hero h2 {
    font-size: clamp(1.6rem, 5vw, 2.5rem) !important;
    padding: 0 2rem 4rem !important;
}

@media (min-width: 769px) and (max-width: 1199px) {
    .page-hero h1 {
        padding: 7rem 2rem 2rem !important;
        line-height: 1.6 !important;
        min-height: 150px !important;
    }
}

@media (min-width: 1200px) {
    .page-hero h1 {
        padding: 9rem 2rem 2.5rem !important;
        line-height: 1.6 !important;
        min-height: 180px !important;
    }
}
```

---

### Summary of All Changes

| Issue | Location | Change | Verification |
|-------|----------|--------|--------------|
| Hamburger nav broken | Background CSS section | Remove `.clearfix` from background declarations, set containers to `transparent` | Open hamburger menu, verify dark overlay visible |
| H1 clipping | Hero section | Add container & SECTION wrapper overflow fixes | Check tall letters on large screens |
| H1 clipping | H1 styles | Reduce max font-size 7.5rem → 4.5rem | Check text fits on all screens |
| H1 clipping | H1 styles | Add responsive padding with clamp() | Check adequate spacing above text |
| H1 clipping | H1 styles | Increase line-height 1.2 → 1.5 | Check vertical spacing comfortable |
| H1 clipping | Responsive section | Add media queries with min-height | Check no sub-pixel clipping |
| H1/H2 gap | H2 styles | Reduce padding-top 1rem → 0 | Check no visible line between titles |
| H2 overflow | H2 styles | Reduce max font-size 3.75rem → 2.5rem | Check subtitle fits on all screens |
| Sidebar broken | End of file | Delete duplicate style blocks | Check sidebar visible with correct background |