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





## Chabad One CMS Animation Constraints

### What DOESN'T Work ❌
The CMS strips or breaks these animation types:
- **Complex multi-property animations** (transform + box-shadow + background changes together)
- **Typewriter effects** using `overflow: hidden` and `white-space: nowrap` (interferes with CMS text editor)
- **Transform animations** (scale, translate, rotate) on editable content
- **Gradient background animations** (animating gradient color stops)
- **Multiple simultaneous property changes** on the same element


## Chabad One Dynamic Data Extraction

When redesigning Chabad One sites, extract data dynamically from the existing page before hiding CMS elements. This allows content to update automatically without code changes.

### Navigation
- Main links: `span.parent` elements
- Submenus: sibling `.co_submenu_container` → `.wrapper > .column_wrapper > .co_column > a[data-menu-level="2"]`
- Search siblings at multiple DOM levels up from each `span.parent`

### Images
- Location cards: Match `background-image` elements against location name patterns (regex)
- Photo gallery: Find images after "Latest Photos" heading, filter by domain (chabad.org, fbcdn.net)
- Extract URL from inline style: `style.match(/url\(['"]?([^'")\s]+)['"]?\)/)`

### Footer
- Phone/email: Use regex patterns on footer text content
- Social links: Match anchor hrefs against known social media domains
- Search in: `#footer, footer, [id*="footer"], .footer`

### Critical Pattern
Always extract data BEFORE calling `hideCMSElements()` - once hidden, the original content is no longer accessible for extraction.

### Page-Specific Script Execution
Since custom header/footer code runs on ALL pages, always add a page check at the start of `init()`:

```javascript
function init() {
    // Only run on homepage
    const path = window.location.pathname;
    const isHomepage = path === '/' ||
                      path === '' ||
                      path.endsWith('/SITE_ID') ||
                      path.endsWith('/SITE_ID/');
    const hasRootClass = document.body.classList.contains('section_root');

    if (!isHomepage && !hasRootClass) {
        console.log('Redesign: Not target page, skipping');
        return;
    }
    // ... rest of code
}
```

**Detection methods:**
- **Homepage**: `section_root` body class, or path ends with site ID (e.g., `/1331`)
- **Subpages**: Check URL for specific page IDs (e.g., `ids.some(id => location.href.includes(id))`)
- Always `return` early if not on target page to prevent styles/scripts affecting other pages

