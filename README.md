# JRCC Website Project

## Overview
This repository contains all code and assets for the Jewish Russian Community Center (JRCC) website, designed to work with the Chabad One CMS platform.

## 📁 Project Structure

```
JRCC/
├── pages/              # All website pages organized by type
│   ├── history/        # History timeline page
│   │   ├── LIVE/       # ✅ Active production files
│   │   └── archive/    # Old versions for reference
│   └── contact/        # Contact page
│       ├── LIVE/       # ✅ Active production files
│       └── archive/    # Old versions for reference
│
├── shared/             # Reusable code snippets
│   └── common-header-scripts.html
│
├── docs/               # Documentation and guides
│   ├── EDITING-INSTRUCTIONS.md
│   └── screenshots/
│
├── PROJECT-STRUCTURE.md  # Detailed structure guide
├── CLAUDE.md            # Development context
└── README.md            # This file
```

**📖 See [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) for detailed information.**

## 🚀 Quick Start

### For Content Editors (Non-Technical Users):
1. **Read [docs/EDITING-INSTRUCTIONS.md](docs/EDITING-INSTRUCTIONS.md)** - Complete editing guide
2. **Find your page** in `pages/[page-name]/LIVE/`
3. **Edit only** the JSON data sections (never touch HTML/CSS)
4. **Always backup** before making changes
5. **Test changes** on a preview before going live

### For Developers:
1. **Review [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)** - Complete architecture guide
2. **Use files in `pages/[page]/LIVE/`** for production code
3. **Copy `shared/common-header-scripts.html`** for new pages
4. **Design with JSON-based editing** for non-technical staff
5. **Keep all code self-contained** (inline CSS/JS required for Chabad One)

## 🎯 Key Features

### JSON-Based Content Management
- **Easy editing** for non-technical staff
- **Data stored** in simple `<script type="application/json">` tags
- **Automatic rendering** via JavaScript
- **Error handling** for malformed data

### Chabad One CMS Compatible
- **Self-contained files** with inline CSS/JS
- **Three-step deployment:** Header → Body → Footer
- **No external dependencies** required
- **Works with basic text editor** in Chabad One

## 📋 Current Pages

### History Timeline (`pages/history/LIVE/`)
- ✅ **Active:** `history-json-based.html`
- Modern animated timeline with JSON editing
- See [docs/EDITING-INSTRUCTIONS.md](docs/EDITING-INSTRUCTIONS.md) for how to update

### Contact Page (`pages/contact/`)
- 🔄 **In Development:** JSON-based version coming soon
- Archive contains old header code versions

## ⚠️ Important Rules

### ✅ DO:
- Edit files in `pages/[page]/LIVE/` folders
- Backup before making changes
- Follow JSON format exactly (quotes, commas, brackets)
- Test in Chabad One preview before going live
- Commit changes to git with clear messages

### ❌ DON'T:
- Don't edit files in `archive/` folders (reference only)
- Don't delete archive files (keep history)
- Don't touch HTML/CSS unless you're a developer
- Don't skip testing changes before deployment

## 🆘 Support

**For Content Editing Help:**
- Read [docs/EDITING-INSTRUCTIONS.md](docs/EDITING-INSTRUCTIONS.md)
- Check JSON format with online validators
- Restore from git history if something breaks

**For Technical Development:**
- Review [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
- Check [CLAUDE.md](CLAUDE.md) for AI assistant context
- Use `shared/common-header-scripts.html` as starting point

## 🎯 Project Goals

1. **Accessible Updates** - Non-technical staff can edit content
2. **Professional Design** - Modern, responsive, animated interfaces
3. **Platform Compatibility** - Works within Chabad One limitations
4. **Maintainable Code** - Clear structure, good documentation
5. **Future-Proof** - Easy to add new pages with same pattern

---

**Maintained for:** Jewish Russian Community Center (JRCC)  
**Platform:** Chabad One CMS  
**Last Updated:** 2025