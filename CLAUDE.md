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