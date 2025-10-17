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