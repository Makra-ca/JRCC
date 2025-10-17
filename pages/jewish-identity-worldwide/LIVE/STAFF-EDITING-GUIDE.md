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

#### Adding a New Service

1. **Wrap the service in a div** (optional, for card styling):
   - Type `<div class="service-item">` before the service
   - Add your content
   - Type `</div>` after the service

2. **Service name**:
   - Type the service name (e.g., "Jewish Identity Verification Service")
   - Highlight it and click **"Heading 3"**

3. **Website link**:
   - Type the website URL
   - Highlight it
   - Click the **"Insert Link"** button
   - Paste the full URL

4. **Cost or FREE badge**:
   - For free services: Type "FREE - For the Russian Community of Ontario"
   - For paid services: Type "Cost: $280 USD per individual"
   - Make "Cost:" **bold**

5. **Contact Information**:
   - Type "Contact:" and make it **bold**
   - Type the contact name
   - Press Enter for new line
   - Type "Email:" (make bold), then add email as a link
   - Type "Phone:" (make bold), then add phone number

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
