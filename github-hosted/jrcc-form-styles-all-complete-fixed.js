/* JRCC Form-Specific Inline Styling Functions - FULLY FIXED VERSION */
/* Includes ALL 5 form styling functions with proper banner hiding and typewriter animation */

// Global initialization tracking
var gmachInitialized = false;
var healthyAtHomeInitialized = false;
var seniorsInitialized = false;
var yeshivaInitialized = false;
var volunteerInitialized = false;
var aboutUsInitialized = false;
var kosherFoodBankInitialized = false;
var getHelpInitialized = false;

// ========================================
// TYPEWRITER ANIMATION HELPER
// ========================================
function addTypewriterEffect(element) {
    if (!element || element.classList.contains('typewriter-ready')) return;

    element.classList.add('typewriter-ready');
    var originalText = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    var index = 0;
    var speed = 50; // Typing speed in milliseconds

    function typeWriter() {
        if (index < originalText.length) {
            element.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing after a small delay for dramatic effect
    setTimeout(function() {
        typeWriter();
    }, 300);
}

// ========================================
// 1. GMACH DONATION FORM STYLING
// ========================================
function styleGmachDonationForm() {
    if (gmachInitialized) return;

    // Don't check URL - just look for the form
    var form = document.querySelector('form#form1') ||
               document.querySelector('form[name="form_3767140"]');
    if (!form) return;

    gmachInitialized = true;

    // Apply page background (BLACK gradient)
    document.body.style.cssText = (document.body.style.cssText || '') + 'background:linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)!important;';

    // Hide breadcrumbs
    var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
    }

    // Hide banner images/decorators
    var banners = document.querySelectorAll('.banner_image, .page_banner, .article_banner, [class*="banner"] img, .article_banner_wrapper, .page_header_image');
    for (var i = 0; i < banners.length; i++) {
        banners[i].style.cssText = 'display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;';
    }

    // Remove background from header but keep it visible
    var articleHeader = document.querySelector('header.article-header');
    if (articleHeader) {
        articleHeader.style.cssText = 'background:none!important;background-image:none!important;background-color:transparent!important;padding:0!important;margin:0!important;border:none!important;display:block!important;visibility:visible!important;width:100%!important;text-align:center!important;';
    }

    // Remove decorator backgrounds
    var masterWrappers = document.querySelectorAll('.master-content-wrapper, [class*="master-content"]');
    for (var i = 0; i < masterWrappers.length; i++) {
        masterWrappers[i].style.cssText = 'background:none!important;background-image:none!important;background-color:transparent!important;padding:2rem 0!important;display:block!important;visibility:visible!important;';
    }

    // Find and style the page title - multiple strategies
    var pageTitle = null;
    var h1Elements = document.querySelectorAll('h1');
    for (var i = 0; i < h1Elements.length; i++) {
        if (h1Elements[i].textContent.toLowerCase().indexOf('gmach') !== -1 ||
            h1Elements[i].textContent.toLowerCase().indexOf('donation') !== -1) {
            pageTitle = h1Elements[i];
            break;
        }
    }
    if (!pageTitle) {
        pageTitle = document.querySelector('.master-content-wrapper h1, .master-content-wrapper h2, div.master-content-wrapper h1, h1');
    }

    if (pageTitle) {
        pageTitle.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:3.75rem!important;font-weight:800!important;color:#fbbf24!important;text-align:center!important;margin-left:auto!important;margin-right:auto!important;margin-top:0!important;margin-bottom:3rem!important;padding:2.5rem!important;background:rgba(0,0,0,0.5)!important;border:2px solid rgba(251,191,36,0.3)!important;border-radius:12px!important;text-shadow:2px 2px 4px rgba(0,0,0,0.5)!important;display:inline-block!important;visibility:visible!important;opacity:1!important;max-width:1100px!important;width:90%!important;z-index:10!important;';
        addTypewriterEffect(pageTitle);
    }

    // Hide duplicate form titles
    var formTitles = form.querySelectorAll('p[align="center"], [style*="text-align: center"], [style*="text-align:center"]');
    for (var i = 0; i < formTitles.length; i++) {
        var text = formTitles[i].textContent.trim().toLowerCase();
        if (text.indexOf('gmach') !== -1 && text.indexOf('donation') !== -1) {
            formTitles[i].style.cssText = 'display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;';
        }
    }

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:3rem auto!important;padding:4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels - NO ANIMATION
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#1e5a8e!important;margin-bottom:0.75rem!important;display:block!important;opacity:1!important;transform:none!important;';
    }

    // Style ALL text-like elements in form (CRITICAL!)
    var allFormElements = form.querySelectorAll('*');
    for (var i = 0; i < allFormElements.length; i++) {
        var el = allFormElements[i];
        var tagName = el.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'select' || tagName === 'button' || tagName === 'textarea') continue;

        var hasDirectText = false;
        for (var j = 0; j < el.childNodes.length; j++) {
            if (el.childNodes[j].nodeType === 3 && el.childNodes[j].textContent.trim().length > 0) {
                hasDirectText = true;
                break;
            }
        }
        if (hasDirectText) {
            el.style.fontSize = '1.5rem';
            el.style.fontFamily = 'Urbanist, sans-serif';
            el.style.lineHeight = '1.6';
        }
    }

    // Style all form inputs
    // NOTE: Exclude select elements here as they need different padding treatment
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;padding:1.25rem 2rem!important;border:2px solid #d1d9e6!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;';

        inputs[i].addEventListener('focus', function() {
            this.style.borderColor = '#2a75b8';
            this.style.boxShadow = '0 0 0 3px rgba(42,117,184,0.1)';
            this.style.outline = 'none';
        });
        inputs[i].addEventListener('blur', function() {
            this.style.borderColor = '#d1d9e6';
            this.style.boxShadow = 'none';
        });
    }

    // Style select dropdowns
    var selects = form.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;padding:1.25rem 2rem!important;border:2px solid #d1d9e6!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;cursor:pointer!important;appearance:none!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%231e5a8e\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:right 2rem center!important;padding-right:3.5rem!important;';
    }

    // Style headings in form
    var headings = form.querySelectorAll('h2, h3, h4, legend, b, strong, u');
    for (var i = 0; i < headings.length; i++) {
        var text = headings[i].textContent.trim().toLowerCase();
        if (text.length > 0 && (text.indexOf(':') !== -1 || text.indexOf('donation') !== -1 || text.indexOf('information') !== -1 || text.indexOf('payment') !== -1 || text.indexOf('options') !== -1)) {
            headings[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:2rem!important;font-weight:700!important;color:#8b0000!important;margin:2rem 0 1rem 0!important;padding-bottom:0.5rem!important;border-bottom:2px solid #e8f4f8!important;display:block!important;';
        } else {
            headings[i].style.fontSize = '1.5rem';
            headings[i].style.fontWeight = '600';
            headings[i].style.fontFamily = 'Urbanist, sans-serif';
        }
    }

    // Style submit buttons
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"], .form-submit button, [id*="submit"] input[type="submit"]');
    for (var i = 0; i < submitButtons.length; i++) {
        submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #1e5a8e 0%, #2a75b8 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(30,90,142,0.2)!important;min-width:240px!important;margin-top:2rem!important;margin-right:1rem!important;display:inline-block!important;';

        submitButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #0d4a73 0%, #1e5a8e 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(30,90,142,0.3)';
        });
        submitButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #1e5a8e 0%, #2a75b8 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(30,90,142,0.2)';
        });
    }

    // Style reset buttons
    var resetButtons = form.querySelectorAll('button[type="reset"], input[type="reset"]');
    for (var i = 0; i < resetButtons.length; i++) {
        resetButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #6b7280 0%, #4b5563 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(75,85,99,0.2)!important;min-width:240px!important;margin-top:2rem!important;display:inline-block!important;';

        resetButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #4b5563 0%, #374151 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(75,85,99,0.3)';
        });
        resetButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(75,85,99,0.2)';
        });
    }
}

