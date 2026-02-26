/**
 * LOADER SCRIPT - Paste this in browser console to test
 * Loads the form overlay from Vercel
 */

(function() {
    const script = document.createElement('script');
    script.src = 'https://chabad-one-styling.vercel.app/chabadam/chabadam-form-production.js';
    script.onload = () => console.log('[ChabadAM] Script loaded from Vercel');
    script.onerror = () => console.error('[ChabadAM] Failed to load script');
    document.head.appendChild(script);
})();
