/* ===================================================================
   YJP CINCINNATI - Deep DOM Explorer
   Run this to understand the actual page structure
   =================================================================== */

(function() {
    console.log('=== YJP Cincinnati - DOM Tree Explorer ===\n');

    // 1. Show direct children of body
    console.log('📦 BODY DIRECT CHILDREN:');
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach((child, i) => {
        const tag = child.tagName;
        const id = child.id ? `#${child.id}` : '';
        const cls = child.className ? `.${child.className.split(' ')[0]}` : '';
        const text = child.textContent?.trim().substring(0, 40) || '';
        console.log(`  ${i + 1}. <${tag}${id}${cls}> "${text}..."`);
    });

    // 2. Find all images on the page
    console.log('\n🖼️ ALL IMAGES ON PAGE:');
    const allImages = document.querySelectorAll('img');
    allImages.forEach((img, i) => {
        if (i < 20 && img.src && !img.src.includes('data:')) {
            const parent = img.parentElement?.className || 'no-class';
            console.log(`  ${i + 1}. [${parent}] ${img.src.substring(0, 80)}`);
        }
    });

    // 3. Explore slider structure
    console.log('\n🎠 SLIDER STRUCTURE:');
    const slider = document.querySelector('.home-slider-part') ||
                   document.querySelector('[class*="slider"]') ||
                   document.querySelector('.single-slide')?.parentElement;

    if (slider) {
        console.log('  Found slider:', slider.className);
        console.log('  Slider HTML preview:');
        console.log(slider.outerHTML.substring(0, 500) + '...');
    } else {
        console.log('  No slider found');
    }

    // 4. Find the hero/banner section
    console.log('\n🏠 HERO/BANNER AREA:');
    const heroSelectors = [
        '.single-slide',
        '.slider-content',
        '[class*="hero"]',
        '[class*="banner"]',
        '.home-slider-part'
    ];
    heroSelectors.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
            console.log(`  ${sel}:`);
            console.log(`    - Classes: ${el.className}`);
            console.log(`    - Children: ${el.children.length}`);
            const imgs = el.querySelectorAll('img');
            if (imgs.length) console.log(`    - Images: ${imgs.length}`);
        }
    });

    // 5. Find all section-like containers
    console.log('\n📄 CONTENT SECTIONS (by heading):');
    const h2s = document.querySelectorAll('h2');
    h2s.forEach((h2, i) => {
        const text = h2.textContent.trim();
        const parent = h2.closest('section, div[class*="section"], div[class*="block"], div[class*="part"]');
        console.log(`  ${i + 1}. "${text}"`);
        if (parent) {
            console.log(`      Container: <${parent.tagName}.${parent.className.split(' ')[0]}>`);
        }
    });

    // 6. Check for specific YJP template classes
    console.log('\n🔍 YJP-SPECIFIC CLASSES:');
    const yjpClasses = [
        'home-slider-part',
        'single-slide',
        'slider-img',
        'slider-content',
        'slider-title',
        'slider-subtitle',
        'service-slider',
        'client-slider'
    ];
    yjpClasses.forEach(cls => {
        const els = document.querySelectorAll(`.${cls}`);
        if (els.length > 0) {
            console.log(`  .${cls}: ${els.length} elements`);
            els.forEach((el, i) => {
                if (i < 3) {
                    const childTags = Array.from(el.children).map(c => c.tagName).join(', ');
                    console.log(`    - children: ${childTags || 'none'}`);
                }
            });
        }
    });

    // 7. Look for the hero image specifically
    console.log('\n🖼️ HERO IMAGE SEARCH:');
    const sliderImg = document.querySelector('.slider-img');
    if (sliderImg) {
        console.log('  .slider-img found');
        console.log('  Inner HTML:', sliderImg.innerHTML.substring(0, 300));
        const img = sliderImg.querySelector('img');
        if (img) {
            console.log('  Image src:', img.src);
        }
    }

    // 8. Check what's hiding the image
    console.log('\n🔎 CHECKING FOR LAZY LOADING / HIDDEN IMAGES:');
    document.querySelectorAll('img').forEach((img, i) => {
        if (i < 10) {
            const computed = window.getComputedStyle(img);
            const isVisible = computed.display !== 'none' && computed.visibility !== 'hidden';
            const hasDataSrc = img.dataset.src || img.dataset.lazySrc;
            if (hasDataSrc || !isVisible) {
                console.log(`  Image ${i}: visible=${isVisible}, data-src=${hasDataSrc || 'none'}`);
            }
        }
    });

    // 9. Check for iframes (sometimes sliders use iframes)
    const iframes = document.querySelectorAll('iframe');
    if (iframes.length > 0) {
        console.log('\n📺 IFRAMES FOUND:', iframes.length);
        iframes.forEach((iframe, i) => {
            console.log(`  ${i + 1}. ${iframe.src?.substring(0, 60) || 'no src'}`);
        });
    }

    // 10. Output first 2000 chars of body HTML structure
    console.log('\n📝 BODY HTML STRUCTURE (first 2000 chars):');
    const bodyHtml = document.body.innerHTML
        .replace(/\s+/g, ' ')
        .replace(/></g, '>\n<')
        .substring(0, 2000);
    console.log(bodyHtml);

    console.log('\n=== Debug Complete ===');
})();
