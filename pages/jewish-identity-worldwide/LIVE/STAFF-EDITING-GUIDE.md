# Staff Editing Guide: Jewish Identity Worldwide Page

## One-Time Setup (Already Done)

A technical admin has pasted a special template into the page that automatically applies beautiful styling. You never need to touch this template code.

## How to Edit the Page

You can edit this page just like you would edit a Word document! Use the normal formatting buttons in Chabad One.

### Step 1: Open the Page for Editing

1. Log into Chabad One CMS
2. Navigate to the Jewish Identity Worldwide page
3. Click the **"Edit"** button

### Step 2: Edit Content Using Visual Editor

Use these formatting options:

#### Adding a New Location

1. **Create a heading** for the location name
   - Highlight the text (e.g., "Toronto, Canada")
   - Click **"Heading 2"** in the toolbar
   - The CSS will automatically center it and add a blue underline

#### Adding a New Service Card

**EASIEST METHOD - Copy & Paste:**

1. **Find an existing service card** similar to what you want to add
2. **In the visual editor**, highlight the entire card (from the service name to the contact info)
3. **Copy it** (Ctrl+C or Cmd+C)
4. **Click where you want the new card** (after another service or location)
5. **Paste it** (Ctrl+V or Cmd+V)
6. **Edit the pasted content** - just change the text to your new service details

**MANUAL METHOD - Using Source Code:**

1. **Click the "Source" button** in the toolbar (looks like `<>`)
2. **Find an existing service** that looks like this:
   ```html
   <div class="service-item">
   <h3>Service Name</h3>
   <p>...</p>
   </div>
   ```
3. **Copy the entire `<div class="service-item">...</div>` block**
4. **Paste it where you want the new service**
5. **Click "Source" again** to go back to visual editor
6. **Edit the text** in your new card

**WHAT TO EDIT:**

- **Service name**: Change the Heading 3 text
- **Website link**: Click the link, click "Edit Link" button, update URL
- **Cost/FREE text**: Just edit the text
- **Contact info**: Update name, email, phone number
- **For featured cards** (like Toronto): Use `<div class="service-item featured">` instead

### Step 3: Save Changes

1. Click **"Save"** or **"Publish"**
2. View the page to see your changes with automatic styling!

## Examples

### Adding a Featured Service (like Toronto)

```html
<div class="service-item featured">
<h3>Service Name Here</h3>
<p><a href="https://website.com">website.com</a></p>
<p class="free-badge">FREE - For the Russian Community</p>
<p>Any additional notes or donation information...</p>
<p><strong>Contact:</strong> Name<br>
<strong>Email:</strong> <a href="mailto:email@example.com">email@example.com</a><br>
<strong>Phone:</strong> 123-456-7890</p>
</div>
```

### Adding a Regular Service

```html
<div class="service-item">
<h3>Service Name Here</h3>
<p><a href="https://website.com">website.com</a></p>
<p><strong>Cost:</strong> $280 USD per individual</p>
</div>
```

### Adding Contact-Only Service

```html
<div class="service-item">
<h3>Service Name Here</h3>
<p><strong>Contact:</strong> Rabbi Name<br>
<strong>Email:</strong> <a href="mailto:email@example.com">email@example.com</a><br>
<strong>Phone:</strong> +1-123-456-7890</p>
</div>
```

## Tips

✅ **DO:**
- Use Heading 2 for location names (Toronto, USA, Israel, etc.)
- Use Heading 3 for service names
- Use bold for labels (Contact:, Email:, Phone:, Cost:)
- Use `<br>` for line breaks within the same paragraph
- Wrap services in `<div class="service-item">` for card styling
- Use `<div class="service-item featured">` to highlight the Toronto service

❌ **DON'T:**
- Don't change the template code at the top of the page
- Don't remove the `<link>` tag that loads the CSS
- Don't add inline styles (color, font-size, etc.) - the CSS handles all styling

## Getting Help

If something doesn't look right:
1. Make sure you're using the correct heading levels (H2 for locations, H3 for services)
2. Check that service content is wrapped in `<div class="service-item">`
3. Verify links are properly formatted with the link button
4. Contact the web admin if styling issues persist

---

**Remember:** You're editing content only! The beautiful design is applied automatically by the CSS file on GitHub.
