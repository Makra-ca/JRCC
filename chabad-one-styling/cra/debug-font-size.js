// Debug script to check if CMS is affecting root font-size
// Run this in browser console on the live site

(function() {
    console.log('=== FONT SIZE DEBUG ===\n');

    // Check root font-size
    const html = document.documentElement;
    const body = document.body;

    const htmlFontSize = window.getComputedStyle(html).fontSize;
    const bodyFontSize = window.getComputedStyle(body).fontSize;

    console.log('HTML (root) font-size:', htmlFontSize);
    console.log('BODY font-size:', bodyFontSize);

    const rootPx = parseFloat(htmlFontSize);
    console.log('\nRoot font-size in px:', rootPx);
    console.log('Default browser root:', '16px');
    console.log('Difference:', (rootPx - 16) + 'px (' + ((rootPx/16)*100).toFixed(1) + '% of default)');

    if (rootPx < 16) {
        console.warn('\n⚠️  ROOT FONT-SIZE IS SMALLER THAN DEFAULT!');
        console.warn('This means all rem values will be scaled down.');
        console.warn('1rem = ' + rootPx + 'px instead of 16px');
    } else if (rootPx > 16) {
        console.log('\n✓ Root font-size is larger than default');
    } else {
        console.log('\n✓ Root font-size is at default 16px');
    }

    // Check what's setting the root font-size
    console.log('\n=== CHECKING STYLESHEETS ===\n');

    const stylesheets = document.styleSheets;
    let foundRules = [];

    try {
        for (let i = 0; i < stylesheets.length; i++) {
            try {
                const rules = stylesheets[i].cssRules || stylesheets[i].rules;
                if (!rules) continue;

                for (let j = 0; j < rules.length; j++) {
                    const rule = rules[j];
                    if (rule.selectorText &&
                        (rule.selectorText === 'html' ||
                         rule.selectorText === ':root' ||
                         rule.selectorText === 'body')) {
                        if (rule.style.fontSize) {
                            foundRules.push({
                                selector: rule.selectorText,
                                fontSize: rule.style.fontSize,
                                stylesheet: stylesheets[i].href || 'inline'
                            });
                        }
                    }
                }
            } catch (e) {
                // CORS blocked stylesheets
                console.log('Could not read:', stylesheets[i].href || 'inline stylesheet');
            }
        }
    } catch (e) {
        console.log('Error reading stylesheets:', e);
    }

    if (foundRules.length > 0) {
        console.log('Found font-size rules:');
        foundRules.forEach(r => {
            console.log(`  ${r.selector}: ${r.fontSize} (from: ${r.stylesheet})`);
        });
    } else {
        console.log('No explicit font-size rules found on html/body/:root');
    }

    // Check inline styles
    console.log('\n=== INLINE STYLES ===\n');
    console.log('HTML inline style:', html.getAttribute('style') || 'none');
    console.log('BODY inline style:', body.getAttribute('style') || 'none');

    // Test what 1rem actually equals
    console.log('\n=== REM TEST ===\n');
    const testEl = document.createElement('div');
    testEl.style.cssText = 'position:absolute;width:1rem;height:1rem;visibility:hidden;';
    document.body.appendChild(testEl);
    const remInPx = testEl.getBoundingClientRect().width;
    document.body.removeChild(testEl);
    console.log('1rem actually equals:', remInPx + 'px');

    // Recommendation
    console.log('\n=== RECOMMENDATION ===\n');
    if (rootPx < 16) {
        console.log('To fix: Add this to your Shadow DOM styles:');
        console.log('  :host { font-size: 16px; }');
        console.log('Or use px values instead of rem for critical text sizes.');
    }

    console.log('\n=== END DEBUG ===');
})();
