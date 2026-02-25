# Chabad One Styling - Development Notes

## CWV Event Registration Page - Structure Discovery

### Key Finding: CMS Visibility Control

The CMS uses TWO methods to control form section visibility:

1. **`.hidden` class** on `#SecondaryFormItems` - hides/shows the entire form section container
2. **Inline `display:none`** on `#Payment` and `#Totals` - controls individual section visibility

### HTML Structure (discovered via debugging)

```
#SecondaryFormItems.clearfix.bottom_padding  (container - CMS adds .hidden class)
  └── #AdditionalInformation
  └── #Summary
  └── #ReserversInformation  
  └── #Payment (has inline display:none until needed)
  └── #Buttons
```

**Important:** When `#SecondaryFormItems` is hidden, ALL child sections are hidden too.

### CSS Rules That Caused Problems

1. **`.clearfix:has(.reservation_input_text)` rule** was applying `display: flex` to `#SecondaryFormItems` because it has class `clearfix` and contains form inputs.

2. **Any `display: X !important` rule** on section containers will fight with CMS's visibility control.

### Solution Pattern

Put visibility override rules at the **END** of CSS file:

```css
/* CMS VISIBILITY OVERRIDES - MUST BE AT END OF FILE */
body.cwv-registration-page #RegisterBody #SecondaryFormItems.hidden,
body.cwv-registration-page #RegisterBody .clearfix.bottom_padding.hidden {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  overflow: hidden !important;
  padding: 0 !important;
  margin: 0 !important;
}
```

### Debug Script

A debug script exists at `cwv-events-debug.js` - paste into console to see:
- Current visibility state of all form sections
- Real-time logging of CMS class/style changes

### userform.js Errors

The CMS's `userform.js` will throw errors if elements it expects are hidden/moved:
- `TypeError: Cannot read properties of null (reading 'value')`
- This happens when our CSS/JS removes or hides elements the CMS expects to find

**Solution:** Don't move DOM elements, only style them. Let CMS control visibility.

---

## Session Log: 2025-02-24

### Issues Fixed

1. **SecondaryFormItems visibility** - Had `.hidden` class but displayed as `flex`
   - Root cause: CSS rule at line 768 had 6 IDs of specificity from `:not(#ID)` selectors
   - Fix: Changed line 768 to only target `.clearfix.small_vertical_padding` (field wrappers, not containers)
   - Added override rules at END of CSS file for maximum cascade priority

2. **Your Information grid layout** - Fields were horizontal instead of 2-column grid
   - Root cause: Same line 768 rule was setting `display: flex` on form container
   - Fix: Form container now gets `display: grid` from end-of-file rule

3. **Your Information icon missing** - Title had no user icon
   - Root cause: Rule hiding `::before` on `.clearfix` was also hitting `.title`
   - Fix: Added `:not(.title)` to the pseudo-element hiding rule

4. **Summary section position** - Was appearing above Payment instead of at bottom
   - Fix: Re-enabled JS code that moves Summary before Buttons

5. **Added #PRICING: marker** - New info card for pricing
   - Works alongside #LOCATION: and #DATETIME:
   - Detects case breaks (e.g., "$125Parking" → separates correctly)
   - Shows dollar sign icon in styled card

### Key CSS Specificity Lesson
`:not(#ID)` selectors each add full ID specificity. A rule with 5 `:not(#ID)` has 5 IDs worth of specificity! To override, either:
- Add more IDs to your selector
- Put your rule at the END of the file (cascade wins for equal specificity)
- Modify the original rule to be more specific about what it matches

### Files Modified
- `cwv-events.css` - Line 768 fix, end-of-file overrides
- `cwv-events.js` - Added #PRICING: marker, re-enabled Summary move
- `EVENT-MARKERS-GUIDE.txt` - Added pricing examples