// ========================================
// 2. HEALTHY AT HOME FORM STYLING
// ========================================
function styleHealthyAtHomeForm() {
    if (healthyAtHomeInitialized) return;

    // Check if we're on the Healthy At Home Registration page by URL
    var isHealthyAtHomePage = window.location.href.indexOf('/aid/6991302/') !== -1 ||
                              window.location.href.indexOf('Healthy-At-Home-Registration') !== -1;

    if (!isHealthyAtHomePage) return; // Not the right page

    // Find the form - should be form_6991302 based on article ID
    var form = document.querySelector('form[name="form_6991302"]') ||
               document.querySelector('form[id="6991302"]') ||
               document.querySelector('form.userform-form');

    if (!form) return; // Form not found, will retry

    healthyAtHomeInitialized = true;

    // Apply page background (LIGHT gradient - white to lavender to match purple banner)
    document.body.style.cssText = (document.body.style.cssText || '') + 'background:linear-gradient(135deg, #f8f9fa 0%, #f3f0ff 100%)!important;';

    // IMPORTANT: Find the page title OR create it if it doesn't exist
    var pageTitle = null;

    console.log('JRCC: Searching for Healthy At Home title...');

    // Strategy 1: Direct h1 search
    var h1Elements = document.querySelectorAll('h1');
    console.log('JRCC: Found', h1Elements.length, 'h1 elements on page');
    for (var i = 0; i < h1Elements.length; i++) {
        console.log('JRCC: H1 text:', h1Elements[i].textContent);
        if (h1Elements[i].textContent.toLowerCase().indexOf('healthy') !== -1 ||
            h1Elements[i].textContent.toLowerCase().indexOf('registration') !== -1) {
            pageTitle = h1Elements[i];
            // Mark it as protected
            pageTitle.setAttribute('data-protect-title', 'true');
            console.log('JRCC: Found title via Strategy 1:', pageTitle.textContent);
            break;
        }
    }

    // Strategy 2: Search within master-content-wrapper
    if (!pageTitle) {
        pageTitle = document.querySelector('.master-content-wrapper h1, .master-content-wrapper h2, div.master-content-wrapper h1');
        if (pageTitle) {
            pageTitle.setAttribute('data-protect-title', 'true');
            console.log('JRCC: Found title via Strategy 2:', pageTitle.textContent);
        }
    }

    // Strategy 3: Any h1 on page
    if (!pageTitle) {
        pageTitle = document.querySelector('h1');
        if (pageTitle) {
            pageTitle.setAttribute('data-protect-title', 'true');
            console.log('JRCC: Found title via Strategy 3:', pageTitle.textContent);
        }
    }

    // Strategy 4: CREATE the title if it doesn't exist
    if (!pageTitle) {
        console.log('JRCC: Title not found - creating new title element');
        pageTitle = document.createElement('h1');
        pageTitle.textContent = 'Healthy At Home Registration';
        pageTitle.setAttribute('data-protect-title', 'true');

        // Find the best place to insert it
        var insertTarget = form || document.querySelector('.master-content-wrapper') || document.querySelector('#co_body_container') || document.body;

        if (form && form.parentElement) {
            // Insert before the form
            form.parentElement.insertBefore(pageTitle, form);
            console.log('JRCC: Created title before form');
        } else if (insertTarget) {
            // Insert at the beginning of the target
            insertTarget.insertBefore(pageTitle, insertTarget.firstChild);
            console.log('JRCC: Created title in container');
        }
    }

    // Hide breadcrumbs
    var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
    }

    // AGGRESSIVE: Hide ALL banner/header elements completely (but not our protected title)
    var bannersToHide = document.querySelectorAll(
        '.banner_image, .page_banner, .article_banner, [class*="banner"] img, ' +
        '.article_banner_wrapper, .page_header_image, .decorator, ' +
        '.article-header, header.article-header, header[class*="article"], ' +
        '.article-header *, header.article-header *, header img'
    );
    for (var i = 0; i < bannersToHide.length; i++) {
        // Don't hide if this is our protected title or contains it
        if (!bannersToHide[i].hasAttribute('data-protect-title') &&
            !bannersToHide[i].querySelector('[data-protect-title="true"]')) {
            bannersToHide[i].style.cssText = 'display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;';
        }
    }

    // AGGRESSIVE: Clear ALL elements with inline background styles in header area
    var elementsWithBg = document.querySelectorAll('[style*="background"]');
    for (var i = 0; i < elementsWithBg.length; i++) {
        var el = elementsWithBg[i];
        // Only target elements in the top area of the page (approximate check)
        try {
            if (!el.querySelector('form') && !el.closest('form')) { // Don't affect form elements
                el.style.setProperty('background', 'none', 'important');
                el.style.setProperty('background-image', 'none', 'important');

                // If it's a header-related element, hide it
                if (el.className && (el.className.indexOf('header') !== -1 || el.className.indexOf('banner') !== -1)) {
                    el.style.setProperty('display', 'none', 'important');
                }
            }
        } catch(e) {
            // Fallback for older browsers without closest()
            el.style.setProperty('background', 'none', 'important');
            el.style.setProperty('background-image', 'none', 'important');
        }
    }

    // AGGRESSIVE: Target ALL possible header containers
    var headerContainers = document.querySelectorAll(
        'header, [class*="header"], [class*="banner"], [class*="decorator"], ' +
        '#co_body_container > div:first-child'
    );
    for (var i = 0; i < headerContainers.length; i++) {
        var container = headerContainers[i];
        // Check if it has a background image
        var computedStyle = window.getComputedStyle(container);
        if (computedStyle.backgroundImage && computedStyle.backgroundImage !== 'none') {
            container.style.setProperty('background', 'none', 'important');
            container.style.setProperty('background-image', 'none', 'important');
            container.style.setProperty('background-color', 'transparent', 'important');

            // If it's a header element, hide it (but not if it contains our protected title)
            if ((container.tagName === 'HEADER' || (container.className && container.className.indexOf('article-header') !== -1)) &&
                !container.hasAttribute('data-protect-title') &&
                !container.querySelector('[data-protect-title="true"]')) {
                container.style.setProperty('display', 'none', 'important');
            }
        }
    }

    // Specifically target the decorator wrapper - but only hide background, not content
    var decoratorWrapper = document.querySelector('div.master-content-wrapper.g960');
    if (decoratorWrapper) {
        decoratorWrapper.style.cssText = 'background:none!important;background-image:none!important;background-color:transparent!important;padding:2rem 0!important;display:block!important;visibility:visible!important;';
    }

    // Also try to remove background from any parent wrapper that might contain decorators
    var masterWrappers = document.querySelectorAll('.master-content-wrapper, [class*="master-content"]');
    for (var i = 0; i < masterWrappers.length; i++) {
        masterWrappers[i].style.cssText = 'background:none!important;background-image:none!important;background-color:transparent!important;padding:2rem 0!important;display:block!important;visibility:visible!important;';
    }

    // Style the main page title - BLACK color (no dark box background)
    // (pageTitle was already found/created and protected earlier)
    if (pageTitle) {
        console.log('JRCC: Styling title:', pageTitle.textContent);

        // FIRST: Ensure all parent elements are visible
        var currentElement = pageTitle;
        while (currentElement && currentElement !== document.body) {
            // Force visibility on all ancestors
            currentElement.style.setProperty('display', 'block', 'important');
            currentElement.style.setProperty('visibility', 'visible', 'important');
            currentElement.style.setProperty('opacity', '1', 'important');
            currentElement.style.setProperty('height', 'auto', 'important');
            currentElement.style.setProperty('overflow', 'visible', 'important');

            // Remove any background from parent headers
            if (currentElement.tagName === 'HEADER' ||
                (currentElement.className && currentElement.className.toString().indexOf('header') !== -1)) {
                currentElement.style.setProperty('background', 'transparent', 'important');
                currentElement.style.setProperty('background-image', 'none', 'important');
            }

            currentElement = currentElement.parentElement;
        }

        // NOW style the title itself
        pageTitle.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:3.75rem!important;font-weight:800!important;color:#000000!important;text-align:center!important;margin-left:auto!important;margin-right:auto!important;margin-top:0!important;margin-bottom:2rem!important;padding:2rem 2rem 0 2rem!important;background:transparent!important;border:none!important;border-radius:0!important;text-shadow:0 2px 4px rgba(0,0,0,0.1)!important;display:block!important;visibility:visible!important;opacity:1!important;max-width:1100px!important;width:90%!important;z-index:9999!important;position:relative!important;height:auto!important;overflow:visible!important;';

        // Store the original text before clearing for animation
        var originalText = pageTitle.textContent;
        console.log('JRCC: Starting typewriter animation for:', originalText);

        // Only do typewriter animation if we have text
        if (originalText && originalText.trim()) {
            var charIndex = 0;

            // Clear the text and add cursor
            pageTitle.textContent = '';
            pageTitle.style.borderRight = '3px solid #000';
            pageTitle.style.paddingRight = '5px';

            // Typewriter function
            function typeWriter() {
                if (charIndex < originalText.length) {
                    pageTitle.textContent += originalText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 80); // 80ms per character
                } else {
                    // Remove cursor after typing completes
                    setTimeout(function() {
                        pageTitle.style.borderRight = 'none';
                        pageTitle.style.paddingRight = '2rem';
                    }, 500);
                }
            }

            // Start typing animation
            setTimeout(typeWriter, 300);
        }

        // ENSURE the title and its parent are visible
        // Make sure the title's parent container is also visible
        if (pageTitle.parentElement) {
            pageTitle.parentElement.style.setProperty('display', 'block', 'important');
            pageTitle.parentElement.style.setProperty('visibility', 'visible', 'important');
            pageTitle.parentElement.style.setProperty('opacity', '1', 'important');
        }

        // Center the title's parent if it's a wrapper div
        if (pageTitle.parentElement && pageTitle.parentElement.className &&
            (pageTitle.parentElement.className.indexOf('wrapper') !== -1 ||
             pageTitle.parentElement.className.indexOf('container') !== -1)) {
            pageTitle.parentElement.style.setProperty('text-align', 'center', 'important');
        }
    }

    // Hide the secondary heading "Healthy at Home - Seniors Event Registration" and duplicate titles
    var secondaryHeadings = document.querySelectorAll('h1, h2, h3');
    for (var i = 0; i < secondaryHeadings.length; i++) {
        var headingText = secondaryHeadings[i].textContent.trim().toLowerCase();
        // Hide the duplicate "Healthy at Home Registration" title if it's not our styled one
        if ((headingText === 'healthy at home registration' && secondaryHeadings[i] !== pageTitle) ||
            headingText.indexOf('seniors event') !== -1 ||
            (headingText.indexOf('healthy') !== -1 && headingText.indexOf('event') !== -1)) {
            secondaryHeadings[i].style.cssText = 'display:none!important;margin:0!important;padding:0!important;height:0!important;visibility:hidden!important;';
        }
    }

    // Remove bottom padding from the container that wraps the title
    var bodyContainer = document.querySelector('#co_body_container, .g700, div.g700');
    if (bodyContainer) {
        bodyContainer.style.setProperty('padding-bottom', '0', 'important');
    }

    // Style the form container - LIGHTER shadow for light background
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels - MUCH BIGGER text (1.75rem)
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#1e5a8e!important;margin-bottom:0.75rem!important;display:block!important;';
    }

    // Style ALL text-like elements in form
    var allFormElements = form.querySelectorAll('*');
    for (var i = 0; i < allFormElements.length; i++) {
        var el = allFormElements[i];
        var tagName = el.tagName.toLowerCase();

        // Skip inputs, selects, buttons - we style those separately
        if (tagName === 'input' || tagName === 'select' || tagName === 'button' || tagName === 'textarea') {
            continue;
        }

        // Get direct text content (not from children)
        var hasDirectText = false;
        for (var j = 0; j < el.childNodes.length; j++) {
            if (el.childNodes[j].nodeType === 3 && el.childNodes[j].textContent.trim().length > 0) {
                hasDirectText = true;
                break;
            }
        }

        // If element has direct text, make it bigger
        if (hasDirectText) {
            el.style.fontSize = '1.5rem';
            el.style.fontFamily = 'Urbanist, sans-serif';
            el.style.lineHeight = '1.6';
        }
    }

    // Style all form inputs - BIGGER text (1.35rem)
    // NOTE: Exclude select elements here as they need different padding treatment
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;padding:1.25rem 2rem!important;border:2px solid #d1d9e6!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;';

        // Add focus event listeners
        inputs[i].addEventListener('focus', function() {
            this.style.borderColor = '#2a75b8';
            this.style.boxShadow = '0 0 0 3px rgba(42,117,184,0.1)';
            this.style.outline = 'none';
        });
        inputs[i].addEventListener('blur', function() {
            this.style.borderColor = '#d1d9e6';
            this.style.boxShadow = 'none';
        });
    }

    // Style select dropdowns with custom arrow
    // NOTE: padding removed because it causes selected text to become invisible
    // This is a known browser/CMS issue with custom padding on select elements
    var selects = form.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;border:2px solid #d1d9e6!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;cursor:pointer!important;appearance:none!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%231e5a8e\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:right 2rem center!important;';
    }

    // Style headings in form
    var headings = form.querySelectorAll('h2, h3, h4, legend, b, strong, u');
    for (var i = 0; i < headings.length; i++) {
        var text = headings[i].textContent.trim().toLowerCase();
        if (text.length > 0 && (text.indexOf(':') !== -1 || text.indexOf('information') !== -1 || text.indexOf('location') !== -1 || text.indexOf('event') !== -1)) {
            headings[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:2rem!important;font-weight:700!important;color:#8b0000!important;margin:2rem 0 1rem 0!important;padding-bottom:0.5rem!important;border-bottom:2px solid #e8f4f8!important;display:block!important;';
        } else {
            headings[i].style.fontSize = '1.5rem';
            headings[i].style.fontWeight = '600';
            headings[i].style.fontFamily = 'Urbanist, sans-serif';
        }
    }

    // Style submit button - BLUE gradient
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"], .form-submit button, [id*="submit"] input[type="submit"], [class*="submit"] input, [class*="submit"] button');

    for (var i = 0; i < submitButtons.length; i++) {
        submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #1e5a8e 0%, #2a75b8 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(30,90,142,0.2)!important;min-width:240px!important;margin:2rem auto!important;display:block!important;';

        // Add hover effects
        submitButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #0d4a73 0%, #1e5a8e 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(30,90,142,0.3)';
        });
        submitButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #1e5a8e 0%, #2a75b8 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(30,90,142,0.2)';
        });
    }

    // Style RESET button - GRAY gradient theme
    var resetButtons = form.querySelectorAll('button[type="reset"], input[type="reset"], [class*="reset"] button, [class*="reset"] input');

    for (var i = 0; i < resetButtons.length; i++) {
        resetButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #6b7280 0%, #4b5563 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(75,85,99,0.2)!important;min-width:240px!important;margin-top:2rem!important;display:inline-block!important;';

        // Add hover effects for reset button
        resetButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #4b5563 0%, #374151 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(75,85,99,0.3)';
        });
        resetButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(75,85,99,0.2)';
        });
    }

    // Mobile responsive adjustments
    if (window.innerWidth <= 768) {
        form.style.padding = '2.5rem 1.5rem';
        form.style.margin = '2rem 1rem';
        form.style.maxWidth = '95%';

        for (var i = 0; i < submitButtons.length; i++) {
            submitButtons[i].style.width = '100%';
            submitButtons[i].style.padding = '1.25rem 2rem';
        }
    }

    // Style "More in this section" widget
    var moreSection = document.querySelector('.below-article, [class*="below-article"]');
    if (moreSection) {

        // Style the container
        moreSection.style.cssText = 'max-width:1100px!important;margin:3rem auto!important;padding:3rem!important;background:rgba(255,255,255,0.95)!important;border-radius:16px!important;box-shadow:0 8px 24px rgba(0,0,0,0.08)!important;text-align:center!important;';

        // Style the heading
        var moreHeading = moreSection.querySelector('h2, .below-article__title');
        if (moreHeading) {
            moreHeading.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:2.5rem!important;font-weight:700!important;color:#1e5a8e!important;margin:0 0 2rem 0!important;text-align:center!important;';
        }

        // Style link container if it exists
        var linkContainer = moreSection.querySelector('ul, .small-links');
        if (linkContainer) {
            linkContainer.style.cssText = 'display:grid!important;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))!important;gap:1.5rem!important;list-style:none!important;padding:0!important;margin:0!important;';
        }

        // Style each link item
        var linkItems = moreSection.querySelectorAll('a, .link_item, li');
        for (var i = 0; i < linkItems.length; i++) {
            var item = linkItems[i];

            if (item.tagName.toLowerCase() === 'a') {
                item.style.cssText = 'display:block!important;background:#ffffff!important;border:2px solid #2a75b8!important;border-radius:12px!important;padding:1.5rem!important;font-family:Urbanist,sans-serif!important;font-size:1.5rem!important;font-weight:600!important;color:#1e5a8e!important;text-decoration:none!important;transition:all 0.3s ease!important;box-shadow:0 2px 8px rgba(0,0,0,0.1)!important;';

                // Add hover effects
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-4px)';
                    this.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
                    this.style.boxShadow = '0 6px 20px rgba(30,90,142,0.2)';
                });
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.background = '#ffffff';
                    this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                });
            } else if (item.tagName.toLowerCase() === 'li') {
                item.style.cssText = 'list-style:none!important;margin:0!important;';

                // Style the link inside the li
                var link = item.querySelector('a');
                if (link) {
                    link.style.cssText = 'display:block!important;background:#ffffff!important;border:2px solid #2a75b8!important;border-radius:12px!important;padding:1.5rem!important;font-family:Urbanist,sans-serif!important;font-size:1.5rem!important;font-weight:600!important;color:#1e5a8e!important;text-decoration:none!important;transition:all 0.3s ease!important;box-shadow:0 2px 8px rgba(0,0,0,0.1)!important;';

                    link.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-4px)';
                        this.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
                        this.style.boxShadow = '0 6px 20px rgba(30,90,142,0.2)';
                    });
                    link.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0)';
                        this.style.background = '#ffffff';
                        this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    });
                }
            }
        }
    }

    // Style security text (.center_small)
    var securityText = document.querySelectorAll('.center_small, .center.small, form .center_small');
    for (var i = 0; i < securityText.length; i++) {
        securityText[i].style.cssText = 'color:#6b7280!important;font-size:0.95rem!important;line-height:1.6!important;font-family:Urbanist,sans-serif!important;text-align:center!important;margin-top:1rem!important;';
    }

    // ========================================
    // ANIMATIONS - Fade-in effects for form elements
    // ========================================

    // Animate form labels - fade in from left with stagger
    var labels = form.querySelectorAll('label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.opacity = '0';
        labels[i].style.transform = 'translateX(-20px)';
        labels[i].style.transition = 'all 0.6s ease';

        (function(label, index) {
            setTimeout(function() {
                label.style.opacity = '1';
                label.style.transform = 'translateX(0)';
            }, 300 + (index * 50));
        })(labels[i], i);
    }

    // Animate image - strong bounce effect with rotation
    var formImage = document.querySelector('img[src*="13391475"]') ||
                    document.querySelector('form[name="form_6991302"] img') ||
                    document.querySelector('.img_form_image img') ||
                    document.querySelector('img[src*="media/images"]');

    if (formImage) {
        formImage.style.opacity = '0';
        formImage.style.transform = 'scale(0.5) rotate(-5deg)';
        formImage.style.transition = 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

        setTimeout(function() {
            formImage.style.opacity = '1';
            formImage.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }

    // Animate submit button - strong continuous pulse
    if (submitButtons.length > 0) {
        var pulseStyle = document.createElement('style');
        pulseStyle.innerHTML = '@keyframes strongPulse { 0%, 100% { transform: scale(1) !important; box-shadow: 0 4px 12px rgba(30,90,142,0.3) !important; } 50% { transform: scale(1.08) !important; box-shadow: 0 10px 30px rgba(30,90,142,0.6) !important; } }';
        document.head.appendChild(pulseStyle);

        for (var i = 0; i < submitButtons.length; i++) {
            submitButtons[i].style.animation = 'strongPulse 1.5s ease-in-out infinite';
        }
    }
}

// ========================================
// 3. SENIORS NIGHT OUT FORM STYLING - FIXED
// ========================================
function styleSeniorsNightOutForm() {
    if (seniorsInitialized) return;

    // Check if we're on the Seniors Night Out page
    var isSeniorsNightOutPage = window.location.href.indexOf('/aid/6750519/') !== -1 ||
                                window.location.href.indexOf('Seniors-Night-Out') !== -1;
    if (!isSeniorsNightOutPage) return;

    var form = document.querySelector('form[name="form_6750519"]') ||
               document.querySelector('form[id="6750519"]') ||
               document.querySelector('form');
    if (!form) return;

    seniorsInitialized = true;

    // Apply page background - Festival theme
    document.body.style.cssText += 'background:linear-gradient(135deg, #ffffff 0%, #f3e5f5 100%)!important;';

    // Hide breadcrumbs
    var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
    }

    // IMPORTANT: Hide banner images/decorators (THIS WAS MISSING!)
    var banners = document.querySelectorAll('.banner_image, .page_banner, .article_banner, [class*="banner"] img, .article_banner_wrapper, .page_header_image, .decorator');
    for (var i = 0; i < banners.length; i++) {
        banners[i].style.cssText = 'display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;';
    }

    // Remove background from article header but keep it visible
    var articleHeader = document.querySelector('header.article-header');
    if (articleHeader) {
        articleHeader.style.cssText = 'background:none!important;background-image:none!important;background-color:transparent!important;padding:0!important;margin:0!important;border:none!important;display:block!important;visibility:visible!important;width:100%!important;text-align:center!important;';
    }

    // Remove decorator backgrounds
    var masterWrappers = document.querySelectorAll('.master-content-wrapper, [class*="master-content"]');
    for (var i = 0; i < masterWrappers.length; i++) {
        masterWrappers[i].style.cssText = 'background:none!important;background-image:none!important;background-color:transparent!important;padding:2rem 0!important;display:block!important;visibility:visible!important;';
    }

    // Find and style the page title with proper effects
    var pageTitle = document.querySelector('h1') ||
                   document.querySelector('.article-header__title') ||
                   document.querySelector('.master-content-wrapper h1');

    if (pageTitle) {
        // Apply the festival purple/gold theme to title
        pageTitle.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:4rem!important;font-weight:800!important;color:#6B3FA0!important;text-align:center!important;margin:2rem auto 3rem!important;padding:2.5rem!important;background:linear-gradient(135deg, rgba(107,63,160,0.05) 0%, rgba(244,196,48,0.05) 100%)!important;border:3px solid #6B3FA0!important;border-radius:16px!important;text-shadow:2px 2px 8px rgba(107,63,160,0.3)!important;display:inline-block!important;max-width:1100px!important;width:90%!important;';
        addTypewriterEffect(pageTitle);
    }

    // Style images in the form with proper borders and shadows
    var formImages = form.querySelectorAll('img');
    for (var i = 0; i < formImages.length; i++) {
        formImages[i].style.cssText = 'max-width:100%!important;height:auto!important;border-radius:12px!important;box-shadow:0 8px 24px rgba(107,63,160,0.2)!important;border:3px solid #6B3FA0!important;margin:1.5rem auto!important;display:block!important;';
    }

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(107,63,160,0.15), 0 0 0 1px rgba(107,63,160,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels - REMOVE ALL ANIMATIONS
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        // Remove any animation classes first
        labels[i].classList.remove('animated', 'fadeIn', 'slideIn');
        // Apply static styling
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#6B3FA0!important;margin-bottom:0.75rem!important;display:block!important;opacity:1!important;transform:none!important;transition:none!important;animation:none!important;';
    }

    // Style ALL text elements
    var allFormElements = form.querySelectorAll('*');
    for (var i = 0; i < allFormElements.length; i++) {
        var el = allFormElements[i];
        var tagName = el.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'select' || tagName === 'button' || tagName === 'textarea') continue;

        var hasDirectText = false;
        for (var j = 0; j < el.childNodes.length; j++) {
            if (el.childNodes[j].nodeType === 3 && el.childNodes[j].textContent.trim().length > 0) {
                hasDirectText = true;
                break;
            }
        }
        if (hasDirectText) {
            el.style.fontSize = '1.5rem';
            el.style.fontFamily = 'Urbanist, sans-serif';
            el.style.lineHeight = '1.6';
        }
    }

    // Style inputs
    // NOTE: Exclude select elements here as they need different padding treatment
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;padding:1.25rem 2rem!important;border:2px solid #d1c4e9!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;';

        inputs[i].addEventListener('focus', function() {
            this.style.borderColor = '#6B3FA0';
            this.style.boxShadow = '0 0 0 3px rgba(107,63,160,0.1)';
            this.style.outline = 'none';
        });
        inputs[i].addEventListener('blur', function() {
            this.style.borderColor = '#d1c4e9';
            this.style.boxShadow = 'none';
        });
    }

    // Style select dropdowns
    // NOTE: padding removed because it causes selected text to become invisible
    // This is a known browser/CMS issue with custom padding on select elements
    var selects = form.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;border:2px solid #d1c4e9!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;cursor:pointer!important;appearance:none!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B3FA0\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:right 2rem center!important;';
    }

    // Style submit button - Festival Gold & Purple gradient
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
    for (var i = 0; i < submitButtons.length; i++) {
        submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #6B3FA0 0%, #F4C430 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(107,63,160,0.3)!important;min-width:240px!important;margin:2rem auto!important;display:block!important;';

        submitButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #4a2870 0%, #d4a728 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(107,63,160,0.4)';
        });
        submitButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #6B3FA0 0%, #F4C430 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(107,63,160,0.3)';
        });
    }
}

