# JRCC Events Widget - Powered by Google Sheets

This is an embeddable events widget that displays event cards from a Google Sheet. Perfect for embedding in Chabad One pages via iframe.

## Demo

Open `index.html` in a browser to see the demo with sample events.

---

## Setup Instructions

### Step 1: Create Your Google Sheet

Create a new Google Sheet with these column headers (Row 1):

| Title | AgeGroup | Description | Date | StartTime | EndTime | Location | ContactName | Phone | Email | Website |
|-------|----------|-------------|------|-----------|---------|----------|-------------|-------|-------|---------|
| Giant Menorah | All ages | Public menorah lighting... | Wednesday, January 1, 2025 | 7:00 PM | 7:30 PM | Peace Gardens | Rabbi Y Golomb | +44 788 742 9619 | rabbi@email.com | https://... |

### Step 2: Publish Your Google Sheet

1. Open your Google Sheet
2. Go to **File → Share → Publish to web**
3. Select **Sheet1** (or your sheet name)
4. Choose **Comma-separated values (.csv)**
5. Click **Publish**
6. **Copy the URL** that appears

The URL will look like:
```
https://docs.google.com/spreadsheets/d/e/XXXXXXXXX/pub?gid=0&single=true&output=csv
```

### Step 3: Update the Code

Open `index.html` and find this line near the top of the `<script>` section:

```javascript
const GOOGLE_SHEET_CSV_URL = 'YOUR_GOOGLE_SHEET_CSV_URL_HERE';
```

Replace it with your published CSV URL:

```javascript
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/XXXXXXXXX/pub?gid=0&single=true&output=csv';
```

### Step 4: Host the Widget

**Option A: GitHub Pages (Free)**
1. Create a repository on GitHub
2. Upload `index.html`
3. Go to Settings → Pages → Enable GitHub Pages
4. Your widget URL: `https://yourusername.github.io/repo-name/`

**Option B: Vercel (Free)**
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repo or drag-drop the folder
3. Deploy automatically
4. Your widget URL: `https://your-project.vercel.app`

### Step 5: Embed in Chabad One

In any Chabad One page editor, add this HTML:

```html
<iframe
    src="https://your-hosted-url.com"
    width="100%"
    height="800"
    frameborder="0"
    style="border: none; min-height: 600px;">
</iframe>
```

---

## Customization

### Change Colors

Find these CSS variables in `index.html` and modify:

```css
/* Orange accent color */
color: #e67e22;
background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);

/* Change to JRCC Gold */
color: #d4af37;
background: linear-gradient(135deg, #d4af37 0%, #b8962e 100%);
```

### Change Header Text

Find and modify:
```html
<h1>Upcoming Events</h1>
<p>Join us for community programs and celebrations</p>
```

### Hide Sections

To hide the header, add to CSS:
```css
.events-header { display: none; }
```

To hide the footer:
```css
.powered-by { display: none; }
```

---

## Google Sheet Column Reference

| Column | Required | Description |
|--------|----------|-------------|
| Title | ✅ Yes | Event name |
| AgeGroup | No | e.g., "All ages", "Adults", "Kids 3-12" |
| Description | No | Brief event description |
| Date | No | e.g., "Wednesday, January 1, 2025" |
| StartTime | No | e.g., "7:00 PM" |
| EndTime | No | e.g., "9:00 PM" |
| Location | No | Full address or venue name |
| ContactName | No | e.g., "Rabbi Smith" |
| Phone | No | e.g., "+1 905 303 1880" |
| Email | No | e.g., "info@jrcc.org" |
| Website | No | Full URL for "Visit Website" button |

---

## Troubleshooting

### Events Not Loading?

1. **Check the CSV URL** - Make sure it ends with `output=csv`
2. **Check CORS** - Google Sheets published CSVs should work, but some browsers block mixed content
3. **Check the Console** - Open browser DevTools (F12) → Console for errors

### Wrong Data Showing?

1. Make sure your column headers match exactly (case-sensitive)
2. Check for extra spaces in header names
3. Republish the Google Sheet if you changed column names

---

## Support

For questions or customization requests, contact JRCC.
