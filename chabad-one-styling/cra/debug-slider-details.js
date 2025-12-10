/* ===================================================================
   CRA Slider Details Debug
   Run this after the first debug to get slider specifics
   =================================================================== */

(function() {
    'use strict';

    console.log('%c=== SLIDER DETAILS ===', 'color: #722F37; font-size: 16px; font-weight: bold;');

    // Find the promo slider
    const slider = document.querySelector('.promo_slider');
    const sliderWrapper = slider?.querySelector('.wrapper');

    if (!slider) {
        console.log('❌ No .promo_slider found');
        return;
    }

    console.log('\n%c1. Slider Element', 'color: #2D5A5A; font-weight: bold;');
    console.log('Slider:', slider);
    console.log('Classes:', slider.className);
    console.log('Wrapper:', sliderWrapper);

    // Get all children of wrapper (these are the slides)
    console.log('\n%c2. Slide Elements', 'color: #2D5A5A; font-weight: bold;');

    const slides = sliderWrapper ? Array.from(sliderWrapper.children) : [];
    console.log(`Found ${slides.length} slides`);

    slides.forEach((slide, i) => {
        console.log(`\nSlide ${i}:`, slide);
        console.log(`  Tag: ${slide.tagName}`);
        console.log(`  Classes: ${slide.className}`);
        console.log(`  Style: ${slide.getAttribute('style')}`);

        // Check for background image
        const style = slide.getAttribute('style') || '';
        const bgMatch = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (bgMatch) {
            console.log(`  Background Image: ${bgMatch[1]}`);
        }

        // Check for img tags inside
        const imgs = slide.querySelectorAll('img');
        imgs.forEach((img, j) => {
            console.log(`  <img ${j}>: ${img.src}`);
        });

        // Check for links
        const links = slide.querySelectorAll('a');
        links.forEach((link, j) => {
            console.log(`  <a ${j}>: ${link.href}`);
        });
    });

    // 3. Check jQuery Cycle configuration
    console.log('\n%c3. jQuery Cycle Info', 'color: #2D5A5A; font-weight: bold;');

    if (typeof jQuery !== 'undefined') {
        const $slider = jQuery(sliderWrapper || slider);

        // Try to get cycle options
        const cycleData = $slider.data();
        console.log('jQuery data on slider:', cycleData);

        // Check if cycle is initialized
        if ($slider.data('cycle.opts')) {
            console.log('Cycle options:', $slider.data('cycle.opts'));
        }

        // Look for cycle API
        if ($slider.cycle) {
            console.log('Cycle API available');
        }
    }

    // 4. Extract all slider images
    console.log('\n%c4. All Slider Images', 'color: #2D5A5A; font-weight: bold;');

    const allImages = [];

    // Method 1: Background images in slides
    slides.forEach(slide => {
        const style = slide.getAttribute('style') || '';
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match) {
            allImages.push({ type: 'background', url: match[1], element: slide });
        }
    });

    // Method 2: img tags in slides
    slides.forEach(slide => {
        slide.querySelectorAll('img').forEach(img => {
            if (img.src && !allImages.find(i => i.url === img.src)) {
                allImages.push({ type: 'img', url: img.src, element: img });
            }
        });
    });

    // Method 3: Check any element with background in slider
    slider.querySelectorAll('[style*="url"]').forEach(el => {
        const style = el.getAttribute('style') || '';
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match && !allImages.find(i => i.url === match[1])) {
            allImages.push({ type: 'nested-bg', url: match[1], element: el });
        }
    });

    console.log(`\nFound ${allImages.length} images in slider:`);
    allImages.forEach((img, i) => {
        console.log(`  ${i}: [${img.type}] ${img.url}`);
    });

    // 5. Get computed dimensions
    console.log('\n%c5. Slider Dimensions', 'color: #2D5A5A; font-weight: bold;');

    const sliderRect = slider.getBoundingClientRect();
    const wrapperRect = sliderWrapper?.getBoundingClientRect();

    console.log(`Slider: ${Math.round(sliderRect.width)}x${Math.round(sliderRect.height)}`);
    console.log(`Wrapper: ${wrapperRect ? Math.round(wrapperRect.width) + 'x' + Math.round(wrapperRect.height) : 'N/A'}`);

    if (slides[0]) {
        const slideRect = slides[0].getBoundingClientRect();
        console.log(`First Slide: ${Math.round(slideRect.width)}x${Math.round(slideRect.height)}`);
    }

    // 6. Check CSS positioning
    console.log('\n%c6. CSS Styles', 'color: #2D5A5A; font-weight: bold;');

    const sliderStyles = window.getComputedStyle(slider);
    const wrapperStyles = sliderWrapper ? window.getComputedStyle(sliderWrapper) : null;

    console.log('Slider position:', sliderStyles.position);
    console.log('Slider overflow:', sliderStyles.overflow);
    console.log('Wrapper position:', wrapperStyles?.position);
    console.log('Wrapper overflow:', wrapperStyles?.overflow);

    // 7. Store for later use
    window.CRA_SLIDER = {
        slider,
        wrapper: sliderWrapper,
        slides,
        images: allImages,
        dimensions: {
            slider: sliderRect,
            wrapper: wrapperRect
        }
    };

    console.log('\n%c✓ Slider data stored in window.CRA_SLIDER', 'color: #4CAF50; font-weight: bold;');

    // 8. Provide code snippet
    console.log('\n%c7. Code to Extract Slider', 'color: #2D5A5A; font-weight: bold;');
    console.log(`
// To clone and preserve the slider:
const originalSlider = document.querySelector('.promo_slider');
const sliderClone = originalSlider.cloneNode(true);

// Image URLs for custom carousel:
const imageUrls = ${JSON.stringify(allImages.map(i => i.url), null, 2)};
`);

})();
