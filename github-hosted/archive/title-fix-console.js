// JRCC Title Fix - Direct Console Script
// Copy and paste this entire script into the browser console

console.log('========================================');
console.log('APPLYING TITLE FIX FOR HEALTHY AT HOME');
console.log('========================================');

// Find or create the title
var pageTitle = document.querySelector('h1');
var titleFound = false;

// Look for existing title with "Healthy" text
if (pageTitle && pageTitle.textContent.toLowerCase().indexOf('healthy') !== -1) {
    console.log('✅ Found existing title:', pageTitle.textContent);
    titleFound = true;
} else {
    // Search all h1s
    var allH1s = document.querySelectorAll('h1');
    for (var i = 0; i < allH1s.length; i++) {
        if (allH1s[i].textContent.toLowerCase().indexOf('healthy') !== -1 ||
            allH1s[i].textContent.toLowerCase().indexOf('registration') !== -1) {
            pageTitle = allH1s[i];
            titleFound = true;
            console.log('✅ Found title:', pageTitle.textContent);
            break;
        }
    }
}

// If no title found, create one
if (!titleFound || !pageTitle) {
    console.log('⚠️ No title found - creating new one');
    pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Healthy At Home Registration';

    // Find the form
    var form = document.querySelector('form');
    if (form && form.parentElement) {
        form.parentElement.insertBefore(pageTitle, form);
        console.log('✅ Created new title before form');
    } else {
        document.body.insertBefore(pageTitle, document.body.firstChild);
        console.log('✅ Created new title at top of body');
    }
}

// Force the title to be visible
console.log('\nApplying visibility fixes...');

// Make all parents visible
var current = pageTitle;
while (current && current !== document.body) {
    current.style.display = 'block';
    current.style.visibility = 'visible';
    current.style.opacity = '1';
    current.style.height = 'auto';
    current.style.overflow = 'visible';

    // Remove background from headers
    if (current.tagName === 'HEADER' ||
        (current.className && current.className.toString().indexOf('header') !== -1)) {
        current.style.background = 'transparent';
        current.style.backgroundImage = 'none';
    }

    current = current.parentElement;
}

// Style the title
pageTitle.style.cssText =
    'display: block !important;' +
    'visibility: visible !important;' +
    'opacity: 1 !important;' +
    'font-size: 3.75rem !important;' +
    'font-weight: 800 !important;' +
    'color: #000000 !important;' +
    'text-align: center !important;' +
    'margin: 0 auto 2rem auto !important;' +
    'padding: 2rem !important;' +
    'max-width: 1100px !important;' +
    'width: 90% !important;' +
    'position: relative !important;' +
    'z-index: 9999 !important;' +
    'background: transparent !important;' +
    'font-family: Urbanist, sans-serif !important;' +
    'text-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;';

console.log('✅ Title styled successfully');

// Hide any duplicate titles
var allHeadings = document.querySelectorAll('h1, h2');
var duplicatesHidden = 0;
for (var i = 0; i < allHeadings.length; i++) {
    if (allHeadings[i] !== pageTitle) {
        var text = allHeadings[i].textContent.toLowerCase();
        if (text.indexOf('healthy') !== -1 || text.indexOf('registration') !== -1) {
            allHeadings[i].style.display = 'none';
            duplicatesHidden++;
        }
    }
}
if (duplicatesHidden > 0) {
    console.log('✅ Hidden', duplicatesHidden, 'duplicate titles');
}

// Also fix dropdowns while we're at it
var selects = document.querySelectorAll('select');
for (var i = 0; i < selects.length; i++) {
    selects[i].style.padding = '0';
    selects[i].style.paddingTop = '0';
    selects[i].style.paddingBottom = '0';
    selects[i].style.paddingLeft = '0';
    selects[i].style.paddingRight = '0';
}
if (selects.length > 0) {
    console.log('✅ Fixed', selects.length, 'dropdown(s)');
}

console.log('\n========================================');
console.log('FIX COMPLETE!');
console.log('The title should now be visible.');
console.log('========================================');