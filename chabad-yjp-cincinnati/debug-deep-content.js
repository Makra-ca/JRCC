/* ===================================================================
   YJP Cincinnati - Deep Content Debug
   Find where text actually lives in CYP theme
   =================================================================== */

(function() {
    'use strict';

    console.log('\n' + '='.repeat(70));
    console.log('YJP DEEP CONTENT DEBUG');
    console.log('='.repeat(70) + '\n');

    function cleanText(text) {
        return (text || '').replace(/\s+/g, ' ').trim();
    }

    // ===================================================================
    // 2. ABOUT SECTION - Find where text actually is
    // ===================================================================
    console.log('📖 ABOUT SECTION - Deep dive');
    console.log('-'.repeat(50));

    const aboutSection = document.querySelector('.back-about');
    if (aboutSection) {
        console.log('Full HTML structure:');
        console.log(aboutSection.innerHTML.substring(0, 2000));

        // Look for co:item elements
        const coItems = aboutSection.querySelectorAll('co\\:item, [class*="col"]');
        console.log(`\nco:item / col elements: ${coItems.length}`);
        coItems.forEach((item, i) => {
            const text = cleanText(item.textContent);
            if (text.length > 20) {
                console.log(`  Item ${i + 1}: "${text.substring(0, 150)}..."`);
            }
        });

        // Look for any text nodes
        const allText = cleanText(aboutSection.textContent);
        console.log(`\nAll text content (${allText.length} chars):`);
        console.log(`"${allText.substring(0, 300)}..."`);
    }

    // ===================================================================
    // 4. RABBI SECTION - Find where text actually is
    // ===================================================================
    console.log('\n\n👨‍👩‍👧 RABBI SECTION - Deep dive');
    console.log('-'.repeat(50));

    let rabbiContainer = null;
    document.querySelectorAll('h2').forEach(h2 => {
        if (h2.textContent.includes('Gouraries')) {
            // Go up multiple levels to find full section
            rabbiContainer = h2.closest('.back-about') ||
                            h2.closest('[class*="pt-"]') ||
                            h2.parentElement?.parentElement?.parentElement?.parentElement;
        }
    });

    if (rabbiContainer) {
        console.log('Container class:', rabbiContainer.className);

        // Look for co:item elements
        const coItems = rabbiContainer.querySelectorAll('co\\:item, [class*="col"]');
        console.log(`co:item / col elements: ${coItems.length}`);
        coItems.forEach((item, i) => {
            const text = cleanText(item.textContent);
            if (text.length > 20) {
                console.log(`  Item ${i + 1}: "${text.substring(0, 150)}..."`);
            }
        });

        // All text
        const allText = cleanText(rabbiContainer.textContent);
        console.log(`\nAll text content (${allText.length} chars):`);
        console.log(`"${allText.substring(0, 400)}..."`);
    }

    // ===================================================================
    // 5. NETWORK SECTION - Find text
    // ===================================================================
    console.log('\n\n🌐 NETWORK SECTION - Deep dive');
    console.log('-'.repeat(50));

    let networkContainer = null;
    document.querySelectorAll('h2').forEach(h2 => {
        if (h2.textContent.includes('bigger')) {
            networkContainer = h2.closest('.wrapper') || h2.closest('.container')?.parentElement;
        }
    });

    if (networkContainer) {
        console.log('Container class:', networkContainer.className);
        const allText = cleanText(networkContainer.textContent);
        console.log(`All text (${allText.length} chars): "${allText.substring(0, 300)}..."`);

        // Look at direct children
        console.log('\nDirect children:');
        Array.from(networkContainer.children).forEach((child, i) => {
            console.log(`  ${i + 1}. ${child.tagName}.${child.className.split(' ').slice(0,2).join('.')}`);
            const text = cleanText(child.textContent);
            if (text.length > 20) {
                console.log(`     Text: "${text.substring(0, 100)}..."`);
            }
        });
    }

    // ===================================================================
    // 6. STATS SECTION - Find counter elements
    // ===================================================================
    console.log('\n\n📊 STATS SECTION - Deep dive');
    console.log('-'.repeat(50));

    const counterPart = document.querySelector('.counter-part');
    if (counterPart) {
        console.log('HTML structure:');
        console.log(counterPart.innerHTML.substring(0, 1500));

        const allText = cleanText(counterPart.textContent);
        console.log(`\nAll text: "${allText}"`);
    }

    // ===================================================================
    // 8. EVENTS SECTION - Find real events
    // ===================================================================
    console.log('\n\n📅 EVENTS - Find "Upcoming Events" section');
    console.log('-'.repeat(50));

    // Find by H2 text
    let eventsContainer = null;
    document.querySelectorAll('h2').forEach(h2 => {
        if (h2.textContent.includes('Upcoming Events')) {
            eventsContainer = h2.closest('.container')?.parentElement || h2.closest('[class*="service"]');
            console.log('Found "Upcoming Events" H2');
            console.log('Parent container:', eventsContainer?.className);
        }
    });

    if (eventsContainer) {
        // Look for event cards
        const h3s = eventsContainer.querySelectorAll('h3');
        console.log(`H3 elements: ${h3s.length}`);
        h3s.forEach((h3, i) => {
            console.log(`  ${i + 1}. "${cleanText(h3.textContent)}"`);
        });

        // Show HTML structure
        console.log('\nHTML snippet:');
        console.log(eventsContainer.innerHTML.substring(0, 1500));
    }

    // Also check .service-slider directly
    const serviceSlider = document.querySelector('.service-slider');
    if (serviceSlider) {
        console.log('\n.service-slider found!');
        console.log('Class:', serviceSlider.className);
        const items = serviceSlider.querySelectorAll('.slick-slide, .service-item');
        console.log(`Items: ${items.length}`);

        const h3s = serviceSlider.querySelectorAll('h3');
        console.log(`H3s in slider: ${h3s.length}`);
        h3s.forEach((h3, i) => {
            const parent = h3.closest('.service-item') || h3.parentElement;
            const p = parent?.querySelector('p');
            console.log(`  ${i + 1}. "${cleanText(h3.textContent)}"`);
            if (p) console.log(`     P: "${cleanText(p.textContent).substring(0, 80)}"`);
        });
    }

    // ===================================================================
    // 9. TESTIMONIALS - Get actual quotes
    // ===================================================================
    console.log('\n\n💬 TESTIMONIALS - Deep dive');
    console.log('-'.repeat(50));

    const clientSection = document.querySelector('.back-clients');
    if (clientSection) {
        const slider = clientSection.querySelector('.client-slider');
        if (slider) {
            console.log('Slider class:', slider.className);

            // Get all slick-slide items (including clones)
            const slides = slider.querySelectorAll('.slick-slide:not(.slick-cloned)');
            console.log(`Non-cloned slides: ${slides.length}`);

            // Alternative: get direct children
            const directItems = slider.querySelectorAll(':scope > div > div');
            console.log(`Direct nested divs: ${directItems.length}`);

            // Find all unique client items
            const allItems = slider.querySelectorAll('.client-item, [class*="client"]');
            console.log(`Items with "client" class: ${allItems.length}`);
        }

        // Look for paragraphs anywhere
        const allPs = clientSection.querySelectorAll('p');
        console.log(`\nAll paragraphs: ${allPs.length}`);
        allPs.forEach((p, i) => {
            const text = cleanText(p.textContent);
            if (text.length > 30) {
                console.log(`  P${i + 1}: "${text.substring(0, 100)}..."`);
            }
        });

        // Look for names (h4, h5)
        const names = clientSection.querySelectorAll('h4, h5, .name');
        console.log(`\nName elements: ${names.length}`);
        names.forEach((n, i) => {
            console.log(`  ${i + 1}. "${cleanText(n.textContent)}"`);
        });

        // Images
        const imgs = clientSection.querySelectorAll('img');
        console.log(`\nImages: ${imgs.length}`);
        imgs.forEach((img, i) => {
            console.log(`  ${i + 1}. alt="${img.alt}"`);
        });
    }

    // ===================================================================
    // TABS - Get descriptions
    // ===================================================================
    console.log('\n\n📑 TABS - Deep dive for descriptions');
    console.log('-'.repeat(50));

    const tabSection = document.querySelector('.back-tab');
    if (tabSection) {
        const panes = tabSection.querySelectorAll('.single-tab-part');
        panes.forEach((pane, i) => {
            console.log(`\nPane ${i + 1} (#${pane.id}):`);
            console.log('HTML:', pane.innerHTML.substring(0, 800));

            // Look for co:item
            const coItems = pane.querySelectorAll('co\\:item');
            console.log(`co:item elements: ${coItems.length}`);
            coItems.forEach((item, j) => {
                const text = cleanText(item.textContent);
                if (text.length > 10) {
                    console.log(`  co:item ${j + 1}: "${text.substring(0, 100)}..."`);
                }
            });
        });
    }

    console.log('\n' + '='.repeat(70));
    console.log('DEEP DEBUG COMPLETE');
    console.log('='.repeat(70) + '\n');

})();
