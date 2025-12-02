/* Run this in the console to see the actual page structure */

(function() {
    console.log('=== ANALYZING PAGE STRUCTURE ===\n');

    // Find all elements with background images
    const bgElements = document.querySelectorAll('[style*="url"]');

    console.log('📷 Elements with background images:');
    bgElements.forEach((el, i) => {
        const style = el.getAttribute('style');
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match && !match[1].includes('spacer') && !match[1].includes('logo')) {
            // Get all text in this element and nearby siblings
            const text = el.textContent.trim().substring(0, 80);
            const parent = el.parentElement;
            const grandparent = parent?.parentElement;

            // Check siblings for text
            let siblingText = '';
            if (parent) {
                Array.from(parent.children).forEach(child => {
                    if (child !== el) {
                        siblingText += child.textContent.trim().substring(0, 50) + ' | ';
                    }
                });
            }

            console.log(`\n[${i}] ${match[1].substring(match[1].lastIndexOf('/') + 1)}`);
            console.log(`    Full URL: ${match[1]}`);
            console.log(`    Element: <${el.tagName}> class="${el.className}"`);
            console.log(`    Inner text: "${text}"`);
            console.log(`    Sibling text: "${siblingText}"`);
            console.log(`    Parent class: "${parent?.className}"`);
            console.log(`    Element:`, el);
        }
    });

    // Now find location text and trace upward
    console.log('\n\n=== LOCATION TEXT SEARCH ===');
    const locations = ['payson', 'rim country', 'white mountain', 'holbrook', 'globe', 'miami'];

    locations.forEach(loc => {
        // Use XPath to find text containing location
        const xpath = `//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${loc}')]`;
        const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        console.log(`\n🔍 "${loc}" found ${result.snapshotLength} times:`);
        for (let i = 0; i < Math.min(result.snapshotLength, 3); i++) {
            const el = result.snapshotItem(i);
            console.log(`    <${el.tagName}> class="${el.className}" - "${el.textContent.trim().substring(0, 60)}"`);

            // Trace up to find background image
            let current = el;
            for (let j = 0; j < 15; j++) {
                const style = current.getAttribute('style') || '';
                if (style.includes('url')) {
                    const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
                    if (match && !match[1].includes('spacer')) {
                        console.log(`    ↑ Found bg at level ${j}: ${match[1].substring(match[1].lastIndexOf('/') + 1)}`);
                        break;
                    }
                }
                current = current.parentElement;
                if (!current) break;
            }
        }
    });

    // Check if images are in order
    console.log('\n\n=== IMAGE ORDER (for fallback) ===');
    const orderedImages = [];
    document.querySelectorAll('[style*="url"]').forEach(el => {
        const style = el.getAttribute('style');
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match && (match[1].includes('chabad.org/media') || match[1].includes('fbcdn'))) {
            if (!match[1].includes('spacer') && !match[1].includes('logo')) {
                orderedImages.push({
                    url: match[1],
                    text: el.textContent.trim().substring(0, 40)
                });
            }
        }
    });

    console.log('Images in DOM order:');
    orderedImages.forEach((img, i) => {
        console.log(`${i}: ${img.url.substring(img.url.lastIndexOf('/') + 1)} - "${img.text}"`);
    });
})();
