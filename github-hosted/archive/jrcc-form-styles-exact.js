/* JRCC Form Styles - EXACT copy of original custom-footer-code.html logic */

// ========================================
// GMACH DONATION FORM (from line 667)
// ========================================
(function() {
    var initialized = false;

    function styleGmachDonationForm() {
        if (initialized) {
            return;
        }

        // Find the form - try by id first, then by name
        var form = document.querySelector('form#form1') || document.querySelector('form[name="form_3767140"]');
        if (!form) {
            return; // Form not found, will retry
        }

        initialized = true;

        // Apply page background (BLACK gradient for contrast)
        document.body.style.cssText = (document.body.style.cssText || '') + 'background:linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)!important;';

        // Hide breadcrumbs
        var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
        }

        // Hide banner images/decorators - but NOT the header (title is inside it)
        var banners = document.querySelectorAll('.banner_image, .page_banner, .article_banner, [class*="banner"] img, .article_banner_wrapper, .page_header_image');
        for (var i = 0; i < banners.length; i++) {
            banners[i].style.cssText = 'display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;';
        }

        // Remove background from header but keep it visible (title is inside)
        var articleHeader = document.querySelector('header.article-header');
        if (articleHeader) {
            articleHeader.style.cssText = 'background:none!important;background-image:none!important;background-color:transparent!important;padding:0!important;margin:0!important;border:none!important;display:block!important;visibility:visible!important;width:100%!important;text-align:center!important;';
        }

        // Style the form container - WIDER with ENHANCED shadow for dark background
        form.style.cssText = 'max-width:1100px!important;margin:3rem auto!important;padding:4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

        // Style form labels - MUCH BIGGER text (1.5rem = 24px)
        var labels = form.querySelectorAll('label, .form-label');
        for (var i = 0; i < labels.length; i++) {
            labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#1e5a8e!important;margin-bottom:0.75rem!important;display:block!important;';
        }

        // Style ALL text-like elements in form (since labels might not be <label> tags)
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
                var currentSize = window.getComputedStyle(el).fontSize;
                el.style.fontSize = '1.5rem';
                el.style.fontFamily = 'Urbanist, sans-serif';
                el.style.lineHeight = '1.6';
            }
        }

        // Style all form inputs - BIGGER text (1.35rem = ~21.6px)
        var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
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

        // Style submit button - try multiple selectors - BIGGER (1.625rem)
        var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"], .form-submit button, [id*="submit"] input[type="submit"], [class*="submit"] input, [class*="submit"] button');

        for (var i = 0; i < submitButtons.length; i++) {
            submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #1e5a8e 0%, #2a75b8 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(30,90,142,0.2)!important;min-width:240px!important;margin-top:2rem!important;margin-right:1rem!important;display:inline-block!important;';

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
    }

    // Try multiple times with increasing delays (like sidebar)
    styleGmachDonationForm();
    setTimeout(styleGmachDonationForm, 500);
    setTimeout(styleGmachDonationForm, 1000);
    setTimeout(styleGmachDonationForm, 1500);
    setTimeout(styleGmachDonationForm, 2000);

    // Try on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleGmachDonationForm);
    }

    // Try on window load
    window.addEventListener('load', styleGmachDonationForm);

    // Watch for dynamic content with MutationObserver
    var observer = new MutationObserver(function() {
        if (!initialized) styleGmachDonationForm();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();

// ========================================
// SENIORS NIGHT OUT (from line 1445)
// ========================================
(function() {
    var initialized = false;

    function styleSeniorsNightOutForm() {
        if (initialized) {
            return;
        }

        // Check if we're on the Seniors Night Out page by URL
        var isSeniorsNightOutPage = window.location.href.indexOf('/aid/6750519/') !== -1 ||
                                     window.location.href.indexOf('Seniors-Night-Out') !== -1;

        if (!isSeniorsNightOutPage) {
            return;
        }

        // Find the form - should be form_6750519 based on article ID
        var form = document.querySelector('form[name="form_6750519"]') ||
                   document.querySelector('form[id="6750519"]') ||
                   document.querySelector('form.userform-form');

        if (!form) {
            return;
        }

        // Mark as initialized
        initialized = true;

        // Apply page background - Festival theme (light gradient)
        document.body.style.cssText = (document.body.style.cssText || '') + 'background:linear-gradient(135deg, #ffffff 0%, #f3e5f5 100%)!important;';

        // Hide breadcrumbs
        var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
        }

        // Style the form container - Festival theme
        form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(107,63,160,0.15), 0 0 0 1px rgba(107,63,160,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

        // Style form labels - LARGE text
        var labels = form.querySelectorAll('label, .form-label');
        for (var i = 0; i < labels.length; i++) {
            labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#6B3FA0!important;margin-bottom:0.75rem!important;display:block!important;';
        }

        // Style all form inputs - rounded corners, purple theme
        var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;border:2px solid #d1c4e9!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;';

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

        // Style select dropdowns - NO padding to avoid invisible text
        var selects = form.querySelectorAll('select');
        for (var i = 0; i < selects.length; i++) {
            selects[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;border:2px solid #d1c4e9!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;cursor:pointer!important;appearance:none!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B3FA0\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:right 2rem center!important;';
        }

        // Style submit button - FESTIVAL GOLD & PURPLE gradient, CENTERED
        var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"], .form-submit button, [class*="submit"] input, [class*="submit"] button');

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

        // Animate form labels - fade in from left with stagger
        var allLabels = form.querySelectorAll('label');
        for (var i = 0; i < allLabels.length; i++) {
            allLabels[i].style.opacity = '0';
            allLabels[i].style.transform = 'translateX(-20px)';
            allLabels[i].style.transition = 'all 0.6s ease';

            (function(label, index) {
                setTimeout(function() {
                    label.style.opacity = '1';
                    label.style.transform = 'translateX(0)';
                }, 2200 + (index * 50));
            })(allLabels[i], i);
        }
    }

    // Try multiple times with increasing delays
    styleSeniorsNightOutForm();
    setTimeout(styleSeniorsNightOutForm, 500);
    setTimeout(styleSeniorsNightOutForm, 1000);
    setTimeout(styleSeniorsNightOutForm, 1500);
    setTimeout(styleSeniorsNightOutForm, 2000);

    // Try on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleSeniorsNightOutForm);
    }

    // Try on window load
    window.addEventListener('load', styleSeniorsNightOutForm);

    // Watch for dynamic content
    var observer = new MutationObserver(function() {
        if (!initialized) styleSeniorsNightOutForm();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();

console.log('JRCC form styles (exact copy) loaded');