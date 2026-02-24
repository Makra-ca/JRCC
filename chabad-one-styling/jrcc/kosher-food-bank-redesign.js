/* ===================================================================
   JRCC KOSHER FOOD BANK - Homepage Redesign
   Shadow DOM + Dynamic Content Extraction
   ===================================================================

   HOW TO USE:
   1. Open https://www.jrcc.org/templates/articlecco_cdo/aid/6819985/jewish/Kosher-Food-Bank.htm in your browser
   2. Open DevTools (F12) → Console tab
   3. Paste this entire script and press Enter
   4. See the redesign immediately!

   To revert: Just refresh the page

   APPROACH:
   - Extracts existing content from the page (sections, images, text)
   - Restyles them in a modern Shadow DOM container
   - Client can still edit content in CMS - script will pick it up
   =================================================================== */

(function() {
    'use strict';

    // ===================================================================
    // CONFIGURATION - Elegant color palette
    // ===================================================================

    const COLORS = {
        // Primary - warm gold tones
        gold: '#d4af37',
        goldLight: '#e8c54a',
        goldDark: '#b8942e',
        goldMuted: '#c9a227',

        // Neutrals - soft, warm tones (not harsh black)
        charcoal: '#2d2d2d',
        darkCharcoal: '#1f1f1f',
        warmGray: '#4a4a4a',
        mediumGray: '#6b6b6b',

        // Backgrounds
        cream: '#faf8f5',
        lightCream: '#f5f3f0',
        white: '#ffffff',

        // Text
        textPrimary: '#2d2d2d',
        textSecondary: '#5a5a5a',
        textMuted: '#7a7a7a',

        // Accents
        warmRed: '#8b3a3a',
        softTeal: '#3d7a7a'
    };

    const SITE_CONFIG = {
        name: 'JRCC Kosher Food Bank',
        shortName: 'Kosher Food Bank',
        siteId: '6819985',
        parentSite: 'JRCC'
    };

    // ===================================================================
    // CONFIGURABLE TEXT - Edit these if needed
    // These are fallbacks - script will try to extract from page first
    // ===================================================================

    const TEXT_CONFIG = {
        // Hero section
        heroTagline: 'JRCC COMMUNITY SERVICE',
        heroSubtitle: null, // Will try to extract from first section, or leave empty

        // Donate section - set to null to hide
        donateTitle: 'Support Our Mission',
        donateText: 'Your donation helps provide kosher food to families in need. Every contribution makes a difference.',

        // Get Help section - set to null to hide
        getHelpTitle: 'Need Assistance?',
        getHelpSubtitle: 'If you or someone you know needs help with kosher food, we are here for you.',
        getHelpButtonText: 'Request Assistance',
        getHelpPageUrl: null, // Will try to find on page, fallback to /tools/feedback.asp

        // Footer
        footerTagline: 'A program of the Jewish Russian Community Center'
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
            link.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&display=swap';
            document.head.appendChild(link);
        }
    }

    // ===================================================================
    // DATA EXTRACTION - Extract EXISTING content from page
    // ===================================================================

    function extractAllData() {
        console.log('KFB: Extracting page data...');
        const data = {};

        // 1. HERO - Extract header image and title
        data.hero = {
            image: null,
            title: 'Kosher Food Bank'
        };

        const headerImg = document.querySelector('.chabad_header img');
        if (headerImg?.src) {
            data.hero.image = headerImg.src;
        }

        const headerTitle = document.querySelector('.chabad_header .headerTitle');
        if (headerTitle) {
            data.hero.title = cleanText(headerTitle.textContent);
        }
        console.log('  Hero:', data.hero.image ? 'image found' : 'no image', '-', data.hero.title);

        // 2. CUSTOM MESSAGES - Extract ALL content sections as-is
        data.sections = [];
        const customMessages = document.querySelectorAll('.custom_message');
        customMessages.forEach((msg) => {
            const titleEl = msg.querySelector('.title');
            const messageEl = msg.querySelector('.message');

            if (titleEl || messageEl) {
                const section = {
                    title: titleEl ? cleanText(titleEl.textContent) : '',
                    paragraphs: [],
                    html: messageEl ? messageEl.innerHTML : '' // Preserve HTML for formatting
                };

                if (messageEl) {
                    // Get all paragraphs separately
                    const paragraphs = messageEl.querySelectorAll('p');
                    if (paragraphs.length > 0) {
                        paragraphs.forEach(p => {
                            const text = cleanText(p.textContent);
                            if (text.length > 0) {
                                section.paragraphs.push(text);
                            }
                        });
                    } else {
                        // No p tags, get all text
                        section.paragraphs.push(cleanText(messageEl.textContent));
                    }
                }

                data.sections.push(section);
            }
        });
        console.log('  Sections:', data.sections.length);

        // 3. PROMO CARDS - Extract images and links (including donate)
        data.promoCards = [];
        const promoWraps = document.querySelectorAll('.sPromo-wrap');
        promoWraps.forEach(wrap => {
            const img = wrap.querySelector('img');
            const link = wrap.tagName === 'A' ? wrap : wrap.querySelector('a');
            const caption = wrap.querySelector('.caption');

            if (img || caption) {
                const card = {
                    image: img?.src || null,
                    link: link?.href || null,
                    caption: caption ? cleanText(caption.textContent) : '',
                    isDonate: false
                };

                // Check if this is a donate card
                if (caption) {
                    const captionText = caption.textContent.toLowerCase();
                    card.isDonate = captionText.includes('donate');
                }
                if (link?.href) {
                    card.isDonate = card.isDonate || link.href.toLowerCase().includes('donate');
                }

                data.promoCards.push(card);
            }
        });
        console.log('  Promo Cards:', data.promoCards.length);
        // Debug: show promo card captions and flags
        data.promoCards.forEach(c => {
            console.log('    - "' + c.caption + '" isDonate:', c.isDonate, 'isAbout:', c.caption.toLowerCase().includes('about'));
        });

        // 4. DONATE LINK - Find donation URL
        data.donateUrl = null;

        // Check promo cards first
        data.promoCards.forEach(card => {
            if (card.isDonate && card.link) {
                data.donateUrl = card.link;
            }
        });

        // Fallback: search for donate links
        if (!data.donateUrl) {
            const donateLinks = document.querySelectorAll('a[href*="donate"], a[href*="Donate"], a[href*="DONATE"]');
            if (donateLinks.length > 0) {
                data.donateUrl = donateLinks[0].href;
            }
        }
        console.log('  Donate URL:', data.donateUrl ? 'found' : 'not found');

        // 5. NAVIGATION - Extract nav links WITH SUBMENUS
        data.nav = [];
        const seen = new Set();
        const submenuItemTexts = new Set(); // Track submenu items to exclude from main nav

        // Method 1: Try span.parent structure (Chabad One pattern)
        // Only get top-level nav - exclude items inside .co_submenu_container
        const parentSpans = document.querySelectorAll('span.parent');
        parentSpans.forEach((span) => {
            // Skip if this span is inside a submenu container
            if (span.closest('.co_submenu_container')) return;

            const link = span.querySelector('a');
            if (!link) return;

            // Also skip if this link has data-menu-level="2" (it's a submenu item)
            if (link.getAttribute('data-menu-level') === '2') return;

            const text = (link.innerText || link.textContent).replace(/\s+/g, ' ').trim();
            const href = link.getAttribute('href');

            if (!text || seen.has(text.toLowerCase()) || text.toLowerCase() === 'home') return;
            seen.add(text.toLowerCase());

            const item = { text, href, submenu: [] };

            // Search for submenu
            let searchEl = span;
            for (let level = 0; level < 5 && searchEl && item.submenu.length === 0; level++) {
                const parent = searchEl.parentElement;
                if (!parent) break;

                const siblings = Array.from(parent.children).filter(c => c !== searchEl);
                for (const sibling of siblings) {
                    const submenuContainer = sibling.classList.contains('co_submenu_container')
                        ? sibling
                        : sibling.querySelector('.co_submenu_container');

                    if (submenuContainer) {
                        const submenuLinks = submenuContainer.querySelectorAll('a[data-menu-level="2"]');
                        submenuLinks.forEach(subLink => {
                            const subText = (subLink.innerText || subLink.textContent).replace(/\s+/g, ' ').trim();
                            const subHref = subLink.getAttribute('href');
                            if (subText && subText !== text && !item.submenu.find(s => s.text === subText)) {
                                item.submenu.push({ text: subText, href: subHref });
                                submenuItemTexts.add(subText.toLowerCase()); // Track this as a submenu item
                            }
                        });
                        break;
                    }
                }

                if (item.submenu.length > 0) break;
                searchEl = parent;
            }

            data.nav.push(item);
        });

        // Remove any items that were added as submenu items (in case of duplicates)
        data.nav = data.nav.filter(item => !submenuItemTexts.has(item.text.toLowerCase()));

        // Method 2: Fallback to simple nav links
        if (data.nav.length === 0) {
            const navLinks = document.querySelectorAll('#navigation a, #menu a, .chabad_menu_content a');
            navLinks.forEach(link => {
                const text = cleanText(link.textContent);
                const href = link.getAttribute('href');
                if (text && text.length > 1 && text.length < 30 && !seen.has(text.toLowerCase()) && href) {
                    seen.add(text.toLowerCase());
                    data.nav.push({ text, href, submenu: [] });
                }
            });
        }
        console.log('  Nav Links:', data.nav.length);
        // Debug: Show nav items with submenus
        const navsWithSubmenus = data.nav.filter(n => n.submenu && n.submenu.length > 0);
        if (navsWithSubmenus.length > 0) {
            console.log('  Nav with submenus:', navsWithSubmenus.length);
            navsWithSubmenus.forEach(n => console.log('    -', n.text, ':', n.submenu.length, 'items'));
        } else {
            console.log('  Nav with submenus: 0 (no dropdowns found)');
        }

        // 6. FOOTER DATA - Extract contact info comprehensively
        data.footer = {
            orgName: null,
            address: null,
            country: null,
            phone: null,
            email: null,
            privacyLink: null,
            poweredBy: null
        };

        // First try direct link selectors
        const phoneEl = document.querySelector('a[href^="tel:"]');
        if (phoneEl) {
            data.footer.phone = { text: cleanText(phoneEl.textContent), href: phoneEl.href };
        }

        const emailEl = document.querySelector('a[href^="mailto:"]');
        if (emailEl) {
            data.footer.email = { text: cleanText(emailEl.textContent), href: emailEl.href };
        }

        // Find privacy policy link
        const privacyLink = document.querySelector('a[href*="privacy"], a[href*="Privacy"]');
        if (privacyLink) {
            data.footer.privacyLink = { text: 'Privacy Policy', href: privacyLink.href };
        }

        // Parse footer area for comprehensive info
        const footerArea = document.querySelector('#footer, footer, [id*="footer"], .footer');
        if (footerArea) {
            const footerText = footerArea.textContent;

            // Phone - Canadian format (XXX-XXX-XXXX or (XXX) XXX-XXXX)
            if (!data.footer.phone) {
                const phoneMatch = footerText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]\d{4}/);
                if (phoneMatch) {
                    const phoneNum = phoneMatch[0];
                    data.footer.phone = { text: phoneNum, href: 'tel:+1' + phoneNum.replace(/\D/g, '') };
                }
            }

            // Check for "Powered by Chabad.org"
            if (footerText.includes('Powered by') || footerText.includes('Chabad.org')) {
                data.footer.poweredBy = 'Powered by Chabad.org';
            }

            // Parse footer line by line - split on newlines OR on key patterns
            const rawLines = footerText.split(/\n/);
            const lines = [];
            rawLines.forEach(l => {
                // Also split if we see patterns like "Canada416" stuck together
                const cleaned = cleanText(l);
                if (cleaned.length > 2) {
                    // Check if country is stuck to phone
                    const countryPhoneMatch = cleaned.match(/^(Canada|USA|United States)(\d{3})/i);
                    if (countryPhoneMatch) {
                        lines.push(countryPhoneMatch[1]);
                        lines.push(cleaned.substring(countryPhoneMatch[1].length));
                    } else {
                        lines.push(cleaned);
                    }
                }
            });

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                // Skip Powered by / copyright lines
                if (line.includes('Powered by') || line.includes('©') || line.toLowerCase().includes('privacy')) {
                    continue;
                }

                // Address - line that starts with number and contains street type
                if (!data.footer.address && /^\d+\s+.*(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Blvd|Way|Lane|Ln|Court|Ct)/i.test(line)) {
                    data.footer.address = line;
                    continue;
                }

                // Country names (can be at start of line)
                if (!data.footer.country && /^(Canada|USA|United States)/i.test(line)) {
                    data.footer.country = line.match(/^(Canada|USA|United States)/i)[1];
                    continue;
                }

                // Org name - first substantial line that's not address/phone/country
                if (!data.footer.orgName && line.length > 10 && !line.match(/^\d/) && !line.match(/\d{3}[-.\s]\d{3}/)) {
                    data.footer.orgName = line;
                }
            }
        }

        console.log('  Footer:', data.footer.orgName ? 'org found' : 'no org', data.footer.address ? 'addr found' : 'no addr', data.footer.phone ? 'phone found' : 'no phone');

        // 7. GET HELP PAGE URL - Try to find link to help/assistance page
        data.getHelpUrl = TEXT_CONFIG.getHelpPageUrl;
        if (!data.getHelpUrl) {
            const helpLinks = document.querySelectorAll('a[href*="Help"], a[href*="help"], a[href*="assistance"], a[href*="Assistance"]');
            helpLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.includes('donate') && !data.getHelpUrl) {
                    data.getHelpUrl = href;
                }
            });
        }
        if (!data.getHelpUrl) {
            data.getHelpUrl = '/tools/feedback.asp'; // Final fallback
        }
        console.log('  Get Help URL:', data.getHelpUrl);

        // 8. EXTRACT HERO SUBTITLE - Try first section's first paragraph
        data.heroSubtitle = TEXT_CONFIG.heroSubtitle;
        if (!data.heroSubtitle && data.sections.length > 0 && data.sections[0].paragraphs.length > 0) {
            // Use first paragraph of first section as hero subtitle if it's short enough
            const firstPara = data.sections[0].paragraphs[0];
            if (firstPara.length < 200) {
                data.heroSubtitle = firstPara;
            }
        }

        // 9. ABOUT US SECTION - Extract special "About" section with background image
        data.aboutSection = null;

        // Method 1: Check .custom_message elements
        const allCustomMessages = document.querySelectorAll('.custom_message');
        allCustomMessages.forEach((msg) => {
            const titleEl = msg.querySelector('.title');
            const title = titleEl ? cleanText(titleEl.textContent) : '';

            // Check if this is an "About Us" style section
            if (title.toLowerCase().includes('about') && !data.aboutSection) {
                const messageEl = msg.querySelector('.message');

                // Look for background image in various places
                let bgImage = null;
                const bgMatch = (msg.getAttribute('style') || '').match(/url\(['"]?([^'")\s]+)/);
                if (bgMatch) {
                    bgImage = bgMatch[1];
                }
                // Also check parent containers and nested elements
                if (!bgImage) {
                    const parentWithBg = msg.closest('[style*="background"]');
                    if (parentWithBg) {
                        const parentMatch = (parentWithBg.getAttribute('style') || '').match(/url\(['"]?([^'")\s]+)/);
                        if (parentMatch) bgImage = parentMatch[1];
                    }
                }
                // Check for img tags inside the section
                if (!bgImage) {
                    const imgEl = msg.querySelector('img');
                    if (imgEl && imgEl.src) bgImage = imgEl.src;
                }

                // Find CTA button
                const btn = msg.querySelector('a.button, a.btn, .message a, a[class*="btn"]');

                data.aboutSection = {
                    title: title,
                    description: messageEl ? cleanText(messageEl.textContent.replace(btn ? btn.textContent : '', '')) : '',
                    buttonText: btn ? cleanText(btn.textContent) : 'Read More',
                    buttonLink: btn ? btn.getAttribute('href') : '#',
                    backgroundImage: bgImage
                };
            }
        });

        // Method 2: Check promo cards for "About" sections (fallback)
        if (!data.aboutSection) {
            data.promoCards.forEach(card => {
                if (card.caption && card.caption.toLowerCase().includes('about') && !data.aboutSection) {
                    data.aboutSection = {
                        title: card.caption,
                        description: '', // Promo cards typically don't have long descriptions
                        buttonText: 'Read More',
                        buttonLink: card.link || '#',
                        backgroundImage: card.image
                    };
                }
            });
        }

        console.log('  About Section:', data.aboutSection ? 'found' : 'not found');

        // 10. DONATE SECTION TEXT - Extract if exists on page
        data.donateSection = null;
        data.sections.forEach(s => {
            if (s.title.toLowerCase().includes('donate') && s.paragraphs.length > 0) {
                data.donateSection = {
                    title: s.title,
                    text: s.paragraphs.join(' ')
                };
            }
        });

        console.log('KFB: Data extraction complete');
        return data;
    }

    // ===================================================================
    // SHADOW DOM SETUP
    // ===================================================================

    function createShadowContainer() {
        const host = document.createElement('div');
        host.id = 'kfb-shadow-host';
        host.style.cssText = 'position:relative;z-index:1;display:block;width:100%;';
        const shadow = host.attachShadow({ mode: 'open' });

        // Font
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&display=swap';
        shadow.appendChild(fontLink);

        // Styles
        const style = document.createElement('style');
        style.textContent = getStyles();
        shadow.appendChild(style);

        return { host, shadow };
    }

    function getStyles() {
        return `
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
                max-width: 1100px;
                margin: 0 auto;
            }
            .section-title {
                font-size: clamp(28px, 5vw, 42px);
                font-weight: 800;
                color: ${COLORS.charcoal};
                margin-bottom: 16px;
                text-align: center;
                position: relative;
            }
            .section-title::after {
                content: '';
                display: block;
                width: 80px;
                height: 4px;
                background: linear-gradient(90deg, ${COLORS.gold} 0%, ${COLORS.goldLight} 100%);
                margin: 16px auto 0;
                border-radius: 2px;
            }
            .btn {
                display: inline-block;
                padding: 16px 40px;
                border-radius: 50px;
                font-weight: 700;
                font-size: 16px;
                transition: all 0.3s ease;
                cursor: pointer;
                font-family: 'Urbanist', sans-serif;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .btn-gold {
                background: linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldLight} 100%);
                color: ${COLORS.charcoal};
                border: none;
            }
            .btn-gold:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
            }
            .btn-dark {
                background: linear-gradient(135deg, ${COLORS.charcoal} 0%, ${COLORS.warmGray} 100%);
                color: ${COLORS.gold};
                border: 2px solid ${COLORS.gold};
            }
            .btn-dark:hover {
                background: ${COLORS.gold};
                color: ${COLORS.charcoal};
            }
            .btn-outline {
                background: transparent;
                color: ${COLORS.white};
                border: 2px solid ${COLORS.white};
            }
            .btn-outline:hover {
                background: rgba(255,255,255,0.15);
            }
            .card {
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.08);
                transition: all 0.3s ease;
            }
            .card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 60px rgba(0,0,0,0.12);
            }

            /* Dropdown scrollbar */
            .kfb-dropdown::-webkit-scrollbar { width: 8px; }
            .kfb-dropdown::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
            .kfb-dropdown::-webkit-scrollbar-thumb { background: ${COLORS.gold}; border-radius: 4px; }

            /* Donate Button Pulse Animation */
            @keyframes donatePulse {
                0%, 100% {
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.2);
                }
                50% {
                    box-shadow: 0 12px 40px rgba(212, 175, 55, 0.4), 0 0 40px rgba(232, 197, 74, 0.3);
                }
            }

            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @media (max-width: 768px) {
                .section { padding: 48px 16px; }
                .section-title { font-size: 28px; }
                .btn { padding: 14px 28px; font-size: 14px; }
                .card { padding: 24px; }
                .kfb-nav-links { display: none !important; }
                .kfb-nav-cta { display: none !important; }
                .kfb-hamburger { display: flex !important; }
            }
            @media (max-width: 480px) {
                .section { padding: 40px 16px; }
                .btn { padding: 12px 24px; font-size: 13px; width: 100%; text-align: center; }
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
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 12px 24px;
            z-index: 10000;
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            font-family: 'Urbanist', sans-serif;
        `;

        const container = document.createElement('div');
        container.style.cssText = 'max-width:1400px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;';

        // Logo
        const logo = document.createElement('a');
        logo.href = '/';
        logo.style.cssText = 'display:flex;align-items:center;gap:12px;';

        const logoText = document.createElement('span');
        logoText.textContent = SITE_CONFIG.shortName;
        logoText.style.cssText = `font-size:20px;font-weight:800;color:${COLORS.charcoal};`;
        logo.appendChild(logoText);
        container.appendChild(logo);

        // Nav links with dropdowns (desktop)
        const navList = document.createElement('ul');
        navList.className = 'kfb-nav-links';
        navList.style.cssText = 'display:flex;gap:8px;list-style:none;margin:0;padding:0;';

        data.nav.slice(0, 6).forEach(link => {
            const li = document.createElement('li');
            li.style.cssText = 'position:relative;';

            const hasSubmenu = link.submenu && link.submenu.length > 0;

            const a = document.createElement('a');
            a.href = link.href;
            if (hasSubmenu) {
                a.innerHTML = `${link.text} <span style="font-size:0.7em;margin-left:4px;opacity:0.6;">▼</span>`;
            } else {
                a.textContent = link.text;
            }
            a.style.cssText = `
                color:${COLORS.charcoal};
                font-weight:500;
                font-size:15px;
                transition:color 0.3s;
                padding:12px 16px;
                display:flex;
                align-items:center;
            `;

            let dropdown = null;
            if (hasSubmenu) {
                dropdown = document.createElement('div');
                dropdown.className = 'kfb-dropdown';
                dropdown.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: white;
                    min-width: 220px;
                    max-height: calc(100vh - 120px);
                    overflow-y: auto;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.12);
                    border-radius: 12px;
                    padding: 8px 0;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                    z-index: 10001;
                `;

                link.submenu.forEach(subItem => {
                    const subLink = document.createElement('a');
                    subLink.href = subItem.href;
                    subLink.textContent = subItem.text;
                    subLink.style.cssText = `
                        display: block;
                        padding: 12px 20px;
                        color: ${COLORS.charcoal};
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.2s;
                    `;
                    subLink.addEventListener('mouseenter', () => {
                        subLink.style.background = COLORS.cream;
                        subLink.style.color = COLORS.gold;
                    });
                    subLink.addEventListener('mouseleave', () => {
                        subLink.style.background = 'transparent';
                        subLink.style.color = COLORS.charcoal;
                    });
                    dropdown.appendChild(subLink);
                });

                li.appendChild(dropdown);
            }

            li.addEventListener('mouseenter', () => {
                a.style.color = COLORS.gold;
                if (dropdown) {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.transform = 'translateY(0)';
                }
            });
            li.addEventListener('mouseleave', () => {
                a.style.color = COLORS.charcoal;
                if (dropdown) {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateY(10px)';
                }
            });

            li.appendChild(a);
            navList.appendChild(li);
        });
        container.appendChild(navList);

        // CTA button (desktop)
        if (data.donateUrl) {
            const cta = document.createElement('a');
            cta.className = 'kfb-nav-cta';
            cta.href = data.donateUrl;
            cta.textContent = 'Donate';
            cta.style.cssText = `
                background: ${COLORS.gold};
                color: ${COLORS.charcoal};
                padding: 10px 24px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s;
            `;
            cta.addEventListener('mouseenter', () => {
                cta.style.transform = 'translateY(-2px)';
                cta.style.boxShadow = '0 8px 20px rgba(212,175,55,0.3)';
            });
            cta.addEventListener('mouseleave', () => {
                cta.style.transform = 'translateY(0)';
                cta.style.boxShadow = 'none';
            });
            container.appendChild(cta);
        }

        // Hamburger button (mobile)
        const hamburger = document.createElement('button');
        hamburger.className = 'kfb-hamburger';
        hamburger.innerHTML = `
            <span style="display:block;width:24px;height:2px;background:${COLORS.charcoal};border-radius:2px;transition:all 0.3s;"></span>
            <span style="display:block;width:24px;height:2px;background:${COLORS.charcoal};border-radius:2px;transition:all 0.3s;margin:5px 0;"></span>
            <span style="display:block;width:24px;height:2px;background:${COLORS.charcoal};border-radius:2px;transition:all 0.3s;"></span>
        `;
        hamburger.style.cssText = 'display:none;flex-direction:column;background:none;border:none;cursor:pointer;padding:8px;';
        container.appendChild(hamburger);

        nav.appendChild(container);
        header.appendChild(nav);

        // Mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'kfb-mobile-menu';
        mobileMenu.style.cssText = `
            display: none;
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            max-height: calc(100vh - 80px);
            overflow-y: auto;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            padding: 16px;
            z-index: 9999;
            flex-direction: column;
            gap: 4px;
            font-family: 'Urbanist', sans-serif;
        `;

        data.nav.slice(0, 8).forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.style.cssText = `
                color:${COLORS.charcoal};
                font-weight:500;
                font-size:16px;
                padding:14px 16px;
                border-bottom:1px solid ${COLORS.lightCream};
                display:block;
            `;
            mobileMenu.appendChild(a);

            // Add submenu items
            if (link.submenu && link.submenu.length > 0) {
                link.submenu.forEach(sub => {
                    const subA = document.createElement('a');
                    subA.href = sub.href;
                    subA.textContent = '  → ' + sub.text;
                    subA.style.cssText = `
                        color:${COLORS.textSecondary};
                        font-weight:400;
                        font-size:14px;
                        padding:10px 16px 10px 32px;
                        border-bottom:1px solid ${COLORS.lightCream};
                        display:block;
                    `;
                    mobileMenu.appendChild(subA);
                });
            }
        });

        if (data.donateUrl) {
            const mobileCta = document.createElement('a');
            mobileCta.href = data.donateUrl;
            mobileCta.textContent = 'Donate Now';
            mobileCta.className = 'btn btn-gold';
            mobileCta.style.cssText += 'text-align:center;margin-top:16px;';
            mobileMenu.appendChild(mobileCta);
        }

        header.appendChild(mobileMenu);

        // Toggle mobile menu
        hamburger.onclick = () => {
            const isOpen = mobileMenu.style.display === 'flex';
            mobileMenu.style.display = isOpen ? 'none' : 'flex';
        };

        return header;
    }

    function buildHero(data) {
        const section = document.createElement('section');
        section.style.cssText = `
            min-height: 70vh;
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
            ${data.hero.image ? `background-image: url('${data.hero.image}');` : `background: linear-gradient(135deg, ${COLORS.charcoal} 0%, ${COLORS.warmGray} 100%);`}
            background-size: cover;
            background-position: center;
            z-index: 0;
        `;
        section.appendChild(bg);

        // Overlay - softer gradient
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(180deg, rgba(45,45,45,0.5) 0%, rgba(45,45,45,0.65) 50%, rgba(45,45,45,0.85) 100%);
            z-index: 1;
        `;
        section.appendChild(overlay);

        // Content
        const content = document.createElement('div');
        content.style.cssText = 'position:relative;z-index:2;max-width:900px;';

        // Tag
        if (TEXT_CONFIG.heroTagline) {
            const tag = document.createElement('p');
            tag.textContent = TEXT_CONFIG.heroTagline;
            tag.style.cssText = `
                font-size:13px;
                color:${COLORS.goldLight};
                margin-bottom:20px;
                font-weight:600;
                letter-spacing:3px;
                text-transform:uppercase;
                opacity:0;
                animation: fadeInUp 0.8s ease-out 0.2s forwards;
            `;
            content.appendChild(tag);
        }

        // Title with gold accent
        const h1 = document.createElement('h1');
        h1.textContent = data.hero.title;
        h1.style.cssText = `
            font-size: clamp(40px, 10vw, 80px);
            font-weight: 700;
            color: ${COLORS.white};
            text-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
            margin-bottom: 20px;
            line-height: 1.1;
            opacity:0;
            animation: fadeInUp 0.8s ease-out 0.4s forwards;
        `;
        content.appendChild(h1);

        // Gold underline
        const underline = document.createElement('div');
        underline.style.cssText = `
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight});
            margin: 0 auto 24px;
            border-radius: 2px;
            opacity:0;
            animation: fadeInUp 0.8s ease-out 0.5s forwards;
        `;
        content.appendChild(underline);

        // Subtitle - from extracted data or config
        if (data.heroSubtitle) {
            const subtitle = document.createElement('p');
            subtitle.textContent = data.heroSubtitle;
            subtitle.style.cssText = `
                font-size:clamp(16px, 3vw, 20px);
                color:rgba(255,255,255,0.9);
                margin-bottom:40px;
                font-weight:400;
                max-width:600px;
                margin-left:auto;
                margin-right:auto;
                line-height:1.6;
                opacity:0;
                animation: fadeInUp 0.8s ease-out 0.6s forwards;
            `;
            content.appendChild(subtitle);
        }

        // Buttons
        const buttons = document.createElement('div');
        buttons.style.cssText = `
            display:flex;
            gap:16px;
            justify-content:center;
            flex-wrap:wrap;
            opacity:0;
            animation: fadeInUp 0.8s ease-out 0.7s forwards;
        `;

        if (data.donateUrl) {
            const btn1 = document.createElement('a');
            btn1.href = data.donateUrl;
            btn1.textContent = 'Donate Now';
            btn1.className = 'btn btn-gold';
            buttons.appendChild(btn1);
        }

        const btn2 = document.createElement('a');
        btn2.href = '#get-help';
        btn2.textContent = 'Get Help';
        btn2.className = 'btn btn-outline';
        buttons.appendChild(btn2);

        content.appendChild(buttons);
        section.appendChild(content);

        return section;
    }

    function buildContentSections(data) {
        const wrapper = document.createElement('div');

        data.sections.forEach((sectionData, index) => {
            if (!sectionData.title && sectionData.paragraphs.length === 0) return;

            const section = document.createElement('section');
            section.className = 'section';
            section.style.background = index % 2 === 0 ? COLORS.white : COLORS.cream;

            const container = document.createElement('div');
            container.className = 'container';

            const card = document.createElement('div');
            card.className = 'card';
            card.style.maxWidth = '900px';
            card.style.margin = '0 auto';

            if (sectionData.title) {
                const h2 = document.createElement('h2');
                h2.className = 'section-title';
                h2.textContent = sectionData.title;
                card.appendChild(h2);
            }

            if (sectionData.paragraphs.length > 0) {
                const content = document.createElement('div');
                content.style.cssText = 'margin-top:24px;';

                sectionData.paragraphs.forEach(para => {
                    if (para.trim()) {
                        const p = document.createElement('p');
                        p.textContent = para.trim();
                        p.style.cssText = `
                            font-size:17px;
                            color:${COLORS.textPrimary};
                            line-height:1.8;
                            margin-bottom:20px;
                        `;
                        content.appendChild(p);
                    }
                });

                card.appendChild(content);
            }

            container.appendChild(card);
            section.appendChild(container);
            wrapper.appendChild(section);
        });

        return wrapper;
    }

    function buildDonateSection(data) {
        // Skip if no donate URL or config says to hide
        if (!data.donateUrl || TEXT_CONFIG.donateTitle === null) {
            return document.createElement('div'); // Return empty
        }

        // Use extracted donate text if available, otherwise fall back to config
        const donateTitle = data.donateSection?.title || TEXT_CONFIG.donateTitle;
        const donateText = data.donateSection?.text || TEXT_CONFIG.donateText;

        const section = document.createElement('section');
        section.className = 'section';
        section.style.cssText = `
            background: linear-gradient(135deg, ${COLORS.charcoal} 0%, ${COLORS.warmGray} 50%, ${COLORS.charcoal} 100%);
            text-align: center;
            padding: 80px 24px;
            position: relative;
            overflow: hidden;
        `;

        // Decorative gold accent line at top
        const topAccent = document.createElement('div');
        topAccent.style.cssText = `
            position: absolute;
            top: 0; left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 4px;
            background: linear-gradient(90deg, transparent, ${COLORS.gold}, transparent);
        `;
        section.appendChild(topAccent);

        const container = document.createElement('div');
        container.className = 'container';
        container.style.cssText = 'position: relative; z-index: 1;';

        // Inner card for cleaner look
        const card = document.createElement('div');
        card.style.cssText = `
            max-width: 700px;
            margin: 0 auto;
            padding: 50px 40px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 24px;
            border: 1px solid rgba(212, 175, 55, 0.15);
        `;

        // Title with gold underline
        if (donateTitle) {
            const h2 = document.createElement('h2');
            h2.textContent = donateTitle;
            h2.style.cssText = `
                font-size: clamp(26px, 5vw, 38px);
                font-weight: 800;
                color: ${COLORS.white};
                margin-bottom: 8px;
                font-family: 'Urbanist', sans-serif;
            `;
            card.appendChild(h2);

            // Gold underline
            const underline = document.createElement('div');
            underline.style.cssText = `
                width: 80px;
                height: 3px;
                background: linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight});
                margin: 0 auto 24px;
                border-radius: 2px;
            `;
            card.appendChild(underline);
        }

        // Description text
        if (donateText) {
            const p = document.createElement('p');
            p.textContent = donateText;
            p.style.cssText = `
                font-size: clamp(15px, 2.5vw, 17px);
                color: rgba(255,255,255,0.85);
                max-width: 550px;
                margin: 0 auto 36px;
                line-height: 1.8;
                font-family: 'Urbanist', sans-serif;
            `;
            card.appendChild(p);
        }

        // Donate button - elegant gold style
        if (data.donateUrl) {
            const btn = document.createElement('a');
            btn.href = data.donateUrl;
            btn.textContent = 'DONATE NOW';
            btn.style.cssText = `
                display: inline-block;
                padding: 18px 48px;
                font-family: 'Urbanist', sans-serif;
                font-size: 18px;
                font-weight: 800;
                color: ${COLORS.charcoal};
                background: linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldLight} 100%);
                border: none;
                border-radius: 50px;
                text-decoration: none;
                letter-spacing: 2px;
                transition: all 0.3s ease;
                cursor: pointer;
                box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
            `;
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.03)';
                this.style.boxShadow = '0 15px 45px rgba(212, 175, 55, 0.5)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.3)';
            });
            card.appendChild(btn);
        }

        container.appendChild(card);
        section.appendChild(container);

        // Decorative gold accent line at bottom
        const bottomAccent = document.createElement('div');
        bottomAccent.style.cssText = `
            position: absolute;
            bottom: 0; left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 4px;
            background: linear-gradient(90deg, transparent, ${COLORS.gold}, transparent);
        `;
        section.appendChild(bottomAccent);

        return section;
    }

    function buildGetHelpSection(data) {
        // Skip if config says to hide
        if (TEXT_CONFIG.getHelpTitle === null) {
            return document.createElement('div'); // Return empty
        }

        const section = document.createElement('section');
        section.id = 'get-help';
        section.className = 'section';
        section.style.background = COLORS.cream;

        const container = document.createElement('div');
        container.className = 'container';

        if (TEXT_CONFIG.getHelpTitle) {
            const h2 = document.createElement('h2');
            h2.className = 'section-title';
            h2.textContent = TEXT_CONFIG.getHelpTitle;
            container.appendChild(h2);
        }

        if (TEXT_CONFIG.getHelpSubtitle) {
            const subtitle = document.createElement('p');
            subtitle.style.cssText = `
                font-size:18px;
                color:${COLORS.textSecondary};
                text-align:center;
                margin-bottom:40px;
                max-width:600px;
                margin-left:auto;
                margin-right:auto;
            `;
            subtitle.textContent = TEXT_CONFIG.getHelpSubtitle;
            container.appendChild(subtitle);
        }

        const card = document.createElement('div');
        card.className = 'card';
        card.style.cssText = 'max-width:500px;margin:0 auto;text-align:center;';

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = 'Contact Us';
        cardTitle.style.cssText = `font-size:24px;font-weight:700;color:${COLORS.charcoal};margin-bottom:24px;`;
        card.appendChild(cardTitle);

        const info = document.createElement('div');
        info.style.cssText = 'margin-bottom:28px;';

        if (data.footer.phone) {
            const phoneP = document.createElement('p');
            phoneP.style.cssText = `font-size:18px;color:${COLORS.textPrimary};margin-bottom:12px;`;
            const phoneLink = document.createElement('a');
            phoneLink.href = data.footer.phone.href;
            phoneLink.textContent = `📞 ${data.footer.phone.text}`;
            phoneLink.style.cssText = `color:${COLORS.charcoal};font-weight:600;transition:color 0.3s;`;
            phoneLink.addEventListener('mouseenter', () => phoneLink.style.color = COLORS.gold);
            phoneLink.addEventListener('mouseleave', () => phoneLink.style.color = COLORS.charcoal);
            phoneP.appendChild(phoneLink);
            info.appendChild(phoneP);
        }

        if (data.footer.email) {
            const emailP = document.createElement('p');
            emailP.style.cssText = `font-size:18px;color:${COLORS.textPrimary};margin-bottom:12px;`;
            const emailLink = document.createElement('a');
            emailLink.href = data.footer.email.href;
            emailLink.textContent = `✉️ ${data.footer.email.text}`;
            emailLink.style.cssText = `color:${COLORS.charcoal};font-weight:600;transition:color 0.3s;`;
            emailLink.addEventListener('mouseenter', () => emailLink.style.color = COLORS.gold);
            emailLink.addEventListener('mouseleave', () => emailLink.style.color = COLORS.charcoal);
            emailP.appendChild(emailLink);
            info.appendChild(emailP);
        }

        card.appendChild(info);

        // Get Help button
        const getHelpBtn = document.createElement('a');
        getHelpBtn.href = data.getHelpUrl;
        getHelpBtn.textContent = TEXT_CONFIG.getHelpButtonText;
        getHelpBtn.className = 'btn btn-dark';
        card.appendChild(getHelpBtn);

        container.appendChild(card);
        section.appendChild(container);

        return section;
    }

    function buildAboutSection(data) {
        // Skip if no about section found
        if (!data.aboutSection) {
            return document.createElement('div');
        }

        const section = document.createElement('section');
        section.className = 'section';
        section.style.cssText = `
            padding: 0;
            position: relative;
        `;

        const card = document.createElement('div');
        card.style.cssText = `
            max-width: 1000px;
            margin: 60px auto;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.12);
            position: relative;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        `;

        // Background image
        if (data.aboutSection.backgroundImage) {
            const bgImg = document.createElement('div');
            bgImg.style.cssText = `
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background-image: url('${data.aboutSection.backgroundImage}');
                background-size: cover;
                background-position: center top;
                z-index: 0;
            `;
            card.appendChild(bgImg);
        }

        // Content overlay
        const content = document.createElement('div');
        content.style.cssText = `
            position: relative;
            z-index: 1;
            background: linear-gradient(0deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0.7) 100%);
            padding: 40px;
            text-align: center;
        `;

        // Title
        const h2 = document.createElement('h2');
        h2.textContent = data.aboutSection.title;
        h2.style.cssText = `
            font-size: clamp(28px, 5vw, 38px);
            font-weight: 800;
            color: ${COLORS.charcoal};
            margin-bottom: 20px;
            font-family: 'Urbanist', sans-serif;
        `;
        content.appendChild(h2);

        // Description
        if (data.aboutSection.description) {
            const p = document.createElement('p');
            p.textContent = data.aboutSection.description;
            p.style.cssText = `
                font-size: 17px;
                line-height: 1.7;
                color: ${COLORS.textPrimary};
                max-width: 700px;
                margin: 0 auto 28px;
                font-family: 'Urbanist', sans-serif;
            `;
            content.appendChild(p);
        }

        // CTA Button
        if (data.aboutSection.buttonLink && data.aboutSection.buttonLink !== '#') {
            const btn = document.createElement('a');
            btn.href = data.aboutSection.buttonLink;
            btn.textContent = data.aboutSection.buttonText;
            btn.style.cssText = `
                display: inline-block;
                padding: 16px 40px;
                background: ${COLORS.charcoal};
                color: ${COLORS.white};
                font-size: 15px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                border-radius: 50px;
                transition: all 0.3s ease;
                font-family: 'Urbanist', sans-serif;
            `;
            btn.addEventListener('mouseenter', function() {
                this.style.background = COLORS.gold;
                this.style.color = COLORS.charcoal;
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 30px rgba(212,175,55,0.4)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.background = COLORS.charcoal;
                this.style.color = COLORS.white;
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
            content.appendChild(btn);
        }

        card.appendChild(content);
        section.appendChild(card);

        return section;
    }

    function buildActionCards(data) {
        // Filter out donate cards (we have a dedicated donate section) and about cards
        const actionCards = data.promoCards.filter(card => {
            if (card.isDonate) return false;
            if (card.caption && card.caption.toLowerCase().includes('about')) return false;
            return true;
        });

        // Skip if no action cards found
        if (actionCards.length === 0) {
            return document.createElement('div');
        }

        const section = document.createElement('section');
        section.className = 'section';
        section.style.cssText = `
            background: ${COLORS.white};
            padding: 60px 24px;
        `;

        const container = document.createElement('div');
        container.className = 'container';

        // Grid - adapts to number of cards
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 28px;
            max-width: 1100px;
            margin: 0 auto;
        `;

        actionCards.forEach(card => {
            const cardEl = document.createElement('a');
            cardEl.href = card.link || '#';
            cardEl.style.cssText = `
                display: block;
                position: relative;
                border-radius: 16px;
                overflow: hidden;
                aspect-ratio: 4/3;
                box-shadow: 0 10px 40px rgba(0,0,0,0.12);
                transition: all 0.4s ease;
                cursor: pointer;
            `;

            // Background image
            if (card.image) {
                const imgBg = document.createElement('div');
                imgBg.style.cssText = `
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: url('${card.image}');
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.4s ease;
                `;
                cardEl.appendChild(imgBg);

                // Hover effect on image
                cardEl.addEventListener('mouseenter', () => {
                    imgBg.style.transform = 'scale(1.05)';
                });
                cardEl.addEventListener('mouseleave', () => {
                    imgBg.style.transform = 'scale(1)';
                });
            }

            // Caption overlay at bottom
            if (card.caption) {
                const caption = document.createElement('div');
                caption.style.cssText = `
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    background: rgba(255,255,255,0.97);
                    padding: 18px 16px;
                    text-align: center;
                    font-weight: 700;
                    font-size: 17px;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: ${COLORS.charcoal};
                    font-family: 'Urbanist', sans-serif;
                    transition: all 0.3s ease;
                `;
                caption.textContent = card.caption;

                // Hover effect on caption
                cardEl.addEventListener('mouseenter', () => {
                    caption.style.background = COLORS.gold;
                    caption.style.color = COLORS.charcoal;
                });
                cardEl.addEventListener('mouseleave', () => {
                    caption.style.background = 'rgba(255,255,255,0.97)';
                    caption.style.color = COLORS.charcoal;
                });

                cardEl.appendChild(caption);
            }

            // Card hover elevation
            cardEl.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.18)';
            });
            cardEl.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 40px rgba(0,0,0,0.12)';
            });

            grid.appendChild(cardEl);
        });

        container.appendChild(grid);
        section.appendChild(container);

        return section;
    }

    function buildFooter(data) {
        const footer = document.createElement('footer');
        footer.style.cssText = `
            background: ${COLORS.charcoal};
            color: ${COLORS.cream};
            padding: 60px 24px 30px;
            font-family: 'Urbanist', sans-serif;
        `;

        const container = document.createElement('div');
        container.style.cssText = 'max-width:1100px;margin:0 auto;';

        const main = document.createElement('div');
        main.style.cssText = `
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 40px;
            padding-bottom: 40px;
            border-bottom: 1px solid rgba(212,175,55,0.2);
            margin-bottom: 24px;
        `;

        // Brand section - use extracted org name or fallback
        const brand = document.createElement('div');
        const brandTitle = document.createElement('h3');
        brandTitle.textContent = data.footer.orgName || SITE_CONFIG.name;
        brandTitle.style.cssText = `font-size:20px;font-weight:800;margin-bottom:12px;color:${COLORS.gold};line-height:1.3;`;
        brand.appendChild(brandTitle);

        // Address and location info
        if (data.footer.address) {
            const addressP = document.createElement('p');
            addressP.textContent = data.footer.address;
            addressP.style.cssText = 'opacity:0.8;font-size:14px;margin-bottom:4px;line-height:1.5;';
            brand.appendChild(addressP);
        }

        if (data.footer.country) {
            const countryP = document.createElement('p');
            countryP.textContent = data.footer.country;
            countryP.style.cssText = 'opacity:0.7;font-size:14px;margin-bottom:16px;';
            brand.appendChild(countryP);
        }

        // Tagline
        const tagline = document.createElement('p');
        tagline.textContent = TEXT_CONFIG.footerTagline;
        tagline.style.cssText = 'opacity:0.6;font-size:13px;font-style:italic;';
        brand.appendChild(tagline);
        main.appendChild(brand);

        // Contact column
        const contact = document.createElement('div');
        const contactTitle = document.createElement('h4');
        contactTitle.textContent = 'Contact';
        contactTitle.style.cssText = `font-size:16px;margin-bottom:16px;color:${COLORS.goldLight};font-weight:600;`;
        contact.appendChild(contactTitle);

        if (data.footer.phone) {
            const phoneP = document.createElement('p');
            phoneP.style.cssText = 'margin-bottom:12px;';
            const phoneIcon = document.createElement('span');
            phoneIcon.textContent = '📞 ';
            phoneIcon.style.cssText = 'margin-right:4px;';
            const phoneLink = document.createElement('a');
            phoneLink.href = data.footer.phone.href;
            phoneLink.textContent = data.footer.phone.text;
            phoneLink.style.cssText = `color:${COLORS.cream};transition:color 0.3s;font-size:15px;font-weight:500;`;
            phoneLink.addEventListener('mouseenter', () => phoneLink.style.color = COLORS.gold);
            phoneLink.addEventListener('mouseleave', () => phoneLink.style.color = COLORS.cream);
            phoneP.appendChild(phoneIcon);
            phoneP.appendChild(phoneLink);
            contact.appendChild(phoneP);
        }

        if (data.footer.email) {
            const emailP = document.createElement('p');
            emailP.style.cssText = 'margin-bottom:12px;';
            const emailIcon = document.createElement('span');
            emailIcon.textContent = '✉️ ';
            emailIcon.style.cssText = 'margin-right:4px;';
            const emailLink = document.createElement('a');
            emailLink.href = data.footer.email.href;
            emailLink.textContent = data.footer.email.text;
            emailLink.style.cssText = `color:${COLORS.cream};transition:color 0.3s;font-size:14px;`;
            emailLink.addEventListener('mouseenter', () => emailLink.style.color = COLORS.gold);
            emailLink.addEventListener('mouseleave', () => emailLink.style.color = COLORS.cream);
            emailP.appendChild(emailIcon);
            emailP.appendChild(emailLink);
            contact.appendChild(emailP);
        }
        main.appendChild(contact);

        // Quick Links column
        const links = document.createElement('div');
        const linksTitle = document.createElement('h4');
        linksTitle.textContent = 'Quick Links';
        linksTitle.style.cssText = `font-size:16px;margin-bottom:16px;color:${COLORS.goldLight};font-weight:600;`;
        links.appendChild(linksTitle);

        const quickLinks = [
            { text: 'JRCC Home', href: '/' },
            { text: 'Get Help', href: data.getHelpUrl },
            { text: 'Donate', href: data.donateUrl || '#' }
        ];

        quickLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.style.cssText = `
                display:block;
                color:${COLORS.cream};
                opacity:0.8;
                margin-bottom:10px;
                transition:all 0.3s;
                font-size:14px;
            `;
            a.addEventListener('mouseenter', () => { a.style.opacity = '1'; a.style.color = COLORS.gold; });
            a.addEventListener('mouseleave', () => { a.style.opacity = '0.8'; a.style.color = COLORS.cream; });
            links.appendChild(a);
        });
        main.appendChild(links);

        container.appendChild(main);

        // Bottom section - copyright, powered by, privacy
        const bottom = document.createElement('div');
        bottom.style.cssText = 'text-align:center;';

        // Powered by Chabad.org line
        if (data.footer.poweredBy) {
            const poweredBy = document.createElement('p');
            poweredBy.style.cssText = 'font-size:13px;opacity:0.5;margin-bottom:8px;';

            const chabadLink = document.createElement('a');
            chabadLink.href = 'https://www.chabad.org';
            chabadLink.textContent = data.footer.poweredBy;
            chabadLink.style.cssText = `color:${COLORS.cream};transition:color 0.3s;`;
            chabadLink.addEventListener('mouseenter', () => chabadLink.style.color = COLORS.gold);
            chabadLink.addEventListener('mouseleave', () => chabadLink.style.color = COLORS.cream);
            poweredBy.appendChild(chabadLink);

            poweredBy.appendChild(document.createTextNode(' © 1993-' + new Date().getFullYear() + ' '));

            // Privacy policy link
            if (data.footer.privacyLink) {
                const privacyA = document.createElement('a');
                privacyA.href = data.footer.privacyLink.href;
                privacyA.textContent = data.footer.privacyLink.text;
                privacyA.style.cssText = `color:${COLORS.cream};transition:color 0.3s;`;
                privacyA.addEventListener('mouseenter', () => privacyA.style.color = COLORS.gold);
                privacyA.addEventListener('mouseleave', () => privacyA.style.color = COLORS.cream);
                poweredBy.appendChild(privacyA);
            }

            bottom.appendChild(poweredBy);
        }

        // Copyright with org name
        const copy = document.createElement('p');
        const orgDisplay = data.footer.orgName || SITE_CONFIG.name;
        copy.textContent = `© ${new Date().getFullYear()} ${orgDisplay}`;
        copy.style.cssText = 'font-size:12px;opacity:0.4;';
        bottom.appendChild(copy);

        container.appendChild(bottom);

        footer.appendChild(container);

        // Responsive styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                footer > div > div:first-child {
                    grid-template-columns: 1fr !important;
                    text-align: center;
                }
            }
        `;
        footer.appendChild(style);

        return footer;
    }

    // ===================================================================
    // HIDE CMS
    // ===================================================================

    function hideCMS() {
        const existingStyle = document.getElementById('kfb-hide-cms');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'kfb-hide-cms';
        style.textContent = `
            /* Hide ALL body children except shadow host */
            body > *:not(#kfb-shadow-host) {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                overflow: hidden !important;
            }

            /* Specific CMS containers */
            #chabad_body_page,
            #BodyContainer,
            #chabad_main_content,
            #navigation,
            #header,
            #footer,
            .chabad_header,
            .custom_message,
            .sPromo-wrap {
                display: none !important;
                visibility: hidden !important;
            }

            /* Reset body */
            body {
                padding: 0 !important;
                margin: 0 !important;
                background: ${COLORS.cream} !important;
                overflow-x: hidden !important;
            }

            /* Ensure shadow host is visible */
            #kfb-shadow-host {
                display: block !important;
                visibility: visible !important;
                height: auto !important;
                overflow: visible !important;
            }
        `;
        document.head.appendChild(style);

        console.log('KFB: CMS hidden');
    }

    // ===================================================================
    // INIT
    // ===================================================================

    function init() {
        // Prevent duplicate runs
        if (document.getElementById('kfb-shadow-host')) {
            console.log('KFB: Already running, removing old instance...');
            document.getElementById('kfb-shadow-host').remove();
            const oldStyle = document.getElementById('kfb-hide-cms');
            if (oldStyle) oldStyle.remove();
        }

        console.log('KFB: Starting Kosher Food Bank redesign...');
        loadFonts();

        // Extract data BEFORE hiding CMS
        const data = extractAllData();

        // Create shadow container
        const { host, shadow } = createShadowContainer();
        document.body.insertBefore(host, document.body.firstChild);

        // Hide CMS
        hideCMS();

        // Build sections - uses EXTRACTED content
        shadow.appendChild(buildHeader(data));
        shadow.appendChild(buildHero(data));
        shadow.appendChild(buildAboutSection(data));       // About Us with background image
        shadow.appendChild(buildContentSections(data));    // Other CMS sections restyled
        shadow.appendChild(buildActionCards(data));        // GET HELP, DONATE, VOLUNTEER cards
        shadow.appendChild(buildDonateSection(data));
        shadow.appendChild(buildGetHelpSection(data));
        shadow.appendChild(buildFooter(data));

        console.log('KFB: Redesign complete!');
    }

    // Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
