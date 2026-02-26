/**
 * Chabad Allen-McKinney Form Overlay
 * Creates a beautiful styled form that syncs with the hidden original CMS form
 *
 * How it works:
 * 1. Hides the original CMS form (but keeps it in DOM)
 * 2. Creates a styled form overlay
 * 3. Syncs input values to the hidden form in real-time
 * 4. Submit triggers the original form submission
 */

(function() {
    'use strict';

    const CONFIG = {
        formId: '6781190',
        debug: true
    };

    function log(...args) {
        if (CONFIG.debug) console.log('[ChabadAM]', ...args);
    }

    // =========================================
    // STYLED FORM HTML
    // =========================================
    function getStyledFormHTML() {
        return `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    #styled-form-overlay {
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

        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        max-width: 750px;
        margin: 0 auto;
    }

    #styled-form-overlay * {
        box-sizing: border-box;
    }

    .sfo-card {
        background: var(--white);
        border-radius: 24px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .sfo-header {
        background: var(--black);
        padding: 24px 32px;
        text-align: center;
    }

    .sfo-title {
        font-family: 'Urbanist', sans-serif;
        font-size: 28px;
        font-weight: 800;
        color: var(--gold);
        margin: 0;
    }

    .sfo-banner {
        width: 100%;
        max-height: 350px;
        object-fit: cover;
        display: block;
    }

    .sfo-section {
        padding: 24px 32px;
        border-bottom: 1px solid var(--gray-100);
    }

    .sfo-section:last-child {
        border-bottom: none;
    }

    .sfo-section-title {
        font-family: 'Urbanist', sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: var(--black);
        margin: 0 0 16px 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .sfo-section-title::before {
        content: '';
        width: 4px;
        height: 20px;
        background: var(--gold);
        border-radius: 2px;
    }

    .sfo-row {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
    }

    .sfo-row:last-child {
        margin-bottom: 0;
    }

    .sfo-field {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .sfo-field.full {
        flex-basis: 100%;
    }

    .sfo-label {
        font-size: 14px;
        font-weight: 600;
        color: var(--gray-700);
    }

    .sfo-required {
        color: var(--dark-red);
    }

    .sfo-input, .sfo-select {
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        padding: 14px 16px;
        border: 2px solid var(--gray-200);
        border-radius: 10px;
        background: var(--white);
        color: var(--gray-900);
        transition: all 0.2s ease;
        width: 100%;
    }

    .sfo-input:focus, .sfo-select:focus {
        outline: none;
        border-color: var(--gold);
        box-shadow: 0 0 0 3px var(--gold-glow);
    }

    .sfo-input::placeholder {
        color: var(--gray-300);
    }

    .sfo-sublabel {
        font-size: 12px;
        color: var(--gray-500);
    }

    /* Checkbox */
    .sfo-checkbox-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: var(--gray-50);
        border-radius: 12px;
        cursor: pointer;
    }

    .sfo-checkbox-row:hover {
        background: var(--gray-100);
    }

    .sfo-checkbox {
        width: 20px;
        height: 20px;
        accent-color: var(--gold);
        cursor: pointer;
    }

    .sfo-checkbox-label {
        font-size: 14px;
        color: var(--gray-700);
        cursor: pointer;
    }

    /* Donation Cards */
    .sfo-donations {
        background: var(--gray-50);
    }

    .sfo-donation-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
    }

    .sfo-donation-option {
        position: relative;
    }

    .sfo-donation-option input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .sfo-donation-option label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 12px;
        background: var(--white);
        border: 2px solid var(--gray-200);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        min-height: 80px;
    }

    .sfo-donation-option label:hover {
        border-color: var(--gold);
    }

    .sfo-donation-option input:checked + label {
        border-color: var(--gold);
        background: var(--gold-light);
        box-shadow: 0 0 0 3px var(--gold-glow);
    }

    .sfo-donation-amount {
        font-family: 'Urbanist', sans-serif;
        font-size: 24px;
        font-weight: 700;
        color: var(--black);
    }

    .sfo-donation-option input:checked + label .sfo-donation-amount {
        color: var(--gold);
    }

    .sfo-other-input {
        width: 70px;
        padding: 8px;
        text-align: center;
        font-size: 14px;
        margin-top: 8px;
    }

    /* Payment Section */
    .sfo-cc-icons {
        display: flex;
        gap: 8px;
        padding: 12px 16px;
        background: var(--gray-50);
        border-radius: 8px;
        margin-bottom: 16px;
        align-items: center;
    }

    .sfo-cc-icon {
        width: 45px;
        height: 28px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
        color: white;
    }

    .sfo-cc-visa { background: linear-gradient(135deg, #1a1f71, #2a2f81); }
    .sfo-cc-mc { background: linear-gradient(135deg, #eb001b, #f79e1b); }
    .sfo-cc-amex { background: linear-gradient(135deg, #006fcf, #0080d6); }
    .sfo-cc-disc { background: linear-gradient(135deg, #ff6600, #ff8800); }

    .sfo-cc-text {
        font-size: 12px;
        color: var(--gray-500);
        margin-left: auto;
    }

    .sfo-subsection-title {
        font-family: 'Urbanist', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: var(--black);
        margin: 20px 0 12px 0;
        padding-top: 16px;
        border-top: 1px solid var(--gray-100);
    }

    /* Submit */
    .sfo-submit-section {
        padding: 32px;
        background: linear-gradient(to bottom, var(--white), var(--gray-50));
        text-align: center;
    }

    .sfo-submit-btn {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        padding: 18px 60px;
        background: var(--gold);
        color: var(--black);
        border: none;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px var(--gold-glow);
    }

    .sfo-submit-btn:hover {
        background: var(--black);
        color: var(--gold);
        transform: scale(1.02);
    }

    .sfo-security {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 16px;
        font-size: 13px;
        color: var(--gray-500);
    }

    .sfo-security svg {
        width: 16px;
        height: 16px;
    }

    /* Responsive */
    @media (max-width: 600px) {
        .sfo-section { padding: 20px; }
        .sfo-row { flex-direction: column; gap: 12px; }
        .sfo-donation-grid { grid-template-columns: repeat(2, 1fr); }
        .sfo-submit-btn { width: 100%; padding: 16px 24px; }
    }
</style>

<div class="sfo-card">
    <!-- Header -->
    <div class="sfo-header">
        <h1 class="sfo-title">Women's Challah Bake</h1>
    </div>

    <!-- Banner Image -->
    <img class="sfo-banner" src="https://w2.chabad.org/media/images/1309/FXjr13099008.jpg" alt="Women's Challah Bake">

    <!-- Your Information -->
    <div class="sfo-section">
        <h2 class="sfo-section-title">Your Information</h2>

        <div class="sfo-row">
            <div class="sfo-field">
                <label class="sfo-label">First Name <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-first-name" data-sync="first_3" placeholder="First Name">
            </div>
            <div class="sfo-field">
                <label class="sfo-label">Last Name <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-last-name" data-sync="last_3" placeholder="Last Name">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field full">
                <label class="sfo-label">Email <span class="sfo-required">*</span></label>
                <input type="email" class="sfo-input" id="sfo-email" data-sync="input_4" placeholder="ex: myname@example.com">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field full">
                <label class="sfo-label">Phone Number <span class="sfo-required">*</span></label>
                <input type="tel" class="sfo-input" id="sfo-phone" data-sync="input_6_full" placeholder="(555) 555-5555">
            </div>
        </div>
    </div>

    <!-- Address -->
    <div class="sfo-section">
        <h2 class="sfo-section-title">Address</h2>

        <div class="sfo-row">
            <div class="sfo-field full">
                <label class="sfo-label">Street Address <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-addr1" data-sync="input_9_addr_line1" placeholder="Street Address">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field full">
                <label class="sfo-label">Street Address Line 2</label>
                <input type="text" class="sfo-input" id="sfo-addr2" data-sync="input_9_addr_line2" placeholder="Apartment, suite, unit, etc.">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field">
                <label class="sfo-label">City <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-city" data-sync="input_9_city" placeholder="City">
            </div>
            <div class="sfo-field">
                <label class="sfo-label">State / Province <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-state" data-sync="input_9_state" placeholder="State">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field">
                <label class="sfo-label">Postal / Zip Code <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-postal" data-sync="input_9_postal" placeholder="Zip Code">
            </div>
            <div class="sfo-field">
                <label class="sfo-label">Country <span class="sfo-required">*</span></label>
                <select class="sfo-select" id="sfo-country" data-sync="input_9_country">
                    <option value="">Please Select</option>
                    <option value="United States" selected>United States</option>
                    <option value="Canada">Canada</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Newsletter -->
    <div class="sfo-section" style="padding: 16px 32px;">
        <label class="sfo-checkbox-row">
            <input type="checkbox" class="sfo-checkbox" id="sfo-optin" data-sync="input_5" checked>
            <span class="sfo-checkbox-label">I would like to receive news and updates by email</span>
        </label>
    </div>

    <!-- Optional Donations -->
    <div class="sfo-section sfo-donations">
        <h2 class="sfo-section-title">Optional Donation</h2>

        <div class="sfo-donation-grid">
            <div class="sfo-donation-option">
                <input type="radio" name="sfo-donation" id="sfo-donation-50" value="50" data-sync-radio="q11_input11">
                <label for="sfo-donation-50">
                    <span class="sfo-donation-amount">$50</span>
                </label>
            </div>
            <div class="sfo-donation-option">
                <input type="radio" name="sfo-donation" id="sfo-donation-75" value="75" data-sync-radio="q11_input11">
                <label for="sfo-donation-75">
                    <span class="sfo-donation-amount">$75</span>
                </label>
            </div>
            <div class="sfo-donation-option">
                <input type="radio" name="sfo-donation" id="sfo-donation-100" value="100" data-sync-radio="q11_input11">
                <label for="sfo-donation-100">
                    <span class="sfo-donation-amount">$100</span>
                </label>
            </div>
            <div class="sfo-donation-option">
                <input type="radio" name="sfo-donation" id="sfo-donation-other" value="other" data-sync-radio="q11_input11">
                <label for="sfo-donation-other">
                    <span class="sfo-donation-amount">Other</span>
                    <input type="number" class="sfo-input sfo-other-input" id="sfo-donation-other-amount" placeholder="$" min="1">
                </label>
            </div>
        </div>
    </div>

    <!-- Payment -->
    <div class="sfo-section">
        <h2 class="sfo-section-title">Payment</h2>

        <div class="sfo-cc-icons">
            <div class="sfo-cc-icon sfo-cc-visa">VISA</div>
            <div class="sfo-cc-icon sfo-cc-mc">MC</div>
            <div class="sfo-cc-icon sfo-cc-amex">AMEX</div>
            <div class="sfo-cc-icon sfo-cc-disc">DISC</div>
            <span class="sfo-cc-text">We accept Visa, MasterCard, American Express, Discover</span>
        </div>

        <div class="sfo-row">
            <div class="sfo-field">
                <label class="sfo-label">Credit Card Number <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-cc-number" data-sync="input_10_cc_number" placeholder="**** **** **** ****">
            </div>
            <div class="sfo-field" style="max-width: 140px;">
                <label class="sfo-label">Security Code <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-cc-cvv" data-sync="input_10_cc_ccv" placeholder="CVV">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field full">
                <label class="sfo-label">Name on Card <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-cc-name" data-sync="input_10_cc_nameOnCard" placeholder="Name as it appears on card">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field">
                <label class="sfo-label">Expiration Month <span class="sfo-required">*</span></label>
                <select class="sfo-select" id="sfo-cc-month" data-sync="input_10_cc_exp_month">
                    <option value="">Month</option>
                    <option value="1">1 - January</option>
                    <option value="2">2 - February</option>
                    <option value="3">3 - March</option>
                    <option value="4">4 - April</option>
                    <option value="5">5 - May</option>
                    <option value="6">6 - June</option>
                    <option value="7">7 - July</option>
                    <option value="8">8 - August</option>
                    <option value="9">9 - September</option>
                    <option value="10">10 - October</option>
                    <option value="11">11 - November</option>
                    <option value="12">12 - December</option>
                </select>
            </div>
            <div class="sfo-field">
                <label class="sfo-label">Expiration Year <span class="sfo-required">*</span></label>
                <select class="sfo-select" id="sfo-cc-year" data-sync="input_10_cc_exp_year">
                    <option value="">Year</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                </select>
            </div>
        </div>

        <!-- Billing Address -->
        <h3 class="sfo-subsection-title">Billing Address</h3>

        <div class="sfo-row">
            <div class="sfo-field full">
                <label class="sfo-label">Street Address <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-bill-addr" data-sync="input_10_addr_line1" placeholder="Street Address">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field">
                <label class="sfo-label">City <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-bill-city" data-sync="input_10_city" placeholder="City">
            </div>
            <div class="sfo-field">
                <label class="sfo-label">State / Province <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-bill-state" data-sync="input_10_state" placeholder="State">
            </div>
        </div>

        <div class="sfo-row">
            <div class="sfo-field">
                <label class="sfo-label">Postal / Zip Code <span class="sfo-required">*</span></label>
                <input type="text" class="sfo-input" id="sfo-bill-postal" data-sync="input_10_postal" placeholder="Zip Code">
            </div>
            <div class="sfo-field">
                <label class="sfo-label">Country <span class="sfo-required">*</span></label>
                <select class="sfo-select" id="sfo-bill-country" data-sync="input_10_country">
                    <option value="">Please Select</option>
                    <option value="United States" selected>United States</option>
                    <option value="Canada">Canada</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Submit -->
    <div class="sfo-submit-section">
        <button type="button" class="sfo-submit-btn" id="sfo-submit-btn">Submit</button>
        <div class="sfo-security">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            This page uses TLS encryption to keep your data secure
        </div>
    </div>
</div>
        `;
    }

    // =========================================
    // SYNC VALUES TO ORIGINAL FORM
    // =========================================
    function setupSync() {
        // Text inputs and selects with data-sync attribute
        document.querySelectorAll('#styled-form-overlay [data-sync]').forEach(input => {
            const targetId = input.getAttribute('data-sync');
            const targetEl = document.getElementById(targetId);

            if (!targetEl) {
                log('Target not found:', targetId);
                return;
            }

            input.addEventListener('input', () => {
                if (input.type === 'checkbox') {
                    targetEl.checked = input.checked;
                } else {
                    targetEl.value = input.value;
                }
                log('Synced', targetId, '=', input.value);
            });

            input.addEventListener('change', () => {
                if (input.type === 'checkbox') {
                    targetEl.checked = input.checked;
                } else {
                    targetEl.value = input.value;
                }
            });
        });

        // Radio buttons for donations
        document.querySelectorAll('#styled-form-overlay [data-sync-radio]').forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    const value = radio.value;
                    if (value === 'other') {
                        // Click the "other" radio in original form
                        const otherRadio = document.getElementById('other_11');
                        if (otherRadio) otherRadio.click();
                    } else {
                        // Find matching radio in original form
                        const originalRadios = document.querySelectorAll('input[name="q11_input11"]');
                        originalRadios.forEach(r => {
                            if (r.value === value) r.checked = true;
                        });
                    }
                    log('Synced donation:', value);
                }
            });
        });

        // Other amount input
        const otherInput = document.getElementById('sfo-donation-other-amount');
        if (otherInput) {
            otherInput.addEventListener('input', () => {
                const originalOtherInput = document.getElementById('input_11');
                if (originalOtherInput) {
                    originalOtherInput.value = otherInput.value;
                    originalOtherInput.disabled = false;
                }
            });

            otherInput.addEventListener('focus', () => {
                document.getElementById('sfo-donation-other').checked = true;
                const otherRadio = document.getElementById('other_11');
                if (otherRadio) otherRadio.click();
            });
        }

        log('Sync setup complete');
    }

    // =========================================
    // SUBMIT HANDLER
    // =========================================
    function setupSubmit() {
        const submitBtn = document.getElementById('sfo-submit-btn');
        const originalForm = document.getElementById(CONFIG.formId);

        if (!submitBtn || !originalForm) {
            log('Submit button or original form not found');
            return;
        }

        submitBtn.addEventListener('click', () => {
            log('Submit clicked - syncing all values and submitting...');

            // Final sync of all values
            document.querySelectorAll('#styled-form-overlay [data-sync]').forEach(input => {
                const targetId = input.getAttribute('data-sync');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    if (input.type === 'checkbox') {
                        targetEl.checked = input.checked;
                    } else {
                        targetEl.value = input.value;
                    }
                }
            });

            // Trigger original form submit button
            const originalSubmit = document.getElementById('input_2');
            if (originalSubmit) {
                log('Clicking original submit button');
                originalSubmit.click();
            } else {
                log('Original submit not found, trying form.submit()');
                originalForm.submit();
            }
        });

        log('Submit handler setup complete');
    }

    // =========================================
    // INITIALIZE
    // =========================================
    function init() {
        const container = document.querySelector('#formContainer');
        const formElement = document.getElementById(CONFIG.formId);

        if (!container || !formElement) {
            log('Form not found');
            return;
        }

        log('Initializing form overlay...');

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'styled-form-overlay';
        overlay.innerHTML = getStyledFormHTML();

        // Hide original form, insert overlay
        formElement.style.display = 'none';
        container.insertBefore(overlay, formElement);

        // Setup sync and submit
        setupSync();
        setupSubmit();

        log('Form overlay initialized successfully!');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
