/* JRCC Banner/Background Diagnostic - Enhanced Version
 * Specifically diagnoses why banner backgrounds are still visible
 */

console.log('========================================');
console.log('ENHANCED BANNER/BACKGROUND DIAGNOSTIC');
console.log('========================================');

// Find ALL elements with background images
console.log('\n1. SCANNING ALL ELEMENTS FOR BACKGROUNDS...');
var allElements = document.querySelectorAll('*');
var elementsWithBackgrounds = [];

allElements.forEach(function(el) {
    var computedStyle = window.getComputedStyle(el);
    var hasBackground = false;
    var backgroundInfo = {};

    // Check computed background-image
    if (computedStyle.backgroundImage && computedStyle.backgroundImage !== 'none') {
        hasBackground = true;
        backgroundInfo.computedBgImage = computedStyle.backgroundImage.substring(0, 100);
    }

    // Check inline style for background
    if (el.style.backgroundImage && el.style.backgroundImage !== 'none') {
        hasBackground = true;
        backgroundInfo.inlineBgImage = el.style.backgroundImage.substring(0, 100);
    }

    // Check if visible
    var isVisible = computedStyle.display !== 'none' &&
                   computedStyle.visibility !== 'hidden' &&
                   parseFloat(computedStyle.opacity) > 0 &&
                   parseFloat(computedStyle.height) > 0;

    if (hasBackground && isVisible) {
        elementsWithBackgrounds.push({
            element: el,
            tagName: el.tagName,
            className: el.className,
            id: el.id,
            backgroundInfo: backgroundInfo,
            dimensions: {
                width: computedStyle.width,
                height: computedStyle.height
            },
            position: {
                top: el.offsetTop,
                left: el.offsetLeft
            }
        });
    }
});

console.log('\n⚠️ Found', elementsWithBackgrounds.length, 'visible elements with background images:');
elementsWithBackgrounds.forEach(function(item, index) {
    console.log('\n  Element #' + (index + 1) + ':');
    console.log('    Tag:', item.tagName);
    console.log('    Class:', item.className || 'none');
    console.log('    ID:', item.id || 'none');
    console.log('    Dimensions:', item.dimensions.width, 'x', item.dimensions.height);
    console.log('    Position: Top=' + item.position.top + ', Left=' + item.position.left);
    if (item.backgroundInfo.computedBgImage) {
        console.log('    Computed BG:', item.backgroundInfo.computedBgImage + '...');
    }
    if (item.backgroundInfo.inlineBgImage) {
        console.log('    Inline BG:', item.backgroundInfo.inlineBgImage + '...');
    }
});

console.log('\n========================================');
console.log('2. CHECKING SPECIFIC PROBLEM AREAS');
console.log('========================================');

// Check article-header specifically
var articleHeaders = document.querySelectorAll('.article-header, header.article-header, header[class*="article"]');
console.log('\nArticle Headers Found:', articleHeaders.length);
articleHeaders.forEach(function(header, index) {
    var computedStyle = window.getComputedStyle(header);
    console.log('\nHeader #' + (index + 1) + ':');
    console.log('  Tag + Classes:', header.tagName + '.' + header.className);
    console.log('  Display:', computedStyle.display);
    console.log('  Visibility:', computedStyle.visibility);
    console.log('  Height:', computedStyle.height);
    console.log('  Background:', computedStyle.background ? computedStyle.background.substring(0, 150) : 'none');
    console.log('  Background-image:', computedStyle.backgroundImage);
    console.log('  Z-index:', computedStyle.zIndex);
    console.log('  Position:', computedStyle.position);

    // Check if it has children that might be the problem
    var children = header.children;
    if (children.length > 0) {
        console.log('  Children:', children.length);
        for (var i = 0; i < Math.min(children.length, 3); i++) {
            console.log('    - Child ' + (i+1) + ':', children[i].tagName + '.' + children[i].className);
        }
    }
});

// Check for inline styles that might override
console.log('\n========================================');
console.log('3. CHECKING INLINE STYLES');
console.log('========================================');

var elementsWithInlineBackground = document.querySelectorAll('[style*="background"]');
console.log('Found', elementsWithInlineBackground.length, 'elements with inline background styles:');
elementsWithInlineBackground.forEach(function(el, index) {
    if (index < 10) { // Limit to first 10 to avoid too much output
        console.log('\n  Element:', el.tagName + '.' + el.className);
        console.log('  Style attribute:', el.getAttribute('style').substring(0, 200));
    }
});

console.log('\n========================================');
console.log('4. ATTEMPTING AGGRESSIVE FIX');
console.log('========================================');

// More aggressive fix attempt
console.log('Applying aggressive background removal...');

// Fix 1: Remove ALL backgrounds from article headers and their children
var headersFixed = 0;
document.querySelectorAll('.article-header, header.article-header, header[class*="article"], .article-header *, header.article-header *').forEach(function(el) {
    el.style.setProperty('background', 'none', 'important');
    el.style.setProperty('background-image', 'none', 'important');
    el.style.setProperty('background-color', 'transparent', 'important');

    // If it's the main header, hide it completely
    if (el.classList && (el.classList.contains('article-header') || el.tagName === 'HEADER')) {
        el.style.setProperty('display', 'none', 'important');
        headersFixed++;
    }
});
console.log('✓ Aggressively removed backgrounds from', headersFixed, 'header elements');

// Fix 2: Find and hide any element with the patterned background
var patternsFixed = 0;
allElements.forEach(function(el) {
    var computedStyle = window.getComputedStyle(el);
    // Check if this has a pattern/image background
    if (computedStyle.backgroundImage && computedStyle.backgroundImage.indexOf('url') !== -1) {
        // Check if it's in the header area (top part of page)
        if (el.offsetTop < 500) {
            el.style.setProperty('background-image', 'none', 'important');
            el.style.setProperty('background', 'none', 'important');
            patternsFixed++;
        }
    }
});
console.log('✓ Removed', patternsFixed, 'background patterns in header area');

// Fix 3: Target master-content-wrapper backgrounds
document.querySelectorAll('.master-content-wrapper, [class*="master-content"], .g960').forEach(function(el) {
    el.style.setProperty('background', 'none', 'important');
    el.style.setProperty('background-image', 'none', 'important');
    el.style.setProperty('background-color', 'transparent', 'important');
});
console.log('✓ Cleared master-content-wrapper backgrounds');

// Fix 4: Hide decorators
document.querySelectorAll('.decorator, [class*="decorator"], [class*="banner_image"], [class*="page_banner"]').forEach(function(el) {
    el.style.setProperty('display', 'none', 'important');
});
console.log('✓ Hidden decorator elements');

console.log('\n========================================');
console.log('5. RE-CHECKING AFTER FIX');
console.log('========================================');

// Re-check for visible backgrounds
var stillVisible = 0;
allElements.forEach(function(el) {
    var computedStyle = window.getComputedStyle(el);
    if (computedStyle.backgroundImage &&
        computedStyle.backgroundImage !== 'none' &&
        computedStyle.display !== 'none' &&
        parseFloat(computedStyle.height) > 0 &&
        el.offsetTop < 500) {
        stillVisible++;
        if (stillVisible <= 3) {
            console.log('⚠️ Still visible:', el.tagName + '.' + el.className);
        }
    }
});

if (stillVisible === 0) {
    console.log('✅ SUCCESS: All background patterns appear to be removed!');
} else {
    console.log('⚠️ WARNING: Still found', stillVisible, 'elements with backgrounds in header area');
}

console.log('\n========================================');
console.log('DIAGNOSTIC COMPLETE');
console.log('========================================');