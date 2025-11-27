# How to Deploy Challah Popup to Vercel

## Option 1: Command Line (Quickest)

```bash
cd /home/daniel/coding-work/Makra-work-files/JRCC/challah-popup &&
npx vercel --prod
```

Follow the prompts if asked.

---

## Option 2: Vercel Dashboard

1. Go to https://vercel.com and log in
2. Click **"Add New..." → "Project"**
3. Drag and drop the `challah-popup` folder
4. Click **Deploy**

---

## What This Does

Creates a popup modal for the Zeffy order form instead of embedding it directly on the page.

**Features:**
- Button triggers popup overlay
- Dark backdrop behind modal
- Close via X button, clicking outside, or pressing Escape
- Loading spinner while iframe loads
- Mobile responsive (full-screen on mobile)
- Warm brown/challah color theme

---

## Customizing

### Change the Zeffy Form URL

Edit `index.html` and find this line:

```javascript
const ZEFFY_FORM_URL = 'https://www.zeffy.com/embed/ticketing/babka-delish';
```

Replace with any Zeffy embed URL.

### Change Button Text

Find the `<button class="order-btn">` element and change the text inside.

### Change Colors

Look for `#8B4513` (brown) and `#A0522D` (lighter brown) in the CSS and replace with your brand colors.

---

## Embedding on Client's Website

The client has two options:

### Option A: Link to Popup Page (Simplest)
Link directly to the deployed Vercel URL.

### Option B: Embed the Popup Code
Copy the CSS styles and the HTML/JS from the comment section at the bottom of `index.html` and paste into their site's page.
