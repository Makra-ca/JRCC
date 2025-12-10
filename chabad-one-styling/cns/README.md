# Chabad North Shore Events Widget

An embeddable events widget powered by Google Sheets, designed with Chabad North Shore's red and orange branding.

## Features

- Dynamic event loading from Google Sheets
- Age group filtering
- Responsive design (desktop & mobile)
- Beautiful card-based layout
- Red to orange gradient theme matching Chabad North Shore branding

## Quick Start

### 1. Create Your Google Sheet

Create a new Google Sheet with these column headers (Row 1):

| Title | AgeGroup | Description | Date | StartTime | EndTime | Location | Website |
|-------|----------|-------------|------|-----------|---------|----------|---------|
| Shabbat Dinner | All Ages | Join us for... | Friday, December 13, 2024 | 7:00 PM | 9:00 PM | Chabad North Shore | https://... |

### 2. Publish Your Google Sheet

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

### 3. Update the Code

Open [index.html](index.html) and find this line near the top of the `<script>` section (around line 590):

```javascript
const GOOGLE_SHEET_CSV_URL = 'YOUR_GOOGLE_SHEET_CSV_URL_HERE';
```

Replace it with your published CSV URL:

```javascript
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/XXXXXXXXX/pub?gid=0&single=true&output=csv';
```

### 4. Deploy

**Option A: Via Vercel (Main Hosting)**

The main chabad-one-styling project is hosted at `chabad-one-styling.vercel.app`:

```bash
cd /home/daniel/coding-work/Makra-work-files/JRCC/chabad-one-styling
git add .
git commit -m "Add Chabad North Shore events widget"
git push
```

Your widget will be available at:
```
https://chabad-one-styling.vercel.app/cns/
```

**Option B: Standalone Deployment**

You can also deploy just the `cns` folder as a standalone project:

```bash
cd /home/daniel/coding-work/Makra-work-files/JRCC/chabad-one-styling/cns
npx vercel --prod
```

### 5. Embed in Chabad One CMS

In any Chabad One page editor, add this HTML:

```html
<iframe
    src="https://chabad-one-styling.vercel.app/cns/"
    width="100%"
    height="800"
    frameborder="0"
    style="border: none; min-height: 600px;">
</iframe>
```

## Color Scheme

Based on Chabad North Shore's branding:

- **Primary Red**: `#C62828` (deep red from logo figures)
- **Secondary Red**: `#D32F2F` (mid-tone red)
- **Orange Accent**: `#FF5722` (from flame/text)
- **Gradient**: Red to Orange (matching the flame effect in the logo)

## Google Sheet Columns

| Column | Required | Description |
|--------|----------|-------------|
| Title | ✅ Yes | Event name |
| AgeGroup | No | e.g., "All Ages", "Adults", "Kids 5-12" |
| Description | No | Brief event description |
| Date | No | e.g., "Friday, December 13, 2024" |
| StartTime | No | e.g., "7:00 PM" |
| EndTime | No | e.g., "9:00 PM" |
| Location | No | Full address or venue name |
| Website | No | Full URL for "Visit Website" button |

## Customization

### Change Header Text

Find and modify in [index.html](index.html):
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
.designed-by { display: none; }
```

### Adjust Colors

Find these CSS variables and modify:
```css
/* Primary gradient */
background: linear-gradient(135deg, #C62828 0%, #D32F2F 30%, #FF5722 100%);

/* Change to custom colors */
background: linear-gradient(135deg, #YourColor1 0%, #YourColor2 30%, #YourColor3 100%);
```

## Debugging

### Enable Debug Mode

Add `?debug=true` to the URL to see detailed parsing logs in the browser console:
```
https://chabad-one-styling.vercel.app/cns/?debug=true
```

### Demo Mode

The widget includes demo data that displays when no Google Sheet URL is configured. This is useful for testing the layout and styling before connecting your data.

## Troubleshooting

### Events Not Loading?

1. **Check the CSV URL** - Make sure it ends with `output=csv`
2. **Check CORS** - Google Sheets published CSVs should work, but some browsers block mixed content
3. **Check the Console** - Open browser DevTools (F12) → Console for errors

### Wrong Data Showing?

1. Make sure your column headers match exactly (case-insensitive but spacing matters)
2. Republish the Google Sheet if you changed column names
3. Clear your browser cache

## Support

For questions or customization requests, contact [Makra.ca](https://makra.ca).


link to excel file editing
https://docs.google.com/spreadsheets/d/1ukVFZ-CWXsEqGEgoSg4c423Xc-jN3wn3rszc5F_GIjw/edit?usp=sharing


iframe
<iframe
    src="https://chabad-one-styling.vercel.app/cns/"
    width="100%"
    height="800"
    frameborder="0"
    style="border: none; min-height: 600px;">
</iframe>