/*
   DEBUG: Why carousel extraction is failing
   Paste this in console on jewishruralaz.org BEFORE the redesign loads
*/

(function() {
    console.log('%c=== CAROUSEL EXTRACTION DEBUG ===', 'color: red; font-size: 16px; font-weight: bold;');

    // 1. Check if .promo_slider exists
    const slider = document.querySelector('.promo_slider');
    console.log('1. .promo_slider found:', !!slider);
    if (slider) {
        console.log('   Slider element:', slider);
        console.log('   Slider classes:', slider.className);
    }

    // 2. Find ALL elements with background images on the page
    console.log('\n2. ALL elements with background-image URLs:');
    const allBgElements = document.querySelectorAll('[style*="url"]');
    console.log(`   Found ${allBgElements.length} elements with url() in style`);

    // 3. If slider exists, check inside it
    if (slider) {
        console.log('\n3. Elements with url() INSIDE .promo_slider:');
        const sliderBgElements = slider.querySelectorAll('[style*="url"]');
        console.log(`   Found ${sliderBgElements.length} elements`);

        sliderBgElements.forEach((el, i) => {
            const style = el.getAttribute('style') || '';
            const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
            if (match) {
                console.log(`   ${i}: ${match[1].substring(0, 80)}...`);
            }
        });
    }

    // 4. Look for other carousel/slider elements
    console.log('\n4. Other potential carousel elements:');
    const otherSelectors = [
        '.slider', '.carousel', '.slideshow', '.banner',
        '[class*="slide"]', '[class*="banner"]', '[class*="promo"]',
        '.cycle-slideshow', '.widget-4'
    ];

    otherSelectors.forEach(sel => {
        const els = document.querySelectorAll(sel);
        if (els.length > 0) {
            console.log(`   ${sel}: ${els.length} found`);
        }
    });

    // 5. Check wrapper children
    console.log('\n5. Checking .promo_slider > .wrapper structure:');
    const wrapper = slider?.querySelector('.wrapper');
    if (wrapper) {
        console.log('   Wrapper found, children:', wrapper.children.length);
        Array.from(wrapper.children).forEach((child, i) => {
            const style = child.getAttribute('style') || '';
            console.log(`   Child ${i}: tag=${child.tagName}, class=${child.className}`);
            if (style.includes('url')) {
                const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
                console.log(`      BG URL: ${match ? match[1].substring(0, 60) + '...' : 'none'}`);
            }
        });
    }

    // 6. Extract with relaxed filters
    console.log('\n6. Extracting ALL image URLs (no filtering):');
    const allUrls = [];
    document.querySelectorAll('[style*="url"]').forEach(el => {
        const style = el.getAttribute('style') || '';
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match && match[1] && !allUrls.includes(match[1])) {
            allUrls.push(match[1]);
        }
    });

    console.log(`   Found ${allUrls.length} unique URLs:`);
    allUrls.slice(0, 20).forEach((url, i) => {
        const isChabad = url.includes('chabad.org');
        const isFb = url.includes('fbcdn');
        const isSpacer = url.includes('spacer');
        console.log(`   ${i}: [${isChabad ? 'chabad' : isFb ? 'fb' : 'other'}] ${isSpacer ? '(spacer)' : ''} ${url.substring(0, 70)}...`);
    });

    console.log('\n%c=== END DEBUG ===', 'color: red; font-size: 16px;');
})();
