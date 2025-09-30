# JRCC Website Project Structure

## Overview
This repository contains all code for the JRCC website, which runs on the **Chabad One CMS platform**. Due to platform limitations, all pages must be self-contained HTML files with inline CSS and JavaScript.

---

## 📁 Directory Structure

```
JRCC/
├── pages/                          # All website pages organized by type
│   ├── history/
│   │   ├── LIVE/                   # ✅ ACTIVE VERSION - Use this!
│   │   │   └── history-json-based.html
│   │   └── archive/                # Old versions - for reference only
│   │       ├── history-original.html
│   │       ├── history-for-chabad-one.html
│   │       └── History - JRCC.org.html
│   │
│   └── contact/
│       ├── LIVE/                   # ✅ ACTIVE VERSION - (to be developed)
│       │   └── [future contact page here]
│       └── archive/                # Old versions - for reference only
│           ├── custom-header-code-original.html
│           └── changed-header.html
│
├── shared/                         # Reusable code snippets
│   └── common-header-scripts.html  # Tracking codes, analytics, form styles
│
├── docs/                           # Documentation and guides
│   ├── EDITING-INSTRUCTIONS.md     # How to edit JSON-based pages
│   ├── JRCC_Timeline_Documentation.txt
│   └── screenshots/                # Reference images
│
├── CLAUDE.md                       # Project context for AI assistants
├── PROJECT-STRUCTURE.md            # This file
└── README.md                       # Project overview
```

---

## 🎯 Key Principles

### 1. **LIVE vs Archive**
- **`LIVE/` folders** = Current production code to upload to Chabad One
- **`archive/` folders** = Old versions kept for reference only
- ⚠️ **Only edit files in LIVE folders!**

### 2. **JSON-Based Editing**
Files ending in `-json-based.html` are designed for **non-technical staff** to edit easily:
- Timeline events stored as JSON data
- No need to touch HTML/CSS code
- See `docs/EDITING-INSTRUCTIONS.md` for guidance

### 3. **Self-Contained Files**
All HTML files must include:
- Inline `<style>` tags (no external CSS)
- Inline `<script>` tags (no external JS)
- This is required by Chabad One CMS limitations

### 4. **Shared Components**
Common code (tracking, analytics, forms) lives in `shared/`:
- Copy-paste into new pages as needed
- Update in one place, then propagate to all pages

---

## 🚀 Workflow: Adding a New Page

1. **Create the page structure:**
   ```bash
   mkdir -p pages/[page-name]/LIVE
   mkdir -p pages/[page-name]/archive
   ```

2. **Copy the header scripts:**
   - Start with `shared/common-header-scripts.html`
   - Add your custom page styling below

3. **Use JSON for editable content:**
   - Store dynamic content in `<script type="application/json">` tags
   - Generate HTML via JavaScript
   - See `pages/history/LIVE/history-json-based.html` as template

4. **Test locally** (if possible) then upload to Chabad One

5. **Document any custom editing instructions** in `docs/`

---

## 🔄 Workflow: Updating Existing Pages

### For Technical Staff (Developers):
1. Edit the file in `pages/[page]/LIVE/`
2. Test changes locally
3. Copy the entire file content
4. Paste into Chabad One CMS editor
5. Commit changes to git

### For Non-Technical Staff:
1. Open the `-json-based.html` file
2. Find the `<script type="application/json" id="timeline-data">` section
3. Edit only the JSON data (between `{` and `}`)
4. Follow format examples in `docs/EDITING-INSTRUCTIONS.md`
5. Send updated file to developer for deployment

---

## 📋 Common Tasks

### Moving Old Versions to Archive
```bash
git mv pages/[page]/LIVE/old-file.html pages/[page]/archive/
```

### Creating a New Page Type
```bash
mkdir -p pages/new-page/{LIVE,archive}
cp shared/common-header-scripts.html pages/new-page/LIVE/new-page.html
# Edit the new file...
```

### Finding Which File is Active
Look for the `LIVE/` folder - that's always the production version.

---

## 🆘 Getting Help

- **For content updates:** See `docs/EDITING-INSTRUCTIONS.md`
- **For technical issues:** Check `CLAUDE.md` for AI assistant context
- **For design changes:** Consult the developer team

---

## ⚠️ Important Notes

1. **Never delete archive files** - they're historical reference
2. **Always test in Chabad One** before going live
3. **Keep JSON format strict** - missing commas/quotes break the page
4. **Backup before major changes** - copy the LIVE file to archive first
5. **Git commit regularly** - track all changes with clear messages

---

## 🎨 Design Philosophy

**Goal:** Make website updates accessible to non-technical JRCC staff

**Approach:**
- JSON data for content (easy to edit)
- Self-contained HTML files (easy to deploy)
- Clear folder structure (easy to navigate)
- Comprehensive documentation (easy to learn)

---

**Last Updated:** September 2025
