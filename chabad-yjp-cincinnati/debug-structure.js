/* ===================================================================
   YJP CINCINNATI - Debug Script
   Run this in the console to explore the page structure
   =================================================================== */

(function() {
    console.log('=== YJP Cincinnati Debug ===\n');

    // 1. Check for site ID in various places
    console.log('📍 SITE ID DETECTION:');
    const bodyClasses = document.body.className;
    console.log('Body classes:', bodyClasses);

    // Look for site ID in URLs
    const allLinks = document.querySelectorAll('a[href]');
    const siteIdPattern = /\/(\d{4,7})(?:\/|$)/;
    const foundIds = new Set();
    allLinks.forEach(link => {
        const match = link.href.match(siteIdPattern);
        if (match) foundIds.add(match[1]);
    });
    console.log('Potential site IDs found in links:', [...foundIds].slice(0, 10));

    // 2. Find hero/banner images
    console.log('\n🖼️ HERO/BANNER IMAGES:');
    const bgElements = document.querySelectorAll('[style*="background"]');
    let imageCount = 0;
    bgElements.forEach((el, i) => {
        const style = el.getAttribute('style') || '';
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match && !match[1].includes('spacer') && !match[1].includes('data:')) {
            imageCount++;
            if (imageCount <= 10) {
                console.log(`  ${imageCount}. ${el.tagName}.${el.className.split(' ')[0] || '(no class)'}:`, match[1].substring(0, 80) + '...');
            }
        }
    });
    console.log(`Total background images found: ${imageCount}`);

    // 3. Check slider/carousel elements
    console.log('\n🎠 SLIDER/CAROUSEL ELEMENTS:');
    const sliderSelectors = ['.promo_slider', '.slider', '.carousel', '.banner', '.hero', '[class*="slide"]', '[class*="banner"]'];
    sliderSelectors.forEach(sel => {
        const els = document.querySelectorAll(sel);
        if (els.length > 0) {
            console.log(`  ${sel}: ${els.length} found`);
            els.forEach((el, i) => {
                const bgImgs = el.querySelectorAll('[style*="url"]');
                console.log(`    - ${el.className} has ${bgImgs.length} background images`);
            });
        }
    });

    // 4. Navigation structure
    console.log('\n🧭 NAVIGATION STRUCTURE:');

    // Check for span.parent (Chabad One standard)
    const parentSpans = document.querySelectorAll('span.parent');
    console.log(`  span.parent elements: ${parentSpans.length}`);
    parentSpans.forEach((span, i) => {
        const link = span.querySelector('a');
        if (link) console.log(`    ${i + 1}. "${link.textContent.trim()}" -> ${link.href}`);
    });

    // Check for other nav patterns
    const navPatterns = [
        '#header nav a',
        '#header .menu a',
        '.navigation a',
        'nav a',
        '.nav-menu a',
        '#menu a',
        '.main-menu a'
    ];
    navPatterns.forEach(sel => {
        const links = document.querySelectorAll(sel);
        if (links.length > 0 && links.length < 20) {
            console.log(`  ${sel}: ${links.length} links`);
        }
    });

    // 5. Main content sections
    console.log('\n📄 MAIN CONTENT SECTIONS:');
    const sections = document.querySelectorAll('section, .section, [class*="section"], .content-block, .block');
    console.log(`  Found ${sections.length} section-like elements`);
    sections.forEach((sec, i) => {
        if (i < 10) {
            const text = sec.textContent.trim().substring(0, 50);
            console.log(`    ${i + 1}. ${sec.tagName}.${sec.className.split(' ')[0]}: "${text}..."`);
        }
    });

    // 6. Check body_wrapper content
    console.log('\n📦 BODY WRAPPER:');
    const bodyWrapper = document.querySelector('.body_wrapper');
    if (bodyWrapper) {
        console.log('  .body_wrapper found');
        const children = bodyWrapper.children;
        console.log(`  Direct children: ${children.length}`);
        Array.from(children).slice(0, 5).forEach((child, i) => {
            console.log(`    ${i + 1}. ${child.tagName}.${child.className.split(' ')[0]}`);
        });
    } else {
        console.log('  .body_wrapper NOT found');
    }

    // 7. Footer info
    console.log('\n📍 FOOTER INFO:');
    const footer = document.querySelector('#footer, footer, .footer');
    if (footer) {
        const footerText = footer.textContent;
        const phone = footerText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
        const email = footerText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        console.log('  Phone:', phone ? phone[0] : 'Not found');
        console.log('  Email:', email ? email[0] : 'Not found');

        // Social links
        const socialLinks = footer.querySelectorAll('a[href*="facebook"], a[href*="instagram"], a[href*="youtube"]');
        console.log(`  Social links: ${socialLinks.length}`);
        socialLinks.forEach(link => console.log(`    - ${link.href}`));
    }

    // 8. Header structure
    console.log('\n🔝 HEADER STRUCTURE:');
    const header = document.querySelector('#header');
    if (header) {
        console.log('  #header found');
        console.log('  Classes:', header.className);
        const headerImgs = header.querySelectorAll('img');
        console.log(`  Images in header: ${headerImgs.length}`);
        headerImgs.forEach(img => console.log(`    - ${img.src.substring(0, 60)}...`));
    }

    // 9. Text content (headings)
    console.log('\n📝 PAGE HEADINGS:');
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach((h, i) => {
        if (i < 15) {
            const text = h.textContent.trim().substring(0, 60);
            console.log(`  ${h.tagName}: "${text}"`);
        }
    });

    console.log('\n=== Debug Complete ===');
})();
