/* ===================================================================
   CHABAD RURAL ARIZONA - Page Structure Analyzer
   ===================================================================

   HOW TO USE:
   1. Open the Chabad Rural Arizona website
   2. Open DevTools (F12) → Console tab
   3. Paste this entire script and press Enter
   4. Copy the output and paste it back to Claude

   =================================================================== */

(function() {
    'use strict';

    console.log('🔍 Analyzing page structure...\n');

    const output = [];

    // ===================================================================
    // BASIC PAGE INFO
    // ===================================================================

    output.push('='.repeat(60));
    output.push('PAGE ANALYSIS - ' + window.location.href);
    output.push('='.repeat(60));
    output.push('');

    output.push('## Basic Info');
    output.push('- URL: ' + window.location.href);
    output.push('- Title: ' + document.title);
    output.push('- Body Classes: ' + (document.body.className || '(none)'));
    output.push('');

    // ===================================================================
    // MAIN STRUCTURE - First 3 levels of DOM
    // ===================================================================

    output.push('## Main Structure (Body > Children)');

    function describeElement(el, indent = '') {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : '';
        const classes = el.className && typeof el.className === 'string'
            ? '.' + el.className.split(' ').filter(c => c).join('.')
            : '';
        const text = el.textContent?.trim().substring(0, 50) || '';
        const childCount = el.children.length;

        return `${indent}<${tag}${id}${classes}> [${childCount} children]`;
    }

    // Get body's direct children
    Array.from(document.body.children).forEach(child => {
        if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE') return;
        output.push(describeElement(child, '  '));

        // Second level
        Array.from(child.children).slice(0, 10).forEach(grandchild => {
            if (grandchild.tagName === 'SCRIPT' || grandchild.tagName === 'STYLE') return;
            output.push(describeElement(grandchild, '    '));

            // Third level (just first 5)
            Array.from(grandchild.children).slice(0, 5).forEach(greatgrand => {
                if (greatgrand.tagName === 'SCRIPT' || greatgrand.tagName === 'STYLE') return;
                output.push(describeElement(greatgrand, '      '));
            });
            if (grandchild.children.length > 5) {
                output.push('      ... +' + (grandchild.children.length - 5) + ' more');
            }
        });
        if (child.children.length > 10) {
            output.push('    ... +' + (child.children.length - 10) + ' more');
        }
    });
    output.push('');

    // ===================================================================
    // KEY ELEMENTS
    // ===================================================================

    output.push('## Key Elements Found');

    const keySelectors = [
        { name: 'Header/Nav', selectors: ['header', 'nav', '#header', '.header', '#navigation', '.nav', '.navbar'] },
        { name: 'Logo', selectors: ['.logo', '#logo', 'img[src*="logo"]', '.site-logo'] },
        { name: 'Main Content', selectors: ['main', '#content', '.content', '#main', '.main-content', '#co_content_container'] },
        { name: 'Hero/Banner', selectors: ['.hero', '.banner', '.jumbotron', '[class*="hero"]', '[class*="banner"]'] },
        { name: 'Sidebar', selectors: ['aside', '.sidebar', '#sidebar', '[class*="sidebar"]'] },
        { name: 'Footer', selectors: ['footer', '#footer', '.footer'] },
        { name: 'Chabad One Specific', selectors: ['.cco_body', '#BodyContainer', '.master-content-wrapper', '.clearfix', '.body_wrapper'] }
    ];

    keySelectors.forEach(({ name, selectors }) => {
        const found = [];
        selectors.forEach(sel => {
            try {
                const els = document.querySelectorAll(sel);
                if (els.length > 0) {
                    found.push(`${sel} (${els.length})`);
                }
            } catch (e) {}
        });
        if (found.length > 0) {
            output.push(`- ${name}: ${found.join(', ')}`);
        }
    });
    output.push('');

    // ===================================================================
    // ALL HEADINGS
    // ===================================================================

    output.push('## Headings (H1-H3)');
    ['h1', 'h2', 'h3'].forEach(tag => {
        const headings = document.querySelectorAll(tag);
        if (headings.length > 0) {
            headings.forEach((h, i) => {
                const text = h.textContent?.trim().substring(0, 60) || '';
                const classes = h.className || '';
                output.push(`- <${tag}${classes ? ' class="' + classes + '"' : ''}> "${text}"`);
            });
        }
    });
    output.push('');

    // ===================================================================
    // IMAGES
    // ===================================================================

    output.push('## Images (first 10)');
    const images = document.querySelectorAll('img');
    Array.from(images).slice(0, 10).forEach(img => {
        const src = img.src || img.getAttribute('data-src') || '';
        const alt = img.alt || '';
        const shortSrc = src.length > 60 ? '...' + src.substring(src.length - 50) : src;
        output.push(`- ${shortSrc} ${alt ? `(alt: "${alt}")` : ''}`);
    });
    if (images.length > 10) output.push(`- ... +${images.length - 10} more images`);
    output.push('');

    // ===================================================================
    // SECTIONS/CONTENT BLOCKS
    // ===================================================================

    output.push('## Content Sections');
    const sections = document.querySelectorAll('section, [class*="section"], [class*="block"], [class*="widget"], .cco_text_section');
    output.push(`Found ${sections.length} section-like elements`);
    Array.from(sections).slice(0, 10).forEach(sec => {
        const tag = sec.tagName.toLowerCase();
        const id = sec.id ? `#${sec.id}` : '';
        const classes = sec.className ? `.${sec.className.split(' ').join('.')}` : '';
        const firstText = sec.textContent?.trim().substring(0, 40) || '';
        output.push(`- <${tag}${id}${classes}> "${firstText}..."`);
    });
    output.push('');

    // ===================================================================
    // LINKS/NAVIGATION
    // ===================================================================

    output.push('## Navigation Links (from nav/header area)');
    const navArea = document.querySelector('nav, header, #navigation, .nav, .menu');
    if (navArea) {
        const links = navArea.querySelectorAll('a');
        Array.from(links).slice(0, 15).forEach(a => {
            const text = a.textContent?.trim() || '';
            const href = a.getAttribute('href') || '';
            if (text && text.length < 50) {
                output.push(`- "${text}" → ${href}`);
            }
        });
    } else {
        output.push('- No clear nav area found');
    }
    output.push('');

    // ===================================================================
    // INLINE STYLES CHECK
    // ===================================================================

    output.push('## Inline Styles (elements with style attribute)');
    const styled = document.querySelectorAll('[style]');
    output.push(`Found ${styled.length} elements with inline styles`);
    output.push('');

    // ===================================================================
    // STYLESHEETS
    // ===================================================================

    output.push('## External Stylesheets');
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(ss => {
        const href = ss.getAttribute('href') || '';
        const shortHref = href.length > 70 ? '...' + href.substring(href.length - 60) : href;
        output.push(`- ${shortHref}`);
    });
    output.push('');

    // ===================================================================
    // OUTPUT
    // ===================================================================

    const result = output.join('\n');
    console.log(result);

    // Also copy to clipboard if possible
    if (navigator.clipboard) {
        navigator.clipboard.writeText(result).then(() => {
            console.log('\n✅ Output copied to clipboard! Paste it to Claude.');
        }).catch(() => {
            console.log('\n⚠️ Could not copy to clipboard. Please select and copy the output above.');
        });
    }

    return result;
})();
