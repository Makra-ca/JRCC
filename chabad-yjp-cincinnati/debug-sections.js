/* ===================================================================
   YJP Cincinnati - Debug Script: Section Discovery
   ===================================================================

   PURPOSE: Discover all content sections on the original page
   BEFORE any redesign injection, so we can map and style them.

   HOW TO USE:
   1. Open https://www.yjpcincinnati.com/ in your browser
   2. Open DevTools (F12) → Console tab
   3. Paste this entire script and press Enter
   4. Review the output to understand page structure

   =================================================================== */

(function() {
    'use strict';

    console.log('\n' + '='.repeat(70));
    console.log('YJP CINCINNATI - SECTION DISCOVERY DEBUG');
    console.log('='.repeat(70) + '\n');

    // ===================================================================
    // 1. FIND ALL MAJOR CONTAINERS
    // ===================================================================

    console.log('📦 MAJOR CONTAINERS:');
    console.log('-'.repeat(50));

    const containerSelectors = [
        '#chabad_body_page',
        '#chabad_main_content',
        '#BodyContainer',
        '.body_wrapper',
        '#back-header',
        '#footer',
        '.slider-wrapper',
        '.home-slider-part',
        'main',
        'article',
        '.content-wrapper',
        '.page-content'
    ];

    containerSelectors.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
            const children = el.children.length;
            const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';
            console.log(`✓ ${sel}${classes} - ${children} children`);
        }
    });

    // ===================================================================
    // 2. FIND ALL SECTIONS (semantic and div-based)
    // ===================================================================

    console.log('\n📑 ALL <SECTION> ELEMENTS:');
    console.log('-'.repeat(50));

    const sections = document.querySelectorAll('section');
    if (sections.length === 0) {
        console.log('(No <section> tags found - site may use divs)');
    } else {
        sections.forEach((sec, i) => {
            const id = sec.id ? `#${sec.id}` : '';
            const classes = sec.className ? `.${sec.className.split(' ').slice(0, 3).join('.')}` : '';
            const text = sec.textContent.trim().substring(0, 50).replace(/\s+/g, ' ');
            console.log(`${i + 1}. ${id}${classes} - "${text}..."`);
        });
    }

    // ===================================================================
    // 3. FIND CONTENT BLOCKS (CYP theme specific)
    // ===================================================================

    console.log('\n🧱 CYP THEME CONTENT BLOCKS:');
    console.log('-'.repeat(50));

    // CYP themes often use these patterns
    const blockSelectors = [
        '.single-slide',
        '.slider-img',
        '.home-section',
        '.content-section',
        '.widget',
        '.widget-container',
        '[class*="section"]',
        '[class*="block"]',
        '[class*="module"]',
        '.row',
        '.container > div'
    ];

    const foundBlocks = new Set();
    blockSelectors.forEach(sel => {
        const elements = document.querySelectorAll(sel);
        if (elements.length > 0 && elements.length < 20) {
            elements.forEach(el => {
                const id = el.id ? `#${el.id}` : '';
                const classes = el.className ? el.className.split(' ').slice(0, 2).join('.') : '';
                const key = `${el.tagName}${id}.${classes}`;
                if (!foundBlocks.has(key)) {
                    foundBlocks.add(key);
                    console.log(`• ${sel}: ${key}`);
                }
            });
        }
    });

    // ===================================================================
    // 4. DEEP DIVE: MAIN CONTENT CHILDREN
    // ===================================================================

    console.log('\n🔍 MAIN CONTENT STRUCTURE:');
    console.log('-'.repeat(50));

    // Find the main content area
    const mainContent = document.querySelector('#chabad_main_content') ||
                       document.querySelector('#BodyContainer') ||
                       document.querySelector('main') ||
                       document.querySelector('.body_wrapper');

    if (mainContent) {
        console.log(`Main container: ${mainContent.tagName}#${mainContent.id || '(no id)'}.${mainContent.className || '(no class)'}`);
        console.log('\nDirect children:');

        Array.from(mainContent.children).forEach((child, i) => {
            const tag = child.tagName.toLowerCase();
            const id = child.id ? `#${child.id}` : '';
            const classes = child.className ? `.${child.className.split(' ').slice(0, 2).join('.')}` : '';
            const rect = child.getBoundingClientRect();
            const visible = rect.height > 0 ? '✓' : '⚠️ hidden';
            const height = Math.round(rect.height);

            // Get first meaningful text
            let preview = '';
            const headings = child.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if (headings.length > 0) {
                preview = headings[0].textContent.trim().substring(0, 40);
            } else {
                preview = child.textContent.trim().substring(0, 40).replace(/\s+/g, ' ');
            }

            console.log(`  ${i + 1}. <${tag}>${id}${classes}`);
            console.log(`     Height: ${height}px ${visible}`);
            console.log(`     Preview: "${preview}..."`);
        });
    } else {
        console.log('Could not find main content container');
    }

    // ===================================================================
    // 5. FIND ALL HEADINGS (to understand content hierarchy)
    // ===================================================================

    console.log('\n📝 PAGE HEADINGS (Content Sections):');
    console.log('-'.repeat(50));

    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach((h, i) => {
        const tag = h.tagName;
        const text = h.textContent.trim().substring(0, 60).replace(/\s+/g, ' ');
        const parent = h.parentElement;
        const parentInfo = parent ? `${parent.tagName}${parent.id ? '#' + parent.id : ''}${parent.className ? '.' + parent.className.split(' ')[0] : ''}` : '';

        // Skip if empty or just whitespace
        if (text.length < 2) return;

        console.log(`${tag}: "${text}"`);
        console.log(`   Parent: ${parentInfo}`);
    });

    // ===================================================================
    // 6. VISUAL SECTION MAP (by vertical position)
    // ===================================================================

    console.log('\n📍 VISUAL SECTION MAP (top to bottom):');
    console.log('-'.repeat(50));

    // Get all substantial visible elements
    const allElements = document.querySelectorAll('header, nav, section, article, aside, footer, div[id], div[class*="section"], div[class*="wrapper"], div[class*="container"]');

    const visibleSections = [];
    allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Only include elements that are substantial (height > 50px, width > 200px)
        if (rect.height > 50 && rect.width > 200) {
            const id = el.id ? `#${el.id}` : '';
            const classes = el.className ? `.${el.className.split(' ').slice(0, 2).join('.')}` : '';

            // Skip if this is a child of an already-found section at similar position
            const exists = visibleSections.find(s =>
                Math.abs(s.top - rect.top) < 20 && s.tag === el.tagName
            );

            if (!exists) {
                visibleSections.push({
                    top: rect.top + window.scrollY,
                    height: rect.height,
                    tag: el.tagName,
                    selector: `${el.tagName.toLowerCase()}${id}${classes}`,
                    element: el
                });
            }
        }
    });

    // Sort by vertical position
    visibleSections.sort((a, b) => a.top - b.top);

    // Remove duplicates (keep first at each position)
    const uniqueSections = [];
    let lastTop = -100;
    visibleSections.forEach(sec => {
        if (sec.top - lastTop > 30) { // At least 30px apart
            uniqueSections.push(sec);
            lastTop = sec.top;
        }
    });

    console.log(`Found ${uniqueSections.length} distinct visual sections:\n`);

    uniqueSections.slice(0, 15).forEach((sec, i) => {
        const yPos = Math.round(sec.top);
        const height = Math.round(sec.height);

        // Try to get a content preview
        let preview = '';
        const h = sec.element.querySelector('h1, h2, h3, h4');
        if (h) {
            preview = h.textContent.trim().substring(0, 35);
        } else {
            const imgs = sec.element.querySelectorAll('img');
            if (imgs.length > 0) {
                preview = `[${imgs.length} image(s)]`;
            }
        }

        console.log(`${String(i + 1).padStart(2)}. Y:${yPos}px | H:${height}px`);
        console.log(`    ${sec.selector}`);
        if (preview) console.log(`    Content: "${preview}"`);
        console.log('');
    });

    // ===================================================================
    // 7. IMAGES IN PAGE (for background/hero identification)
    // ===================================================================

    console.log('\n🖼️ SIGNIFICANT IMAGES:');
    console.log('-'.repeat(50));

    const images = document.querySelectorAll('img');
    let imgCount = 0;
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.width > 100 && rect.height > 100) {
            imgCount++;
            const src = img.src.substring(0, 80);
            const alt = img.alt || '(no alt)';
            const classes = img.className || '(no class)';
            console.log(`${imgCount}. ${rect.width}x${rect.height}px`);
            console.log(`   Class: ${classes}`);
            console.log(`   Alt: ${alt}`);
            console.log(`   Src: ${src}...`);
        }
    });

    // ===================================================================
    // 8. EXPORT SECTION DATA TO WINDOW FOR FURTHER INSPECTION
    // ===================================================================

    window.YJP_DEBUG = {
        sections: uniqueSections,
        headings: Array.from(headings).map(h => ({
            tag: h.tagName,
            text: h.textContent.trim(),
            parent: h.parentElement
        })),
        mainContent: mainContent
    };

    console.log('\n' + '='.repeat(70));
    console.log('DEBUG COMPLETE');
    console.log('Access window.YJP_DEBUG for programmatic inspection');
    console.log('='.repeat(70) + '\n');

})();