// ========================================
// 4. YESHIVA SCHOLARSHIP FORM STYLING
// ========================================
function styleYeshivaScholarshipForm() {
    if (yeshivaInitialized) return;

    // Check if we're on the Yeshiva Scholarship page
    var isYeshivaScholarshipPage = window.location.href.indexOf('/aid/889639/') !== -1 ||
                                    window.location.href.indexOf('Yeshiva-Scolarship-Form') !== -1 ||
                                    window.location.href.indexOf('Yeshiva-Scholarship-Form') !== -1;
    if (!isYeshivaScholarshipPage) return;

    var form = document.querySelector('form#form1') ||
               document.querySelector('form[name="form_3767140"]') ||
               document.querySelector('form[id*="3767140"]') ||
               document.querySelector('form');
    if (!form) return;

    yeshivaInitialized = true;

    // Apply page background - Soft blue/white gradient
    document.body.style.cssText = 'background:linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)!important;';

    // Hide breadcrumbs
    var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
    }

    // Hide banners
    var banners = document.querySelectorAll('.banner_image, .page_banner, .article_banner, [class*="banner"] img, .article_banner_wrapper, .page_header_image');
    for (var i = 0; i < banners.length; i++) {
        banners[i].style.cssText = 'display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;';
    }

    // Style page title with typewriter effect
    var pageTitle = document.querySelector('h1, .article-header__title, .master-content-wrapper h1');
    if (pageTitle) {
        pageTitle.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:3.5rem!important;font-weight:800!important;color:#3b82f6!important;text-align:center!important;margin:2rem auto 3rem!important;padding:2rem!important;background:linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(6,182,212,0.05) 100%)!important;border:2px solid #3b82f6!important;border-radius:12px!important;text-shadow:2px 2px 6px rgba(59,130,246,0.2)!important;display:inline-block!important;max-width:1100px!important;width:90%!important;';
        addTypewriterEffect(pageTitle);
    }

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels - NO ANIMATION
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#3b82f6!important;margin-bottom:0.75rem!important;display:block!important;opacity:1!important;transform:none!important;';
    }

    // Style ALL text elements
    var allFormElements = form.querySelectorAll('*');
    for (var i = 0; i < allFormElements.length; i++) {
        var el = allFormElements[i];
        var tagName = el.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'select' || tagName === 'button' || tagName === 'textarea') continue;

        var hasDirectText = false;
        for (var j = 0; j < el.childNodes.length; j++) {
            if (el.childNodes[j].nodeType === 3 && el.childNodes[j].textContent.trim().length > 0) {
                hasDirectText = true;
                break;
            }
        }
        if (hasDirectText) {
            el.style.fontSize = '1.5rem';
            el.style.fontFamily = 'Urbanist, sans-serif';
            el.style.lineHeight = '1.6';
        }
    }

    // Style inputs
    // NOTE: Exclude select elements here as they need different padding treatment
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;padding:1.25rem 2rem!important;border:2px solid #dbeafe!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;';

        inputs[i].addEventListener('focus', function() {
            this.style.borderColor = '#3b82f6';
            this.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
            this.style.outline = 'none';
        });
        inputs[i].addEventListener('blur', function() {
            this.style.borderColor = '#dbeafe';
            this.style.boxShadow = 'none';
        });
    }

    // Style submit button - Blue gradient
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
    for (var i = 0; i < submitButtons.length; i++) {
        submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(59,130,246,0.3)!important;min-width:240px!important;margin-top:2rem!important;margin-right:1rem!important;display:inline-block!important;';

        submitButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(59,130,246,0.4)';
        });
        submitButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(59,130,246,0.3)';
        });
    }
}

