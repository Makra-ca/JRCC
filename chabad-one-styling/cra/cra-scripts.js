/* ===================================================================
   CHABAD RURAL ARIZONA - Homepage Redesign
   GitHub Hosted Version - For production use via CMS injection
   Using Shadow DOM + Inline Styles for complete isolation
   ===================================================================

   USAGE:
   Add this script tag to the CMS custom footer code:

   Option 1 - Vercel (instant updates):
   <script src="https://cra-github-hosted.vercel.app/cra-scripts.js"></script>

   Option 2 - jsDelivr CDN (cached, need to purge):
   <script src="https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@main/chabad-rural-arizona/github-hosted/cra-scripts.js"></script>
   Purge: https://purge.jsdelivr.net/gh/Makra-ca/JRCC@main/chabad-rural-arizona/github-hosted/cra-scripts.js

   DYNAMIC EXTRACTION:
   - Navigation links extracted from span.parent elements
   - Submenus from .co_submenu_container siblings
   - Location images matched by text patterns
   - Photo gallery extracted after "Latest Photos" heading
   - Footer contact/social links extracted via regex

   =================================================================== */

(function() {
    'use strict';

    // VERSION CHECK - helps verify correct script is running
    const SCRIPT_VERSION = '3.6-fix-load-spasm';
    console.log(`CRA Script Version: ${SCRIPT_VERSION}`);

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
    // MAIN/HOME PAGE - IMAGE CONFIGURATION
    // Route: / (jewishruralaz.org homepage)
    // For maintainability - configure location card images here
    // ===================================================================

    // Option A: Override with specific URLs (null = use auto-detect or fallback)
    const LOCATION_IMAGES = {
        'payson': null,
        'white mountains': null,
        'holbrook': null,
        'globe': null,
        'online': null,
        'request': null
    };

    // Option B: If auto-detect fails, use these fallback image indices
    // Run visual-debug.js in console to identify correct indices
    const LOCATION_IMAGE_INDEX = {
        'payson': null,
        'white mountains': null,
        'holbrook': null,
        'globe': null,
        'online': null,
        'request': null
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
        const host = document.createElement('div');
        host.id = 'cra-shadow-host';
        host.style.cssText = `
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
        `;

        const shadow = host.attachShadow({ mode: 'open' });

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap';
        shadow.appendChild(fontLink);

        // Load animation CSS from Vercel
        const animationLink = document.createElement('link');
        animationLink.rel = 'stylesheet';
        animationLink.href = 'https://cra-github-hosted.vercel.app/cra-styles.css';
        shadow.appendChild(animationLink);

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

            /* Slide-in animations (fallback if external CSS fails) */
            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-60px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(60px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .cra-animate { opacity: 0; }
            .cra-slide-left { animation: slideInLeft 0.8s ease-out forwards; }
            .cra-slide-right { animation: slideInRight 0.8s ease-out forwards; }

            /* Typewriter animation (fallback) */
            @keyframes typewriter {
                from { max-width: 0; }
                to { max-width: 100%; }
            }
            @keyframes blinkCursor {
                0%, 100% { border-color: currentColor; }
                50% { border-color: transparent; }
            }
            .cra-typewriter-cursor {
                overflow: hidden;
                white-space: nowrap;
                max-width: 0;
                width: fit-content;
                border-right: 3px solid currentColor;
                animation: typewriter 2.5s steps(30, end) forwards, blinkCursor 0.75s step-end infinite;
            }
            .cra-typewriter-cursor.typing-done { border-right: none; }

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
                    grid-template-columns: 1fr !important;
                    gap: 1.25rem !important;
                }
                .cra-photos-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
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
    // EXTRACT CAROUSEL IMAGES
    // ===================================================================

    function extractCarouselImages() {
        const images = [];
        const slider = document.querySelector('.promo_slider');

        if (!slider) {
            console.log('CRA: No .promo_slider found');
            return images;
        }

        // Find all elements with background images inside the slider
        slider.querySelectorAll('[style*="url"]').forEach(el => {
            const style = el.getAttribute('style') || '';
            const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
            if (match && match[1]) {
                const url = match[1];
                // Filter out spacer.gif and other non-content images
                if (!url.includes('spacer') &&
                    !url.includes('logo') &&
                    !url.includes('icon') &&
                    (url.includes('chabad.org/media') || url.includes('fbcdn'))) {
                    if (!images.includes(url)) {
                        images.push(url);
                    }
                }
            }
        });

        console.log(`CRA: Extracted ${images.length} carousel images`);
        return images;
    }

    // ===================================================================
    // EXTRACT ALL HERO SLIDES FROM CMS SLIDER
    // ===================================================================

    function extractAllHeroSlides() {
        const slides = [];

        const slider = document.querySelector('.promo_slider');
        if (!slider) {
            console.log('CRA: No .promo_slider found for text extraction');
            return slides;
        }

        // Chabad One uses li.cycle-html-caption for each slide's caption
        const captions = slider.querySelectorAll('li.cycle-html-caption');

        captions.forEach((caption, index) => {
            const slideData = {
                title: null,
                subtitle: null,
                ctaText: null,
                ctaLink: null
            };

            // Extract title from <big> tag
            const bigEl = caption.querySelector('big');
            if (bigEl) {
                slideData.title = bigEl.textContent.trim();
            }

            // Extract subtitle - text content excluding the <big> element
            const spanEl = caption.querySelector('span');
            if (spanEl) {
                // Clone the span and remove the big element to get just subtitle
                const spanClone = spanEl.cloneNode(true);
                const bigInClone = spanClone.querySelector('big');
                if (bigInClone) {
                    bigInClone.remove();
                }
                // Get remaining text, clean up whitespace
                let subtitleText = spanClone.textContent.trim();
                // Clean up multiple spaces/newlines
                subtitleText = subtitleText.replace(/\s+/g, ' ').trim();
                if (subtitleText) {
                    slideData.subtitle = subtitleText;
                }
            }

            // Extract CTA button
            const ctaEl = caption.querySelector('a.readMore, a[class*="btn"], a[class*="cta"]');
            if (ctaEl) {
                slideData.ctaText = ctaEl.textContent.trim();
                slideData.ctaLink = ctaEl.getAttribute('href');
                // Make relative links absolute
                if (slideData.ctaLink && !slideData.ctaLink.startsWith('http')) {
                    slideData.ctaLink = slideData.ctaLink.startsWith('/') ? slideData.ctaLink : '/' + slideData.ctaLink;
                }
            }

            slides.push(slideData);
            console.log(`CRA: Slide ${index + 1}:`, slideData);
        });

        console.log(`CRA: Extracted ${slides.length} hero slides`);
        return slides;
    }

    // Legacy function for backwards compatibility
    function extractHeroText() {
        const slides = extractAllHeroSlides();
        if (slides.length > 0) {
            return { title: slides[0].title, subtitle: slides[0].subtitle };
        }
        return { title: null, subtitle: null };
    }

    // ===================================================================
    // CREATE HERO SECTION
    // ===================================================================

    function createHero(carouselImages = [], heroSlides = []) {
        const hero = document.createElement('section');
        hero.className = 'cra-hero';
        hero.style.cssText = `
            min-height: 100vh;
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

        // Carousel container (behind content)
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'cra-carousel';
        carouselContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
        `;

        // Create slides
        const slides = [];
        const imagesToUse = carouselImages.length > 0 ? carouselImages : [];

        // Fallback gradient if no images
        if (imagesToUse.length === 0) {
            const fallbackSlide = document.createElement('div');
            fallbackSlide.style.cssText = `
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(180deg, #E8A87C 0%, #D4956A 20%, #C38D94 40%, #A67580 60%, #8B5A62 80%, #722F37 100%);
            `;
            carouselContainer.appendChild(fallbackSlide);
        } else {
            imagesToUse.forEach((imgUrl, index) => {
                const slide = document.createElement('div');
                slide.className = 'cra-carousel-slide';
                slide.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url('${imgUrl}');
                    background-size: cover;
                    background-position: center;
                    opacity: ${index === 0 ? '1' : '0'};
                    transition: opacity 1s ease-in-out;
                `;
                slides.push(slide);
                carouselContainer.appendChild(slide);
            });
        }

        // Dark overlay for text readability
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(
                180deg,
                rgba(0,0,0,0.5) 0%,
                rgba(0,0,0,0.55) 50%,
                rgba(74,31,36,0.8) 100%
            );
            z-index: 1;
        `;
        carouselContainer.appendChild(overlay);
        hero.appendChild(carouselContainer);

        // Content container (will hold text that transitions)
        const content = document.createElement('div');
        content.style.cssText = `
            position: relative;
            z-index: 2;
            max-width: 1000px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        `;

        // Get initial text from first slide or use defaults
        const firstSlide = heroSlides[0] || {};
        const defaultTitle = 'Chabad of Rural Arizona';
        const defaultSubtitle = 'Bringing Jewish life, learning, and warmth to every corner of the Arizona desert';

        const h1 = document.createElement('h1');
        h1.textContent = firstSlide.title || defaultTitle;
        h1.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(2.5rem, 8vw, 6rem);
            font-weight: 700;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5);
            margin: 0 0 1rem 0;
            padding: 0 1rem;
            line-height: 1.2;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            max-width: 95%;
            transition: opacity 0.5s ease;
            opacity: 0;
            animation: fadeInUp 0.8s ease-out 0.3s forwards;
        `;
        content.appendChild(h1);

        const subtitle = document.createElement('p');
        subtitle.className = 'cra-hero-subtitle';
        subtitle.textContent = firstSlide.subtitle || defaultSubtitle;
        subtitle.style.cssText = `
            font-size: clamp(1.25rem, 3.5vw, 2rem);
            color: white;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.4);
            margin: 0 0 1.5rem 0;
            padding: 0 1.5rem;
            opacity: 0;
            animation: fadeInUp 0.8s ease-out 0.5s forwards;
            font-weight: 400;
            max-width: 700px;
            line-height: 1.5;
            font-family: 'Urbanist', sans-serif;
            transition: opacity 0.5s ease;
        `;
        content.appendChild(subtitle);

        // Dynamic CTA button (changes per slide)
        const slideCta = document.createElement('a');
        slideCta.className = 'cra-slide-cta';
        if (firstSlide.ctaText && firstSlide.ctaLink) {
            slideCta.textContent = firstSlide.ctaText;
            slideCta.href = firstSlide.ctaLink;
            slideCta.style.cssText = `
                display: inline-block;
                background: ${COLORS.goldenSand};
                color: ${COLORS.darkBurgundy};
                padding: 1.25rem 3.5rem;
                border-radius: 50px;
                font-weight: 600;
                font-size: clamp(1.1rem, 2.5vw, 1.5rem);
                text-decoration: none;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                font-family: 'Urbanist', sans-serif;
                margin-top: 1rem;
                border: 2px solid ${COLORS.goldenSand};
            `;
        } else {
            slideCta.style.display = 'none';
        }
        slideCta.addEventListener('mouseenter', () => {
            slideCta.style.transform = 'translateY(-4px) scale(1.02)';
            slideCta.style.boxShadow = '0 12px 30px rgba(212, 168, 75, 0.5)';
        });
        slideCta.addEventListener('mouseleave', () => {
            slideCta.style.transform = 'translateY(0) scale(1)';
            slideCta.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
        content.appendChild(slideCta);

        // Carousel navigation dots and text sync
        if (slides.length > 1) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'cra-carousel-dots';
            dotsContainer.style.cssText = `
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 0.75rem;
                z-index: 3;
            `;

            let currentSlide = 0;
            let autoPlayInterval;

            // Function to update text content with fade effect
            const updateText = (index) => {
                const slideData = heroSlides[index] || {};

                // Fade out
                h1.style.opacity = '0';
                subtitle.style.opacity = '0';
                slideCta.style.opacity = '0';

                setTimeout(() => {
                    // Update content
                    h1.textContent = slideData.title || defaultTitle;
                    subtitle.textContent = slideData.subtitle || defaultSubtitle;

                    // Update CTA
                    if (slideData.ctaText && slideData.ctaLink) {
                        slideCta.textContent = slideData.ctaText;
                        slideCta.href = slideData.ctaLink;
                        slideCta.style.display = 'inline-block';
                    } else {
                        slideCta.style.display = 'none';
                    }

                    // Fade in
                    h1.style.opacity = '1';
                    subtitle.style.opacity = '1';
                    slideCta.style.opacity = '1';
                }, 500);
            };

            const goToSlide = (index) => {
                slides[currentSlide].style.opacity = '0';
                dots[currentSlide].style.background = 'rgba(255,255,255,0.4)';
                currentSlide = index;
                slides[currentSlide].style.opacity = '1';
                dots[currentSlide].style.background = 'white';

                // Sync text with image
                updateText(index);
            };

            const nextSlide = () => {
                goToSlide((currentSlide + 1) % slides.length);
            };

            const dots = [];
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.style.cssText = `
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid white;
                    background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.4)'};
                    cursor: pointer;
                    padding: 0;
                    transition: all 0.3s ease;
                `;
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    // Reset autoplay timer on manual navigation
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = setInterval(nextSlide, 5000);
                });
                dot.addEventListener('mouseenter', () => {
                    if (index !== currentSlide) {
                        dot.style.background = 'rgba(255,255,255,0.7)';
                    }
                });
                dot.addEventListener('mouseleave', () => {
                    if (index !== currentSlide) {
                        dot.style.background = 'rgba(255,255,255,0.4)';
                    }
                });
                dots.push(dot);
                dotsContainer.appendChild(dot);
            });

            hero.appendChild(dotsContainer);

            // Auto-rotate every 5 seconds
            autoPlayInterval = setInterval(nextSlide, 5000);

            // Pause on hover
            hero.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
            hero.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextSlide, 5000);
            });
        }

        hero.appendChild(content);

        // Hero animations and responsive styles
        const heroStyle = document.createElement('style');
        heroStyle.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @media (max-width: 768px) {
                .cra-hero {
                    min-height: 85vh !important;
                    padding: 4rem 1.5rem 3rem !important;
                }
            }
            @media (max-width: 480px) {
                .cra-hero {
                    min-height: 75vh !important;
                }
            }
        `;
        hero.appendChild(heroStyle);

        return hero;
    }

    // ===================================================================
    // CREATE LOCATIONS SECTION
    // ===================================================================

    function createLocations(imageData = { mapped: {}, fallback: [] }) {
        const section = document.createElement('section');
        section.id = 'cra-locations';
        section.className = 'cra-locations-section';
        section.style.cssText = `
            padding: 6rem 2rem;
            background: ${COLORS.lightCream};
            font-family: 'Urbanist', sans-serif;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            margin-bottom: 4rem;
        `;

        const h2 = document.createElement('h2');
        h2.textContent = 'Areas We Currently Serve';
        h2.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            color: ${COLORS.deepBurgundy};
            margin: 0 0 1rem 0;
            text-transform: uppercase;
            letter-spacing: 4px;
            font-weight: 600;
        `;
        header.appendChild(h2);

        const subtext = document.createElement('p');
        subtext.textContent = 'Bringing Jewish life to communities across rural Arizona';
        subtext.style.cssText = `
            color: ${COLORS.dustyMauve};
            font-size: 1.75rem;
            margin: 0;
            font-weight: 300;
        `;
        header.appendChild(subtext);
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'cra-locations-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
        `;

        const mapped = imageData.mapped || {};
        const fallback = imageData.fallback || [];
        let fallbackIndex = 0;

        const getImage = (key) => {
            if (LOCATION_IMAGES[key]) return LOCATION_IMAGES[key];
            const idx = LOCATION_IMAGE_INDEX[key];
            if (typeof idx === 'number' && idx >= 0 && fallback[idx]) return fallback[idx];
            if (mapped[key]) return mapped[key];
            if (fallbackIndex < fallback.length) return fallback[fallbackIndex++];
            return null;
        };

        const locations = [
            {
                title: 'Payson / Rim Country',
                href: '/tools/feedback.asp',
                image: getImage('payson')
            },
            {
                title: 'The White Mountains',
                href: '/tools/feedback.asp',
                image: getImage('white mountains')
            },
            {
                title: 'Holbrook',
                href: '/templates/articlecco_cdo/aid/6532417/jewish/Jewish-Meetup-in-Holbrook.htm',
                image: getImage('holbrook')
            },
            {
                title: 'Globe / Miami',
                href: '/templates/articlecco_cdo/aid/6532429/jewish/Jewish-Meetup-in-GlobeMiami.htm',
                image: getImage('globe')
            },
            {
                title: 'Wherever You Are!',
                subtitle: 'Online Programs',
                href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm',
                overlay: 'teal',
                image: getImage('online')
            },
            {
                title: 'Request New Location',
                subtitle: 'Expand our reach',
                href: '/tools/feedback.asp',
                overlay: 'gold',
                isCta: true,
                image: getImage('request')
            }
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

            const bg = document.createElement('div');
            let bgStyle = '';
            if (loc.image) {
                bgStyle = `
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background-image: url('${loc.image}');
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.5s ease;
                `;
            } else {
                bgStyle = `
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(135deg, ${COLORS.dustyMauve}, ${COLORS.deepBurgundy});
                    transition: transform 0.5s ease;
                `;
            }
            bg.style.cssText = bgStyle;
            card.appendChild(bg);

            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 100%);
                transition: opacity 0.3s ease;
            `;
            card.appendChild(overlay);

            const content = document.createElement('div');
            content.style.cssText = `
                position: absolute;
                bottom: 0; left: 0; right: 0;
                padding: 2rem;
                z-index: 2;
            `;

            const title = document.createElement('h3');
            title.textContent = loc.title;
            title.style.cssText = `
                font-size: 1.75rem;
                font-weight: 600;
                color: white;
                margin: 0 0 0.35rem 0;
                text-shadow: 0 2px 15px rgba(0,0,0,0.5);
                font-family: 'Urbanist', sans-serif;
            `;
            content.appendChild(title);

            if (loc.subtitle) {
                const sub = document.createElement('p');
                sub.textContent = loc.subtitle;
                sub.style.cssText = `
                    font-size: 1.1rem;
                    opacity: 0.9;
                    margin: 0;
                    font-weight: 400;
                    color: white;
                    text-shadow: 0 1px 8px rgba(0,0,0,0.4);
                `;
                content.appendChild(sub);
            }

            const arrow = document.createElement('span');
            arrow.textContent = '→';
            arrow.style.cssText = `
                position: absolute;
                bottom: 2rem;
                right: 2rem;
                font-size: 1.75rem;
                font-weight: 600;
                opacity: 0.7;
                transition: all 0.3s ease;
                color: white;
            `;
            card.appendChild(arrow);

            card.appendChild(content);
            grid.appendChild(card);

            card.addEventListener('mouseenter', () => {
                bg.style.transform = 'scale(1.1)';
                overlay.style.opacity = '0.7';
                arrow.style.transform = 'translateX(5px)';
                arrow.style.opacity = '1';
            });
            card.addEventListener('mouseleave', () => {
                bg.style.transform = 'scale(1)';
                overlay.style.opacity = '1';
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
            background: ${COLORS.lightCream};
            font-family: 'Urbanist', sans-serif;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            margin-bottom: 3rem;
        `;

        const h2 = document.createElement('h2');
        h2.textContent = 'Get Started';
        h2.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            color: ${COLORS.deepBurgundy};
            margin: 0 0 0.75rem 0;
            font-weight: 700;
        `;
        header.appendChild(h2);

        const subtext = document.createElement('p');
        subtext.textContent = 'Join our community and make a difference';
        subtext.style.cssText = `
            color: ${COLORS.dustyMauve};
            font-size: 1.15rem;
            margin: 0;
        `;
        header.appendChild(subtext);
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'cra-actions-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            max-width: 1000px;
            margin: 0 auto;
        `;

        const actions = [
            { title: 'Donate', desc: 'Support our mission across rural Arizona', href: '/4970020' },
            { title: 'Connect', desc: 'Get in touch with Rabbi Yaakov', href: '/tools/feedback.asp' },
            { title: 'Get Involved', desc: 'Volunteer and make a difference', href: '/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm' },
            { title: 'Learn Online', desc: 'Torah classes & Jewish education', href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm' }
        ];

        actions.forEach((action) => {
            const card = document.createElement('a');
            card.href = action.href;
            card.style.cssText = `
                background: white;
                border-radius: 16px;
                padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem);
                text-decoration: none;
                display: block;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            `;

            const title = document.createElement('h3');
            title.textContent = action.title;
            title.style.cssText = `
                font-size: clamp(1.75rem, 3vw, 2.5rem);
                margin: 0 0 1rem 0;
                color: ${COLORS.deepBurgundy};
                font-family: 'Urbanist', sans-serif;
                font-weight: 700;
            `;
            card.appendChild(title);

            const desc = document.createElement('p');
            desc.textContent = action.desc;
            desc.style.cssText = `
                font-size: clamp(1.1rem, 2vw, 1.5rem);
                color: ${COLORS.dustyMauve};
                margin: 0 0 1.5rem 0;
                line-height: 1.6;
            `;
            card.appendChild(desc);

            const arrow = document.createElement('span');
            arrow.textContent = '→';
            arrow.style.cssText = `
                font-size: clamp(1.5rem, 2.5vw, 2rem);
                color: ${COLORS.tealGreen};
                font-weight: 600;
                transition: transform 0.3s ease;
                display: inline-block;
            `;
            card.appendChild(arrow);

            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-6px)';
                card.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                arrow.style.transform = 'translateX(8px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                arrow.style.transform = 'translateX(0)';
            });

            grid.appendChild(card);
        });

        section.appendChild(grid);
        return section;
    }

    // ===================================================================
    // FETCH EVENTS FROM EVENTS PAGE
    // ===================================================================

    async function fetchEvents() {
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

            console.log('CRA: Fetched', events.length, 'events from events page');
            return events;
        } catch (error) {
            console.error('CRA: Failed to fetch events:', error);
            return [];
        }
    }

    // ===================================================================
    // CREATE ABOUT SECTION
    // ===================================================================

    // About section image - menorah lighting community gathering
    const ABOUT_IMAGE_URL = 'https://lh3.googleusercontent.com/d/1_u6rHCHVRycRr6iTjB1J4lPcxp-xdEtu';

    function createAbout() {
        const section = document.createElement('section');
        section.className = 'cra-about';
        section.style.cssText = `
            padding: 5rem 2rem;
            background: white;
            font-family: 'Urbanist', sans-serif;
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            max-width: 1100px;
            margin: 0 auto;
        `;

        const h2 = document.createElement('h2');
        h2.textContent = 'About Us';
        h2.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            color: ${COLORS.deepBurgundy};
            margin: 0 0 2rem 0;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
        `;
        container.appendChild(h2);

        // Content wrapper for text wrap effect
        const contentWrapper = document.createElement('div');
        contentWrapper.style.cssText = `
            overflow: hidden;
        `;

        // Image floated to the right
        const imageWrapper = document.createElement('div');
        imageWrapper.style.cssText = `
            float: right;
            width: 45%;
            max-width: 450px;
            margin: 0 0 1.5rem 2rem;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        `;

        const img = document.createElement('img');
        img.src = ABOUT_IMAGE_URL;
        img.alt = 'Community gathering at menorah lighting ceremony';
        img.style.cssText = `
            width: 100%;
            height: auto;
            display: block;
        `;
        imageWrapper.appendChild(img);
        contentWrapper.appendChild(imageWrapper);

        // Text paragraphs that wrap around the image
        const text1 = document.createElement('p');
        text1.textContent = "Chabad of Rural Arizona serves Jewish individuals and families across Arizona's smaller towns and remote communities with warmth, authenticity, and pride.";
        text1.style.cssText = `
            font-size: clamp(17px, 2.2vw, 20px);
            line-height: 1.6;
            color: ${COLORS.darkBurgundy};
            margin: 0 0 1rem 0;
            font-weight: 400;
            text-align: left;
        `;
        contentWrapper.appendChild(text1);

        const text2 = document.createElement('p');
        text2.textContent = "We provide Jewish education, holiday celebrations, spiritual guidance, and community connection—bringing Judaism to people wherever they are, geographically and personally.";
        text2.style.cssText = `
            font-size: clamp(17px, 2.2vw, 20px);
            line-height: 1.6;
            color: ${COLORS.darkBurgundy};
            margin: 0 0 1rem 0;
            font-weight: 400;
            text-align: left;
        `;
        contentWrapper.appendChild(text2);

        const text3 = document.createElement('p');
        text3.textContent = "From public events and classes to one-on-one support and outreach on the road, our mission is simple: to strengthen Jewish life and illuminate every corner of rural Arizona.";
        text3.style.cssText = `
            font-size: clamp(17px, 2.2vw, 20px);
            line-height: 1.6;
            color: ${COLORS.darkBurgundy};
            margin: 0 0 1rem 0;
            font-weight: 400;
            text-align: left;
        `;
        contentWrapper.appendChild(text3);

        container.appendChild(contentWrapper);

        // Button centered below
        const btnWrapper = document.createElement('div');
        btnWrapper.style.cssText = `
            text-align: center;
            clear: both;
            padding-top: 1rem;
        `;

        const btn = document.createElement('a');
        btn.href = '/about';
        btn.textContent = 'Learn More About Us';
        btn.style.cssText = `
            display: inline-block;
            background: transparent;
            color: ${COLORS.deepBurgundy};
            border: 2px solid ${COLORS.deepBurgundy};
            padding: 16px 40px;
            border-radius: 50px;
            font-size: clamp(16px, 2vw, 18px);
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            font-family: 'Urbanist', sans-serif;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.background = COLORS.deepBurgundy;
            btn.style.color = 'white';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'transparent';
            btn.style.color = COLORS.deepBurgundy;
        });

        btnWrapper.appendChild(btn);
        container.appendChild(btnWrapper);

        section.appendChild(container);

        // Responsive adjustments
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .cra-about div[style*="float: right"] {
                    float: none !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    margin: 0 0 1.5rem 0 !important;
                }
            }
        `;
        section.appendChild(style);

        return section;
    }

    // ===================================================================
    // CREATE EVENTS SECTION
    // ===================================================================

    function createEvents(events = []) {
        const section = document.createElement('section');
        section.className = 'cra-events';
        section.style.cssText = `
            padding: 5rem 2rem;
            background: ${COLORS.lightCream};
            font-family: 'Urbanist', sans-serif;
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            max-width: 1200px;
            margin: 0 auto;
        `;

        // Section title
        const h2 = document.createElement('h2');
        h2.textContent = 'Upcoming Events';
        h2.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(28px, 5vw, 42px);
            color: ${COLORS.deepBurgundy};
            margin: 0 0 1rem 0;
            font-weight: 700;
            text-align: center;
        `;
        container.appendChild(h2);

        // Subtitle
        const subtitle = document.createElement('p');
        subtitle.textContent = 'Join us for meaningful Jewish experiences across Rural Arizona';
        subtitle.style.cssText = `
            font-size: clamp(16px, 2.5vw, 20px);
            color: ${COLORS.darkBurgundy};
            text-align: center;
            margin-bottom: 3rem;
            opacity: 0.8;
        `;
        container.appendChild(subtitle);

        if (events.length === 0) {
            // No events message
            const noEvents = document.createElement('p');
            noEvents.textContent = 'No upcoming events at this time. Check back soon!';
            noEvents.style.cssText = `
                text-align: center;
                color: ${COLORS.darkBurgundy};
                font-size: 18px;
                padding: 2rem;
            `;
            container.appendChild(noEvents);
        } else {
            // Events grid
            const grid = document.createElement('div');
            grid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 24px;
            `;

            // Show up to 4 events
            events.slice(0, 4).forEach(event => {
                const card = document.createElement('a');
                card.href = event.link;
                card.style.cssText = `
                    display: block;
                    background: white;
                    border-radius: 16px;
                    padding: 28px;
                    text-decoration: none;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                `;

                // Date badge
                if (event.date) {
                    const dateBadge = document.createElement('span');
                    dateBadge.textContent = event.date;
                    dateBadge.style.cssText = `
                        display: inline-block;
                        background: ${COLORS.tealGreen};
                        color: white;
                        font-size: 13px;
                        font-weight: 600;
                        padding: 6px 14px;
                        border-radius: 20px;
                        margin-bottom: 16px;
                    `;
                    card.appendChild(dateBadge);
                }

                // Event title
                const title = document.createElement('h3');
                title.textContent = event.title;
                title.style.cssText = `
                    font-size: clamp(18px, 3vw, 24px);
                    color: ${COLORS.deepBurgundy};
                    margin: 0 0 12px 0;
                    font-weight: 700;
                `;
                card.appendChild(title);

                // Event description
                if (event.description) {
                    const desc = document.createElement('p');
                    desc.textContent = event.description.length > 120
                        ? event.description.substring(0, 120) + '...'
                        : event.description;
                    desc.style.cssText = `
                        color: ${COLORS.darkBurgundy};
                        line-height: 1.6;
                        font-size: 15px;
                        margin: 0 0 16px 0;
                        opacity: 0.85;
                    `;
                    card.appendChild(desc);
                }

                // Register link
                const registerLink = document.createElement('span');
                registerLink.textContent = 'Learn More →';
                registerLink.style.cssText = `
                    color: ${COLORS.sunsetPeach};
                    font-weight: 600;
                    font-size: 15px;
                `;
                card.appendChild(registerLink);

                // Hover effects
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-6px)';
                    card.style.boxShadow = '0 12px 35px rgba(0,0,0,0.12)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                });

                grid.appendChild(card);
            });

            // Responsive grid for mobile
            const styleTag = document.createElement('style');
            styleTag.textContent = `
                @media (max-width: 768px) {
                    .cra-events > div > div {
                        grid-template-columns: 1fr !important;
                    }
                }
            `;
            section.appendChild(styleTag);

            container.appendChild(grid);
        }

        // View all events button
        const btnWrap = document.createElement('div');
        btnWrap.style.cssText = 'text-align: center; margin-top: 2.5rem;';

        const btn = document.createElement('a');
        btn.href = '/tools/events/default.htm';
        btn.textContent = 'View All Events';
        btn.style.cssText = `
            display: inline-block;
            background: ${COLORS.deepBurgundy};
            color: ${COLORS.warmCream};
            padding: 16px 40px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            font-family: 'Urbanist', sans-serif;
        `;
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
            btn.style.boxShadow = '0 10px 30px rgba(114, 47, 55, 0.3)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        });

        btnWrap.appendChild(btn);
        container.appendChild(btnWrap);

        section.appendChild(container);
        return section;
    }

    // ===================================================================
    // PHOTO CONFIGURATION
    // ===================================================================

    const PHOTO_GALLERY_URLS = null;
    const PHOTO_GALLERY_INDICES = null;

    function extractPhotos() {
        const photos = [];
        const seen = new Set();

        const extractBgUrl = (el) => {
            const style = el.getAttribute('style') || '';
            const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
            return match ? match[1] : null;
        };

        const isGoodPhoto = (url) => {
            if (!url) return false;
            return (url.includes('chabad.org/media/images') || url.includes('fbcdn.net')) &&
                   !url.includes('spacer') && !url.includes('logo') && !url.includes('icon') &&
                   !url.includes('button') && !url.includes('arrow');
        };

        if (PHOTO_GALLERY_URLS && Array.isArray(PHOTO_GALLERY_URLS)) {
            return PHOTO_GALLERY_URLS.slice(0, 8);
        }

        const allBgImages = [];
        document.querySelectorAll('[style*="url"]').forEach(el => {
            const bgUrl = extractBgUrl(el);
            if (bgUrl && isGoodPhoto(bgUrl) && !seen.has(bgUrl)) {
                seen.add(bgUrl);
                allBgImages.push(bgUrl);
            }
        });

        if (PHOTO_GALLERY_INDICES && Array.isArray(PHOTO_GALLERY_INDICES)) {
            PHOTO_GALLERY_INDICES.forEach(idx => {
                if (allBgImages[idx]) {
                    photos.push(allBgImages[idx]);
                }
            });
            return photos.slice(0, 8);
        }

        let photoHeadingEl = null;
        let photoHeadingIndex = -1;

        const allElements = Array.from(document.querySelectorAll('*'));

        for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i];
            const text = el.textContent.trim().toLowerCase();
            if (text === 'latest photos' && el.children.length <= 1) {
                photoHeadingEl = el;
                photoHeadingIndex = i;
                break;
            }
        }

        if (photoHeadingEl) {
            let foundCount = 0;
            for (let i = photoHeadingIndex + 1; i < allElements.length && foundCount < 12; i++) {
                const el = allElements[i];
                if (el.tagName === 'FOOTER' || el.id === 'footer' ||
                    el.className.includes('footer') || el.className.includes('cra-')) {
                    break;
                }
                const bgUrl = extractBgUrl(el);
                if (bgUrl && isGoodPhoto(bgUrl) && !photos.includes(bgUrl)) {
                    photos.push(bgUrl);
                    foundCount++;
                }
            }
        }

        if (photos.length < 4) {
            const galleryPhotos = allBgImages.slice(6, 14);
            galleryPhotos.forEach(url => {
                if (!photos.includes(url)) photos.push(url);
            });
        }

        return photos.slice(0, 8);
    }

    // ===================================================================
    // CREATE PHOTOS SECTION
    // ===================================================================

    function createPhotos(photoUrls = []) {
        const section = document.createElement('section');
        section.className = 'cra-photos';
        section.style.cssText = `
            padding: 5rem 2rem;
            background: white;
            font-family: 'Urbanist', sans-serif;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            margin-bottom: 3rem;
        `;

        const h2 = document.createElement('h2');
        h2.textContent = 'Latest Photos';
        h2.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            color: ${COLORS.deepBurgundy};
            margin: 0 0 0.75rem 0;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
        `;
        header.appendChild(h2);

        const subtext = document.createElement('p');
        subtext.textContent = 'Moments from our community';
        subtext.style.cssText = `
            color: ${COLORS.dustyMauve};
            font-size: 1.15rem;
            margin: 0;
        `;
        header.appendChild(subtext);
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'cra-photos-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto 3rem;
        `;

        const photosToShow = photoUrls.length > 0 ? photoUrls : [];

        if (photosToShow.length === 0) {
            const noPhotos = document.createElement('p');
            noPhotos.textContent = 'Photos loading...';
            noPhotos.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                color: ${COLORS.dustyMauve};
                padding: 3rem;
            `;
            grid.appendChild(noPhotos);
        } else {
            photosToShow.forEach((photoUrl) => {
                const photoCard = document.createElement('div');
                photoCard.style.cssText = `
                    aspect-ratio: 1;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    position: relative;
                `;

                const img = document.createElement('div');
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background-image: url('${photoUrl}');
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.4s ease;
                `;
                photoCard.appendChild(img);

                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(114,47,55,0);
                    transition: background 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;

                const zoomIcon = document.createElement('span');
                zoomIcon.textContent = '+';
                zoomIcon.style.cssText = `
                    font-size: 3rem;
                    color: white;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    font-weight: 300;
                `;
                overlay.appendChild(zoomIcon);
                photoCard.appendChild(overlay);

                photoCard.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.1)';
                    overlay.style.background = 'rgba(114,47,55,0.4)';
                    zoomIcon.style.opacity = '1';
                });
                photoCard.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                    overlay.style.background = 'rgba(114,47,55,0)';
                    zoomIcon.style.opacity = '0';
                });

                photoCard.addEventListener('click', () => {
                    window.open(photoUrl, '_blank');
                });

                grid.appendChild(photoCard);
            });
        }

        section.appendChild(grid);

        const btnWrap = document.createElement('div');
        btnWrap.style.cssText = `text-align: center;`;

        const btn = document.createElement('a');
        btn.href = '/templates/articlecco_cdo/aid/6531898/jewish/Photos.htm';
        btn.textContent = 'See More Photos';
        btn.style.cssText = `
            display: inline-block;
            background: transparent;
            color: ${COLORS.deepBurgundy};
            border: 2px solid ${COLORS.deepBurgundy};
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            font-family: 'Urbanist', sans-serif;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.background = COLORS.deepBurgundy;
            btn.style.color = 'white';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'transparent';
            btn.style.color = COLORS.deepBurgundy;
        });

        btnWrap.appendChild(btn);
        section.appendChild(btnWrap);

        return section;
    }

    // ===================================================================
    // EXTRACT NAVIGATION LINKS
    // ===================================================================

    function extractNavLinks() {
        const navLinks = [];
        const seen = new Set();

        const parentSpans = document.querySelectorAll('span.parent');

        parentSpans.forEach((span) => {
            const link = span.querySelector('a');
            if (!link) return;

            // Use innerText to preserve spaces between nested elements
            const text = (link.innerText || link.textContent).replace(/\s+/g, ' ').trim();
            const href = link.getAttribute('href');

            if (!text || seen.has(text) || text.toLowerCase() === 'home' || text.toLowerCase() === 'donate') return;
            seen.add(text);

            const item = { text, href, submenu: [] };

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
                            }
                        });
                        break;
                    }
                }

                if (item.submenu.length > 0) break;
                searchEl = parent;
            }

            navLinks.push(item);
        });

        if (navLinks.length === 0) {
            return [
                { text: 'Adult Education', href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm', submenu: [] },
                { text: 'Events', href: '/templates/articlecco_cdo/aid/6532340/jewish/Events.htm', submenu: [] },
                { text: 'Programs and Projects', href: '/templates/articlecco_cdo/aid/6812918/jewish/Programs-and-Projects.htm', submenu: [] },
                { text: 'Photos', href: '/templates/articlecco_cdo/aid/6531898/jewish/Photos.htm', submenu: [] },
                { text: 'Get Involved', href: '/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm', submenu: [] }
            ];
        }

        return navLinks;
    }

    // ===================================================================
    // EXTRACT FOOTER DATA
    // ===================================================================

    function extractFooterData() {
        const footerData = {
            contact: { phone: null, email: null, address: null },
            social: [],
            links: [],
            copyright: null
        };

        const footer = document.querySelector('#footer, footer, [id*="footer"], .footer');
        const footerText = footer ? footer.textContent : document.body.textContent;

        const phoneMatch = footerText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
        if (phoneMatch) {
            const phoneNum = phoneMatch[0];
            footerData.contact.phone = { text: phoneNum, href: 'tel:+1' + phoneNum.replace(/\D/g, '') };
        }

        const emailMatch = footerText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (emailMatch) {
            footerData.contact.email = { text: emailMatch[0], href: 'mailto:' + emailMatch[0] };
        }

        const addressMatch = footerText.match(/\d+\s+[A-Za-z].*?(?:Dr|Drive|St|Street|Ave|Avenue|Rd|Road|Blvd|Way|Lane|Ln)[.,]?\s*(?:\d{5})?/i);
        if (addressMatch) footerData.contact.address = addressMatch[0].trim();

        const socialPatterns = [
            { pattern: /facebook\.com/i, icon: 'FB', name: 'Facebook' },
            { pattern: /instagram\.com/i, icon: 'IG', name: 'Instagram' },
            { pattern: /youtube\.com|youtu\.be/i, icon: 'YT', name: 'YouTube' },
            { pattern: /whatsapp\.com|wa\.me/i, icon: 'WA', name: 'WhatsApp' },
            { pattern: /twitter\.com|x\.com/i, icon: 'X', name: 'Twitter' },
            { pattern: /linkedin\.com/i, icon: 'LI', name: 'LinkedIn' }
        ];

        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href') || '';
            for (const social of socialPatterns) {
                if (social.pattern.test(href) && !footerData.social.find(s => s.icon === social.icon)) {
                    footerData.social.push({ href, icon: social.icon, name: social.name });
                    break;
                }
            }
        });

        if (footer) {
            footer.querySelectorAll('a').forEach(link => {
                const href = link.getAttribute('href') || '';
                const text = link.textContent.trim();
                if (href.startsWith('tel:') || href.startsWith('mailto:') ||
                    href.includes('facebook') || href.includes('instagram') ||
                    href.includes('youtube') || href.includes('twitter') ||
                    href.includes('whatsapp') || href.includes('chabad.org') ||
                    href.includes('subscribe') || !text || text.length > 50 || text.length < 2) return;
                if (footerData.links.find(l => l.href === href || l.text === text)) return;
                footerData.links.push({ text, href });
            });
        }

        const einMatch = footerText.match(/501\(c\)\(3\)[^|]*EIN\s*\d{2}-?\d{7}/i) || footerText.match(/EIN\s*\d{2}-?\d{7}/i);
        if (einMatch) {
            const fullMatch = footerText.match(/[^|]*501\(c\)\(3\)[^|]*/i);
            footerData.nonprofit = fullMatch ? fullMatch[0].trim() : einMatch[0].trim();
        }

        if (footer) {
            const privacyLink = footer.querySelector('a[href*="privacy"], a[href*="Privacy"]');
            if (privacyLink) {
                footerData.privacyPolicy = { text: privacyLink.textContent.trim(), href: privacyLink.getAttribute('href') };
            }
        }

        return footerData;
    }

    // ===================================================================
    // CREATE FOOTER
    // ===================================================================

    function createFooter(footerData = {}) {
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

        const brand = document.createElement('div');
        const brandTitle = document.createElement('h3');
        brandTitle.textContent = 'Chabad of Rural Arizona';
        brandTitle.style.cssText = `font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: white;`;
        brand.appendChild(brandTitle);

        const tagline = document.createElement('p');
        tagline.textContent = 'Bringing Jewish life across the desert';
        tagline.style.cssText = `opacity: 0.7; font-size: 1rem; margin-bottom: 1.5rem;`;
        brand.appendChild(tagline);

        const social = document.createElement('div');
        social.className = 'cra-footer-social';
        social.style.cssText = `display: flex; gap: 1rem;`;

        const socialLinks = (footerData.social && footerData.social.length > 0) ? footerData.social : [
            { href: 'https://www.facebook.com/JewishRuralAZ', icon: 'FB' },
            { href: 'https://www.instagram.com/jewishruralaz', icon: 'IG' },
            { href: 'https://www.youtube.com/@jewishruralaz', icon: 'YT' }
        ];

        const socialIcons = {
            FB: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
            IG: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
            YT: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
            WA: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
            X: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
            LI: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
        };

        socialLinks.forEach(s => {
            const link = document.createElement('a');
            link.href = s.href;
            link.target = '_blank';
            link.innerHTML = socialIcons[s.icon] || s.icon;
            link.title = s.name || s.icon;
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

        const contact = document.createElement('div');
        const contactTitle = document.createElement('h4');
        contactTitle.textContent = 'Contact Us';
        contactTitle.style.cssText = `font-size: 1.1rem; margin-bottom: 1rem; color: ${COLORS.goldenSand};`;
        contact.appendChild(contactTitle);

        const contactInfo = [];
        const c = footerData.contact || {};

        if (c.phone) {
            contactInfo.push({ text: c.phone.text, href: c.phone.href });
        } else {
            contactInfo.push({ text: '(970) 852-5416', href: 'tel:+19708525416' });
        }

        if (c.email) {
            contactInfo.push({ text: c.email.text, href: c.email.href });
        } else {
            contactInfo.push({ text: 'RabbiYaakov@JewishRuralAZ.org', href: 'mailto:RabbiYaakov@JewishRuralAZ.org' });
        }

        if (c.address) {
            contactInfo.push({ text: c.address });
        } else {
            contactInfo.push({ text: '6548 E. Sharon Dr, 85254' });
        }

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

        const links = document.createElement('div');
        const linksTitle = document.createElement('h4');
        linksTitle.textContent = 'Quick Links';
        linksTitle.style.cssText = `font-size: 1.1rem; margin-bottom: 1rem; color: ${COLORS.goldenSand};`;
        links.appendChild(linksTitle);

        const quickLinks = (footerData.links && footerData.links.length > 0) ? footerData.links.slice(0, 6) : [
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

        const bottom = document.createElement('div');
        bottom.style.cssText = `text-align: center;`;
        const copyright = document.createElement('p');

        const nonprofitText = footerData.nonprofit ||
            'Chabad of Rural Arizona is a 501(c)(3) nonprofit organization, EIN 86-3663272 | Donations are tax-deductible';
        copyright.textContent = nonprofitText;
        copyright.style.cssText = `font-size: 0.85rem; opacity: 0.6; margin-bottom: 0.5rem;`;
        bottom.appendChild(copyright);

        const privacy = document.createElement('a');
        privacy.href = footerData.privacyPolicy?.href || '/4026210';
        privacy.textContent = footerData.privacyPolicy?.text || 'Privacy Policy';
        privacy.style.cssText = `color: ${COLORS.warmCream}; opacity: 0.6; text-decoration: none;`;
        bottom.appendChild(privacy);

        content.appendChild(bottom);
        footer.appendChild(content);

        return footer;
    }

    // ===================================================================
    // CREATE HEADER
    // ===================================================================

    function createHeader(extractedNavLinks) {
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

        const logo = document.createElement('a');
        logo.href = '/';
        logo.style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
            text-decoration: none;
        `;

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
                break;
            }
        }

        if (foundLogo) {
            const logoImg = document.createElement('img');
            logoImg.src = foundLogo;
            logoImg.alt = 'Chabad Rural AZ';
            logoImg.style.cssText = `height: 65px; width: auto;`;
            logo.appendChild(logoImg);
        } else {
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

        container.appendChild(logo);

        const navLinks = document.createElement('ul');
        navLinks.className = 'cra-nav-links';
        navLinks.style.cssText = `
            display: flex;
            gap: 1.5rem;
            list-style: none;
            margin: 0;
            padding: 0;
        `;

        extractedNavLinks.forEach(link => {
            const li = document.createElement('li');
            li.style.cssText = `position: relative;`;

            const a = document.createElement('a');
            a.href = link.href;
            const hasSubmenu = link.submenu && link.submenu.length > 0;
            if (hasSubmenu) {
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

            let dropdown = null;
            if (hasSubmenu) {
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

        extractedNavLinks.forEach(link => {
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

        let menuOpen = false;
        hamburger.addEventListener('click', () => {
            menuOpen = !menuOpen;
            mobileMenu.style.display = menuOpen ? 'flex' : 'none';
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

        const checkWidth = () => {
            const width = window.innerWidth;

            if (width <= 1024) {
                navLinks.style.display = 'none';
                donate.style.display = 'none';
                hamburger.style.display = 'flex';
            } else {
                navLinks.style.display = 'flex';
                donate.style.display = 'block';
                hamburger.style.display = 'none';
                mobileMenu.style.display = 'none';
                menuOpen = false;

                hamburger.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });

                const navLinkElements = navLinks.querySelectorAll('a');
                if (width <= 1200) {
                    navLinks.style.gap = '0.75rem';
                    navLinkElements.forEach(link => {
                        link.style.fontSize = '1.3rem';
                        link.style.padding = '0.6rem 0.8rem';
                    });
                    donate.style.fontSize = '1.2rem';
                    donate.style.padding = '1rem 2rem';
                } else if (width <= 1400) {
                    navLinks.style.gap = '1rem';
                    navLinkElements.forEach(link => {
                        link.style.fontSize = '1.5rem';
                        link.style.padding = '0.75rem 1rem';
                    });
                    donate.style.fontSize = '1.35rem';
                    donate.style.padding = '1.1rem 2.25rem';
                } else {
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
    // HIDE CMS ELEMENTS
    // ===================================================================

    // Hide only header/footer (for subpages - keeps main content visible)
    function hideHeaderFooterOnly() {
        const css = `
            #header {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                overflow: hidden !important;
            }

            body.cco_body {
                padding-top: 0 !important;
            }

            #footer {
                display: none !important;
            }
        `;

        const style = document.createElement('style');
        style.id = 'cra-hide-header-footer';
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Hide all CMS elements (for homepage - full redesign)
    function hideAllCMSElements() {
        const css = `
            #header {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                overflow: hidden !important;
            }

            body.cco_body {
                padding-top: 0 !important;
                background: ${COLORS.lightCream} !important;
            }

            .body_wrapper, .hp-table, #footer {
                display: none !important;
            }

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
        style.textContent = css;
        document.head.appendChild(style);
    }

    // ===================================================================
    // EXTRACT IMAGES
    // ===================================================================

    let extractedImages = {};

    function extractOriginalImages() {
        const locationImages = {
            'payson': null,
            'white mountains': null,
            'holbrook': null,
            'globe': null,
            'online': null,
            'request': null
        };

        const isGoodImage = (url) => {
            if (!url) return false;
            return (url.includes('chabad.org/media/images') || url.includes('fbcdn.net')) &&
                   !url.includes('spacer') && !url.includes('logo') && !url.includes('icon');
        };

        const extractBgUrl = (el) => {
            const style = el.getAttribute('style') || '';
            const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
            return match ? match[1] : null;
        };

        const locationPatterns = [
            { key: 'payson', pattern: /payson|rim\s*country/i },
            { key: 'white mountains', pattern: /white\s*mountain/i },
            { key: 'holbrook', pattern: /holbrook/i },
            { key: 'globe', pattern: /globe|miami/i },
            { key: 'online', pattern: /wherever\s*you|online|virtual/i },
            { key: 'request', pattern: /request\s*(a\s*)?new\s*location|new\s*location|expand/i }
        ];

        const allLinks = document.querySelectorAll('a');

        allLinks.forEach(link => {
            const linkText = link.textContent.trim().toLowerCase();

            for (const loc of locationPatterns) {
                if (loc.pattern.test(linkText) && !locationImages[loc.key]) {
                    let el = link;
                    for (let i = 0; i < 6 && el; i++) {
                        const bgUrl = extractBgUrl(el);
                        if (bgUrl && isGoodImage(bgUrl)) {
                            locationImages[loc.key] = bgUrl;
                            break;
                        }
                        if (el.parentElement) {
                            const siblings = el.parentElement.querySelectorAll('[style*="url"]');
                            for (const sib of siblings) {
                                const sibBg = extractBgUrl(sib);
                                if (sibBg && isGoodImage(sibBg)) {
                                    locationImages[loc.key] = sibBg;
                                    break;
                                }
                            }
                            if (locationImages[loc.key]) break;
                        }
                        el = el.parentElement;
                    }
                    break;
                }
            }
        });

        document.querySelectorAll('[style*="url"]').forEach(el => {
            const bgUrl = extractBgUrl(el);
            if (!bgUrl || !isGoodImage(bgUrl)) return;
            const elText = el.textContent.toLowerCase();
            for (const loc of locationPatterns) {
                if (loc.pattern.test(elText) && !locationImages[loc.key]) {
                    locationImages[loc.key] = bgUrl;
                }
            }
        });

        const fallbackImages = [];
        const seen = new Set();
        document.querySelectorAll('[style*="url"]').forEach(el => {
            const bgUrl = extractBgUrl(el);
            if (bgUrl && isGoodImage(bgUrl) && !seen.has(bgUrl)) {
                seen.add(bgUrl);
                fallbackImages.push(bgUrl);
            }
        });

        return {
            mapped: locationImages,
            fallback: fallbackImages
        };
    }

    // ===================================================================
    // INITIALIZE
    // ===================================================================

    // Check if current page is the homepage
    function isHomepageCheck() {
        const path = window.location.pathname;
        const isHomepage = path === '/' ||
                          path === '' ||
                          path.endsWith('/1331') ||
                          path.endsWith('/1331/');
        const hasRootClass = document.body.classList.contains('section_root');
        return isHomepage || hasRootClass;
    }

    // Create a minimal shadow container for header only
    function createHeaderShadowContainer() {
        const host = document.createElement('div');
        host.id = 'cra-header-host';
        host.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10000;
        `;

        const shadow = host.attachShadow({ mode: 'open' });

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap';
        shadow.appendChild(fontLink);

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
        `;
        shadow.appendChild(style);

        return { host, shadow };
    }

    // Create a minimal shadow container for footer only
    function createFooterShadowContainer() {
        const host = document.createElement('div');
        host.id = 'cra-footer-host';
        host.style.cssText = `
            position: relative;
            z-index: 1;
            width: 100%;
        `;

        const shadow = host.attachShadow({ mode: 'open' });

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap';
        shadow.appendChild(fontLink);

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
        `;
        shadow.appendChild(style);

        return { host, shadow };
    }

    // Initialize header/footer on ALL pages
    function initGlobalElements() {
        console.log('CRA: Initializing global header/footer');
        loadFonts();

        // Extract data needed for header/footer
        const footerData = extractFooterData();
        const navLinks = extractNavLinks();

        // Hide original header/footer only
        hideHeaderFooterOnly();

        // Create SEPARATE shadow containers for header and footer
        // This keeps the original body content in the main DOM with its CMS styles intact

        // Header shadow container
        const headerContainer = createHeaderShadowContainer();
        headerContainer.shadow.appendChild(createHeader(navLinks));
        document.body.insertBefore(headerContainer.host, document.body.firstChild);

        // Footer shadow container - append at end of body
        const footerContainer = createFooterShadowContainer();
        footerContainer.shadow.appendChild(createFooter(footerData));
        document.body.appendChild(footerContainer.host);

        // Add padding to body to account for fixed header
        const addBodyPadding = document.createElement('style');
        addBodyPadding.textContent = `
            body {
                padding-top: 90px !important;
            }
        `;
        document.head.appendChild(addBodyPadding);
    }

    // Initialize full homepage redesign
    async function initHomepage() {
        console.log('CRA Redesign: Running on homepage');
        loadFonts();

        // IMPORTANT: Extract ALL data BEFORE hiding CMS elements
        const carouselImages = extractCarouselImages();
        const heroSlides = extractAllHeroSlides();
        extractedImages = extractOriginalImages();
        const photoUrls = extractPhotos();
        const footerData = extractFooterData();
        const navLinks = extractNavLinks();

        // Hide CMS IMMEDIATELY after extraction (before any async calls)
        hideAllCMSElements();

        // Fetch events from events page (async, but CMS already hidden)
        console.log('CRA: Fetching events...');
        const events = await fetchEvents();

        // Create shadow container
        const { host, shadow } = createShadowContainer();

        // Build content inside shadow DOM
        shadow.appendChild(createHeader(navLinks));
        shadow.appendChild(createHero(carouselImages, heroSlides));

        // About section (with animation)
        const aboutSection = createAbout();
        aboutSection.classList.add('cra-animate');
        aboutSection.dataset.animation = 'left';
        shadow.appendChild(aboutSection);

        // Create sections with animation classes (alternating left/right)
        const locationsSection = createLocations(extractedImages);
        locationsSection.classList.add('cra-animate');
        locationsSection.dataset.animation = 'right';
        shadow.appendChild(locationsSection);

        const actionsSection = createActions();
        actionsSection.classList.add('cra-animate');
        actionsSection.dataset.animation = 'left';
        shadow.appendChild(actionsSection);

        // Events section (fetched from events page)
        const eventsSection = createEvents(events);
        eventsSection.classList.add('cra-animate');
        eventsSection.dataset.animation = 'right';
        shadow.appendChild(eventsSection);

        const photosSection = createPhotos(photoUrls);
        photosSection.classList.add('cra-animate');
        photosSection.dataset.animation = 'left';
        shadow.appendChild(photosSection);

        const footerSection = createFooter(footerData);
        footerSection.classList.add('cra-animate');
        footerSection.dataset.animation = 'right';
        shadow.appendChild(footerSection);

        // Set up Intersection Observer for scroll-triggered animations
        const animatedSections = shadow.querySelectorAll('.cra-animate');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const direction = entry.target.dataset.animation;
                    entry.target.classList.add(direction === 'left' ? 'cra-slide-left' : 'cra-slide-right');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animatedSections.forEach(section => observer.observe(section));

        // Insert into page
        const bodyWrapper = document.querySelector('.body_wrapper');
        if (bodyWrapper) {
            bodyWrapper.parentNode.insertBefore(host, bodyWrapper);
        } else {
            document.body.appendChild(host);
        }

        console.log('CRA Redesign: Homepage complete');
    }

    // Main init - decides which version to run
    function init() {
        if (isHomepageCheck()) {
            initHomepage();
        } else {
            initGlobalElements();
        }
    }

    // Wait for carousel to be ready (jQuery Cycle sets images after DOMContentLoaded)
    function waitForCarousel(callback, maxAttempts = 20) {
        let attempts = 0;
        const check = () => {
            attempts++;
            const slider = document.querySelector('.promo_slider');
            const hasImages = slider && slider.querySelectorAll('[style*="url"]').length > 0;

            if (hasImages || attempts >= maxAttempts) {
                console.log(`CRA: Carousel ready after ${attempts} attempts, hasImages: ${hasImages}`);
                callback();
            } else {
                setTimeout(check, 100); // Check every 100ms
            }
        };
        check();
    }

    // Run - homepage waits for carousel, subpages run immediately
    function run() {
        if (isHomepageCheck()) {
            // Homepage: wait for carousel images to load
            waitForCarousel(init);
        } else {
            // Subpages: run immediately
            init();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

})();
