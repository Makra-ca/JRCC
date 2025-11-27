# How to Deploy to Vercel

## Option 1: Command Line (Quickest)

```bash
cd /home/daniel/coding-work/Makra-work-files/JRCC/embeddable-events &&
npx vercel --prod
```

Follow the prompts if asked.

---

## Option 2: Vercel Dashboard

1. Go to https://vercel.com and log in
2. Click **"Add New..." → "Project"**
3. Drag and drop the `embeddable-events` folder
4. Click **Deploy**

---

## Debugging Tools

Once deployed, you have these tools available:

### Enable Debug Mode
Add `?debug=true` to the URL:
```
https://your-url.vercel.app?debug=true
```

This shows detailed CSV parsing logs in the browser console.

### Run Test Suite
Open browser console (F12) and type:
```javascript
runCSVTests()
```

Runs 8 test cases to verify CSV parsing works correctly.

### View Raw CSV Data
Open browser console and type:
```javascript
fetchRawCSV()
```

Shows the raw CSV data from Google Sheets line by line.

---

## Updating the Google Sheet URL

Edit `index.html` and find this line near the top of the `<script>` section:

```javascript
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/...';
```

Replace with your published Google Sheet CSV URL.
