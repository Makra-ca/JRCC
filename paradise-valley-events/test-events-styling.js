// PARADISE VALLEY EVENTS - DOM Restructuring + Styling
// Paste this in browser console on: https://www.jewishparadisevalley.com/tools/events/default.htm
(function() {
    console.log("=== PARADISE VALLEY EVENTS MODERNIZER ===");

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
    // CSS STYLES (matching mockup-3-minimal-elegant.html)
    // =========================================================
    var css = `
        /* Page Background - White like mockup */
        body.cco_body {
            background: #ffffff !important;
        }

        /* Hide original event content */
        .event.pv-modernized > .clearfix,
        .event.pv-modernized > .vertical_padding {
            display: none !important;
        }

        /* Event Card */
        .event.pv-modernized {
            background: #ffffff !important;
            border-radius: 24px !important;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06) !important;
            margin-bottom: 2.5rem !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 1100px !important;
            overflow: hidden !important;
            transition: all 0.4s ease !important;
            font-family: 'Urbanist', sans-serif !important;
            border: none !important;
            padding: 0 !important;
        }

        .event.pv-modernized:hover {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1) !important;
            transform: translateY(-8px) !important;
        }

        /* Header with Image as Banner */
        .pv-event-header {
            position: relative !important;
            min-height: 280px !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: flex-end !important;
        }

        /* Image as full background */
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

        /* Dark gradient overlay for text readability */
        .pv-event-header::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 70% !important;
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%) !important;
            z-index: 2 !important;
            pointer-events: none !important;
        }

        .pv-header-content {
            position: relative !important;
            z-index: 3 !important;
            padding: 2rem 2.5rem !important;
            width: 100% !important;
        }

        .pv-event-category {
            display: inline-block !important;
            background: rgba(255,255,255,0.2) !important;
            color: #fff !important;
            font-size: 0.95rem !important;
            font-weight: 600 !important;
            padding: 0.5rem 1.2rem !important;
            border-radius: 20px !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            margin-bottom: 0.75rem !important;
            width: fit-content !important;
        }

        .pv-event-title,
        .pv-event-header .pv-event-title,
        .pv-header-content .pv-event-title,
        h2.pv-event-title {
            font-size: 2.8rem !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            line-height: 1.25 !important;
            margin: 0 !important;
            text-shadow: none !important;
            background: none !important;
            padding: 0 !important;
            letter-spacing: -0.5px !important;
        }

        .pv-event-title a,
        .pv-event-header a,
        .pv-header-content a {
            color: #ffffff !important;
            text-decoration: none !important;
        }

        /* Body */
        .pv-event-body {
            padding: 3rem !important;
        }

        .pv-event-description {
            font-size: 1.4rem !important;
            color: #333 !important;
            line-height: 1.7 !important;
            margin-bottom: 2rem !important;
        }

        /* Info Rows */
        .pv-event-info {
            border-top: 1px solid #f0f0f0 !important;
            padding-top: 1.5rem !important;
        }

        .pv-info-row {
            display: flex !important;
            align-items: flex-start !important;
            margin-bottom: 1rem !important;
            padding-bottom: 1rem !important;
            border-bottom: 1px dashed #eee !important;
        }

        .pv-info-row:last-child {
            border-bottom: none !important;
            margin-bottom: 0 !important;
        }

        .pv-info-icon {
            width: 56px !important;
            height: 56px !important;
            background: #F5F5F5 !important;
            border-radius: 14px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin-right: 1.5rem !important;
            flex-shrink: 0 !important;
        }

        .pv-info-icon svg {
            width: 28px !important;
            height: 28px !important;
            color: #2980b9 !important;
        }

        .pv-info-content {
            flex: 1 !important;
        }

        .pv-info-label {
            font-size: 0.85rem !important;
            font-weight: 700 !important;
            color: #999 !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
            margin-bottom: 0.35rem !important;
            display: block !important;
        }

        .pv-info-value {
            font-size: 1.4rem !important;
            color: #222 !important;
            font-weight: 600 !important;
            display: block !important;
            line-height: 1.5 !important;
        }

        .pv-info-value small {
            color: #888 !important;
            font-weight: 400 !important;
        }

        /* Pricing Grid */
        .pv-pricing-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
            gap: 1rem !important;
            margin-top: 2rem !important;
        }

        .pv-price-item {
            background: #F8F8F8 !important;
            padding: 1.25rem 1.5rem !important;
            border-radius: 14px !important;
            text-align: center !important;
            transition: all 0.3s ease !important;
        }

        .pv-price-item:hover {
            background: #FFF5EB !important;
        }

        .pv-price-label {
            font-size: 0.9rem !important;
            color: #666 !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            margin-bottom: 0.5rem !important;
            display: block !important;
        }

        .pv-price-value {
            font-size: 2.2rem !important;
            font-weight: 800 !important;
            color: #E67E22 !important;
            display: block !important;
        }

        /* Footer */
        .pv-event-footer {
            background: #FAFAFA !important;
            padding: 1.5rem 2rem !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-top: 1px solid #f0f0f0 !important;
            flex-wrap: wrap !important;
            gap: 1rem !important;
        }

        .pv-date-display {
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
        }

        .pv-footer-actions {
            display: flex !important;
            align-items: center !important;
            gap: 1.5rem !important;
        }

        .pv-login-checkbox {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1rem !important;
            color: #555 !important;
            cursor: pointer !important;
        }

        .pv-login-checkbox input[type="checkbox"] {
            width: 18px !important;
            height: 18px !important;
            cursor: pointer !important;
            accent-color: #2980b9 !important;
        }

        .pv-login-checkbox span {
            color: #2980b9 !important;
            font-weight: 500 !important;
        }

        .pv-date-box {
            background: #2980b9 !important;
            color: #fff !important;
            padding: 0.6rem 0.9rem !important;
            border-radius: 10px !important;
            text-align: center !important;
            min-width: 60px !important;
        }

        .pv-date-month {
            font-size: 0.7rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            display: block !important;
            color: #fff !important;
        }

        .pv-date-day {
            font-size: 1.6rem !important;
            font-weight: 800 !important;
            line-height: 1.1 !important;
            display: block !important;
            color: #fff !important;
        }

        .pv-date-text {
            font-size: 1.15rem !important;
            color: #555 !important;
        }

        /* =========================================================
           SCROLL INDICATOR - Shows when multiple events exist
           ========================================================= */
        .pv-scroll-indicator {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 1.5rem !important;
            margin: -1rem auto 2rem !important;
            max-width: 1100px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
        }

        .pv-scroll-indicator:hover {
            transform: translateY(4px) !important;
        }

        .pv-scroll-indicator-text {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            color: #888 !important;
            margin-bottom: 0.5rem !important;
            letter-spacing: 0.5px !important;
        }

        .pv-scroll-indicator-arrow {
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            background: #f5f5f5 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            animation: pvBounce 2s ease-in-out infinite !important;
        }

        .pv-scroll-indicator-arrow svg {
            width: 20px !important;
            height: 20px !important;
            color: #2980b9 !important;
        }

        @keyframes pvBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(6px); }
        }

        /* Event Counter Badge */
        .pv-event-counter {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            background: rgba(41, 128, 185, 0.95) !important;
            color: #fff !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 0.9rem !important;
            font-weight: 600 !important;
            padding: 0.75rem 1.25rem !important;
            border-radius: 30px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
            z-index: 1000 !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            transition: all 0.3s ease !important;
        }

        .pv-event-counter:hover {
            background: rgba(41, 128, 185, 1) !important;
            transform: scale(1.05) !important;
        }

        .pv-event-counter-dot {
            width: 8px !important;
            height: 8px !important;
            border-radius: 50% !important;
            background: rgba(255,255,255,0.5) !important;
            transition: all 0.3s ease !important;
        }

        .pv-event-counter-dot.active {
            background: #fff !important;
            transform: scale(1.3) !important;
        }

        /* Hide counter on mobile - takes up too much space */
        @media (max-width: 550px) {
            .pv-event-counter {
                bottom: 10px !important;
                right: 10px !important;
                padding: 0.5rem 1rem !important;
                font-size: 0.8rem !important;
            }
        }

        /* Register Button */
        .pv-register-btn {
            display: inline-flex !important;
            align-items: center !important;
            gap: 0.6rem !important;
            background: #E67E22 !important;
            color: #fff !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.2rem !important;
            font-weight: 700 !important;
            padding: 1.1rem 2.2rem !important;
            border-radius: 12px !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 20px rgba(230, 126, 34, 0.3) !important;
            border: none !important;
        }

        .pv-register-btn:hover {
            background: #D35400 !important;
            transform: scale(1.05) !important;
            box-shadow: 0 6px 25px rgba(230, 126, 34, 0.4) !important;
            color: #fff !important;
        }

        .pv-register-btn svg {
            width: 20px !important;
            height: 20px !important;
            transition: transform 0.3s ease !important;
            color: #fff !important;
        }

        .pv-register-btn:hover svg {
            transform: translateX(4px) !important;
        }

        /* Responsive - Large Tablet / Small Desktop */
        @media (max-width: 1150px) {
            .event.pv-modernized {
                margin-left: 2rem !important;
                margin-right: 2rem !important;
            }
        }

        /* Responsive - Tablet */
        @media (max-width: 900px) {
            .event.pv-modernized {
                margin-left: 1.5rem !important;
                margin-right: 1.5rem !important;
            }
            .pv-event-header {
                min-height: 220px !important;
            }
            .pv-event-title,
            .pv-event-header .pv-event-title,
            .pv-header-content .pv-event-title,
            h2.pv-event-title {
                font-size: 1.9rem !important;
                font-weight: 700 !important;
            }
            .pv-event-body {
                padding: 2.5rem !important;
            }
            .pv-event-description {
                font-size: 1.15rem !important;
            }
            .pv-info-value {
                font-size: 1.15rem !important;
            }
            .pv-info-icon {
                width: 50px !important;
                height: 50px !important;
            }
            .pv-info-icon svg {
                width: 24px !important;
                height: 24px !important;
            }
        }

        /* Responsive - Small Tablet */
        @media (max-width: 700px) {
            .pv-event-header {
                min-height: 200px !important;
            }
            .pv-event-title,
            .pv-event-header .pv-event-title,
            .pv-header-content .pv-event-title,
            h2.pv-event-title {
                font-size: 1.7rem !important;
            }
        }

        /* Responsive - Mobile */
        @media (max-width: 550px) {
            .event.pv-modernized {
                margin-left: 1rem !important;
                margin-right: 1rem !important;
                border-radius: 20px !important;
            }
            .pv-event-header {
                min-height: 180px !important;
            }
            .pv-header-content {
                padding: 1.25rem 1.5rem !important;
            }
            .pv-event-title,
            .pv-event-header .pv-event-title,
            .pv-header-content .pv-event-title,
            h2.pv-event-title {
                font-size: 1.5rem !important;
                color: #ffffff !important;
                font-weight: 700 !important;
            }
            .pv-event-body {
                padding: 1.5rem !important;
            }
            .pv-event-description {
                font-size: 1.05rem !important;
            }
            .pv-event-footer {
                flex-direction: column !important;
                gap: 1rem !important;
                padding: 1.25rem 1.5rem !important;
            }
            .pv-date-display {
                width: 100% !important;
                justify-content: center !important;
            }
            .pv-footer-actions {
                width: 100% !important;
                flex-direction: column !important;
                gap: 1rem !important;
            }
            .pv-login-checkbox {
                justify-content: center !important;
            }
            .pv-register-btn {
                width: 100% !important;
                justify-content: center !important;
            }
            .pv-pricing-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            .pv-info-row {
                flex-direction: column !important;
                align-items: flex-start !important;
            }
            .pv-info-icon {
                width: 44px !important;
                height: 44px !important;
                margin-bottom: 0.5rem !important;
            }
            .pv-info-icon svg {
                width: 22px !important;
                height: 22px !important;
            }
            .pv-info-value {
                font-size: 1rem !important;
            }
            .pv-price-value {
                font-size: 1.5rem !important;
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

        // Patterns for lines that should NOT be treated as location continuation
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

        // Find month
        for (var i = 0; i < months.length; i++) {
            if (firstLine.indexOf(months[i]) !== -1) {
                month = monthAbbr[i];
                break;
            }
        }

        // Find day number
        var dayMatch = firstLine.match(/\b(\d{1,2})\b/);
        if (dayMatch) {
            day = dayMatch[1];
        }

        // Find day of week
        var dayOfWeekMatch = firstLine.match(/\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/i);
        if (dayOfWeekMatch) {
            dayOfWeek = dayOfWeekMatch[1];
        }

        // Determine time of day
        var timeOfDay = "Evening";
        if (firstLine.toLowerCase().indexOf("morning") !== -1 || /\b([6-9]|10|11):?\d*\s*am\b/i.test(firstLine)) {
            timeOfDay = "Morning";
        } else if (firstLine.toLowerCase().indexOf("afternoon") !== -1 || /\b(12|1|2|3|4):?\d*\s*pm\b/i.test(firstLine)) {
            timeOfDay = "Afternoon";
        }

        return {
            month: month,
            day: day,
            text: dayOfWeek ? dayOfWeek + " " + timeOfDay : timeOfDay
        };
    }

    // =========================================================
    // DOM TRANSFORMATION
    // =========================================================

    function transformEvent(eventEl) {
        // Check if already transformed
        if (eventEl.classList.contains("pv-modernized")) return;

        // Extract data from original structure
        var imgEl = eventEl.querySelector(".event__image img");
        var titleEl = eventEl.querySelector(".event__performances h2 a, h2 a.a_underline_off");
        var bottomPadding = eventEl.querySelector(".bottom_padding");
        var performanceDate = eventEl.querySelector(".performance__date");
        var form = eventEl.querySelector("form");
        var registerBtn = eventEl.querySelector("button.button, input[type='submit']");

        if (!titleEl) {
            console.log("Could not find title, skipping event");
            return;
        }

        var imageSrc = imgEl ? imgEl.src : "";
        var title = titleEl.textContent.trim();
        var registerUrl = form ? form.action : (titleEl.href || "#");

        // Parse content
        var parsed = parseEventContent(bottomPadding);
        var pricing = parsePricing(parsed.pricing);
        var dateInfo = parseDate(parsed.dateTime);

        // Build new HTML
        var newHTML = '';

        // Header
        newHTML += '<div class="pv-event-header">';
        if (imageSrc) {
            newHTML += '<div class="pv-event-image"><img src="' + imageSrc + '" alt="' + title + '"></div>';
        }
        newHTML += '<div class="pv-header-content">';
        newHTML += '<span class="pv-event-category">Special Event</span>';
        newHTML += '<h2 class="pv-event-title">' + title + '</h2>';
        newHTML += '</div></div>';

        // Body
        newHTML += '<div class="pv-event-body">';

        // Description
        if (parsed.description.length > 0) {
            newHTML += '<p class="pv-event-description">' + parsed.description.join(" ") + '</p>';
        }

        // Info rows
        newHTML += '<div class="pv-event-info">';

        // Date/Time row
        if (parsed.dateTime.length > 0) {
            newHTML += '<div class="pv-info-row">';
            newHTML += '<div class="pv-info-icon">' + icons.clock + '</div>';
            newHTML += '<div class="pv-info-content">';
            newHTML += '<span class="pv-info-label">Date & Time</span>';
            newHTML += '<span class="pv-info-value">' + parsed.dateTime.join("<br>") + '</span>';
            newHTML += '</div></div>';
        }

        // Location row
        if (parsed.location.length > 0) {
            newHTML += '<div class="pv-info-row">';
            newHTML += '<div class="pv-info-icon">' + icons.location + '</div>';
            newHTML += '<div class="pv-info-content">';
            newHTML += '<span class="pv-info-label">Location</span>';
            newHTML += '<span class="pv-info-value">' + parsed.location.join("<br>") + '</span>';
            newHTML += '</div></div>';
        }

        newHTML += '</div>'; // end info

        // Pricing grid
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

        newHTML += '</div>'; // end body

        // Footer
        newHTML += '<div class="pv-event-footer">';
        newHTML += '<div class="pv-date-display">';
        if (dateInfo.month && dateInfo.day) {
            newHTML += '<div class="pv-date-box">';
            newHTML += '<span class="pv-date-month">' + dateInfo.month + '</span>';
            newHTML += '<span class="pv-date-day">' + dateInfo.day + '</span>';
            newHTML += '</div>';
        }
        newHTML += '<span class="pv-date-text">' + dateInfo.text + '</span>';
        newHTML += '</div>';

        // Footer actions (checkbox + button)
        newHTML += '<div class="pv-footer-actions">';

        // Login checkbox - we'll move the original checkbox here after DOM insert
        newHTML += '<label class="pv-login-checkbox" id="pv-login-label-placeholder">';
        newHTML += '<span>Login before registering</span>';
        newHTML += '</label>';

        newHTML += '<a href="' + registerUrl + '" class="pv-register-btn">Register Now ' + icons.arrow + '</a>';
        newHTML += '</div>';
        newHTML += '</div>';

        // Mark as modernized and insert new content
        eventEl.classList.add("pv-modernized");
        eventEl.insertAdjacentHTML("afterbegin", newHTML);

        // Handle checkbox functionality
        var placeholderLabel = eventEl.querySelector('#pv-login-label-placeholder');
        var originalCheckbox = eventEl.querySelector('.clearfix input[type="checkbox"], .vertical_padding input[type="checkbox"]');

        if (placeholderLabel) {
            // Create a new checkbox that mirrors the original's functionality
            var newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.id = 'pv-login-checkbox-' + Math.random().toString(36).substring(2, 11);
            placeholderLabel.insertBefore(newCheckbox, placeholderLabel.firstChild);
            placeholderLabel.removeAttribute('id');

            // Get the register button we created
            var registerButton = eventEl.querySelector('.pv-register-btn');

            // Extract event ID from original form action or checkbox
            var eventId = '';
            if (form && form.action) {
                var match = form.action.match(/eventid=(\d+)/i);
                if (match) eventId = match[1];
            }

            // Build URLs based on original Chabad One pattern
            var originalFormAction = '/tools/events/register.asp?eventid=' + eventId + '&new=true';
            var loginFormAction = '/tools/login/login.asp';
            var loginPageValue = '-/tools/events/register.asp?eventid=' + eventId + '&new=true';

            // Sync with original checkbox if it exists
            if (originalCheckbox) {
                newCheckbox.addEventListener('change', function() {
                    // Trigger the original checkbox click to use its onclick handler
                    originalCheckbox.checked = newCheckbox.checked;

                    // Manually trigger the onclick behavior
                    if (form) {
                        var pageInput = form.querySelector('input[name="page"]');
                        if (newCheckbox.checked) {
                            form.action = loginFormAction;
                            if (pageInput) pageInput.value = loginPageValue;
                        } else {
                            form.action = originalFormAction;
                            if (pageInput) pageInput.value = '';
                        }
                    }
                });
                console.log("Created synced checkbox for event:", eventId);
            }

            // Update register button behavior
            if (registerButton) {
                registerButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (newCheckbox.checked) {
                        // Go to login page with return URL
                        window.location.href = loginFormAction + '?page=' + encodeURIComponent(loginPageValue);
                    } else {
                        // Go directly to registration
                        window.location.href = originalFormAction;
                    }
                });
            }

            console.log("Checkbox configured for event ID:", eventId);
        }

        console.log("Transformed event: " + title);
    }

    // =========================================================
    // MAIN EXECUTION
    // =========================================================

    var events = document.querySelectorAll(".event");
    console.log("Found " + events.length + " events");

    events.forEach(function(eventEl) {
        try {
            transformEvent(eventEl);
        } catch (e) {
            console.error("Error transforming event:", e);
        }
    });

    // =========================================================
    // STYLE PAGE TITLE (Orange title with accent bar)
    // =========================================================
    function stylePageTitle() {
        var titleSelectors = ['h1', '.page-title', '#content h1', '.content h1', 'h1.title', '.title h1'];
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
            console.log("Found page title:", pageTitle.textContent);

            // Style the title - fully orange
            pageTitle.style.cssText = "font-family: 'Urbanist', sans-serif !important; font-size: 5rem !important; font-weight: 800 !important; color: #E67E22 !important; text-align: center !important; margin: 2rem auto 0.5rem !important; padding: 0 2rem !important; background: none !important; letter-spacing: -2px !important; display: block !important; width: 100% !important;";

            // Create and add underline accent
            var existingAccent = document.getElementById('pv-title-accent');
            if (existingAccent) existingAccent.remove();

            var accent = document.createElement('div');
            accent.id = 'pv-title-accent';
            accent.style.cssText = "width: 60px !important; height: 4px !important; background: linear-gradient(90deg, #2980b9, #E67E22) !important; margin: 1rem auto 3rem !important; border-radius: 2px !important; display: block !important;";
            pageTitle.parentNode.insertBefore(accent, pageTitle.nextSibling);

            console.log("Page title styled successfully");
        }
    }

    stylePageTitle();

    // =========================================================
    // SCROLL INDICATORS (only if multiple events)
    // =========================================================
    function addScrollIndicators() {
        var modernizedEvents = document.querySelectorAll(".event.pv-modernized");

        if (modernizedEvents.length <= 1) {
            console.log("Only one event, skipping scroll indicators");
            return;
        }

        console.log("Adding scroll indicators for " + modernizedEvents.length + " events");

        // Add scroll indicator after first event
        var firstEvent = modernizedEvents[0];
        var scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'pv-scroll-indicator';
        scrollIndicator.innerHTML =
            '<span class="pv-scroll-indicator-text">' + (modernizedEvents.length - 1) + ' more event' + (modernizedEvents.length > 2 ? 's' : '') + ' below</span>' +
            '<div class="pv-scroll-indicator-arrow">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
                    '<path d="M6 9l6 6 6-6"/>' +
                '</svg>' +
            '</div>';

        // Click to scroll to next event
        scrollIndicator.addEventListener('click', function() {
            var secondEvent = modernizedEvents[1];
            if (secondEvent) {
                secondEvent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        firstEvent.parentNode.insertBefore(scrollIndicator, firstEvent.nextSibling);

        // Add floating event counter
        var counter = document.createElement('div');
        counter.className = 'pv-event-counter';
        counter.id = 'pv-event-counter';

        var counterHTML = '<span>Events</span>';
        for (var i = 0; i < modernizedEvents.length; i++) {
            counterHTML += '<span class="pv-event-counter-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></span>';
        }
        counter.innerHTML = counterHTML;
        document.body.appendChild(counter);

        // Make dots clickable
        var dots = counter.querySelectorAll('.pv-event-counter-dot');
        dots.forEach(function(dot, index) {
            dot.style.cursor = 'pointer';
            dot.addEventListener('click', function() {
                modernizedEvents[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Update active dot on scroll
        var updateActiveDot = function() {
            var scrollPosition = window.scrollY + window.innerHeight / 3;
            var activeIndex = 0;

            modernizedEvents.forEach(function(event, index) {
                var rect = event.getBoundingClientRect();
                var eventTop = rect.top + window.scrollY;
                if (scrollPosition >= eventTop) {
                    activeIndex = index;
                }
            });

            dots.forEach(function(dot, index) {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Hide scroll indicator once user has scrolled past first event
            if (scrollIndicator) {
                var firstEventBottom = firstEvent.getBoundingClientRect().bottom;
                if (firstEventBottom < 100) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            }
        };

        // Throttled scroll handler
        var scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(function() {
                updateActiveDot();
                scrollTimeout = null;
            }, 50);
        });

        // Initial update
        updateActiveDot();
    }

    addScrollIndicators();

    console.log("Paradise Valley Events Modernizer complete!");
    console.log("To undo: refresh the page");

    // Helper to undo
    window.pvUndo = function() {
        // Remove modernized events
        document.querySelectorAll(".event.pv-modernized").forEach(function(el) {
            el.classList.remove("pv-modernized");
            var header = el.querySelector(".pv-event-header");
            var body = el.querySelector(".pv-event-body");
            var footer = el.querySelector(".pv-event-footer");
            if (header) header.remove();
            if (body) body.remove();
            if (footer) footer.remove();
        });

        // Restore original page title
        var originalTitle = document.querySelector('h1');
        if (originalTitle) {
            originalTitle.style.display = '';
        }

        // Remove styles
        var style = document.getElementById("pv-events-styles");
        if (style) style.remove();
        var accent = document.getElementById("pv-title-accent");
        if (accent) accent.remove();

        // Remove scroll indicators
        var scrollIndicator = document.querySelector(".pv-scroll-indicator");
        if (scrollIndicator) scrollIndicator.remove();
        var counter = document.getElementById("pv-event-counter");
        if (counter) counter.remove();

        console.log("Reverted to original");
    };
})();
