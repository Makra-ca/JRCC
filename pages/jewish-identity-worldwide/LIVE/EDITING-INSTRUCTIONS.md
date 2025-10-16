# How to Edit the Worldwide Page

## Simple 3-Step Guide

---

## Step 1: Find the Data Section

1. Open `worldwide-json-based.html`
2. Press `Ctrl+F` (Windows) or `Cmd+F` (Mac) to search
3. Search for: `EDIT THE DATA BELOW`
4. You'll see the JSON data section right below
5. **Only edit text between quotes `"like this"`**

**OR search for:** `worldwide-data` to jump directly to the data

---

## Step 2: Copy & Paste What You Need

### To Add a New Card (Service)

Copy this template:
```json
{
  "serviceName": "Service Name",
  "featured": false,
  "website": "https://www.example.com/",
  "websiteDisplay": "www.example.com",
  "cost": "$200 USD",
  "isFree": false,
  "freeText": "",
  "donationNote": "",
  "contact": "Person Name",
  "title": "Job Title",
  "email": "email@example.com",
  "phone": "+1-555-1234"
}
```

### To Add a New Location

Copy this template:
```json
{
  "locationName": "Country Name",
  "cards": [
    {
      "serviceName": "Service Name",
      "featured": false,
      "website": "https://www.example.com/",
      "websiteDisplay": "www.example.com",
      "cost": "$200 USD",
      "isFree": false,
      "freeText": "",
      "donationNote": "",
      "contact": "Person Name",
      "title": "Job Title",
      "email": "email@example.com",
      "phone": "+1-555-1234"
    }
  ]
}
```

---

## Step 3: Fill In Your Details

Change the text between the quotes:
- `"serviceName"` - Name of service
- `"website"` - Full web address
- `"cost"` - Price (like "$200 USD")
- `"contact"` - Person's name
- `"email"` - Email address
- `"phone"` - Phone number

**Leave empty with `""` if you don't have info**

---

## Important Rules

✅ **Always:**
- Put commas `,` between items
- Keep text in `"quotes"`
- Use `""` for empty fields

❌ **Never:**
- Put comma after the LAST item
- Forget quotes around text

---

## Example

```json
{
  "serviceName": "Toronto Jewish Services",
  "featured": false,
  "website": "https://www.jrcc.org/",
  "websiteDisplay": "www.jrcc.org",
  "cost": "$250 CAD",
  "isFree": false,
  "freeText": "",
  "donationNote": "",
  "contact": "Rabbi Cohen",
  "title": "Director",
  "email": "cohen@jrcc.org",
  "phone": "416-555-1234"
}
```

That's it!
