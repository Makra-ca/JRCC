# Mobile Browser Cache Clearing Guide

## The Issue
You've successfully purged the CDN cache, but you're still seeing the old mobile sidebar (blue hamburger button) instead of the new bottom sheet with "SIDEBAR" label.

## Diagnosis
Run the diagnostic script first to identify where the caching is happening:

1. On your mobile device, visit the JRCC website page
2. Open the browser console/developer tools
3. Copy and paste the entire contents of `cache-diagnostic-console.js`
4. Check the output to see if the CDN has the correct version

## Mobile Browser Cache Clearing

### Safari on iOS/iPadOS

**Method 1: Clear All History and Website Data (Recommended)**
1. Close Safari completely
2. Go to **Settings** app → **Safari**
3. Scroll down and tap **Clear History and Website Data**
4. Tap **Clear History and Data** to confirm
5. Open Safari again and visit the JRCC site

**Method 2: Clear Just One Site's Data**
1. Open Safari
2. Tap the **aA** icon in the address bar
3. Tap **Website Settings**
4. Tap **Clear History and Website Data for This Website**
5. Hard reload: Pull down to refresh the page

### Chrome on Mobile (iOS & Android)

**iOS:**
1. Open Chrome app
2. Tap **•••** (three dots) → **Settings**
3. Tap **Privacy** → **Clear Browsing Data**
4. Make sure these are checked:
   - ✅ Cached Images and Files
   - ✅ Cookies, Site Data
5. Tap **Clear Browsing Data** → **Clear**
6. Close Chrome completely (swipe up from app switcher)
7. Reopen Chrome and visit the JRCC site

**Android:**
1. Open Chrome app
2. Tap **⋮** (three dots) → **Settings**
3. Tap **Privacy and security** → **Clear browsing data**
4. Select **Cached images and files** and **Cookies and site data**
5. Tap **Clear data**
6. Force stop Chrome (Settings → Apps → Chrome → Force Stop)
7. Reopen Chrome and visit the JRCC site

### Firefox Mobile

1. Tap **☰** (menu) → **Settings**
2. Tap **Delete browsing data**
3. Check **Cache** and **Cookies**
4. Tap **Delete browsing data**
5. Close Firefox completely
6. Reopen and visit the JRCC site

### Samsung Internet (Android)

1. Tap **☰** → **Settings**
2. Tap **Personal browsing data**
3. Tap **Delete browsing data**
4. Select **Cache** and **Cookies and site data**
5. Tap **Delete**
6. Force close the app
7. Reopen and visit the JRCC site

## Hard Reload After Clearing Cache

After clearing cache, perform a hard reload:

### iOS Safari
- Pull down on the page to refresh while holding for 1-2 seconds
- Or: Close tab completely and open a new one to the JRCC site

### Chrome/Android Browsers
- Tap the **⟳** refresh icon
- Or: Close the tab and open a new one

## Verification

After clearing cache and reloading:

1. You should see a **bottom sheet** peaking from the bottom of the screen
2. The sheet should have **"SIDEBAR"** text visible at the top
3. There should be a small **pill-shaped handle** above the text
4. **NO blue circle with 3 lines** (hamburger button) should be visible

## If Still Not Working

If you've cleared cache and waited 10+ minutes since the CDN purge, and you're still seeing the old version:

1. Run the diagnostic script again to check CDN status
2. Check the "Nuclear Option" instructions in the main README
3. Consider testing in a **Private/Incognito** browser window first
