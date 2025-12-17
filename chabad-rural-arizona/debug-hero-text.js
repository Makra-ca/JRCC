/* ===================================================================
   DEBUG: Hero Text Extraction
   Paste this in browser console on jewishruralaz.org
   Run BEFORE any redesign script is loaded
   =================================================================== */

(function() {
    console.log('='.repeat(60));
    console.log('DEBUG: HERO TEXT EXTRACTION');
    console.log('='.repeat(60));

    // 1. Find the slider container
    console.log('\n1. LOOKING FOR SLIDER CONTAINER...');
    const sliderSelectors = [
        '.promo_slider',
        '.slideshow',
        '.carousel',
        '.banner',
        '.hero',
        '[class*="slider"]',
        '[class*="promo"]',
        '[class*="cycle"]'
    ];

    let slider = null;
    for (const sel of sliderSelectors) {
        const el = document.querySelector(sel);
        if (el) {
            console.log(`   ✓ Found: ${sel}`, el);
            if (!slider) slider = el;
        }
    }

    if (!slider) {
        console.log('   ❌ No slider found!');
        return;
    }

    // 2. Show slider's direct HTML structure
    console.log('\n2. SLIDER OUTER HTML (first 2000 chars):');
    console.log(slider.outerHTML.substring(0, 2000));

    // 3. Find all text-containing elements
    console.log('\n3. ALL TEXT ELEMENTS IN SLIDER:');
    const textSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'div', 'big', 'strong', 'em',
        '.cycle-caption', '.caption', '[class*="caption"]',
        '[class*="title"]', '[class*="text"]', '[class*="subtitle"]'
    ];

    const foundElements = new Map();
    textSelectors.forEach(sel => {
        const els = slider.querySelectorAll(sel);
        els.forEach(el => {
            const text = el.textContent.trim();
            if (text && text.length > 3 && text.length < 500) {
                const key = `${el.tagName}.${el.className}`;
                if (!foundElements.has(key)) {
                    foundElements.set(key, { el, text, selector: sel });
                }
            }
        });
    });

    foundElements.forEach((data, key) => {
        console.log(`\n   [${data.selector}] ${key}:`);
        console.log(`   Text: "${data.text.substring(0, 100)}${data.text.length > 100 ? '...' : ''}"`);
        console.log(`   Element:`, data.el);
    });

    // 4. Look specifically for cycle-caption (jQuery Cycle)
    console.log('\n4. CYCLE-CAPTION ANALYSIS:');
    const captions = slider.querySelectorAll('.cycle-caption');
    if (captions.length === 0) {
        console.log('   ❌ No .cycle-caption found');
    } else {
        captions.forEach((caption, i) => {
            console.log(`\n   Caption ${i + 1}:`);
            console.log(`   HTML: ${caption.innerHTML.substring(0, 500)}`);

            const big = caption.querySelector('big');
            const span = caption.querySelector('span');
            const p = caption.querySelector('p');

            console.log(`   <big>: ${big ? big.textContent.trim() : 'NOT FOUND'}`);
            console.log(`   <span>: ${span ? span.textContent.trim().substring(0, 100) : 'NOT FOUND'}`);
            console.log(`   <p>: ${p ? p.textContent.trim().substring(0, 100) : 'NOT FOUND'}`);
        });
    }

    // 5. Look for individual slides
    console.log('\n5. INDIVIDUAL SLIDES:');
    const slideSelectors = [
        '.cycle-slide', '.slide', '[class*="slide"]',
        '.promo_slide', '.item', '> div'
    ];

    for (const sel of slideSelectors) {
        const slides = slider.querySelectorAll(sel);
        if (slides.length > 0) {
            console.log(`\n   Found ${slides.length} slides with "${sel}":`);
            slides.forEach((slide, i) => {
                if (i < 3) { // Show first 3 slides
                    console.log(`   Slide ${i + 1}:`, slide);
                    const text = slide.textContent.trim();
                    if (text) {
                        console.log(`   Text: "${text.substring(0, 150)}..."`);
                    }
                }
            });
            break;
        }
    }

    // 6. Extract what we would get with current logic
    console.log('\n6. EXTRACTION RESULT WITH CURRENT LOGIC:');
    const caption = slider.querySelector('.cycle-caption');
    if (caption) {
        const bigEl = caption.querySelector('big');
        const spanEl = caption.querySelector('span');

        let title = bigEl ? bigEl.textContent.trim() : null;
        let subtitle = null;

        if (spanEl) {
            const clone = spanEl.cloneNode(true);
            const bigInClone = clone.querySelector('big');
            if (bigInClone) bigInClone.remove();
            subtitle = clone.textContent.trim()
                .replace(/\s*(Learn More|Read More|Click Here|View More)\.?$/i, '')
                .replace(/\s+/g, ' ')
                .trim();
        }

        console.log(`   Title: "${title || 'NULL'}"`);
        console.log(`   Subtitle: "${subtitle || 'NULL'}"`);
    } else {
        console.log('   ❌ No .cycle-caption to extract from');
    }

    // 7. Show computed visibility
    console.log('\n7. VISIBILITY CHECK:');
    if (slider) {
        const style = window.getComputedStyle(slider);
        console.log(`   display: ${style.display}`);
        console.log(`   visibility: ${style.visibility}`);
        console.log(`   opacity: ${style.opacity}`);
        console.log(`   height: ${style.height}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('DEBUG COMPLETE');
    console.log('='.repeat(60));
})();
