// ====================================================================
// GET HELP PAGE STYLING - BROWSER CONSOLE TEST
// ====================================================================
// HOW TO USE:
// 1. Open https://www.jrcc.org/templates/articlecco_cdo/aid/6827292/jewish/Get-Help.htm
// 2. Open browser DevTools (F12 or Right-click → Inspect)
// 3. Go to the Console tab
// 4. Copy and paste this ENTIRE file into the console
// 5. Press Enter
// 6. The styling will be applied immediately - you can see changes in real-time!
// 7. To remove: Just refresh the page
// ====================================================================

(function() {
    console.clear();
    console.log('%c🎨 Applying Modern Get Help Page Styles...', 'color: #d4af37; font-size: 20px; font-weight: bold;');

    // Remove any existing versions
    const existing = document.getElementById('get-help-test-styles');
    if (existing) existing.remove();

    // Create a style element
    const style = document.createElement('style');
    style.id = 'get-help-test-styles';

    // Add all the CSS
    style.textContent = `
/* ====================================================================
   GET HELP PAGE STYLING - BLACK/WHITE/GOLD THEME
   Modern Form Design with Full Mobile Responsiveness
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

/* Remove any decorative background elements */
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
    .mobile-menu-toggle {
        display: block !important;
    }

    #navigation,
    div#navigation {
        display: block !important;
        height: auto !important;
        min-height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        padding: 0 0 2rem 0 !important;
    }

    body {
        overflow-x: hidden !important;
        overflow-y: auto !important;
    }

    .chabad_menu_content,
    div.chabad_menu_content {
        padding: 0 1rem 2rem 1rem !important;
        display: none !important;
        width: 100% !important;
        overflow: visible !important;
        max-height: none !important;
    }

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
    min-height: 350px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 4rem 2rem !important;
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
    font-size: 5.5rem !important;
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

/* ===== FORM CONTENT STYLING ===== */

/* Make parent containers transparent */
.chabad_left_column,
#ContentArea {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
}

/* Style the article (form container) as a beautiful card */
article {
    max-width: 1100px !important;
    margin: 4rem auto !important;
    padding: 5rem 4rem !important;
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%) !important;
    border-radius: 24px !important;
    border: 1px solid rgba(212, 175, 55, 0.2) !important;
    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.15),
        0 10px 30px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
    position: relative !important;
    z-index: 1 !important;
}

/* Page Title "Get Help" */
h1.article-header__title,
h1.js-article-title,
.article-header__title {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 3.5rem !important;
    font-weight: 900 !important;
    color: #000000 !important;
    text-align: center !important;
    margin: 0 0 3rem 0 !important;
    text-shadow: none !important;
    padding-bottom: 1.5rem !important;
    border-bottom: 5px solid #d4af37 !important;
    letter-spacing: -0.5px !important;
}

/* Form styling */
form {
    font-family: 'Urbanist', sans-serif !important;
}

/* Form labels */
form label,
form .label,
form strong {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 1.5rem !important;
    font-weight: 600 !important;
    color: #000000 !important;
    margin-bottom: 0.5rem !important;
    display: block !important;
}

/* Small helper text */
form small,
form .small-text {
    font-size: 1.2rem !important;
    color: #666666 !important;
}

/* Form inputs and textareas */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
textarea,
select {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 1.5rem !important;
    padding: 1.2rem 1.5rem !important;
    border: 2px solid #e0e0e0 !important;
    border-radius: 12px !important;
    background: #ffffff !important;
    color: #1a1a1a !important;
    transition: all 0.3s ease !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="number"]:focus,
textarea:focus,
select:focus {
    outline: none !important;
    border-color: #d4af37 !important;
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1) !important;
}

/* Textarea specific */
textarea {
    min-height: 150px !important;
    resize: vertical !important;
}

/* Checkboxes and radio buttons */
input[type="checkbox"],
input[type="radio"] {
    width: 1.8rem !important;
    height: 1.8rem !important;
    margin-right: 1rem !important;
    cursor: pointer !important;
    accent-color: #d4af37 !important;
}

/* Checkbox/radio labels */
input[type="checkbox"] + label,
input[type="radio"] + label {
    display: inline !important;
    font-size: 1.4rem !important;
    font-weight: 400 !important;
    cursor: pointer !important;
}

/* Submit button */
input[type="submit"],
button[type="submit"],
.submit-button {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 1.8rem !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%) !important;
    border: none !important;
    border-radius: 12px !important;
    padding: 1.5rem 4rem !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3) !important;
    margin-top: 2rem !important;
}

input[type="submit"]:hover,
button[type="submit"]:hover,
.submit-button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5) !important;
    background: linear-gradient(135deg, #f4d03f 0%, #d4af37 100%) !important;
}

/* Form spacing */
.form-row,
.form-group,
form > div {
    margin-bottom: 2rem !important;
}

/* Required field indicator */
.required,
.req,
span[style*="color: red"],
span[style*="color:red"] {
    color: #d4af37 !important;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
    .chabad_header .headerTitle,
    .chabad_header .headerTitle a {
        font-size: 4rem !important;
        -webkit-text-stroke: 2.5px #d4af37 !important;
    }

    h1.article-header__title,
    .article-header__title {
        font-size: 2.8rem !important;
    }

    article {
        padding: 4rem 3rem !important;
    }
}

@media (max-width: 768px) {
    .chabad_header {
        min-height: 300px !important;
        padding: 3rem 1.5rem !important;
    }

    .chabad_header .headerTitle,
    .chabad_header .headerTitle a {
        font-size: 5rem !important;
        font-weight: 700 !important;
        -webkit-text-stroke: 2px #d4af37 !important;
    }

    article {
        padding: 3rem 2rem !important;
        margin: 2rem 1rem !important;
        border-radius: 20px !important;
    }

    h1.article-header__title,
    .article-header__title {
        font-size: 2.2rem !important;
        border-bottom-width: 4px !important;
        margin-bottom: 2rem !important;
    }

    input[type="submit"],
    button[type="submit"],
    .submit-button {
        width: 100% !important;
        padding: 1.5rem 2rem !important;
    }
}

@media (max-width: 480px) {
    .chabad_header {
        min-height: 250px !important;
        padding: 2rem 1rem !important;
    }

    .chabad_header .headerTitle,
    .chabad_header .headerTitle a {
        font-size: 3.5rem !important;
        font-weight: 700 !important;
        -webkit-text-stroke: 1.5px #d4af37 !important;
    }

    article {
        padding: 2.5rem 1.5rem !important;
        margin: 1.5rem 0.5rem !important;
        border-radius: 16px !important;
    }

    h1.article-header__title,
    .article-header__title {
        font-size: 1.8rem !important;
        border-bottom-width: 3px !important;
        margin-bottom: 1.5rem !important;
    }

    form label,
    form .label {
        font-size: 1.3rem !important;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="number"],
    textarea,
    select {
        font-size: 1.4rem !important;
        padding: 1rem 1.2rem !important;
    }
}
    `;

    // Append to head
    document.head.appendChild(style);

    // ===== NAVIGATION SETUP =====

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
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

        toggleButton.addEventListener('click', function() {
            const menuContent = document.querySelector('.chabad_menu_content');
            if (menuContent) {
                menuContent.classList.toggle('menu-open');

                if (menuContent.classList.contains('menu-open')) {
                    toggleButton.textContent = 'CLOSE';
                } else {
                    toggleButton.textContent = 'MENU';
                }
            }
        });

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

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');

            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');
        });

        if (!silent) {
            colorForceCount++;
            if (colorForceCount === 1) {
                console.log(`✅ Forced colors on ${links.length} navigation links (will continuously re-apply to fight CMS overrides)`);
            }
        }
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();

    // Re-run after delay (in case CMS loads content late)
    setTimeout(() => {
        forceNavColors(true);
    }, 500);

    // CRITICAL: The CMS keeps re-applying white colors, so we need to constantly fight it
    setInterval(() => {
        forceNavColors(true); // silent mode to avoid console spam
    }, 100);

    console.log('%c✅ Modern Get Help page styles applied!', 'color: #50fa7b; font-size: 16px; font-weight: bold;');
    console.log('%c   • Black/White/Gold theme', 'color: #e8e8e8;');
    console.log('%c   • Responsive navigation with mobile toggle menu', 'color: #e8e8e8;');
    console.log('%c   • Modern form design with gold accents', 'color: #e8e8e8;');
    console.log('%c   • Enhanced input fields and submit button', 'color: #d4af37;');
    console.log('%c   • Continuous color forcing to fight CMS overrides', 'color: #f1fa8c;');
    console.log('%cTo remove: refresh the page', 'color: #e8e8e8; font-size: 12px;');
})();
