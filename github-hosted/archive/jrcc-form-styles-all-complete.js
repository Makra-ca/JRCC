/* JRCC Form-Specific Inline Styling Functions - TRULY COMPLETE VERSION */
/* Includes ALL 5 form styling functions from custom-footer-code.html */

// Global initialization tracking
var gmachInitialized = false;
var healthyAtHomeInitialized = false;
var seniorsInitialized = false;
var yeshivaInitialized = false;
var volunteerInitialized = false;

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

    // Check if we're on the Healthy At Home page
    var isHealthyAtHomePage = window.location.href.indexOf('/aid/6991302/') !== -1 ||
                              window.location.href.indexOf('Healthy-At-Home-Registration') !== -1;
    if (!isHealthyAtHomePage) return;

    var form = document.querySelector('form[name="form_6991302"]') ||
               document.querySelector('form[id="6991302"]') ||
               document.querySelector('form.userform-form') ||
               document.querySelector('form');
    if (!form) return;

    healthyAtHomeInitialized = true;

    // Apply page background (light gradient - white to lavender)
    document.body.style.cssText = (document.body.style.cssText || '') + 'background:linear-gradient(135deg, #f8f9fa 0%, #f3f0ff 100%)!important;';

    // Hide breadcrumbs
    var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
    }

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(124,58,237,0.12), 0 0 0 1px rgba(124,58,237,0.05)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#7c3aed!important;margin-bottom:0.75rem!important;display:block!important;';
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
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.35rem!important;padding:1.25rem 2rem!important;border:2px solid #e9d5ff!important;border-radius:12px!important;background:#ffffff!important;color:#2a2a2a!important;transition:all 0.3s ease!important;box-sizing:border-box!important;width:100%!important;';

        inputs[i].addEventListener('focus', function() {
            this.style.borderColor = '#7c3aed';
            this.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
            this.style.outline = 'none';
        });
        inputs[i].addEventListener('blur', function() {
            this.style.borderColor = '#e9d5ff';
            this.style.boxShadow = 'none';
        });
    }

    // Style submit button - Purple/Pink gradient
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
    for (var i = 0; i < submitButtons.length; i++) {
        submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(124,58,237,0.3)!important;min-width:240px!important;margin:2rem auto!important;display:block!important;';

        submitButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #6d28d9 0%, #db2777 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(124,58,237,0.4)';
        });
        submitButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(124,58,237,0.3)';
        });
    }
}

// ========================================
// 3. SENIORS NIGHT OUT FORM STYLING
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

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(107,63,160,0.15), 0 0 0 1px rgba(107,63,160,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#6B3FA0!important;margin-bottom:0.75rem!important;display:block!important;';
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

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels - Blue theme
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#3b82f6!important;margin-bottom:0.75rem!important;display:block!important;';
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
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
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

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,208,63,0.15)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#c93545!important;margin-bottom:0.75rem!important;display:block!important;';
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
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
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