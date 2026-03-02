# Event Image Capture

Chrome extension to capture individual images from event pages with the page URL in the filename.

## Install

1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select this `scraper-extension` folder

## Use

1. Visit any event page (e.g., jewisheugene.org/purim)
2. Click the extension icon
3. Click "Start Selecting Images"
4. Hover over images - they'll highlight with a purple outline
5. Click any image to capture it
6. PNG saves to Downloads with filename like: `jewisheugene.org_purim_1.png`
7. Click more images - they increment: `_2.png`, `_3.png`, etc.

## Features

- Captures just the clicked image (not the whole page)
- Works with `<img>` tags and CSS background images
- Filename includes domain and page path
- Visual feedback: hover highlight and flash on capture
- Counter shows how many images captured

## Notes

- Some images may be blocked by CORS - you'll see a placeholder
- Works best on same-domain images or images with CORS headers
- Close popup when done, or refresh page to reset
