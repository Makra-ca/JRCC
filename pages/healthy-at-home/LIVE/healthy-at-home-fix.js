/**
 * Healthy @ Home - Title Clipping Fix
 * This script fixes the title being cut off on larger screens in Chabad One CMS
 */

(function() {
    'use strict';

    function applyFixes() {
        console.log('Healthy @ Home: Applying overflow fixes...');

        // Find the custom title (it's the second h1 on the page)
        const allH1s = document.querySelectorAll('h1');
        const customTitle = allH1s[1]; // Second h1 is our custom styled one
        if (!customTitle) {
            console.warn('Healthy @ Home: Custom title not found');
            return;
        }

        // CRITICAL FIX: Target the specific problematic container
        const problemContainer = document.querySelector('div#co_content_container.content.g960.no_margin.no_overflow');
        if (problemContainer) {
            problemContainer.style.setProperty('overflow', 'visible', 'important');
            problemContainer.style.setProperty('padding-top', '10px', 'important');
            console.log('Healthy @ Home: Fixed problematic container #co_content_container');
        }

        // Apply overflow fixes to all parent elements
        let element = customTitle;
        let level = 0;
        const maxLevels = 15;

        while (element && level < maxLevels) {
            element = element.parentElement;
            if (element) {
                // Force overflow visible on all parents
                element.style.setProperty('overflow', 'visible', 'important');
                element.style.setProperty('overflow-x', 'visible', 'important');
                element.style.setProperty('overflow-y', 'visible', 'important');
                element.style.setProperty('clip', 'auto', 'important');
                element.style.setProperty('clip-path', 'none', 'important');
                element.style.setProperty('height', 'auto', 'important');
                element.style.setProperty('max-height', 'none', 'important');

                console.log(`Fixed level ${level}: ${element.tagName}.${element.className || '(no class)'}`);
            }
            level++;
        }

        // Restore body scrolling
        document.documentElement.style.setProperty('overflow-x', 'hidden', 'important');
        document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
        document.body.style.setProperty('overflow-x', 'hidden', 'important');
        document.body.style.setProperty('overflow-y', 'auto', 'important');

        // Ensure the custom title itself is visible
        customTitle.style.setProperty('display', 'block', 'important');
        customTitle.style.setProperty('visibility', 'visible', 'important');
        customTitle.style.setProperty('overflow', 'visible', 'important');

        // Add extra padding to the content wrapper if needed
        const healthyContent = document.querySelector('.healthy-content');
        if (healthyContent) {
            const currentPadding = window.getComputedStyle(healthyContent).paddingTop;
            if (parseInt(currentPadding) < 48) { // Less than 3rem (48px)
                healthyContent.style.setProperty('padding-top', '3rem', 'important');
            }
        }

        console.log('Healthy @ Home: Overflow fixes applied successfully');
    }

    // Run fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyFixes);
    } else {
        applyFixes();
    }

    // Also run on window load as a backup
    window.addEventListener('load', function() {
        // Wait a brief moment for CMS to finish rendering
        setTimeout(applyFixes, 100);
    });

})();
