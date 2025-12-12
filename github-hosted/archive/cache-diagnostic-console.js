// JRCC CACHE DIAGNOSTIC SCRIPT
// Copy and paste this entire script into your browser console (F12 → Console tab)
// This will check which version of the sidebar code is loaded

console.log('========================================');
console.log('JRCC SIDEBAR CACHE DIAGNOSTIC');
console.log('========================================');
console.log('Current time:', new Date().toLocaleString());
console.log('User agent:', navigator.userAgent);
console.log('Window width:', window.innerWidth);
console.log('Window height:', window.innerHeight);
console.log('');

// Check if we're on mobile or desktop
var isMobile = window.innerWidth <= 768;
console.log('Device type:', isMobile ? 'MOBILE (≤768px)' : 'DESKTOP (>768px)');
console.log('');

// Check for existing sidebar elements
console.log('Checking for sidebar elements...');
console.log('');

// Look for mobile sidebar (bottom sheet version)
var bottomSheet = document.querySelector('.jrcc-mobile-sidebar');
if (bottomSheet) {
    console.log('✅ MOBILE BOTTOM SHEET FOUND');
    console.log('   - Has SIDEBAR label:', bottomSheet.textContent.indexOf('SIDEBAR') !== -1);
    console.log('   - Transform style:', bottomSheet.style.transform);
    console.log('   - Position:', bottomSheet.style.position);
    console.log('   - Background:', bottomSheet.style.background.substring(0, 50));
} else {
    console.log('❌ MOBILE BOTTOM SHEET NOT FOUND');
}
console.log('');

// Look for old floating hamburger button (should NOT exist)
var hamburgerButton = document.querySelector('[class*="hamburger"], [id*="hamburger"]');
var floatingButton = document.querySelector('button[style*="position: fixed"][style*="bottom"]');
if (hamburgerButton || floatingButton) {
    console.log('⚠️ OLD HAMBURGER BUTTON FOUND (This is the OLD cached version!)');
    if (hamburgerButton) console.log('   - Hamburger class element:', hamburgerButton.className);
    if (floatingButton) console.log('   - Floating button:', floatingButton);
} else {
    console.log('✅ No hamburger button found (good)');
}
console.log('');

// Look for desktop sidebar
var desktopSidebar = document.querySelector('.co_local_menu, .sidebar-local-navigation');
if (desktopSidebar) {
    console.log('Desktop sidebar element found');
    console.log('   - Class:', desktopSidebar.className);
    console.log('   - Display:', window.getComputedStyle(desktopSidebar).display);
    console.log('   - Position:', window.getComputedStyle(desktopSidebar).position);
}
console.log('');

// Check loaded scripts
console.log('Checking loaded scripts...');
var scripts = document.querySelectorAll('script[src*="jrcc-scripts"]');
if (scripts.length > 0) {
    for (var i = 0; i < scripts.length; i++) {
        console.log('Script ' + (i+1) + ':', scripts[i].src);
    }
} else {
    console.log('⚠️ No jrcc-scripts.js found in page');
}
console.log('');

// Try to fetch the script directly and check its content
console.log('Fetching current version from CDN...');
fetch('https://cdn.jsdelivr.net/gh/Makra-ca/JRCC@latest/github-hosted/jrcc-scripts.js')
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        console.log('CDN Response received');
        console.log('   - File size:', text.length, 'characters');

        // Check for key indicators of the correct version
        var hasReturnStatement = text.indexOf('return; // Exit - don\'t run mobile code') !== -1;
        var hasBottomSheet = text.indexOf('MOBILE SIDEBAR BOTTOM SHEET') !== -1;
        var hasSidebarLabel = text.indexOf('label.textContent = \'SIDEBAR\'') !== -1;
        var hasVisibleTab = text.indexOf('var visibleTab = \'80px\'') !== -1;

        console.log('');
        console.log('VERSION CHECKS:');
        console.log('   ✓ Has return statement after desktop code:', hasReturnStatement ? 'YES ✅' : 'NO ❌');
        console.log('   ✓ Has bottom sheet mobile code:', hasBottomSheet ? 'YES ✅' : 'NO ❌');
        console.log('   ✓ Has SIDEBAR label:', hasSidebarLabel ? 'YES ✅' : 'NO ❌');
        console.log('   ✓ Has 80px visible tab:', hasVisibleTab ? 'YES ✅' : 'NO ❌');

        console.log('');
        if (hasReturnStatement && hasBottomSheet && hasSidebarLabel && hasVisibleTab) {
            console.log('✅ CDN HAS THE CORRECT VERSION!');
            console.log('');
            console.log('If you\'re still seeing the old version, the issue is BROWSER CACHE.');
            console.log('Clear your browser cache and hard reload (Ctrl+Shift+R or Cmd+Shift+R)');
        } else {
            console.log('❌ CDN STILL HAS THE OLD VERSION');
            console.log('');
            console.log('Wait a few more minutes for CDN to update, then run this diagnostic again.');
        }
    })
    .catch(function(error) {
        console.log('❌ Error fetching from CDN:', error);
    });

console.log('');
console.log('========================================');
console.log('DIAGNOSTIC COMPLETE');
console.log('========================================');
