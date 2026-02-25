/**
 * PARADISE VALLEY EVENTS - JavaScript Functionality
 * Handles BOTH: Events listing (/tools/events/) AND Single event registration (/tools/events/register_cdo/)
 */
(function() {
    // Only run on events pages
    if (!window.location.pathname.includes("/tools/events/")) {
        return;
    }

    // Check if this is a single event registration page
    var isRegistrationPage = window.location.pathname.includes("/tools/events/register");

    // =========================================================
    // SINGLE EVENT REGISTRATION PAGE FUNCTIONS
    // =========================================================
    if (isRegistrationPage) {
        // Add body class to scope CSS - CRITICAL for preventing style leaks
        document.body.classList.add('pv-registration-page');

        // =========================================================
        // INJECT VIEWPORT META TAG (CRITICAL FOR MOBILE!)
        // =========================================================
        if (!document.querySelector('meta[name="viewport"]')) {
            var viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.insertBefore(viewportMeta, document.head.firstChild);
            console.log("📱 Viewport meta tag injected for mobile support");
        }
        var singleEventIcons = {
            location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
            calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
        };

        // Style info cards
        function styleInfoCards() {
            var infoSection = document.querySelector('#RegisterHeader .column2');
            if (!infoSection || infoSection.classList.contains('pv-info-styled')) return;

            var sectionTitle = null;
            var locationData = null;
            var dateData = null;
            var locationHref = null;
            var dateHref = null;

            var headingEl = infoSection.querySelector('.heading');
            if (headingEl) sectionTitle = headingEl.textContent.trim();

            var mapLinkEl = infoSection.querySelector('.map_link');
            if (mapLinkEl) {
                locationHref = mapLinkEl.href || null;
                var addrDiv = mapLinkEl.querySelector('div');
                locationData = addrDiv ? addrDiv.innerHTML : mapLinkEl.textContent.trim();
            }

            var icalLinkEl = infoSection.querySelector('.ical_link');
            if (icalLinkEl) {
                dateHref = icalLinkEl.href || null;
                var dateDiv = icalLinkEl.querySelector('div');
                dateData = dateDiv ? dateDiv.innerHTML : icalLinkEl.textContent.trim();
            }

            var originalChildren = Array.from(infoSection.children);
            originalChildren.forEach(function(child) {
                child.setAttribute('style', 'display: none !important;');
            });

            var newWrapper = document.createElement('div');
            newWrapper.className = 'pv-info-wrapper';
            newWrapper.style.cssText = 'display: block !important;';

            if (sectionTitle) {
                var titleEl = document.createElement('div');
                titleEl.className = 'pv-info-section-title';
                titleEl.textContent = sectionTitle;
                // Ensure centering works on ALL screen sizes via inline style
                titleEl.style.setProperty('text-align', 'center', 'important');
                newWrapper.appendChild(titleEl);
            }

            var cardsGrid = document.createElement('div');
            cardsGrid.className = 'pv-info-cards-grid';

            if (locationData) {
                var locCard = document.createElement('div');
                locCard.className = 'pv-info-card';
                locCard.innerHTML = '<div class="pv-info-icon">' + singleEventIcons.location + '</div>' +
                    '<div class="pv-info-text"><span class="pv-card-label">LOCATION</span>' +
                    '<div class="pv-info-content">' + locationData + '</div></div>';
                if (locationHref) {
                    locCard.style.cursor = 'pointer';
                    locCard.onclick = function() { window.open(locationHref, '_blank'); };
                }
                cardsGrid.appendChild(locCard);
            }

            if (dateData) {
                var dateCard = document.createElement('div');
                dateCard.className = 'pv-info-card';
                dateCard.innerHTML = '<div class="pv-info-icon">' + singleEventIcons.calendar + '</div>' +
                    '<div class="pv-info-text"><span class="pv-card-label">DATE & TIME</span>' +
                    '<div class="pv-info-content">' + dateData + '</div></div>';
                if (dateHref) {
                    dateCard.style.cursor = 'pointer';
                    dateCard.onclick = function() { window.open(dateHref, '_blank'); };
                }
                cardsGrid.appendChild(dateCard);
            }

            newWrapper.appendChild(cardsGrid);
            infoSection.appendChild(newWrapper);
            infoSection.classList.add('pv-info-styled');
        }

        // Remove dashed borders (but NOT from form inputs!)
        function removeDashedBorders() {
            var registerBody = document.querySelector('#RegisterBody');
            if (!registerBody) return;

            var formTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'];
            var allElements = registerBody.querySelectorAll('*');
            allElements.forEach(function(el) {
                if (formTags.indexOf(el.tagName) !== -1) return;
                var style = el.getAttribute('style');
                if (style && (style.includes('dashed') || style.includes('dotted'))) {
                    el.style.borderStyle = 'none';
                }
            });

            var containers = registerBody.querySelectorAll('div, fieldset, table, tbody, tr, td');
            containers.forEach(function(container) {
                var currentStyle = window.getComputedStyle(container);
                if (currentStyle.borderStyle === 'dashed' || currentStyle.borderStyle === 'dotted') {
                    container.style.border = 'none';
                    container.style.borderStyle = 'none';
                }
                container.style.outline = 'none';
            });
        }

        // Style delete buttons
        function styleDeleteButtons() {
            var registerBody = document.querySelector('#RegisterBody');
            if (!registerBody) return;

            var reservations = registerBody.querySelectorAll('.reservation, .clearfix.reservation');
            reservations.forEach(function(row) {
                row.style.position = 'relative';
                row.style.paddingRight = '50px';

                var deleteBtn = row.querySelector('.remove_reservation, button.remove_reservation');
                if (deleteBtn && !deleteBtn.classList.contains('pv-delete-styled')) {
                    deleteBtn.style.cssText = 'position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;width:28px!important;height:28px!important;min-width:28px!important;max-width:28px!important;border-radius:50%!important;background:#f0f0f0!important;border:1px solid #ddd!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;margin:0!important;color:#999!important;font-size:14px!important;font-weight:bold!important;opacity:0.6!important;z-index:100!important;';

                    deleteBtn.addEventListener('mouseenter', function() {
                        this.style.background = '#ff5252';
                        this.style.borderColor = '#ff5252';
                        this.style.color = 'white';
                        this.style.opacity = '1';
                        this.style.transform = 'translateY(-50%) scale(1.1)';
                    });

                    deleteBtn.addEventListener('mouseleave', function() {
                        this.style.background = '#f0f0f0';
                        this.style.borderColor = '#ddd';
                        this.style.color = '#999';
                        this.style.opacity = '0.6';
                        this.style.transform = 'translateY(-50%)';
                    });

                    deleteBtn.classList.add('pv-delete-styled');
                }
            });
        }

        // Force form input styles
        function forceFormInputStyles() {
            // Only target inputs within the registration form, not the entire page
            var form = document.querySelector('form#RegisterSinglePage');
            if (!form) return;

            var inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(function(input) {
                if (input.type === 'hidden' || input.type === 'checkbox' || input.type === 'radio' ||
                    input.type === 'submit' || input.type === 'button' || input.type === 'image') return;
                if (input.closest('nav, header, .nav, .header, .menu, #footer, .footer, .footer3')) return;

                input.style.setProperty('font-family', "'Inter', sans-serif", 'important');
                input.style.setProperty('font-size', '1.1rem', 'important');
                input.style.setProperty('padding', '0.9rem 1.1rem', 'important');
                input.style.setProperty('border', '2px solid #999', 'important');
                input.style.setProperty('border-width', '2px', 'important');
                input.style.setProperty('border-style', 'solid', 'important');
                input.style.setProperty('border-color', '#999', 'important');
                input.style.setProperty('border-radius', '10px', 'important');
                input.style.setProperty('box-sizing', 'border-box', 'important');
                input.style.setProperty('background', '#ffffff', 'important');
                input.style.setProperty('box-shadow', 'inset 0 1px 3px rgba(0,0,0,0.1)', 'important');
                input.style.setProperty('width', '100%', 'important');
                input.style.setProperty('max-width', '100%', 'important');

                if (input.tagName === 'TEXTAREA') {
                    input.style.setProperty('min-height', '100px', 'important');
                    input.style.setProperty('resize', 'vertical', 'important');
                }

                if (input.tagName === 'SELECT') {
                    input.style.setProperty('cursor', 'pointer', 'important');
                    input.style.setProperty('appearance', 'none', 'important');
                    input.style.setProperty('background-image', "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", 'important');
                    input.style.setProperty('background-repeat', 'no-repeat', 'important');
                    input.style.setProperty('background-position', 'right 1rem center', 'important');
                    input.style.setProperty('padding-right', '2.5rem', 'important');
                }
            });

            // Only target labels within the registration form
            var labels = form.querySelectorAll('.bottom_padding label, #Summary label, #ReserversInformation label, #Payment label, #RegisterBody label');
            labels.forEach(function(label) {
                // Skip if label is in footer
                if (label.closest('#footer, .footer, .footer3')) return;

                label.style.setProperty('font-family', "'Inter', sans-serif", 'important');
                label.style.setProperty('font-size', '1.15rem', 'important');
                label.style.setProperty('font-weight', '600', 'important');
                label.style.setProperty('color', '#333', 'important');
                label.style.setProperty('display', 'block', 'important');
                label.style.setProperty('margin-bottom', '0.5rem', 'important');
            });

            // Center the #Buttons section (validation box + submit button)
            centerButtonsSection();
        }

        // Center #Buttons section - validation box and submit button
        // NOTE: Don't set display property - CMS handles visibility
        function centerButtonsSection() {
            var buttonsSection = document.querySelector('#Buttons');
            if (!buttonsSection) return;

            // Only apply centering styles - do NOT set display (CMS controls visibility)
            buttonsSection.style.setProperty('flex-direction', 'column', 'important');
            buttonsSection.style.setProperty('align-items', 'center', 'important');
            buttonsSection.style.setProperty('width', '100%', 'important');

            // Center all direct children (validation boxes, button wrapper, etc.)
            var children = buttonsSection.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                // Center text inside each child
                child.style.setProperty('text-align', 'center', 'important');
                // Make boxes have auto margins for centering if they have fixed width
                child.style.setProperty('margin-left', 'auto', 'important');
                child.style.setProperty('margin-right', 'auto', 'important');
            }

            // Also find and center the submit button wrapper specifically
            var submitWrapper = document.querySelector('#SubmitButton_wrapper');
            if (submitWrapper) {
                submitWrapper.style.setProperty('display', 'flex', 'important');
                submitWrapper.style.setProperty('justify-content', 'center', 'important');
                submitWrapper.style.setProperty('width', '100%', 'important');
                submitWrapper.style.setProperty('margin-left', 'auto', 'important');
                submitWrapper.style.setProperty('margin-right', 'auto', 'important');
            }
        }

        // Style the Reservations/Pricing section
        // Parses text content and creates styled pricing cards
        function stylePricingSection() {
            var registerBody = document.querySelector('#RegisterBody');
            if (!registerBody || registerBody.classList.contains('pv-pricing-styled')) return;

            // Get the raw HTML content of RegisterBody
            var html = registerBody.innerHTML;

            // Find where form controls start - everything after this we leave alone
            var formStart = html.search(/<(input|select|table|form)/i);
            if (formStart === -1) formStart = html.length;

            // Get only the text before form elements
            var pricingHtml = html.substring(0, formStart);

            // Strip HTML tags to get plain text, preserve line breaks
            var plainText = pricingHtml
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]+>/g, '')
                .replace(/&nbsp;/g, ' ')
                .trim();

            // Split into lines
            var lines = plainText.split('\n').map(function(l) { return l.trim(); }).filter(function(l) { return l && l !== '---'; });

            console.log('💰 Parsing pricing lines:', lines);

            var pricingItems = [];
            var sponsorshipLevels = [];
            var otherText = [];

            lines.forEach(function(line) {
                // Skip "Reservations" title
                if (line.toLowerCase() === 'reservations') return;

                // Sponsorship levels (multiple prices with |)
                if (line.includes('|') && line.includes('$')) {
                    var amounts = line.match(/\$[\d,]+/g);
                    if (amounts) {
                        amounts.forEach(function(amt) {
                            sponsorshipLevels.push(amt);
                        });
                    }
                    // Get text before first $
                    var textPart = line.split('$')[0].replace(/\|/g, '').trim();
                    if (textPart && textPart.length > 3) otherText.push(textPart);
                    return;
                }

                // VIP with price
                if (line.toLowerCase().includes('vip') && line.includes('$')) {
                    var vipMatch = line.match(/\$[\d,]+/);
                    var vipAmount = vipMatch ? vipMatch[0] : '';
                    var vipLabel = line.replace(/\$[\d,]+/g, '').replace(/[-:]+\s*$/, '').trim();
                    if (vipLabel && vipLabel.length < 80) {
                        pricingItems.push({ label: vipLabel, amount: vipAmount, isVip: true });
                    }
                    return;
                }

                // Regular pricing line (has $)
                if (line.includes('$')) {
                    var priceMatch = line.match(/\$[\d,]+/);
                    var amount = priceMatch ? priceMatch[0] : '';
                    var label = line.replace(/\$[\d,]+/g, '').replace(/[-:]+\s*$/, '').trim();
                    if (label && label.length > 2 && label.length < 80) {
                        pricingItems.push({ label: label, amount: amount, isVip: false });
                    }
                    return;
                }

                // VIP description (mentions VIP but no price)
                if (line.toLowerCase().includes('vip') && line.length > 15) {
                    otherText.push(line);
                    return;
                }

                // Sponsorship text
                if ((line.toLowerCase().includes('sponsor') || line.toLowerCase().includes('appreciated')) && line.length > 10) {
                    otherText.push(line);
                    return;
                }
            });

            console.log('💰 Found:', pricingItems.length, 'pricing items,', sponsorshipLevels.length, 'sponsorship levels');

            // Only proceed if we found pricing items
            if (pricingItems.length === 0 || pricingItems.length > 20) {
                registerBody.classList.add('pv-pricing-styled');
                return;
            }

            // Create styled container
            var pricingContainer = document.createElement('div');
            pricingContainer.className = 'pv-pricing-container';

            var titleEl = document.createElement('div');
            titleEl.className = 'pv-pricing-title';
            titleEl.textContent = 'Ticket Pricing';
            pricingContainer.appendChild(titleEl);

            // Add pricing items
            pricingItems.forEach(function(item) {
                var itemEl = document.createElement('div');
                itemEl.className = 'pv-pricing-item';

                var labelEl = document.createElement('span');
                labelEl.className = 'pv-pricing-label';
                if (item.isVip) {
                    var badge = document.createElement('span');
                    badge.className = 'pv-vip-badge';
                    badge.textContent = 'VIP';
                    labelEl.appendChild(badge);
                    labelEl.appendChild(document.createTextNode(' ' + item.label));
                } else {
                    labelEl.textContent = item.label;
                }

                var amountEl = document.createElement('span');
                amountEl.className = 'pv-pricing-amount';
                amountEl.textContent = item.amount;

                itemEl.appendChild(labelEl);
                itemEl.appendChild(amountEl);
                pricingContainer.appendChild(itemEl);
            });

            // Add description text
            if (otherText.length > 0) {
                otherText.forEach(function(txt) {
                    var p = document.createElement('p');
                    p.className = 'pv-sponsorship-text';
                    p.textContent = txt;
                    pricingContainer.appendChild(p);
                });
            }

            // Add sponsorship level pills
            if (sponsorshipLevels.length > 0) {
                var levelsContainer = document.createElement('div');
                levelsContainer.className = 'pv-sponsorship-levels';
                sponsorshipLevels.forEach(function(level) {
                    var pill = document.createElement('span');
                    pill.className = 'pv-sponsorship-level';
                    pill.textContent = level;
                    levelsContainer.appendChild(pill);
                });
                pricingContainer.appendChild(levelsContainer);
            }

            // Find title and insert container after it
            var titleNode = registerBody.querySelector('.title');
            if (titleNode) {
                // FIRST: Collect all siblings to hide BEFORE inserting our container
                var siblingsToHide = [];
                var sibling = titleNode.nextSibling;
                while (sibling) {
                    if (sibling.nodeType === 1 && (sibling.classList.contains('performance') ||
                        sibling.querySelector && sibling.querySelector('input, select, table'))) {
                        break;
                    }
                    siblingsToHide.push(sibling);
                    sibling = sibling.nextSibling;
                }

                // SECOND: Hide all the collected siblings
                siblingsToHide.forEach(function(node) {
                    if (node.nodeType === 3 && node.textContent.trim()) {
                        node.textContent = '';
                    } else if (node.nodeType === 1) {
                        node.style.display = 'none';
                    }
                });

                // THIRD: Insert our styled container after title
                titleNode.insertAdjacentElement('afterend', pricingContainer);

                console.log('💰 Pricing section styled successfully');
            }

            registerBody.classList.add('pv-pricing-styled');
        }

        // =========================================================
        // CATEGORY SELECTION PRESERVATION FIX
        // =========================================================
        // When user selects a category and clicks "Add", the form expands
        // but the category dropdown resets. This fix preserves the selection.
        function initCategoryPreservationFix() {
            if (typeof Events === 'undefined' || !Events.priceCategoryAddButtonClick) {
                // Events object not ready yet, retry
                setTimeout(initCategoryPreservationFix, 100);
                return;
            }

            // Already patched? Don't patch again
            if (Events._pvCategoryFixApplied) return;
            Events._pvCategoryFixApplied = true;

            // Save the original function
            var originalAddButtonClick = Events.priceCategoryAddButtonClick;

            // Create a wrapper that preserves category selection
            Events.priceCategoryAddButtonClick = function(button) {
                // Find the category dropdown (ID contains "priceCategory")
                var categoryDropdown = document.querySelector('select[id*="priceCategory"]');
                var selectedCategoryValue = categoryDropdown ? categoryDropdown.value : null;

                // Only preserve if a real selection was made (not empty/default)
                // Note: "0" is a valid category ID (e.g., "Standard - $20.00"), only exclude empty string
                var shouldPreserve = selectedCategoryValue !== null &&
                    selectedCategoryValue !== '';

                // Call the original function
                originalAddButtonClick.call(this, button);

                // After DOM updates, populate the category dropdown
                if (shouldPreserve) {
                    var attempts = 0;
                    var maxAttempts = 10;

                    function trySetValue() {
                        var dropdownInExpanded = document.querySelector('select[id*="priceCategory"]');
                        if (dropdownInExpanded && dropdownInExpanded.value !== selectedCategoryValue) {
                            dropdownInExpanded.value = selectedCategoryValue;
                            // Trigger change event so CMS updates form state (enables Add button, etc.)
                            dropdownInExpanded.dispatchEvent(new Event('change', { bubbles: true }));
                            console.log('✅ Category selection preserved:', selectedCategoryValue);
                        } else if (attempts < maxAttempts) {
                            attempts++;
                            setTimeout(trySetValue, 50);
                        }
                    }

                    setTimeout(trySetValue, 100);
                }
            };

            console.log('✅ Category preservation fix applied');
        }

        // Initialize the fix
        initCategoryPreservationFix();

        // Run single event functions
        styleInfoCards();
        stylePricingSection();
        removeDashedBorders();
        styleDeleteButtons();
        forceFormInputStyles();
        setTimeout(forceFormInputStyles, 300);
        setTimeout(forceFormInputStyles, 800);
        setTimeout(forceFormInputStyles, 1500);
        setTimeout(forceFormInputStyles, 3000);

        // Watch for DOM changes
        var registerBody = document.querySelector('#RegisterBody');
        if (registerBody) {
            var observer = new MutationObserver(function() {
                styleDeleteButtons();
                forceFormInputStyles();
            });
            observer.observe(registerBody, { childList: true, subtree: true });
        }

        // Also observe #Buttons section for validation messages
        var buttonsSection = document.querySelector('#Buttons');
        if (buttonsSection) {
            var buttonsObserver = new MutationObserver(function() {
                centerButtonsSection();
            });
            buttonsObserver.observe(buttonsSection, { childList: true, subtree: true });
        }

        // Observe entire form for validation message changes
        var form = document.querySelector('form#RegisterSinglePage');
        if (form) {
            var formObserver = new MutationObserver(function() {
                clearTimeout(window.pvFormValidationDebounce);
                window.pvFormValidationDebounce = setTimeout(function() {
                    forceFormInputStyles();
                }, 100);
            });
            formObserver.observe(form, { childList: true, subtree: true });
        }

        console.log("✅ Paradise Valley Single Event styling applied!");
        return; // Don't run events listing code
    }

    // =========================================================
    // EVENTS LISTING PAGE
    // =========================================================
    // Add body class to scope CSS - CRITICAL for preventing style leaks
    document.body.classList.add('pv-events-listing');

    // =========================================================
    // SVG ICONS
    // =========================================================
    var icons = {
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
        location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
    };

    // =========================================================
    // TEXT PARSING FUNCTIONS
    // =========================================================

    function parseEventContent(bottomPaddingEl) {
        if (!bottomPaddingEl) return { description: "", dateTime: [], location: [], pricing: [], other: [] };

        var html = bottomPaddingEl.innerHTML;
        var lines = html.split(/<br\s*\/?>/gi).map(function(line) {
            return line.replace(/<[^>]*>/g, "").trim();
        }).filter(function(line) {
            return line.length > 0;
        });

        var result = {
            description: [],
            dateTime: [],
            location: [],
            pricing: [],
            other: []
        };

        var dayPattern = /\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/i;
        var timePattern = /\d{1,2}:\d{2}\s*(am|pm)?|\d{1,2}\s*(am|pm)/i;
        var addressPattern = /\d+\s+\w+.*\b(St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Dr|Drive|Pkwy|Parkway|Way|Ln|Lane)\b/i;
        var cityStatePattern = /\b[A-Z][a-z]+,?\s+(AZ|Arizona|CA|California|NV|Nevada)\s+\d{5}/i;
        var pricePattern = /\$\d+/;

        var foundStructuredContent = false;

        // Patterns for lines that should NOT be treated as location continuation
        var contactPattern = /\b(sponsor|reach out|contact|email|call|rabbi|please|includes|preferred|seating|meet and greet|exclusive)\b/i;

        // Helper: check if line is a proper date/time line (not a description containing a day name)
        function isDateTimeLine(line) {
            var hasTime = timePattern.test(line);
            var hasDay = dayPattern.test(line);

            // If line has explicit time (7:00pm, 5pm), it's a date line
            if (hasTime) return true;

            // If line has a day name, check if it looks like a date (short, structured)
            // vs a description (long sentence with day name buried in it)
            if (hasDay) {
                // Short lines with day names are likely dates (e.g., "Friday, January 16")
                if (line.length < 60) return true;

                // Day name at start of line is likely a date (e.g., "Friday, January 16, 7:00pm")
                if (/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/i.test(line)) return true;

                // Day name followed by comma is likely a date
                if (/(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday),/i.test(line)) return true;

                // Otherwise, long line with day name buried in it is probably description
                return false;
            }

            return false;
        }

        lines.forEach(function(line) {
            if (pricePattern.test(line)) {
                result.pricing.push(line);
                foundStructuredContent = true;
            } else if (isDateTimeLine(line)) {
                result.dateTime.push(line);
                foundStructuredContent = true;
            } else if (addressPattern.test(line) || cityStatePattern.test(line)) {
                result.location.push(line);
                foundStructuredContent = true;
            } else if (!foundStructuredContent) {
                result.description.push(line);
            } else {
                // Check if this looks like location continuation or other info
                // Don't add contact/sponsor info or benefit descriptions to location
                if (result.location.length > 0 && result.location.length < 2 &&
                    !pricePattern.test(line) && !dayPattern.test(line) &&
                    !contactPattern.test(line) && line.length < 50) {
                    result.location.push(line);
                } else {
                    result.description.push(line);
                }
            }
        });

        return result;
    }

    function parsePricing(pricingLines) {
        var prices = [];
        pricingLines.forEach(function(line) {
            var match = line.match(/\$(\d+)/);
            if (match) {
                var amount = "$" + match[1];
                var label = line.replace(/\$\d+/, "").replace(/[-:]/g, "").trim();
                if (!label) label = "Ticket";
                prices.push({ label: label, amount: amount });
            }
        });
        return prices;
    }

    function parseDate(dateLines) {
        if (dateLines.length === 0) return { month: "", day: "", text: "" };

        var firstLine = dateLines[0];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var month = "";
        var day = "";
        var dayOfWeek = "";

        for (var i = 0; i < months.length; i++) {
            if (firstLine.indexOf(months[i]) !== -1) {
                month = monthAbbr[i];
                break;
            }
        }

        var dayMatch = firstLine.match(/\b(\d{1,2})\b/);
        if (dayMatch) {
            day = dayMatch[1];
        }

        var dayOfWeekMatch = firstLine.match(/\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/i);
        if (dayOfWeekMatch) {
            dayOfWeek = dayOfWeekMatch[1].substring(0, 3);
        }

        return {
            month: month,
            day: day,
            text: dayOfWeek
        };
    }

    // =========================================================
    // DOM TRANSFORMATION
    // =========================================================

    function transformEvent(eventEl) {
        if (eventEl.classList.contains("pv-modernized")) return;

        var imgEl = eventEl.querySelector(".event__image img");
        var titleEl = eventEl.querySelector(".event__performances h2 a, h2 a.a_underline_off");
        var bottomPadding = eventEl.querySelector(".bottom_padding");
        var form = eventEl.querySelector("form");

        if (!titleEl) {
            return;
        }

        var imageSrc = imgEl ? imgEl.src : "";
        var title = titleEl.textContent.trim();
        var registerUrl = form ? form.action : (titleEl.href || "#");

        var parsed = parseEventContent(bottomPadding);
        var pricing = parsePricing(parsed.pricing);
        var dateInfo = parseDate(parsed.dateTime);

        var newHTML = '';

        // Header
        newHTML += '<div class="pv-event-header">';
        if (imageSrc) {
            newHTML += '<div class="pv-event-image"><img src="' + imageSrc + '" alt="' + title + '"></div>';
        }
        newHTML += '<div class="pv-header-content">';
        newHTML += '<span class="pv-event-category">Event</span>';
        newHTML += '<h2 class="pv-event-title">' + title + '</h2>';
        newHTML += '</div></div>';

        // Body
        newHTML += '<div class="pv-event-body">';

        if (parsed.description.length > 0) {
            newHTML += '<p class="pv-event-description">' + parsed.description.join(" ") + '</p>';
        }

        newHTML += '<div class="pv-event-info">';

        // Date/Time row
        if (parsed.dateTime.length > 0) {
            newHTML += '<div class="pv-info-row">';
            newHTML += '<div class="pv-info-icon">' + icons.clock + '</div>';
            newHTML += '<div class="pv-info-content">';
            newHTML += '<span class="pv-info-label">When</span>';
            newHTML += '<span class="pv-info-value">' + parsed.dateTime.join("<br>") + '</span>';
            newHTML += '</div></div>';
        }

        // Location row
        if (parsed.location.length > 0) {
            newHTML += '<div class="pv-info-row">';
            newHTML += '<div class="pv-info-icon">' + icons.location + '</div>';
            newHTML += '<div class="pv-info-content">';
            newHTML += '<span class="pv-info-label">Where</span>';
            newHTML += '<span class="pv-info-value">' + parsed.location.join("<br>") + '</span>';
            newHTML += '</div></div>';
        }

        newHTML += '</div>';

        // Pricing
        if (pricing.length > 0) {
            newHTML += '<div class="pv-pricing-grid">';
            pricing.forEach(function(p) {
                newHTML += '<div class="pv-price-item">';
                newHTML += '<span class="pv-price-label">' + p.label + '</span>';
                newHTML += '<span class="pv-price-value">' + p.amount + '</span>';
                newHTML += '</div>';
            });
            newHTML += '</div>';
        }

        newHTML += '</div>';

        // Footer
        newHTML += '<div class="pv-event-footer">';
        newHTML += '<div class="pv-date-display">';
        if (dateInfo.month && dateInfo.day) {
            newHTML += '<div class="pv-date-box">';
            newHTML += '<span class="pv-date-month">' + dateInfo.month + '</span>';
            newHTML += '<span class="pv-date-day">' + dateInfo.day + '</span>';
            newHTML += '</div>';
        }
        if (dateInfo.text) {
            newHTML += '<span class="pv-date-text">' + dateInfo.text + '</span>';
        }
        newHTML += '</div>';

        newHTML += '<div class="pv-footer-actions">';
        newHTML += '<label class="pv-login-checkbox" id="pv-login-label-placeholder"><span>Login before registering</span></label>';
        newHTML += '<a href="' + registerUrl + '" class="pv-register-btn">Register ' + icons.arrow + '</a>';
        newHTML += '</div>';
        newHTML += '</div>';

        eventEl.classList.add("pv-modernized");
        eventEl.insertAdjacentHTML("afterbegin", newHTML);

        // Handle checkbox functionality
        var placeholderLabel = eventEl.querySelector('#pv-login-label-placeholder');
        var originalCheckbox = eventEl.querySelector('input[id$="LoginFirst"]');

        if (placeholderLabel) {
            var newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.id = 'pv-login-checkbox-' + Math.random().toString(36).substring(2, 11);
            placeholderLabel.insertBefore(newCheckbox, placeholderLabel.firstChild);
            placeholderLabel.removeAttribute('id');

            var registerButton = eventEl.querySelector('.pv-register-btn');

            if (originalCheckbox) {
                newCheckbox.addEventListener('change', function() {
                    originalCheckbox.checked = newCheckbox.checked;
                    if (originalCheckbox.onclick) {
                        originalCheckbox.onclick.call(originalCheckbox);
                    }
                });
            }

            if (registerButton && form) {
                registerButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (originalCheckbox) {
                        originalCheckbox.checked = newCheckbox.checked;
                        if (originalCheckbox.onclick) {
                            originalCheckbox.onclick.call(originalCheckbox);
                        }
                    }
                    form.submit();
                });
            }
        }
    }

    // =========================================================
    // CREATE GRID CONTAINER
    // =========================================================
    function wrapEventsInGrid() {
        var events = document.querySelectorAll(".event");
        if (events.length === 0) return;

        var firstEvent = events[0];
        var parent = firstEvent.parentNode;

        // Check if grid already exists
        if (document.querySelector('.pv-events-grid')) return;

        // Create grid container
        var grid = document.createElement('div');
        grid.className = 'pv-events-grid';

        // Insert grid before first event
        parent.insertBefore(grid, firstEvent);

        // Move all events into grid
        events.forEach(function(event) {
            grid.appendChild(event);
        });
    }

    // =========================================================
    // STYLE PAGE TITLE
    // =========================================================
    function stylePageTitle() {
        var titleSelectors = ['h1', '.page-title', '#content h1', '.content h1'];
        var pageTitle = null;

        for (var i = 0; i < titleSelectors.length; i++) {
            var el = document.querySelector(titleSelectors[i]);
            if (el && el.textContent.toLowerCase().includes('event')) {
                pageTitle = el;
                break;
            }
        }

        if (!pageTitle) {
            pageTitle = document.querySelector('h1');
        }

        if (!pageTitle) return;

        // Add styling class
        pageTitle.classList.add('pv-styled-title');

        // Create and add accent bar if not exists
        if (!document.getElementById('pv-title-accent')) {
            var accent = document.createElement('div');
            accent.id = 'pv-title-accent';
            pageTitle.parentNode.insertBefore(accent, pageTitle.nextSibling);
        }
    }

    // =========================================================
    // MOVE LOGIN NOTICE BELOW CARDS
    // =========================================================
    function moveLoginNotice() {
        // Find the login notice (div.blue.f-small.clearfix with "Login to expedite" text)
        var loginNotice = document.querySelector('.blue.f-small.clearfix');
        if (!loginNotice) return;

        // Verify it's the login notice by checking content
        if (!loginNotice.textContent.toLowerCase().includes('login')) return;

        // Find the events grid (created by wrapEventsInGrid)
        var eventsGrid = document.querySelector('.pv-events-grid');
        if (!eventsGrid) return;

        // Move the login notice after the events grid
        eventsGrid.parentNode.insertBefore(loginNotice, eventsGrid.nextSibling);

        // Style the moved notice
        loginNotice.style.setProperty('max-width', '600px', 'important');
        loginNotice.style.setProperty('margin', '2rem auto', 'important');
        loginNotice.style.setProperty('text-align', 'center', 'important');

        console.log('📍 Login notice moved below events grid');
    }

    // =========================================================
    // MAIN EXECUTION
    // =========================================================

    // Style the page title
    stylePageTitle();

    // Wrap events in grid container
    wrapEventsInGrid();

    // Move login notice below the cards
    moveLoginNotice();

    // Transform all events
    var events = document.querySelectorAll(".event");

    events.forEach(function(eventEl) {
        try {
            transformEvent(eventEl);
        } catch (e) {
            // Silently fail for individual events
        }
    });

})();
