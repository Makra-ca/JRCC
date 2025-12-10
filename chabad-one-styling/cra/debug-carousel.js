/* ===================================================================
   CRA Carousel Debug Script
   ===================================================================

   Run this in the browser console on jewishruralaz.org BEFORE the
   redesign script loads (or disable the redesign script temporarily).

   This will explore the carousel structure and log findings.

   =================================================================== */

(function() {
    'use strict';

    console.log('%c=== CRA Carousel Debug ===', 'color: #722F37; font-size: 16px; font-weight: bold;');

    // Common Chabad One carousel selectors to check
    const carouselSelectors = [
        // Slider/Carousel containers
        '.slider',
        '.carousel',
        '.slideshow',
        '.banner',
        '.hp-banner',
        '.hp-slideshow',
        '.hp-slider',
        '.homepage-slider',
        '.cycle-slideshow',
        '.bx-wrapper',
        '.bxslider',
        '.slick-slider',
        '.slick-carousel',
        '.swiper',
        '.swiper-container',
        '.owl-carousel',
        '.flexslider',

        // Chabad One specific
        '.hp-table',
        '.hp-table-row',
        '.hp-header-row',
        '.body_wrapper .slider',
        '[class*="slider"]',
        '[class*="carousel"]',
        '[class*="slide"]',
        '[id*="slider"]',
        '[id*="carousel"]',
        '[id*="banner"]',

        // Image containers that might be carousels
        '.rotating-images',
        '.image-rotator',
        '.featured-images'
    ];

    console.log('\n%c1. Checking carousel selectors...', 'color: #2D5A5A; font-weight: bold;');

    const foundCarousels = [];

    carouselSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            console.log(`✓ Found ${elements.length} element(s) for: ${selector}`);
            elements.forEach((el, i) => {
                foundCarousels.push({
                    selector,
                    element: el,
                    index: i,
                    classes: el.className,
                    id: el.id,
                    tagName: el.tagName
                });
            });
        }
    });

    // 2. Look for elements with multiple background images (common carousel pattern)
    console.log('\n%c2. Looking for potential carousel image containers...', 'color: #2D5A5A; font-weight: bold;');

    const bgImageElements = document.querySelectorAll('[style*="background"]');
    const carouselCandidates = [];

    bgImageElements.forEach(el => {
        // Check if parent contains multiple similar siblings (carousel slides)
        const parent = el.parentElement;
        if (parent) {
            const siblings = Array.from(parent.children).filter(child => {
                const style = child.getAttribute('style') || '';
                return style.includes('background') && style.includes('url');
            });

            if (siblings.length >= 3) {
                if (!carouselCandidates.find(c => c.parent === parent)) {
                    carouselCandidates.push({
                        parent,
                        slideCount: siblings.length,
                        parentClasses: parent.className,
                        parentId: parent.id
                    });
                }
            }
        }
    });

    carouselCandidates.forEach(c => {
        console.log(`✓ Potential carousel: ${c.slideCount} slides`, {
            classes: c.parentClasses,
            id: c.parentId,
            element: c.parent
        });
    });

    // 3. Check for script-based carousels
    console.log('\n%c3. Checking for carousel libraries loaded...', 'color: #2D5A5A; font-weight: bold;');

    const carouselLibs = {
        'jQuery Cycle': typeof jQuery !== 'undefined' && jQuery.fn.cycle,
        'bxSlider': typeof jQuery !== 'undefined' && jQuery.fn.bxSlider,
        'Slick': typeof jQuery !== 'undefined' && jQuery.fn.slick,
        'Swiper': typeof Swiper !== 'undefined',
        'Owl Carousel': typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel,
        'FlexSlider': typeof jQuery !== 'undefined' && jQuery.fn.flexslider
    };

    Object.entries(carouselLibs).forEach(([name, loaded]) => {
        if (loaded) {
            console.log(`✓ ${name} is loaded`);
        }
    });

    // 4. Look inside hp-table (common Chabad One homepage container)
    console.log('\n%c4. Exploring .hp-table and .body_wrapper structure...', 'color: #2D5A5A; font-weight: bold;');

    const hpTable = document.querySelector('.hp-table');
    const bodyWrapper = document.querySelector('.body_wrapper');

    if (hpTable) {
        console.log('hp-table found:', hpTable);
        console.log('hp-table children:', hpTable.children.length);

        // Log structure
        const logStructure = (el, depth = 0) => {
            if (depth > 3) return;
            const indent = '  '.repeat(depth);
            const hasImages = el.querySelectorAll('img, [style*="url"]').length;
            const info = `${indent}${el.tagName}${el.className ? '.' + el.className.split(' ').join('.') : ''}${el.id ? '#' + el.id : ''} (${hasImages} images)`;
            console.log(info);

            Array.from(el.children).slice(0, 5).forEach(child => logStructure(child, depth + 1));
        };

        logStructure(hpTable);
    }

    if (bodyWrapper) {
        console.log('\nbody_wrapper found:', bodyWrapper);

        // Find first-level containers that might be the carousel
        Array.from(bodyWrapper.children).slice(0, 10).forEach((child, i) => {
            const hasImages = child.querySelectorAll('img, [style*="url"]').length;
            const size = child.getBoundingClientRect();
            console.log(`Child ${i}: ${child.tagName}.${child.className || 'no-class'} - ${hasImages} images, size: ${Math.round(size.width)}x${Math.round(size.height)}`);
        });
    }

    // 5. Find large image containers at the top of the page
    console.log('\n%c5. Finding large image containers (potential hero/carousel)...', 'color: #2D5A5A; font-weight: bold;');

    const allElements = document.querySelectorAll('*');
    const largeImageContainers = [];

    allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Look for elements that are wide and tall near the top
        if (rect.width > 500 && rect.height > 200 && rect.top < 600) {
            const hasImages = el.querySelectorAll('img').length;
            const hasBgImages = el.querySelectorAll('[style*="url"]').length;
            const ownBg = (el.getAttribute('style') || '').includes('url');

            if (hasImages > 0 || hasBgImages > 0 || ownBg) {
                largeImageContainers.push({
                    element: el,
                    tag: el.tagName,
                    classes: el.className,
                    id: el.id,
                    size: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
                    top: Math.round(rect.top),
                    images: hasImages,
                    bgImages: hasBgImages
                });
            }
        }
    });

    // Sort by top position and size
    largeImageContainers.sort((a, b) => a.top - b.top);

    largeImageContainers.slice(0, 10).forEach((c, i) => {
        console.log(`${i + 1}. ${c.tag}${c.classes ? '.' + c.classes.split(' ')[0] : ''}${c.id ? '#' + c.id : ''}`);
        console.log(`   Size: ${c.size}, Top: ${c.top}px, Images: ${c.images}, BG Images: ${c.bgImages}`);
        console.log('   Element:', c.element);
    });

    // 6. Extract carousel images if found
    console.log('\n%c6. Attempting to extract carousel images...', 'color: #2D5A5A; font-weight: bold;');

    const extractCarouselImages = () => {
        const images = [];

        // Method 1: Look for cycle slideshow (common in Chabad One)
        const cycleSlides = document.querySelectorAll('.cycle-slideshow img, .cycle-slide img');
        cycleSlides.forEach(img => {
            if (img.src && !images.includes(img.src)) {
                images.push(img.src);
            }
        });

        // Method 2: Look for slick slides
        const slickSlides = document.querySelectorAll('.slick-slide img');
        slickSlides.forEach(img => {
            if (img.src && !images.includes(img.src)) {
                images.push(img.src);
            }
        });

        // Method 3: Generic - look for multiple large images in a container
        const containers = document.querySelectorAll('.slider, .carousel, .slideshow, [class*="slider"], [class*="carousel"]');
        containers.forEach(container => {
            container.querySelectorAll('img').forEach(img => {
                if (img.src && img.naturalWidth > 400 && !images.includes(img.src)) {
                    images.push(img.src);
                }
            });
        });

        // Method 4: Background images in slide containers
        document.querySelectorAll('[class*="slide"], .banner, .hp-banner').forEach(el => {
            const style = el.getAttribute('style') || '';
            const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
            if (match && !images.includes(match[1])) {
                images.push(match[1]);
            }
        });

        return images;
    };

    const carouselImages = extractCarouselImages();

    if (carouselImages.length > 0) {
        console.log(`Found ${carouselImages.length} carousel images:`);
        carouselImages.forEach((url, i) => {
            console.log(`  ${i + 1}. ${url}`);
        });
    } else {
        console.log('No carousel images found with standard methods.');
    }

    // 7. Summary and recommendations
    console.log('\n%c=== SUMMARY ===', 'color: #722F37; font-size: 14px; font-weight: bold;');

    console.log('\nTo preserve the carousel, you may need to:');
    console.log('1. NOT hide the carousel container in hideCMSElements()');
    console.log('2. Clone the carousel element before hiding other elements');
    console.log('3. Move the carousel into your Shadow DOM');
    console.log('4. Or extract just the image URLs and recreate a custom carousel');

    // Store findings globally for further inspection
    window.CRA_DEBUG = {
        foundCarousels,
        carouselCandidates,
        carouselImages,
        largeImageContainers,
        hpTable,
        bodyWrapper
    };

    console.log('\n%cDebug data stored in window.CRA_DEBUG for inspection', 'color: #D4A84B;');
    console.log('Type: window.CRA_DEBUG to explore');

})();
