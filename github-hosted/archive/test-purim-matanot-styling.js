// ====================================================================
// TEST SCRIPT: PURIM MATANOT LA'EVYONIM PAGE STYLING
// ====================================================================
// Paste this in the console to PREVIEW styling before committing
// Run the toggle script to remove it and see original
// ====================================================================

(function() {
    console.clear();
    console.log('%c🎨 TESTING PURIM MATANOT STYLING...', 'background: #000; color: #d4af37; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('════════════════════════════════════════════════════════════════\n');

    // Check if we're on the right page
    var isPurimMatanotPage = window.location.href.indexOf('/aid/6831199/') !== -1 ||
                             window.location.href.indexOf('Purim-Matanot-LaEvyonim.htm') !== -1;

    if (!isPurimMatanotPage) {
        console.log('%c❌ NOT THE PURIM MATANOT PAGE', 'color: #ff5555; font-weight: bold;');
        console.log('This script is for: /aid/6831199/jewish/Purim-Matanot-LaEvyonim.htm');
        console.log('Current URL:', window.location.href);
        return;
    }

    console.log('%c✅ Correct page detected', 'color: #50fa7b; font-weight: bold;');
    console.log('%c⚡ Applying test styling...', 'color: #8be9fd; font-weight: bold;');

    // Add body class
    if (!document.body.classList.contains('purim-matanot-page')) {
        document.body.classList.add('purim-matanot-page');
        console.log('   ✓ Body class added: purim-matanot-page');
    }

    // Inject test CSS
    var testStyleId = 'purim-matanot-test-styles';

    // Remove existing test styles if any
    var existingStyles = document.getElementById(testStyleId);
    if (existingStyles) {
        existingStyles.remove();
    }

    var style = document.createElement('style');
    style.id = testStyleId;
    style.textContent = `
        /* ========================================
           TEST STYLES: PURIM MATANOT LA'EVYONIM
           ======================================== */

        /* Page background - standard gradient */
        body.purim-matanot-page {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #f0f2f5 50%, #e9ecef 75%, #f8f9fa 100%) !important;
            background-attachment: fixed !important;
            padding-top: 70px !important;
            margin: 0 !important;
            min-height: 100vh !important;
        }

        /* Make CMS containers transparent */
        .purim-matanot-page #BodyContainer,
        .purim-matanot-page #co_content_container,
        .purim-matanot-page .body_wrapper,
        .purim-matanot-page #content,
        .purim-matanot-page #co_body_container,
        .purim-matanot-page .master-content-wrapper,
        .purim-matanot-page div.master-content-wrapper,
        .purim-matanot-page #chabad_main_content {
            background-image: none !important;
            background-color: transparent !important;
        }

        /* Hero Header */
        .purim-matanot-page .chabad_header {
            position: relative !important;
            min-height: 500px !important;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: hidden !important;
            margin-bottom: 3rem !important;
        }

        .purim-matanot-page .chabad_header img {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            z-index: 1 !important;
        }

        .purim-matanot-page .chabad_header .headerTitle,
        .purim-matanot-page .chabad_header .headerTitle a {
            position: relative !important;
            z-index: 2 !important;
            color: #ffffff !important;
            font-size: 7rem !important;
            font-weight: 900 !important;
            text-align: center !important;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
            -webkit-text-stroke: 3px #d4af37 !important;
            text-stroke: 3px #d4af37 !important;
            margin: 0 !important;
            padding: 2rem !important;
            animation: gentlePulse 3s ease-in-out infinite !important;
            text-decoration: none !important;
            font-family: 'Urbanist', sans-serif !important;
        }

        /* Pulsing animation */
        @keyframes gentlePulse {
            0%, 100% {
                transform: scale(1);
                text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            }
            50% {
                transform: scale(1.02);
                text-shadow: 0 6px 30px rgba(212, 175, 55, 0.6);
            }
        }

        /* Article body content */
        .purim-matanot-page .co_body.article-body.cf {
            max-width: 1000px !important;
            margin: 0 auto !important;
            padding: 3rem 2rem !important;
            background: #ffffff !important;
            border-radius: 16px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
        }

        /* Article text */
        .purim-matanot-page .co_body.article-body.cf p {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.25rem !important;
            line-height: 1.8 !important;
            color: #333333 !important;
            margin-bottom: 1.5rem !important;
        }

        /* Article headings */
        .purim-matanot-page .co_body.article-body.cf h2,
        .purim-matanot-page .co_body.article-body.cf h3 {
            font-family: 'Urbanist', sans-serif !important;
            font-weight: 800 !important;
            color: #000000 !important;
            margin-top: 2.5rem !important;
            margin-bottom: 1.5rem !important;
            border-bottom: 3px solid #d4af37 !important;
            padding-bottom: 0.75rem !important;
        }

        .purim-matanot-page .co_body.article-body.cf h2 {
            font-size: 2.5rem !important;
        }

        .purim-matanot-page .co_body.article-body.cf h3 {
            font-size: 2rem !important;
        }

        /* Bold/Strong text */
        .purim-matanot-page .co_body.article-body.cf strong,
        .purim-matanot-page .co_body.article-body.cf b {
            color: #d4af37 !important;
            font-weight: 700 !important;
        }

        /* Links */
        .purim-matanot-page .co_body.article-body.cf a {
            color: #d4af37 !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            transition: all 0.3s ease !important;
            border-bottom: 2px solid transparent !important;
        }

        .purim-matanot-page .co_body.article-body.cf a:hover {
            color: #000000 !important;
            border-bottom-color: #d4af37 !important;
        }

        /* Donate buttons */
        .purim-matanot-page .purim-donate-button {
            display: block !important;
            width: 100% !important;
            max-width: 400px !important;
            margin: 2rem auto !important;
            padding: 1.5rem 3rem !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.8rem !important;
            font-weight: 800 !important;
            text-align: center !important;
            text-decoration: none !important;
            color: #ffffff !important;
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%) !important;
            border: 3px solid #000000 !important;
            border-radius: 16px !important;
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4) !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
        }

        .purim-matanot-page .purim-donate-button:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.6) !important;
            background: linear-gradient(135deg, #f4d03f 0%, #d4af37 100%) !important;
            border-color: #d4af37 !important;
        }

        .purim-matanot-page .purim-donate-above {
            margin-bottom: 2rem !important;
        }

        .purim-matanot-page .purim-donate-below {
            margin-top: 2rem !important;
            margin-bottom: 3rem !important;
        }

        /* Hide original "DONATE" text headings from CMS content */
        .purim-matanot-page .co_body.article-body.cf > p > strong:only-child {
            display: none !important;
        }

        .purim-matanot-page .co_body.article-body.cf > p:empty {
            display: none !important;
        }

        /* Images in article - centered and larger */
        .purim-matanot-page .co_body.article-body.cf img {
            width: 85% !important;
            max-width: 700px !important;
            height: auto !important;
            border-radius: 16px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
            margin: 0 auto !important;
            display: block !important;
            transition: all 0.3s ease !important;
        }

        .purim-matanot-page .co_body.article-body.cf img:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4) !important;
        }

        /* Lists */
        .purim-matanot-page .co_body.article-body.cf ul,
        .purim-matanot-page .co_body.article-body.cf ol {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.25rem !important;
            line-height: 1.8 !important;
            margin-bottom: 1.5rem !important;
            padding-left: 2rem !important;
        }

        .purim-matanot-page .co_body.article-body.cf li {
            margin-bottom: 0.75rem !important;
        }

        /* Responsive - Tablet */
        @media (max-width: 1024px) {
            .purim-matanot-page .chabad_header {
                min-height: 400px !important;
            }

            .purim-matanot-page .chabad_header .headerTitle,
            .purim-matanot-page .chabad_header .headerTitle a {
                font-size: 5rem !important;
                -webkit-text-stroke: 2.5px #d4af37 !important;
            }
        }

        /* Responsive - Mobile */
        @media (max-width: 768px) {
            body.purim-matanot-page {
                padding-top: 60px !important;
            }

            .purim-matanot-page .chabad_header {
                min-height: 300px !important;
            }

            .purim-matanot-page .chabad_header .headerTitle,
            .purim-matanot-page .chabad_header .headerTitle a {
                font-size: 3.5rem !important;
                -webkit-text-stroke: 2px #d4af37 !important;
            }

            .purim-matanot-page .co_body.article-body.cf {
                padding: 2rem 1.5rem !important;
            }

            .purim-matanot-page .co_body.article-body.cf p {
                font-size: 1.1rem !important;
            }

            .purim-matanot-page .co_body.article-body.cf h2 {
                font-size: 2rem !important;
            }

            .purim-matanot-page .co_body.article-body.cf h3 {
                font-size: 1.7rem !important;
            }

            .purim-matanot-page .purim-donate-button {
                font-size: 1.5rem !important;
                padding: 1.25rem 2rem !important;
                max-width: 100% !important;
            }
        }

        /* Small mobile */
        @media (max-width: 480px) {
            .purim-matanot-page .chabad_header .headerTitle,
            .purim-matanot-page .chabad_header .headerTitle a {
                font-size: 2.5rem !important;
                -webkit-text-stroke: 1.5px #d4af37 !important;
            }
        }

        /* TEST INDICATOR */
        body.purim-matanot-page::before {
            content: "🎨 TEST MODE - Purim Matanot Styling";
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background: #d4af37;
            color: #000000;
            padding: 0.5rem 2rem;
            font-family: 'Urbanist', sans-serif;
            font-weight: 700;
            font-size: 0.9rem;
            z-index: 999999;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
    `;

    document.head.appendChild(style);
    console.log('   ✓ Test CSS injected');

    // Add donate buttons around the image
    function addDonateButtons() {
        var articleBody = document.querySelector('.co_body.article-body.cf');
        if (!articleBody) return;

        var img = articleBody.querySelector('img');
        if (!img) return;

        // Check if buttons already exist
        if (document.querySelector('.purim-donate-button')) return;

        // Create button above image
        var buttonAbove = document.createElement('a');
        buttonAbove.href = 'https://www.jrcc.org/templates/articlecco_cdo/aid/6831198/jewish/Matanot-LaEvyonim.htm';
        buttonAbove.className = 'purim-donate-button purim-donate-above';
        buttonAbove.textContent = 'DONATE NOW';
        buttonAbove.setAttribute('target', '_blank');

        // Create button below image
        var buttonBelow = document.createElement('a');
        buttonBelow.href = 'https://www.jrcc.org/templates/articlecco_cdo/aid/6831198/jewish/Matanot-LaEvyonim.htm';
        buttonBelow.className = 'purim-donate-button purim-donate-below';
        buttonBelow.textContent = 'DONATE NOW';
        buttonBelow.setAttribute('target', '_blank');

        // Insert buttons
        img.parentNode.insertBefore(buttonAbove, img);
        img.parentNode.insertBefore(buttonBelow, img.nextSibling);

        console.log('   ✓ Donate buttons added');
    }

    // Run after a short delay to ensure content is loaded
    setTimeout(addDonateButtons, 500);

    // Create mobile menu toggle
    var nav = document.querySelector('#navigation');
    if (nav && !document.querySelector('.mobile-menu-toggle')) {
        var toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle test-toggle';
        toggle.textContent = '☰ Menu';
        toggle.style.cssText = 'display: none; position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: #d4af37; color: #000; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; font-weight: 700; z-index: 100000;';

        toggle.onclick = function() {
            var menu = document.querySelector('#menu, #navigation ul');
            if (menu) {
                var currentDisplay = window.getComputedStyle(menu).display;
                menu.style.display = currentDisplay === 'none' ? 'block' : 'none';
            }
        };

        nav.insertBefore(toggle, nav.firstChild);
        console.log('   ✓ Mobile menu toggle created');
    }

    // Force navigation colors
    function forceNavColors() {
        var navLinks = document.querySelectorAll('#navigation a, #menu a');
        navLinks.forEach(function(link) {
            link.style.setProperty('color', '#000000', 'important');
            link.style.setProperty('-webkit-text-fill-color', '#000000', 'important');

            var isSelected = link.classList.contains('selected') ||
                           link.parentElement.classList.contains('selected');

            if (isSelected) {
                link.style.setProperty('color', '#d4af37', 'important');
                link.style.setProperty('-webkit-text-fill-color', '#d4af37', 'important');
            }
        });
    }

    forceNavColors();
    setInterval(forceNavColors, 100);
    console.log('   ✓ Navigation colors applied');

    console.log('\n%c════════════════════════════════════════════════════════════════', 'color: #666;');
    console.log('%c✅ TEST STYLING APPLIED!', 'color: #50fa7b; font-size: 18px; font-weight: bold;');
    console.log('%c════════════════════════════════════════════════════════════════', 'color: #666;');

    console.log('\n%c📋 TEST MODE ACTIVE', 'color: #d4af37; font-size: 16px; font-weight: bold;');
    console.log('You should see:');
    console.log('  ✓ Gold banner at top saying "TEST MODE"');
    console.log('  ✓ White/gray gradient background');
    console.log('  ✓ Hero header with gold stroke text');
    console.log('  ✓ Black navigation with gold hover/selected');
    console.log('  ✓ Styled article content with gold accents');

    console.log('\n%c💡 TO REMOVE TEST STYLING:', 'color: #8be9fd; font-size: 14px; font-weight: bold;');
    console.log('1. Refresh the page (F5 or Ctrl+R)');
    console.log('   OR');
    console.log('2. Run this command:');
    console.log('   document.getElementById("purim-matanot-test-styles").remove();');
    console.log('   document.body.classList.remove("purim-matanot-page");');
    console.log('   document.querySelector(".test-toggle")?.remove();');

    console.log('\n%c👍 If you like it, let me know and I\'ll add it to production!', 'color: #50fa7b; font-weight: bold;');
    console.log('');
})();
