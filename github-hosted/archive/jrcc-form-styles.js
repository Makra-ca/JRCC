/* JRCC Form-Specific Inline Styling Functions */
/* These apply inline styles like the original custom-footer-code.html */

// ========================================
// GMACH DONATION FORM STYLING
// ========================================
function styleGmachDonationForm() {
    // Check if on Gmach page
    if (window.location.href.indexOf('/912618/') === -1 &&
        window.location.href.indexOf('Gmach-Donation') === -1) {
        return;
    }

    var form = document.querySelector('form#form1') ||
               document.querySelector('form[name="form_3767140"]');
    if (!form) return;

    // Apply page background (BLACK gradient)
    document.body.style.cssText += 'background:linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)!important;';

    // Hide breadcrumbs
    var breadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb, [class*="breadcrumb"]');
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumbs[i].style.cssText = 'display:none!important;visibility:hidden!important;';
    }

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:3rem auto!important;padding:4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

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

    // Style submit button
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
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
}

// ========================================
// SENIORS NIGHT OUT FORM STYLING
// ========================================
function styleSeniorsNightOutForm() {
    // Check if on Seniors Night Out page
    if (window.location.href.indexOf('/6750519/') === -1 &&
        window.location.href.indexOf('Seniors-Night-Out') === -1) {
        return;
    }

    var form = document.querySelector('form[name="form_6750519"]') ||
               document.querySelector('form[id="6750519"]');
    if (!form) return;

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

    // Style select dropdowns (no padding to avoid invisible text)
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
// VOLUNTEER FORM STYLING
// ========================================
function styleVolunteerForm() {
    // Check if on Volunteer page
    if (window.location.href.indexOf('/5094614/') === -1 &&
        window.location.href.indexOf('/5434008/') === -1 &&
        window.location.href.indexOf('volunteer') === -1) {
        return;
    }

    var form = document.querySelector('form[id*="form"]') ||
               document.querySelector('form[name*="form_"]') ||
               document.querySelector('form');
    if (!form) return;

    // Apply page background - RED gradient
    document.body.style.cssText += 'background:linear-gradient(135deg, #2a0e14 0%, #5c1f2e 50%, #8b2e3f 100%)!important;';

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,208,63,0.15)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style form labels
    var labels = form.querySelectorAll('label, .form-label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.75rem!important;font-weight:600!important;color:#c93545!important;margin-bottom:0.75rem!important;display:block!important;';
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
}

// ========================================
// YESHIVA SCHOLARSHIP FORM STYLING
// ========================================
function styleYeshivaScholarshipForm() {
    // Check if on Yeshiva page
    if (window.location.href.indexOf('/889639/') === -1 &&
        window.location.href.indexOf('/5537074/') === -1 &&
        window.location.href.indexOf('yeshiva') === -1 &&
        window.location.href.indexOf('scholarship') === -1) {
        return;
    }

    var form = document.querySelector('form#form1') ||
               document.querySelector('form[name="form_3767140"]') ||
               document.querySelector('form[id*="3767140"]');
    if (!form) return;

    // Apply page background
    document.body.style.cssText += 'background:linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)!important;';

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:3rem auto!important;padding:4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(30,58,138,0.3),0 0 0 2px rgba(245,158,11,0.2)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style submit button - Navy to Gold gradient
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
    for (var i = 0; i < submitButtons.length; i++) {
        submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #1e3a8a 0%, #f59e0b 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(30,58,138,0.3)!important;min-width:240px!important;margin:2rem auto!important;display:block!important;';

        submitButtons[i].addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #1e40af 0%, #d97706 100%)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(30,58,138,0.4)';
        });
        submitButtons[i].addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #f59e0b 100%)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(30,58,138,0.3)';
        });
    }
}

// ========================================
// HEALTHY AT HOME FORM STYLING
// ========================================
function styleHealthyAtHomeForm() {
    // Check if on Healthy At Home page
    if (window.location.href.indexOf('/6991302/') === -1 &&
        window.location.href.indexOf('Healthy-At-Home') === -1) {
        return;
    }

    var form = document.querySelector('form[name="form_6991302"]') ||
               document.querySelector('form[id="6991302"]');
    if (!form) return;

    // Apply page background
    document.body.style.cssText += 'background:linear-gradient(135deg, #f8f9fa 0%, #f3f0ff 100%)!important;';

    // Style the form container
    form.style.cssText = 'max-width:1100px!important;margin:0 auto 3rem auto!important;padding:0 4rem 4rem 4rem!important;background:#ffffff!important;border-radius:16px!important;box-shadow:0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)!important;font-family:Urbanist,sans-serif!important;position:relative!important;z-index:5!important;';

    // Style submit button
    var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
    for (var i = 0; i < submitButtons.length; i++) {
        submitButtons[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:1.625rem!important;font-weight:700!important;color:#ffffff!important;background:linear-gradient(135deg, #1e5a8e 0%, #2a75b8 100%)!important;border:none!important;border-radius:50px!important;padding:1.75rem 4rem!important;cursor:pointer!important;transition:all 0.3s ease!important;box-shadow:0 4px 12px rgba(30,90,142,0.2)!important;min-width:240px!important;margin:2rem auto!important;display:block!important;';
    }
}

// ========================================
// INITIALIZATION
// ========================================
function initializeFormStyles() {
    console.log('JRCC: Initializing form-specific inline styles...');

    // Run all styling functions
    styleGmachDonationForm();
    styleSeniorsNightOutForm();
    styleVolunteerForm();
    styleYeshivaScholarshipForm();
    styleHealthyAtHomeForm();
}

// Run on various events
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFormStyles);
} else {
    initializeFormStyles();
}

// Also run with delays to catch dynamic content
setTimeout(initializeFormStyles, 500);
setTimeout(initializeFormStyles, 1000);
setTimeout(initializeFormStyles, 2000);

// Watch for dynamic content
var observer = new MutationObserver(function() {
    initializeFormStyles();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log('JRCC form styles loaded');