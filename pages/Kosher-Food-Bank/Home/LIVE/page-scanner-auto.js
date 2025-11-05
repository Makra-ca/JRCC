// ====================================================================
// AUTOMATIC PAGE SCANNER - Complete Element Discovery
// ====================================================================
// HOW TO USE:
// 1. Open the page you want to scan
// 2. Open Console (F12)
// 3. Paste this entire script and press Enter
// 4. It will automatically scan and output ALL element info
// 5. Copy the entire console output and share with Claude
// ====================================================================

(function() {
    console.clear();
    console.log('%c🔍 AUTOMATIC PAGE SCANNER STARTING...', 'color: #f4d03f; font-size: 20px; font-weight: bold;');
    console.log('%c════════════════════════════════════════════════════════════════', 'color: #666;');

    // Helper function to get simple selector
    function getSimpleSelector(element) {
        if (!element) return 'N/A';
        let selector = element.nodeName.toLowerCase();
        if (element.id) return '#' + element.id;
        if (element.classList.length > 0) {
            return selector + '.' + Array.from(element.classList).join('.');
        }
        return selector;
    }

    // Helper function to get important computed styles
    function getKeyStyles(element) {
        const styles = window.getComputedStyle(element);
        return {
            background: styles.background,
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            fontSize: styles.fontSize,
            fontFamily: styles.fontFamily,
            padding: styles.padding,
            margin: styles.margin,
            display: styles.display,
            position: styles.position,
            border: styles.border,
            borderRadius: styles.borderRadius
        };
    }

    // Scan results object
    const scanResults = {
        navigation: {},
        header: {},
        banner: {},
        messages: [],
        promos: [],
        otherElements: []
    };

    console.log('\n%c📋 SCANNING PAGE STRUCTURE...', 'color: #50fa7b; font-size: 18px; font-weight: bold;');
    console.log('%c════════════════════════════════════════════════════════════════', 'color: #666;');

    // ===== SCAN NAVIGATION =====
    console.log('\n%c🧭 NAVIGATION SECTION:', 'color: #4a9eff; font-size: 16px; font-weight: bold;');
    const nav = document.querySelector('#navigation, nav, .chabad_navigator_bar, [class*="nav"]');
    if (nav) {
        scanResults.navigation.container = getSimpleSelector(nav);
        console.log('Navigation Container:', scanResults.navigation.container);
        console.log('Computed Styles:', getKeyStyles(nav));

        // Find menu wrapper
        const menuContent = nav.querySelector('.chabad_menu_content, [class*="menu_content"]');
        if (menuContent) {
            scanResults.navigation.menuWrapper = getSimpleSelector(menuContent);
            console.log('Menu Wrapper:', scanResults.navigation.menuWrapper);
        }

        // Find menu list
        const menuList = nav.querySelector('ul, ul#menu');
        if (menuList) {
            scanResults.navigation.menuList = getSimpleSelector(menuList);
            console.log('Menu List:', scanResults.navigation.menuList);
            console.log('Menu List Styles:', getKeyStyles(menuList));
        }

        // Find all menu items
        const menuItems = nav.querySelectorAll('li');
        if (menuItems.length > 0) {
            console.log(`Found ${menuItems.length} menu items`);
            console.log('First Menu Item:', getSimpleSelector(menuItems[0]));
            console.log('First Menu Item Styles:', getKeyStyles(menuItems[0]));

            // Check for different li classes
            const liClasses = new Set();
            menuItems.forEach(li => {
                li.classList.forEach(cls => liClasses.add(cls));
            });
            console.log('All LI Classes Found:', Array.from(liClasses));
        }

        // Find all menu links
        const menuLinks = nav.querySelectorAll('a');
        if (menuLinks.length > 0) {
            console.log(`Found ${menuLinks.length} navigation links`);
            console.log('First Link:', getSimpleSelector(menuLinks[0]));
            console.log('First Link Styles:', getKeyStyles(menuLinks[0]));

            // Check for different link classes
            const linkClasses = new Set();
            menuLinks.forEach(link => {
                link.classList.forEach(cls => linkClasses.add(cls));
            });
            console.log('All Link Classes Found:', Array.from(linkClasses));

            // Check for selected/active link
            const selectedLink = nav.querySelector('a.selected, a.active, a[class*="selected"]');
            if (selectedLink) {
                console.log('Selected Link:', getSimpleSelector(selectedLink));
                console.log('Selected Link Styles:', getKeyStyles(selectedLink));
            }
        }
    } else {
        console.log('❌ No navigation found');
    }

    // ===== SCAN HEADER =====
    console.log('\n%c📌 HEADER SECTION:', 'color: #ff79c6; font-size: 16px; font-weight: bold;');
    const header = document.querySelector('.chabad_header, header, [class*="header"]');
    if (header) {
        scanResults.header.container = getSimpleSelector(header);
        console.log('Header Container:', scanResults.header.container);
        console.log('Header Styles:', getKeyStyles(header));

        // Find header title
        const headerTitle = header.querySelector('.headerTitle, h1, [class*="title"]');
        if (headerTitle) {
            console.log('Header Title:', getSimpleSelector(headerTitle));
            console.log('Header Title Styles:', getKeyStyles(headerTitle));
        }

        // Find header image
        const headerImg = header.querySelector('img');
        if (headerImg) {
            console.log('Header Image Found:', headerImg.src);
        }
    } else {
        console.log('❌ No header found');
    }

    // ===== SCAN BANNER =====
    console.log('\n%c🎨 BANNER SECTION:', 'color: #ffb86c; font-size: 16px; font-weight: bold;');
    const banner = document.querySelector('.large_banner, .bannerContainer, [class*="banner"]');
    if (banner) {
        scanResults.banner.container = getSimpleSelector(banner);
        console.log('Banner Container:', scanResults.banner.container);
        console.log('Banner Styles:', getKeyStyles(banner));

        // Find banner text wrapper
        const textWrapper = banner.querySelector('.textWrapper, [class*="text"]');
        if (textWrapper) {
            console.log('Text Wrapper:', getSimpleSelector(textWrapper));
            console.log('Text Wrapper Styles:', getKeyStyles(textWrapper));
        }

        // Find banner CTA
        const cta = banner.querySelector('.bannerCta, button, [class*="cta"]');
        if (cta) {
            console.log('CTA Element:', getSimpleSelector(cta));
            console.log('CTA Styles:', getKeyStyles(cta));
        }
    } else {
        console.log('❌ No banner found');
    }

    // ===== SCAN CUSTOM MESSAGES =====
    console.log('\n%c💬 MESSAGE SECTIONS:', 'color: #bd93f9; font-size: 16px; font-weight: bold;');
    const messages = document.querySelectorAll('.custom_message, [class*="message"]');
    if (messages.length > 0) {
        console.log(`Found ${messages.length} message section(s)`);
        messages.forEach((msg, idx) => {
            console.log(`\nMessage ${idx + 1}:`, getSimpleSelector(msg));
            console.log('Message Styles:', getKeyStyles(msg));

            const title = msg.querySelector('.title, h2, h3');
            if (title) {
                console.log('  Title:', getSimpleSelector(title));
            }
        });
    } else {
        console.log('❌ No message sections found');
    }

    // ===== SCAN PROMO CARDS =====
    console.log('\n%c🎴 PROMO CARDS:', 'color: #50fa7b; font-size: 16px; font-weight: bold;');
    const promos = document.querySelectorAll('.sPromo-wrap, [class*="Promo"], [class*="promo"]');
    if (promos.length > 0) {
        console.log(`Found ${promos.length} promo card(s)`);
        console.log('First Promo:', getSimpleSelector(promos[0]));
        console.log('First Promo Styles:', getKeyStyles(promos[0]));

        const caption = promos[0].querySelector('.caption, [class*="caption"]');
        if (caption) {
            console.log('Caption Element:', getSimpleSelector(caption));
            console.log('Caption Styles:', getKeyStyles(caption));
        }
    } else {
        console.log('❌ No promo cards found');
    }

    // ===== SCAN BODY & CONTAINERS =====
    console.log('\n%c📦 BODY & CONTAINERS:', 'color: #8be9fd; font-size: 16px; font-weight: bold;');
    const body = document.body;
    console.log('Body Background:', getComputedStyle(body).background);
    console.log('Body Background-Color:', getComputedStyle(body).backgroundColor);

    const bodyContainer = document.querySelector('#BodyContainer, #co_content_container, .body_wrapper');
    if (bodyContainer) {
        console.log('Body Container:', getSimpleSelector(bodyContainer));
        console.log('Body Container Styles:', getKeyStyles(bodyContainer));
    }

    // ===== SCAN ALL CLASSES ON PAGE =====
    console.log('\n%c🏷️ ALL UNIQUE CLASSES ON PAGE:', 'color: #f4d03f; font-size: 16px; font-weight: bold;');
    const allElements = document.querySelectorAll('*');
    const allClasses = new Set();
    allElements.forEach(el => {
        el.classList.forEach(cls => allClasses.add(cls));
    });
    const sortedClasses = Array.from(allClasses).sort();
    console.log('Total unique classes:', sortedClasses.length);
    console.log('Classes:', sortedClasses);

    // ===== SCAN ALL IDS ON PAGE =====
    console.log('\n%c🆔 ALL IDS ON PAGE:', 'color: #f4d03f; font-size: 16px; font-weight: bold;');
    const allIds = [];
    allElements.forEach(el => {
        if (el.id) allIds.push('#' + el.id);
    });
    console.log('Total IDs:', allIds.length);
    console.log('IDs:', allIds);

    // ===== OUTPUT SUMMARY =====
    console.log('\n%c════════════════════════════════════════════════════════════════', 'color: #666;');
    console.log('%c✅ SCAN COMPLETE!', 'color: #50fa7b; font-size: 20px; font-weight: bold;');
    console.log('%c════════════════════════════════════════════════════════════════', 'color: #666;');
    console.log('\n%c📋 SUMMARY OF FINDINGS:', 'color: #f4d03f; font-size: 16px; font-weight: bold;');
    console.log('Navigation Container:', scanResults.navigation.container || 'Not found');
    console.log('Header Container:', scanResults.header.container || 'Not found');
    console.log('Banner Container:', scanResults.banner.container || 'Not found');
    console.log('Message Sections:', messages.length);
    console.log('Promo Cards:', promos.length);

    console.log('\n%c💡 NEXT STEP:', 'color: #ffb86c; font-size: 14px; font-weight: bold;');
    console.log('%cCopy this entire console output and share it with Claude!', 'color: #e8e8e8; font-size: 12px;');
    console.log('\n');
})();
