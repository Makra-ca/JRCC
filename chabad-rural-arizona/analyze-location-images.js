/* ===================================================================
   ANALYZER SCRIPT - Run this FIRST to find location-image mappings

   Paste this in the browser console on jewishruralaz.org
   It will output the page structure to help map images to locations
   =================================================================== */

(function() {
    console.log('🔍 ANALYZING PAGE STRUCTURE FOR LOCATION IMAGES...\n');

    // Find all elements with background images
    const elementsWithBg = document.querySelectorAll('[style*="background"]');

    console.log('=== ALL BACKGROUND IMAGES ===');
    elementsWithBg.forEach((el, i) => {
        const style = el.getAttribute('style');
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match && match[1] && !match[1].includes('spacer')) {
            const text = el.textContent.trim().substring(0, 100);
            const classes = el.className;
            const parent = el.parentElement;
            const parentText = parent ? parent.textContent.trim().substring(0, 100) : '';

            console.log(`\n[${i}] IMAGE: ${match[1].substring(0, 80)}...`);
            console.log(`    Element: <${el.tagName.toLowerCase()}> class="${classes}"`);
            console.log(`    Text in element: "${text}"`);
            console.log(`    Parent text: "${parentText}"`);
            console.log(`    Element:`, el);
        }
    });

    console.log('\n\n=== LOCATION LINKS ===');
    // Find links that might be location-related
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const text = link.textContent.trim();

        // Look for location-related links
        if (text.toLowerCase().match(/payson|rim|white mountain|holbrook|globe|miami|online|wherever/i) ||
            href.match(/Holbrook|Globe|Miami|feedback/i)) {

            // Check ancestors for background images
            let el = link;
            let foundBg = null;
            for (let i = 0; i < 8; i++) {
                const style = el.getAttribute('style') || '';
                const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
                if (match && !match[1].includes('spacer')) {
                    foundBg = { level: i, url: match[1], element: el };
                    break;
                }
                el = el.parentElement;
                if (!el) break;
            }

            console.log(`\nLink: "${text}"`);
            console.log(`  href: ${href}`);
            if (foundBg) {
                console.log(`  FOUND BG at level ${foundBg.level}: ${foundBg.url}`);
            } else {
                console.log(`  No background image found in ancestors`);
            }
        }
    });

    console.log('\n\n=== HP-TABLE STRUCTURE ===');
    // Analyze hp-table specifically
    const hpTable = document.querySelector('.hp-table');
    if (hpTable) {
        const cells = hpTable.querySelectorAll('td');
        cells.forEach((cell, i) => {
            const text = cell.textContent.trim().substring(0, 50);
            const style = cell.getAttribute('style') || '';
            const bgMatch = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);

            // Also check direct children
            const childWithBg = cell.querySelector('[style*="url"]');

            if (bgMatch || childWithBg || text.match(/payson|rim|white|holbrook|globe|miami/i)) {
                console.log(`\nCell [${i}]: "${text}"`);
                if (bgMatch) console.log(`  Direct BG: ${bgMatch[1]}`);
                if (childWithBg) {
                    const childStyle = childWithBg.getAttribute('style');
                    const childMatch = childStyle.match(/url\(['"]?([^'")\s]+)['"]?\)/);
                    if (childMatch) console.log(`  Child BG: ${childMatch[1]}`);
                }
            }
        });
    } else {
        console.log('No .hp-table found');
    }

    console.log('\n\n=== SUGGESTED MAPPING ===');
    console.log('Based on the output above, manually create a mapping in test-shadow-dom.js');
    console.log('Look for images that appear near location text and note their URLs');

})();
