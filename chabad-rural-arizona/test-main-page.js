/* ===================================================================
   CHABAD RURAL ARIZONA - Homepage Redesign Development Script
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

    console.log('🏜️ Chabad Rural Arizona - Homepage Redesign Loading...');

    // ===================================================================
    // CONFIGURATION - Colors from the van branding
    // ===================================================================

    const CONFIG = {
        colors: {
            sunsetPeach: '#E8A87C',
            dustyMauve: '#C38D94',
            deepBurgundy: '#722F37',
            darkBurgundy: '#4A1F24',
            tealGreen: '#2D5A5A',
            warmCream: '#F5E6D3',
            lightCream: '#FDF8F3',
            goldenSand: '#D4A84B',
            sunsetOrange: '#E07B4C'
        }
    };

    // ===================================================================
    // INJECT CSS STYLES
    // ===================================================================

    const css = `
        /* ===================================================================
           CSS VARIABLES
           =================================================================== */
        :root {
            --sunset-peach: ${CONFIG.colors.sunsetPeach};
            --dusty-mauve: ${CONFIG.colors.dustyMauve};
            --deep-burgundy: ${CONFIG.colors.deepBurgundy};
            --dark-burgundy: ${CONFIG.colors.darkBurgundy};
            --teal-green: ${CONFIG.colors.tealGreen};
            --warm-cream: ${CONFIG.colors.warmCream};
            --light-cream: ${CONFIG.colors.lightCream};
            --golden-sand: ${CONFIG.colors.goldenSand};
            --sunset-orange: ${CONFIG.colors.sunsetOrange};
        }

        /* ===================================================================
           RESET CHABAD ONE BASE STYLES
           =================================================================== */
        body.cco_body {
            background: var(--light-cream) !important;
            font-family: 'Urbanist', sans-serif !important;
        }

        #BodyContainer,
        #co_content_container,
        .body_wrapper,
        .master-content-wrapper,
        .g960 {
            background: transparent !important;
            max-width: none !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        .body_wrapper.no-hero-image {
            padding-top: 0 !important;
        }

        /* ===================================================================
           HERO SECTION (Added by script)
           =================================================================== */
        .cra-hero {
            min-height: 100vh;
            background: linear-gradient(
                180deg,
                #E8A87C 0%,
                #D4956A 20%,
                #C38D94 40%,
                #A67580 60%,
                #8B5A62 80%,
                #722F37 100%
            );
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 6rem 2rem 4rem;
            overflow: hidden;
        }

        /* Cactus Silhouettes */
        .cra-hero::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 200px;
            background: var(--dark-burgundy);
            clip-path: polygon(
                0% 100%,
                0% 60%,
                5% 55%,
                5% 30%,
                6% 30%,
                6% 55%,
                8% 50%,
                10% 55%,
                12% 50%,
                15% 60%,
                20% 55%,
                25% 60%,
                30% 50%,
                30% 20%,
                31% 20%,
                31% 15%,
                32% 15%,
                32% 20%,
                33% 20%,
                33% 50%,
                35% 55%,
                40% 50%,
                45% 55%,
                50% 45%,
                55% 50%,
                60% 45%,
                65% 55%,
                70% 50%,
                70% 25%,
                71% 25%,
                71% 50%,
                73% 45%,
                75% 50%,
                80% 45%,
                85% 55%,
                90% 50%,
                95% 60%,
                100% 55%,
                100% 100%
            );
        }

        .cra-hero-content {
            position: relative;
            z-index: 2;
            max-width: 900px;
        }

        .cra-hero-tagline {
            background: var(--teal-green);
            color: white;
            padding: 0.85rem 2.25rem;
            border-radius: 10px;
            font-size: 1.15rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 2.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            letter-spacing: 0.5px;
        }

        .cra-hero h1 {
            font-family: 'Urbanist', sans-serif !important;
            font-size: clamp(3.5rem, 10vw, 6.5rem) !important;
            font-weight: 800 !important;
            color: white !important;
            text-shadow: 0 4px 30px rgba(0,0,0,0.3);
            margin-bottom: 1.5rem !important;
            line-height: 1.05 !important;
            background: none !important;
            padding: 0 !important;
            letter-spacing: -2px !important;
        }

        .cra-hero-subtitle {
            font-size: 1.6rem;
            color: var(--warm-cream);
            margin-bottom: 3rem;
            font-weight: 400;
            max-width: 800px;
            line-height: 1.5;
        }

        .cra-hero-cta {
            display: inline-flex;
            gap: 1.25rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 0.5rem;
        }

        .cra-btn-primary {
            background: var(--golden-sand) !important;
            color: var(--dark-burgundy) !important;
            padding: 1.15rem 3rem !important;
            border-radius: 50px !important;
            font-weight: 700 !important;
            font-size: 1.2rem !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            display: inline-block;
            font-family: 'Urbanist', sans-serif !important;
        }

        .cra-btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .cra-btn-secondary {
            background: transparent !important;
            color: white !important;
            padding: 1.15rem 3rem !important;
            border-radius: 50px !important;
            font-weight: 600 !important;
            font-size: 1.2rem !important;
            text-decoration: none !important;
            border: 2px solid white !important;
            transition: all 0.3s ease !important;
            display: inline-block;
            font-family: 'Urbanist', sans-serif !important;
        }

        .cra-btn-secondary:hover {
            background: white !important;
            color: var(--deep-burgundy) !important;
        }

        /* ===================================================================
           LOCATIONS SECTION - Style existing sneak_peek widget
           =================================================================== */
        .cra-locations-section {
            padding: 6rem 2rem;
            background: var(--light-cream);
        }

        .cra-section-header {
            text-align: center;
            margin-bottom: 3.5rem;
        }

        .cra-section-header h2 {
            font-family: 'Urbanist', sans-serif !important;
            font-size: clamp(2rem, 5vw, 3rem) !important;
            color: var(--golden-sand) !important;
            margin-bottom: 0.75rem !important;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 800 !important;
            background: none !important;
            padding: 0 !important;
        }

        .cra-section-header p {
            color: var(--dusty-mauve);
            font-size: 1.15rem;
        }

        .cra-locations-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .cra-location-card {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            aspect-ratio: 4/3;
            text-decoration: none !important;
            color: white !important;
            cursor: pointer;
            display: block;
        }

        .cra-location-card:hover .cra-location-image {
            transform: scale(1.1);
        }

        .cra-location-card:hover .cra-location-overlay {
            opacity: 0.7;
        }

        .cra-location-card:hover .cra-location-arrow {
            transform: translateX(5px);
            opacity: 1;
        }

        .cra-location-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-color: var(--dusty-mauve);
            transition: transform 0.5s ease;
        }

        .cra-location-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                180deg,
                rgba(114, 47, 55, 0.2) 0%,
                rgba(114, 47, 55, 0.8) 100%
            );
            transition: opacity 0.3s ease;
        }

        .cra-location-overlay.overlay-teal {
            background: linear-gradient(
                180deg,
                rgba(45, 90, 90, 0.3) 0%,
                rgba(45, 90, 90, 0.9) 100%
            );
        }

        .cra-location-overlay.overlay-gold {
            background: linear-gradient(
                135deg,
                var(--golden-sand) 0%,
                var(--sunset-orange) 100%
            );
            opacity: 0.95;
        }

        .cra-location-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            z-index: 2;
        }

        .cra-location-content h3 {
            font-size: 1.35rem !important;
            font-weight: 700 !important;
            color: white !important;
            margin-bottom: 0.25rem !important;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
            background: none !important;
            padding: 0 !important;
        }

        .cra-location-subtitle {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .cra-location-arrow {
            position: absolute;
            bottom: 1.5rem;
            right: 1.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            opacity: 0.7;
            transition: all 0.3s ease;
        }

        .cra-card-cta .cra-location-content h3,
        .cra-card-cta .cra-location-subtitle,
        .cra-card-cta .cra-location-arrow {
            color: var(--dark-burgundy) !important;
            text-shadow: none;
        }

        /* ===================================================================
           QUICK ACTIONS SECTION
           =================================================================== */
        .cra-actions {
            padding: 5rem 2rem;
            background: var(--deep-burgundy);
        }

        .cra-actions .cra-section-header h2 {
            color: white !important;
        }

        .cra-actions .cra-section-header p {
            color: var(--sunset-peach);
        }

        .cra-actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            max-width: 1000px;
            margin: 0 auto;
        }

        .cra-action-card {
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            text-decoration: none !important;
            color: white !important;
            transition: all 0.3s ease;
            display: block;
        }

        .cra-action-card:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-5px);
        }

        .cra-action-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .cra-action-card h3 {
            font-size: 1.3rem !important;
            margin-bottom: 0.5rem !important;
            color: white !important;
            background: none !important;
            padding: 0 !important;
        }

        .cra-action-card p {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        /* ===================================================================
           MOTTO SECTION
           =================================================================== */
        .cra-motto {
            background: var(--teal-green);
            padding: 4rem 2rem;
            text-align: center;
        }

        .cra-motto h2 {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 2.5rem !important;
            font-weight: 700 !important;
            color: white !important;
            margin-bottom: 1rem !important;
            background: none !important;
            padding: 0 !important;
        }

        .cra-motto p {
            color: var(--warm-cream);
            font-size: 1.2rem;
        }

        /* ===================================================================
           FOOTER
           =================================================================== */
        .cra-footer {
            background: var(--dark-burgundy) !important;
            color: var(--warm-cream) !important;
            padding: 4rem 2rem 2rem !important;
        }

        .cra-footer-content {
            max-width: 1200px;
            margin: 0 auto;
        }

        .cra-footer-main {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 3rem;
            padding-bottom: 3rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 2rem;
        }

        .cra-footer-brand h3 {
            font-family: 'Urbanist', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: white;
        }

        .cra-footer-tagline {
            opacity: 0.7;
            font-size: 1rem;
            margin-bottom: 1.5rem;
        }

        .cra-footer-social {
            display: flex;
            gap: 1rem;
        }

        .cra-social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            color: var(--warm-cream) !important;
            transition: all 0.3s ease;
            text-decoration: none !important;
        }

        .cra-social-icon:hover {
            background: var(--golden-sand);
            color: var(--dark-burgundy) !important;
            transform: translateY(-3px);
        }

        .cra-footer-contact h4,
        .cra-footer-links h4 {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: var(--golden-sand);
        }

        .cra-footer-contact p {
            margin-bottom: 0.5rem;
            opacity: 0.8;
        }

        .cra-footer-contact a {
            color: var(--warm-cream) !important;
            text-decoration: none !important;
            transition: color 0.3s;
        }

        .cra-footer-contact a:hover {
            color: var(--golden-sand) !important;
        }

        .cra-footer-links a {
            display: block;
            color: var(--warm-cream) !important;
            text-decoration: none !important;
            opacity: 0.8;
            margin-bottom: 0.5rem;
            transition: all 0.3s;
        }

        .cra-footer-links a:hover {
            opacity: 1;
            color: var(--golden-sand) !important;
        }

        .cra-footer-bottom {
            text-align: center;
        }

        .cra-footer-bottom p {
            font-size: 0.85rem;
            opacity: 0.6;
            margin-bottom: 0.5rem;
        }

        .cra-footer-bottom a {
            color: var(--warm-cream) !important;
            opacity: 0.6;
            text-decoration: none !important;
        }

        .cra-footer-bottom a:hover {
            opacity: 1;
        }

        /* ===================================================================
           STYLE ORIGINAL CHABAD ONE HEADER
           =================================================================== */

        /* Make entire header fixed with white background */
        #header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 1000 !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            padding: 0 !important;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1) !important;
        }

        /* Hide utility nav - specific Chabad One elements */
        #header_container,
        #header .header_container,
        #header .clearfix.links,
        #feedback_bar,
        .topBarLink,
        .cco_topbar_link,
        .mychabad_login_bar,
        .home_link {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
        }

        /* Remove ALL backgrounds from header children - be aggressive */
        #header *,
        #header > div,
        #header .g960,
        #header table,
        #header td,
        #header tr,
        #header .header-wrapper,
        #headerContainer {
            background: transparent !important;
            background-image: none !important;
            background-color: transparent !important;
        }

        /* Re-apply background ONLY to the main #header container */
        #header {
            background: rgba(255, 255, 255, 0.95) !important;
        }

        /* LOGO STYLING - Target #header_branding specifically */
        #header_branding,
        #header_branding *,
        .branding-search,
        .branding-search *,
        #header .logo,
        #header .logo *,
        #header [class*="logo"],
        #header [class*="logo"] *,
        #header img {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            border: none !important;
        }

        /* Logo container - proper sizing and display */
        #header_branding,
        .branding-search {
            display: flex !important;
            align-items: center !important;
        }

        #header_branding img,
        .branding-search img {
            max-height: 45px !important;
            width: auto !important;
            background: transparent !important;
            border-radius: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
        }

        /* Logo text - deep burgundy on white background */
        #header #header_branding a,
        #header .branding-search a,
        #header .branding-search #header_branding a,
        #header_branding a,
        #header_branding .site-name,
        .branding-search a {
            color: var(--deep-burgundy) !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.4rem !important;
            font-weight: 700 !important;
            text-decoration: none !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.75rem !important;
        }

        /* Make sure the site tagline is smaller */
        #header_branding .site-tagline,
        .branding-search .site-tagline {
            font-size: 0.75rem !important;
            opacity: 0.7 !important;
            color: var(--dusty-mauve) !important;
        }

        /* Main navigation container - target .site-nav-wrapper */
        .site-nav-wrapper,
        #co_menu_container_wrapper {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        /* Navigation menu styling */
        #co_menu_container_wrapper ul,
        .site-nav-wrapper ul {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 1.5rem !important;
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        #co_menu_container_wrapper li,
        .site-nav-wrapper li {
            display: inline-block !important;
            list-style: none !important;
        }

        /* Style all nav links dark on white background */
        #header a,
        #header nav a,
        #header .nav a,
        #header .menu a,
        #header .site-nav a,
        .site-nav-wrapper a,
        #header li a,
        #header ul a {
            color: var(--dark-burgundy) !important;
            text-decoration: none !important;
            font-family: 'Urbanist', sans-serif !important;
            font-weight: 500 !important;
            font-size: 0.95rem !important;
            transition: color 0.3s ease !important;
            padding: 0.5rem 0 !important;
        }

        #header a:hover,
        #header nav a:hover,
        #header .nav a:hover,
        #header li a:hover,
        .site-nav-wrapper a:hover,
        #header ul a:hover {
            color: var(--teal-green) !important;
        }

        /* Make nav lists horizontal */
        #header ul,
        #header nav ul,
        .site-nav-wrapper ul {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 2rem !important;
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        #header li,
        #header nav li,
        .site-nav-wrapper li {
            display: inline-block !important;
            list-style: none !important;
        }

        /* Style donate button - burgundy background like mockup */
        #header a[href*="4970020"],
        #header a[href*="donate"],
        #header a[href*="Donate"],
        #header .donate-btn,
        #header .btn-donate,
        #header .cco-donate-btn {
            background: var(--deep-burgundy) !important;
            color: white !important;
            border-radius: 50px !important;
            padding: 0.6rem 1.5rem !important;
            border: none !important;
            font-weight: 600 !important;
            font-size: 0.9rem !important;
        }

        #header a[href*="4970020"]:hover,
        #header a[href*="donate"]:hover,
        #header a[href*="Donate"]:hover {
            background: var(--teal-green) !important;
            color: white !important;
        }

        /* Main header wrapper layout - 3 column with centered nav */
        .header-wrapper,
        #header > .wrapper {
            max-width: 1400px !important;
            margin: 0 auto !important;
            padding: 1rem 2rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
        }

        /* Center the navigation by making it flex-grow */
        .site-nav-wrapper {
            flex: 1 !important;
            display: flex !important;
            justify-content: center !important;
        }

        /* Logo takes fixed space on left */
        .branding-search {
            flex: 0 0 auto !important;
        }

        /* Hide the mobile bottom links on desktop */
        .mobile-menu-bottom-links {
            display: none !important;
        }

        /* Hide hamburger on desktop (show only on mobile) */
        .cs-mobile-menu-open {
            display: none !important;
        }

        @media (max-width: 768px) {
            .cs-mobile-menu-open {
                display: flex !important;
                background: transparent !important;
                border: none !important;
                color: white !important;
                font-size: 1.5rem !important;
            }
        }

        /* Ensure body has padding for fixed header */
        body.cco_body {
            padding-top: 70px !important;
        }

        /* ===================================================================
           HIDE ORIGINAL ELEMENTS
           =================================================================== */

        /* Hide original footer */
        #footer {
            display: none !important;
        }

        /* Hide original hp-table but keep for data extraction */
        .hp-table {
            display: none !important;
        }

        /* Remove any top padding/margin from body wrapper */
        .body_wrapper {
            padding-top: 0 !important;
            margin-top: 0 !important;
        }

        /* ===================================================================
           RESPONSIVE
           =================================================================== */
        @media (max-width: 768px) {
            .cra-hero {
                padding: 5rem 1.5rem 3rem;
            }

            .cra-hero h1 {
                font-size: 2.5rem !important;
                letter-spacing: -1px !important;
            }

            .cra-hero-subtitle {
                font-size: 1.15rem;
            }

            .cra-hero-tagline {
                font-size: 1rem;
                padding: 0.7rem 1.5rem;
            }

            .cra-btn-primary,
            .cra-btn-secondary {
                font-size: 1.05rem !important;
                padding: 1rem 2.25rem !important;
            }

            .cra-hero-cta {
                flex-direction: column;
            }

            .cra-locations-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .cra-location-card {
                aspect-ratio: 16/9;
            }

            .cra-actions-grid {
                grid-template-columns: 1fr 1fr;
            }

            .cra-footer-main {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }

            .cra-footer-social {
                justify-content: center;
            }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
            .cra-locations-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .cra-footer-main {
                grid-template-columns: 1fr 1fr;
            }

            .cra-footer-brand {
                grid-column: 1 / -1;
            }
        }
    `;

    // Remove any existing injected styles
    const existingStyle = document.getElementById('cra-injected-styles');
    if (existingStyle) existingStyle.remove();

    // Inject new styles
    const styleEl = document.createElement('style');
    styleEl.id = 'cra-injected-styles';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // Add Google Fonts if not already present - Urbanist only
    if (!document.querySelector('link[href*="Urbanist"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(fontLink);
    }

    // ===================================================================
    // EXTRACT EXISTING LOCATION DATA FROM PAGE
    // ===================================================================

    function extractExistingLocations() {
        const locations = [];

        // Look for the sneak_peek widget with locations
        const sneakPeekItems = document.querySelectorAll('.sneak_peek .featured_item, .sneak_peek li, .hp-table a[href*="Meetup"], .hp-table a[href*="Location"]');

        // Also check for specific location links in the page
        const locationLinks = document.querySelectorAll('a[href*="Holbrook"], a[href*="Globe"], a[href*="Payson"], a[href*="White-Mountains"]');

        // Check for image containers that might have location info
        const widgetImages = document.querySelectorAll('.sneak_peek img, .promo_slider img, .featured_item img');

        widgetImages.forEach(img => {
            const link = img.closest('a');
            const container = img.closest('.featured_item, li, .promo_item');
            const title = container?.querySelector('h3, h4, .title, strong')?.textContent?.trim();

            if (link && img.src) {
                locations.push({
                    title: title || 'Location',
                    href: link.href,
                    image: img.src
                });
            }
        });

        console.log('📍 Found existing locations:', locations);
        return locations;
    }

    // ===================================================================
    // BUILD LOCATION CARDS FROM EXISTING DATA
    // ===================================================================

    function buildLocationCards(existingLocations) {
        // Default locations with fallback images
        const defaultLocations = [
            {
                title: 'Payson / Rim Country',
                href: '/tools/feedback.asp',
                image: null,
                overlay: ''
            },
            {
                title: 'The White Mountains',
                href: '/tools/feedback.asp',
                image: null,
                overlay: ''
            },
            {
                title: 'Holbrook',
                href: '/templates/articlecco_cdo/aid/6532417/jewish/Jewish-Meetup-in-Holbrook.htm',
                image: null,
                overlay: ''
            },
            {
                title: 'Globe / Miami',
                href: '/templates/articlecco_cdo/aid/6532429/jewish/Jewish-Meetup-in-GlobeMiami.htm',
                image: null,
                overlay: ''
            },
            {
                title: 'Wherever You Are!',
                subtitle: 'Online Programs',
                href: '/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm',
                image: null,
                overlay: 'overlay-teal'
            },
            {
                title: 'Request New Location',
                subtitle: 'Expand our reach',
                href: '/tools/feedback.asp',
                image: null,
                overlay: 'overlay-gold',
                isCta: true
            }
        ];

        // Try to match existing images to locations
        existingLocations.forEach(existing => {
            const titleLower = existing.title?.toLowerCase() || '';
            defaultLocations.forEach(loc => {
                if (titleLower.includes(loc.title.toLowerCase().split('/')[0].trim()) ||
                    loc.title.toLowerCase().includes(titleLower.split('/')[0].trim())) {
                    loc.image = existing.image;
                    if (existing.href) loc.href = existing.href;
                }
            });
        });

        // Generate HTML for location cards
        return defaultLocations.map(loc => {
            const imageStyle = loc.image
                ? `background-image: url('${loc.image}');`
                : `background: linear-gradient(135deg, var(--dusty-mauve), var(--deep-burgundy));`;

            const subtitleHtml = loc.subtitle
                ? `<p class="cra-location-subtitle">${loc.subtitle}</p>`
                : '';

            const ctaClass = loc.isCta ? 'cra-card-cta' : '';

            return `
                <a href="${loc.href}" class="cra-location-card ${ctaClass}">
                    <div class="cra-location-image" style="${imageStyle}"></div>
                    <div class="cra-location-overlay ${loc.overlay}"></div>
                    <div class="cra-location-content">
                        <h3>${loc.title}</h3>
                        ${subtitleHtml}
                        <span class="cra-location-arrow">→</span>
                    </div>
                </a>
            `;
        }).join('');
    }

    // ===================================================================
    // BUILD NEW PAGE CONTENT
    // ===================================================================

    function buildNewContent() {
        // Find the main content wrapper
        const bodyWrapper = document.querySelector('.body_wrapper');
        if (!bodyWrapper) {
            console.error('Could not find .body_wrapper');
            return;
        }

        // Extract existing location data from page
        const existingLocations = extractExistingLocations();
        const locationCardsHtml = buildLocationCards(existingLocations);

        // Create new content container
        const newContent = document.createElement('div');
        newContent.id = 'cra-redesign';

        // Build the HTML with template strings
        const heroHtml = `
            <section class="cra-hero">
                <div class="cra-hero-content">
                    <div class="cra-hero-tagline">Think Good and It Will Be Good</div>
                    <h1>Chabad of Rural Arizona</h1>
                    <p class="cra-hero-subtitle">Bringing Jewish life, learning, and warmth to every corner of the Arizona desert</p>
                    <div class="cra-hero-cta">
                        <a href="#cra-locations" class="cra-btn-primary">Find Your Location</a>
                        <a href="/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm" class="cra-btn-secondary">Get Involved</a>
                    </div>
                </div>
            </section>
        `;

        const locationsHtml = `
            <section class="cra-locations-section" id="cra-locations">
                <div class="cra-section-header">
                    <h2>Areas We Currently Serve</h2>
                    <p>Bringing Jewish life to communities across rural Arizona</p>
                </div>
                <div class="cra-locations-grid">
                    ${locationCardsHtml}
                </div>
            </section>
        `;

        const actionsHtml = `
            <section class="cra-actions">
                <div class="cra-section-header">
                    <h2>I Would Like To...</h2>
                    <p>How can we help you today?</p>
                </div>
                <div class="cra-actions-grid">
                    <a href="/4970020" class="cra-action-card">
                        <div class="cra-action-icon">❤️</div>
                        <h3>Donate</h3>
                        <p>Support our mission across rural Arizona</p>
                    </a>
                    <a href="/tools/feedback.asp" class="cra-action-card">
                        <div class="cra-action-icon">🤝</div>
                        <h3>Connect</h3>
                        <p>Get in touch with Rabbi Yaakov</p>
                    </a>
                    <a href="/templates/articlecco_cdo/aid/6590395/jewish/Get-Involved.htm" class="cra-action-card">
                        <div class="cra-action-icon">✨</div>
                        <h3>Get Involved</h3>
                        <p>Volunteer and make a difference</p>
                    </a>
                    <a href="/templates/articlecco_cdo/aid/7009394/jewish/Adult-Education.htm" class="cra-action-card">
                        <div class="cra-action-icon">📚</div>
                        <h3>Learn Online</h3>
                        <p>Torah classes & Jewish education</p>
                    </a>
                </div>
            </section>
        `;

        const mottoHtml = `
            <section class="cra-motto">
                <h2>"Think Good and It Will Be Good"</h2>
                <p>A message of hope and positivity from the Rebbe</p>
            </section>
        `;

        const footerHtml = `
            <footer class="cra-footer">
                <div class="cra-footer-content">
                    <div class="cra-footer-main">
                        <div class="cra-footer-brand">
                            <h3>Chabad of Rural Arizona</h3>
                            <p class="cra-footer-tagline">Bringing Jewish life across the desert</p>
                            <div class="cra-footer-social">
                                <a href="https://www.facebook.com/JewishRuralAZ" target="_blank" class="cra-social-icon" aria-label="Facebook">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                                <a href="https://www.instagram.com/jewishruralaz" target="_blank" class="cra-social-icon" aria-label="Instagram">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </a>
                                <a href="https://www.youtube.com/@jewishruralaz" target="_blank" class="cra-social-icon" aria-label="YouTube">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                </a>
                            </div>
                        </div>
                        <div class="cra-footer-contact">
                            <h4>Contact Us</h4>
                            <p><a href="tel:+19708525416">(970) 852-5416</a></p>
                            <p><a href="mailto:RabbiYaakov@JewishRuralAZ.org">RabbiYaakov@JewishRuralAZ.org</a></p>
                            <p>6548 E. Sharon Dr, 85254</p>
                        </div>
                        <div class="cra-footer-links">
                            <h4>Quick Links</h4>
                            <a href="/6532283">About</a>
                            <a href="/templates/articlecco_cdo/aid/6532340/jewish/Events.htm">Events</a>
                            <a href="/4970020">Donate</a>
                            <a href="/asktherabbi/default_cdo/jewish/Ask-the-Rabbi.htm">Ask the Rabbi</a>
                        </div>
                    </div>
                    <div class="cra-footer-bottom">
                        <p>Chabad of Rural Arizona is a 501(c)(3) nonprofit organization, EIN 86-3663272 | Donations are tax-deductible</p>
                        <p><a href="/4026210">Privacy Policy</a></p>
                    </div>
                </div>
            </footer>
        `;

        // Combine all sections
        newContent.innerHTML = heroHtml + locationsHtml + actionsHtml + mottoHtml + footerHtml;

        // Insert the new content at the beginning of body_wrapper
        bodyWrapper.insertBefore(newContent, bodyWrapper.firstChild);

        console.log('✅ New content injected successfully!');
    }

    // ===================================================================
    // FIX HEADER - DOM MANIPULATION
    // ===================================================================

    function fixHeader() {
        const header = document.getElementById('header');
        if (!header) {
            console.warn('⚠️ #header not found');
            return;
        }

        console.log('🔧 Fixing header structure...');

        // Log the full header structure for debugging
        console.log('Header HTML structure:');
        const logStructure = (el, depth = 0) => {
            if (depth > 3) return; // Only go 3 levels deep
            const indent = '  '.repeat(depth);
            const classes = el.className || '';
            const id = el.id ? `#${el.id}` : '';
            const links = el.querySelectorAll(':scope > a').length;
            const text = el.textContent?.trim().substring(0, 50) || '';
            console.log(`${indent}${el.tagName}${id}.${classes} [${links} links] "${text}..."`);
            Array.from(el.children).slice(0, 5).forEach(child => logStructure(child, depth + 1));
        };
        logStructure(header);

        // Strategy: Look for specific utility nav patterns inside the header
        // The utility nav typically contains: HOME | ABOUT | LOGIN | ASK THE RABBI | SUBSCRIBE | CONTACT
        const utilityKeywords = ['home', 'login', 'subscribe', 'ask the rabbi'];

        // Find all divs and rows inside the header
        const allDivs = header.querySelectorAll('div, tr, table');

        allDivs.forEach(div => {
            // Skip the main wrapper - don't hide that!
            if (div.classList.contains('header-wrapper') ||
                div.classList.contains('wrapper') ||
                div.classList.contains('site-nav-wrapper')) {
                return;
            }

            const text = div.textContent?.toLowerCase() || '';
            const directLinks = div.querySelectorAll(':scope > a, :scope > ul > li > a');

            // Check if this looks like a utility nav row
            // Must have utility keywords AND be a small contained element (not the main nav)
            const hasUtilityKeywords = utilityKeywords.filter(kw => text.includes(kw)).length >= 2;
            const isSmallRow = directLinks.length >= 3 && directLinks.length <= 8;
            const textContent = Array.from(directLinks).map(a => a.textContent?.trim().toLowerCase()).join(' ');
            const looksLikeUtility = textContent.includes('home') || textContent.includes('login');

            if (hasUtilityKeywords && isSmallRow && looksLikeUtility) {
                console.log('  Hiding utility nav:', div.className || div.tagName);
                div.style.display = 'none';
                div.style.visibility = 'hidden';
                div.style.height = '0';
                div.style.overflow = 'hidden';
            }
        });

        // Alternative: Find and hide links by their href/text that match utility patterns
        const utilityLinkPatterns = [
            'a[href="/"]',              // HOME link
            'a[href*="login"]',
            'a[href*="Login"]',
            'a[href*="subscribe"]',
            'a[href*="Subscribe"]'
        ];

        utilityLinkPatterns.forEach(selector => {
            const links = header.querySelectorAll(selector);
            links.forEach(link => {
                // Hide the parent row if it looks like a utility bar
                const parent = link.closest('div:not(.header-wrapper):not(.wrapper):not(.site-nav-wrapper)');
                if (parent && parent.querySelectorAll('a').length <= 8) {
                    const parentText = parent.textContent?.toLowerCase() || '';
                    if (parentText.includes('home') || parentText.includes('login')) {
                        console.log('  Hiding via link pattern:', parent.className || parent.tagName);
                        parent.style.display = 'none';
                    }
                }
            });
        });

        // Remove gray backgrounds from logo containers (but NOT images - we style those separately)
        const logoContainers = header.querySelectorAll('[class*="logo"]:not(img)');
        logoContainers.forEach(el => {
            el.style.background = 'transparent';
            el.style.backgroundColor = 'transparent';
            el.style.backgroundImage = 'none';
        });

        // Fix the logo/branding section specifically
        const brandingSearch = header.querySelector('.branding-search');
        const headerBranding = header.querySelector('#header_branding');

        if (brandingSearch) {
            console.log('  Found branding-search element');

            // Style the outer branding container
            brandingSearch.style.display = 'flex';
            brandingSearch.style.alignItems = 'center';
            brandingSearch.style.flex = '0 0 auto';
        }

        if (headerBranding) {
            console.log('  Found #header_branding element');

            // Style the inner branding container
            headerBranding.style.display = 'flex';
            headerBranding.style.alignItems = 'center';
            headerBranding.style.gap = '0.75rem';
            headerBranding.style.background = 'transparent';

            // Find and style ALL images in branding - no circular background
            const logoImages = headerBranding.querySelectorAll('img');
            logoImages.forEach(img => {
                console.log('  Found logo image:', img.src);
                img.style.maxHeight = '45px';
                img.style.width = 'auto';
                img.style.background = 'transparent';
                img.style.display = 'block';
                img.style.borderRadius = '0';
                img.style.padding = '0';
                img.style.boxShadow = 'none';
            });

            // Find and style ALL links in branding - deep burgundy on white
            const logoLinks = headerBranding.querySelectorAll('a');
            logoLinks.forEach(link => {
                link.style.color = '#722F37';
                link.style.fontFamily = "'Urbanist', sans-serif";
                link.style.fontSize = '1.4rem';
                link.style.fontWeight = '700';
                link.style.textDecoration = 'none';
                link.style.display = 'flex';
                link.style.alignItems = 'center';
                link.style.gap = '0.5rem';
                link.style.whiteSpace = 'nowrap';
            });

            // Find the site name elements and style them
            const siteNames = headerBranding.querySelectorAll('.site-name, .site-title, span, strong');
            siteNames.forEach(el => {
                el.style.color = '#722F37';
                el.style.fontWeight = '700';
            });

            // Find and style tagline
            const taglines = headerBranding.querySelectorAll('.site-tagline, .tagline, small');
            taglines.forEach(el => {
                el.style.color = '#C38D94';
                el.style.fontSize = '0.7rem';
                el.style.opacity = '0.8';
                el.style.display = 'none'; // Hide tagline for cleaner look
            });
        }

        // Fix the main navigation wrapper layout
        const headerWrapper = header.querySelector('.header-wrapper, .wrapper');
        if (headerWrapper) {
            headerWrapper.style.display = 'flex';
            headerWrapper.style.alignItems = 'center';
            headerWrapper.style.justifyContent = 'space-between';
            headerWrapper.style.maxWidth = '1400px';
            headerWrapper.style.margin = '0 auto';
            headerWrapper.style.padding = '0.75rem 2rem';
        }

        console.log('✅ Header fix applied');
    }

    // ===================================================================
    // INITIALIZE
    // ===================================================================

    function init() {
        console.log('🏜️ Initializing Chabad Rural Arizona redesign...');

        // Fix the header first
        fixHeader();

        // Build the new page content
        buildNewContent();

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        console.log('✅ Chabad Rural Arizona redesign complete!');
        console.log('📋 To revert, just refresh the page.');
        console.log('📍 Location images are extracted from the existing page when available.');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
