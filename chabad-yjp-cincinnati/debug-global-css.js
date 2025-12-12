// Debug script - paste in console to check what's affecting our styles
(function() {
    console.log('=== GLOBAL CSS DEBUG ===\n');

    // 1. Check html/body font-size (CYP theme issue)
    const html = document.documentElement;
    const body = document.body;
    const htmlStyles = getComputedStyle(html);
    const bodyStyles = getComputedStyle(body);

    console.log('📏 BASE FONT SIZES:');
    console.log('  html font-size:', htmlStyles.fontSize);
    console.log('  body font-size:', bodyStyles.fontSize);

    // Check what 1rem equals
    const testRem = document.createElement('div');
    testRem.style.cssText = 'position:absolute;width:1rem;visibility:hidden;';
    body.appendChild(testRem);
    console.log('  1rem =', testRem.getBoundingClientRect().width + 'px');
    body.removeChild(testRem);

    // 2. Check Shadow Host
    const host = document.querySelector('#yjp-shadow-host');
    if (!host) {
        console.log('\n❌ Shadow host not found. Run the redesign script first.');
        return;
    }

    const hostStyles = getComputedStyle(host);
    console.log('\n🏠 SHADOW HOST:');
    console.log('  font-size:', hostStyles.fontSize);
    console.log('  line-height:', hostStyles.lineHeight);
    console.log('  zoom:', hostStyles.zoom);
    console.log('  transform:', hostStyles.transform);

    // 3. Check inside Shadow DOM
    const shadow = host.shadowRoot;
    if (!shadow) {
        console.log('\n❌ Shadow root not found.');
        return;
    }

    console.log('\n🔍 INSIDE SHADOW DOM:');

    // Check style element
    const styleEl = shadow.querySelector('style');
    if (styleEl) {
        console.log('  Style element found:', styleEl.textContent.length, 'chars');
    }

    // Check various elements
    const checks = [
        { selector: '.section', name: 'Section' },
        { selector: '.section-title', name: 'Section Title' },
        { selector: '.section-subtitle', name: 'Section Subtitle' },
        { selector: '.btn', name: 'Button' },
        { selector: 'nav a', name: 'Nav Link' },
        { selector: 'h1', name: 'H1 (Hero)' },
    ];

    checks.forEach(({ selector, name }) => {
        const el = shadow.querySelector(selector);
        if (el) {
            const s = getComputedStyle(el);
            console.log(`  ${name}: font-size=${s.fontSize}, line-height=${s.lineHeight}`);
        }
    });

    // 4. Check for CMS styles leaking in
    console.log('\n🔎 CHECKING FOR CMS STYLE LEAKS:');

    // Check if any external stylesheets could affect shadow DOM (they shouldn't)
    const stylesheets = document.styleSheets;
    console.log('  External stylesheets:', stylesheets.length);

    // Check for any zoom/scale on body or html
    console.log('  html zoom:', htmlStyles.zoom || 'none');
    console.log('  body zoom:', bodyStyles.zoom || 'none');
    console.log('  html transform:', htmlStyles.transform);
    console.log('  body transform:', bodyStyles.transform);

    // 5. Viewport info
    console.log('\n📱 VIEWPORT:');
    console.log('  window.innerWidth:', window.innerWidth);
    console.log('  window.innerHeight:', window.innerHeight);
    console.log('  devicePixelRatio:', window.devicePixelRatio);
    console.log('  visualViewport.scale:', window.visualViewport?.scale || 'N/A');

    // 6. Check for inherited properties on host
    console.log('\n⚠️ INHERITED PROPERTIES ON HOST:');
    const inheritedProps = ['font-size', 'line-height', 'font-family', 'letter-spacing', 'word-spacing', 'text-size-adjust', '-webkit-text-size-adjust'];
    inheritedProps.forEach(prop => {
        console.log(`  ${prop}:`, hostStyles.getPropertyValue(prop));
    });

    // 7. Specific check for text-size-adjust (mobile Safari/Chrome issue)
    console.log('\n📲 TEXT SIZE ADJUST:');
    console.log('  html -webkit-text-size-adjust:', htmlStyles.webkitTextSizeAdjust || htmlStyles.getPropertyValue('-webkit-text-size-adjust'));
    console.log('  body -webkit-text-size-adjust:', bodyStyles.webkitTextSizeAdjust || bodyStyles.getPropertyValue('-webkit-text-size-adjust'));

    console.log('\n=== END DEBUG ===');
})();
