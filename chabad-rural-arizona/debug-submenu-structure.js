/*
   DEBUG SUBMENU STRUCTURE
   Run this BEFORE the shadow DOM script to see how submenus relate to nav items
*/

(function() {
    console.log('🔍 DEBUGGING SUBMENU STRUCTURE\n');

    const parentSpans = document.querySelectorAll('span.parent');

    parentSpans.forEach((span, i) => {
        const link = span.querySelector('a');
        if (!link) return;

        const text = link.textContent.trim();
        if (!text || text.toLowerCase() === 'home' || text.toLowerCase() === 'donate') return;

        console.log(`\n========== ${text} ==========`);

        // Show span.parent's path
        let path = [];
        let el = span;
        for (let j = 0; j < 6 && el; j++) {
            const tag = el.tagName.toLowerCase();
            const cls = el.className ? `.${el.className.split(' ').slice(0,2).join('.')}` : '';
            path.unshift(`${tag}${cls}`);
            el = el.parentElement;
        }
        console.log('Path:', path.join(' > '));

        // Check closest LI
        const li = span.closest('li');
        console.log('Closest LI:', li ? `found (class: ${li.className || 'none'})` : 'NOT FOUND');

        if (li) {
            // Show LI's direct children
            console.log('LI direct children:', Array.from(li.children).map(c => {
                const tag = c.tagName.toLowerCase();
                const cls = c.className ? `.${c.className.split(' ')[0]}` : '';
                return `${tag}${cls}`;
            }).join(', '));

            // Check for data-menu-level="2" within LI
            const level2InLI = li.querySelectorAll('a[data-menu-level="2"]');
            console.log(`data-menu-level="2" links in LI: ${level2InLI.length}`);
            if (level2InLI.length > 0 && level2InLI.length <= 5) {
                console.log('  Items:', Array.from(level2InLI).map(a => a.textContent.trim()).join(', '));
            }
        }

        // Check span's siblings
        const spanParent = span.parentElement;
        if (spanParent) {
            console.log('Span parent tag:', spanParent.tagName, 'class:', spanParent.className || 'none');
            const spanSiblings = Array.from(spanParent.children).filter(c => c !== span);
            console.log('Span siblings:', spanSiblings.length);
            spanSiblings.forEach(sib => {
                const level2 = sib.querySelectorAll('a[data-menu-level="2"]');
                if (level2.length > 0) {
                    console.log(`  Sibling ${sib.tagName}.${sib.className.split(' ')[0] || 'no-class'} has ${level2.length} level-2 links`);
                    if (level2.length <= 5) {
                        console.log('    Items:', Array.from(level2).map(a => a.textContent.trim()).join(', '));
                    }
                }
            });
        }

        // Check 2 levels up for siblings with submenus
        let searchEl = span;
        for (let level = 0; level < 3; level++) {
            if (!searchEl.parentElement) break;
            searchEl = searchEl.parentElement;

            const siblings = Array.from(searchEl.parentElement?.children || []).filter(c => c !== searchEl);
            siblings.forEach(sib => {
                const level2 = sib.querySelectorAll('a[data-menu-level="2"]');
                if (level2.length > 0 && level2.length <= 10) {
                    console.log(`  Level ${level + 1} sibling ${sib.tagName}.${(sib.className || '').split(' ')[0] || 'no-class'} has ${level2.length} level-2 links`);
                    console.log('    Items:', Array.from(level2).map(a => a.textContent.trim()).slice(0, 5).join(', ') + (level2.length > 5 ? '...' : ''));
                }
            });
        }
    });

    // Also show ALL data-menu-level="2" links grouped by their container
    console.log('\n\n========== ALL LEVEL-2 LINKS BY CONTAINER ==========');
    const allLevel2 = document.querySelectorAll('a[data-menu-level="2"]');
    const byContainer = new Map();

    allLevel2.forEach(link => {
        // Find the closest container that might identify which nav item this belongs to
        const container = link.closest('.column_wrapper, .co_column, [class*="submenu"], [class*="dropdown"]') || link.parentElement;
        const containerKey = container ? `${container.tagName}.${(container.className || '').split(' ')[0]}` : 'unknown';

        if (!byContainer.has(container)) {
            byContainer.set(container, []);
        }
        byContainer.get(container).push(link.textContent.trim());
    });

    byContainer.forEach((items, container) => {
        const key = container ? `${container.tagName}.${(container.className || '').split(' ')[0]}` : 'unknown';
        console.log(`\n${key} (${items.length} items):`);
        console.log('  ', items.slice(0, 8).join(', ') + (items.length > 8 ? '...' : ''));
    });

    console.log('\n\n🔍 DEBUG COMPLETE - Check above for submenu structure');
})();
