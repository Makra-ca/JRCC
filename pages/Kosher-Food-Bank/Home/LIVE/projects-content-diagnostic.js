// ====================================================================
// PROJECTS PAGE - CONTENT STRUCTURE DIAGNOSTIC
// ====================================================================
// This will help identify where the "Purim Matanot La'evyonim" content is
// ====================================================================

(function() {
    console.clear();
    console.log('%c🔍 PROJECTS PAGE CONTENT DIAGNOSTIC', 'color: #50fa7b; font-size: 24px; font-weight: bold;');
    console.log('%c==========================================', 'color: #50fa7b;');

    // Search for "purim" text anywhere on the page
    console.log('\n%c📄 SEARCHING FOR CONTENT', 'color: #f1fa8c; font-size: 18px; font-weight: bold;');

    const bodyText = document.body.textContent.toLowerCase();
    if (bodyText.includes('purim')) {
        console.log('✅ Found "purim" text on page');
    } else {
        console.log('❌ "purim" text NOT found on page');
    }

    // Find all elements containing "purim" text
    const allElements = document.querySelectorAll('*');
    const elementsWithPurim = [];

    allElements.forEach(el => {
        const text = el.textContent.toLowerCase();
        const ownText = Array.from(el.childNodes)
            .filter(node => node.nodeType === 3) // Text nodes only
            .map(node => node.textContent.trim())
            .join(' ');

        if (text.includes('purim') || text.includes('matanot')) {
            elementsWithPurim.push({
                element: el,
                tag: el.tagName.toLowerCase(),
                id: el.id || '(none)',
                classes: el.className || '(none)',
                ownText: ownText.substring(0, 100)
            });
        }
    });

    console.log('\n%c🎯 ELEMENTS CONTAINING PURIM/MATANOT:', 'color: #f1fa8c; font-size: 18px; font-weight: bold;');
    console.log('Found ' + elementsWithPurim.length + ' elements\n');

    // Show unique containers (avoid duplicates from nested elements)
    const shown = new Set();
    elementsWithPurim.forEach((item, idx) => {
        const signature = item.tag + (item.id !== '(none)' ? '#' + item.id : '') + (item.classes !== '(none)' ? '.' + item.classes.split(' ')[0] : '');

        if (!shown.has(signature) && idx < 15) {
            console.log('--- Element #' + (idx + 1) + ' ---');
            console.log('Tag:', item.tag);
            console.log('ID:', item.id);
            console.log('Classes:', item.classes);
            console.log('Text:', item.element.textContent.trim().substring(0, 150) + '...');
            console.log('Direct text:', item.ownText || '(in child elements)');

            const rect = item.element.getBoundingClientRect();
            const styles = window.getComputedStyle(item.element);
            console.log('Size:', rect.width.toFixed(2) + 'x' + rect.height.toFixed(2) + 'px');
            console.log('Background:', styles.backgroundColor);
            console.log('Display:', styles.display);

            // Highlight it
            item.element.style.outline = '3px solid magenta';
            item.element.style.outlineOffset = '3px';

            shown.add(signature);
            console.log('');
        }
    });

    // Check specific containers
    console.log('\n%c📦 CHECKING SPECIFIC CONTAINERS', 'color: #f1fa8c; font-size: 18px; font-weight: bold;');

    const containersToCheck = [
        '#ContentArea',
        '.chabad_left_column',
        '#chabad_main_content',
        '#co_content_container',
        '.master-content-wrapper',
        'article',
        '.co_body.article-body.cf'
    ];

    containersToCheck.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            const rect = el.getBoundingClientRect();
            const styles = window.getComputedStyle(el);
            const text = el.textContent.trim();

            console.log('\n✅ ' + selector);
            console.log('  Size:', rect.width.toFixed(2) + 'x' + rect.height.toFixed(2) + 'px');
            console.log('  Background:', styles.backgroundColor);
            console.log('  Children count:', el.children.length);
            console.log('  Has text:', text.length > 0 ? 'YES (' + text.length + ' chars)' : 'NO');
            console.log('  Contains "purim":', text.toLowerCase().includes('purim') ? 'YES' : 'NO');

            if (rect.height > 100) {
                el.style.outline = '2px solid lime';
                el.style.outlineOffset = '2px';
            }
        } else {
            console.log('\n❌ ' + selector + ' NOT FOUND');
        }
    });

    // Check for custom_message or sPromo-wrap (like on Kosher Food Bank page)
    console.log('\n%c🎴 CHECKING FOR CARD ELEMENTS', 'color: #f1fa8c; font-size: 18px; font-weight: bold;');

    const cards = document.querySelectorAll('.custom_message, .sPromo-wrap, .card, .promo-card');
    console.log('Found ' + cards.length + ' card-like elements\n');

    cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const styles = window.getComputedStyle(card);

        console.log('--- Card #' + (idx + 1) + ' ---');
        console.log('Classes:', card.className);
        console.log('Size:', rect.width.toFixed(2) + 'x' + rect.height.toFixed(2) + 'px');
        console.log('Background:', styles.backgroundColor);
        console.log('Text preview:', card.textContent.trim().substring(0, 100) + '...');

        card.style.outline = '3px dashed orange';
        card.style.outlineOffset = '3px';
    });

    // Navigation check
    console.log('\n%c🧭 NAVIGATION CHECK', 'color: #f1fa8c; font-size: 18px; font-weight: bold;');

    const nav = document.querySelector('#navigation');
    if (nav) {
        const navStyles = window.getComputedStyle(nav);
        console.log('Navigation background:', navStyles.backgroundColor);
        console.log('Navigation position:', navStyles.position);
        console.log('Navigation border-bottom:', navStyles.borderBottom);

        const links = document.querySelectorAll('#navigation a, #menu a');
        console.log('Navigation links found:', links.length);

        if (links.length > 0) {
            const firstLink = links[0];
            const linkStyles = window.getComputedStyle(firstLink);
            console.log('First link color:', linkStyles.color);
            console.log('First link font:', linkStyles.fontFamily);
        }
    }

    console.log('\n%c🎨 VISUAL KEY', 'color: #ff79c6; font-size: 18px; font-weight: bold;');
    console.log('🟣 MAGENTA = Elements with "purim" text');
    console.log('🟢 LIME = Containers with height > 100px');
    console.log('🟠 ORANGE (dashed) = Card elements');

    console.log('\n%c✅ DIAGNOSTIC COMPLETE', 'color: #50fa7b; font-size: 18px; font-weight: bold;');
    console.log('Check the highlighted elements on the page!');
})();
