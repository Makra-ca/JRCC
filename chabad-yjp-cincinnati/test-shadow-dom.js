/* ===================================================================
   CHABAD YJP CINCINNATI - Homepage Redesign
   Shadow DOM + Dynamic Content Extraction
   ===================================================================

   HOW TO USE:
   1. Open https://www.yjpcincinnati.com/ in your browser
   2. Open DevTools (F12) → Console tab
   3. Paste this entire script and press Enter
   4. See the redesign immediately!

   To revert: Just refresh the page

   ACTUAL SECTIONS ON PAGE (in order):
   1. Hero/Slider - "Meet. Connect. Celebrate. Cincinnati's YJP Hub."
   2. About - "YJP Cincinnati"
   3. Tabs - "Join your Community" (Met@chabad, Encounter, Jewish Experiences)
   4. Rabbi - "Meet the Gouraries!"
   5. Network - "A big part of something bigger."
   6. Counter/Stats - (no heading, .counter-part)
   7. Programs - "Bring Judaism to the next frontier!" + Met@chabad/Encounter cards
   8. Events - "Upcoming Events"
   9. Testimonials - "Hear from the Professionals"
   10. Final CTA - "Let's build our community together"
   =================================================================== */

(function() {
    'use strict';

    // ===================================================================
    // CONFIGURATION
    // ===================================================================

    const COLORS = {
        navyBlue: '#1a2744',
        deepNavy: '#0f1729',
        twilightBlue: '#2d4a6f',
        goldenAmber: '#d4a84b',
        warmGold: '#e8b84a',
        tealAccent: '#4db6ac',
        white: '#ffffff',
        lightGray: '#f5f7fa',
        warmCream: '#faf8f5',
        textDark: '#1a2744',
        textMuted: '#5a6a7a'
    };

    const SITE_CONFIG = {
        name: 'Chabad YJP Cincinnati',
        shortName: 'YJP Cincinnati',
        siteId: '6987082'
    };

    // ===================================================================
    // UTILITIES
    // ===================================================================

    function cleanText(text) {
        return (text || '').replace(/\s+/g, ' ').trim();
    }

    function loadFonts() {
        if (!document.querySelector('link[href*="Urbanist"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap';
            document.head.appendChild(link);
        }
    }

    // ===================================================================
    // DATA EXTRACTION
    // ===================================================================

    function extractAllData() {
        console.log('YJP: Extracting page data...');
        const data = {};

        // 1. HERO
        data.hero = {
            image: null,
            headline: 'Meet. Connect. Celebrate.',
            subheadline: "Cincinnati's YJP Hub."
        };
        const heroImg = document.querySelector('.slider-img img.desktop') || document.querySelector('.slider-img img');
        if (heroImg?.src) data.hero.image = heroImg.src;
        const heroH2 = document.querySelector('.content-part h2');
        if (heroH2) {
            const text = cleanText(heroH2.textContent);
            const parts = text.split(/Cincinnati's/i);
            if (parts.length >= 2) {
                data.hero.headline = parts[0].trim();
                data.hero.subheadline = "Cincinnati's " + parts[1].trim();
            }
        }
        console.log('  Hero:', data.hero.image ? 'image found' : 'no image');

        // 2. ABOUT - "YJP Cincinnati"
        // CYP theme uses .back-desc (div) not p for descriptions
        data.about = { title: 'YJP Cincinnati', subtitle: '', description: '', image: null, buttonText: '', buttonLink: '' };
        const aboutSection = document.querySelector('.back-about');
        if (aboutSection) {
            const h2 = aboutSection.querySelector('h2');
            if (h2) data.about.title = cleanText(h2.textContent);
            const h5 = aboutSection.querySelector('h5.back-subtitle');
            if (h5) data.about.subtitle = cleanText(h5.textContent);
            const desc = aboutSection.querySelector('.back-desc');
            if (desc) data.about.description = cleanText(desc.textContent);
            const img = aboutSection.querySelector('img[alt="About"]') || aboutSection.querySelector('img');
            if (img?.src) data.about.image = img.src;
            const btn = aboutSection.querySelector('.back-btn');
            if (btn) {
                data.about.buttonText = cleanText(btn.textContent);
                data.about.buttonLink = btn.getAttribute('href') || '';
            }
        }
        console.log('  About:', data.about.description.length, 'chars');

        // 3. TABS - "Join your Community"
        // CYP theme uses .tab-title (h4) and .tab-desc (div) not p
        data.tabs = [];
        const tabSection = document.querySelector('.back-tab');
        if (tabSection) {
            const tabPanes = tabSection.querySelectorAll('.single-tab-part');
            tabPanes.forEach(pane => {
                const title = pane.querySelector('.tab-title, h4, h3');
                const desc = pane.querySelector('.tab-desc');
                const img = pane.querySelector('.tab-img img');
                const btn = pane.querySelector('.back-btn');
                if (title) {
                    data.tabs.push({
                        title: cleanText(title.textContent),
                        description: desc ? cleanText(desc.textContent) : '',
                        image: img?.src || null,
                        buttonText: btn ? cleanText(btn.textContent) : '',
                        buttonLink: btn?.getAttribute('href') || ''
                    });
                }
            });
        }
        // Fallback
        if (data.tabs.length === 0) {
            data.tabs = [
                { title: 'Jewish Experiences', description: 'Discover meaningful Jewish experiences with fellow young professionals.' },
                { title: 'Social Events', description: 'Connect at our regular social gatherings and community events.' },
                { title: 'Learning', description: 'Explore Jewish wisdom in a relaxed, engaging environment.' }
            ];
        }
        console.log('  Tabs:', data.tabs.length);

        // 4. RABBI - "Meet the Gouraries!"
        // Text is in col elements, not p tags
        data.rabbi = { title: 'Meet the Gouraries!', subtitle: '', description: '', image: null, buttonText: '', buttonLink: '' };
        const rabbiHeadings = document.querySelectorAll('.back-sec-title h2');
        for (const h2 of rabbiHeadings) {
            if (h2.textContent.includes('Gouraries')) {
                data.rabbi.title = cleanText(h2.textContent);
                const section = h2.closest('.back-about') || h2.closest('.container')?.parentElement;
                if (section) {
                    // Get subtitle (h5)
                    const h5 = section.querySelector('h5.back-subtitle');
                    if (h5) data.rabbi.subtitle = cleanText(h5.textContent);
                    // Get description from .back-desc or full text content
                    const desc = section.querySelector('.back-desc');
                    if (desc) {
                        data.rabbi.description = cleanText(desc.textContent);
                    } else {
                        // Fallback: get text from the text column
                        const textCol = section.querySelector('.col-lg-5, .col-lg-6');
                        if (textCol) {
                            const allText = cleanText(textCol.textContent);
                            // Remove title from text
                            data.rabbi.description = allText.replace(data.rabbi.title, '').replace(data.rabbi.subtitle, '').trim();
                        }
                    }
                    const img = section.querySelector('img[alt*="Meet"]') || section.querySelector('img');
                    if (img?.src && !img.src.includes('tab')) data.rabbi.image = img.src;
                    const btn = section.querySelector('.back-btn');
                    if (btn) {
                        data.rabbi.buttonText = cleanText(btn.textContent);
                        data.rabbi.buttonLink = btn.getAttribute('href') || '';
                    }
                }
                break;
            }
        }
        console.log('  Rabbi:', data.rabbi.image ? 'image found' : 'no image');

        // 5. NETWORK - "A big part of something bigger."
        // Description is in .widget_content, not p
        data.network = { title: 'A big part of something bigger.', description: '' };
        for (const h2 of rabbiHeadings) {
            if (h2.textContent.includes('bigger')) {
                data.network.title = cleanText(h2.textContent);
                const section = h2.closest('.wrapper') || h2.closest('.container');
                if (section) {
                    // Look for description after h2
                    const widgetContent = section.querySelector('.widget_content');
                    if (widgetContent) {
                        // Get text but exclude stats numbers
                        let text = cleanText(widgetContent.textContent);
                        text = text.replace(data.network.title, '').replace(/\d+\s*(Locations|Unique|YP's|every year)/gi, '').trim();
                        // Find the actual description text
                        const allH2s = widgetContent.querySelectorAll('h2');
                        allH2s.forEach(h => {
                            const nextSibling = h.parentElement?.nextElementSibling;
                            if (nextSibling && !nextSibling.classList.contains('counter-part')) {
                                const sibText = cleanText(nextSibling.textContent);
                                if (sibText.length > 10 && !sibText.match(/^\d/)) {
                                    data.network.description = sibText;
                                }
                            }
                        });
                    }
                    // Fallback: look for any text after the title
                    if (!data.network.description) {
                        const secTitle = section.querySelector('.back-sec-title');
                        if (secTitle) {
                            const next = secTitle.nextElementSibling;
                            if (next && next.tagName !== 'DIV') {
                                data.network.description = cleanText(next.textContent);
                            }
                        }
                    }
                }
                break;
            }
        }
        // Hardcode the description since it's static in the theme
        if (!data.network.description) {
            data.network.description = "We're on every continent, and most countries ;)";
        }
        console.log('  Network:', data.network.title);

        // 6. STATS - .counter-part
        // Uses .single-counter with .counter[data-target] and .count-text
        data.stats = [];
        const counterPart = document.querySelector('.counter-part');
        if (counterPart) {
            const items = counterPart.querySelectorAll('.single-counter');
            items.forEach(item => {
                const counter = item.querySelector('.counter');
                const label = item.querySelector('.count-text');
                if (counter) {
                    // Get target value from data attribute (actual number) not displayed 0
                    const target = counter.getAttribute('data-target') || counter.textContent;
                    data.stats.push({
                        number: target,
                        label: label ? cleanText(label.textContent) : ''
                    });
                }
            });
        }
        console.log('  Stats:', data.stats.length);

        // 7. PROGRAMS - "Bring Judaism to the next frontier!"
        data.programs = { title: 'Bring Judaism to the next frontier!', description: '', items: [] };
        for (const h2 of rabbiHeadings) {
            if (h2.textContent.includes('frontier')) {
                data.programs.title = cleanText(h2.textContent);
                const section = h2.closest('.wrapper') || h2.closest('.container');
                if (section) {
                    const mainP = section.querySelector('.back-sec-title p, .back-sec-title + p');
                    if (mainP) data.programs.description = cleanText(mainP.textContent);

                    // Get program cards (Met@chabad, Encounter)
                    const cards = section.querySelectorAll('.back-feature-item, .feature-item, [class*="feature"]');
                    cards.forEach(card => {
                        const h3 = card.querySelector('h3, h4');
                        const p = card.querySelector('p');
                        const img = card.querySelector('img');
                        if (h3) {
                            data.programs.items.push({
                                title: cleanText(h3.textContent).replace(':', ''),
                                description: p ? cleanText(p.textContent) : '',
                                image: img?.src || null
                            });
                        }
                    });
                }
                break;
            }
        }
        // Also check for col-lg-6 items with h3
        if (data.programs.items.length === 0) {
            const programCols = document.querySelectorAll('co\\:item.col-lg-6, .col-lg-6');
            programCols.forEach(col => {
                const h3 = col.querySelector('h3');
                const p = col.querySelector('p');
                if (h3) {
                    const title = cleanText(h3.textContent);
                    if (title.includes('Met@') || title.includes('Encounter')) {
                        data.programs.items.push({
                            title: title.replace(':', ''),
                            description: p ? cleanText(p.textContent) : '',
                            image: null
                        });
                    }
                }
            });
        }
        console.log('  Programs:', data.programs.items.length, 'items');

        // 8. EVENTS - "Upcoming Events"
        // Structure: .single-service > .service-img img + .service-content > h3.service-title + .service-arrow-btn (date)
        data.events = [];
        // Find section by H2 text, not just .back-service (which picks up wrong section)
        let eventSection = null;
        document.querySelectorAll('h2').forEach(h2 => {
            if (h2.textContent.includes('Upcoming Events')) {
                eventSection = h2.closest('.back-service') || h2.closest('.container')?.parentElement;
            }
        });
        if (eventSection) {
            const items = eventSection.querySelectorAll('.single-service');
            items.forEach(item => {
                const h3 = item.querySelector('h3.service-title, h3');
                const dateEl = item.querySelector('.service-arrow-btn');
                const img = item.querySelector('.service-img img');
                const link = item.querySelector('a.service-link');
                if (h3) {
                    data.events.push({
                        title: cleanText(h3.textContent),
                        date: dateEl ? cleanText(dateEl.textContent) : '',
                        image: img?.src || null,
                        link: link?.getAttribute('href') || '/tools/events'
                    });
                }
            });
        }
        if (data.events.length === 0) {
            data.events = [
                { title: 'First Fridays', date: 'Next Friday', image: null, link: '/tools/events' },
                { title: 'CYP Connect', date: 'Next Month', image: null, link: '/tools/events' },
                { title: 'Holiday Celebrations', date: 'Coming Soon', image: null, link: '/tools/events' }
            ];
        }
        console.log('  Events:', data.events.length);

        // 9. TESTIMONIALS - "Hear from the Professionals"
        data.testimonials = [];
        const clientSection = document.querySelector('.back-clients');
        if (clientSection) {
            const items = clientSection.querySelectorAll('.client-item, [class*="client"]');
            items.forEach(item => {
                const p = item.querySelector('p, blockquote');
                const name = item.querySelector('h4, h5, .name');
                const img = item.querySelector('img');
                if (p || name) {
                    data.testimonials.push({
                        quote: p ? cleanText(p.textContent) : '',
                        name: name ? cleanText(name.textContent) : 'Community Member',
                        image: img?.src || null
                    });
                }
            });
        }
        // Check for known testimonial images
        if (data.testimonials.length === 0) {
            const knownNames = ['Sheryl Rosen', 'E.T.', 'Jessica Gold'];
            knownNames.forEach(name => {
                const img = document.querySelector(`img[alt="${name}"]`);
                if (img) {
                    const container = img.closest('div')?.parentElement;
                    const p = container?.querySelector('p');
                    data.testimonials.push({
                        quote: p ? cleanText(p.textContent) : '',
                        name: name,
                        image: img.src
                    });
                }
            });
        }
        console.log('  Testimonials:', data.testimonials.length);

        // 10. FINAL CTA - "Let's build our community together"
        data.finalCTA = { title: "Let's build our community together", buttonText: 'Contact Us', buttonLink: '/tools/feedback.asp' };
        const ctaSection = document.querySelector('.back-cta');
        if (ctaSection) {
            const h2 = ctaSection.querySelector('h2');
            if (h2) data.finalCTA.title = cleanText(h2.textContent);
            const btn = ctaSection.querySelector('a');
            if (btn) {
                data.finalCTA.buttonText = cleanText(btn.textContent) || 'Contact Us';
                data.finalCTA.buttonLink = btn.getAttribute('href') || '/tools/feedback.asp';
            }
        }
        console.log('  Final CTA:', data.finalCTA.title);

        // FOOTER DATA
        data.footer = { phone: null, social: [] };
        const phoneEl = document.querySelector('a[href^="tel:"]');
        if (phoneEl) {
            data.footer.phone = { text: cleanText(phoneEl.textContent), href: phoneEl.href };
        }
        const socialPatterns = [
            { pattern: /facebook\.com/i, icon: 'FB' },
            { pattern: /instagram\.com/i, icon: 'IG' }
        ];
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.href || '';
            for (const s of socialPatterns) {
                if (s.pattern.test(href) && !data.footer.social.find(x => x.icon === s.icon)) {
                    data.footer.social.push({ href, icon: s.icon });
                    break;
                }
            }
        });

        // NAV LINKS
        data.nav = [];
        const seen = new Set();
        const navItems = document.querySelectorAll('.back-main-menu a, #back-header a');
        navItems.forEach(link => {
            const text = cleanText(link.textContent);
            const href = link.getAttribute('href');
            if (text && text.length > 1 && text.length < 20 && !seen.has(text.toLowerCase()) && href && !href.startsWith('tel:') && !href.includes('facebook')) {
                seen.add(text.toLowerCase());
                data.nav.push({ text, href });
            }
        });
        if (data.nav.length === 0) {
            data.nav = [
                { text: 'Events', href: '/tools/events/default.htm' },
                { text: 'About', href: '#about' },
                { text: 'Contact', href: '/tools/feedback.asp' }
            ];
        }

        console.log('YJP: Data extraction complete');
        return data;
    }

    // ===================================================================
    // SHADOW DOM SETUP
    // ===================================================================

    function createShadowContainer() {
        const host = document.createElement('div');
        host.id = 'yjp-shadow-host';
        host.style.cssText = 'position:relative;z-index:1;display:block;width:100%;';
        const shadow = host.attachShadow({ mode: 'open' });

        // Font
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap';
        shadow.appendChild(fontLink);

        // Styles
        const style = document.createElement('style');
        style.textContent = getStyles();
        shadow.appendChild(style);

        return { host, shadow };
    }

    function getStyles() {
        return `
            /* Reset rem base - CYP theme uses 10px */
            :host {
                font-size: 16px !important;
            }
            *, *::before, *::after {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            a { text-decoration: none; color: inherit; }
            img { max-width: 100%; height: auto; }

            .section {
                padding: 80px 24px;
                font-family: 'Urbanist', sans-serif;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
            }
            .section-title {
                font-size: 42px;
                font-weight: 700;
                color: ${COLORS.navyBlue};
                margin-bottom: 16px;
                text-align: center;
            }
            .section-subtitle {
                font-size: 20px;
                color: ${COLORS.textMuted};
                text-align: center;
                margin-bottom: 48px;
                max-width: 700px;
                margin-left: auto;
                margin-right: auto;
                line-height: 1.6;
            }
            .btn {
                display: inline-block;
                padding: 16px 40px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 18px;
                transition: all 0.3s ease;
                cursor: pointer;
                font-family: 'Urbanist', sans-serif;
            }
            .btn-primary {
                background: ${COLORS.warmGold};
                color: ${COLORS.deepNavy};
            }
            .btn-primary:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(212, 168, 75, 0.4);
            }
            .btn-secondary {
                background: ${COLORS.navyBlue};
                color: white;
            }
            .btn-secondary:hover {
                background: ${COLORS.tealAccent};
            }
            .btn-outline {
                background: transparent;
                color: white;
                border: 2px solid white;
            }
            .btn-outline:hover {
                background: rgba(255,255,255,0.15);
            }
            .grid-2 {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 48px;
                align-items: center;
            }
            .grid-3 {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 32px;
            }
            .grid-4 {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 24px;
            }
            .card {
                background: white;
                border-radius: 20px;
                padding: 32px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.08);
                transition: all 0.3s ease;
            }
            .card:hover {
                transform: translateY(-8px);
                box-shadow: 0 16px 48px rgba(0,0,0,0.12);
            }

            @media (max-width: 1024px) {
                .grid-4 { grid-template-columns: repeat(2, 1fr); }
                .grid-3 { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 768px) {
                .section { padding: 48px 16px; }
                .section-title { font-size: 28px; }
                .section-subtitle { font-size: 16px; margin-bottom: 32px; }
                .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; gap: 24px; }
                .btn { padding: 14px 28px; font-size: 15px; }
                .card { padding: 24px; }
            }
            @media (max-width: 480px) {
                .section { padding: 40px 16px; }
                .section-title { font-size: 24px; }
                .section-subtitle { font-size: 15px; }
                .btn { padding: 12px 24px; font-size: 14px; width: 100%; text-align: center; }
            }
            /* Instagram grid responsive */
            @media (max-width: 600px) {
                #instagram-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
            }

            /* Mobile navigation */
            @media (max-width: 768px) {
                #nav-links { display: none !important; }
                #nav-cta { display: none !important; }
                #mobile-menu-btn { display: block !important; }
            }
            @media (max-width: 480px) {
                #logo-text { display: none !important; }
            }
        `;
    }

    // ===================================================================
    // SECTION BUILDERS
    // ===================================================================

    function buildHeader(data) {
        const header = document.createElement('header');

        const nav = document.createElement('nav');
        nav.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0;
            background: rgba(255,255,255,0.97);
            backdrop-filter: blur(12px);
            padding: 12px 20px;
            z-index: 10000;
            box-shadow: 0 2px 24px rgba(0,0,0,0.08);
            font-family: 'Urbanist', sans-serif;
        `;

        const container = document.createElement('div');
        container.style.cssText = 'max-width:1400px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;';

        // Logo
        const logo = document.createElement('a');
        logo.href = '/';
        logo.style.cssText = 'display:flex;align-items:center;gap:12px;';

        const logoCircle = document.createElement('div');
        logoCircle.style.cssText = `width:44px;height:44px;background:${COLORS.tealAccent};border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:14px;`;
        logoCircle.textContent = 'YJP';
        logo.appendChild(logoCircle);

        const logoText = document.createElement('span');
        logoText.id = 'logo-text';
        logoText.textContent = SITE_CONFIG.shortName;
        logoText.style.cssText = `font-size:20px;font-weight:700;color:${COLORS.navyBlue};`;
        logo.appendChild(logoText);
        container.appendChild(logo);

        // Nav links (desktop)
        const navList = document.createElement('ul');
        navList.id = 'nav-links';
        navList.style.cssText = 'display:flex;gap:28px;list-style:none;';
        data.nav.slice(0, 5).forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.style.cssText = `color:${COLORS.navyBlue};font-weight:500;font-size:15px;transition:color 0.3s;`;
            a.onmouseenter = () => a.style.color = COLORS.tealAccent;
            a.onmouseleave = () => a.style.color = COLORS.navyBlue;
            li.appendChild(a);
            navList.appendChild(li);
        });
        container.appendChild(navList);

        // CTA (desktop)
        const cta = document.createElement('a');
        cta.id = 'nav-cta';
        cta.href = '/tools/feedback.asp';
        cta.textContent = 'Contact Us';
        cta.className = 'btn btn-secondary';
        cta.style.cssText += 'padding:10px 20px;font-size:14px;';
        container.appendChild(cta);

        // Hamburger button (mobile)
        const hamburger = document.createElement('button');
        hamburger.id = 'mobile-menu-btn';
        hamburger.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="${COLORS.navyBlue}"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
        hamburger.style.cssText = 'display:none;background:none;border:none;cursor:pointer;padding:8px;';
        container.appendChild(hamburger);

        nav.appendChild(container);
        header.appendChild(nav);

        // Mobile menu dropdown
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.style.cssText = `
            display: none;
            position: fixed;
            top: 68px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            z-index: 9999;
            flex-direction: column;
            gap: 16px;
            font-family: 'Urbanist', sans-serif;
        `;

        // Mobile nav links
        data.nav.slice(0, 5).forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.style.cssText = `color:${COLORS.navyBlue};font-weight:500;font-size:16px;padding:12px 0;border-bottom:1px solid ${COLORS.lightGray};display:block;`;
            mobileMenu.appendChild(a);
        });

        // Mobile CTA
        const mobileCta = document.createElement('a');
        mobileCta.href = '/tools/feedback.asp';
        mobileCta.textContent = 'Contact Us';
        mobileCta.className = 'btn btn-secondary';
        mobileCta.style.cssText = 'text-align:center;padding:14px 24px;font-size:15px;margin-top:8px;';
        mobileMenu.appendChild(mobileCta);

        header.appendChild(mobileMenu);

        // Toggle mobile menu
        hamburger.onclick = () => {
            const isOpen = mobileMenu.style.display === 'flex';
            mobileMenu.style.display = isOpen ? 'none' : 'flex';
            hamburger.innerHTML = isOpen
                ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="${COLORS.navyBlue}"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`
                : `<svg width="24" height="24" viewBox="0 0 24 24" fill="${COLORS.navyBlue}"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
        };

        return header;
    }

    function buildHero(data) {
        const section = document.createElement('section');
        section.style.cssText = `
            min-height: 100vh;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 120px 24px 80px;
            font-family: 'Urbanist', sans-serif;
        `;

        // Background
        const bg = document.createElement('div');
        bg.style.cssText = `
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            ${data.hero.image ? `background-image: url('${data.hero.image}');` : `background: linear-gradient(180deg, ${COLORS.twilightBlue} 0%, ${COLORS.navyBlue} 50%, ${COLORS.deepNavy} 100%);`}
            background-size: cover;
            background-position: center;
            z-index: 0;
        `;
        section.appendChild(bg);

        // Overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(180deg, rgba(15,23,41,0.3) 0%, rgba(15,23,41,0.5) 50%, rgba(15,23,41,0.75) 100%);
            z-index: 1;
        `;
        section.appendChild(overlay);

        // Content
        const content = document.createElement('div');
        content.style.cssText = 'position:relative;z-index:2;max-width:900px;';

        const tagline = document.createElement('p');
        tagline.textContent = 'YOUR COMMUNITY';
        tagline.style.cssText = `font-size:14px;color:${COLORS.goldenAmber};margin-bottom:24px;font-weight:600;letter-spacing:4px;text-transform:uppercase;`;
        content.appendChild(tagline);

        const h1 = document.createElement('h1');
        h1.innerHTML = `<em style="font-style:italic;font-weight:500;">${data.hero.headline}</em><br>${data.hero.subheadline}`;
        h1.style.cssText = `font-size:clamp(40px, 8vw, 72px);font-weight:700;color:white;text-shadow:0 4px 40px rgba(0,0,0,0.3);margin-bottom:32px;line-height:1.15;`;
        content.appendChild(h1);

        const subtitle = document.createElement('p');
        subtitle.textContent = 'Good food, good people, good vibes — Jewish style.';
        subtitle.style.cssText = `font-size:clamp(16px, 4vw, 22px);color:${COLORS.warmCream};margin-bottom:48px;font-weight:300;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.5;`;
        content.appendChild(subtitle);

        const buttons = document.createElement('div');
        buttons.style.cssText = 'display:flex;gap:24px;justify-content:center;flex-wrap:wrap;';

        const btn1 = document.createElement('a');
        btn1.href = '/tools/events/default.htm';
        btn1.textContent = 'Upcoming Events';
        btn1.className = 'btn btn-primary';
        buttons.appendChild(btn1);

        const btn2 = document.createElement('a');
        btn2.href = '/tools/feedback.asp';
        btn2.textContent = 'Get in Touch';
        btn2.className = 'btn btn-outline';
        buttons.appendChild(btn2);

        content.appendChild(buttons);
        section.appendChild(content);

        return section;
    }

    function buildAbout(data) {
        const section = document.createElement('section');
        section.className = 'section';
        section.id = 'about';
        section.style.background = COLORS.lightGray;

        const container = document.createElement('div');
        container.className = 'container grid-2';

        // Image
        if (data.about.image) {
            const imgWrap = document.createElement('div');
            const img = document.createElement('img');
            img.src = data.about.image;
            img.alt = 'About YJP Cincinnati';
            img.style.cssText = 'border-radius:24px;box-shadow:0 24px 64px rgba(0,0,0,0.15);';
            imgWrap.appendChild(img);
            container.appendChild(imgWrap);
        }

        // Text
        const textWrap = document.createElement('div');

        // Subtitle (small text above title)
        if (data.about.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.textContent = data.about.subtitle;
            subtitle.style.cssText = `font-size:14px;color:${COLORS.tealAccent};font-weight:600;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;`;
            textWrap.appendChild(subtitle);
        }

        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.style.textAlign = 'left';
        h2.textContent = data.about.title;
        textWrap.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = data.about.description || 'Young Jewish Professionals (YJP) is a community for Jews in their 20s and 30s to connect, learn, and celebrate together. Whether you\'re new to Cincinnati or have been here your whole life, YJP is your home for meaningful Jewish experiences.';
        p.style.cssText = `font-size:clamp(15px, 3.5vw, 18px);color:${COLORS.textMuted};line-height:1.8;margin-bottom:32px;`;
        textWrap.appendChild(p);

        const btn = document.createElement('a');
        btn.href = data.about.buttonLink || '/tools/feedback';
        btn.textContent = data.about.buttonText || 'Find Out More';
        btn.className = 'btn btn-secondary';
        textWrap.appendChild(btn);

        container.appendChild(textWrap);
        section.appendChild(container);

        return section;
    }

    function buildTabs(data) {
        const section = document.createElement('section');
        section.className = 'section';
        section.style.background = 'white';

        const container = document.createElement('div');
        container.className = 'container';

        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = 'Join your Community';
        container.appendChild(h2);

        const subtitle = document.createElement('p');
        subtitle.className = 'section-subtitle';
        subtitle.textContent = 'Discover meaningful ways to connect with fellow young Jewish professionals';
        container.appendChild(subtitle);

        const grid = document.createElement('div');
        grid.className = 'grid-3';

        data.tabs.slice(0, 3).forEach((tab, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cssText = 'overflow:hidden;padding:0;';

            // Tab image if available
            if (tab.image) {
                const imgWrap = document.createElement('div');
                imgWrap.style.cssText = 'height:180px;overflow:hidden;';
                const img = document.createElement('img');
                img.src = tab.image;
                img.alt = tab.title;
                img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
                imgWrap.appendChild(img);
                card.appendChild(imgWrap);
            }

            const content = document.createElement('div');
            content.style.cssText = 'padding:24px;text-align:center;';

            const h3 = document.createElement('h3');
            h3.textContent = tab.title;
            h3.style.cssText = `font-size:clamp(18px, 4vw, 22px);color:${COLORS.navyBlue};margin-bottom:12px;font-weight:700;`;
            content.appendChild(h3);

            if (tab.description) {
                const p = document.createElement('p');
                p.textContent = tab.description;
                p.style.cssText = `color:${COLORS.textMuted};line-height:1.7;font-size:15px;margin-bottom:16px;`;
                content.appendChild(p);
            }

            // Button if available
            if (tab.buttonText) {
                const btn = document.createElement('a');
                btn.href = tab.buttonLink || '/tools/feedback';
                btn.textContent = tab.buttonText;
                btn.style.cssText = `display:inline-block;color:${COLORS.tealAccent};font-weight:600;font-size:14px;`;
                content.appendChild(btn);
            }

            card.appendChild(content);
            grid.appendChild(card);
        });

        container.appendChild(grid);
        section.appendChild(container);

        return section;
    }

    function buildRabbi(data) {
        const section = document.createElement('section');
        section.className = 'section';
        section.style.background = COLORS.lightGray;

        const container = document.createElement('div');
        container.className = 'container grid-2';

        // Text first
        const textWrap = document.createElement('div');

        // Subtitle
        if (data.rabbi.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.textContent = data.rabbi.subtitle;
            subtitle.style.cssText = `font-size:14px;color:${COLORS.tealAccent};font-weight:600;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;`;
            textWrap.appendChild(subtitle);
        }

        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.style.textAlign = 'left';
        h2.textContent = data.rabbi.title;
        textWrap.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = data.rabbi.description || 'Rabbi and Mrs. Gourarie are dedicated to creating a warm, welcoming environment for young Jewish professionals in Cincinnati. Their home is always open for Shabbat dinners, holiday celebrations, and meaningful conversations.';
        p.style.cssText = `font-size:clamp(15px, 3.5vw, 18px);color:${COLORS.textMuted};line-height:1.8;margin-bottom:32px;`;
        textWrap.appendChild(p);

        // Button
        if (data.rabbi.buttonText) {
            const btn = document.createElement('a');
            btn.href = data.rabbi.buttonLink || '/tools/feedback';
            btn.textContent = data.rabbi.buttonText;
            btn.className = 'btn btn-secondary';
            textWrap.appendChild(btn);
        }

        container.appendChild(textWrap);

        // Image
        if (data.rabbi.image) {
            const imgWrap = document.createElement('div');
            const img = document.createElement('img');
            img.src = data.rabbi.image;
            img.alt = 'Meet the Gouraries';
            img.style.cssText = 'border-radius:24px;box-shadow:0 24px 64px rgba(0,0,0,0.15);';
            imgWrap.appendChild(img);
            container.appendChild(imgWrap);
        }

        section.appendChild(container);
        return section;
    }

    function buildNetwork(data) {
        const section = document.createElement('section');
        section.className = 'section';
        section.style.cssText = `background:${COLORS.navyBlue};color:white;text-align:center;`;

        const container = document.createElement('div');
        container.className = 'container';

        const h2 = document.createElement('h2');
        h2.textContent = data.network.title;
        h2.style.cssText = 'font-size:clamp(28px, 6vw, 42px);font-weight:700;color:white;margin-bottom:16px;';
        container.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = data.network.description || 'YJP Cincinnati is part of the global Chabad Young Professionals network, connecting thousands of young Jews worldwide.';
        p.style.cssText = 'font-size:clamp(16px, 4vw, 20px);opacity:0.9;max-width:700px;margin:0 auto 32px;line-height:1.7;';
        container.appendChild(p);

        // Stats
        if (data.stats.length > 0) {
            const statsGrid = document.createElement('div');
            statsGrid.className = 'grid-4';
            statsGrid.style.marginTop = '48px';

            data.stats.forEach(stat => {
                const statItem = document.createElement('div');

                const num = document.createElement('div');
                num.textContent = stat.number;
                num.style.cssText = `font-size:clamp(32px, 8vw, 48px);font-weight:800;color:${COLORS.warmGold};margin-bottom:8px;`;
                statItem.appendChild(num);

                const label = document.createElement('p');
                label.textContent = stat.label;
                label.style.cssText = 'font-size:16px;opacity:0.8;';
                statItem.appendChild(label);

                statsGrid.appendChild(statItem);
            });

            container.appendChild(statsGrid);
        }

        const btn = document.createElement('a');
        btn.href = 'https://chabadyp.com';
        btn.target = '_blank';
        btn.textContent = 'Explore CYP Network';
        btn.className = 'btn';
        btn.style.cssText = `background:${COLORS.tealAccent};color:white;margin-top:32px;`;
        container.appendChild(btn);

        section.appendChild(container);
        return section;
    }

    function buildPrograms(data) {
        if (data.programs.items.length === 0) return null;

        const section = document.createElement('section');
        section.className = 'section';
        section.style.background = 'white';

        const container = document.createElement('div');
        container.className = 'container';

        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = data.programs.title;
        container.appendChild(h2);

        if (data.programs.description) {
            const subtitle = document.createElement('p');
            subtitle.className = 'section-subtitle';
            subtitle.textContent = data.programs.description;
            container.appendChild(subtitle);
        }

        const grid = document.createElement('div');
        grid.className = 'grid-2';

        data.programs.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.textAlign = 'center';

            const h3 = document.createElement('h3');
            h3.textContent = item.title;
            h3.style.cssText = `font-size:clamp(22px, 5vw, 28px);color:${COLORS.navyBlue};margin-bottom:16px;font-weight:700;`;
            card.appendChild(h3);

            const p = document.createElement('p');
            p.textContent = item.description;
            p.style.cssText = `color:${COLORS.textMuted};line-height:1.7;font-size:16px;`;
            card.appendChild(p);

            grid.appendChild(card);
        });

        container.appendChild(grid);
        section.appendChild(container);

        return section;
    }

    function buildEvents(data) {
        const section = document.createElement('section');
        section.className = 'section';
        section.style.background = COLORS.lightGray;

        const container = document.createElement('div');
        container.className = 'container';

        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = 'Upcoming Events';
        container.appendChild(h2);

        const subtitle = document.createElement('p');
        subtitle.className = 'section-subtitle';
        subtitle.textContent = 'Join us for food, friends, and meaningful connections';
        container.appendChild(subtitle);

        const grid = document.createElement('div');
        grid.className = 'grid-3';

        data.events.slice(0, 3).forEach(event => {
            const card = document.createElement('a');
            card.href = event.link || '/tools/events';
            card.className = 'card';
            card.style.cssText = 'display:block;text-decoration:none;overflow:hidden;padding:0;';

            // Event image
            if (event.image) {
                const imgWrap = document.createElement('div');
                imgWrap.style.cssText = 'height:180px;overflow:hidden;';
                const img = document.createElement('img');
                img.src = event.image;
                img.alt = event.title;
                img.style.cssText = 'width:100%;height:100%;object-fit:cover;transition:transform 0.3s;';
                imgWrap.appendChild(img);
                card.appendChild(imgWrap);
            }

            const content = document.createElement('div');
            content.style.cssText = 'padding:24px;';

            // Date tag
            if (event.date) {
                const tag = document.createElement('span');
                tag.textContent = event.date;
                tag.style.cssText = `display:inline-block;background:${COLORS.tealAccent};color:white;font-size:12px;font-weight:600;padding:4px 12px;border-radius:20px;margin-bottom:12px;`;
                content.appendChild(tag);
            }

            const h3 = document.createElement('h3');
            h3.textContent = event.title;
            h3.style.cssText = `font-size:22px;color:${COLORS.navyBlue};margin-bottom:8px;font-weight:700;`;
            content.appendChild(h3);

            card.appendChild(content);
            grid.appendChild(card);
        });

        container.appendChild(grid);

        const btnWrap = document.createElement('div');
        btnWrap.style.cssText = 'text-align:center;margin-top:40px;';
        const btn = document.createElement('a');
        btn.href = '/tools/events/default.htm';
        btn.textContent = 'View All Events';
        btn.className = 'btn btn-secondary';
        btnWrap.appendChild(btn);
        container.appendChild(btnWrap);

        section.appendChild(container);
        return section;
    }

    function buildTestimonials(data) {
        if (data.testimonials.length === 0) return null;

        const section = document.createElement('section');
        section.className = 'section';
        section.style.background = 'white';

        const container = document.createElement('div');
        container.className = 'container';

        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = 'Hear from the Professionals';
        container.appendChild(h2);

        const grid = document.createElement('div');
        grid.className = 'grid-3';
        grid.style.marginTop = '32px';

        data.testimonials.slice(0, 3).forEach(t => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.textAlign = 'center';

            // Avatar
            const avatar = document.createElement('div');
            if (t.image) {
                avatar.style.cssText = `width:80px;height:80px;border-radius:50%;margin:0 auto 24px;background-image:url('${t.image}');background-size:cover;background-position:center;`;
            } else {
                avatar.style.cssText = `width:80px;height:80px;border-radius:50%;margin:0 auto 24px;background:${COLORS.navyBlue};display:flex;align-items:center;justify-content:center;color:white;font-size:32px;font-weight:700;`;
                avatar.textContent = t.name.charAt(0);
            }
            card.appendChild(avatar);

            if (t.quote) {
                const quote = document.createElement('p');
                quote.textContent = `"${t.quote}"`;
                quote.style.cssText = `color:${COLORS.textMuted};font-style:italic;line-height:1.7;margin-bottom:16px;font-size:15px;`;
                card.appendChild(quote);
            }

            const name = document.createElement('p');
            name.textContent = t.name;
            name.style.cssText = `color:${COLORS.navyBlue};font-weight:600;font-size:16px;`;
            card.appendChild(name);

            grid.appendChild(card);
        });

        container.appendChild(grid);
        section.appendChild(container);

        return section;
    }

    async function fetchEvents() {
        // Fetch actual events from the events page
        try {
            const response = await fetch('/tools/events/default.htm');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const events = [];
            const eventEls = doc.querySelectorAll('.event');

            eventEls.forEach(el => {
                const titleEl = el.querySelector('h2 a');
                const descEl = el.querySelector('.bottom_padding');
                const dateEl = el.querySelector('.performance__date');
                const linkEl = el.querySelector('h2 a');

                if (titleEl) {
                    events.push({
                        title: titleEl.textContent.trim(),
                        description: descEl ? descEl.textContent.trim() : '',
                        date: dateEl ? dateEl.textContent.trim() : '',
                        link: linkEl ? linkEl.getAttribute('href') : '/tools/events/default.htm'
                    });
                }
            });

            console.log('YJP: Fetched', events.length, 'events from events page');
            return events;
        } catch (error) {
            console.error('YJP: Failed to fetch events:', error);
            return [];
        }
    }

    function buildEventsSection(events) {
        const section = document.createElement('section');
        section.className = 'section';
        section.style.background = COLORS.lightGray;

        const container = document.createElement('div');
        container.className = 'container';

        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = 'Upcoming Events';
        container.appendChild(h2);

        const subtitle = document.createElement('p');
        subtitle.className = 'section-subtitle';
        subtitle.textContent = 'Join us for food, friends, and meaningful connections';
        container.appendChild(subtitle);

        if (events.length === 0) {
            const noEvents = document.createElement('p');
            noEvents.textContent = 'No upcoming events at this time. Check back soon!';
            noEvents.style.cssText = `text-align:center;color:${COLORS.textMuted};font-size:18px;`;
            container.appendChild(noEvents);
        } else {
            const grid = document.createElement('div');
            grid.className = 'grid-2';
            grid.style.gap = '24px';

            events.slice(0, 4).forEach(event => {
                const card = document.createElement('a');
                card.href = event.link;
                card.className = 'card';
                card.style.cssText = 'display:block;text-decoration:none;padding:32px;';

                // Date badge
                if (event.date) {
                    const dateBadge = document.createElement('span');
                    dateBadge.textContent = event.date;
                    dateBadge.style.cssText = `display:inline-block;background:${COLORS.tealAccent};color:white;font-size:13px;font-weight:600;padding:6px 14px;border-radius:20px;margin-bottom:16px;`;
                    card.appendChild(dateBadge);
                }

                const title = document.createElement('h3');
                title.textContent = event.title;
                title.style.cssText = `font-size:clamp(18px, 4.5vw, 24px);color:${COLORS.navyBlue};margin-bottom:12px;font-weight:700;`;
                card.appendChild(title);

                if (event.description) {
                    const desc = document.createElement('p');
                    desc.textContent = event.description.length > 150 ? event.description.substring(0, 150) + '...' : event.description;
                    desc.style.cssText = `color:${COLORS.textMuted};line-height:1.6;font-size:15px;margin-bottom:16px;`;
                    card.appendChild(desc);
                }

                const registerBtn = document.createElement('span');
                registerBtn.textContent = 'Register →';
                registerBtn.style.cssText = `color:${COLORS.tealAccent};font-weight:600;font-size:15px;`;
                card.appendChild(registerBtn);

                grid.appendChild(card);
            });

            container.appendChild(grid);
        }

        // View all events button
        const btnWrap = document.createElement('div');
        btnWrap.style.cssText = 'text-align:center;margin-top:40px;';
        const btn = document.createElement('a');
        btn.href = '/tools/events/default.htm';
        btn.textContent = 'View All Events';
        btn.className = 'btn btn-secondary';
        btnWrap.appendChild(btn);
        container.appendChild(btnWrap);

        section.appendChild(container);
        return section;
    }

    async function fetchInstagramPosts() {
        // Fetch Instagram posts from Behold JSON feed
        const BEHOLD_FEED_URL = 'https://feeds.behold.so/mzmKL8mNkQiVvVAuo9hY';

        try {
            const response = await fetch(BEHOLD_FEED_URL);
            const data = await response.json();

            const posts = data.posts.slice(0, 6).map(post => ({
                id: post.id,
                image: post.sizes?.medium?.mediaUrl || post.mediaUrl,
                link: post.permalink,
                caption: post.prunedCaption || post.caption || '',
                type: post.mediaType
            }));

            console.log('YJP: Fetched', posts.length, 'Instagram posts from Behold');
            return posts;
        } catch (error) {
            console.error('YJP: Failed to fetch Instagram posts:', error);
            return [];
        }
    }

    function buildSocialSection(instagramPosts = []) {
        // Instagram section - returns a placeholder in Shadow DOM
        // Actual embeds are injected into main document (see injectInstagramEmbeds)
        const INSTAGRAM_POSTS = instagramPosts;

        const section = document.createElement('section');
        section.className = 'section';
        section.style.cssText = `background:white;text-align:center;padding:80px 24px;`;

        const container = document.createElement('div');
        container.className = 'container';

        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = 'Follow Us on Instagram';
        container.appendChild(h2);

        const subtitle = document.createElement('p');
        subtitle.className = 'section-subtitle';
        subtitle.innerHTML = `<a href="https://instagram.com/yjp_cincinnati" target="_blank" style="color:${COLORS.tealAccent};text-decoration:none;font-weight:600;">@yjp_cincinnati</a>`;
        container.appendChild(subtitle);

        // Placeholder for Instagram embeds - actual embeds go in main DOM
        const feedContainer = document.createElement('div');
        feedContainer.id = 'yjp-instagram-placeholder';
        feedContainer.style.cssText = 'margin:40px 0;min-height:400px;';

        // Show loading state
        feedContainer.innerHTML = `<p style="color:${COLORS.textMuted};">Loading Instagram posts...</p>`;
        container.appendChild(feedContainer);

        // Follow button
        const igBtn = document.createElement('a');
        igBtn.href = 'https://instagram.com/yjp_cincinnati';
        igBtn.target = '_blank';
        igBtn.innerHTML = `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:8px;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>Follow @yjp_cincinnati`;
        igBtn.className = 'btn btn-secondary';
        container.appendChild(igBtn);

        section.appendChild(container);

        // Store posts for later injection into main DOM
        section._instagramPosts = INSTAGRAM_POSTS;

        return section;
    }

    function injectInstagramEmbeds(instagramPosts, shadowHost) {
        // Display Instagram posts using Behold images (no embed issues)

        const placeholder = shadowHost.shadowRoot.querySelector('#yjp-instagram-placeholder');
        if (!placeholder) return;

        if (!instagramPosts || instagramPosts.length === 0) {
            placeholder.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:600px;margin:0 auto;">
                    ${[1,2,3].map(() => `
                        <a href="https://instagram.com/yjp_cincinnati" target="_blank" style="display:flex;aspect-ratio:1;background:linear-gradient(45deg, ${COLORS.lightGray}, #e8e8e8);border-radius:12px;align-items:center;justify-content:center;transition:transform 0.3s;text-decoration:none;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                            <svg width="48" height="48" fill="${COLORS.textMuted}" viewBox="0 0 24 24" opacity="0.4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                    `).join('')}
                </div>
                <p style="color:${COLORS.textMuted};font-size:14px;margin-top:20px;">Visit our Instagram to see the latest posts</p>
            `;
            return;
        }

        // Build grid with actual post images from Behold
        const grid = document.createElement('div');
        grid.id = 'instagram-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            max-width: 900px;
            margin: 0 auto;
        `;

        instagramPosts.forEach(post => {
            const card = document.createElement('a');
            card.href = post.link;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.style.cssText = `
                display: block;
                position: relative;
                border-radius: 12px;
                overflow: hidden;
                aspect-ratio: 1;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            `;
            card.onmouseenter = function() {
                this.style.transform = 'scale(1.03)';
                this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            };
            card.onmouseleave = function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            };

            const img = document.createElement('img');
            img.src = post.image;
            img.alt = post.caption.substring(0, 50) || 'Instagram post';
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            `;
            card.appendChild(img);

            // Overlay on hover
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0.4);
                opacity: 0;
                transition: opacity 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            overlay.innerHTML = `<svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
            card.appendChild(overlay);

            card.onmouseenter = function() {
                this.style.transform = 'scale(1.03)';
                this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                overlay.style.opacity = '1';
            };
            card.onmouseleave = function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                overlay.style.opacity = '0';
            };

            grid.appendChild(card);
        });

        placeholder.innerHTML = '';
        placeholder.style.minHeight = 'auto';
        placeholder.appendChild(grid);
    }

    function buildFinalCTA(data) {
        const section = document.createElement('section');
        section.className = 'section';
        section.style.cssText = `background:linear-gradient(135deg, ${COLORS.goldenAmber} 0%, ${COLORS.warmGold} 100%);text-align:center;padding:80px 24px;`;

        const container = document.createElement('div');
        container.className = 'container';

        const h2 = document.createElement('h2');
        h2.textContent = data.finalCTA.title;
        h2.style.cssText = `font-size:clamp(24px, 5vw, 36px);font-weight:700;color:${COLORS.deepNavy};margin-bottom:32px;`;
        container.appendChild(h2);

        const btn = document.createElement('a');
        btn.href = data.finalCTA.buttonLink;
        btn.textContent = data.finalCTA.buttonText;
        btn.className = 'btn';
        btn.style.cssText = `background:${COLORS.deepNavy};color:white;`;
        container.appendChild(btn);

        section.appendChild(container);
        return section;
    }

    function buildFooter(data) {
        const footer = document.createElement('footer');
        footer.style.cssText = `background:${COLORS.deepNavy};color:${COLORS.warmCream};padding:64px 24px 32px;font-family:'Urbanist',sans-serif;`;

        const container = document.createElement('div');
        container.style.cssText = 'max-width:1200px;margin:0 auto;';

        const main = document.createElement('div');
        main.style.cssText = 'display:grid;grid-template-columns:2fr 1fr 1fr;gap:48px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:32px;';

        // Brand
        const brand = document.createElement('div');
        const brandTitle = document.createElement('h3');
        brandTitle.textContent = SITE_CONFIG.name;
        brandTitle.style.cssText = 'font-size:clamp(20px, 4vw, 24px);font-weight:700;margin-bottom:8px;color:white;';
        brand.appendChild(brandTitle);

        const tagline = document.createElement('p');
        tagline.textContent = 'Good food, good people, good vibes — Jewish style.';
        tagline.style.cssText = 'opacity:0.7;font-size:16px;margin-bottom:24px;';
        brand.appendChild(tagline);

        // Social
        const social = document.createElement('div');
        social.style.cssText = 'display:flex;gap:16px;';
        const icons = {
            FB: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
            IG: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'
        };
        // Hardcoded social links per customer
        const socialLinks = [
            { icon: 'IG', href: 'https://instagram.com/yjp_cincinnati' }
        ];
        // Add any extracted FB link
        const fbLink = data.footer.social.find(s => s.icon === 'FB');
        if (fbLink) socialLinks.unshift(fbLink);

        socialLinks.forEach(s => {
            const a = document.createElement('a');
            a.href = s.href;
            a.target = '_blank';
            a.innerHTML = icons[s.icon] || s.icon;
            a.style.cssText = `display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:rgba(255,255,255,0.1);border-radius:50%;color:${COLORS.warmCream};transition:all 0.3s;`;
            a.onmouseenter = () => { a.style.background = COLORS.tealAccent; };
            a.onmouseleave = () => { a.style.background = 'rgba(255,255,255,0.1)'; };
            social.appendChild(a);
        });
        brand.appendChild(social);
        main.appendChild(brand);

        // Contact
        const contact = document.createElement('div');
        const contactTitle = document.createElement('h4');
        contactTitle.textContent = 'Contact';
        contactTitle.style.cssText = `font-size:18px;margin-bottom:16px;color:${COLORS.goldenAmber};`;
        contact.appendChild(contactTitle);

        if (data.footer.phone) {
            const p = document.createElement('p');
            p.style.cssText = 'margin-bottom:8px;opacity:0.8;';
            const a = document.createElement('a');
            a.href = data.footer.phone.href;
            a.textContent = data.footer.phone.text;
            a.style.cssText = `color:${COLORS.warmCream};`;
            p.appendChild(a);
            contact.appendChild(p);
        }
        const emailP = document.createElement('p');
        emailP.style.cssText = 'opacity:0.8;';
        const emailA = document.createElement('a');
        emailA.href = '/tools/feedback.asp';
        emailA.textContent = 'Contact Us';
        emailA.style.cssText = `color:${COLORS.warmCream};`;
        emailP.appendChild(emailA);
        contact.appendChild(emailP);
        main.appendChild(contact);

        // Quick Links
        const links = document.createElement('div');
        const linksTitle = document.createElement('h4');
        linksTitle.textContent = 'Quick Links';
        linksTitle.style.cssText = `font-size:18px;margin-bottom:16px;color:${COLORS.goldenAmber};`;
        links.appendChild(linksTitle);

        [{ text: 'Events', href: '/tools/events/default.htm' }, { text: 'About', href: '#about' }, { text: 'Contact', href: '/tools/feedback.asp' }].forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.style.cssText = `display:block;color:${COLORS.warmCream};opacity:0.8;margin-bottom:8px;transition:all 0.3s;font-size:15px;`;
            a.onmouseenter = () => { a.style.opacity = '1'; a.style.color = COLORS.tealAccent; };
            a.onmouseleave = () => { a.style.opacity = '0.8'; a.style.color = COLORS.warmCream; };
            links.appendChild(a);
        });
        main.appendChild(links);

        container.appendChild(main);

        // Bottom
        const bottom = document.createElement('div');
        bottom.style.cssText = 'text-align:center;';
        const copy = document.createElement('p');
        copy.textContent = `© ${new Date().getFullYear()} ${SITE_CONFIG.name}. All rights reserved.`;
        copy.style.cssText = 'font-size:14px;opacity:0.6;';
        bottom.appendChild(copy);
        container.appendChild(bottom);

        footer.appendChild(container);
        return footer;
    }

    // ===================================================================
    // HIDE CMS
    // ===================================================================

    function hideCMS() {
        const style = document.createElement('style');
        style.id = 'yjp-hide-cms';
        style.textContent = `
            #chabad_body_page,
            #BodyContainer,
            #chabad_main_content > *:not(#yjp-shadow-host) {
                display: none !important;
            }
            body.cco_body {
                padding: 0 !important;
                margin: 0 !important;
                background: ${COLORS.lightGray} !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===================================================================
    // INIT
    // ===================================================================

    async function init() {
        console.log('YJP Cincinnati: Starting redesign...');
        loadFonts();

        // Extract data BEFORE hiding CMS
        const data = extractAllData();

        // Create shadow container
        const { host, shadow } = createShadowContainer();
        document.body.insertBefore(host, document.body.firstChild);

        // Hide CMS
        hideCMS();

        // Build sections - SIMPLIFIED per customer request
        // Hero, About, Events (fetched), Social, Footer
        shadow.appendChild(buildHeader(data));
        shadow.appendChild(buildHero(data));
        shadow.appendChild(buildAbout(data));

        // Fetch and display real events
        console.log('YJP: Fetching events...');
        const events = await fetchEvents();
        shadow.appendChild(buildEventsSection(events));

        // Fetch and display Instagram posts from Google Sheet
        console.log('YJP: Fetching Instagram posts...');
        const instagramPosts = await fetchInstagramPosts();
        shadow.appendChild(buildSocialSection(instagramPosts));

        shadow.appendChild(buildFooter(data));

        // Inject Instagram embeds into main DOM (Shadow DOM doesn't support Instagram embeds)
        console.log('YJP: Injecting Instagram embeds...');
        injectInstagramEmbeds(instagramPosts, host);

        console.log('YJP Cincinnati: Redesign complete!');
    }

    // Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
