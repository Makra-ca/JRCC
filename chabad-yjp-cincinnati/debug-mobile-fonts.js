// Debug script - paste in console on mobile
(function() {
    console.log('=== FONT SIZE DEBUG ===');

    // Check html font-size (CYP theme sets this to 62.5% = 10px)
    const htmlFontSize = getComputedStyle(document.documentElement).fontSize;
    console.log('HTML font-size:', htmlFontSize);

    // Check body font-size
    const bodyFontSize = getComputedStyle(document.body).fontSize;
    console.log('Body font-size:', bodyFontSize);

    // Check what 1rem equals
    const testEl = document.createElement('div');
    testEl.style.cssText = 'position:absolute;width:1rem;height:1rem;visibility:hidden;';
    document.body.appendChild(testEl);
    const remInPx = testEl.getBoundingClientRect().width;
    document.body.removeChild(testEl);
    console.log('1rem equals:', remInPx + 'px');

    // Check Shadow DOM host
    const shadowHost = document.querySelector('#yjp-shadow-host');
    if (shadowHost) {
        const hostFontSize = getComputedStyle(shadowHost).fontSize;
        console.log('Shadow host font-size:', hostFontSize);

        // Check inside shadow DOM
        const shadow = shadowHost.shadowRoot;
        if (shadow) {
            const firstSection = shadow.querySelector('.section');
            if (firstSection) {
                console.log('Section font-size:', getComputedStyle(firstSection).fontSize);
            }

            const title = shadow.querySelector('.section-title');
            if (title) {
                console.log('Section title font-size:', getComputedStyle(title).fontSize);
            }

            const subtitle = shadow.querySelector('.section-subtitle');
            if (subtitle) {
                console.log('Section subtitle font-size:', getComputedStyle(subtitle).fontSize);
            }

            const btn = shadow.querySelector('.btn');
            if (btn) {
                console.log('Button font-size:', getComputedStyle(btn).fontSize);
            }
        }
    } else {
        console.log('Shadow host not found - run the redesign script first');
    }

    // Check viewport
    console.log('Viewport width:', window.innerWidth + 'px');
    console.log('Device pixel ratio:', window.devicePixelRatio);

    console.log('=== END DEBUG ===');
})();
