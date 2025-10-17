# Quick Guide: Adding a New Service Card

## Method 1: Copy & Paste (EASIEST)

### Step-by-Step:

1. **In the Chabad One editor**, find an existing service that looks similar to what you want to add

2. **Highlight the entire card** in the visual editor (click and drag from service name to contact info)

3. **Copy it**: Press `Ctrl+C` (Windows) or `Cmd+C` (Mac)

4. **Click where you want the new card** to appear

5. **Paste it**: Press `Ctrl+V` (Windows) or `Cmd+V` (Mac)

6. **Edit the pasted text**:
   - Click on the service name and change it
   - Click on the website link, press the "Edit Link" button, update the URL
   - Change the cost or free text
   - Update contact name, email, phone

7. **Click Save**

✅ **Done!** The card will automatically have the same beautiful styling.

---

## Method 2: Use Source Code (Advanced)

### Step-by-Step:

1. **Click the "Source" button** in the toolbar (looks like `<>` or says "Source")

2. **Scroll to find an existing service card** - it looks like this:

```html
<div class="service-item">
<h3>Service Name Here</h3>
<p><a href="https://website.com">website.com</a></p>
<p><strong>Cost:</strong> $280 USD per individual</p>
</div>
```

3. **Copy the entire block** (from `<div class="service-item">` to `</div>`)

4. **Paste it where you want the new card**

5. **Click "Source" again** to return to visual editor

6. **Edit the text** in your new card using the visual editor

7. **Click Save**

---

## Card Templates to Copy

### Template 1: Service with Website & Cost
```html
<div class="service-item">
<h3>Service Name Here</h3>
<p><a href="https://website-url.com">website-url.com</a></p>
<p><strong>Cost:</strong> $280 USD per individual</p>
</div>
```

### Template 2: Free Service (like Toronto)
```html
<div class="service-item featured">
<h3>Service Name Here</h3>
<p><a href="https://website-url.com">website-url.com</a></p>
<p class="free-badge">FREE - For the Russian Community of Ontario</p>
<p>Additional information about donations or notes...</p>
<p><strong>Contact:</strong> Contact Name<br>
<strong>Title:</strong> Job Title<br>
<strong>Email:</strong> <a href="mailto:email@example.com">email@example.com</a><br>
<strong>Phone:</strong> 123-456-7890</p>
</div>
```

### Template 3: Contact-Only Service
```html
<div class="service-item">
<h3>Service Name Here</h3>
<p><strong>Contact:</strong> Rabbi Name<br>
<strong>Email:</strong> <a href="mailto:email@example.com">email@example.com</a><br>
<strong>Phone:</strong> +1-123-456-7890</p>
</div>
```

---

## Tips

✅ **DO:**
- Copy an existing card and modify it (fastest method!)
- Use "Source" view if you need to see the HTML structure
- Keep the `<div class="service-item">` wrapper - it creates the card styling

❌ **DON'T:**
- Don't create cards from scratch - always copy an existing one
- Don't delete the `class="service-item"` - it's needed for styling
- Don't worry about spacing/formatting - the CSS handles it

---

## Adding a New Location Section

1. **Type the location name** (e.g., "Montreal, Canada")
2. **Highlight it**
3. **Click "Heading 2"** in the toolbar
4. **Press Enter** to go to the next line
5. **Copy & paste an existing service card** (see Method 1 above)
6. **Edit the service details**

The location will automatically get the centered blue underline!

---

## Need Help?

- **Question**: "I pasted a card but it doesn't look styled"
  - **Answer**: Make sure the `<div class="service-item">` wrapper is intact. Click "Source" to check.

- **Question**: "How do I make a card featured/highlighted like Toronto?"
  - **Answer**: In Source view, change `<div class="service-item">` to `<div class="service-item featured">`

- **Question**: "The link isn't working"
  - **Answer**: Click the link, click "Edit Link" button, make sure the URL starts with `https://`

---

**Remember:** The easiest way is always **Copy → Paste → Edit**! 🎉
