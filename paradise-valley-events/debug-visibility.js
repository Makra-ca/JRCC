// DEBUG: Check why CMS native show/hide isn't working
// Paste this into browser console on the registration page

(function debugVisibility() {
    console.log('='.repeat(60));
    console.log('🔍 VISIBILITY DEBUG - Checking CMS native behavior');
    console.log('='.repeat(60));

    var sections = ['#Summary', '#ReserversInformation', '#Payment', '#Buttons'];

    sections.forEach(function(selector) {
        var el = document.querySelector(selector);
        console.log('\n📦 ' + selector);

        if (!el) {
            console.log('   ❌ NOT FOUND in DOM');
            return;
        }

        var computed = window.getComputedStyle(el);
        var inline = el.style.cssText;

        console.log('   📍 Found:', el.tagName, el.className);
        console.log('   📐 Computed display:', computed.display);
        console.log('   📐 Computed visibility:', computed.visibility);
        console.log('   📐 Computed opacity:', computed.opacity);
        console.log('   📐 Computed height:', computed.height);
        console.log('   🎨 Inline styles:', inline || '(none)');
        console.log('   🏷️ Classes:', el.className || '(none)');

        // Check if display is being forced
        if (inline.includes('display')) {
            console.log('   ⚠️ INLINE DISPLAY FOUND - this overrides CMS!');
        }

        // Check parent visibility
        var parent = el.parentElement;
        if (parent) {
            var parentComputed = window.getComputedStyle(parent);
            console.log('   👆 Parent display:', parentComputed.display);
            console.log('   👆 Parent visibility:', parentComputed.visibility);
        }

        // Check for any classes that might hide/show
        if (el.classList.contains('pv-hidden')) {
            console.log('   ⚠️ Has pv-hidden class');
        }
        if (el.classList.contains('pv-visible')) {
            console.log('   ⚠️ Has pv-visible class');
        }
    });

    // Check for any global styles affecting these
    console.log('\n' + '='.repeat(60));
    console.log('🎨 CHECKING CSS RULES AFFECTING VISIBILITY');
    console.log('='.repeat(60));

    sections.forEach(function(selector) {
        var el = document.querySelector(selector);
        if (!el) return;

        console.log('\n📦 CSS Rules for ' + selector + ':');

        // Get all stylesheets
        var sheets = document.styleSheets;
        for (var i = 0; i < sheets.length; i++) {
            try {
                var rules = sheets[i].cssRules || sheets[i].rules;
                if (!rules) continue;

                for (var j = 0; j < rules.length; j++) {
                    var rule = rules[j];
                    if (!rule.selectorText) continue;

                    // Check if this rule matches our element
                    if (rule.selectorText.includes(selector.replace('#', '')) ||
                        rule.selectorText.includes(selector)) {

                        var style = rule.style;
                        if (style.display || style.visibility || style.opacity) {
                            console.log('   📜 Rule:', rule.selectorText);
                            if (style.display) console.log('      display:', style.display);
                            if (style.visibility) console.log('      visibility:', style.visibility);
                            if (style.opacity) console.log('      opacity:', style.opacity);
                        }
                    }
                }
            } catch (e) {
                // Cross-origin stylesheet, skip
            }
        }
    });

    // Check what scripts might be modifying these
    console.log('\n' + '='.repeat(60));
    console.log('🔧 CHECKING FOR MUTATION OBSERVERS');
    console.log('='.repeat(60));

    // Check if our scripts added any markers
    var markers = [
        'pv-pricing-styled',
        'pv-single-event-styled',
        'pv-events-styled',
        'pv-info-styled'
    ];

    markers.forEach(function(marker) {
        var elements = document.querySelectorAll('.' + marker);
        if (elements.length > 0) {
            console.log('   ✅ Found', elements.length, 'elements with .' + marker);
        }
    });

    // Check for our styling body class
    if (document.body.classList.contains('pv-registration-page')) {
        console.log('   ✅ Body has pv-registration-page class');
    }

    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 SUMMARY - Potential Issues');
    console.log('='.repeat(60));

    var issues = [];

    sections.forEach(function(selector) {
        var el = document.querySelector(selector);
        if (!el) return;

        var inline = el.style.cssText;
        var computed = window.getComputedStyle(el);

        if (inline.includes('display')) {
            issues.push(selector + ' has inline display style: ' + el.style.display);
        }

        if (computed.display !== 'none' && selector !== '#Buttons') {
            // These should be hidden initially by CMS
            issues.push(selector + ' is VISIBLE (display: ' + computed.display + ') - should be hidden by CMS');
        }
    });

    if (issues.length === 0) {
        console.log('   ✅ No obvious issues found - sections appear hidden');
    } else {
        issues.forEach(function(issue) {
            console.log('   ⚠️ ' + issue);
        });
    }

    console.log('\n' + '='.repeat(60));
    console.log('💡 TIP: Run this BEFORE clicking Continue to see initial state');
    console.log('='.repeat(60));
})();
