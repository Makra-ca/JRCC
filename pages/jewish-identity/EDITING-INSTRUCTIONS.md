# Jewish Identity Service Page - Editing Instructions

## 📖 Overview
This page displays the Jewish Identity Verification Service information with downloadable forms. All content is controlled by JSON data, making it easy to update without touching HTML or CSS code.

---

## 🎯 What You Can Edit

You can update:
- ✅ Hero title and subtitle
- ✅ Hero images (URLs and descriptions)
- ✅ Forms introduction text
- ✅ Form categories and descriptions
- ✅ Form links and labels
- ✅ Donation message
- ✅ Contact information (phone, email, description)

---

## 📝 Step-by-Step Editing Guide

### Step 1: Open the File
Open `pages/jewish-identity/LIVE/jewish-identity-json-based.html` in any text editor (Notepad, VS Code, etc.)

### Step 2: Find the JSON Data Section
Look for this line (around line 376):
```html
<script type="application/json" id="jewish-identity-data">
```

**Everything between the `{` and `}` brackets is what you can edit.**

### Step 3: Make Your Changes
Follow the examples below for what you want to update.

---

## 📋 Editing Examples

### ✏️ Changing the Hero Title/Subtitle

**Find this section:**
```json
"hero": {
  "title": "Jewish Identity Verification Service",
  "subtitle": "Helping you confirm Jewish identity and lineage with professional documentation services"
}
```

**To change the title:**
```json
"hero": {
  "title": "Your New Title Here",
  "subtitle": "Your new subtitle text here"
}
```

---

### 🖼️ Changing Hero Images

**Find this section:**
```json
"images": [
  {
    "src": "/media/images/1151/CfOC11510245.jpg",
    "alt": "Jewish Identity Service",
    "width": 420,
    "height": 559
  }
]
```

**To change an image URL:**
```json
"images": [
  {
    "src": "/media/images/YOUR/NEW-IMAGE.jpg",
    "alt": "Description of image",
    "width": 420,
    "height": 559
  }
]
```

---

### 📄 Adding a New Form Category

**Find the `formCategories` array and add a new entry:**

```json
"formCategories": [
  {
    "category": "New Form Type",
    "icon": "📋",
    "description": "Description of this form type",
    "forms": [
      {
        "label": "Form Name",
        "url": "/media/pdf/YOUR-FORM.pdf"
      }
    ]
  }
]
```

**Available Icons You Can Use:**
- 📄 Document
- 📋 Clipboard
- 📝 Memo
- 🇬🇧 UK Flag (English)
- 🇷🇺 Russian Flag
- 🇮🇱 Israeli Flag (Hebrew)
- 💍 Ring (Single Status)
- ✍️ Writing
- 📑 Pages

---

### 🔗 Updating Form Links

**Find the form you want to update:**
```json
"forms": [
  {
    "label": "English Part I",
    "url": "/media/pdf/1093/SwGI10937251.pdf"
  }
]
```

**Change the URL or label:**
```json
"forms": [
  {
    "label": "Updated Form Name",
    "url": "/media/pdf/NEW/FORM-PATH.pdf"
  }
]
```

---

### 💰 Updating Donation Message

**Find this section:**
```json
"donation": {
  "icon": "🤲",
  "text": "This service is provided free of charge by the JRCC. Suggested donation to cover research and administrative cost is $250 per applicant. Any donation is appreciated."
}
```

**To change the message:**
```json
"donation": {
  "icon": "🤲",
  "text": "Your new donation message here"
}
```

---

### 📞 Updating Contact Information

**Find this section:**
```json
"contact": {
  "title": "Need Assistance?",
  "phone": "416-222-7105 #237",
  "email": "jewishidentity@jrcc.org",
  "description": "Contact the Jewish Identity Department Coordinator for more information"
}
```

**To update contact details:**
```json
"contact": {
  "title": "Need Assistance?",
  "phone": "416-XXX-XXXX #XXX",
  "email": "newemail@jrcc.org",
  "description": "Your new description"
}
```

---

## ⚠️ Important Rules

### ✅ DO:
- Always keep quotes `"` around text values
- Keep commas `,` between items (but NOT after the last item)
- Maintain the bracket structure `{ }` and `[ ]`
- Save a backup before editing
- Test on Chabad One preview before going live

### ❌ DON'T:
- Don't remove quotes around text
- Don't forget commas between items
- Don't add a comma after the last item in a list
- Don't edit anything outside the JSON section
- Don't remove or change the `<script>` tags

---

## 🔍 Common Mistakes & Fixes

### ❌ Missing Comma
**Wrong:**
```json
"category": "English Forms"
"icon": "🇬🇧"
```
**Right:**
```json
"category": "English Forms",
"icon": "🇬🇧"
```

### ❌ Extra Comma
**Wrong:**
```json
"forms": [
  {
    "label": "Form Name",
    "url": "/path/to/form.pdf"
  },
]
```
**Right:**
```json
"forms": [
  {
    "label": "Form Name",
    "url": "/path/to/form.pdf"
  }
]
```

### ❌ Missing Quotes
**Wrong:**
```json
"title": New Title Here
```
**Right:**
```json
"title": "New Title Here"
```

---

## 🚀 Deployment Process

1. **Edit** the JSON data in the file
2. **Save** your changes
3. **Copy** the entire file content (Ctrl+A, Ctrl+C)
4. **Login** to Chabad One CMS
5. **Navigate** to the Jewish Identity Service page
6. **Paste** the code in three sections:
   - STEP 1 → Header/Custom CSS area
   - STEP 2 → Body/Content area
   - STEP 3 → Footer/Custom JavaScript area
7. **Preview** the page before publishing
8. **Publish** when everything looks correct

---

## 🆘 Need Help?

### Page Looks Broken?
1. Check browser console for errors (F12 → Console tab)
2. Verify JSON syntax using an online JSON validator
3. Restore from backup if needed

### Forms Not Showing?
- Check that form URLs are correct
- Ensure commas are in the right places
- Verify the `formCategories` array structure

### Contact Information Not Updating?
- Check the `contact` section in JSON
- Ensure quotes are around all text values
- Save and re-deploy the page

---

## 📁 File Locations

- **Live File:** `pages/jewish-identity/LIVE/jewish-identity-json-based.html`
- **Original Archive:** `pages/jewish-identity/archive/jewish-identity-original.html`
- **This Guide:** `pages/jewish-identity/EDITING-INSTRUCTIONS.md`

---

**Last Updated:** September 30, 2025
