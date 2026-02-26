# CWV Event Registration Page - Elements Inventory

Based on actual CMS HTML structure from Chabad Williamsburg Virginia

## 1. HEADER SECTION
- **Banner Image** - Event promotional image
- **Event Name** - "Holocaust survivor speaker"
- **Event Description** - Multi-paragraph text about the event
- **Event Tag/Badge** - "Special Event" label

## 2. EVENT INFO SECTION
- **Section Title** - "Event Info:"
- **Location Card**
  - Icon
  - Label: "LOCATION"
  - Value: "William & Mary" (clickable, opens map)
- **Date/Time Card**
  - Icon
  - Label: "DATE & TIME"
  - Value: "Mar 1, 2026 6:30PM - 7:30PM" (clickable, adds to calendar)

## 3. RESERVATIONS SECTION
- **Section Title** - "Reservations"
- **Subtitle Text** - "The exact address and location will be sent out shortly"
- **Performance Block**
  - Event name + date/time inline
  - Location link

### Reservation Rows (repeatable)
- **Row Number** - "1", "2", etc.
- **First Name Input**
- **Last Name Input**
- **Category Display** - "General seating"
- **Price Display** - "$ 20.00"
- **Delete Button (X)** - removes row

### Add Reservation Controls
- **Category Dropdown** - "Select a category"
  - Options: General seating $20, Preferred seating $40, Children $0, VIP Meet & Greet $125, Student $0, Corporate Sponsor $500, Join without donating $0
- **Reservations Dropdown** - quantity selector (disabled until category selected)
- **ADD Button** - adds new reservation row
- **"+ Add additional reservations"** link

## 4. DONATION/SPONSORSHIP SECTION (Checkboxes)
- Legacy Supporter - $5,000
- Full Event Supporter - $2,500
- Distinguished Supporter - $1,800
- Patron Supporter - $500
- Community Supporter - $360
- Friend of the Event - $180
- Supporter - $100
- Friend - $72
- **"Surprise us" Input** - custom amount with checkbox

## 5. SUMMARY SECTION
- **Section Title** - "Summary"
- **Additional Donation Input** - with $ prefix
- **Discount Code Input** + **Apply Button**
- **TLS Security Notice** - "This page uses TLS encryption to keep your data secure"
- **Totals Display**
  - Subtotal for [event name]: $ XX.XX
  - 3% Service Fee: $ X.XX
  - **Total: $ XX.XX**

## 6. YOUR INFORMATION SECTION
- **Section Title** - "Your Information"
- **Form Fields:**
  - Title (dropdown)
  - First Name (required)
  - Last Name (required)
  - Email (required)
  - Phone
  - Address fields (if applicable)
  - Custom fields (event-specific)

## 7. PAYMENT INFORMATION SECTION
- **Section Title** - "Payment Information"
- **Credit Card Fields:**
  - Cardholder Name
  - Card Number
  - Expiration Month/Year (2 dropdowns)
  - CVV/Security Code
  - Billing ZIP
- **Comments/Notes Textarea**

## 8. SUBMIT SECTION
- **Total Display** (large)
- **Submit Button** - "Complete Registration" or "Submit"

---

## COLOR SCHEME OPTIONS

### Option A: Gold & Black (Elegant)
- Primary: #C9A227 (Gold)
- Secondary: #1a1a1a (Black)
- Accent: #8B0000 (Dark Red)
- Background: #ffffff
- Text: #333333

### Option B: Navy & Gold (Classic)
- Primary: #1a365d (Navy)
- Secondary: #C9A227 (Gold)
- Accent: #8B0000 (Dark Red)
- Background: #f8f9fa
- Text: #2d3748

### Option C: Warm & Inviting
- Primary: #8B4513 (Saddle Brown)
- Secondary: #C9A227 (Gold)
- Accent: #1a1a1a (Black)
- Background: #fffaf0 (Floral White)
- Text: #333333
