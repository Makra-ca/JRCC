/**
 * Chabad Allen-McKinney Form Restyling Script
 * Target: Women's Challah Bake registration form (aid/6781190)
 *
 * This script injects modern styling into the Chabad One CMS form.
 * For testing: paste this script into the browser console on the target page.
 * For production: add to the site's custom header/footer code.
 */

(function() {
    'use strict';

    // Configuration - adjust these if targeting a different form
    const CONFIG = {
        // Form ID to target (from the URL aid parameter)
        formId: '6781190',
        // Check URL contains this path (for page detection)
        urlMatch: 'Womens-Challah-Bake',
        // CSS file URL - for local testing use relative path, for production host the CSS
        // Local test: 'chabadam-form-styles.css'
        // Production: 'https://yourcdn.com/chabadam-form-styles.css'
        cssUrl: null, // null = use inline CSS embedded in this file
        // Debug mode - set to true to see console logs
        debug: true
    };

    function log(...args) {
        if (CONFIG.debug) {
            console.log('[ChabadAM Form]', ...args);
        }
    }

    /**
     * Check if we're on the target page
     */
    function isTargetPage() {
        const url = window.location.href;
        const hasFormId = url.includes(CONFIG.formId) ||
                          document.querySelector(`form[id="${CONFIG.formId}"]`);
        const hasUrlMatch = CONFIG.urlMatch ? url.includes(CONFIG.urlMatch) : true;

        return hasFormId || hasUrlMatch;
    }

    /**
     * Inject the CSS styles
     */
    function injectStyles() {
        // Check if already injected
        if (document.getElementById('chabadam-form-styles')) {
            log('Styles already injected');
            return;
        }

        if (CONFIG.cssUrl) {
            // Load external CSS file
            const link = document.createElement('link');
            link.id = 'chabadam-form-styles';
            link.rel = 'stylesheet';
            link.href = CONFIG.cssUrl;
            document.head.appendChild(link);
            log('External CSS loaded:', CONFIG.cssUrl);
        } else {
            // Inject inline CSS
            const style = document.createElement('style');
            style.id = 'chabadam-form-styles';
            style.textContent = getInlineStyles();
            document.head.appendChild(style);
            log('Inline CSS injected');
        }
    }

    /**
     * Apply the styling class to the body
     */
    function applyStylesToForm() {
        const formContainer = document.getElementById('formContainer');
        if (!formContainer) {
            log('Form container not found');
            return false;
        }

        // Add the styling class to body (for CSS scoping)
        document.body.classList.add('chabadam-styled');
        log('Styling class applied to body');

        // Fix radio button structure for donation options
        fixDonationRadios();

        return true;
    }

    /**
     * Fix the donation radio buttons for proper card styling
     * The CMS outputs radio + label as siblings, we need to adjust for CSS
     */
    function fixDonationRadios() {
        const donationSection = document.getElementById('id_11');
        if (!donationSection) return;

        const radioItems = donationSection.querySelectorAll('.form-radio-item');
        radioItems.forEach(item => {
            const radio = item.querySelector('input[type="radio"]');
            const label = item.querySelector('label');

            if (radio && label) {
                // Ensure the label comes right after the radio for CSS :checked + label
                if (radio.nextElementSibling !== label) {
                    item.insertBefore(radio, label);
                }
            }
        });
        log('Donation radio buttons fixed');
    }

    /**
     * Inline CSS styles (copy of chabadam-form-styles.css)
     * This is used when no external CSS URL is configured
     */
    function getInlineStyles() {
        return `
/* ===========================================
   Chabad Allen-McKinney Form Restyling
   =========================================== */

/* CSS Variables */
.chabadam-styled {
    --gold: #C9A227;
    --gold-light: rgba(201, 162, 39, 0.1);
    --gold-glow: rgba(201, 162, 39, 0.15);
    --black: #1a1a1a;
    --white: #ffffff;
    --gray-50: #fafafa;
    --gray-100: #f5f5f5;
    --gray-200: #e5e5e5;
    --gray-300: #d4d4d4;
    --gray-500: #737373;
    --gray-700: #404040;
    --gray-900: #171717;
    --dark-red: #8B0000;
}

/* Load fonts */
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

/* ===========================================
   MAIN CONTAINER
   Don't change the page layout - just style the form
   =========================================== */
.chabadam-styled #formContainer {
    /* Don't change width/margin - let CMS handle layout */
    padding: 0 !important;
}

.chabadam-styled .form-all {
    background: var(--white) !important;
    border-radius: 24px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
    padding: 0 !important;
    overflow: hidden;
}

.chabadam-styled .form-section {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

/* ===========================================
   HEADER / TITLE
   =========================================== */
.chabadam-styled .form-header-group {
    padding: 24px 32px !important;
    background: var(--black) !important;
    margin: 0 !important;
}

.chabadam-styled .form-header {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 28px !important;
    font-weight: 800 !important;
    color: var(--gold) !important;
    margin: 0 !important;
    text-align: center !important;
}

/* ===========================================
   BANNER IMAGE
   =========================================== */
.chabadam-styled #id_8 {
    padding: 0 !important;
    margin: 0 !important;
}

.chabadam-styled #id_8 .form-image {
    width: 100% !important;
    height: auto !important;
    max-height: 400px !important;
    object-fit: cover !important;
    display: block !important;
}

/* ===========================================
   FORM ROWS (general)
   CMS uses grid on some form-lines, preserve that
   =========================================== */
.chabadam-styled .form-line {
    padding: 20px 32px !important;
    margin: 0 !important;
    border-bottom: 1px solid var(--gray-100) !important;
    /* Don't override display - CMS uses grid on some rows */
}

.chabadam-styled .form-line:last-of-type {
    border-bottom: none !important;
}

/* Reset grid layout for form rows to stack label/input */
.chabadam-styled .form-line:not(#id_10) {
    display: block !important;
}

/* ===========================================
   LABELS
   =========================================== */
.chabadam-styled .form-label-left {
    width: 100% !important;
    float: none !important;
    margin-bottom: 8px !important;
    padding: 0 !important;
}

.chabadam-styled .form-label-left label {
    font-family: 'Inter', sans-serif !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    color: var(--gray-700) !important;
    display: inline !important;
}

.chabadam-styled .form-required {
    color: var(--dark-red) !important;
    margin-left: 2px !important;
}

.chabadam-styled .label-message {
    display: none !important;
}

/* ===========================================
   INPUT CONTAINERS
   =========================================== */
.chabadam-styled .form-input {
    width: 100% !important;
    float: none !important;
    padding: 0 !important;
}

.chabadam-styled .form-input-wide {
    padding: 0 !important;
}

/* ===========================================
   TEXT INPUTS
   =========================================== */
.chabadam-styled .form-textbox,
.chabadam-styled .form-dropdown {
    font-family: 'Inter', sans-serif !important;
    font-size: 15px !important;
    padding: 14px 16px !important;
    border: 2px solid var(--gray-200) !important;
    border-radius: 10px !important;
    background: var(--white) !important;
    color: var(--gray-900) !important;
    transition: all 0.2s ease !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

.chabadam-styled .form-textbox:focus,
.chabadam-styled .form-dropdown:focus {
    outline: none !important;
    border-color: var(--gold) !important;
    box-shadow: 0 0 0 3px var(--gold-glow) !important;
}

.chabadam-styled .form-textbox::placeholder {
    color: var(--gray-300) !important;
}

/* ===========================================
   SUB-LABELS (under inputs)
   =========================================== */
.chabadam-styled .form-sub-label {
    font-family: 'Inter', sans-serif !important;
    font-size: 12px !important;
    color: var(--gray-500) !important;
    margin-top: 4px !important;
    display: block !important;
}

.chabadam-styled .form-sub-label-container {
    display: block !important;
    margin-bottom: 12px !important;
}

/* ===========================================
   FULL NAME - side by side
   =========================================== */
.chabadam-styled #id_3 .form-input {
    display: flex !important;
    gap: 16px !important;
}

.chabadam-styled #id_3 .form-sub-label-container {
    flex: 1 !important;
}

.chabadam-styled #id_3 .form-textbox {
    width: 100% !important;
}

/* ===========================================
   ADDRESS TABLE
   =========================================== */
.chabadam-styled .form-address-table {
    width: 100% !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
}

.chabadam-styled .form-address-table td {
    padding: 0 8px 12px 0 !important;
    vertical-align: top !important;
}

.chabadam-styled .form-address-table td:last-child {
    padding-right: 0 !important;
}

.chabadam-styled .form-address-table tr td[colspan="2"] {
    padding-right: 0 !important;
}

.chabadam-styled .form-address-table .form-textbox,
.chabadam-styled .form-address-table .form-dropdown {
    width: 100% !important;
}

/* ===========================================
   NEWSLETTER CHECKBOX
   =========================================== */
.chabadam-styled #id_5 {
    background: var(--gray-50) !important;
    border-radius: 12px !important;
    padding: 16px 32px !important;
    margin: 0 !important;
}

.chabadam-styled #id_5 .form-label-left {
    display: none !important;
}

.chabadam-styled .form-checkbox-item {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    cursor: pointer !important;
}

.chabadam-styled .form-checkbox {
    width: 20px !important;
    height: 20px !important;
    accent-color: var(--gold) !important;
    cursor: pointer !important;
}

.chabadam-styled .form-checkbox-item label {
    font-family: 'Inter', sans-serif !important;
    font-size: 14px !important;
    color: var(--gray-700) !important;
    cursor: pointer !important;
}

/* ===========================================
   OPTIONAL DONATIONS - Radio buttons as cards
   =========================================== */
.chabadam-styled #id_11 {
    padding: 24px 32px !important;
    background: var(--gray-50) !important;
}

.chabadam-styled #id_11 .form-label-left label {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    color: var(--black) !important;
}

.chabadam-styled #id_11 .form-multiple-column {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 12px !important;
    margin-top: 8px !important;
}

.chabadam-styled #id_11 .form-radio-item {
    display: block !important;
    margin: 0 !important;
    position: relative !important;
}

.chabadam-styled #id_11 .form-radio-item .clearfix {
    display: none !important;
}

.chabadam-styled #id_11 .form-radio-item label {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 20px 16px !important;
    background: var(--white) !important;
    border: 2px solid var(--gray-200) !important;
    border-radius: 12px !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    min-height: 70px !important;
}

.chabadam-styled #id_11 .form-radio-item label:hover {
    border-color: var(--gold) !important;
}

.chabadam-styled #id_11 .form-radio-item label span {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    color: var(--black) !important;
}

.chabadam-styled #id_11 .form-radio:checked + label {
    border-color: var(--gold) !important;
    background: var(--gold-light) !important;
    box-shadow: 0 0 0 3px var(--gold-glow) !important;
}

.chabadam-styled #id_11 .form-radio:checked + label span {
    color: var(--gold) !important;
}

.chabadam-styled #id_11 .form-radio {
    position: absolute !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
}

/* Other amount input */
.chabadam-styled #id_11 .form-radio-other-input {
    width: 80px !important;
    padding: 8px !important;
    text-align: center !important;
    margin-top: 8px !important;
}

/* ===========================================
   PAYMENT SECTION
   =========================================== */
.chabadam-styled #id_10 {
    padding: 24px 32px !important;
}

.chabadam-styled #id_10 .form-label-left label {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    color: var(--black) !important;
}

/* Credit Card header */
.chabadam-styled #id_10 th {
    font-family: 'Urbanist', sans-serif !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    color: var(--black) !important;
    text-align: left !important;
    padding: 16px 0 8px 0 !important;
    border-bottom: 2px solid var(--gray-100) !important;
}

/* CC Icons */
.chabadam-styled .cc-icons {
    display: flex !important;
    gap: 8px !important;
    margin: 12px 0 !important;
    padding: 12px 16px !important;
    background: var(--gray-50) !important;
    border-radius: 8px !important;
}

.chabadam-styled .cc-icon {
    width: 48px !important;
    height: 30px !important;
    border-radius: 4px !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
}

/* Payment form table */
.chabadam-styled #id_10 .form-address-table {
    margin-top: 8px !important;
}

.chabadam-styled #id_10 .form-address-table td {
    padding: 0 12px 12px 0 !important;
}

.chabadam-styled #id_10 .form-address-table td:last-child {
    padding-right: 0 !important;
}

/* ===========================================
   SUBMIT BUTTON
   =========================================== */
.chabadam-styled #id_2 {
    padding: 32px !important;
    background: linear-gradient(to bottom, var(--white), var(--gray-50)) !important;
    text-align: center !important;
    border-bottom: none !important;
}

.chabadam-styled .form-buttons-wrapper {
    text-indent: 0 !important;
}

.chabadam-styled .form-submit-button {
    font-family: 'Inter', sans-serif !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    padding: 18px 48px !important;
    background: var(--gold) !important;
    color: var(--black) !important;
    border: none !important;
    border-radius: 14px !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 15px var(--gold-glow) !important;
}

.chabadam-styled .form-submit-button:hover {
    background: var(--black) !important;
    color: var(--gold) !important;
    transform: scale(1.02) !important;
}

/* ===========================================
   SECURITY NOTICE
   =========================================== */
.chabadam-styled + .center.small {
    text-align: center !important;
    padding: 16px !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 13px !important;
    color: var(--gray-500) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
}

/* ===========================================
   RESPONSIVE
   =========================================== */
@media (max-width: 768px) {
    .chabadam-styled .form-line {
        padding: 16px 20px !important;
    }

    .chabadam-styled .form-header-group {
        padding: 20px !important;
    }

    .chabadam-styled .form-header {
        font-size: 22px !important;
    }

    .chabadam-styled #id_3 .form-input {
        flex-direction: column !important;
    }

    .chabadam-styled #id_11 .form-multiple-column {
        grid-template-columns: repeat(2, 1fr) !important;
    }

    .chabadam-styled #id_11,
    .chabadam-styled #id_10,
    .chabadam-styled #id_5 {
        padding: 16px 20px !important;
    }

    .chabadam-styled #id_2 {
        padding: 24px 20px !important;
    }

    .chabadam-styled .form-submit-button {
        width: 100% !important;
        padding: 16px 24px !important;
    }
}
`;
    }

    /**
     * Initialize the restyling
     */
    function init() {
        log('Initializing...');

        // Check if we're on the target page
        if (!isTargetPage()) {
            log('Not on target page, skipping');
            return;
        }

        log('Target page detected');

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                injectStyles();
                applyStylesToForm();
            });
        } else {
            injectStyles();
            applyStylesToForm();
        }
    }

    // Run initialization
    init();

})();
