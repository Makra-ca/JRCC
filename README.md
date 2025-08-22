# JRCC Website - History Timeline

## Overview
This repository contains the history timeline page for the Jewish Russian Community Center (JRCC) website, designed to work with the Chabad One CMS platform.

## 📁 Project Structure

### Main Files:
- **`history-json-based.html`** - ✅ **PRIMARY FILE** - Modern timeline with JSON-based editing
- **`EDITING-INSTRUCTIONS.md`** - Complete guide for non-technical users
- **`CLAUDE.md`** - Development context and technical notes

### Archive Files:
- `history-for-chabad-one.html` - Legacy version with manual HTML editing
- `History - JRCC.org.html` - Original website archive
- `history-original.html` - Backup of original version

## 🚀 Quick Start

### For Content Editors (Non-Technical Users):
1. **Read the [EDITING-INSTRUCTIONS.md](EDITING-INSTRUCTIONS.md)** - This has everything you need!
2. **Always backup** `history-json-based.html` before making changes
3. **Edit only** the JSON data section (lines 302-491)
4. **Test changes** on a preview before going live

### For Developers:
The project uses HTML injection into Chabad One CMS with:
- Inline CSS styling (no external stylesheets)
- Self-contained JavaScript for animations
- JSON-based data structure for easy content management
- Responsive design with mobile optimization

## 🎯 How It Works

### Timeline Data Format:
```json
{
  "YEAR": [
    "Event description 1",
    "Event description 2"
  ]
}
```

### Three-Step Implementation:
1. **CSS** - Paste into Chabad One "Header" or "Custom CSS" area
2. **HTML** - Paste into Chabad One "Body" or "Content" area  
3. **JavaScript** - Paste into Chabad One "Footer" or "Custom JavaScript" area

## ✨ Features

### Visual Design:
- Modern timeline with alternating left/right layout
- Animated entrance effects as user scrolls
- Hover effects and interactive elements
- Golden color scheme with gradient accents
- Responsive mobile design

### User Experience:
- Smooth scrolling navigation
- Intersection Observer animations
- Floating particle effects
- Mouse follower interaction
- Error handling for malformed JSON

### Content Management:
- JSON-based data structure
- Non-technical user friendly
- Clear editing instructions
- Built-in error handling
- Automatic chronological sorting

## 📋 Content Editing Workflow

1. **Open** `history-json-based.html` in any text editor
2. **Find** the JSON data section (lines 302-491)
3. **Edit** events using the simple JSON format
4. **Save** and test on preview
5. **Deploy** to Chabad One CMS

## ⚠️ Important Notes

### Platform Constraints:
- Must work within Chabad One CMS limitations
- All code must be inline/embedded (no external files)
- Compatible with CMS text editor injection

### Editing Rules:
- Always use quotes around years and events
- Include commas between items (except last item)
- Maintain proper bracket structure
- Save backups before editing

## 🆘 Support

### For Content Issues:
- Check [EDITING-INSTRUCTIONS.md](EDITING-INSTRUCTIONS.md)
- Verify JSON format using online validators
- Restore from backup if timeline breaks

### For Technical Issues:
- Review browser console for JavaScript errors
- Validate HTML structure in developer tools
- Check CSS compatibility with Chabad One

## 📈 Development Context

This project was developed to provide:
1. **Easy content management** for non-technical JRCC staff
2. **Professional timeline design** within CMS constraints
3. **Responsive user experience** across all devices
4. **Future-proof architecture** for ongoing updates

The JSON-based approach allows content updates without touching HTML/CSS code, making it sustainable for long-term use by the JRCC team.

---

**Maintained for:** Jewish Russian Community Center (JRCC)  
**Platform:** Chabad One CMS  
**Last Updated:** 2025