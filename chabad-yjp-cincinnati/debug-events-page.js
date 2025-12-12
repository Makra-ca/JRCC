/* ===================================================================
   YJP Cincinnati - Debug: Fetch Events Page Structure
   ===================================================================

   Run this to see what the events page HTML looks like
   so we can extract event data from it

   =================================================================== */

(async function() {
    'use strict';

    console.log('Fetching events page...');

    try {
        const response = await fetch('/tools/events/default.htm');
        const html = await response.text();

        // Create a DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        console.log('Events page fetched successfully!');
        console.log('='.repeat(60));

        // Look for event containers
        const possibleSelectors = [
            '.event-item',
            '.event',
            '.single-event',
            '[class*="event"]',
            '.cco_event',
            '.cco_events_list',
            '.events-list',
            'table tr',
            '.row',
            'article'
        ];

        console.log('\n🔍 Searching for event containers...\n');

        possibleSelectors.forEach(sel => {
            const elements = doc.querySelectorAll(sel);
            if (elements.length > 0 && elements.length < 50) {
                console.log(`${sel}: ${elements.length} found`);
            }
        });

        // Look for date-related elements
        console.log('\n📅 Looking for date elements...\n');
        const dateSelectors = [
            '[class*="date"]',
            'time',
            '.when',
            '.event-date',
            '.event-time'
        ];

        dateSelectors.forEach(sel => {
            const elements = doc.querySelectorAll(sel);
            if (elements.length > 0) {
                console.log(`${sel}: ${elements.length} found`);
                elements.forEach((el, i) => {
                    if (i < 3) {
                        console.log(`  ${i + 1}: "${el.textContent.trim().substring(0, 50)}"`);
                    }
                });
            }
        });

        // Look for event titles
        console.log('\n📝 Looking for event titles (h1-h4)...\n');
        const headings = doc.querySelectorAll('h1, h2, h3, h4');
        let eventHeadings = [];
        headings.forEach(h => {
            const text = h.textContent.trim();
            if (text.length > 3 && text.length < 100 && !text.includes('Upcoming Events') && !text.includes('Calendar')) {
                eventHeadings.push({ tag: h.tagName, text: text });
            }
        });
        console.log(`Found ${eventHeadings.length} potential event titles:`);
        eventHeadings.slice(0, 10).forEach((h, i) => {
            console.log(`  ${i + 1}. [${h.tag}] "${h.text}"`);
        });

        // Look for links that might be event detail pages
        console.log('\n🔗 Looking for event links...\n');
        const links = doc.querySelectorAll('a[href*="event"], a[href*="Event"]');
        console.log(`Found ${links.length} event-related links`);
        links.forEach((link, i) => {
            if (i < 10) {
                console.log(`  ${i + 1}. "${link.textContent.trim().substring(0, 40)}" → ${link.href}`);
            }
        });

        // Show body content structure
        console.log('\n📄 Main content structure...\n');
        const mainContent = doc.querySelector('#ContentArea, #content, main, .content, #chabad_main_content');
        if (mainContent) {
            console.log('Main content found:', mainContent.tagName, mainContent.id || mainContent.className);
            console.log('\nFirst 3000 chars of HTML:');
            console.log(mainContent.innerHTML.substring(0, 3000));
        } else {
            console.log('No main content found, showing body:');
            console.log(doc.body.innerHTML.substring(0, 3000));
        }

        // Store for inspection
        window.EVENTS_PAGE_DOC = doc;
        console.log('\n✅ Full document stored in window.EVENTS_PAGE_DOC for inspection');

    } catch (error) {
        console.error('Failed to fetch events page:', error);
    }

})();
