// PARADISE VALLEY EVENTS - GRID LAYOUT VERSION
// Paste this in browser console on: https://www.jewishparadisevalley.com/tools/events/default.htm
(function() {
    console.log("=== PARADISE VALLEY EVENTS - GRID LAYOUT ===");

    // Only run on events pages
    if (!window.location.pathname.includes("/tools/events/")) {
        console.log("Not on events page, exiting");
        return;
    }

    // Remove existing styles if re-running
    var existingStyle = document.getElementById("pv-events-styles");
    if (existingStyle) existingStyle.remove();

    // Inject Google Font
    if (!document.getElementById("pv-urbanist-font")) {
        var fontLink = document.createElement("link");
        fontLink.id = "pv-urbanist-font";
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap";
        document.head.appendChild(fontLink);
    }

    // =========================================================
    // CSS STYLES - GRID LAYOUT (60% LARGER)
    // =========================================================
    var css = `
        /* Page Background - White */
        body.cco_body {
            background: #ffffff !important;
        }

        /* =========================================================
           PAGE TITLE STYLING
           ========================================================= */
        .pv-styled-title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 5rem !important;
            font-weight: 800 !important;
            color: #E67E22 !important;
            text-align: center !important;
            margin: 2rem auto 0.75rem !important;
            padding: 0 1.5rem !important;
            background: none !important;
            letter-spacing: -2px !important;
        }

        #pv-title-accent {
            width: 80px !important;
            height: 5px !important;
            background: linear-gradient(90deg, #2980b9, #E67E22) !important;
            margin: 1rem auto 2.5rem !important;
            border-radius: 3px !important;
        }

        /* =========================================================
           EVENTS GRID CONTAINER
           ========================================================= */
        .pv-events-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(480px, 1fr)) !important;
            gap: 2.5rem !important;
            max-width: 1600px !important;
            margin: 0 auto !important;
            padding: 0 2rem 3rem !important;
        }

        /* Hide original event content */
        .event.pv-modernized > .clearfix,
        .event.pv-modernized > .vertical_padding {
            display: none !important;
        }

        /* =========================================================
           EVENT CARD
           ========================================================= */
        .event.pv-modernized {
            background: #ffffff !important;
            border-radius: 20px !important;
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1) !important;
            overflow: hidden !important;
            transition: all 0.3s ease !important;
            font-family: 'Urbanist', sans-serif !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            display: flex !important;
            flex-direction: column !important;
        }

        .event.pv-modernized:hover {
            box-shadow: 0 16px 50px rgba(0, 0, 0, 0.15) !important;
            transform: translateY(-6px) !important;
        }

        /* =========================================================
           HEADER WITH IMAGE BANNER
           ========================================================= */
        .pv-event-header {
            position: relative !important;
            height: 280px !important;
            overflow: hidden !important;
            flex-shrink: 0 !important;
        }

        .pv-event-image {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 1 !important;
        }

        .pv-event-image img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
        }

        /* Gradient overlay */
        .pv-event-header::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 80% !important;
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%) !important;
            z-index: 2 !important;
            pointer-events: none !important;
        }

        .pv-header-content {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 3 !important;
            padding: 2rem 2.25rem !important;
        }

        .pv-event-category {
            display: inline-block !important;
            background: rgba(255,255,255,0.25) !important;
            color: #fff !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            padding: 0.5rem 1.25rem !important;
            border-radius: 16px !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            margin-bottom: 0.85rem !important;
        }

        .pv-event-title,
        h2.pv-event-title {
            font-size: 2.25rem !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            line-height: 1.25 !important;
            margin: 0 !important;
            text-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
            background: none !important;
            padding: 0 !important;
        }

        .pv-event-title a {
            color: #ffffff !important;
            text-decoration: none !important;
        }

        /* =========================================================
           EVENT BODY
           ========================================================= */
        .pv-event-body {
            padding: 2.25rem !important;
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
        }

        .pv-event-description {
            font-size: 1.5rem !important;
            color: #555 !important;
            line-height: 1.65 !important;
            margin-bottom: 1.75rem !important;
        }

        /* =========================================================
           INFO ROWS
           ========================================================= */
        .pv-event-info {
            border-top: 2px solid #f0f0f0 !important;
            padding-top: 1.75rem !important;
            margin-top: auto !important;
        }

        .pv-info-row {
            display: flex !important;
            align-items: flex-start !important;
            margin-bottom: 1.5rem !important;
            gap: 1.25rem !important;
        }

        .pv-info-row:last-child {
            margin-bottom: 0 !important;
        }

        .pv-info-icon {
            width: 60px !important;
            height: 60px !important;
            background: #F5F5F5 !important;
            border-radius: 14px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
        }

        .pv-info-icon svg {
            width: 32px !important;
            height: 32px !important;
            color: #2980b9 !important;
        }

        .pv-info-content {
            flex: 1 !important;
            min-width: 0 !important;
        }

        .pv-info-label {
            font-size: 1rem !important;
            font-weight: 700 !important;
            color: #999 !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
            margin-bottom: 0.35rem !important;
            display: block !important;
        }

        .pv-info-value {
            font-size: 1.5rem !important;
            color: #333 !important;
            font-weight: 500 !important;
            line-height: 1.5 !important;
        }

        /* =========================================================
           PRICING
           ========================================================= */
        .pv-pricing-grid {
            display: flex !important;
            gap: 1.25rem !important;
            margin-top: 1.75rem !important;
            flex-wrap: wrap !important;
        }

        .pv-price-item {
            background: #FFF8F0 !important;
            padding: 1rem 1.5rem !important;
            border-radius: 14px !important;
            text-align: center !important;
            flex: 1 !important;
            min-width: 120px !important;
        }

        .pv-price-label {
            font-size: 1rem !important;
            color: #888 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            display: block !important;
            margin-bottom: 0.25rem !important;
        }

        .pv-price-value {
            font-size: 2rem !important;
            font-weight: 800 !important;
            color: #E67E22 !important;
        }

        /* =========================================================
           FOOTER
           ========================================================= */
        .pv-event-footer {
            background: #FAFAFA !important;
            padding: 1.75rem 2.25rem !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-top: 2px solid #f0f0f0 !important;
            gap: 1.5rem !important;
            flex-wrap: wrap !important;
        }

        .pv-date-display {
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
        }

        .pv-date-box {
            background: #2980b9 !important;
            color: #fff !important;
            padding: 0.75rem 1.25rem !important;
            border-radius: 12px !important;
            text-align: center !important;
            min-width: 70px !important;
        }

        .pv-date-month {
            font-size: 1rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            display: block !important;
            color: #fff !important;
        }

        .pv-date-day {
            font-size: 2rem !important;
            font-weight: 800 !important;
            line-height: 1.1 !important;
            display: block !important;
            color: #fff !important;
        }

        .pv-date-text {
            font-size: 1.4rem !important;
            color: #666 !important;
            font-weight: 500 !important;
        }

        /* Footer actions */
        .pv-footer-actions {
            display: flex !important;
            align-items: center !important;
            gap: 1.25rem !important;
        }

        .pv-login-checkbox {
            display: flex !important;
            align-items: center !important;
            gap: 0.6rem !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.1rem !important;
            color: #666 !important;
            cursor: pointer !important;
        }

        .pv-login-checkbox input[type="checkbox"] {
            width: 20px !important;
            height: 20px !important;
            accent-color: #2980b9 !important;
            cursor: pointer !important;
        }

        .pv-login-checkbox span {
            font-weight: 500 !important;
        }

        /* Register Button */
        .pv-register-btn {
            display: inline-flex !important;
            align-items: center !important;
            gap: 0.75rem !important;
            background: #E67E22 !important;
            color: #fff !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.4rem !important;
            font-weight: 700 !important;
            padding: 1.1rem 2rem !important;
            border-radius: 14px !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3) !important;
            border: none !important;
            white-space: nowrap !important;
        }

        .pv-register-btn:hover {
            background: #D35400 !important;
            transform: scale(1.03) !important;
            color: #fff !important;
        }

        .pv-register-btn svg {
            width: 24px !important;
            height: 24px !important;
            color: #fff !important;
        }

        /* =========================================================
           RESPONSIVE - TABLET
           ========================================================= */
        @media (max-width: 1100px) {
            .pv-events-grid {
                grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)) !important;
                gap: 2rem !important;
                padding: 0 1.5rem 2.5rem !important;
            }

            .pv-styled-title {
                font-size: 4rem !important;
            }

            .pv-event-header {
                height: 240px !important;
            }

            .pv-event-title,
            h2.pv-event-title {
                font-size: 2rem !important;
            }

            .pv-event-description {
                font-size: 1.3rem !important;
            }

            .pv-info-value {
                font-size: 1.3rem !important;
            }
        }

        /* =========================================================
           RESPONSIVE - MOBILE (Single Column)
           ========================================================= */
        @media (max-width: 520px) {
            .pv-events-grid {
                grid-template-columns: 1fr !important;
                gap: 1.75rem !important;
                padding: 0 1rem 2rem !important;
            }

            .pv-styled-title {
                font-size: 2.75rem !important;
            }

            #pv-title-accent {
                margin-bottom: 2rem !important;
            }

            .pv-event-header {
                height: 200px !important;
            }

            .pv-header-content {
                padding: 1.5rem !important;
            }

            .pv-event-category {
                font-size: 0.85rem !important;
                padding: 0.4rem 1rem !important;
            }

            .pv-event-title,
            h2.pv-event-title {
                font-size: 1.75rem !important;
            }

            .pv-event-body {
                padding: 1.5rem !important;
            }

            .pv-event-description {
                font-size: 1.2rem !important;
            }

            .pv-info-icon {
                width: 48px !important;
                height: 48px !important;
            }

            .pv-info-icon svg {
                width: 26px !important;
                height: 26px !important;
            }

            .pv-info-label {
                font-size: 0.85rem !important;
            }

            .pv-info-value {
                font-size: 1.2rem !important;
            }

            .pv-price-value {
                font-size: 1.6rem !important;
            }

            .pv-event-footer {
                padding: 1.25rem 1.5rem !important;
            }

            .pv-date-day {
                font-size: 1.6rem !important;
            }

            .pv-date-text {
                font-size: 1.1rem !important;
            }

            .pv-register-btn {
                flex: 1 !important;
                justify-content: center !important;
                font-size: 1.2rem !important;
                padding: 1rem 1.5rem !important;
            }

            .pv-footer-actions {
                flex-direction: column !important;
                width: 100% !important;
                gap: 1rem !important;
            }

            .pv-login-checkbox {
                font-size: 1rem !important;
            }
        }
    `;

    var styleEl = document.createElement("style");
    styleEl.id = "pv-events-styles";
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

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

        var contactPattern = /\b(sponsor|reach out|contact|email|call|rabbi|please|includes|preferred|seating|meet and greet|exclusive)\b/i;

        lines.forEach(function(line) {
            if (pricePattern.test(line)) {
                result.pricing.push(line);
                foundStructuredContent = true;
            } else if (dayPattern.test(line) || timePattern.test(line)) {
                result.dateTime.push(line);
                foundStructuredContent = true;
            } else if (addressPattern.test(line) || cityStatePattern.test(line)) {
                result.location.push(line);
                foundStructuredContent = true;
            } else if (!foundStructuredContent) {
                result.description.push(line);
            } else {
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
                // Shorten labels for compact view
                if (label.length > 15) {
                    label = label.substring(0, 12) + "...";
                }
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
            console.log("Could not find title, skipping event");
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
            newHTML += '<span class="pv-info-value">' + parsed.dateTime[0] + '</span>';
            newHTML += '</div></div>';
        }

        // Location row
        if (parsed.location.length > 0) {
            newHTML += '<div class="pv-info-row">';
            newHTML += '<div class="pv-info-icon">' + icons.location + '</div>';
            newHTML += '<div class="pv-info-content">';
            newHTML += '<span class="pv-info-label">Where</span>';
            newHTML += '<span class="pv-info-value">' + parsed.location[0] + '</span>';
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

        console.log("Transformed event: " + title);
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

        console.log("Created grid container with " + events.length + " events");
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

        if (pageTitle) {
            pageTitle.classList.add('pv-styled-title');

            if (!document.getElementById('pv-title-accent')) {
                var accent = document.createElement('div');
                accent.id = 'pv-title-accent';
                pageTitle.parentNode.insertBefore(accent, pageTitle.nextSibling);
            }

            console.log("Page title styled");
        }
    }

    // =========================================================
    // MAIN EXECUTION
    // =========================================================

    // Style page title first
    stylePageTitle();

    // Wrap events in grid container
    wrapEventsInGrid();

    // Transform all events
    var events = document.querySelectorAll(".event");
    console.log("Found " + events.length + " events");

    events.forEach(function(eventEl) {
        try {
            transformEvent(eventEl);
        } catch (e) {
            console.error("Error transforming event:", e);
        }
    });

    console.log("Paradise Valley Events Grid Layout complete!");
    console.log("To undo: refresh the page");

    // Helper to undo
    window.pvUndo = function() {
        var grid = document.querySelector('.pv-events-grid');
        if (grid) {
            var parent = grid.parentNode;
            var events = grid.querySelectorAll('.event');
            events.forEach(function(event) {
                parent.insertBefore(event, grid);
            });
            grid.remove();
        }

        document.querySelectorAll(".event.pv-modernized").forEach(function(el) {
            el.classList.remove("pv-modernized");
            var header = el.querySelector(".pv-event-header");
            var body = el.querySelector(".pv-event-body");
            var footer = el.querySelector(".pv-event-footer");
            if (header) header.remove();
            if (body) body.remove();
            if (footer) footer.remove();
        });

        var originalTitle = document.querySelector('h1');
        if (originalTitle) {
            originalTitle.classList.remove('pv-styled-title');
            originalTitle.style.cssText = '';
        }

        var style = document.getElementById("pv-events-styles");
        if (style) style.remove();
        var accent = document.getElementById("pv-title-accent");
        if (accent) accent.remove();

        console.log("Reverted to original");
    };
})();
