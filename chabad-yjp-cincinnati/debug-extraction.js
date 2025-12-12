/* ===================================================================
   YJP Cincinnati - Debug: What's Being Extracted vs What Exists
   ===================================================================

   PURPOSE: Compare what our script extracts vs what's actually on the page
   Run this BEFORE the redesign script to see extraction accuracy

   =================================================================== */

(function() {
    'use strict';

    console.log('\n' + '='.repeat(70));
    console.log('YJP EXTRACTION DEBUG - What exists vs What we extract');
    console.log('='.repeat(70) + '\n');

    function cleanText(text) {
        return (text || '').replace(/\s+/g, ' ').trim();
    }

    // ===================================================================
    // 1. HERO SECTION
    // ===================================================================
    console.log('🖼️ 1. HERO SECTION');
    console.log('-'.repeat(50));

    const heroSlider = document.querySelector('.home-slider-part');
    if (heroSlider) {
        console.log('Container: .home-slider-part ✓');

        // Images
        const desktopImg = heroSlider.querySelector('.slider-img img.desktop');
        const mobileImg = heroSlider.querySelector('.slider-img img.mobile');
        console.log('Desktop image:', desktopImg?.src ? '✓ ' + desktopImg.src.substring(0, 60) + '...' : '✗ NOT FOUND');
        console.log('Mobile image:', mobileImg?.src ? '✓ ' + mobileImg.src.substring(0, 60) + '...' : '✗ NOT FOUND');

        // Text content
        const contentPart = heroSlider.querySelector('.content-part');
        if (contentPart) {
            const h2 = contentPart.querySelector('h2');
            const p = contentPart.querySelector('p');
            const btn = contentPart.querySelector('a.btn, a[class*="button"]');
            console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');
            console.log('P:', p ? `"${cleanText(p.textContent).substring(0, 80)}..."` : '✗ NOT FOUND');
            console.log('Button:', btn ? `"${cleanText(btn.textContent)}" → ${btn.href}` : '✗ NOT FOUND');
        }
    } else {
        console.log('✗ .home-slider-part NOT FOUND');
    }

    // ===================================================================
    // 2. ABOUT SECTION - "YJP Cincinnati"
    // ===================================================================
    console.log('\n📖 2. ABOUT SECTION');
    console.log('-'.repeat(50));

    const aboutSection = document.querySelector('.back-about');
    if (aboutSection) {
        console.log('Container: .back-about ✓');

        const h2 = aboutSection.querySelector('h2');
        console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');

        const paragraphs = aboutSection.querySelectorAll('p');
        console.log(`Paragraphs found: ${paragraphs.length}`);
        paragraphs.forEach((p, i) => {
            const text = cleanText(p.textContent);
            if (text.length > 10) {
                console.log(`  P${i + 1}: "${text.substring(0, 100)}..."`);
            }
        });

        const img = aboutSection.querySelector('img');
        console.log('Image:', img?.src ? `✓ alt="${img.alt}" src=${img.src.substring(0, 50)}...` : '✗ NOT FOUND');

        const btn = aboutSection.querySelector('a.btn, a[class*="button"], .back-btn a');
        console.log('Button:', btn ? `"${cleanText(btn.textContent)}" → ${btn.href}` : '✗ NOT FOUND');
    } else {
        console.log('✗ .back-about NOT FOUND');
    }

    // ===================================================================
    // 3. TABS SECTION - "Join your Community"
    // ===================================================================
    console.log('\n📑 3. TABS SECTION');
    console.log('-'.repeat(50));

    const tabSection = document.querySelector('.back-tab');
    if (tabSection) {
        console.log('Container: .back-tab ✓');

        const h2 = tabSection.querySelector('.back-sec-title h2');
        console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');

        // Tab navigation
        const navItems = tabSection.querySelectorAll('.nav-part li, ul.nav li');
        console.log(`Tab nav items: ${navItems.length}`);
        navItems.forEach((li, i) => {
            console.log(`  Tab ${i + 1}: "${cleanText(li.textContent)}"`);
        });

        // Tab content panes
        const tabPanes = tabSection.querySelectorAll('.single-tab-part, .tab-pane');
        console.log(`Tab panes: ${tabPanes.length}`);
        tabPanes.forEach((pane, i) => {
            const id = pane.id || '(no id)';
            const h3 = pane.querySelector('h3, h4');
            const p = pane.querySelector('p');
            const img = pane.querySelector('img');
            console.log(`  Pane ${i + 1} (#${id}):`);
            console.log(`    H3: ${h3 ? `"${cleanText(h3.textContent)}"` : '(none)'}`);
            console.log(`    P: ${p ? `"${cleanText(p.textContent).substring(0, 60)}..."` : '(none)'}`);
            console.log(`    Img: ${img ? img.alt || img.src.substring(0, 40) : '(none)'}`);
        });

        // Tab icons/images
        const tabIcons = tabSection.querySelectorAll('.tabicons, .nav-part img');
        console.log(`Tab icons: ${tabIcons.length}`);
    } else {
        console.log('✗ .back-tab NOT FOUND');
    }

    // ===================================================================
    // 4. RABBI SECTION - "Meet the Gouraries"
    // ===================================================================
    console.log('\n👨‍👩‍👧 4. RABBI SECTION');
    console.log('-'.repeat(50));

    let rabbiSection = null;
    document.querySelectorAll('.back-sec-title h2').forEach(h2 => {
        if (h2.textContent.includes('Gouraries')) {
            rabbiSection = h2.closest('.back-about') || h2.closest('.container')?.parentElement;
        }
    });

    if (rabbiSection) {
        console.log('Container:', rabbiSection.className || '(no class)');

        const h2 = rabbiSection.querySelector('h2');
        console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');

        const paragraphs = rabbiSection.querySelectorAll('p');
        console.log(`Paragraphs: ${paragraphs.length}`);
        paragraphs.forEach((p, i) => {
            const text = cleanText(p.textContent);
            if (text.length > 20) {
                console.log(`  P${i + 1}: "${text.substring(0, 100)}..."`);
            }
        });

        const img = rabbiSection.querySelector('img');
        console.log('Image:', img?.src ? `✓ alt="${img.alt}" src=${img.src.substring(0, 50)}...` : '✗ NOT FOUND');
    } else {
        console.log('✗ Rabbi section NOT FOUND');
    }

    // ===================================================================
    // 5. NETWORK SECTION - "A big part of something bigger"
    // ===================================================================
    console.log('\n🌐 5. NETWORK SECTION');
    console.log('-'.repeat(50));

    let networkSection = null;
    document.querySelectorAll('.back-sec-title h2').forEach(h2 => {
        if (h2.textContent.includes('bigger')) {
            networkSection = h2.closest('.wrapper') || h2.closest('.container');
        }
    });

    if (networkSection) {
        console.log('Container:', networkSection.className || '(no class)');

        const h2 = networkSection.querySelector('h2');
        console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');

        const p = networkSection.querySelector('p');
        console.log('P:', p ? `"${cleanText(p.textContent)}"` : '✗ NOT FOUND');
    } else {
        console.log('✗ Network section NOT FOUND');
    }

    // ===================================================================
    // 6. STATS/COUNTER SECTION
    // ===================================================================
    console.log('\n📊 6. STATS/COUNTER SECTION');
    console.log('-'.repeat(50));

    const counterPart = document.querySelector('.counter-part');
    if (counterPart) {
        console.log('Container: .counter-part ✓');

        // Try different selectors for counter items
        const colItems = counterPart.querySelectorAll('.col-lg-3, .col-md-3, .col-6, [class*="col"]');
        console.log(`Column items: ${colItems.length}`);

        colItems.forEach((item, i) => {
            const allText = cleanText(item.textContent);
            const counter = item.querySelector('.counter, .count, span');
            const label = item.querySelector('p, h5, h6');
            console.log(`  Item ${i + 1}:`);
            console.log(`    Counter element: ${counter ? counter.tagName + ' "' + cleanText(counter.textContent) + '"' : '(none)'}`);
            console.log(`    Label element: ${label ? label.tagName + ' "' + cleanText(label.textContent) + '"' : '(none)'}`);
            console.log(`    All text: "${allText.substring(0, 50)}"`);
        });
    } else {
        console.log('✗ .counter-part NOT FOUND');
    }

    // ===================================================================
    // 7. PROGRAMS SECTION - "Bring Judaism to the next frontier"
    // ===================================================================
    console.log('\n🎯 7. PROGRAMS SECTION');
    console.log('-'.repeat(50));

    let programsSection = null;
    document.querySelectorAll('.back-sec-title h2').forEach(h2 => {
        if (h2.textContent.includes('frontier')) {
            programsSection = h2.closest('.wrapper') || h2.closest('.container');
        }
    });

    if (programsSection) {
        console.log('Container:', programsSection.className || '(no class)');

        const h2 = programsSection.querySelector('h2');
        console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');

        // Look for program cards/items
        const h3s = programsSection.querySelectorAll('h3');
        console.log(`H3 headings: ${h3s.length}`);
        h3s.forEach((h3, i) => {
            const parent = h3.parentElement;
            const p = parent?.querySelector('p');
            const img = parent?.querySelector('img');
            console.log(`  H3 ${i + 1}: "${cleanText(h3.textContent)}"`);
            console.log(`    P: ${p ? `"${cleanText(p.textContent).substring(0, 60)}..."` : '(none)'}`);
            console.log(`    Img: ${img ? img.alt : '(none)'}`);
        });

        // Check for col-lg-6 items
        const cols = programsSection.querySelectorAll('.col-lg-6, co\\:item');
        console.log(`Column items (.col-lg-6): ${cols.length}`);
    } else {
        console.log('✗ Programs section NOT FOUND');
    }

    // ===================================================================
    // 8. EVENTS SECTION - "Upcoming Events"
    // ===================================================================
    console.log('\n📅 8. EVENTS SECTION');
    console.log('-'.repeat(50));

    const eventSection = document.querySelector('.back-service');
    if (eventSection) {
        console.log('Container: .back-service ✓');

        const h2 = eventSection.querySelector('h2');
        console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');

        // Event items
        const serviceItems = eventSection.querySelectorAll('.service-item, .single-service');
        console.log(`Service items: ${serviceItems.length}`);

        const serviceContents = eventSection.querySelectorAll('.service-content');
        console.log(`Service content divs: ${serviceContents.length}`);
        serviceContents.forEach((content, i) => {
            const h3 = content.querySelector('h3');
            const p = content.querySelector('p');
            console.log(`  Event ${i + 1}:`);
            console.log(`    H3: ${h3 ? `"${cleanText(h3.textContent)}"` : '(none)'}`);
            console.log(`    P: ${p ? `"${cleanText(p.textContent).substring(0, 80)}..."` : '(none)'}`);
        });

        // Images
        const imgs = eventSection.querySelectorAll('img');
        console.log(`Images: ${imgs.length}`);
        imgs.forEach((img, i) => {
            console.log(`  Img ${i + 1}: alt="${img.alt}" ${img.src.substring(0, 50)}...`);
        });
    } else {
        console.log('✗ .back-service NOT FOUND');
    }

    // ===================================================================
    // 9. TESTIMONIALS SECTION - "Hear from the Professionals"
    // ===================================================================
    console.log('\n💬 9. TESTIMONIALS SECTION');
    console.log('-'.repeat(50));

    const clientSection = document.querySelector('.back-clients');
    if (clientSection) {
        console.log('Container: .back-clients ✓');

        const h2 = clientSection.querySelector('h2');
        console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');

        // Client items - try multiple selectors
        const clientItems = clientSection.querySelectorAll('.client-item, .single-client, .slick-slide');
        console.log(`Client items: ${clientItems.length}`);

        // Try to find content in slider
        const slider = clientSection.querySelector('.client-slider, .slick-slider');
        if (slider) {
            console.log('Slider found:', slider.className);
            const slides = slider.querySelectorAll('.slick-slide, > div');
            console.log(`Slides in slider: ${slides.length}`);
        }

        // Look for images with known names
        const imgs = clientSection.querySelectorAll('img');
        console.log(`Images: ${imgs.length}`);
        imgs.forEach((img, i) => {
            console.log(`  Img ${i + 1}: alt="${img.alt}" ${img.src.substring(0, 50)}...`);
        });

        // Look for quotes/text
        const paragraphs = clientSection.querySelectorAll('p');
        console.log(`Paragraphs: ${paragraphs.length}`);
        paragraphs.forEach((p, i) => {
            const text = cleanText(p.textContent);
            if (text.length > 20) {
                console.log(`  P${i + 1}: "${text.substring(0, 80)}..."`);
            }
        });
    } else {
        console.log('✗ .back-clients NOT FOUND');
    }

    // ===================================================================
    // 10. FINAL CTA SECTION - "Let's build our community together"
    // ===================================================================
    console.log('\n🚀 10. FINAL CTA SECTION');
    console.log('-'.repeat(50));

    const ctaSection = document.querySelector('.back-cta');
    if (ctaSection) {
        console.log('Container: .back-cta ✓');

        const h2 = ctaSection.querySelector('h2');
        console.log('H2:', h2 ? `"${cleanText(h2.textContent)}"` : '✗ NOT FOUND');

        const btn = ctaSection.querySelector('a');
        console.log('Button:', btn ? `"${cleanText(btn.textContent)}" → ${btn.href}` : '✗ NOT FOUND');
    } else {
        console.log('✗ .back-cta NOT FOUND');
    }

    // ===================================================================
    // FOOTER DATA
    // ===================================================================
    console.log('\n🦶 FOOTER DATA');
    console.log('-'.repeat(50));

    const phoneEl = document.querySelector('a[href^="tel:"]');
    console.log('Phone:', phoneEl ? `"${cleanText(phoneEl.textContent)}" → ${phoneEl.href}` : '✗ NOT FOUND');

    const socialLinks = [];
    document.querySelectorAll('a[href*="facebook"], a[href*="instagram"]').forEach(link => {
        socialLinks.push(link.href);
    });
    console.log('Social links:', socialLinks.length > 0 ? socialLinks.join(', ') : '✗ NONE FOUND');

    console.log('\n' + '='.repeat(70));
    console.log('EXTRACTION DEBUG COMPLETE');
    console.log('='.repeat(70) + '\n');

})();
