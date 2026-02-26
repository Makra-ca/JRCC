/**
 * Chabad Allen-McKinney Form Overlay - PRODUCTION
 * Paste this into the site's header/footer custom code section
 *
 * Target: chabadam.org - aid/6781190 (Women's Challah Bake)
 */

(function() {
    'use strict';

    // Only run on the target form page
    if (!window.location.href.includes('aid/6781190')) {
        return;
    }

    const CONFIG = {
        formId: '6781190',
        debug: true
    };

    function log(...args) {
        if (CONFIG.debug) console.log('[ChabadAM]', ...args);
    }

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

        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        max-width: 750px;
        margin: 0 auto;
        position: relative;
        z-index: 10;
    }

    #styled-form-overlay * {
        box-sizing: border-box;
    }

    .sfo-card {
        display: block !important;
        visibility: visible !important;
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

    .sfo-donation-option input[type="radio"] {
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

    @media (max-width: 600px) {
        .sfo-section { padding: 20px; }
        .sfo-row { flex-direction: column; gap: 12px; }
        .sfo-donation-grid { grid-template-columns: repeat(2, 1fr); }
        .sfo-submit-btn { width: 100%; padding: 16px 24px; }
    }
</style>

<div class="sfo-card">
    <div class="sfo-header">
        <h1 class="sfo-title">Women's Challah Bake</h1>
    </div>

    <img class="sfo-banner" src="https://w2.chabad.org/media/images/1309/FXjr13099008.jpg" alt="Women's Challah Bake">

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

    <div class="sfo-section" style="padding: 16px 32px;">
        <label class="sfo-checkbox-row">
            <input type="checkbox" class="sfo-checkbox" id="sfo-optin" data-sync="input_5" checked>
            <span class="sfo-checkbox-label">I would like to receive news and updates by email</span>
        </label>
    </div>

    <div class="sfo-section sfo-donations">
        <h2 class="sfo-section-title">Optional Donation</h2>
        <div class="sfo-donation-grid">
            <div class="sfo-donation-option">
                <input type="radio" name="sfo-donation" id="sfo-donation-50" value="50" data-sync-radio="q11_input11">
                <label for="sfo-donation-50"><span class="sfo-donation-amount">$50</span></label>
            </div>
            <div class="sfo-donation-option">
                <input type="radio" name="sfo-donation" id="sfo-donation-75" value="75" data-sync-radio="q11_input11">
                <label for="sfo-donation-75"><span class="sfo-donation-amount">$75</span></label>
            </div>
            <div class="sfo-donation-option">
                <input type="radio" name="sfo-donation" id="sfo-donation-100" value="100" data-sync-radio="q11_input11">
                <label for="sfo-donation-100"><span class="sfo-donation-amount">$100</span></label>
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
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                </select>
            </div>
        </div>
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

</div>
        `;
    }

    function setupSync() {
        // Text inputs and selects with data-sync attribute
        document.querySelectorAll('#styled-form-overlay [data-sync]').forEach(input => {
            const targetId = input.getAttribute('data-sync');
            const targetEl = document.getElementById(targetId);

            if (!targetEl) {
                log('Target not found:', targetId);
                return;
            }

            const syncValue = () => {
                if (input.type === 'checkbox') {
                    targetEl.checked = input.checked;
                } else {
                    targetEl.value = input.value;
                }
                // Trigger change event on original element for CMS validation
                targetEl.dispatchEvent(new Event('change', { bubbles: true }));
                targetEl.dispatchEvent(new Event('input', { bubbles: true }));
            };

            input.addEventListener('input', syncValue);
            input.addEventListener('change', syncValue);
        });

        // Donation radio buttons - map to actual CMS radio IDs
        const donationMap = {
            'sfo-donation-50': 'input_11_0',
            'sfo-donation-75': 'input_11_1',
            'sfo-donation-100': 'input_11_2',
            'sfo-donation-other': 'other_11'
        };

        Object.entries(donationMap).forEach(([overlayId, originalId]) => {
            const overlayRadio = document.getElementById(overlayId);
            const originalRadio = document.getElementById(originalId);

            if (overlayRadio && originalRadio) {
                overlayRadio.addEventListener('change', () => {
                    if (overlayRadio.checked) {
                        originalRadio.checked = true;
                        originalRadio.dispatchEvent(new Event('change', { bubbles: true }));
                        log('Synced donation:', overlayId, '->', originalId);

                        // Enable/disable the other amount input
                        const otherAmountInput = document.getElementById('input_11');
                        if (otherAmountInput) {
                            otherAmountInput.disabled = (originalId !== 'other_11');
                        }
                    }
                });
            }
        });

        // Other amount input
        const otherInput = document.getElementById('sfo-donation-other-amount');
        if (otherInput) {
            otherInput.addEventListener('input', () => {
                const originalOtherInput = document.getElementById('input_11');
                if (originalOtherInput) {
                    originalOtherInput.value = otherInput.value;
                    originalOtherInput.disabled = false;
                    originalOtherInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });

            otherInput.addEventListener('focus', () => {
                // Auto-select "Other" radio when clicking in the amount field
                const overlayOther = document.getElementById('sfo-donation-other');
                const originalOther = document.getElementById('other_11');
                if (overlayOther) overlayOther.checked = true;
                if (originalOther) {
                    originalOther.checked = true;
                    originalOther.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    }

    function validateForm() {
        const errors = [];
        const overlay = document.getElementById('styled-form-overlay');

        log('Starting validation...');

        // Required text fields
        const requiredFields = [
            { id: 'sfo-first-name', label: 'First Name' },
            { id: 'sfo-last-name', label: 'Last Name' },
            { id: 'sfo-email', label: 'Email' },
            { id: 'sfo-phone', label: 'Phone Number' },
            { id: 'sfo-addr1', label: 'Street Address' },
            { id: 'sfo-city', label: 'City' },
            { id: 'sfo-state', label: 'State' },
            { id: 'sfo-postal', label: 'Postal Code' },
            { id: 'sfo-cc-number', label: 'Credit Card Number' },
            { id: 'sfo-cc-cvv', label: 'Security Code' },
            { id: 'sfo-cc-name', label: 'Name on Card' },
            { id: 'sfo-bill-addr', label: 'Billing Street Address' },
            { id: 'sfo-bill-city', label: 'Billing City' },
            { id: 'sfo-bill-state', label: 'Billing State' },
            { id: 'sfo-bill-postal', label: 'Billing Postal Code' }
        ];

        // Required selects
        const requiredSelects = [
            { id: 'sfo-country', label: 'Country' },
            { id: 'sfo-cc-month', label: 'Expiration Month' },
            { id: 'sfo-cc-year', label: 'Expiration Year' },
            { id: 'sfo-bill-country', label: 'Billing Country' }
        ];

        // Clear previous error styles
        overlay.querySelectorAll('.sfo-input, .sfo-select').forEach(el => {
            el.style.borderColor = '';
        });

        // Check required text fields
        requiredFields.forEach(field => {
            const el = document.getElementById(field.id);
            const val = el ? el.value.trim() : '[NOT FOUND]';
            log('Field:', field.id, '=', val ? val : '[EMPTY]');
            if (el && !el.value.trim()) {
                errors.push(field.label);
                el.style.borderColor = '#8B0000';
            }
        });

        // Check required selects
        requiredSelects.forEach(field => {
            const el = document.getElementById(field.id);
            if (el && !el.value) {
                errors.push(field.label);
                el.style.borderColor = '#8B0000';
            }
        });

        // Email validation
        const emailEl = document.getElementById('sfo-email');
        if (emailEl && emailEl.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailEl.value)) {
                errors.push('Email (invalid format)');
                emailEl.style.borderColor = '#8B0000';
            }
        }

        // Credit card number validation (basic - 13-19 digits)
        const ccEl = document.getElementById('sfo-cc-number');
        if (ccEl && ccEl.value) {
            const ccNum = ccEl.value.replace(/\s/g, '');
            if (!/^\d{13,19}$/.test(ccNum)) {
                errors.push('Credit Card Number (invalid)');
                ccEl.style.borderColor = '#8B0000';
            }
        }

        // CVV validation (3-4 digits)
        const cvvEl = document.getElementById('sfo-cc-cvv');
        if (cvvEl && cvvEl.value) {
            if (!/^\d{3,4}$/.test(cvvEl.value)) {
                errors.push('Security Code (3-4 digits)');
                cvvEl.style.borderColor = '#8B0000';
            }
        }

        log('Validation complete. Errors:', errors.length > 0 ? errors : 'None');
        return errors;
    }

    function showValidationErrors(errors) {
        // Remove existing error message
        const existing = document.getElementById('sfo-error-message');
        if (existing) existing.remove();

        if (errors.length === 0) return;

        const errorDiv = document.createElement('div');
        errorDiv.id = 'sfo-error-message';
        errorDiv.style.cssText = 'background: #fee2e2; border: 1px solid #dc2626; border-radius: 8px; padding: 16px; margin: 16px 32px; color: #991b1b; font-size: 14px;';
        errorDiv.innerHTML = '<strong>Please fix the following:</strong><ul style="margin: 8px 0 0 20px; padding: 0;">' +
            errors.map(e => '<li>' + e + '</li>').join('') + '</ul>';

        const card = document.querySelector('.sfo-card');
        const header = document.querySelector('.sfo-header');
        if (card && header) {
            header.after(errorDiv);
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function copyCountryOptions() {
        // Copy country options from original form to overlay dropdowns
        const originalCountry = document.getElementById('input_9_country');
        const overlayCountry = document.getElementById('sfo-country');
        const overlayBillCountry = document.getElementById('sfo-bill-country');

        if (originalCountry && overlayCountry) {
            overlayCountry.innerHTML = originalCountry.innerHTML;
            // Set default to United States
            overlayCountry.value = 'United States';
        }

        if (originalCountry && overlayBillCountry) {
            overlayBillCountry.innerHTML = originalCountry.innerHTML;
            overlayBillCountry.value = 'United States';
        }
    }

    function styleOriginalFormBottom() {
        // Don't move anything - just style the original form's bottom section
        // Hide all form lines EXCEPT the submit button section
        const form = document.getElementById('6781190');
        if (!form) return;

        // Style to hide input sections but show CAPTCHA + Submit
        const style = document.createElement('style');
        style.textContent = `
            /* Hide specific form lines (NOT the submit/captcha section) */
            #6781190 #id_3,
            #6781190 #id_4,
            #6781190 #id_5,
            #6781190 #id_6,
            #6781190 #id_9,
            #6781190 #id_10,
            #6781190 #id_11 {
                display: none !important;
            }

            /* Show the submit button section */
            #6781190 #id_2 {
                display: block !important;
                padding: 32px !important;
                background: linear-gradient(to bottom, #ffffff, #fafafa) !important;
                text-align: center !important;
                border: none !important;
                margin-top: -1px !important;
            }

            /* Style the submit button */
            #6781190 .form-submit-button {
                font-family: 'Inter', sans-serif !important;
                font-size: 16px !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 2px !important;
                padding: 18px 60px !important;
                background: #C9A227 !important;
                color: #1a1a1a !important;
                border: none !important;
                border-radius: 14px !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                box-shadow: 0 4px 15px rgba(201, 162, 39, 0.15) !important;
            }

            #6781190 .form-submit-button:hover {
                background: #1a1a1a !important;
                color: #C9A227 !important;
                transform: scale(1.02) !important;
            }

            #6781190 .form-buttons-wrapper {
                text-align: center !important;
                text-indent: 0 !important;
            }

            /* Style reCAPTCHA wrapper */
            #6781190 .js-recaptcha-wrapper,
            .js-recaptcha-wrapper {
                display: flex !important;
                justify-content: center !important;
                margin-bottom: 20px !important;
                position: static !important;
                visibility: visible !important;
            }

            /* Make sure the form itself is visible for the bottom section */
            #6781190 {
                position: static !important;
                left: auto !important;
                visibility: visible !important;
                display: block !important;
            }

            /* Hide the form-all container background since we're using overlay */
            #6781190 .form-all {
                background: transparent !important;
                box-shadow: none !important;
            }

            /* Hide the header in original form (we have our own) */
            #6781190 .form-header-group {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        log('Original form bottom section styled');
    }

    function init() {
        const container = document.querySelector('#formContainer');
        const formElement = document.getElementById(CONFIG.formId);

        if (!container || !formElement) return;

        const overlay = document.createElement('div');
        overlay.id = 'styled-form-overlay';
        overlay.innerHTML = getStyledFormHTML();

        // Insert overlay BEFORE the original form
        container.insertBefore(overlay, formElement);
        log('Overlay inserted, checking visibility...');
        log('Overlay element:', document.getElementById('styled-form-overlay'));

        // Apply CSS rules to style/hide original form elements
        styleOriginalFormBottom();

        // Copy country options from original form
        copyCountryOptions();

        // Now hide the original form's input sections (but keep CAPTCHA + Submit visible)
        // Hide specific form-line elements by ID (NOT the submit/captcha section)
        const idsToHide = ['id_3', 'id_4', 'id_5', 'id_6', 'id_9', 'id_10', 'id_11'];
        idsToHide.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        // Hide the form header (we have our own)
        const formHeader = formElement.querySelector('.form-header-group');
        if (formHeader) formHeader.style.display = 'none';

        // Make sure reCAPTCHA wrapper is visible
        const recaptchaWrapper = document.querySelector('.js-recaptcha-wrapper');
        if (recaptchaWrapper) {
            recaptchaWrapper.style.cssText = 'display: flex !important; justify-content: center !important; margin: 20px 0 !important;';
            log('reCAPTCHA wrapper found, parent:', recaptchaWrapper.parentElement?.id || recaptchaWrapper.parentElement?.className);
            log('reCAPTCHA iframe present:', !!recaptchaWrapper.querySelector('iframe'));
        } else {
            log('reCAPTCHA wrapper NOT FOUND');
            // Search for any recaptcha elements
            const anyRecaptcha = document.querySelectorAll('[class*="recaptcha"], [id*="recaptcha"]');
            log('Any recaptcha elements found:', anyRecaptcha.length);
            anyRecaptcha.forEach(el => log('  -', el.tagName, el.id || el.className));
        }

        // Style the submit section
        const submitSection = document.getElementById('id_2');
        if (submitSection) {
            submitSection.style.cssText = 'display: block !important; padding: 32px !important; text-align: center !important; background: linear-gradient(to bottom, #fff, #fafafa) !important; border-radius: 0 0 24px 24px !important;';
        }

        // Style the submit button
        const submitBtn = document.getElementById('input_2');
        if (submitBtn) {
            submitBtn.style.cssText = 'font-family: Inter, sans-serif !important; font-size: 16px !important; font-weight: 700 !important; text-transform: uppercase !important; letter-spacing: 2px !important; padding: 18px 60px !important; background: #C9A227 !important; color: #1a1a1a !important; border: none !important; border-radius: 14px !important; cursor: pointer !important;';
        }

        log('Original form sections hidden, submit styled');

        // Setup real-time value syncing
        setupSync();

        // Hook into original submit for validation
        const originalSubmit = document.getElementById('input_2');
        if (originalSubmit) {
            originalSubmit.addEventListener('click', (e) => {
                log('Original submit clicked - validating first...');

                // Sync all values before validation
                document.querySelectorAll('#styled-form-overlay [data-sync]').forEach(input => {
                    const targetId = input.getAttribute('data-sync');
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        if (input.type === 'checkbox') {
                            targetEl.checked = input.checked;
                        } else {
                            targetEl.value = input.value;
                        }
                        targetEl.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });

                // Sync donation radios
                const donationMap = {
                    'sfo-donation-50': 'input_11_0',
                    'sfo-donation-75': 'input_11_1',
                    'sfo-donation-100': 'input_11_2',
                    'sfo-donation-other': 'other_11'
                };
                Object.entries(donationMap).forEach(([overlayId, originalId]) => {
                    const overlayRadio = document.getElementById(overlayId);
                    const originalRadio = document.getElementById(originalId);
                    if (overlayRadio && originalRadio && overlayRadio.checked) {
                        originalRadio.checked = true;
                    }
                });

                // Sync other amount
                const overlayOther = document.getElementById('sfo-donation-other');
                const otherAmount = document.getElementById('sfo-donation-other-amount');
                const originalOtherInput = document.getElementById('input_11');
                if (overlayOther && overlayOther.checked && otherAmount && originalOtherInput) {
                    originalOtherInput.value = otherAmount.value;
                    originalOtherInput.disabled = false;
                }

                // Run validation
                const errors = validateForm();
                showValidationErrors(errors);

                if (errors.length > 0) {
                    log('Validation failed, preventing submit');
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                log('Validation passed, checking CAPTCHA...');

                // Check if CAPTCHA is completed
                const captchaCheck = document.querySelector('.js-recaptcha-input');
                if (!captchaCheck || !captchaCheck.value) {
                    log('CAPTCHA not completed!');

                    // Show error to user
                    const existingError = document.getElementById('sfo-captcha-error');
                    if (!existingError) {
                        const errorDiv = document.createElement('div');
                        errorDiv.id = 'sfo-captcha-error';
                        errorDiv.style.cssText = 'background: #fee2e2; border: 1px solid #dc2626; border-radius: 8px; padding: 12px 16px; margin: 12px 0; color: #991b1b; font-size: 14px; text-align: center;';
                        errorDiv.textContent = '⚠️ Please complete the CAPTCHA checkbox before submitting.';

                        const submitLine = document.getElementById('id_2');
                        if (submitLine) {
                            submitLine.insertBefore(errorDiv, submitLine.firstChild);
                        }
                    }

                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                // Remove captcha error if it exists
                const captchaError = document.getElementById('sfo-captcha-error');
                if (captchaError) captchaError.remove();

                log('CAPTCHA verified, allowing form submission');

                // DEBUG: Log all original form field values
                log('=== ORIGINAL FORM FIELD VALUES ===');
                const originalForm = document.getElementById('6781190');
                if (originalForm) {
                    const fields = originalForm.querySelectorAll('input, select');
                    fields.forEach(f => {
                        if (f.type === 'hidden' && !f.name.includes('captcha')) return;
                        const val = f.type === 'checkbox' || f.type === 'radio'
                            ? (f.checked ? 'CHECKED' : 'unchecked')
                            : (f.value || '[EMPTY]');
                        if (f.name || f.id) {
                            log(`  ${f.name || f.id}: ${val}`);
                        }
                    });
                }

                // DEBUG: Check reCAPTCHA
                const recaptchaInput = document.querySelector('.js-recaptcha-input');
                log('reCAPTCHA token:', recaptchaInput?.value ? `Present (${recaptchaInput.value.length} chars)` : 'EMPTY!');

            }, true); // Use capture to run before CMS handlers
        }

        log('Form overlay initialized successfully');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
