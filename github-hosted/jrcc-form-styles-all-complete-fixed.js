/* JRCC Form-Specific Inline Styling Functions - FULLY FIXED VERSION */
/* Includes ALL 5 form styling functions with proper banner hiding and typewriter animation */

// Global initialization tracking
var gmachInitialized = false;
var healthyAtHomeInitialized = false;
var seniorsInitialized = false;
var yeshivaInitialized = false;
var volunteerInitialized = false;

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

    // IMPORTANT: Find and protect the page title FIRST before hiding anything
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

    if (!pageTitle) {
        console.error('JRCC: WARNING - Could not find page title!');
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
    // (pageTitle was already found and protected earlier)
    if (pageTitle) {
        console.log('JRCC: Styling title:', pageTitle.textContent);
        pageTitle.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:3.75rem!important;font-weight:800!important;color:#000000!important;text-align:center!important;margin-left:auto!important;margin-right:auto!important;margin-top:0!important;margin-bottom:0!important;padding:2rem 2rem 0 2rem!important;background:transparent!important;border:none!important;border-radius:0!important;text-shadow:0 2px 4px rgba(0,0,0,0.1)!important;display:block!important;visibility:visible!important;opacity:1!important;max-width:1100px!important;width:90%!important;z-index:10!important;position:relative!important;';

        // Typewriter animation effect for the title (custom implementation)
        var originalText = pageTitle.textContent;
        console.log('JRCC: Starting typewriter animation for:', originalText);
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
function styleVolunteerForm() {
    if (volunteerInitialized) return;

    // Check if we're on the Volunteer Form page
    var currentUrl = window.location.href.toLowerCase();
    if (currentUrl.indexOf('5094614') === -1 && currentUrl.indexOf('volunteer') === -1) return;

    var form = document.querySelector('form[id*="form"]') ||
               document.querySelector('form[name*="form_"]') ||
               document.querySelector('form');
    if (!form) return;

    volunteerInitialized = true;

    // Add page-specific body class
    if (document.body && !document.body.classList.contains('volunteer-form-page')) {
        document.body.classList.add('volunteer-form-page');
    }

    // Apply page background - RED gradient
    document.body.style.cssText += 'background:linear-gradient(135deg, #2a0e14 0%, #5c1f2e 50%, #8b2e3f 100%)!important;';

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

    // Style page title with typewriter effect
    var pageTitle = document.querySelector('h1') ||
                   document.querySelector('.article-header__title') ||
                   document.querySelector('.master-content-wrapper h1');

    if (pageTitle) {
        pageTitle.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:4rem!important;font-weight:800!important;color:#ffffff!important;text-align:center!important;margin:2rem auto 3rem!important;padding:2rem!important;background:transparent!important;border:none!important;text-shadow:0 4px 20px rgba(244,208,63,0.6)!important;display:inline-block!important;max-width:1100px!important;width:90%!important;letter-spacing:-1px!important;';
        addTypewriterEffect(pageTitle);
    }

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,208,63,0.15)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels - NO ANIMATION
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#c93545!important;margin-bottom:0.75rem!important;display:block!important;opacity:1!important;transform:none!important;';
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
        inputs[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;padding:1.25rem 2rem!important;border:2px solid #d1d9e6!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;';

        inputs[i].addEventListener('focus', function() {
            this.style.borderColor = '#c93545';
            this.style.boxShadow = '0 0 0 3px rgba(201,53,69,0.1)';
            this.style.outline = 'none';
        });
        inputs[i].addEventListener('blur', function() {
            this.style.borderColor = '#d1d9e6';
            this.style.boxShadow = 'none';
        });
    }

    // Style submit button - Crimson & Gold gradient
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
    for (var i = 0; i < submitButtons.length; i++) {
        submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #c93545 0%, #f4d03f 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(201,53,69,0.3)!important;min-width:240px!important;margin-top:2rem!important;margin-right:1rem!important;display:inline-block!important;';

        submitButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #a82c3a 0%, #d4af37 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(201,53,69,0.4)';
        });
        submitButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #c93545 0%, #f4d03f 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(201,53,69,0.3)';
        });
    }

    // Style reset button
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
// INITIALIZE ALL FORM STYLES
// ========================================
function initializeFormStyles() {
    // Run all 5 styling functions
    styleGmachDonationForm();
    styleHealthyAtHomeForm();
    styleSeniorsNightOutForm();
    styleYeshivaScholarshipForm();
    styleVolunteerForm();
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