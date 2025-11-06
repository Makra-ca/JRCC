/* JRCC Form-Specific Inline Styling Functions - COMPLETE VERSION */
/* Fixed version that matches the original custom-footer-code.html functionality */

// ========================================
// GMACH DONATION FORM STYLING
// ========================================
function styleGmachDonationForm() {
    var initialized = false;

    // Don't check URL - just look for the form
    var form = document.querySelector('form#form1') ||
               document.querySelector('form[name="form_3767140"]');
    if (!form || initialized) return;

    initialized = true;

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

    // Strategy 1: Direct h1 search
    var h1Elements = document.querySelectorAll('h1');
    for (var i = 0; i < h1Elements.length; i++) {
        if (h1Elements[i].textContent.toLowerCase().indexOf('gmach') !== -1 ||
            h1Elements[i].textContent.toLowerCase().indexOf('donation') !== -1) {
            pageTitle = h1Elements[i];
            break;
        }
    }

    // Strategy 2: Search within master-content-wrapper
    if (!pageTitle) {
        pageTitle = document.querySelector('.master-content-wrapper h1, .master-content-wrapper h2, div.master-content-wrapper h1');
    }

    // Strategy 3: Any h1 on page
    if (!pageTitle) {
        pageTitle = document.querySelector('h1');
    }

    // Strategy 4: Search for any element with "Gmach Donation Form" text
    if (!pageTitle) {
        var allElements = document.querySelectorAll('*');
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].childNodes.length === 1 &&
                allElements[i].childNodes[0].nodeType === 3 &&
                allElements[i].textContent.trim().toLowerCase() === 'gmach donation form') {
                pageTitle = allElements[i];
                break;
            }
        }
    }

    if (pageTitle) {
        pageTitle.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:3.75rem!important;font-weight:800!important;color:#fbbf24!important;text-align:center!important;margin-left:auto!important;margin-right:auto!important;margin-top:0!important;margin-bottom:3rem!important;padding:2.5rem!important;background:rgba(0,0,0,0.5)!important;border:2px solid rgba(251,191,36,0.3)!important;border-radius:12px!important;text-shadow:2px 2px 4px rgba(0,0,0,0.5)!important;display:inline-block!important;visibility:visible!important;opacity:1!important;max-width:1100px!important;width:90%!important;z-index:10!important;';
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

    // Style form labels
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#1e5a8e!important;margin-bottom:0.75rem!important;display:block!important;';
    }

    // Style ALL text-like elements in form (CRITICAL - this was missing!)
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

    // Style all form inputs
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
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

    // Style select dropdowns with custom arrow
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
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"], .form-submit button, [id*="submit"] input[type="submit"], [class*="submit"] input, [class*="submit"] button');
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

    // Style RESET buttons
    var resetButtons = form.querySelectorAll('button[type="reset"], input[type="reset"], [class*="reset"] button, [class*="reset"] input');
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

    // Mobile responsive
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
        moreSection.style.cssText = 'max-width:1100px!important;margin:3rem auto!important;padding:3rem!important;background:rgba(255,255,255,0.95)!important;border-radius:16px!important;box-shadow:0 8px 24px rgba(0,0,0,0.3)!important;text-align:center!important;';

        var moreHeading = moreSection.querySelector('h2, .below-article__title');
        if (moreHeading) {
            moreHeading.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:2.5rem!important;font-weight:700!important;color:#1e5a8e!important;margin:0 0 2rem 0!important;text-align:center!important;';
        }

        var linkContainer = moreSection.querySelector('ul, .small-links');
        if (linkContainer) {
            linkContainer.style.cssText = 'display:grid!important;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))!important;gap:1.5rem!important;list-style:none!important;padding:0!important;margin:0!important;';
        }

        var linkItems = moreSection.querySelectorAll('a, .link_item, li');
        for (var i = 0; i < linkItems.length; i++) {
            var item = linkItems[i];

            if (item.tagName.toLowerCase() === 'a') {
                item.style.cssText = 'display:block!important;background:#ffffff!important;border:2px solid #2a75b8!important;border-radius:12px!important;padding:1.5rem!important;font-family:Urbanist,sans-serif!important;font-size:1.5rem!important;font-weight:600!important;color:#1e5a8e!important;text-decoration:none!important;transition:all 0.3s ease!important;box-shadow:0 2px 8px rgba(0,0,0,0.1)!important;';

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
}

// ========================================
// SENIORS NIGHT OUT FORM STYLING
// ========================================
function styleSeniorsNightOutForm() {
    var initialized = false;

    // Don't check URL - just look for the form
    var form = document.querySelector('form[name="form_6750519"]') ||
               document.querySelector('form[id="6750519"]') ||
               document.querySelector('form');

    // Check if we have a form and if it might be the Seniors Night Out form
    if (!form || initialized) return;

    // Additional check: see if page content mentions "Seniors Night Out"
    var pageText = document.body.textContent || '';
    if (pageText.toLowerCase().indexOf('seniors night out') === -1) {
        return; // Not the right page
    }

    initialized = true;

    // Apply page background - Festival theme
    document.body.style.cssText += 'background:linear-gradient(135deg, #ffffff 0%, #f3e5f5 100%)!important;';

    // Hide breadcrumbs
    var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
    }

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(107,63,160,0.15), 0 0 0 1px rgba(107,63,160,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#6B3FA0!important;margin-bottom:0.75rem!important;display:block!important;';
    }

    // Style ALL text-like elements in form
    var allFormElements = form.querySelectorAll('*');
    for (var i = 0; i < allFormElements.length; i++) {
        var el = allFormElements[i];
        var tagName = el.tagName.toLowerCase();

        if (tagName === 'input' || tagName === 'select' || tagName === 'button' || tagName === 'textarea') {
            continue;
        }

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
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
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
    var selects = form.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;padding:1.25rem 2rem!important;border:2px solid #d1c4e9!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;cursor:pointer!important;appearance:none!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B3FA0\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:right 2rem center!important;padding-right:3.5rem!important;';
    }

    // Style submit button - Festival Gold & Purple gradient
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"], .form-submit button, [id*="submit"] input[type="submit"]');
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

    // Animate form elements
    var allLabels = form.querySelectorAll('label');
    for (var i = 0; i < allLabels.length; i++) {
        allLabels[i].style.opacity = '0';
        allLabels[i].style.transform = 'translateX(-20px)';
        allLabels[i].style.transition = 'all 0.6s ease';

        (function(label, index) {
            setTimeout(function() {
                label.style.opacity = '1';
                label.style.transform = 'translateX(0)';
            }, 300 + (index * 50));
        })(allLabels[i], i);
    }
}

// ========================================
// INITIALIZE ALL FORM STYLES
// ========================================
function initializeFormStyles() {
    // Run all styling functions
    styleGmachDonationForm();
    styleSeniorsNightOutForm();
    // Add other form functions as needed
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
var observer = new MutationObserver(function() {
    initializeFormStyles();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});