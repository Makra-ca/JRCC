/*
   MINIMAL CAROUSEL TEST
   Paste this in console on jewishruralaz.org to test ONLY the carousel
*/

(function() {
    'use strict';

    // Extract carousel images
    const images = [];
    const slider = document.querySelector('.promo_slider');

    if (!slider) {
        console.log('❌ No .promo_slider found!');
        return;
    }

    slider.querySelectorAll('[style*="url"]').forEach(el => {
        const style = el.getAttribute('style') || '';
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match && match[1]) {
            const url = match[1];
            if (!url.includes('spacer') && !url.includes('logo') && !url.includes('icon') &&
                (url.includes('chabad.org/media') || url.includes('fbcdn'))) {
                if (!images.includes(url)) {
                    images.push(url);
                }
            }
        }
    });

    console.log('✅ Found', images.length, 'carousel images:');
    images.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));

    if (images.length === 0) {
        console.log('❌ No images to show!');
        return;
    }

    // Create test carousel overlay
    const overlay = document.createElement('div');
    overlay.id = 'carousel-test';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 99999;
        background: #000;
    `;

    // Create slides
    const slides = [];
    images.forEach((url, i) => {
        const slide = document.createElement('div');
        slide.style.cssText = `
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('${url}');
            background-size: cover;
            background-position: center;
            opacity: ${i === 0 ? '1' : '0'};
            transition: opacity 1s ease-in-out;
        `;
        slides.push(slide);
        overlay.appendChild(slide);
        console.log(`✅ Created slide ${i + 1} with:`, url);
    });

    // Navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.style.cssText = `
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 15px;
        z-index: 100000;
    `;

    let current = 0;
    const dots = [];

    const goTo = (i) => {
        slides[current].style.opacity = '0';
        dots[current].style.background = 'rgba(255,255,255,0.4)';
        current = i;
        slides[current].style.opacity = '1';
        dots[current].style.background = 'white';
        console.log('📍 Showing slide', i + 1);
    };

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.style.cssText = `
            width: 20px; height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            background: ${i === 0 ? 'white' : 'rgba(255,255,255,0.4)'};
            cursor: pointer;
        `;
        dot.onclick = () => goTo(i);
        dots.push(dot);
        dotsContainer.appendChild(dot);
    });
    overlay.appendChild(dotsContainer);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ Close Test';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px; right: 20px;
        background: red;
        color: white;
        border: none;
        padding: 15px 25px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 8px;
        z-index: 100000;
    `;
    closeBtn.onclick = () => overlay.remove();
    overlay.appendChild(closeBtn);

    // Status text
    const status = document.createElement('div');
    status.style.cssText = `
        position: absolute;
        top: 20px; left: 20px;
        background: rgba(0,0,0,0.8);
        color: #0f0;
        padding: 15px 25px;
        font-size: 16px;
        font-family: monospace;
        border-radius: 8px;
        z-index: 100000;
    `;
    status.textContent = `✅ Carousel Test: ${images.length} images loaded. Click dots to navigate.`;
    overlay.appendChild(status);

    // Auto-rotate
    setInterval(() => goTo((current + 1) % slides.length), 4000);

    document.body.appendChild(overlay);
    console.log('✅ Carousel test overlay created! Click dots or wait for auto-rotate.');

})();
