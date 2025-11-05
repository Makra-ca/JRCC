// ====================================================================
// KOSHER FOOD BANK PAGE STYLING - BROWSER CONSOLE TEST
// ====================================================================
// HOW TO USE:
// 1. Open https://www.jrcc.org/templates/section_cdo/aid/6819985/jewish/Kosher-Food-Bank.htm
// 2. Open browser DevTools (F12 or Right-click → Inspect)
// 3. Go to the Console tab
// 4. Copy and paste this ENTIRE file into the console
// 5. Press Enter
// 6. The styling will be applied immediately - you can see changes in real-time!
// 7. To remove: Just refresh the page
// ====================================================================

(function() {
    console.clear();
    console.log('%c🎨 Applying Modern Kosher Food Bank Styles...', 'color: #d4af37; font-size: 20px; font-weight: bold;');

    // Remove any existing versions
    const existing = document.getElementById('kosher-food-bank-test-styles');
    if (existing) existing.remove();

    // Create a style element
    const style = document.createElement('style');
    style.id = 'kosher-food-bank-test-styles';

    // Add all the CSS
    style.textContent = `
/* ====================================================================
   KOSHER FOOD BANK PAGE STYLING - BLACK/WHITE/GOLD THEME
   Modern, Clean Design with Full Mobile Responsiveness
   ==================================================================== */

/* ===== GLOBAL STYLES ===== */
body {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #f0f2f5 50%, #e9ecef 75%, #f8f9fa 100%) !important;
    background-attachment: fixed !important;
    margin: 0 !important;
    padding: 0 !important;
}

/* Make CMS containers transparent */
#BodyContainer,
#co_content_container,
.body_wrapper,
#content,
#co_body_container,
.master-content-wrapper,
div.master-content-wrapper,
#chabad_main_content {
    background-image: none !important;
    background: transparent !important;
    background-color: transparent !important;
}

/* Remove any decorative background elements (polka dots, etc.) */
body::before,
#BodyContainer::before,
#BodyContainer::after,
#co_content_container::before,
#co_content_container::after,
.body_wrapper::before,
.body_wrapper::after,
#content::before,
#content::after,
#co_body_container::before,
#co_body_container::after,
.master-content-wrapper::before,
.master-content-wrapper::after {
    display: none !important;
    content: none !important;
}

/* Push content down to account for fixed navbar */
body {
    padding-top: 70px !important;
}

#BodyContainer {
    padding-top: 0 !important;
}

/* Remove polka dots and decorative circles */
.decorative-circles,
.background-dots,
[class*="dot"],
[class*="circle"][class*="decorat"],
[class*="background"][class*="element"] {
    display: none !important;
}

/* ===== NAVIGATION - FIXED TO TOP ===== */
#navigation,
div#navigation {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 99999 !important;
    width: 100% !important;
    background: #ffffff !important;
    border: none !important;
    border-bottom: 2px solid #d4af37 !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
    padding: 0 !important;
    margin: 0 !important;
    min-height: 70px !important;
    height: auto !important;
    display: flex !important;
    align-items: center !important;
    overflow: visible !important;
}

.chabad_menu_content,
div.chabad_menu_content {
    max-width: 1400px !important;
    margin: 0 auto !important;
    padding: 0 2rem !important;
    width: 100% !important;
}

/* ===== NAVIGATION - ALL SCREEN SIZES ===== */
ul#menu {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 0.5rem !important;
    flex-wrap: wrap !important;
    font-size: 0 !important;
    margin: 0 !important;
    padding: 0.75rem 0 !important;
    list-style: none !important;
}

ul#menu li.item,
ul#menu li {
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
    background: none !important;
    border: none !important;
    font-size: 0 !important;
    line-height: 0 !important;
    display: inline-block !important;
}

/* Navigation Links */
ul#menu li a.parent,
ul#menu li a,
#navigation a {
    color: #000000 !important;
    font-family: 'Urbanist', sans-serif !important;
    font-size: 17px !important;
    font-weight: 500 !important;
    padding: 1rem 1.5rem !important;
    display: inline-block !important;
    text-decoration: none !important;
    border-radius: 8px !important;
    transition: all 0.3s ease !important;
    position: relative !important;
    background: none !important;
    border: none !important;
    line-height: normal !important;
}

/* Hover - Gold */
ul#menu li a:hover {
    color: #d4af37 !important;
    background: rgba(212, 175, 55, 0.1) !important;
    transform: translateY(-2px) !important;
}

/* Selected - Gold with underline */
ul#menu li a.selected {
    color: #d4af37 !important;
    border-bottom: 2px solid #d4af37 !important;
}

/* Dropdown container */
ul#menu li.arrow {
    position: relative !important;
}

/* Hide dropdown by default */
ul#menu li.arrow .sub_menu {
    position: absolute !important;
    top: calc(100% + 8px) !important;
    left: 50% !important;
    transform: translateX(-50%) translateY(-8px) !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: all 0.3s ease !important;
    background: #ffffff !important;
    border: 2px solid #d4af37 !important;
    border-radius: 12px !important;
    padding: 0.5rem 0 !important;
    min-width: 220px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
    z-index: 1000 !important;
    display: block !important;
}

/* Show dropdown on hover */
ul#menu li.arrow:hover .sub_menu {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateX(-50%) translateY(0) !important;
}

/* Dropdown links */
ul#menu li.arrow .sub_menu ul {
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
}

ul#menu li.arrow .sub_menu ul li {
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    background: none !important;
    display: block !important;
}

ul#menu li.arrow .sub_menu ul li a {
    display: block !important;
    padding: 0.875rem 1.5rem !important;
    color: #000000 !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
    white-space: nowrap !important;
    border-radius: 0 !important;
}

ul#menu li.arrow .sub_menu ul li a:hover {
    background: rgba(212, 175, 55, 0.2) !important;
    color: #d4af37 !important;
    padding-left: 2rem !important;
    transform: none !important;
}

/* ===== MOBILE MENU TOGGLE BUTTON ===== */
.mobile-menu-toggle {
    display: none !important;
    background: #000000 !important;
    color: #d4af37 !important;
    border: 2px solid #d4af37 !important;
    border-radius: 8px !important;
    padding: 0.75rem 2rem !important;
    font-family: 'Urbanist', sans-serif !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    margin: 0.75rem auto !important;
    width: fit-content !important;
}

.mobile-menu-toggle:hover {
    background: #d4af37 !important;
    color: #000000 !important;
}

/* ===== MOBILE NAVIGATION ===== */
@media (max-width: 768px) {
    /* Show the MENU toggle button */
    .mobile-menu-toggle {
        display: block !important;
    }

    /* Fix navigation container on mobile to prevent clipping */
    #navigation,
    div#navigation {
        display: block !important;
        height: auto !important;
        min-height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        padding: 0 0 2rem 0 !important;
    }

    /* Ensure body allows overflow */
    body {
        overflow-x: hidden !important;
        overflow-y: auto !important;
    }

    /* Smaller padding and font sizes for mobile */
    .chabad_menu_content,
    div.chabad_menu_content {
        padding: 0 1rem 2rem 1rem !important;
        display: none !important;
        width: 100% !important;
        overflow: visible !important;
        max-height: none !important;
    }

    /* Show menu when open */
    .chabad_menu_content.menu-open,
    div.chabad_menu_content.menu-open {
        display: block !important;
        overflow: visible !important;
        max-height: none !important;
    }

    ul#menu {
        gap: 0.25rem !important;
        padding: 0.5rem 0 2rem 0 !important;
        overflow: visible !important;
        max-height: none !important;
        height: auto !important;
    }

    ul#menu li {
        overflow: visible !important;
    }

    ul#menu li a.parent,
    ul#menu li a,
    #navigation a {
        font-size: 14px !important;
        padding: 0.75rem 1rem !important;
        white-space: normal !important;
        overflow: visible !important;
    }
}

/* ===== HERO HEADER SECTION ===== */
.chabad_header {
    position: relative !important;
    min-height: 500px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 5rem 2rem !important;
    overflow: hidden !important;
    background: transparent !important;
    margin-top: 0 !important;
}

.chabad_header img {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    z-index: 0 !important;
    filter: brightness(0.9) !important;
}

.chabad_header .headerTitle,
.chabad_header .headerTitle a {
    position: relative !important;
    z-index: 2 !important;
    font-family: 'Urbanist', sans-serif !important;
    font-size: 7rem !important;
    font-weight: 800 !important;
    color: #ffffff !important;
    -webkit-text-stroke: 3px #d4af37 !important;
    text-stroke: 3px #d4af37 !important;
    paint-order: stroke fill !important;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9) !important;
    margin: 0 !important;
    padding: 0 !important;
    text-decoration: none !important;
    text-align: center !important;
    line-height: 1.2 !important;
    animation: gentlePulse 3s ease-in-out infinite !important;
}

@keyframes gentlePulse {
    0%, 100% {
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(212, 175, 55, 0.3) !important;
        -webkit-text-stroke: 3px #d4af37 !important;
    }
    50% {
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.6) !important;
        -webkit-text-stroke: 3px #f4d03f !important;
    }
}

/* ===== LARGE BANNER SECTION ===== */
.large_banner {
    border-radius: 20px !important;
    overflow: hidden !important;
}

/* ===== CUSTOM MESSAGE SECTIONS ===== */
.custom_message {
    max-width: 1100px !important;
    margin: 5rem auto !important;
    padding: 4rem !important;
    background: rgba(255, 255, 255, 0.95) !important;
    border-radius: 20px !important;
    border: none !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
    position: relative !important;
    z-index: 1 !important;
}

.custom_message .title {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 3.2rem !important;
    font-weight: 800 !important;
    color: #000000 !important;
    text-align: center !important;
    margin: 0 0 2.5rem 0 !important;
    text-shadow: none !important;
}

.custom_message .title::after {
    content: '' !important;
    display: block !important;
    width: 80px !important;
    height: 4px !important;
    background: linear-gradient(90deg, #d4af37 0%, #f4d03f 100%) !important;
    margin: 1rem auto 0 !important;
    border-radius: 2px !important;
}

.custom_message .message p {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 1.6rem !important;
    line-height: 1.8 !important;
    color: #2a2a2a !important;
    margin: 0 0 1.5rem 0 !important;
}

/* ===== IMAGE PROMO CARDS ===== */
.sPromo-wrap,
a.sPromo-wrap,
div.sPromo-wrap {
    border-radius: 16px !important;
    overflow: visible !important;
}

/* ===== DONATE NOW CARD - WHITE CARD WITH PULSING TEXT ===== */
/* Keep the white "DONATE NOW" card as-is, just add pulsing text inside */
.sPromo-wrap.donate-card-white {
    /* Let the original white card styling show through */
}

/* Style for the pulsing donate link inside the white card */
.donate-link-pulse {
    display: block !important;
    text-align: center !important;
    margin: 2rem auto 1rem !important;
    padding: 2rem 3rem !important;
    font-family: 'Urbanist', sans-serif !important;
    font-size: 3rem !important;
    font-weight: 900 !important;
    color: #d4af37 !important;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%) !important;
    border: 3px solid #d4af37 !important;
    border-radius: 16px !important;
    text-decoration: none !important;
    text-shadow: 0 3px 15px rgba(212, 175, 55, 0.5) !important;
    letter-spacing: 2px !important;
    transition: all 0.3s ease !important;
    animation: donateTextPulse 2.5s ease-in-out infinite !important;
    cursor: pointer !important;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.3) !important;
}

.donate-link-pulse:hover {
    transform: translateY(-5px) scale(1.05) !important;
    color: #f4d03f !important;
    border-color: #f4d03f !important;
    box-shadow: 0 15px 50px rgba(212, 175, 55, 0.8), 0 0 40px rgba(244, 208, 63, 0.6) !important;
    background: linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%) !important;
}

@keyframes donateTextPulse {
    0%, 100% {
        text-shadow: 0 3px 15px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3) !important;
        border-color: #d4af37 !important;
    }
    50% {
        text-shadow: 0 4px 20px rgba(244, 208, 63, 0.8), 0 0 40px rgba(244, 208, 63, 0.6) !important;
        border-color: #f4d03f !important;
    }
}

/* Hide the separate gold card */
.sPromo-wrap.gold-card-hidden {
    display: none !important;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
    .chabad_header .headerTitle,
    .chabad_header .headerTitle a {
        font-size: 5.5rem !important;
        -webkit-text-stroke: 2.5px #d4af37 !important;
    }

    .custom_message .title {
        font-size: 2.5rem !important;
    }
}

@media (max-width: 768px) {
    .sPromo-wrap,
    a.sPromo-wrap,
    div.sPromo-wrap {
        overflow: visible !important;
    }

    .donate-link-pulse {
        font-size: 2.5rem !important;
        padding: 1.8rem 2.5rem !important;
        margin: 1.5rem auto 1rem !important;
    }

    .chabad_header {
        min-height: 450px !important;
        padding: 3rem 1.5rem 9rem 1.5rem !important;
        align-items: flex-end !important;
    }

    .chabad_header .headerTitle,
    .chabad_header .headerTitle a {
        font-size: 7rem !important;
        font-weight: 700 !important;
        -webkit-text-stroke: 2px #d4af37 !important;
        padding-bottom: 2rem !important;
    }

    .custom_message {
        padding: 2.5rem 1.5rem !important;
        margin: 3rem 1rem !important;
    }

    .custom_message .title {
        font-size: 2rem !important;
    }

    .custom_message .message p {
        font-size: 1.3rem !important;
    }

    .large_banner {
        border-radius: 12px !important;
    }
}

@media (max-width: 480px) {
    .chabad_header {
        min-height: 400px !important;
        padding: 2rem 1rem 8rem 1rem !important;
    }

    .chabad_header .headerTitle,
    .chabad_header .headerTitle a {
        font-size: 5rem !important;
        font-weight: 700 !important;
        -webkit-text-stroke: 1.5px #d4af37 !important;
        padding-bottom: 1.5rem !important;
    }

    .custom_message .title {
        font-size: 1.6rem !important;
    }

    .donate-link-pulse {
        font-size: 2rem !important;
        padding: 1.5rem 2rem !important;
        margin: 1rem auto 0.5rem !important;
    }
}
    `;

    // Append to head
    document.head.appendChild(style);

    // ===== NAVIGATION SETUP =====

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        // Check if button already exists
        if (document.querySelector('.mobile-menu-toggle')) {
            return;
        }

        const navigation = document.querySelector('#navigation');
        if (!navigation) {
            console.warn('⚠️  Navigation container not found');
            return;
        }

        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        // Add click handler
        toggleButton.addEventListener('click', function() {
            const menuContent = document.querySelector('.chabad_menu_content');
            if (menuContent) {
                menuContent.classList.toggle('menu-open');

                // Update button text
                if (menuContent.classList.contains('menu-open')) {
                    toggleButton.textContent = 'CLOSE';
                } else {
                    toggleButton.textContent = 'MENU';
                }
            }
        });

        // Insert button as first child of navigation
        navigation.insertBefore(toggleButton, navigation.firstChild);
        console.log('✅ Created mobile menu toggle button');
    }

    // Force link colors (fix CMS overrides)
    let colorForceCount = 0;
    function forceNavColors(silent = false) {
        const links = document.querySelectorAll('#navigation a, #menu a');

        links.forEach(link => {
            const isSelected = link.classList.contains('selected');
            const color = isSelected ? '#d4af37' : '#000000';

            // Set initial color
            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');

            // CRITICAL: Remove webkit color overrides that cause invisibility
            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');

            // Let CSS handle hover states - no JavaScript listeners needed
        });

        if (!silent) {
            colorForceCount++;
            if (colorForceCount === 1) {
                console.log(`✅ Forced colors on ${links.length} navigation links (will continuously re-apply to fight CMS overrides)`);
            }
        }
    }

    // Merge donate cards: Extract link from gold card and add pulsing text to white card
    function styleDonateCard() {
        // Find all promo cards
        const promoCards = Array.from(document.querySelectorAll('.sPromo-wrap'));

        let whiteCard = null;
        let goldCard = null;
        let donateHref = null;

        // Look for the white "DONATE NOW" card
        promoCards.forEach((card, index) => {
            const caption = card.querySelector('.caption');

            if (caption && caption.textContent.trim().toUpperCase().includes('DONATE NOW')) {
                whiteCard = card;
                whiteCard.classList.add('donate-card-white');
                console.log('✅ Found white DONATE NOW card');

                // Look for the next card (likely the gold card with the link)
                if (index + 1 < promoCards.length) {
                    const nextCard = promoCards[index + 1];

                    // Check if next card has a link (anchor tag)
                    const nextCardLink = nextCard.querySelector('a');
                    if (nextCardLink && nextCardLink.href) {
                        goldCard = nextCard;
                        donateHref = nextCardLink.href;
                        console.log('✅ Found gold card with href:', donateHref);
                    }
                }

                // Also check if this card itself has a wrapper link
                const cardLink = card.querySelector('a[href*="donate"], a[href*="Donate"]');
                if (!donateHref && cardLink && cardLink.href) {
                    donateHref = cardLink.href;
                    console.log('✅ Found donate link in white card:', donateHref);
                }
            }
        });

        // If we found both cards or at least the white card with a link
        if (whiteCard && donateHref) {
            // Check if we already added the pulsing link
            if (!whiteCard.querySelector('.donate-link-pulse')) {
                // Create the pulsing "DONATE NOW" link
                const donateLink = document.createElement('a');
                donateLink.href = donateHref;
                donateLink.className = 'donate-link-pulse';
                donateLink.textContent = 'DONATE NOW';
                donateLink.setAttribute('target', '_blank');
                donateLink.setAttribute('rel', 'noopener noreferrer');

                // Insert the link at the end of the white card's caption or main content area
                const caption = whiteCard.querySelector('.caption');
                if (caption) {
                    caption.parentElement.appendChild(donateLink);
                } else {
                    whiteCard.appendChild(donateLink);
                }

                console.log('✅ Added pulsing DONATE NOW link to white card');
            }

            // Hide the separate gold card if found
            if (goldCard) {
                goldCard.classList.add('gold-card-hidden');
                console.log('✅ Hidden the separate gold card');
            }
        } else if (whiteCard && !donateHref) {
            console.warn('⚠️  Found white DONATE NOW card but no donation link found');
        } else {
            console.warn('⚠️  DONATE NOW card structure not found');
        }
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();
    styleDonateCard();

    // Function to forcefully remove height constraints from cards
    function fixCardHeights() {
        const cards = document.querySelectorAll('.sPromo-wrap');
        cards.forEach(card => {
            // Remove inline height styles
            card.style.removeProperty('height');
            card.style.removeProperty('max-height');
            card.style.removeProperty('min-height');

            // Force overflow to visible
            card.style.overflow = 'visible';
        });

        if (cards.length > 0) {
            console.log('%c✓ Removed height constraints from ' + cards.length + ' cards', 'color: #50fa7b;');
        }
    }

    // Run immediately
    fixCardHeights();

    // Re-run after delay (in case CMS loads content late)
    setTimeout(() => {
        forceNavColors();
        styleDonateCard();
        fixCardHeights();
    }, 500);

    // CRITICAL: The CMS keeps re-applying white colors, so we need to constantly fight it
    // Run forceNavColors every 100ms to maintain black text
    setInterval(() => {
        forceNavColors(true); // silent mode to avoid console spam
    }, 100);

    console.log('%c✅ Modern Kosher Food Bank styles applied!', 'color: #50fa7b; font-size: 16px; font-weight: bold;');
    console.log('%c   • Black/White/Gold theme', 'color: #e8e8e8;');
    console.log('%c   • Responsive navigation with mobile toggle menu', 'color: #e8e8e8;');
    console.log('%c   • Dropdown menus on hover', 'color: #e8e8e8;');
    console.log('%c   • Modern card designs', 'color: #e8e8e8;');
    console.log('%c   • Pulsing "DONATE NOW" link merged into white card', 'color: #d4af37;');
    console.log('%c   • Continuous color forcing to fight CMS overrides', 'color: #f1fa8c;');
    console.log('%cTo remove: refresh the page', 'color: #e8e8e8; font-size: 12px;');
})();
