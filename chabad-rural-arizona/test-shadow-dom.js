/* ===================================================================
   CHABAD RURAL ARIZONA - Homepage Redesign v2
   Using Shadow DOM + Inline Styles for complete isolation
   ===================================================================

   HOW TO USE:
   1. Open https://www.jewishruralaz.org/ in your browser
   2. Open DevTools (F12) → Console tab
   3. Paste this entire script and press Enter
   4. See the redesign immediately!

   To revert: Just refresh the page

   =================================================================== */

(function() {
    'use strict';

    console.log('🏜️ Chabad Rural Arizona v2 - Shadow DOM + Inline Styles');

    // ===================================================================
    // CONFIGURATION
    // ===================================================================

    const COLORS = {
        sunsetPeach: '#E8A87C',
        dustyMauve: '#C38D94',
        deepBurgundy: '#722F37',
        darkBurgundy: '#4A1F24',
        tealGreen: '#2D5A5A',
        warmCream: '#F5E6D3',
        lightCream: '#FDF8F3',
        goldenSand: '#D4A84B',
        sunsetOrange: '#E07B4C'
    };

    // ===================================================================
    // LOAD GOOGLE FONTS
    // ===================================================================

    function loadFonts() {
        if (!document.querySelector('link[href*="Urbanist"]')) {
            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap';
            document.head.appendChild(fontLink);
        }
    }

    // ===================================================================
    // CREATE SHADOW DOM CONTAINER
    // ===================================================================

    function createShadowContainer() {
        // Create host element
        const host = document.createElement('div');
        host.id = 'cra-shadow-host';
        host.style.cssText = `
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
        `;

        // Attach shadow DOM
        const shadow = host.attachShadow({ mode: 'open' });

        // Add fonts to shadow DOM
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap';
        shadow.appendChild(fontLink);

        // Add base styles to shadow DOM
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            a {
                text-decoration: none;
                color: inherit;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .cra-hero {
                    padding: 5rem 1.5rem 3rem !important;
                }
                .cra-hero h1 {
                    font-size: 2.5rem !important;
                    letter-spacing: -1px !important;
                }
                .cra-hero-subtitle {
                    font-size: 1.15rem !important;
                }
                .cra-hero-tagline {
                    font-size: 1rem !important;
                    padding: 0.7rem 1.5rem !important;
                }
                .cra-btn-primary,
                .cra-btn-secondary {
                    font-size: 1.05rem !important;
                    padding: 1rem 2.25rem !important;
                }
                .cra-hero-cta {
                    flex-direction: column !important;
                }
                .cra-locations-grid {
                    grid-template-columns: 1fr !important;
                }
                .cra-actions-grid {
                    grid-template-columns: 1fr 1fr !important;
                }
                .cra-footer-main {
                    grid-template-columns: 1fr !important;
                    text-align: center !important;
                }
                .cra-footer-social {
                    justify-content: center !important;
                }
            }

            @media (min-width: 769px) and (max-width: 1024px) {
                .cra-locations-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
            }
        `;
        shadow.appendChild(style);

        return { host, shadow };
    }

    // ===================================================================
    // CREATE HERO SECTION WITH INLINE STYLES
    // ===================================================================

    function createHero() {
        const hero = document.createElement('section');
        hero.className = 'cra-hero';
        hero.style.cssText = `
            min-height: 100vh;
            background: linear-gradient(180deg, #E8A87C 0%, #D4956A 20%, #C38D94 40%, #A67580 60%, #8B5A62 80%, #722F37 100%);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 6rem 2rem 4rem;
            overflow: hidden;
            font-family: 'Urbanist', sans-serif;
        `;

        // Cactus silhouette
        const cactus = document.createElement('div');
        cactus.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 200px;
            background: ${COLORS.darkBurgundy};
            clip-path: polygon(0% 100%, 0% 60%, 5% 55%, 5% 30%, 6% 30%, 6% 55%, 8% 50%, 10% 55%, 12% 50%, 15% 60%, 20% 55%, 25% 60%, 30% 50%, 30% 20%, 31% 20%, 31% 15%, 32% 15%, 32% 20%, 33% 20%, 33% 50%, 35% 55%, 40% 50%, 45% 55%, 50% 45%, 55% 50%, 60% 45%, 65% 55%, 70% 50%, 70% 25%, 71% 25%, 71% 50%, 73% 45%, 75% 50%, 80% 45%, 85% 55%, 90% 50%, 95% 60%, 100% 55%, 100% 100%);
        `;
        hero.appendChild(cactus);

        // Hero content container
        const content = document.createElement('div');
        content.style.cssText = `
            position: relative;
            z-index: 2;
            max-width: 900px;
        `;

        // Tagline badge
        const tagline = document.createElement('div');
        tagline.className = 'cra-hero-tagline';
        tagline.textContent = 'Think Good and It Will Be Good';
        tagline.style.cssText = `
            background: ${COLORS.tealGreen};
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 12px;
            font-size: 1.7rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 2.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            letter-spacing: 0.5px;
            font-family: 'Urbanist', sans-serif;
        `;
        content.appendChild(tagline);

        // H1 Title - BIGGER but THINNER
        const h1 = document.createElement('h1');
        h1.textContent = 'Chabad of Rural Arizona';
        h1.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(4.5rem, 14vw, 9rem);
            font-weight: 600;
            color: white;
            text-shadow: 0 4px 30px rgba(0,0,0,0.3);
            margin: 0 0 1.5rem 0;
            padding: 0;
            line-height: 1.05;
            letter-spacing: -2px;
            background: none;
        `;
        content.appendChild(h1);

        // Subtitle - BIGGER but THINNER
        const subtitle = document.createElement('p');
        subtitle.className = 'cra-hero-subtitle';
        subtitle.textContent = 'Bringing Jewish life, learning, and warmth to every corner of the Arizona desert';
        subtitle.style.cssText = `
            font-size: 2.1rem;
            color: ${COLORS.warmCream};
            margin: 0 0 3rem 0;
            font-weight: 300;
            max-width: 900px;
            line-height: 1.5;
            font-family: 'Urbanist', sans-serif;
        `;
        content.appendChild(subtitle);

        // CTA Buttons
        const cta = document.createElement('div');
        cta.className = 'cra-hero-cta';
        cta.style.cssText = `
            display: inline-flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 0.5rem;
        `;

        const btnPrimary = document.createElement('a');
        btnPrimary.className = 'cra-btn-primary';
        btnPrimary.href = '#cra-locations';
        btnPrimary.textContent = 'Find Your Location';
        btnPrimary.style.cssText = `
            background: ${COLORS.goldenSand};
            color: ${COLORS.darkBurgundy};
            padding: 1.5rem 4rem;
            border-radius: 50px;
            font-weight: 500;
            font-size: 1.65rem;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            display: inline-block;
            font-family: 'Urbanist', sans-serif;
            cursor: pointer;
        `;
        cta.appendChild(btnPrimary);

        const btnSecondary = document.createElement('a');
        btnSecondary.className = 'cra-btn-secondary';
        btnSecondary.href = '/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm';
        btnSecondary.textContent = 'Get Involved';
        btnSecondary.style.cssText = `
            background: transparent;
            color: white;
            padding: 1.5rem 4rem;
            border-radius: 50px;
            font-weight: 500;
            font-size: 1.65rem;
            text-decoration: none;
            border: 2px solid white;
            transition: all 0.3s ease;
            display: inline-block;
            font-family: 'Urbanist', sans-serif;
            cursor: pointer;
        `;
        cta.appendChild(btnSecondary);

        content.appendChild(cta);
        hero.appendChild(content);

        return hero;
    }

    // ===================================================================
    // CREATE LOCATIONS SECTION
    // ===================================================================

    function createLocations() {
        const section = document.createElement('section');
        section.id = 'cra-locations';
        section.className = 'cra-locations-section';
        section.style.cssText = `
            padding: 6rem 2rem;
            background: ${COLORS.lightCream};
            font-family: 'Urbanist', sans-serif;
        `;

        // Section header
        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            margin-bottom: 3.5rem;
        `;

        const h2 = document.createElement('h2');
        h2.textContent = 'Areas We Currently Serve';
        h2.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            color: ${COLORS.goldenSand};
            margin: 0 0 0.75rem 0;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 800;
        `;
        header.appendChild(h2);

        const subtext = document.createElement('p');
        subtext.textContent = 'Bringing Jewish life to communities across rural Arizona';
        subtext.style.cssText = `
            color: ${COLORS.dustyMauve};
            font-size: 1.60rem;
            margin: 0;
        `;
        header.appendChild(subtext);
        section.appendChild(header);

        // Locations grid
        const grid = document.createElement('div');
        grid.className = 'cra-locations-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
        `;

        const locations = [
            { title: 'Payson / Rim Country', href: '/tools/feedback.asp' },
            { title: 'The White Mountains', href: '/tools/feedback.asp' },
            { title: 'Holbrook', href: '/templates/articlecco_cdo/aid/6532417/jewish/Jewish-Meetup-in-Holbrook.htm' },
            { title: 'Globe / Miami', href: '/templates/articlecco_cdo/aid/6532429/jewish/Jewish-Meetup-in-GlobeMiami.htm' },
            { title: 'Wherever You Are!', subtitle: 'Online Programs', href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm', overlay: 'teal' },
            { title: 'Request New Location', subtitle: 'Expand our reach', href: '/tools/feedback.asp', overlay: 'gold', isCta: true }
        ];

        locations.forEach(loc => {
            const card = document.createElement('a');
            card.href = loc.href;
            card.style.cssText = `
                position: relative;
                border-radius: 16px;
                overflow: hidden;
                aspect-ratio: 4/3;
                text-decoration: none;
                color: white;
                cursor: pointer;
                display: block;
            `;

            // Background
            const bg = document.createElement('div');
            let bgGradient = `linear-gradient(135deg, ${COLORS.dustyMauve}, ${COLORS.deepBurgundy})`;
            bg.style.cssText = `
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: ${bgGradient};
                transition: transform 0.5s ease;
            `;
            card.appendChild(bg);

            // Overlay
            const overlay = document.createElement('div');
            let overlayBg = `linear-gradient(180deg, rgba(114,47,55,0.2) 0%, rgba(114,47,55,0.8) 100%)`;
            if (loc.overlay === 'teal') {
                overlayBg = `linear-gradient(180deg, rgba(45,90,90,0.3) 0%, rgba(45,90,90,0.9) 100%)`;
            } else if (loc.overlay === 'gold') {
                overlayBg = `linear-gradient(135deg, ${COLORS.goldenSand} 0%, ${COLORS.sunsetOrange} 100%)`;
            }
            overlay.style.cssText = `
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: ${overlayBg};
                transition: opacity 0.3s ease;
                ${loc.overlay === 'gold' ? 'opacity: 0.95;' : ''}
            `;
            card.appendChild(overlay);

            // Content
            const content = document.createElement('div');
            content.style.cssText = `
                position: absolute;
                bottom: 0; left: 0; right: 0;
                padding: 1.5rem;
                z-index: 2;
            `;

            const title = document.createElement('h3');
            title.textContent = loc.title;
            title.style.cssText = `
                font-size: 1.35rem;
                font-weight: 700;
                color: ${loc.isCta ? COLORS.darkBurgundy : 'white'};
                margin: 0 0 0.25rem 0;
                text-shadow: ${loc.isCta ? 'none' : '0 2px 10px rgba(0,0,0,0.3)'};
                font-family: 'Urbanist', sans-serif;
            `;
            content.appendChild(title);

            if (loc.subtitle) {
                const sub = document.createElement('p');
                sub.textContent = loc.subtitle;
                sub.style.cssText = `
                    font-size: 0.9rem;
                    opacity: 0.9;
                    margin: 0;
                    color: ${loc.isCta ? COLORS.darkBurgundy : 'white'};
                `;
                content.appendChild(sub);
            }

            const arrow = document.createElement('span');
            arrow.textContent = '→';
            arrow.style.cssText = `
                position: absolute;
                bottom: 1.5rem;
                right: 1.5rem;
                font-size: 1.5rem;
                font-weight: 700;
                opacity: 0.7;
                transition: all 0.3s ease;
                color: ${loc.isCta ? COLORS.darkBurgundy : 'white'};
            `;
            card.appendChild(arrow);

            card.appendChild(content);
            grid.appendChild(card);

            // Hover effects
            card.addEventListener('mouseenter', () => {
                bg.style.transform = 'scale(1.1)';
                overlay.style.opacity = '0.7';
                arrow.style.transform = 'translateX(5px)';
                arrow.style.opacity = '1';
            });
            card.addEventListener('mouseleave', () => {
                bg.style.transform = 'scale(1)';
                overlay.style.opacity = loc.overlay === 'gold' ? '0.95' : '1';
                arrow.style.transform = 'translateX(0)';
                arrow.style.opacity = '0.7';
            });
        });

        section.appendChild(grid);
        return section;
    }

    // ===================================================================
    // CREATE ACTIONS SECTION
    // ===================================================================

    function createActions() {
        const section = document.createElement('section');
        section.className = 'cra-actions';
        section.style.cssText = `
            padding: 5rem 2rem;
            background: ${COLORS.deepBurgundy};
            font-family: 'Urbanist', sans-serif;
        `;

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            margin-bottom: 3rem;
        `;

        const h2 = document.createElement('h2');
        h2.textContent = 'I Would Like To...';
        h2.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            color: white;
            margin: 0 0 0.75rem 0;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 800;
        `;
        header.appendChild(h2);

        const subtext = document.createElement('p');
        subtext.textContent = 'How can we help you today?';
        subtext.style.cssText = `
            color: ${COLORS.sunsetPeach};
            font-size: 1.15rem;
            margin: 0;
        `;
        header.appendChild(subtext);
        section.appendChild(header);

        // Actions grid
        const grid = document.createElement('div');
        grid.className = 'cra-actions-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            max-width: 1000px;
            margin: 0 auto;
        `;

        const actions = [
            { icon: '❤️', title: 'Donate', desc: 'Support our mission across rural Arizona', href: '/4970020' },
            { icon: '🤝', title: 'Connect', desc: 'Get in touch with Rabbi Yaakov', href: '/tools/feedback.asp' },
            { icon: '✨', title: 'Get Involved', desc: 'Volunteer and make a difference', href: '/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm' },
            { icon: '📚', title: 'Learn Online', desc: 'Torah classes & Jewish education', href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm' }
        ];

        actions.forEach(action => {
            const card = document.createElement('a');
            card.href = action.href;
            card.style.cssText = `
                background: rgba(255,255,255,0.1);
                border: 2px solid rgba(255,255,255,0.2);
                border-radius: 16px;
                padding: 2rem;
                text-align: center;
                text-decoration: none;
                color: white;
                transition: all 0.3s ease;
                display: block;
            `;

            const icon = document.createElement('div');
            icon.textContent = action.icon;
            icon.style.cssText = `font-size: 3rem; margin-bottom: 1rem;`;
            card.appendChild(icon);

            const title = document.createElement('h3');
            title.textContent = action.title;
            title.style.cssText = `
                font-size: 1.3rem;
                margin: 0 0 0.5rem 0;
                color: white;
                font-family: 'Urbanist', sans-serif;
                font-weight: 700;
            `;
            card.appendChild(title);

            const desc = document.createElement('p');
            desc.textContent = action.desc;
            desc.style.cssText = `font-size: 0.9rem; opacity: 0.8; margin: 0;`;
            card.appendChild(desc);

            card.addEventListener('mouseenter', () => {
                card.style.background = 'rgba(255,255,255,0.2)';
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.background = 'rgba(255,255,255,0.1)';
                card.style.transform = 'translateY(0)';
            });

            grid.appendChild(card);
        });

        section.appendChild(grid);
        return section;
    }

    // ===================================================================
    // CREATE MOTTO SECTION
    // ===================================================================

    function createMotto() {
        const section = document.createElement('section');
        section.style.cssText = `
            background: ${COLORS.tealGreen};
            padding: 4rem 2rem;
            text-align: center;
            font-family: 'Urbanist', sans-serif;
        `;

        const h2 = document.createElement('h2');
        h2.textContent = '"Think Good and It Will Be Good"';
        h2.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: white;
            margin: 0 0 1rem 0;
        `;
        section.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = 'A message of hope and positivity from the Rebbe';
        p.style.cssText = `
            color: ${COLORS.warmCream};
            font-size: 1.2rem;
            margin: 0;
        `;
        section.appendChild(p);

        return section;
    }

    // ===================================================================
    // CREATE FOOTER
    // ===================================================================

    function createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'cra-footer';
        footer.style.cssText = `
            background: ${COLORS.darkBurgundy};
            color: ${COLORS.warmCream};
            padding: 4rem 2rem 2rem;
            font-family: 'Urbanist', sans-serif;
        `;

        const content = document.createElement('div');
        content.style.cssText = `max-width: 1200px; margin: 0 auto;`;

        // Main footer grid
        const main = document.createElement('div');
        main.className = 'cra-footer-main';
        main.style.cssText = `
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 3rem;
            padding-bottom: 3rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 2rem;
        `;

        // Brand column
        const brand = document.createElement('div');
        const brandTitle = document.createElement('h3');
        brandTitle.textContent = 'Chabad of Rural Arizona';
        brandTitle.style.cssText = `font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: white;`;
        brand.appendChild(brandTitle);

        const tagline = document.createElement('p');
        tagline.textContent = 'Bringing Jewish life across the desert';
        tagline.style.cssText = `opacity: 0.7; font-size: 1rem; margin-bottom: 1.5rem;`;
        brand.appendChild(tagline);

        // Social icons
        const social = document.createElement('div');
        social.className = 'cra-footer-social';
        social.style.cssText = `display: flex; gap: 1rem;`;

        const socialLinks = [
            { href: 'https://www.facebook.com/JewishRuralAZ', icon: 'FB' },
            { href: 'https://www.instagram.com/jewishruralaz', icon: 'IG' },
            { href: 'https://www.youtube.com/@jewishruralaz', icon: 'YT' }
        ];

        socialLinks.forEach(s => {
            const link = document.createElement('a');
            link.href = s.href;
            link.target = '_blank';
            link.textContent = s.icon;
            link.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                width: 44px;
                height: 44px;
                background: rgba(255,255,255,0.1);
                border-radius: 50%;
                color: ${COLORS.warmCream};
                transition: all 0.3s ease;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.8rem;
            `;
            link.addEventListener('mouseenter', () => {
                link.style.background = COLORS.goldenSand;
                link.style.color = COLORS.darkBurgundy;
            });
            link.addEventListener('mouseleave', () => {
                link.style.background = 'rgba(255,255,255,0.1)';
                link.style.color = COLORS.warmCream;
            });
            social.appendChild(link);
        });
        brand.appendChild(social);
        main.appendChild(brand);

        // Contact column
        const contact = document.createElement('div');
        const contactTitle = document.createElement('h4');
        contactTitle.textContent = 'Contact Us';
        contactTitle.style.cssText = `font-size: 1.1rem; margin-bottom: 1rem; color: ${COLORS.goldenSand};`;
        contact.appendChild(contactTitle);

        const contactInfo = [
            { text: '(970) 852-5416', href: 'tel:+19708525416' },
            { text: 'RabbiYaakov@JewishRuralAZ.org', href: 'mailto:RabbiYaakov@JewishRuralAZ.org' },
            { text: '6548 E. Sharon Dr, 85254' }
        ];

        contactInfo.forEach(info => {
            const p = document.createElement('p');
            p.style.cssText = `margin-bottom: 0.5rem; opacity: 0.8;`;
            if (info.href) {
                const a = document.createElement('a');
                a.href = info.href;
                a.textContent = info.text;
                a.style.cssText = `color: ${COLORS.warmCream}; text-decoration: none;`;
                p.appendChild(a);
            } else {
                p.textContent = info.text;
            }
            contact.appendChild(p);
        });
        main.appendChild(contact);

        // Links column
        const links = document.createElement('div');
        const linksTitle = document.createElement('h4');
        linksTitle.textContent = 'Quick Links';
        linksTitle.style.cssText = `font-size: 1.1rem; margin-bottom: 1rem; color: ${COLORS.goldenSand};`;
        links.appendChild(linksTitle);

        const quickLinks = [
            { text: 'About', href: '/6532283' },
            { text: 'Events', href: '/templates/articlecco_cdo/aid/6532340/jewish/Events.htm' },
            { text: 'Donate', href: '/4970020' },
            { text: 'Ask the Rabbi', href: '/asktherabbi/default_cdo/jewish/Ask-the-Rabbi.htm' }
        ];

        quickLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.style.cssText = `
                display: block;
                color: ${COLORS.warmCream};
                text-decoration: none;
                opacity: 0.8;
                margin-bottom: 0.5rem;
                transition: all 0.3s;
            `;
            a.addEventListener('mouseenter', () => {
                a.style.opacity = '1';
                a.style.color = COLORS.goldenSand;
            });
            a.addEventListener('mouseleave', () => {
                a.style.opacity = '0.8';
                a.style.color = COLORS.warmCream;
            });
            links.appendChild(a);
        });
        main.appendChild(links);

        content.appendChild(main);

        // Bottom
        const bottom = document.createElement('div');
        bottom.style.cssText = `text-align: center;`;
        const copyright = document.createElement('p');
        copyright.textContent = 'Chabad of Rural Arizona is a 501(c)(3) nonprofit organization, EIN 86-3663272 | Donations are tax-deductible';
        copyright.style.cssText = `font-size: 0.85rem; opacity: 0.6; margin-bottom: 0.5rem;`;
        bottom.appendChild(copyright);

        const privacy = document.createElement('a');
        privacy.href = '/4026210';
        privacy.textContent = 'Privacy Policy';
        privacy.style.cssText = `color: ${COLORS.warmCream}; opacity: 0.6; text-decoration: none;`;
        bottom.appendChild(privacy);

        content.appendChild(bottom);
        footer.appendChild(content);

        return footer;
    }

    // ===================================================================
    // CREATE HEADER (Inside Shadow DOM)
    // ===================================================================

    function createHeader() {
        const nav = document.createElement('nav');
        nav.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.97);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 1rem 3rem;
            z-index: 10000;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
            font-family: 'Urbanist', sans-serif;
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        // Logo with image and text
        const logo = document.createElement('a');
        logo.href = '/';
        logo.style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
            text-decoration: none;
        `;

        // Try to get the logo from the existing page with multiple selectors
        const logoSelectors = [
            '#header_branding img',
            '.branding-search img',
            '#header img',
            'img[src*="logo"]',
            '.logo img',
            '#logo img'
        ];

        let foundLogo = null;
        for (const selector of logoSelectors) {
            const img = document.querySelector(selector);
            if (img && img.src) {
                foundLogo = img.src;
                console.log('🖼️ Found logo at:', selector, foundLogo);
                break;
            }
        }

        if (foundLogo) {
            const logoImg = document.createElement('img');
            logoImg.src = foundLogo;
            logoImg.alt = 'Chabad Rural AZ';
            logoImg.style.cssText = `
                height: 65px;
                width: auto;
            `;
            logo.appendChild(logoImg);
        } else {
            // Fallback: Create a styled logo circle if no image found
            console.log('⚠️ No logo image found, using text fallback');
            const logoCircle = document.createElement('div');
            logoCircle.style.cssText = `
                width: 55px;
                height: 55px;
                background: linear-gradient(135deg, ${COLORS.sunsetPeach}, ${COLORS.deepBurgundy});
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
            `;
            logoCircle.textContent = '🌵';
            logo.appendChild(logoCircle);
        }

        // Logo text - BIGGER
        const logoText = document.createElement('span');
        logoText.textContent = 'Chabad Rural AZ';
        logoText.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: 2rem;
            font-weight: 800;
            color: ${COLORS.deepBurgundy};
        `;
        logo.appendChild(logoText);
        container.appendChild(logo);

        // Nav links container (desktop)
        const navLinks = document.createElement('ul');
        navLinks.className = 'cra-nav-links';
        navLinks.style.cssText = `
            display: flex;
            gap: 1.5rem;
            list-style: none;
            margin: 0;
            padding: 0;
        `;

        // Links with dropdown submenus
        const links = [
            {
                text: 'Classes',
                href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm',
                submenu: [
                    { text: 'Adult Education', href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm' },
                    { text: 'Torah Classes', href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm' },
                    { text: 'Hebrew School', href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm' }
                ]
            },
            {
                text: 'Events',
                href: '/templates/articlecco_cdo/aid/6532340/jewish/Events.htm',
                submenu: [
                    { text: 'Upcoming Events', href: '/templates/articlecco_cdo/aid/6532340/jewish/Events.htm' },
                    { text: 'Holiday Programs', href: '/templates/articlecco_cdo/aid/6532340/jewish/Events.htm' },
                    { text: 'Community Gatherings', href: '/templates/articlecco_cdo/aid/6532340/jewish/Events.htm' }
                ]
            },
            {
                text: 'Programs',
                href: '/templates/articlecco_cdo/aid/6812918/jewish/Programs-and-Projects.htm',
                submenu: [
                    { text: 'All Programs', href: '/templates/articlecco_cdo/aid/6812918/jewish/Programs-and-Projects.htm' },
                    { text: 'Youth Programs', href: '/templates/articlecco_cdo/aid/6812918/jewish/Programs-and-Projects.htm' },
                    { text: 'Senior Services', href: '/templates/articlecco_cdo/aid/6812918/jewish/Programs-and-Projects.htm' }
                ]
            },
            {
                text: 'Photos',
                href: '/templates/articlecco_cdo/aid/6531898/jewish/Photos.htm'
            },
            {
                text: 'Get Involved',
                href: '/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm',
                submenu: [
                    { text: 'Volunteer', href: '/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm' },
                    { text: 'Donate', href: '/4970020' },
                    { text: 'Partner With Us', href: '/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm' }
                ]
            },
            {
                text: 'About',
                href: '/6532283',
                submenu: [
                    { text: 'Our Mission', href: '/6532283' },
                    { text: 'Our Team', href: '/6532283' },
                    { text: 'Locations', href: '/6532283' }
                ]
            },
            {
                text: 'Contact',
                href: '/tools/feedback.asp'
            }
        ];

        links.forEach(link => {
            const li = document.createElement('li');
            li.style.cssText = `
                position: relative;
            `;

            const a = document.createElement('a');
            a.href = link.href;
            // Add arrow indicator if has submenu
            if (link.submenu) {
                a.innerHTML = `${link.text} <span style="font-size: 0.7rem; margin-left: 4px;">▼</span>`;
            } else {
                a.textContent = link.text;
            }
            a.style.cssText = `
                text-decoration: none;
                color: ${COLORS.darkBurgundy};
                font-weight: 500;
                font-size: 1.7rem;
                transition: color 0.3s;
                padding: 0.85rem 1.25rem;
                display: flex;
                align-items: center;
            `;

            // Create dropdown if submenu exists
            let dropdown = null;
            if (link.submenu) {
                dropdown = document.createElement('div');
                dropdown.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: white;
                    min-width: 220px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    border-radius: 12px;
                    padding: 0.75rem 0;
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
                        padding: 0.85rem 1.5rem;
                        color: ${COLORS.darkBurgundy};
                        text-decoration: none;
                        font-size: 1.05rem;
                        font-weight: 500;
                        transition: all 0.2s;
                    `;
                    subLink.addEventListener('mouseenter', () => {
                        subLink.style.background = COLORS.lightCream;
                        subLink.style.color = COLORS.tealGreen;
                    });
                    subLink.addEventListener('mouseleave', () => {
                        subLink.style.background = 'transparent';
                        subLink.style.color = COLORS.darkBurgundy;
                    });
                    dropdown.appendChild(subLink);
                });

                li.appendChild(dropdown);
            }

            // Hover events for main link and dropdown
            li.addEventListener('mouseenter', () => {
                a.style.color = COLORS.tealGreen;
                if (dropdown) {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.transform = 'translateY(0)';
                }
            });
            li.addEventListener('mouseleave', () => {
                a.style.color = COLORS.darkBurgundy;
                if (dropdown) {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateY(10px)';
                }
            });

            li.appendChild(a);
            navLinks.appendChild(li);
        });
        container.appendChild(navLinks);

        // Donate button - BIGGER
        const donate = document.createElement('a');
        donate.href = '/4970020';
        donate.textContent = 'Donate';
        donate.className = 'cra-donate-btn';
        donate.style.cssText = `
            background: ${COLORS.deepBurgundy};
            color: white;
            padding: 1.25rem 2.75rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.5rem;
            transition: all 0.3s;
        `;
        donate.addEventListener('mouseenter', () => donate.style.background = COLORS.tealGreen);
        donate.addEventListener('mouseleave', () => donate.style.background = COLORS.deepBurgundy);
        container.appendChild(donate);

        // Hamburger menu button (for mobile)
        const hamburger = document.createElement('button');
        hamburger.className = 'cra-hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        hamburger.style.cssText = `
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 10001;
        `;

        // Style hamburger lines
        hamburger.querySelectorAll('span').forEach(span => {
            span.style.cssText = `
                display: block;
                width: 28px;
                height: 3px;
                background: ${COLORS.deepBurgundy};
                border-radius: 2px;
                transition: all 0.3s;
            `;
        });
        container.appendChild(hamburger);

        // Mobile dropdown menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'cra-mobile-menu';
        mobileMenu.style.cssText = `
            display: none;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            padding: 1.5rem;
            z-index: 9999;
            flex-direction: column;
            gap: 0.5rem;
        `;

        // Add links to mobile menu
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.style.cssText = `
                text-decoration: none;
                color: ${COLORS.darkBurgundy};
                font-weight: 600;
                font-size: 1.25rem;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                transition: background 0.3s;
                display: block;
            `;
            a.addEventListener('mouseenter', () => a.style.background = COLORS.lightCream);
            a.addEventListener('mouseleave', () => a.style.background = 'transparent');
            mobileMenu.appendChild(a);
        });

        // Mobile donate button
        const mobileDonate = document.createElement('a');
        mobileDonate.href = '/4970020';
        mobileDonate.textContent = 'Donate';
        mobileDonate.style.cssText = `
            background: ${COLORS.deepBurgundy};
            color: white;
            padding: 1.25rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.2rem;
            text-align: center;
            margin-top: 1rem;
            display: block;
        `;
        mobileMenu.appendChild(mobileDonate);

        // Toggle mobile menu
        let menuOpen = false;
        hamburger.addEventListener('click', () => {
            menuOpen = !menuOpen;
            mobileMenu.style.display = menuOpen ? 'flex' : 'none';
            // Animate hamburger to X
            const spans = hamburger.querySelectorAll('span');
            if (menuOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        nav.appendChild(container);
        nav.appendChild(mobileMenu);

        // Add responsive styles
        const checkWidth = () => {
            const width = window.innerWidth;

            if (width <= 1024) {
                // Mobile/Tablet - show hamburger
                navLinks.style.display = 'none';
                donate.style.display = 'none';
                hamburger.style.display = 'flex';
            } else {
                // Desktop - show nav links
                navLinks.style.display = 'flex';
                donate.style.display = 'block';
                hamburger.style.display = 'none';
                mobileMenu.style.display = 'none';
                menuOpen = false;

                // Reset hamburger
                hamburger.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });

                // Responsive nav link sizes
                const navLinkElements = navLinks.querySelectorAll('a');
                if (width <= 1200) {
                    // Medium desktop (1025-1200px) - smaller navlinks
                    navLinks.style.gap = '0.75rem';
                    navLinkElements.forEach(link => {
                        link.style.fontSize = '1.3rem';
                        link.style.padding = '0.6rem 0.8rem';
                    });
                    donate.style.fontSize = '1.2rem';
                    donate.style.padding = '1rem 2rem';
                } else if (width <= 1400) {
                    // Large desktop (1201-1400px) - medium navlinks
                    navLinks.style.gap = '1rem';
                    navLinkElements.forEach(link => {
                        link.style.fontSize = '1.5rem';
                        link.style.padding = '0.75rem 1rem';
                    });
                    donate.style.fontSize = '1.35rem';
                    donate.style.padding = '1.1rem 2.25rem';
                } else {
                    // Extra large desktop (1400px+) - full size navlinks
                    navLinks.style.gap = '1.5rem';
                    navLinkElements.forEach(link => {
                        link.style.fontSize = '1.7rem';
                        link.style.padding = '0.85rem 1.25rem';
                    });
                    donate.style.fontSize = '1.5rem';
                    donate.style.padding = '1.25rem 2.75rem';
                }
            }
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);

        return nav;
    }

    // ===================================================================
    // HIDE CMS HEADER & CONTENT (CSS only)
    // ===================================================================

    function hideCMSElements() {
        const headerCSS = `
            /* Completely hide CMS header */
            #header {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                overflow: hidden !important;
            }

            /* Remove body padding since we handle our own header */
            body.cco_body {
                padding-top: 0 !important;
                background: ${COLORS.lightCream} !important;
            }

            /* Hide original content */
            .body_wrapper, .hp-table, #footer {
                display: none !important;
            }

            /* Reset containers */
            #BodyContainer, #co_content_container, .master-content-wrapper {
                background: transparent !important;
                max-width: none !important;
                width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }
        `;

        const style = document.createElement('style');
        style.id = 'cra-hide-cms';
        style.textContent = headerCSS;
        document.head.appendChild(style);
    }

    // ===================================================================
    // INITIALIZE
    // ===================================================================

    function init() {
        console.log('🏜️ Initializing Shadow DOM redesign...');

        // Load fonts
        loadFonts();

        // Hide CMS elements (header, footer, content)
        hideCMSElements();

        // Create shadow container
        const { host, shadow } = createShadowContainer();

        // Build content inside shadow DOM - header first!
        shadow.appendChild(createHeader());
        shadow.appendChild(createHero());
        shadow.appendChild(createLocations());
        shadow.appendChild(createActions());
        shadow.appendChild(createMotto());
        shadow.appendChild(createFooter());

        // Insert into page
        const bodyWrapper = document.querySelector('.body_wrapper');
        if (bodyWrapper) {
            bodyWrapper.parentNode.insertBefore(host, bodyWrapper);
        } else {
            document.body.appendChild(host);
        }

        console.log('✅ Shadow DOM redesign complete!');
        console.log('📋 All content is isolated from CMS styles');
    }

    // Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
