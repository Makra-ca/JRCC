/* ===================================================================
   YJP Cincinnati - Debug: Font Sizing & Full Section Mapping
   ===================================================================

   PURPOSE:
   1. Check root font-size and rem calculations
   2. Map ALL sections on the original page with full content details

   HOW TO USE:
   1. Open https://www.yjpcincinnati.com/ in your browser
   2. Open DevTools (F12) → Console tab
   3. Paste this entire script and press Enter

   =================================================================== */

(function() {
    'use strict';

    console.log('\n' + '='.repeat(70));
    console.log('YJP CINCINNATI - FONT & SECTION DEBUG');
    console.log('='.repeat(70) + '\n');

    // ===================================================================
    // 1. FONT SIZE DEBUG
    // ===================================================================

    console.log('🔤 FONT SIZE ANALYSIS:');
    console.log('-'.repeat(50));

    // Check root font-size
    const htmlFontSize = window.getComputedStyle(document.documentElement).fontSize;
    const bodyFontSize = window.getComputedStyle(document.body).fontSize;

    console.log(`HTML root font-size: ${htmlFontSize}`);
    console.log(`Body font-size: ${bodyFontSize}`);
    console.log(`1rem = ${htmlFontSize}`);

    // Check if there's a font-size override
    const htmlStyle = document.documentElement.getAttribute('style');
    const bodyStyle = document.body.getAttribute('style');
    console.log(`HTML inline style: ${htmlStyle || '(none)'}`);
    console.log(`Body inline style: ${bodyStyle || '(none)'}`);

    // Check computed styles on key elements
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    const p = document.querySelector('p');

    if (h1) console.log(`First H1 font-size: ${window.getComputedStyle(h1).fontSize}`);
    if (h2) console.log(`First H2 font-size: ${window.getComputedStyle(h2).fontSize}`);
    if (p) console.log(`First P font-size: ${window.getComputedStyle(p).fontSize}`);

    // Check for any CSS that might be affecting rem
    const stylesheets = document.styleSheets;
    let remOverrides = [];
    try {
        for (const sheet of stylesheets) {
            try {
                const rules = sheet.cssRules || sheet.rules;
                for (const rule of rules) {
                    if (rule.selectorText === 'html' || rule.selectorText === ':root') {
                        if (rule.style.fontSize) {
                            remOverrides.push({
                                selector: rule.selectorText,
                                fontSize: rule.style.fontSize,
                                source: sheet.href || 'inline'
                            });
                        }
                    }
                }
            } catch (e) {
                // CORS restriction on external stylesheets
            }
        }
    } catch (e) {}

    if (remOverrides.length > 0) {
        console.log('\n⚠️ Found font-size overrides on html/:root:');
        remOverrides.forEach(o => console.log(`  ${o.selector}: ${o.fontSize} (${o.source})`));
    }

    // Viewport info
    console.log(`\nViewport: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`Device pixel ratio: ${window.devicePixelRatio}`);

    // ===================================================================
    // 2. COMPLETE SECTION MAPPING
    // ===================================================================

    console.log('\n\n📑 COMPLETE SECTION MAPPING:');
    console.log('='.repeat(70));

    // Find all H2s with .back-sec-title (CYP theme section headers)
    const sectionHeadings = document.querySelectorAll('.back-sec-title h2, h2');
    const sections = [];

    console.log('\n--- ALL H2 HEADINGS FOUND ---\n');

    sectionHeadings.forEach((h2, i) => {
        const text = h2.textContent.trim().replace(/\s+/g, ' ');
        if (text.length < 3) return; // Skip empty

        const rect = h2.getBoundingClientRect();
        const yPos = Math.round(rect.top + window.scrollY);

        // Find parent container
        const container = h2.closest('.container') ||
                         h2.closest('.wrapper') ||
                         h2.closest('[class*="section"]') ||
                         h2.parentElement?.parentElement;

        const containerClass = container?.className || '(no container)';
        const containerId = container?.id || '';

        // Get sibling content
        const siblingContent = [];
        if (container) {
            // Get all paragraphs
            const paragraphs = container.querySelectorAll('p');
            paragraphs.forEach(p => {
                const pText = p.textContent.trim().substring(0, 100);
                if (pText.length > 10) siblingContent.push(`P: "${pText}..."`);
            });

            // Get all buttons/links
            const buttons = container.querySelectorAll('a.btn, a[class*="button"], .back-btn a');
            buttons.forEach(btn => {
                const btnText = btn.textContent.trim();
                const btnHref = btn.getAttribute('href');
                if (btnText) siblingContent.push(`BTN: "${btnText}" → ${btnHref}`);
            });

            // Get images
            const images = container.querySelectorAll('img');
            images.forEach(img => {
                if (img.naturalWidth > 50) {
                    siblingContent.push(`IMG: ${img.alt || '(no alt)'} - ${img.src.substring(0, 60)}...`);
                }
            });
        }

        sections.push({
            index: i + 1,
            title: text,
            yPos,
            containerClass,
            containerId,
            content: siblingContent
        });

        console.log(`${i + 1}. "${text}"`);
        console.log(`   Y: ${yPos}px | Container: ${containerId ? '#' + containerId : ''}${containerClass.substring(0, 50)}`);
        if (siblingContent.length > 0) {
            console.log(`   Content:`);
            siblingContent.slice(0, 5).forEach(c => console.log(`     - ${c.substring(0, 80)}`));
        }
        console.log('');
    });

    // ===================================================================
    // 3. DETAILED CONTENT EXTRACTION TEST
    // ===================================================================

    console.log('\n📋 DETAILED CONTENT BY SECTION:');
    console.log('='.repeat(70));

    // Map each known section and what we can extract

    const sectionTests = [
        {
            name: 'Hero/Slider',
            selectors: ['.home-slider-part', '.slider-wrapper', '.single-slide'],
            extract: (el) => {
                const img = el.querySelector('img');
                const h2 = el.querySelector('h2');
                const btn = el.querySelector('a.btn, a[class*="button"]');
                return {
                    image: img?.src,
                    headline: h2?.textContent?.trim(),
                    button: btn ? { text: btn.textContent.trim(), href: btn.href } : null
                };
            }
        },
        {
            name: 'About Section (YJP Cincinnati)',
            selectors: ['.about-section', '[class*="about"]'],
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('YJP Cincinnati')) {
                        return h2.closest('.container')?.parentElement || h2.closest('.container');
                    }
                }
                return null;
            }
        },
        {
            name: 'Join Community (Tabs)',
            selectors: ['.back-tab-gird', '.tab-section'],
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('Join your Community')) {
                        return h2.closest('.container')?.parentElement;
                    }
                }
                return null;
            }
        },
        {
            name: 'Meet the Gouraries',
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('Gouraries')) {
                        return h2.closest('.container')?.parentElement;
                    }
                }
                return null;
            }
        },
        {
            name: 'CYP Network (bigger)',
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('bigger')) {
                        return h2.closest('.wrapper') || h2.closest('.container');
                    }
                }
                return null;
            }
        },
        {
            name: 'Donate CTA (frontier)',
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('frontier')) {
                        return h2.closest('.wrapper') || h2.closest('.container');
                    }
                }
                return null;
            }
        },
        {
            name: 'Upcoming Events',
            selectors: ['.service-slider'],
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('Upcoming Events')) {
                        return h2.closest('.container')?.parentElement;
                    }
                }
                return null;
            }
        },
        {
            name: 'Testimonials (Hear from)',
            selectors: ['.client-slider'],
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('Hear from')) {
                        return h2.closest('.container')?.parentElement;
                    }
                }
                return null;
            }
        },
        {
            name: 'Latest Photos',
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('Photos')) {
                        return h2.closest('.container')?.parentElement;
                    }
                }
                return null;
            }
        },
        {
            name: 'Final CTA (community together)',
            findBy: () => {
                const h2s = document.querySelectorAll('.back-sec-title h2');
                for (const h2 of h2s) {
                    if (h2.textContent.includes('community together')) {
                        return h2.closest('.container')?.parentElement;
                    }
                }
                return null;
            }
        }
    ];

    sectionTests.forEach(test => {
        console.log(`\n--- ${test.name} ---`);

        let element = null;

        // Try findBy function first
        if (test.findBy) {
            element = test.findBy();
        }

        // Then try selectors
        if (!element && test.selectors) {
            for (const sel of test.selectors) {
                element = document.querySelector(sel);
                if (element) break;
            }
        }

        if (element) {
            console.log(`✓ FOUND: ${element.tagName}${element.id ? '#' + element.id : ''}.${(element.className || '').split(' ').slice(0, 2).join('.')}`);

            // Log all text content
            const h2 = element.querySelector('h2');
            const h3s = element.querySelectorAll('h3');
            const paragraphs = element.querySelectorAll('p');
            const imgs = element.querySelectorAll('img');
            const btns = element.querySelectorAll('a.btn, a[class*="button"], .back-btn a');

            if (h2) console.log(`  H2: "${h2.textContent.trim().substring(0, 60)}"`);

            h3s.forEach((h3, i) => {
                if (i < 3) console.log(`  H3: "${h3.textContent.trim().substring(0, 50)}"`);
            });

            paragraphs.forEach((p, i) => {
                const text = p.textContent.trim();
                if (i < 3 && text.length > 10) {
                    console.log(`  P: "${text.substring(0, 80)}..."`);
                }
            });

            imgs.forEach((img, i) => {
                if (i < 2 && img.naturalWidth > 50) {
                    console.log(`  IMG: ${img.alt || '(no alt)'}`);
                }
            });

            btns.forEach(btn => {
                console.log(`  BTN: "${btn.textContent.trim()}" → ${btn.getAttribute('href')}`);
            });

        } else {
            console.log(`✗ NOT FOUND`);
        }
    });

    // ===================================================================
    // 4. LOOK FOR SECTIONS WE MIGHT BE MISSING
    // ===================================================================

    console.log('\n\n🔍 SCANNING FOR POTENTIALLY MISSED SECTIONS:');
    console.log('='.repeat(70));

    // Get all wrapper/container divs that might be sections
    const potentialSections = document.querySelectorAll(`
        .container,
        .wrapper,
        [class*="section"],
        [class*="-part"],
        [class*="area"]
    `);

    const foundSections = new Map();

    potentialSections.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Only consider elements with substantial height
        if (rect.height > 100) {
            const yKey = Math.round((rect.top + window.scrollY) / 100) * 100; // Round to nearest 100px

            if (!foundSections.has(yKey)) {
                const h2 = el.querySelector('h2');
                const h3 = el.querySelector('h3');
                const heading = h2?.textContent?.trim() || h3?.textContent?.trim() || '(no heading)';

                foundSections.set(yKey, {
                    y: rect.top + window.scrollY,
                    height: rect.height,
                    element: `${el.tagName}${el.id ? '#' + el.id : ''}.${(el.className || '').split(' ').slice(0, 2).join('.')}`,
                    heading: heading.substring(0, 50)
                });
            }
        }
    });

    // Sort by Y position and display
    const sortedSections = Array.from(foundSections.values()).sort((a, b) => a.y - b.y);

    console.log(`\nFound ${sortedSections.length} potential section areas:\n`);

    sortedSections.forEach((sec, i) => {
        console.log(`${i + 1}. Y:${Math.round(sec.y)}px H:${Math.round(sec.height)}px`);
        console.log(`   ${sec.element}`);
        console.log(`   Heading: "${sec.heading}"`);
        console.log('');
    });

    // ===================================================================
    // 5. EXPORT FOR INSPECTION
    // ===================================================================

    window.YJP_DEBUG = {
        fonts: {
            htmlFontSize,
            bodyFontSize,
            remOverrides
        },
        sections: sortedSections,
        sectionHeadings: sections
    };

    console.log('\n' + '='.repeat(70));
    console.log('DEBUG COMPLETE - Access window.YJP_DEBUG for data');
    console.log('='.repeat(70) + '\n');

})();