// ========================================
// 5. VOLUNTEER FORM STYLING
// ========================================
// ========================================
// PAGE: VOLUNTEER FORM
// URL: /templates/articlecco_cdo/aid/6827149/jewish/Volunteer-with-us.htm
// ========================================
function styleVolunteerForm() {
    // Prevent double initialization
    if (volunteerInitialized) return;

    // Detect page by article ID or filename
    var isVolunteerPage = window.location.href.indexOf('/aid/6827149/') !== -1 ||
                          window.location.href.indexOf('Volunteer-with-us.htm') !== -1;

    if (!isVolunteerPage) return;

    volunteerInitialized = true;

    // Add body class for CSS targeting
    if (document.body && !document.body.classList.contains('volunteer-form-page')) {
        document.body.classList.add('volunteer-form-page');
    }

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;

        var navigation = document.querySelector('#navigation');
        if (!navigation) return;

        var toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        toggleButton.addEventListener('click', function() {
            var menuContent = document.querySelector('.chabad_menu_content');
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
    }

    // Force navigation link colors (fight CMS overrides)
    function forceNavColors(silent) {
        var links = document.querySelectorAll('#navigation a, #menu a');

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var isSelected = link.classList.contains('selected');
            var color = isSelected ? '#d4af37' : '#000000';

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');

            // CRITICAL: Remove webkit color overrides
            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');
        }
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();

    // Re-run after delay
    setTimeout(function() { forceNavColors(true); }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// 6. ABOUT US PAGE STYLING
// ========================================
function styleAboutUsPage() {
    if (aboutUsInitialized) return;

    // Check if we're on the About Us page
    var isAboutUsPage = window.location.href.indexOf('/aid/6820886/') !== -1 ||
                        window.location.href.indexOf('About-Us.htm') !== -1;
    if (!isAboutUsPage) return;

    aboutUsInitialized = true;

    // Add page-specific body class
    if (document.body && !document.body.classList.contains('about-us-page')) {
        document.body.classList.add('about-us-page');
    }

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;

        var navigation = document.querySelector('#navigation');
        if (!navigation) return;

        var toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        toggleButton.addEventListener('click', function() {
            var menuContent = document.querySelector('.chabad_menu_content');
            if (menuContent) {
                menuContent.classList.toggle('menu-open');
                toggleButton.textContent = menuContent.classList.contains('menu-open') ? 'CLOSE' : 'MENU';
            }
        });

        navigation.insertBefore(toggleButton, navigation.firstChild);
    }

    // Force link colors (fix CMS overrides)
    function forceNavColors(silent) {
        var links = document.querySelectorAll('#navigation a, #menu a');

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var isSelected = link.classList.contains('selected');
            var color = isSelected ? '#d4af37' : '#000000';

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');
            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');
        }
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();

    // Re-run after delay
    setTimeout(function() { forceNavColors(true); }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// 7. KOSHER FOOD BANK PAGE STYLING
// ========================================
function styleKosherFoodBankPage() {
    if (kosherFoodBankInitialized) return;

    // Check if we're on the Kosher Food Bank page
    var isKosherFoodBankPage = window.location.href.indexOf('/aid/6819985/') !== -1 ||
                                window.location.href.indexOf('Kosher-Food-Bank.htm') !== -1;
    if (!isKosherFoodBankPage) return;

    kosherFoodBankInitialized = true;

    // Add page-specific body class
    if (document.body && !document.body.classList.contains('kosher-food-bank-page')) {
        document.body.classList.add('kosher-food-bank-page');
    }

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;

        var navigation = document.querySelector('#navigation');
        if (!navigation) return;

        var toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        toggleButton.addEventListener('click', function() {
            var menuContent = document.querySelector('.chabad_menu_content');
            if (menuContent) {
                menuContent.classList.toggle('menu-open');
                toggleButton.textContent = menuContent.classList.contains('menu-open') ? 'CLOSE' : 'MENU';
            }
        });

        navigation.insertBefore(toggleButton, navigation.firstChild);
    }

    // Force link colors (fix CMS overrides)
    function forceNavColors(silent) {
        var links = document.querySelectorAll('#navigation a, #menu a');

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var isSelected = link.classList.contains('selected');
            var color = isSelected ? '#d4af37' : '#000000';

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');
            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');
        }
    }

    // Merge donate cards: Extract link from gold card and add pulsing text to white card
    function styleDonateCard() {
        var promoCards = Array.from(document.querySelectorAll('.sPromo-wrap'));
        var whiteCard = null;
        var goldCard = null;
        var donateHref = null;

        // Look for the white "DONATE NOW" card
        for (var i = 0; i < promoCards.length; i++) {
            var card = promoCards[i];
            var caption = card.querySelector('.caption');

            if (caption && caption.textContent.trim().toUpperCase().indexOf('DONATE NOW') !== -1) {
                whiteCard = card;
                whiteCard.classList.add('donate-card-white');

                // Look for the next card (likely the gold card with the link)
                if (i + 1 < promoCards.length) {
                    var nextCard = promoCards[i + 1];
                    var nextCardLink = nextCard.querySelector('a');
                    if (nextCardLink && nextCardLink.href) {
                        goldCard = nextCard;
                        donateHref = nextCardLink.href;
                    }
                }

                // Also check if this card itself has a wrapper link
                var cardLink = card.querySelector('a[href*="donate"], a[href*="Donate"]');
                if (!donateHref && cardLink && cardLink.href) {
                    donateHref = cardLink.href;
                }
            }
        }

        // If we found both cards or at least the white card with a link
        if (whiteCard && donateHref) {
            // Check if we already added the pulsing link
            if (!whiteCard.querySelector('.donate-link-pulse')) {
                // Create the pulsing "DONATE NOW" link
                var donateLink = document.createElement('a');
                donateLink.href = donateHref;
                donateLink.className = 'donate-link-pulse';
                donateLink.textContent = 'DONATE NOW';
                donateLink.setAttribute('target', '_blank');
                donateLink.setAttribute('rel', 'noopener noreferrer');

                // Insert the link at the end of the white card's caption or main content area
                var caption = whiteCard.querySelector('.caption');
                if (caption) {
                    caption.parentElement.appendChild(donateLink);
                } else {
                    whiteCard.appendChild(donateLink);
                }
            }

            // Hide the separate gold card if found
            if (goldCard) {
                goldCard.classList.add('gold-card-hidden');
            }
        }
    }

    // Function to forcefully remove height constraints from cards
    function fixCardHeights() {
        var cards = document.querySelectorAll('.sPromo-wrap');
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            card.style.removeProperty('height');
            card.style.removeProperty('max-height');
            card.style.removeProperty('min-height');
            card.style.overflow = 'visible';
        }
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();
    styleDonateCard();
    fixCardHeights();

    // Re-run after delay
    setTimeout(function() {
        forceNavColors(true);
        styleDonateCard();
        fixCardHeights();
    }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// 8. GET HELP PAGE STYLING
// ========================================
function styleGetHelpPage() {
    if (getHelpInitialized) return;

    // Check if we're on the Get Help page
    var isGetHelpPage = window.location.href.indexOf('/aid/6827292/') !== -1 ||
                        window.location.href.indexOf('Get-Help.htm') !== -1;
    if (!isGetHelpPage) return;

    getHelpInitialized = true;

    // Add page-specific body class
    if (document.body && !document.body.classList.contains('get-help-page')) {
        document.body.classList.add('get-help-page');
    }

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;

        var navigation = document.querySelector('#navigation');
        if (!navigation) return;

        var toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        toggleButton.addEventListener('click', function() {
            var menuContent = document.querySelector('.chabad_menu_content');
            if (menuContent) {
                menuContent.classList.toggle('menu-open');
                toggleButton.textContent = menuContent.classList.contains('menu-open') ? 'CLOSE' : 'MENU';
            }
        });

        navigation.insertBefore(toggleButton, navigation.firstChild);
    }

    // Force link colors (fix CMS overrides)
    function forceNavColors(silent) {
        var links = document.querySelectorAll('#navigation a, #menu a');

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var isSelected = link.classList.contains('selected');
            var color = isSelected ? '#d4af37' : '#000000';

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');
            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');
        }
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();

    // Re-run after delay
    setTimeout(function() { forceNavColors(true); }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// PAGE: PURIM MATANOT LA'EVYONIM
// URL: /templates/articlecco_cdo/aid/6831199/jewish/Purim-Matanot-LaEvyonim.htm
// ========================================
var purimMatanotInitialized = false;

function stylePurimMatanotPage() {
    // Prevent double initialization
    if (purimMatanotInitialized) return;

    // Detect page by article ID or filename
    var isPurimMatanotPage = window.location.href.indexOf('/aid/6831199/') !== -1 ||
                             window.location.href.indexOf('Purim-Matanot-LaEvyonim.htm') !== -1;

    if (!isPurimMatanotPage) return;

    purimMatanotInitialized = true;

    // Add body class for CSS targeting
    if (document.body && !document.body.classList.contains('purim-matanot-page')) {
        document.body.classList.add('purim-matanot-page');
    }

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;

        var navigation = document.querySelector('#navigation');
        if (!navigation) return;

        var toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        toggleButton.addEventListener('click', function() {
            var menuContent = document.querySelector('.chabad_menu_content');
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
    }

    // Force navigation link colors (fight CMS overrides)
    function forceNavColors(silent) {
        var links = document.querySelectorAll('#navigation a, #menu a');

        links.forEach(function(link) {
            // Check both link and parent for selected class
            var isSelected = link.classList.contains('selected') ||
                           link.parentElement.classList.contains('selected');
            var color = isSelected ? '#d4af37' : '#000000';

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('-webkit-text-fill-color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');

            // Remove any fill property
            link.style.removeProperty('fill');
        });
    }

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
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();

    // Add donate buttons with delay to ensure content is loaded
    setTimeout(addDonateButtons, 500);

    // Re-run after delay
    setTimeout(function() { forceNavColors(true); }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// PAGE: FAQ (Frequently Asked Questions)
// URL: /templates/articlecco_cdo/aid/6827204/jewish/FAQ.htm
// ========================================
var faqInitialized = false;

function styleFAQPage() {
    // Prevent double initialization
    if (faqInitialized) return;

    // Detect page by article ID or filename
    var isFAQPage = window.location.href.indexOf('/aid/6827204/') !== -1 ||
                    window.location.href.indexOf('FAQ.htm') !== -1;

    if (!isFAQPage) return;

    faqInitialized = true;

    // Add body class for CSS targeting
    if (document.body && !document.body.classList.contains('faq-page')) {
        document.body.classList.add('faq-page');
    }

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;

        var navigation = document.querySelector('#navigation');
        if (!navigation) return;

        var toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        toggleButton.addEventListener('click', function() {
            var menuContent = document.querySelector('.chabad_menu_content');
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
    }

    // Force navigation link colors (fight CMS overrides)
    function forceNavColors(silent) {
        var links = document.querySelectorAll('#navigation a, #menu a');

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var isSelected = link.classList.contains('selected');
            var color = isSelected ? '#d4af37' : '#000000';

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');

            // CRITICAL: Remove webkit color overrides
            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');
        }
    }

    // Hide purple logo in header
    function hidePurpleLogo() {
        var header = document.querySelector('.faq-page .chabad_header');
        if (!header) return;

        // Hide all images in header except main background
        var images = header.querySelectorAll('img');
        images.forEach(function(img) {
            // Hide logo images (usually smaller than hero images)
            if (img.width < 600 || img.src.includes('logo') || img.src.includes('Logo')) {
                img.style.display = 'none';
            }
        });
    }

    // Make FAQ accordion collapsible
    function makeAccordion() {
        var articleBody = document.querySelector('.faq-page .co_body.article-body.cf');
        if (!articleBody) return;

        // Find all strong/b tags (questions)
        var questions = articleBody.querySelectorAll('strong, b');

        questions.forEach(function(question) {
            // Make question clickable
            question.style.cursor = 'pointer';
            question.setAttribute('data-expanded', 'true'); // Start expanded

            // Find the answer (next paragraph)
            var answer = question.nextElementSibling;
            if (answer && answer.tagName === 'P') {
                answer.style.transition = 'all 0.3s ease';
                answer.setAttribute('data-answer', 'true');

                // Add click event
                question.addEventListener('click', function() {
                    var isExpanded = this.getAttribute('data-expanded') === 'true';

                    if (isExpanded) {
                        // Collapse
                        answer.style.maxHeight = '0';
                        answer.style.opacity = '0';
                        answer.style.marginBottom = '0';
                        answer.style.overflow = 'hidden';
                        this.setAttribute('data-expanded', 'false');
                        this.style.opacity = '0.7';
                    } else {
                        // Expand
                        answer.style.maxHeight = '1000px';
                        answer.style.opacity = '1';
                        answer.style.marginBottom = '2rem';
                        answer.style.overflow = 'visible';
                        this.setAttribute('data-expanded', 'true');
                        this.style.opacity = '1';
                    }
                });
            }
        });
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();
    hidePurpleLogo();

    // Make accordion with delay to ensure content is loaded
    setTimeout(makeAccordion, 500);

    // Re-run after delay
    setTimeout(function() { forceNavColors(true); }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// PAGE: DONATE NOW TO KOSHER FOOD BANK (Form)
// URL: /templates/articlecco_cdo/aid/6827075/jewish/Donate-Now-To-Kosher-Food-Bank.htm
// ========================================
var donateKFBInitialized = false;

function styleDonateKFBPage() {
    // Prevent double initialization
    if (donateKFBInitialized) return;

    // Detect page by article ID or filename
    var isDonateKFBPage = window.location.href.indexOf('/aid/6827075/') !== -1 ||
                          window.location.href.indexOf('Donate-Now-To-Kosher-Food-Bank.htm') !== -1;

    if (!isDonateKFBPage) return;

    donateKFBInitialized = true;

    // Add body class for CSS targeting
    if (document.body && !document.body.classList.contains('donate-kfb-page')) {
        document.body.classList.add('donate-kfb-page');
    }

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;

        var navigation = document.querySelector('#navigation');
        if (!navigation) return;

        var toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        toggleButton.addEventListener('click', function() {
            var menuContent = document.querySelector('.chabad_menu_content');
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
    }

    // Force navigation link colors (fight CMS overrides)
    function forceNavColors(silent) {
        var links = document.querySelectorAll('#navigation a, #menu a');

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var isSelected = link.classList.contains('selected');
            var color = isSelected ? '#d4af37' : '#000000';

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');

            // CRITICAL: Remove webkit color overrides
            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');
        }
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();

    // Re-run after delay
    setTimeout(function() { forceNavColors(true); }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// PAGE: DONATE (Projects/Cards Layout)
// URL: /templates/articlecco_cdo/aid/6820893/jewish/Donate.htm
// ========================================
var donateInitialized = false;

function styleDonatePage() {
    // Prevent double initialization
    if (donateInitialized) return;

    // Detect page by article ID or filename
    var isDonatePage = window.location.href.indexOf('/aid/6820893/') !== -1 ||
                       window.location.href.indexOf('/Donate.htm') !== -1;

    if (!isDonatePage) return;

    donateInitialized = true;

    // Add body class for CSS targeting
    if (document.body && !document.body.classList.contains('donate-page')) {
        document.body.classList.add('donate-page');
    }

    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;

        var navigation = document.querySelector('#navigation');
        if (!navigation) return;

        var toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.textContent = 'MENU';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

        toggleButton.addEventListener('click', function() {
            var menuContent = document.querySelector('.chabad_menu_content');
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
    }

    // Force navigation link colors (fight CMS overrides)
    function forceNavColors(silent) {
        var links = document.querySelectorAll('#navigation a, #menu a');

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var isSelected = link.classList.contains('selected');
            var color = isSelected ? '#d4af37' : '#000000';

            link.style.setProperty('color', color, 'important');
            link.style.setProperty('font-family', "'Urbanist', sans-serif", 'important');
            link.style.setProperty('font-weight', '500', 'important');

            // CRITICAL: Remove webkit color overrides
            link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            link.style.removeProperty('fill');
        }
    }

    // Run setup
    createMobileMenuToggle();
    forceNavColors();

    // Re-run after delay
    setTimeout(function() { forceNavColors(true); }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// MATANOT LA'EVYONIM - GIVE TO THE NEEDY PAGE
// ========================================
var matanotInitialized = false;

function styleMatanotPage() {
    if (matanotInitialized) return;

    var isMatanotPage = window.location.href.indexOf('/aid/6820507/') !== -1 ||
                        window.location.href.indexOf('Matanot-Laevyonim-Give-to-the-Needy.htm') !== -1;

    if (!isMatanotPage) return;
    matanotInitialized = true;

    // Add body class
    if (document.body && !document.body.classList.contains('matanot-page')) {
        document.body.classList.add('matanot-page');
    }

    // Create mobile menu toggle if it doesn't exist
    var nav = document.querySelector('#navigation');
    if (nav && !document.querySelector('.mobile-menu-toggle')) {
        var toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
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
    }

    // Force navigation colors
    function forceNavColors(silent) {
        var navLinks = document.querySelectorAll('#navigation a, #menu a');
        navLinks.forEach(function(link) {
            // Force black text color
            link.style.setProperty('color', '#000000', 'important');
            link.style.setProperty('-webkit-text-fill-color', '#000000', 'important');

            // Check if this link is selected
            var isSelected = link.classList.contains('selected') ||
                           link.parentElement.classList.contains('selected') ||
                           link.getAttribute('aria-current') === 'page';

            if (isSelected) {
                link.style.setProperty('color', '#d4af37', 'important');
                link.style.setProperty('-webkit-text-fill-color', '#d4af37', 'important');
            }
        });

        // Hover effects
        navLinks.forEach(function(link) {
            link.addEventListener('mouseenter', function() {
                this.style.setProperty('color', '#d4af37', 'important');
                this.style.setProperty('-webkit-text-fill-color', '#d4af37', 'important');
            });

            link.addEventListener('mouseleave', function() {
                var isSelected = this.classList.contains('selected') ||
                               this.parentElement.classList.contains('selected') ||
                               this.getAttribute('aria-current') === 'page';

                if (!isSelected) {
                    this.style.setProperty('color', '#000000', 'important');
                    this.style.setProperty('-webkit-text-fill-color', '#000000', 'important');
                }
            });
        });
    }

    forceNavColors();

    // Re-run after delay
    setTimeout(function() { forceNavColors(true); }, 500);

    // Continuously fight CMS overrides
    setInterval(function() { forceNavColors(true); }, 100);
}

// ========================================
// INITIALIZE ALL FORM STYLES
// ========================================
function initializeFormStyles() {
    // Run all 13 styling functions (7 forms + 6 article pages)
    styleGmachDonationForm();
    styleHealthyAtHomeForm();
    styleSeniorsNightOutForm();
    styleYeshivaScholarshipForm();
    styleVolunteerForm();
    styleDonateKFBPage();
    styleMatanotPage();
    styleAboutUsPage();
    styleKosherFoodBankPage();
    styleGetHelpPage();
    stylePurimMatanotPage();
    styleFAQPage();
    styleDonatePage();
}

// Run on various events with multiple retries (like original)
initializeFormStyles();
setTimeout(initializeFormStyles, 500);
setTimeout(initializeFormStyles, 1000);
setTimeout(initializeFormStyles, 1500);
setTimeout(initializeFormStyles, 2000);

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFormStyles);
} else {
    initializeFormStyles();
}

// Also run on window load
window.addEventListener('load', initializeFormStyles);

// Watch for dynamic content
if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function() {
        initializeFormStyles();
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Export for external use
if (typeof window !== 'undefined') {
    window.initializeFormStyles = initializeFormStyles;
}