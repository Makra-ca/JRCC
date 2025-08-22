# JRCC Timeline - Easy Editing Guide

## For Non-Technical Users: How to Update `history-json-based.html`

📍 **This guide is specifically for editing the `history-json-based.html` file.**

### 🎯 What You Need to Know:
The timeline events are stored in a simple text format called JSON. You can edit this just like a text document, but you need to follow some basic rules.

---

## 📝 STEP-BY-STEP EDITING INSTRUCTIONS

### ✅ TO ADD A NEW YEAR:

**Step 1:** Open `history-json-based.html` in any text editor

**Step 2:** Find the JSON data section (around line 302-491). Look for:
```html
<script type="application/json" id="timeline-data">
{
```

**Step 3:** Scroll to the very bottom of the data, right before the closing `}`

**Step 4:** Add your new year. If 2025 is the last year, add a comma after its closing bracket `],` then add:
```json
  "2026": [
    "Your first event description here",
    "Your second event description here"
  ]
```

**Example:**
```json
  "2025": [
    "Edward Kholodenko, CEO of Quespdtare appointed s JRCC's President.",
    "Started new a new weekly Seniors program in Richmond Hill"
  ],
  "2026": [
    "New community center opens",
    "Youth programs expand"
  ]
```

### ✅ TO ADD MORE EVENTS TO AN EXISTING YEAR:

**Step 1:** Find the year you want to update (like `"2025":`)

**Step 2:** Look inside the square brackets `[ ]` for that year

**Step 3:** Go to the end of the last event (before the closing `]`)

**Step 4:** Add a comma and your new event:
```json
"2025": [
  "Edward Kholodenko, CEO of Quespdtare appointed s JRCC's President.",
  "Started new a new weekly Seniors program in Richmond Hill",
  "Your new event here"
]
```

### ✅ TO EDIT EXISTING EVENTS:

**Step 1:** Find the event you want to change

**Step 2:** Replace the text between the quotes, but keep the quotes:
```json
BEFORE: "Started new a new weekly Seniors program in Richmond Hill"
AFTER:  "Started a new weekly Seniors program in Richmond Hill"
```

---

## ⚠️ CRITICAL RULES (Follow These or It Will Break!)

### 🔸 **ALWAYS Use Quotes:**
- Years: `"2025":`
- Events: `"Your event description"`

### 🔸 **ALWAYS Use Commas:**
- Between events: `"Event 1", "Event 2"`
- Between years: `"2024": [...], "2025": [...]`
- **Exception:** NO comma after the last year!

### 🔸 **ALWAYS Use Brackets:**
- Square brackets for events: `["Event 1", "Event 2"]`
- Curly brackets for the whole thing: `{ "2025": [...] }`

### 🔸 **ALWAYS Save a Backup First!**

---

## 📋 VISUAL GUIDE - What It Should Look Like:

```json
{
  "2024": [
    "Printed and distributed over 10,000 Hagadah of Passover to most Jewish Russian families across the GTA.",
    "Installed a elevator at JRCC S Richmond Hill at 9699 Bathurst St."
  ],
  "2025": [
    "Edward Kholodenko, CEO of Quespdtare appointed s JRCC's President.",
    "Started new a new weekly Seniors program in Richmond Hill"
  ]
}
```

**Key Points:**
- Each year is in quotes: `"2024"`
- Colon after year: `"2024":`
- Events in square brackets: `[...]`
- Each event in quotes: `"Event description"`
- Commas between events and years
- No comma after the last item

---

## 🆘 TROUBLESHOOTING

### ❌ **If the Timeline Disappears:**
1. **Check for missing quotes** around years and events
2. **Check for missing commas** between items
3. **Make sure brackets match:** every `[` has a `]`, every `{` has a `}`
4. **Restore your backup** and try again

### ❌ **Common Mistakes:**
- Forgetting quotes: `2025:` ❌ should be `"2025":` ✅
- Missing commas: `"Event 1" "Event 2"` ❌ should be `"Event 1", "Event 2"` ✅
- Wrong brackets: `"2025": {"Event"}` ❌ should be `"2025": ["Event"]` ✅

### 🔧 **Quick Fix:**
If something breaks, you can copy this template and fill in your data:
```json
{
  "YEAR": [
    "Event 1",
    "Event 2"
  ],
  "NEXT_YEAR": [
    "Event 1"
  ]
}
```

---

## 📁 REMEMBER: Only Edit `history-json-based.html`

This is the main file you should use. The other history files are backups or older versions.