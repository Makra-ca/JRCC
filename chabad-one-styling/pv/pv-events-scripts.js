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
            calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
            pricing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>'
        };

        // =========================================================
        // PARSE MARKERS FROM DESCRIPTION
        // Markers: #LOCATION: text   #DATETIME: text   #PRICING: text
        // =========================================================
        function parseMarkers(text) {
            var result = {
                description: text,
                location: '',
                datetime: '',
                pricing: ''
            };

            // Extract #LOCATION: marker (use [\s\S] to match across newlines)
            var locationMatch = text.match(/#LOCATION:\s*([\s\S]+?)(?=\s*#DATETIME:|\s*#PRICING:|$)/i);
            if (locationMatch) {
                result.location = locationMatch[1].trim();
                result.description = result.description.replace(/#LOCATION:\s*[\s\S]+?(?=\s*#DATETIME:|\s*#PRICING:|$)/i, '');
            }

            // Extract #DATETIME: marker (use [\s\S] to match across newlines)
            var datetimeMatch = text.match(/#DATETIME:\s*([\s\S]+?)(?=\s*#LOCATION:|\s*#PRICING:|$)/i);
            if (datetimeMatch) {
                result.datetime = datetimeMatch[1].trim();
                result.description = result.description.replace(/#DATETIME:\s*[\s\S]+?(?=\s*#LOCATION:|\s*#PRICING:|$)/i, '');
            }

            // Extract #PRICING: marker
            var pricingMatch = text.match(/#PRICING:\s*([^\n#]+)/i);
            if (pricingMatch) {
                result.pricing = pricingMatch[1].trim();
                result.description = result.description.replace(/#PRICING:\s*[^\n#]+/i, '');
            }

            // Clean up description - preserve paragraphs
            result.description = result.description
                .replace(/\n{3,}/g, '\n\n')  // Normalize multiple breaks to double
                .replace(/\n\n/g, '{{PARA}}')  // Mark paragraph breaks
                .replace(/\n/g, ' ')  // Single newlines become spaces
                .replace(/\s+/g, ' ')  // Collapse multiple spaces
                .replace(/\{\{PARA\}\}/g, '<br><br>')  // Restore paragraph breaks
                .trim();
            return result;
        }

        // Style info cards - supports both CMS data and marker system
        function styleInfoCards() {
            var infoSection = document.querySelector('#RegisterHeader .column2');
            if (!infoSection || infoSection.classList.contains('pv-info-styled')) return;

            var sectionTitle = null;
            var locationData = null;
            var dateData = null;
            var pricingData = null;
            var locationHref = null;
            var dateHref = null;

            // First, check for markers in the description
            var eventDescription = document.querySelector('#RegisterHeader .event_description');
            var parsedData = { description: '', location: '', datetime: '', pricing: '' };

            if (eventDescription) {
                // Use innerHTML to preserve <br> tags, then convert to newlines for parsing
                var originalHtml = eventDescription.innerHTML || '';
                var originalText = originalHtml
                    .replace(/<br\s*\/?>/gi, '\n')  // Convert <br> to newlines
                    .replace(/<[^>]*>/g, '')  // Strip other HTML tags
                    .trim();
                parsedData = parseMarkers(originalText);

                // Update description text (remove markers) if we found any
                if (parsedData.location || parsedData.datetime || parsedData.pricing) {
                    eventDescription.innerHTML = parsedData.description;
                    console.log('✅ Markers found in description:', parsedData);
                }
            }

            // Fallback: check reservation overview for markers
            if (!parsedData.location && !parsedData.datetime && !parsedData.pricing) {
                var reservationOverview = document.querySelector('#Performances > .regular, .hide_titles > .regular');
                if (reservationOverview) {
                    // Use innerHTML to preserve <br> tags
                    var overviewHtml = reservationOverview.innerHTML || '';
                    var overviewText = overviewHtml
                        .replace(/<br\s*\/?>/gi, '\n')
                        .replace(/<[^>]*>/g, '')
                        .trim();
                    if (overviewText.includes('#LOCATION:') || overviewText.includes('#DATETIME:') || overviewText.includes('#PRICING:')) {
                        var fallbackData = parseMarkers(overviewText);
                        if (fallbackData.location || fallbackData.datetime || fallbackData.pricing) {
                            reservationOverview.innerHTML = fallbackData.description;
                            parsedData = fallbackData;
                            console.log('✅ Markers found in reservation overview:', parsedData);
                        }
                    }
                }
            }

            // Use markers if found, otherwise fall back to CMS data
            if (parsedData.location) locationData = parsedData.location;
            if (parsedData.datetime) dateData = parsedData.datetime;
            if (parsedData.pricing) pricingData = parsedData.pricing;

            // Get section title
            var headingEl = infoSection.querySelector('.heading');
            if (headingEl) sectionTitle = headingEl.textContent.trim();

            // Fallback to CMS map_link if no marker location
            if (!locationData) {
                var mapLinkEl = infoSection.querySelector('.map_link');
                if (mapLinkEl) {
                    locationHref = mapLinkEl.href || null;
                    var addrDiv = mapLinkEl.querySelector('div');
                    locationData = addrDiv ? addrDiv.innerHTML : mapLinkEl.textContent.trim();
                }
            }

            // Fallback to CMS ical_link if no marker datetime
            if (!dateData) {
                var icalLinkEl = infoSection.querySelector('.ical_link');
                if (icalLinkEl) {
                    dateHref = icalLinkEl.href || null;
                    var dateDiv = icalLinkEl.querySelector('div');
                    dateData = dateDiv ? dateDiv.innerHTML : icalLinkEl.textContent.trim();
                }
            }

            // Hide original children
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
                titleEl.style.setProperty('text-align', 'center', 'important');
                newWrapper.appendChild(titleEl);
            }

            var cardsGrid = document.createElement('div');
            cardsGrid.className = 'pv-info-cards-grid';

            // Location card
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

            // Date & Time card
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

            // Pricing cards (individual cards for each price tier)
            if (pricingData) {
                // Parse pipe-separated prices
                var priceItems = [];
                if (pricingData.indexOf('|') !== -1) {
                    var segments = pricingData.split('|');
                    segments.forEach(function(segment) {
                        segment = segment.trim();
                        // Match "Label $XX" pattern
                        var priceMatch = segment.match(/^(.+?)\s*\$(\d+(?:,\d{3})*(?:-\$?\d+(?:,\d{3})*)?)/);
                        if (priceMatch) {
                            priceItems.push({
                                label: priceMatch[1].trim(),
                                amount: '$' + priceMatch[2]
                            });
                        }
                    });
                } else {
                    // Single price
                    var singleMatch = pricingData.match(/^(.+?)\s*\$(\d+(?:,\d{3})*)/);
                    if (singleMatch) {
                        priceItems.push({
                            label: singleMatch[1].trim() || 'Ticket',
                            amount: '$' + singleMatch[2]
                        });
                    }
                }

                // Create pricing grid container
                if (priceItems.length > 0) {
                    var pricingGrid = document.createElement('div');
                    pricingGrid.className = 'pv-pricing-cards-grid';
                    pricingGrid.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 1rem; width: 100%;';

                    priceItems.forEach(function(item) {
                        var priceCard = document.createElement('div');
                        priceCard.className = 'pv-price-card';
                        priceCard.style.cssText = 'background: #fff; border: 2px solid #E67E22; border-radius: 12px; padding: 0.75rem 1.25rem; text-align: center; min-width: 100px; flex: 0 1 auto;';
                        priceCard.innerHTML =
                            '<div style="font-size: 0.75rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">' + item.label + '</div>' +
                            '<div style="font-size: 1.5rem; font-weight: 700; color: #E67E22;">' + item.amount + '</div>';
                        pricingGrid.appendChild(priceCard);
                    });

                    newWrapper.appendChild(pricingGrid);
                } else {
                    // Fallback: show raw text if parsing failed
                    var priceCard = document.createElement('div');
                    priceCard.className = 'pv-info-card';
                    priceCard.innerHTML = '<div class="pv-info-icon">' + singleEventIcons.pricing + '</div>' +
                        '<div class="pv-info-text"><span class="pv-card-label">PRICING</span>' +
                        '<div class="pv-info-content">' + pricingData + '</div></div>';
                    cardsGrid.appendChild(priceCard);
                }
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

        // Style delete buttons - just add class, CSS handles the rest
        function styleDeleteButtons() {
            var registerBody = document.querySelector('#RegisterBody');
            if (!registerBody) return;

            var reservations = registerBody.querySelectorAll('.reservation, .clearfix.reservation');
            reservations.forEach(function(row) {
                // Remove old inline styles if present
                row.style.removeProperty('position');
                row.style.removeProperty('padding-right');

                var deleteBtn = row.querySelector('.remove_reservation, button.remove_reservation');
                if (deleteBtn && !deleteBtn.classList.contains('pv-delete-styled')) {
                    // Clear any inline styles, let CSS handle it
                    deleteBtn.style.cssText = '';
                    deleteBtn.classList.add('pv-delete-styled');
                }
            });
        }

        // =========================================================
        // FIX RESERVATION ROW LAYOUT - Apply flex via JS (responsive)
        // ACTUAL DOM STRUCTURE (from extension inspection):
        // .reservation > .clearfix.medium_vertical_padding
        //   ├── .bold.inline_block (row number "1")
        //   ├── .float_right.medium_horizontal_padding
        //   │     ├── .inline_block (category "Day of Event")
        //   │     ├── .inline_block.price-display (price "$ 35.00")
        //   │     └── button.remove_reservation (delete "×")
        //   └── .clearfix.small_top_padding.small_horizontal_padding
        //         ├── .inline_block > input (first name)
        //         ├── .inline_block > input (last name)
        //         ├── .seat_selection.inline_block
        //         └── .embedded_form.clearfix
        // =========================================================
        function fixReservationLayout() {
            console.log('🔧 fixReservationLayout() called');

            var isMobile = window.innerWidth < 768;
            console.log('🔧 isMobile:', isMobile, 'width:', window.innerWidth);

            // Find all reservation rows
            var reservations = document.querySelectorAll('.reservation');
            console.log('🔧 Found', reservations.length, 'reservations');

            if (reservations.length === 0) return;

            reservations.forEach(function(reservation, resIndex) {
                // Style the reservation container
                reservation.style.setProperty('width', '100%', 'important');
                reservation.style.setProperty('max-width', '100%', 'important');
                reservation.style.setProperty('box-sizing', 'border-box', 'important');
                reservation.style.setProperty('overflow', 'hidden', 'important');

                // Find the main content row
                var contentRow = reservation.querySelector('.clearfix.medium_vertical_padding');
                if (!contentRow) {
                    console.log('  ❌ No content row in reservation', resIndex);
                    return;
                }

                // Find the key elements
                var rowNumber = contentRow.querySelector(':scope > .bold.inline_block');
                var floatRight = contentRow.querySelector(':scope > .float_right');
                var inputsContainer = contentRow.querySelector(':scope > .clearfix.small_top_padding');

                console.log('  Reservation', resIndex, '- rowNum:', !!rowNumber, 'floatRight:', !!floatRight, 'inputs:', !!inputsContainer);

                if (isMobile) {
                    // === MOBILE LAYOUT ===
                    reservation.style.setProperty('position', 'relative', 'important');
                    reservation.style.setProperty('padding', '1rem', 'important');
                    reservation.style.setProperty('margin-bottom', '1rem', 'important');
                    reservation.style.setProperty('border', '1px solid #e0e0e0', 'important');
                    reservation.style.setProperty('border-radius', '12px', 'important');
                    reservation.style.setProperty('background', '#fafafa', 'important');

                    // Content row - stack vertically
                    contentRow.style.setProperty('display', 'flex', 'important');
                    contentRow.style.setProperty('flex-direction', 'column', 'important');
                    contentRow.style.setProperty('gap', '0.75rem', 'important');
                    contentRow.style.setProperty('width', '100%', 'important');

                    // Hide row number on mobile
                    if (rowNumber) {
                        rowNumber.style.setProperty('display', 'none', 'important');
                    }

                    // Float right section (category, price, delete) - make it a row at top
                    if (floatRight) {
                        floatRight.style.setProperty('float', 'none', 'important');
                        floatRight.style.setProperty('display', 'flex', 'important');
                        floatRight.style.setProperty('flex-wrap', 'wrap', 'important');
                        floatRight.style.setProperty('align-items', 'center', 'important');
                        floatRight.style.setProperty('gap', '0.5rem', 'important');
                        floatRight.style.setProperty('order', '1', 'important');
                        floatRight.style.setProperty('width', '100%', 'important');
                        floatRight.style.setProperty('padding', '0', 'important');
                        floatRight.style.setProperty('margin', '0', 'important');

                        // Style children of float_right
                        var floatChildren = floatRight.children;
                        for (var i = 0; i < floatChildren.length; i++) {
                            var child = floatChildren[i];
                            child.style.setProperty('float', 'none', 'important');
                            child.style.setProperty('display', 'inline-block', 'important');

                            // Delete button - position absolute top right
                            if (child.classList.contains('remove_reservation')) {
                                child.style.setProperty('position', 'absolute', 'important');
                                child.style.setProperty('top', '0.5rem', 'important');
                                child.style.setProperty('right', '0.5rem', 'important');
                            }
                        }
                    }

                    // Inputs container - full width, stack
                    if (inputsContainer) {
                        inputsContainer.style.setProperty('float', 'none', 'important');
                        inputsContainer.style.setProperty('display', 'flex', 'important');
                        inputsContainer.style.setProperty('flex-direction', 'column', 'important');
                        inputsContainer.style.setProperty('gap', '0.5rem', 'important');
                        inputsContainer.style.setProperty('order', '2', 'important');
                        inputsContainer.style.setProperty('width', '100%', 'important');
                        inputsContainer.style.setProperty('padding', '0', 'important');
                        inputsContainer.style.setProperty('clear', 'none', 'important');

                        // Style input wrappers - MUST set order and flex to override CSS
                        var inputWrappers = inputsContainer.querySelectorAll(':scope > .inline_block');
                        inputWrappers.forEach(function(wrapper, idx) {
                            wrapper.style.setProperty('display', 'block', 'important');
                            wrapper.style.setProperty('width', '100%', 'important');
                            wrapper.style.setProperty('margin', '0', 'important');
                            // Override any flex-basis that might create gaps
                            wrapper.style.setProperty('flex', '0 0 auto', 'important');
                            wrapper.style.setProperty('height', 'auto', 'important');
                            // First Name = order 1, Last Name = order 2, seat_selection = order 3
                            wrapper.style.setProperty('order', String(idx + 1), 'important');

                            var input = wrapper.querySelector('input');
                            if (input) {
                                input.style.setProperty('width', '100%', 'important');
                                input.style.setProperty('max-width', '100%', 'important');
                                input.style.setProperty('box-sizing', 'border-box', 'important');
                            }
                        });

                        // Hide seat selection
                        var seatSelection = inputsContainer.querySelector('.seat_selection');
                        if (seatSelection) {
                            seatSelection.style.setProperty('display', 'none', 'important');
                        }

                        // Embedded form (birth date, email) - full width, comes AFTER name inputs
                        var embeddedForm = inputsContainer.querySelector('.embedded_form');
                        if (embeddedForm) {
                            embeddedForm.style.setProperty('width', '100%', 'important');
                            embeddedForm.style.setProperty('max-width', '100%', 'important');
                            embeddedForm.style.setProperty('clear', 'none', 'important');
                            embeddedForm.style.setProperty('float', 'none', 'important');
                            embeddedForm.style.setProperty('order', '10', 'important'); // After name inputs
                        }
                    }

                } else {
                    // === DESKTOP LAYOUT ===
                    // Clear any mobile styles - let CSS handle desktop layout
                    reservation.style.cssText = '';
                    contentRow.style.cssText = '';

                    // Clear styles from all children to let CSS flex layout work
                    var allChildren = contentRow.querySelectorAll('*');
                    allChildren.forEach(function(child) {
                        // Only clear styles we might have set
                        child.style.removeProperty('order');
                        child.style.removeProperty('float');
                        child.style.removeProperty('position');
                        child.style.removeProperty('top');
                        child.style.removeProperty('right');
                        child.style.removeProperty('flex-direction');
                        child.style.removeProperty('flex-wrap');
                        child.style.removeProperty('gap');
                    });
                }
            });

            console.log('✅ Reservation layout fix applied');
        }

        // =========================================================
        // FIX BIRTH DATE / EMAIL LAYOUT - Make horizontal (responsive)
        // The form uses: ul.form-section > li.form-line elements
        // Birth date structure: li > .form-input > .dir_ltr > span.form-sub-label-container
        // =========================================================
        function fixEmbeddedFormLayout() {
            console.log('🎂 fixEmbeddedFormLayout() called');

            var isMobile = window.innerWidth < 768;
            console.log('🎂 isMobile:', isMobile, 'width:', window.innerWidth);

            // Find all form lines
            var formLines = document.querySelectorAll('.form-line, li.form-line');
            console.log('🎂 Found', formLines.length, 'form lines');

            formLines.forEach(function(li, liIndex) {
                var selects = li.querySelectorAll('select');
                var textInputs = li.querySelectorAll('input[type="text"], input[type="email"]');

                // Check if this is a birth date field (has 3+ selects for Month/Day/Year)
                if (selects.length >= 3) {
                    console.log('  🎂 Li', liIndex, 'is birth date field with', selects.length, 'selects');

                    // Find the .dir_ltr container that holds the dropdowns
                    var dirLtr = li.querySelector('.dir_ltr');
                    if (dirLtr) {
                        console.log('    ✅ Found .dir_ltr container');
                        dirLtr.style.setProperty('display', 'flex', 'important');
                        dirLtr.style.setProperty('align-items', 'flex-start', 'important');

                        if (isMobile) {
                            // Stack vertically on mobile
                            dirLtr.style.setProperty('flex-direction', 'column', 'important');
                            dirLtr.style.setProperty('flex-wrap', 'wrap', 'important');
                            dirLtr.style.setProperty('gap', '0.5rem', 'important');
                        } else {
                            // Horizontal on desktop
                            dirLtr.style.setProperty('flex-direction', 'row', 'important');
                            dirLtr.style.setProperty('flex-wrap', 'nowrap', 'important');
                            dirLtr.style.setProperty('gap', '0.75rem', 'important');
                        }
                    }

                    // Also style the .form-input wrapper
                    var formInput = li.querySelector('.form-input');
                    if (formInput) {
                        console.log('    ✅ Found .form-input container');
                        formInput.style.setProperty('display', 'block', 'important');
                        formInput.style.setProperty('width', '100%', 'important');
                        formInput.style.setProperty('max-width', '100%', 'important');
                        formInput.style.setProperty('overflow', 'hidden', 'important');
                    }

                    // Style each sub-label-container
                    var subContainers = li.querySelectorAll('.form-sub-label-container');
                    console.log('    Found', subContainers.length, 'sub-containers');

                    subContainers.forEach(function(container, i) {
                        container.style.setProperty('display', 'inline-flex', 'important');
                        container.style.setProperty('flex-direction', 'column', 'important');
                        container.style.setProperty('align-items', 'flex-start', 'important');
                        container.style.setProperty('margin-right', '0', 'important');

                        if (isMobile) {
                            container.style.setProperty('width', '100%', 'important');
                            container.style.setProperty('margin-bottom', '0.5rem', 'important');
                        } else {
                            container.style.setProperty('width', 'auto', 'important');
                            container.style.setProperty('margin-bottom', '0', 'important');
                        }
                        console.log('      Styled sub-container', i);
                    });

                    // Style selects within birth date
                    selects.forEach(function(select) {
                        select.style.setProperty('box-sizing', 'border-box', 'important');
                        if (isMobile) {
                            select.style.setProperty('width', '100%', 'important');
                            select.style.setProperty('max-width', '100%', 'important');
                        }
                    });

                    // Style the form-line itself
                    li.style.setProperty('display', 'block', 'important');
                    li.style.setProperty('clear', 'both', 'important');
                    li.style.setProperty('width', '100%', 'important');
                    li.style.setProperty('max-width', '100%', 'important');
                    li.style.setProperty('margin-bottom', '1rem', 'important');
                    li.style.setProperty('overflow', 'hidden', 'important');

                } else if (textInputs.length > 0) {
                    // This is an email/text field - style it nicely
                    console.log('  📧 Li', liIndex, 'is text/email field');

                    // Style the form-line as a clean block
                    li.style.setProperty('display', 'block', 'important');
                    li.style.setProperty('clear', 'both', 'important');
                    li.style.setProperty('width', '100%', 'important');
                    li.style.setProperty('max-width', '100%', 'important');
                    li.style.setProperty('margin-bottom', '1rem', 'important');
                    li.style.setProperty('padding', '0.5rem 0', 'important');
                    li.style.setProperty('overflow', 'hidden', 'important');

                    // Style the label
                    var labels = li.querySelectorAll('.form-label-left, .form-label-top, label.form-label');
                    labels.forEach(function(label) {
                        label.style.setProperty('display', 'block', 'important');
                        label.style.setProperty('margin-bottom', '0.5rem', 'important');
                        label.style.setProperty('font-weight', '600', 'important');
                        label.style.setProperty('color', '#333', 'important');
                    });

                    // Style the input wrapper
                    var formInput = li.querySelector('.form-input');
                    if (formInput) {
                        formInput.style.setProperty('display', 'block', 'important');
                        formInput.style.setProperty('width', '100%', 'important');
                        formInput.style.setProperty('max-width', '100%', 'important');
                    }

                    // Style text inputs
                    textInputs.forEach(function(input) {
                        input.style.setProperty('width', '100%', 'important');
                        input.style.setProperty('box-sizing', 'border-box', 'important');
                        input.style.setProperty('padding', '0.75rem 1rem', 'important');
                        input.style.setProperty('border', '2px solid #999', 'important');
                        input.style.setProperty('border-radius', '10px', 'important');
                        input.style.setProperty('font-size', '1rem', 'important');
                        input.style.setProperty('background', '#fff', 'important');

                        if (isMobile) {
                            input.style.setProperty('max-width', '100%', 'important');
                        } else {
                            input.style.setProperty('max-width', '400px', 'important');
                        }
                    });

                    // Style label messages (helper text)
                    var labelMessages = li.querySelectorAll('.label-message');
                    labelMessages.forEach(function(msg) {
                        msg.style.setProperty('display', 'block', 'important');
                        msg.style.setProperty('margin-top', '0.25rem', 'important');
                        msg.style.setProperty('font-size', '0.85rem', 'important');
                        msg.style.setProperty('color', '#666', 'important');
                        msg.style.setProperty('font-style', 'italic', 'important');
                    });
                }
            });

            // Also find embedded forms directly (in case structure is different)
            var embeddedForms = document.querySelectorAll('.embedded_form .form-all');
            embeddedForms.forEach(function(form) {
                // Style the form-section as block (don't force flex on parent)
                var formSection = form.querySelector('.form-section, ul.form-section');
                if (formSection) {
                    formSection.style.setProperty('display', 'block', 'important');
                    formSection.style.setProperty('list-style', 'none', 'important');
                    formSection.style.setProperty('padding', '0', 'important');
                    formSection.style.setProperty('margin', '0', 'important');
                    formSection.style.setProperty('width', '100%', 'important');
                    formSection.style.setProperty('max-width', '100%', 'important');
                }
            });

            console.log('✅ Form section styling applied');
        }

        // =========================================================
        // ADD ICONS TO SECTION TITLES
        // Adds SVG icons to "Your Information" and "Payment Information"
        // =========================================================
        function addSectionIcons() {
            console.log('🎨 addSectionIcons() called');

            // Define icons for each section
            var sectionIcons = {
                'ReserversInformation': {
                    name: 'Your Information',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
                },
                'Payment': {
                    name: 'Payment Information',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>'
                },
                'Summary': {
                    name: 'Summary',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'
                }
            };

            Object.keys(sectionIcons).forEach(function(sectionId) {
                var section = document.getElementById(sectionId);
                if (!section) return;

                // Find the title element
                var titleEl = section.querySelector('.title.large span.bold, .title span.bold, .clearfix.title span.bold');
                if (!titleEl) {
                    titleEl = section.querySelector('.title.large, .clearfix.title.large');
                }
                if (!titleEl) return;

                // Check if icon already added
                if (titleEl.parentElement.querySelector('.pv-section-icon')) return;

                var config = sectionIcons[sectionId];
                console.log('  Adding icon to', sectionId);

                // Create icon wrapper
                var iconWrapper = document.createElement('span');
                iconWrapper.className = 'pv-section-icon';
                iconWrapper.innerHTML = config.icon;
                iconWrapper.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; min-width: 32px; background: rgba(230, 126, 34, 0.1); border-radius: 8px; margin-right: 12px; vertical-align: middle;';

                // Style the SVG inside
                var svg = iconWrapper.querySelector('svg');
                if (svg) {
                    svg.style.cssText = 'width: 18px; height: 18px; color: #E67E22; stroke: #E67E22;';
                }

                // Insert icon before title text
                if (titleEl.tagName === 'SPAN') {
                    titleEl.parentElement.insertBefore(iconWrapper, titleEl);
                    // Also style the title container
                    titleEl.parentElement.style.cssText = 'display: flex !important; align-items: center !important;';
                } else {
                    titleEl.insertBefore(iconWrapper, titleEl.firstChild);
                    titleEl.style.cssText = 'display: flex !important; align-items: center !important;';
                }
            });

            console.log('✅ Section icons added');
        }

        // =========================================================
        // AUTO-POPULATE YOUR INFORMATION FROM RESERVATION
        // Copies first/last name from first reservation to billing info
        // Also sets country to United States by default
        // =========================================================
        function autoPopulateYourInformation() {
            console.log('🔄 autoPopulateYourInformation() called');

            // Flag to track if we've already populated (don't overwrite user edits)
            var hasPopulated = {
                firstName: false,
                lastName: false,
                country: false
            };

            // Find Your Information section fields
            var reserversSection = document.querySelector('#ReserversInformation');
            if (!reserversSection) {
                console.log('  ❌ ReserversInformation section not found');
                return;
            }

            // Find the Your Information input fields by common patterns
            var yourFirstName = reserversSection.querySelector('input[name*="firstName"], input[id*="FirstName"], input[name*="first_name"]');
            var yourLastName = reserversSection.querySelector('input[name*="lastName"], input[id*="LastName"], input[name*="last_name"]');
            var yourCountry = reserversSection.querySelector('select[name*="country"], select[id*="Country"]');

            console.log('  📋 Your Info fields - firstName:', !!yourFirstName, 'lastName:', !!yourLastName, 'country:', !!yourCountry);

            // Set default country to United States if empty
            if (yourCountry && !yourCountry.value) {
                // Try common values for United States
                var usValues = ['United States', 'US', 'USA', 'United States of America'];
                var options = yourCountry.options;

                for (var i = 0; i < options.length; i++) {
                    var optText = options[i].text.trim();
                    var optVal = options[i].value.trim();

                    if (usValues.indexOf(optText) !== -1 || usValues.indexOf(optVal) !== -1) {
                        yourCountry.value = options[i].value;
                        yourCountry.dispatchEvent(new Event('change', { bubbles: true }));
                        hasPopulated.country = true;
                        console.log('  🌍 Country set to:', optText);
                        break;
                    }
                }
            }

            // Function to copy value from reservation to Your Information
            function copyToYourInfo(sourceInput, targetInput, fieldName) {
                if (!sourceInput || !targetInput) return;

                // Listen for blur (when user leaves field) and input events
                sourceInput.addEventListener('blur', function() {
                    var value = sourceInput.value.trim();

                    // Only populate if target is empty and source has value
                    if (value && !targetInput.value.trim() && !hasPopulated[fieldName]) {
                        targetInput.value = value;
                        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                        hasPopulated[fieldName] = true;
                        console.log('  ✅ Auto-populated', fieldName, ':', value);
                    }
                });

                // Also listen for changes in case populated programmatically
                sourceInput.addEventListener('change', function() {
                    var value = sourceInput.value.trim();

                    if (value && !targetInput.value.trim() && !hasPopulated[fieldName]) {
                        targetInput.value = value;
                        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                        hasPopulated[fieldName] = true;
                        console.log('  ✅ Auto-populated', fieldName, ':', value);
                    }
                });
            }

            // Set up listener for first reservation row
            function setupReservationListeners() {
                // Find first reservation's name inputs
                // Pattern: input[name="firstname_res1"] or input[id*="firstName"]
                var firstResFirstName = document.querySelector('.reservation input[name^="firstname"], .reservation input[id*="firstName"]');
                var firstResLastName = document.querySelector('.reservation input[name^="lastname"], .reservation input[id*="lastName"]');

                console.log('  📝 Reservation inputs - firstName:', !!firstResFirstName, 'lastName:', !!firstResLastName);

                if (firstResFirstName && yourFirstName) {
                    copyToYourInfo(firstResFirstName, yourFirstName, 'firstName');
                }

                if (firstResLastName && yourLastName) {
                    copyToYourInfo(firstResLastName, yourLastName, 'lastName');
                }
            }

            // Initial setup
            setupReservationListeners();

            // Also watch for new reservations being added (DOM changes)
            var registerBody = document.querySelector('#RegisterBody');
            if (registerBody) {
                var observer = new MutationObserver(function(mutations) {
                    // Check if new reservation was added
                    mutations.forEach(function(mutation) {
                        if (mutation.addedNodes.length > 0) {
                            // Re-setup listeners after short delay for DOM to settle
                            setTimeout(setupReservationListeners, 100);
                        }
                    });
                });
                observer.observe(registerBody, { childList: true, subtree: true });
            }

            console.log('✅ Auto-populate listeners set up');
        }

        // Force form input styles
        function forceFormInputStyles() {
            // Only target inputs within the registration form, not the entire page
            var form = document.querySelector('form#RegisterSinglePage');
            if (!form) return;

            var isMobile = window.innerWidth < 768;

            var inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(function(input) {
                if (input.type === 'hidden' || input.type === 'checkbox' || input.type === 'radio' ||
                    input.type === 'submit' || input.type === 'button' || input.type === 'image') return;
                if (input.closest('nav, header, .nav, .header, .menu, #footer, .footer, .footer3')) return;

                // Check if input is in a reservation row (has grid column parent)
                var isInReservationGrid = input.closest('.g120, .g140, .g100');

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

                // Only set 100% width on mobile OR for non-reservation inputs
                if (isMobile || !isInReservationGrid) {
                    input.style.setProperty('width', '100%', 'important');
                    input.style.setProperty('max-width', '100%', 'important');
                } else {
                    // Desktop reservation inputs - let CSS handle width
                    input.style.removeProperty('width');
                    input.style.removeProperty('max-width');
                }

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

        // =========================================================
        // MOVE SUMMARY SECTION TO BOTTOM OF FORM (before Buttons)
        // =========================================================
        function moveSummaryToBottom() {
            var summarySection = document.querySelector('#Summary');
            var buttonsSection = document.querySelector('#Buttons');

            if (summarySection && buttonsSection && !summarySection.classList.contains('pv-summary-moved')) {
                summarySection.classList.add('pv-summary-moved');
                buttonsSection.parentNode.insertBefore(summarySection, buttonsSection);
                console.log('✅ Summary moved before #Buttons');
            }
        }

        // Run single event functions
        styleInfoCards();
        moveSummaryToBottom();
        stylePricingSection();
        removeDashedBorders();
        styleDeleteButtons();
        addSectionIcons();
        fixReservationLayout();
        fixEmbeddedFormLayout();
        forceFormInputStyles();
        autoPopulateYourInformation();
        setTimeout(fixReservationLayout, 300);
        setTimeout(fixReservationLayout, 800);
        setTimeout(fixEmbeddedFormLayout, 500);
        setTimeout(forceFormInputStyles, 300);
        setTimeout(forceFormInputStyles, 800);
        setTimeout(forceFormInputStyles, 1500);
        setTimeout(forceFormInputStyles, 3000);
        // Delayed auto-populate setup (wait for form sections to be visible)
        setTimeout(autoPopulateYourInformation, 500);
        setTimeout(autoPopulateYourInformation, 1500);

        // Watch for DOM changes
        var registerBody = document.querySelector('#RegisterBody');
        if (registerBody) {
            var observer = new MutationObserver(function() {
                styleDeleteButtons();
                fixReservationLayout();
                fixEmbeddedFormLayout();
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

        // =========================================================
        // RESIZE LISTENER - Handle device rotation and window resize
        // =========================================================
        var resizeDebounce = null;
        window.addEventListener('resize', function() {
            clearTimeout(resizeDebounce);
            resizeDebounce = setTimeout(function() {
                console.log('📐 Window resized, re-applying responsive layouts');
                fixReservationLayout();
                fixEmbeddedFormLayout();
            }, 150);
        });

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
        var fullText = html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '').trim();

        console.log('📄 parseEventContent - RAW TEXT:', fullText);
        console.log('📄 parseEventContent - HTML:', html.substring(0, 500));

        var result = {
            description: [],
            dateTime: [],
            location: [],
            pricing: [],
            other: []
        };

        // =========================================================
        // FIRST: Check for markers (#LOCATION:, #DATETIME:, #PRICING:)
        // =========================================================
        var hasMarkers = /#(LOCATION|DATETIME|PRICING):/i.test(fullText);
        console.log('📄 hasMarkers:', hasMarkers);

        if (hasMarkers) {
            // Extract #LOCATION: marker (use [\s\S] for multiline instead of 's' flag)
            var locationMatch = fullText.match(/#LOCATION:\s*([\s\S]+?)(?=#DATETIME:|#PRICING:|$)/i);
            console.log('📄 locationMatch:', locationMatch);
            if (locationMatch) {
                result.location.push(locationMatch[1].trim());
                fullText = fullText.replace(/#LOCATION:\s*[\s\S]+?(?=#DATETIME:|#PRICING:|$)/i, '');
            }

            // Extract #DATETIME: marker
            var datetimeMatch = fullText.match(/#DATETIME:\s*([\s\S]+?)(?=#LOCATION:|#PRICING:|$)/i);
            console.log('📄 datetimeMatch:', datetimeMatch);
            if (datetimeMatch) {
                result.dateTime.push(datetimeMatch[1].trim());
                fullText = fullText.replace(/#DATETIME:\s*[\s\S]+?(?=#LOCATION:|#PRICING:|$)/i, '');
            }

            // Extract #PRICING: marker
            var pricingMatch = fullText.match(/#PRICING:\s*([^\n#]+)/i);
            console.log('📄 pricingMatch:', pricingMatch);
            if (pricingMatch) {
                result.pricing.push(pricingMatch[1].trim());
                fullText = fullText.replace(/#PRICING:\s*[^\n#]+/i, '');
            }

            // Remaining text is description - preserve paragraphs
            var descText = fullText
                .replace(/\n{3,}/g, '\n\n')  // Normalize multiple breaks to double
                .replace(/\n\n/g, '{{PARA}}')  // Mark paragraph breaks
                .replace(/\n/g, ' ')  // Single newlines become spaces
                .replace(/\s+/g, ' ')  // Collapse multiple spaces
                .replace(/\{\{PARA\}\}/g, '<br><br>')  // Restore paragraph breaks
                .trim();
            if (descText) {
                result.description.push(descText);
            }

            console.log('📄 FINAL RESULT (markers):', result);
            return result;
        }

        // =========================================================
        // FALLBACK: Pattern-based parsing (no markers found)
        // =========================================================
        var lines = html.split(/<br\s*\/?>/gi).map(function(line) {
            return line.replace(/<[^>]*>/g, "").trim();
        }).filter(function(line) {
            return line.length > 0;
        });

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
            console.log('💰 Parsing pricing line:', line);

            // Check if line has pipe separators (multiple prices)
            if (line.indexOf('|') !== -1) {
                var segments = line.split('|');
                segments.forEach(function(segment) {
                    segment = segment.trim();
                    // Match price pattern: "Label $XX" or just "$XX"
                    var priceMatch = segment.match(/^(.+?)\s*\$(\d+(?:,\d{3})*)$/);
                    if (priceMatch) {
                        var label = priceMatch[1].trim();
                        var amount = '$' + priceMatch[2];
                        if (label) {
                            prices.push({ label: label, amount: amount });
                            console.log('  💰 Found:', label, amount);
                        }
                    } else {
                        // Try just a price
                        var justPrice = segment.match(/\$(\d+(?:,\d{3})*)/);
                        if (justPrice) {
                            // Use segment text before $ as label
                            var labelPart = segment.split('$')[0].trim();
                            prices.push({ label: labelPart || 'Ticket', amount: '$' + justPrice[1] });
                            console.log('  💰 Found (alt):', labelPart || 'Ticket', '$' + justPrice[1]);
                        }
                    }
                });
            } else {
                // Single price line
                var match = line.match(/\$(\d+(?:,\d{3})*)/);
                if (match) {
                    var amount = "$" + match[1];
                    var label = line.replace(/\$\d+(?:,\d{3})*/, "").replace(/[-:]/g, "").trim();
                    if (!label) label = "Ticket";
                    prices.push({ label: label, amount: amount });
                    console.log('  💰 Found (single):', label, amount);
                }
            }
        });
        console.log('💰 Final prices:', prices);
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
