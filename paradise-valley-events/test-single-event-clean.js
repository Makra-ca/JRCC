// PARADISE VALLEY - Single Event Page - Premium Clean Design
// Run this in browser console on event registration pages
// URL pattern: /tools/events/register_cdo/eventid/XXXXX

(function() {
    // Only run on event registration pages
    if (!window.location.pathname.includes("/tools/events/register")) {
        console.log("This script is for event registration pages");
        return;
    }

    console.log("🎨 Applying Paradise Valley Premium Styling...");

    // =========================================================
    // ADD BODY CLASS FOR CSS SCOPING (matches production)
    // =========================================================
    document.body.classList.add('pv-registration-page');

    // =========================================================
    // INJECT VIEWPORT META TAG (CRITICAL FOR MOBILE!)
    // =========================================================
    // Without this, browsers default to 980px "desktop" viewport
    // and CSS media queries won't work properly on mobile devices.
    if (!document.querySelector('meta[name="viewport"]')) {
        var viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.insertBefore(viewportMeta, document.head.firstChild);
        console.log("📱 Viewport meta tag injected for mobile support");
    }

    // =========================================================
    // LOAD GOOGLE FONTS
    // =========================================================
    if (!document.getElementById("pv-fonts")) {
        var fontLink = document.createElement("link");
        fontLink.id = "pv-fonts";
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";
        document.head.appendChild(fontLink);
    }

    // =========================================================
    // CSS STYLES - PREMIUM CLEAN DESIGN
    // =========================================================
    var css = `
        /* =========================================================
           PAGE BACKGROUND - Clean White
           ========================================================= */
        body.cco_body {
            background: #ffffff !important;
            min-height: 100vh !important;
        }

        /* Remove default backgrounds */
        #BodyContainer,
        #co_content_container,
        .body_wrapper,
        .master-content-wrapper {
            background: transparent !important;
        }

        /* =========================================================
           MAIN CONTAINER
           ========================================================= */
        .master-content-wrapper {
            max-width: 1000px !important;
            margin: 0 auto !important;
            padding: 3rem 2rem 4rem !important;
        }

        /* Hide original header */
        .master-content-wrapper > header.article-header {
            display: none !important;
        }

        /* =========================================================
           VERTICAL PADDING
           ========================================================= */
        .vertical_padding {
            background: transparent !important;
            padding: 0 !important;
            overflow: visible !important;
        }

        /* =========================================================
           FORM CONTAINER
           ========================================================= */
        form#RegisterSinglePage {
            font-family: 'Inter', sans-serif !important;
        }

        /* =========================================================
           REGISTER HEADER - Banner Image
           ========================================================= */
        #RegisterHeader {
            padding: 0 !important;
            background: transparent !important;
            margin-bottom: 0 !important;
        }

        /* Banner Image - Elegant rounded with deep shadow */
        #RegisterHeader .banner_image {
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 28px !important;
            overflow: hidden !important;
            box-shadow:
                0 25px 80px rgba(0,0,0,0.15),
                0 10px 30px rgba(0,0,0,0.08) !important;
            position: relative !important;
        }

        #RegisterHeader .banner_image::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 120px !important;
            background: linear-gradient(to top, rgba(0,0,0,0.4), transparent) !important;
            pointer-events: none !important;
        }

        #RegisterHeader .banner_image img {
            width: 100% !important;
            height: auto !important;
            display: block !important;
        }

        /* =========================================================
           CONTENT CARD - Premium Floating Card
           ========================================================= */
        #RegisterHeader .column1,
        #RegisterHeader .column2 {
            float: none !important;
            width: 100% !important;
            box-sizing: border-box !important;
        }

        /* Main content card */
        #RegisterHeader .column1 {
            background: #ffffff !important;
            border-radius: 24px 24px 0 0 !important;
            margin-top: 2.5rem !important;
            position: relative !important;
            z-index: 10 !important;
            box-shadow:
                0 -10px 40px rgba(0,0,0,0.04),
                0 20px 60px rgba(0,0,0,0.08) !important;
            padding: 3.5rem 3.5rem 2.5rem !important;
            border-bottom: 1px solid rgba(0,0,0,0.06) !important;
        }

        /* Event Badge - Orange accent */
        #RegisterHeader .column1::before {
            content: '✦ Special Event' !important;
            display: inline-block !important;
            background: #E67E22 !important;
            color: #ffffff !important;
            font-family: 'Inter', sans-serif !important;
            font-size: 0.9rem !important;
            font-weight: 700 !important;
            padding: 0.6rem 1.4rem !important;
            border-radius: 30px !important;
            text-transform: uppercase !important;
            letter-spacing: 2px !important;
            margin-bottom: 2rem !important;
            box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3) !important;
        }

        /* Event Title - Elegant Serif */
        #RegisterHeader .event_name {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 3.5rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 1.5rem !important;
            line-height: 1.2 !important;
            letter-spacing: -1px !important;
        }

        /* Event Description */
        #RegisterHeader .event_description {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.4rem !important;
            line-height: 1.8 !important;
            color: #555 !important;
            max-width: 800px !important;
        }

        /* =========================================================
           INFO GRID - Elegant Info Cards
           ========================================================= */
        #RegisterHeader .column2 {
            background: #ffffff !important;
            color: #333 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 1.5rem !important;
            padding: 2.5rem 3.5rem !important;
            border-radius: 0 !important;
            margin-top: 0 !important;
        }

        #RegisterHeader .column2 .heading {
            display: none !important;
        }

        /* Hide original column2 children - they get rebuilt */
        #RegisterHeader .column2 > .heading,
        #RegisterHeader .column2 > .label,
        #RegisterHeader .column2 > .map_link,
        #RegisterHeader .column2 > .ical_link,
        #RegisterHeader .column2 > div:not(.pv-info-wrapper):not(.pv-info-card):not(.pv-info-cards-grid) {
            display: none !important;
        }

        /* New info wrapper - container for rebuilt content */
        .pv-info-wrapper {
            display: block !important;
            grid-column: 1 / -1 !important;
            background: transparent !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
        }

        /* Injected Icon Box Styles - Orange tint with orange icons */
        .pv-info-icon {
            width: 56px !important;
            height: 56px !important;
            min-width: 56px !important;
            border-radius: 14px !important;
            background: rgba(230, 126, 34, 0.1) !important;
            box-shadow: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
        }

        .pv-info-icon svg {
            width: 26px !important;
            height: 26px !important;
            color: #E67E22 !important;
            stroke: #E67E22 !important;
        }

        /* Info content wrapper */
        .pv-info-text {
            flex: 1 !important;
            min-width: 0 !important;
        }

        #RegisterHeader .column2 .label {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.85rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
            color: #E67E22 !important;
            margin-bottom: 0.75rem !important;
            display: block !important;
        }

        #RegisterHeader .column2 a,
        #RegisterHeader .column2 .map_link,
        #RegisterHeader .column2 .ical_link {
            color: #333 !important;
            text-decoration: none !important;
        }

        #RegisterHeader .column2 .map_link div,
        #RegisterHeader .column2 .ical_link div {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.35rem !important;
            font-weight: 600 !important;
            color: #333 !important;
            line-height: 1.5 !important;
        }

        /* Hide original calendar icon */
        #RegisterHeader .column2 .icon.calendar {
            display: none !important;
        }

        /* =========================================================
           REGISTER BODY - Ticket Selection
           ========================================================= */
        #RegisterBody {
            background: #ffffff !important;
            padding: 3rem 3.5rem !important;
            border-top: 1px solid rgba(0,0,0,0.06) !important;
        }

        #RegisterBody .title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.75rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 2rem !important;
        }

        /* Remove any injected section icons from RegisterBody */
        #RegisterBody .pv-section-header,
        #RegisterBody .pv-section-icon {
            display: none !important;
        }

        /* Pricing info text - the raw text before reservations table */
        #RegisterBody > br,
        #RegisterBody > hr {
            display: none !important;
        }

        /* Style the pricing description area */
        .pv-pricing-info {
            background: linear-gradient(135deg, #fff8f2 0%, #ffffff 100%) !important;
            border-radius: 16px !important;
            padding: 1.5rem 2rem !important;
            margin-bottom: 2rem !important;
            border: 2px solid rgba(230, 126, 34, 0.25) !important;
        }

        .pv-pricing-info h4 {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 1rem !important;
        }

        .pv-pricing-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 0.75rem !important;
        }

        .pv-price-item {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 0.75rem 1rem !important;
            background: #ffffff !important;
            border-radius: 10px !important;
            border: 1px solid rgba(0,0,0,0.06) !important;
        }

        .pv-price-item .pv-price-name {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.95rem !important;
            font-weight: 500 !important;
            color: #555 !important;
        }

        .pv-price-item .pv-price-amount {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.15rem !important;
            font-weight: 700 !important;
            color: #E67E22 !important;
        }

        /* Sponsorship note */
        .pv-sponsorship-note {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.95rem !important;
            color: #555 !important;
            margin-top: 1rem !important;
            padding-top: 1rem !important;
            border-top: 1px dashed rgba(0,0,0,0.1) !important;
        }

        .pv-sponsorship-note strong {
            color: #E67E22 !important;
        }

        /* Ticket rows - Clean white cards with orange accent */
        #RegisterBody .performance {
            background: #ffffff !important;
            border: 2px solid rgba(230, 126, 34, 0.2) !important;
            border-left: 4px solid #E67E22 !important;
            border-radius: 12px !important;
            padding: 1.5rem 2rem !important;
            margin-bottom: 1rem !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            display: block !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
        }

        #RegisterBody .performance:hover {
            border-color: #E67E22 !important;
            background: #fff9f5 !important;
            box-shadow: 0 8px 24px rgba(230, 126, 34, 0.15) !important;
            transform: translateX(4px) !important;
        }

        /* Hide any icons inside performance area */
        #RegisterBody .performance .icon,
        #RegisterBody .performance .pv-info-icon,
        #RegisterBody .performance > .icon.calendar {
            display: none !important;
        }

        #RegisterBody .performance .bold {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.35rem !important;
            font-weight: 700 !important;
            color: #333 !important;
        }

        /* Event info inside performance - hide the jumbled text */
        #RegisterBody .performance > span:first-child {
            display: none !important;
        }

        /* Ticket price styling */
        #RegisterBody .performance .price,
        #RegisterBody .performance span[class*="price"] {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            color: #E67E22 !important;
        }

        /* =========================================================
           CATEGORY SELECTION / TOGGLE OPTIONS
           DOM: .toggle_options > .inline_block (x5)
                Each .inline_block contains: div (label) + select/button
           ========================================================= */
        #RegisterBody .performance .toggle_options {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: flex-end !important;
            gap: 1.5rem !important;
            margin-top: 1.25rem !important;
            padding: 0 !important;
        }

        /* Each inline_block - stack label above input */
        #RegisterBody .performance .toggle_options .inline_block {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.35rem !important;
            margin: 0 !important;
            padding: 0 !important;
            float: none !important;
            vertical-align: bottom !important;
        }

        /* Label divs inside inline_block */
        #RegisterBody .performance .toggle_options .inline_block > div:first-child:not(.co_global_button):not([class*="float"]) {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.9rem !important;
            font-weight: 600 !important;
            color: #666 !important;
            margin-bottom: 0.25rem !important;
            white-space: nowrap !important;
        }

        /* Hide the hidden price info block */
        #RegisterBody .performance .toggle_options .inline_block.large_left_padding {
            display: none !important;
        }

        /* Hide cancel button */
        #RegisterBody .performance .toggle_options .regular.float_right {
            display: none !important;
        }

        /* Dropdowns styling */
        #RegisterBody .performance .toggle_options select {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            padding: 0.65rem 2rem 0.65rem 1rem !important;
            border: 2px solid #ccc !important;
            border-radius: 8px !important;
            background: #ffffff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") right 0.75rem center no-repeat !important;
            min-width: 140px !important;
            cursor: pointer !important;
            appearance: none !important;
            -webkit-appearance: none !important;
        }

        #RegisterBody .performance .toggle_options select:focus {
            border-color: #E67E22 !important;
            outline: none !important;
            box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.15) !important;
        }

        /* Continue button wrapper */
        #RegisterBody .performance .toggle_options .co_global_button {
            margin: 0 !important;
            padding: 0 !important;
        }

        /* Continue button styling */
        #RegisterBody .performance .toggle_options button,
        #RegisterBody .performance .toggle_options .co_global_button button {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            font-weight: 700 !important;
            background: #E67E22 !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 0.7rem 1.5rem !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            white-space: nowrap !important;
        }

        #RegisterBody .performance .toggle_options button:hover {
            background: #D35400 !important;
            transform: scale(1.03) !important;
        }

        #RegisterBody .performance .toggle_options button:disabled {
            background: #ccc !important;
            cursor: not-allowed !important;
            transform: none !important;
        }

        /* Mobile: stack vertically */
        @media (max-width: 600px) {
            #RegisterBody .performance .toggle_options {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 1rem !important;
            }

            #RegisterBody .performance .toggle_options .inline_block {
                width: 100% !important;
            }

            #RegisterBody .performance .toggle_options select {
                width: 100% !important;
            }

            #RegisterBody .performance .toggle_options button {
                width: 100% !important;
            }
        }

        /* Remove dashed border/glow from reservations container */
        #RegisterBody .reservations,
        #RegisterBody [class*="reservation"],
        #RegisterBody > div,
        #RegisterBody fieldset,
        #RegisterBody div[style*="border"],
        #RegisterBody .performance,
        #RegisterBody .attendees,
        #RegisterBody [class*="attendee"],
        #RegisterBody [class*="table"],
        #RegisterBody > table {
            border: none !important;
            border-style: none !important;
            outline: none !important;
            box-shadow: none !important;
        }

        /* Specifically target any dashed borders */
        #RegisterBody *[style*="dashed"],
        #RegisterBody *[style*="dotted"] {
            border-style: none !important;
            border: none !important;
        }

        /* Remove focus outlines that could cause glow */
        #RegisterBody *:focus,
        #RegisterBody *:focus-within {
            outline: none !important;
            box-shadow: none !important;
        }

        /* Reservations table styling */
        #RegisterBody table {
            width: 100% !important;
            border-collapse: separate !important;
            border-spacing: 0 0.5rem !important;
            margin-top: 1rem !important;
            border: none !important;
            outline: none !important;
        }

        #RegisterBody table thead th {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.8rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            color: #888 !important;
            padding: 0.75rem 1rem !important;
            text-align: left !important;
            background: transparent !important;
            border-bottom: 2px solid rgba(230, 126, 34, 0.3) !important;
        }

        #RegisterBody table tbody tr {
            background: #ffffff !important;
            border-radius: 12px !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
            position: relative !important;
        }

        #RegisterBody table tbody tr:hover {
            background: #fdfbf7 !important;
        }

        #RegisterBody table tbody td {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            padding: 0.75rem 0.875rem !important;
            border: none !important;
            vertical-align: middle !important;
            background: transparent !important;
        }

        /* Name input cells */
        #RegisterBody table tbody td:nth-child(2),
        #RegisterBody table tbody td:nth-child(3) {
            font-weight: 500 !important;
            color: #333 !important;
        }

        /* Category cell */
        #RegisterBody table tbody td:nth-child(4) {
            font-size: 0.9rem !important;
            color: #666 !important;
        }

        /* Price cell */
        #RegisterBody table tbody td:nth-child(5) {
            font-family: 'Urbanist', sans-serif !important;
            font-weight: 600 !important;
            color: #E67E22 !important;
            font-size: 1.05rem !important;
        }

        /* Style table inputs */
        #RegisterBody table input[type="text"] {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            padding: 0.75rem 1rem !important;
            border: 2px solid #999 !important;
            border-radius: 10px !important;
            background: #fdfbf7 !important;
            width: 100% !important;
            box-sizing: border-box !important;
            transition: all 0.2s ease !important;
        }

        #RegisterBody table input[type="text"]:focus {
            border-color: #E67E22 !important;
            background: #ffffff !important;
            outline: none !important;
            box-shadow: none !important;
        }

        /* =========================================================
           RESERVATION ROW STYLING (DIV-based, not table)
           ========================================================= */

        /* Reservation row container */
        #RegisterBody .reservation,
        #RegisterBody .clearfix.reservation {
            position: relative !important;
            background: #ffffff !important;
            border-radius: 12px !important;
            padding: 1rem 3rem 1rem 1rem !important;
            margin-bottom: 0.75rem !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
            transition: all 0.2s ease !important;
        }

        #RegisterBody .reservation:hover {
            background: #fdfbf7 !important;
        }

        /* Delete button - .remove_reservation - HIGH SPECIFICITY */
        #RegisterBody .remove_reservation,
        #RegisterBody button.remove_reservation,
        #RegisterBody .reservation .remove_reservation,
        #RegisterBody .clearfix.reservation .remove_reservation,
        #RegisterBody .reservation button.remove_reservation,
        button.remove_reservation {
            position: absolute !important;
            right: 10px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 28px !important;
            height: 28px !important;
            min-width: 28px !important;
            max-width: 28px !important;
            min-height: 28px !important;
            max-height: 28px !important;
            border-radius: 50% !important;
            background: #fff5f5 !important;
            border: 1px solid #ffcdd2 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s ease !important;
            padding: 0 !important;
            margin: 0 !important;
            text-decoration: none !important;
            color: #e57373 !important;
            font-size: 14px !important;
            font-weight: bold !important;
            line-height: 1 !important;
            box-shadow: none !important;
            outline: none !important;
            opacity: 0.6 !important;
            z-index: 100 !important;
            left: auto !important;
            float: none !important;
        }

        /* Show delete on row hover */
        #RegisterBody .reservation:hover .remove_reservation,
        #RegisterBody .clearfix.reservation:hover .remove_reservation {
            opacity: 1 !important;
            background: #ffebee !important;
            border-color: #ff5252 !important;
            color: #ff5252 !important;
        }

        #RegisterBody .remove_reservation:hover,
        #RegisterBody button.remove_reservation:hover {
            background: #ff5252 !important;
            border-color: #ff5252 !important;
            color: white !important;
            box-shadow: none !important;
            opacity: 1 !important;
            transform: translateY(-50%) scale(1.1) !important;
        }

        /* Reservation inputs */
        #RegisterBody .reservation input,
        #RegisterBody .reservation select {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.95rem !important;
            padding: 0.6rem 0.8rem !important;
            border: 2px solid #999 !important;
            border-radius: 8px !important;
            background: #fdfbf7 !important;
            box-shadow: none !important;
            outline: none !important;
        }

        #RegisterBody .reservation input:focus,
        #RegisterBody .reservation select:focus {
            border-color: #E67E22 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            outline: none !important;
        }

        /* Add reservations link */
        #RegisterBody a[href*="add"],
        #RegisterBody .add-reservation,
        #RegisterBody a:contains("Add") {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.95rem !important;
            font-weight: 600 !important;
            color: #E67E22 !important;
            text-decoration: none !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            padding: 0.75rem 1.25rem !important;
            background: rgba(230, 126, 34, 0.1) !important;
            border-radius: 10px !important;
            transition: all 0.2s ease !important;
            margin-top: 1rem !important;
        }

        #RegisterBody a[href*="add"]:hover {
            background: rgba(230, 126, 34, 0.2) !important;
        }

        /* Subtotal styling */
        #RegisterBody .subtotal,
        #RegisterBody [class*="subtotal"],
        #RegisterBody [class*="total"] {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
            font-weight: 600 !important;
            color: #555 !important;
            text-align: right !important;
            margin-top: 1.5rem !important;
            padding-top: 1rem !important;
            border-top: 2px solid rgba(230, 126, 34, 0.2) !important;
        }

        #RegisterBody .subtotal strong,
        #RegisterBody [class*="subtotal"] strong,
        #RegisterBody [class*="total"] strong {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.75rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-left: 0.5rem !important;
        }

        /* Ticket dropdowns */
        #RegisterBody select {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            padding: 0.75rem 2.5rem 0.75rem 1rem !important;
            border: 2px solid #999 !important;
            border-radius: 10px !important;
            background: #ffffff !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            appearance: none !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: right 1rem center !important;
            box-shadow: none !important;
        }

        #RegisterBody select:focus {
            border-color: #E67E22 !important;
            outline: none !important;
            box-shadow: none !important;
        }

        /* =========================================================
           RESERVATIONS SECTION - Category Dropdown & Pricing Cards
           ========================================================= */

        /* Center the entire category selection area */
        #RegisterBody .pv-category-wrapper,
        #RegisterBody > div:has(select),
        #RegisterBody .category-select-wrapper {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
            margin: 1.5rem 0 !important;
        }

        /* Style the category dropdown label */
        #RegisterBody label[for*="category"],
        #RegisterBody .pv-category-label {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            color: #2980b9 !important;
            text-align: center !important;
            margin-bottom: 0.75rem !important;
            display: block !important;
        }

        /* Center and style the category select dropdown */
        #RegisterBody select[name*="category"],
        #RegisterBody .pv-category-select {
            max-width: 400px !important;
            margin: 0 auto !important;
            border: 2px solid #2980b9 !important;
            border-radius: 12px !important;
            padding: 1rem 3rem 1rem 1.5rem !important;
            font-size: 1.1rem !important;
            font-weight: 600 !important;
            background-color: #ffffff !important;
            color: #333 !important;
            text-align: center !important;
            text-align-last: center !important;
        }

        #RegisterBody select[name*="category"]:focus,
        #RegisterBody .pv-category-select:focus {
            border-color: #E67E22 !important;
            box-shadow: 0 0 0 4px rgba(230, 126, 34, 0.15) !important;
        }

        /* Reservations pricing list - styled as cards */
        .pv-reservations-list {
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem !important;
            max-width: 600px !important;
            margin: 2rem auto !important;
            padding: 0 1rem !important;
        }

        /* Individual reservation option card */
        .pv-reservation-option,
        #RegisterBody .reservation-option {
            background: #ffffff !important;
            border: 2px solid rgba(230, 126, 34, 0.2) !important;
            border-left: 5px solid #E67E22 !important;
            border-radius: 12px !important;
            padding: 1.25rem 1.5rem !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            transition: all 0.25s ease !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
        }

        .pv-reservation-option:hover,
        #RegisterBody .reservation-option:hover {
            border-color: #E67E22 !important;
            background: #fff9f5 !important;
            transform: translateX(6px) !important;
            box-shadow: 0 6px 20px rgba(230, 126, 34, 0.15) !important;
        }

        /* VIP/Premium options - blue accent */
        .pv-reservation-option.vip,
        .pv-reservation-option[data-type="vip"],
        #RegisterBody .reservation-option.vip {
            border-left-color: #2980b9 !important;
            border-color: rgba(41, 128, 185, 0.2) !important;
        }

        .pv-reservation-option.vip:hover,
        #RegisterBody .reservation-option.vip:hover {
            border-color: #2980b9 !important;
            background: #f5faff !important;
            box-shadow: 0 6px 20px rgba(41, 128, 185, 0.15) !important;
        }

        /* Sponsorship options - gold accent */
        .pv-reservation-option.sponsor,
        .pv-reservation-option[data-type="sponsor"],
        #RegisterBody .reservation-option.sponsor {
            border-left-color: #F39C12 !important;
            border-color: rgba(243, 156, 18, 0.25) !important;
            background: linear-gradient(135deg, #fffef5 0%, #ffffff 100%) !important;
        }

        .pv-reservation-option.sponsor:hover,
        #RegisterBody .reservation-option.sponsor:hover {
            border-color: #F39C12 !important;
            background: #fffef5 !important;
            box-shadow: 0 6px 20px rgba(243, 156, 18, 0.2) !important;
        }

        /* Option name/title */
        .pv-option-name {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
            font-weight: 600 !important;
            color: #333 !important;
        }

        /* Option price */
        .pv-option-price {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.35rem !important;
            font-weight: 700 !important;
            color: #E67E22 !important;
        }

        .pv-reservation-option.vip .pv-option-price {
            color: #2980b9 !important;
        }

        .pv-reservation-option.sponsor .pv-option-price {
            color: #F39C12 !important;
        }

        /* Add attendee button - but NOT the delete button */
        #RegisterBody button:not(.remove_reservation) {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            background: #E67E22 !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 12px !important;
            padding: 0.9rem 1.75rem !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3) !important;
        }

        #RegisterBody button:not(.remove_reservation):hover {
            background: #D35400 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 20px rgba(230, 126, 34, 0.35) !important;
        }

        /* =========================================================
           BOTTOM PADDING - Form Fields
           ========================================================= */
        .bottom_padding {
            display: block !important;
            background: #ffffff !important;
            border-radius: 0 0 24px 24px !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.08) !important;
            padding: 0 !important;
            margin-bottom: 3rem !important;
            overflow: hidden !important;
        }

        /* Global form input styles - catch all (dark visible borders!) */
        .bottom_padding input,
        .bottom_padding select,
        .bottom_padding textarea,
        #Summary input,
        #Summary select,
        #Summary textarea,
        #ReserversInformation input,
        #ReserversInformation select,
        #ReserversInformation textarea,
        #Payment input,
        #Payment select,
        #Payment textarea,
        form input[type="text"],
        form input[type="email"],
        form input[type="tel"],
        form input[type="number"],
        form select,
        form textarea {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
            padding: 0.9rem 1.1rem !important;
            border: 2px solid #999 !important;
            border-width: 2px !important;
            border-style: solid !important;
            border-color: #999 !important;
            border-radius: 10px !important;
            transition: all 0.25s ease !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1) !important;
            width: 100% !important;
            max-width: 100% !important;
        }

        .bottom_padding input:focus,
        .bottom_padding select:focus,
        .bottom_padding textarea:focus,
        #Summary input:focus,
        #Summary select:focus,
        #Summary textarea:focus,
        #ReserversInformation input:focus,
        #ReserversInformation select:focus,
        #ReserversInformation textarea:focus,
        #Payment input:focus,
        #Payment select:focus,
        #Payment textarea:focus {
            border-color: #E67E22 !important;
            outline: none !important;
            background: #ffffff !important;
            box-shadow: 0 0 0 4px rgba(230, 126, 34, 0.12) !important;
        }

        .bottom_padding textarea,
        #Summary textarea,
        #ReserversInformation textarea,
        #Payment textarea {
            min-height: 100px !important;
            resize: vertical !important;
        }

        .bottom_padding label,
        #Summary label,
        #ReserversInformation label,
        #Payment label {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.15rem !important;
            font-weight: 600 !important;
            color: #333 !important;
            display: block !important;
            margin-bottom: 0.5rem !important;
        }

        /* Summary section */
        #Summary {
            padding: 2.5rem 3.5rem !important;
            background: #ffffff !important;
            border-bottom: 1px solid rgba(0,0,0,0.06) !important;
        }

        #Summary .title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.75rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.75rem !important;
            margin-bottom: 1.5rem !important;
        }

        #Summary .title::before {
            content: '' !important;
            width: 5px !important;
            height: 28px !important;
            background: linear-gradient(180deg, #E67E22, #F39C12) !important;
            border-radius: 3px !important;
        }

        #Summary label,
        #Summary .label {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.15rem !important;
            font-weight: 600 !important;
            color: #333 !important;
            margin-bottom: 0.5rem !important;
            display: inline-block !important;
        }

        /* Summary inputs */
        #Summary input,
        #Summary select,
        #Summary textarea {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
            padding: 0.9rem 1.1rem !important;
            border: 2px solid #bbb !important;
            border-radius: 10px !important;
            transition: all 0.25s ease !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
        }

        #Summary input:focus,
        #Summary select:focus,
        #Summary textarea:focus {
            border-color: #E67E22 !important;
            outline: none !important;
            background: #ffffff !important;
            box-shadow: 0 0 0 4px rgba(230, 126, 34, 0.12) !important;
        }

        /* Donation input - specific override */
        #TotalDonation {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.2rem !important;
            padding: 1rem 1.5rem !important;
            border: 2px solid #bbb !important;
            border-radius: 10px !important;
            width: 180px !important;
            transition: all 0.2s ease !important;
            background: #ffffff !important;
        }

        #TotalDonation:focus {
            border-color: #E67E22 !important;
            outline: none !important;
            box-shadow: 0 0 0 4px rgba(230, 126, 34, 0.15) !important;
        }

        /* Summary totals styling */
        #Summary .totals,
        #Summary table {
            margin-left: auto !important;
            text-align: right !important;
        }

        #Summary .totals td,
        #Summary table td {
            padding: 0.5rem 0 !important;
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
        }

        #Summary .totals td:last-child,
        #Summary table td:last-child {
            font-weight: 600 !important;
            color: #333 !important;
            padding-left: 1.5rem !important;
        }

        #Summary .total-row td,
        #Summary tr.total td {
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            border-top: 2px solid #e0e0e0 !important;
            padding-top: 1rem !important;
        }

        /* =========================================================
           RESERVERS INFORMATION - Contact Details
           ========================================================= */
        #ReserversInformation {
            padding: 3rem 3.5rem !important;
            border-bottom: 1px solid rgba(0,0,0,0.06) !important;
            background: #ffffff !important;
        }

        #ReserversInformation .title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.75rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 2rem !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.75rem !important;
        }

        #ReserversInformation .title::before {
            content: '' !important;
            width: 5px !important;
            height: 28px !important;
            background: linear-gradient(180deg, #E67E22, #F39C12) !important;
            border-radius: 3px !important;
        }

        #ReserversInformation label,
        #ReserversInformation .label {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.15rem !important;
            font-weight: 600 !important;
            color: #333 !important;
            margin-bottom: 0.5rem !important;
            display: inline-block !important;
            letter-spacing: 0.3px !important;
        }

        #ReserversInformation input,
        #ReserversInformation select,
        #ReserversInformation textarea {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
            padding: 0.9rem 1.1rem !important;
            border: 2px solid #bbb !important;
            border-radius: 10px !important;
            transition: all 0.25s ease !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
        }

        #ReserversInformation input:focus,
        #ReserversInformation select:focus,
        #ReserversInformation textarea:focus {
            border-color: #E67E22 !important;
            outline: none !important;
            background: #ffffff !important;
            box-shadow: 0 0 0 4px rgba(230, 126, 34, 0.12) !important;
        }

        #ReserversInformation input::placeholder,
        #ReserversInformation textarea::placeholder {
            color: #a0a0a0 !important;
        }

        #ReserversInformation textarea {
            min-height: 100px !important;
            resize: vertical !important;
        }

        /* =========================================================
           FORM FIELDS GRID LAYOUT - 2 columns desktop, 1 mobile
           Structure: #ReserversInformation > div.wrapper > div.clearfix (container)
                      Each field: div.clearfix.small_vertical_padding > div.label + div.float_left
           ========================================================= */
        /* Target ONLY the form fields container - use child combinator */
        #ReserversInformation > div > div.clearfix:not(.title) {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem 2rem !important;
            width: 100% !important;
        }

        /* Each form field wrapper - stack label and input vertically */
        #ReserversInformation > div > div.clearfix:not(.title) > div.clearfix {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
        }

        /* Reset float on inner label and input divs */
        #ReserversInformation > div > div.clearfix:not(.title) > div.clearfix > div {
            float: none !important;
            margin-left: 0 !important;
        }

        /* Full width for last field (checkbox/notes) */
        #ReserversInformation > div > div.clearfix:not(.title) > div.clearfix:last-child {
            grid-column: 1 / -1 !important;
        }

        /* Mobile: single column */
        @media (max-width: 768px) {
            #ReserversInformation > div > div.clearfix:not(.title) {
                grid-template-columns: 1fr !important;
                gap: 1.25rem !important;
            }

            #ReserversInformation > div > div.clearfix:not(.title) > div.clearfix:last-child {
                grid-column: 1 !important;
            }
        }

        /* =========================================================
           PAYMENT SECTION
           ========================================================= */
        #Payment {
            padding: 3rem 3.5rem !important;
            border-bottom: 1px solid rgba(0,0,0,0.06) !important;
            background: #ffffff !important;
            display: block !important;
        }

        /* Payment title */
        #Payment .title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.75rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 2rem !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.75rem !important;
        }

        #Payment .title::before {
            content: '' !important;
            width: 5px !important;
            height: 28px !important;
            background: linear-gradient(180deg, #E67E22, #F39C12) !important;
            border-radius: 3px !important;
        }

        #Payment label,
        #Payment .label {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.15rem !important;
            font-weight: 600 !important;
            color: #333 !important;
            margin-bottom: 0.5rem !important;
            display: inline-block !important;
        }

        #Payment input,
        #Payment select,
        #Payment textarea {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
            padding: 0.9rem 1.1rem !important;
            border: 2px solid #bbb !important;
            border-radius: 10px !important;
            transition: all 0.25s ease !important;
            background: #ffffff !important;
            box-sizing: border-box !important;
        }

        #Payment input:focus,
        #Payment select:focus,
        #Payment textarea:focus {
            border-color: #E67E22 !important;
            outline: none !important;
            background: #ffffff !important;
            box-shadow: 0 0 0 4px rgba(230, 126, 34, 0.12) !important;
        }

        /* =========================================================
           PAYMENT GRID LAYOUT
           Structure: #Payment > div.large_top_padding > div#CreditCard
           ========================================================= */
        /* Credit card fields container - 2 column grid */
        #Payment #CreditCard {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem 2rem !important;
            width: 100% !important;
            margin-top: 1rem !important;
        }

        /* Each credit card field row */
        #Payment #CreditCard > div.clearfix {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
        }

        /* Reset floats inside credit card fields */
        #Payment #CreditCard > div.clearfix > div {
            float: none !important;
            margin-left: 0 !important;
        }

        /* Expiration date field - has 2 selects, keep them inline */
        #Payment #CreditCard > div.clearfix > div.float_left {
            display: flex !important;
            gap: 0.5rem !important;
            flex-wrap: wrap !important;
        }

        /* Payment method row - full width above the grid */
        #Payment > div > div.clearfix.small_vertical_padding.required {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
            margin-bottom: 1rem !important;
        }

        #Payment > div > div.clearfix.small_vertical_padding.required > div {
            float: none !important;
            margin-left: 0 !important;
        }

        /* Comments section - full width below */
        #Payment #Comments {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
            margin-top: 1.5rem !important;
            grid-column: 1 / -1 !important;
        }

        #Payment #Comments > div {
            float: none !important;
            margin-left: 0 !important;
        }

        #Payment #Comments textarea {
            width: 100% !important;
            min-height: 100px !important;
        }

        /* Mobile: single column for payment */
        @media (max-width: 768px) {
            #Payment #CreditCard {
                grid-template-columns: 1fr !important;
                gap: 1.25rem !important;
            }
        }

        /* =========================================================
           SUBMIT SECTION
           ========================================================= */
        #Buttons {
            padding: 2.5rem 3.5rem !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            background: #ffffff !important;
        }

        /* Total display styling */
        #Buttons .total,
        #Buttons [class*="total"] {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.2rem !important;
            color: #555 !important;
        }

        #Buttons .total strong,
        #Buttons .total .amount {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 2.75rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            display: block !important;
            margin-top: 0.25rem !important;
        }

        #SubmitButton,
        #Buttons button[name="submit"],
        #Buttons input[type="submit"] {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            background: #E67E22 !important;
            background-size: 200% auto !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 16px !important;
            padding: 1.4rem 3.5rem !important;
            cursor: pointer !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow:
                0 8px 30px rgba(230, 126, 34, 0.35),
                0 4px 12px rgba(0,0,0,0.1) !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
        }

        #SubmitButton:hover,
        #Buttons button[name="submit"]:hover,
        #Buttons input[type="submit"]:hover {
            background-position: right center !important;
            transform: translateY(-3px) !important;
            box-shadow:
                0 14px 40px rgba(230, 126, 34, 0.4),
                0 6px 16px rgba(0,0,0,0.12) !important;
        }

        /* Disabled state */
        #SubmitButton_wrapper.disabled button,
        #SubmitButton:disabled {
            background: #d0d0d0 !important;
            box-shadow: none !important;
            cursor: not-allowed !important;
            transform: none !important;
            color: #888 !important;
        }

        /* =========================================================
           TRANSFORMED RESERVATIONS SECTION
           ========================================================= */
        .pv-reservations-wrapper {
            padding: 0 !important;
        }

        .pv-section-header {
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
            margin-bottom: 2rem !important;
        }

        .pv-section-icon {
            width: 48px !important;
            height: 48px !important;
            background: rgba(230, 126, 34, 0.1) !important;
            border-radius: 12px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
        }

        .pv-section-icon svg {
            width: 24px !important;
            height: 24px !important;
            color: #E67E22 !important;
            stroke: #E67E22 !important;
        }

        .pv-section-title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.75rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin: 0 !important;
        }

        /* Pricing Grid */
        .pv-pricing-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 1rem !important;
            margin-bottom: 2rem !important;
        }

        .pv-price-card {
            background: #ffffff !important;
            border: 2px solid rgba(230, 126, 34, 0.15) !important;
            border-radius: 12px !important;
            padding: 1rem 1.25rem !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.03) !important;
        }

        .pv-price-card:hover {
            border-color: #E67E22 !important;
            background: #fff9f5 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 16px rgba(230, 126, 34, 0.12) !important;
        }

        .pv-price-label {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.95rem !important;
            font-weight: 500 !important;
            color: #555 !important;
        }

        .pv-price-amount {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            color: #E67E22 !important;
        }

        /* =========================================================
           STYLED PRICING SECTION (from stylePricingSection)
           ========================================================= */
        .pv-pricing-container {
            background: linear-gradient(135deg, #FFF8F0 0%, #FFF5EB 100%) !important;
            border-radius: 20px !important;
            padding: 2rem 2.5rem !important;
            margin-bottom: 2rem !important;
            border: 2px solid rgba(230, 126, 34, 0.2) !important;
            box-shadow: 0 4px 20px rgba(230, 126, 34, 0.08) !important;
        }

        .pv-pricing-title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            color: #E67E22 !important;
            text-transform: uppercase !important;
            letter-spacing: 2px !important;
            margin-bottom: 1.5rem !important;
            padding-bottom: 0.75rem !important;
            border-bottom: 2px solid rgba(230, 126, 34, 0.3) !important;
            display: block !important;
        }

        .pv-pricing-item {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            background: #ffffff !important;
            padding: 1rem 1.5rem !important;
            border-radius: 12px !important;
            margin-bottom: 0.75rem !important;
            border: 1px solid rgba(0,0,0,0.06) !important;
            transition: all 0.2s ease !important;
        }

        .pv-pricing-item:hover {
            border-color: rgba(230, 126, 34, 0.3) !important;
            box-shadow: 0 4px 12px rgba(230, 126, 34, 0.1) !important;
        }

        .pv-pricing-label {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
            font-weight: 600 !important;
            color: #333 !important;
        }

        .pv-pricing-amount {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.5rem !important;
            font-weight: 800 !important;
            color: #E67E22 !important;
        }

        .pv-sponsorship-levels {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 1rem !important;
            justify-content: center !important;
            margin-top: 1.5rem !important;
            padding-top: 1.5rem !important;
            border-top: 1px dashed rgba(230, 126, 34, 0.3) !important;
        }

        .pv-sponsorship-level {
            background: linear-gradient(135deg, #E67E22 0%, #F39C12 100%) !important;
            color: #ffffff !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            padding: 0.75rem 1.5rem !important;
            border-radius: 30px !important;
            box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3) !important;
            transition: all 0.3s ease !important;
        }

        .pv-sponsorship-level:hover {
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 8px 25px rgba(230, 126, 34, 0.4) !important;
        }

        .pv-vip-badge {
            display: inline-block !important;
            background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%) !important;
            color: #ffffff !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 0.85rem !important;
            font-weight: 700 !important;
            padding: 0.35rem 0.85rem !important;
            border-radius: 20px !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            margin-right: 0.5rem !important;
            vertical-align: middle !important;
        }

        .pv-sponsorship-text {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            font-style: italic !important;
            color: #666 !important;
            text-align: center !important;
            margin-top: 1rem !important;
        }

        /* Selection Row - Centered with white background */
        .pv-selection-row {
            display: flex !important;
            align-items: flex-end !important;
            justify-content: center !important;
            gap: 1.5rem !important;
            flex-wrap: wrap !important;
            background: #ffffff !important;
            border-radius: 16px !important;
            padding: 1.5rem 2rem !important;
            border: 2px solid rgba(41, 128, 185, 0.2) !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
        }

        .pv-select-group {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
            flex: 1 !important;
            min-width: 180px !important;
        }

        .pv-select-label {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.85rem !important;
            font-weight: 700 !important;
            color: #555 !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
        }

        .pv-select-wrapper select {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            padding: 0.9rem 2.5rem 0.9rem 1.25rem !important;
            border: 2px solid #999 !important;
            border-radius: 12px !important;
            background: #ffffff !important;
            cursor: pointer !important;
            transition: border-color 0.2s ease !important;
            appearance: none !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: right 1rem center !important;
            box-shadow: none !important;
            outline: none !important;
            width: 100% !important;
        }

        .pv-select-wrapper select:hover,
        .pv-select-wrapper select:focus {
            border-color: #E67E22 !important;
            box-shadow: none !important;
            outline: none !important;
        }

        /* Continue Button */
        .pv-continue-wrapper {
            display: flex !important;
            align-items: flex-end !important;
        }

        .pv-continue-btn {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            font-weight: 700 !important;
            background: linear-gradient(135deg, #E67E22 0%, #F39C12 100%) !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 12px !important;
            padding: 0.9rem 2.5rem !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            white-space: nowrap !important;
            box-shadow: 0 4px 15px rgba(230, 126, 34, 0.25) !important;
        }

        .pv-continue-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(230, 126, 34, 0.35) !important;
        }

        /* Form Labels and Inputs */
        .pv-form-label {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.9rem !important;
            font-weight: 600 !important;
            color: #555 !important;
            margin-bottom: 0.5rem !important;
            display: block !important;
        }

        .pv-form-input {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            padding: 1rem 1.25rem !important;
            border: 2px solid #999 !important;
            border-radius: 12px !important;
            background: #fdfbf7 !important;
            transition: border-color 0.2s ease !important;
            width: 100% !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            outline: none !important;
        }

        .pv-form-input:focus {
            border-color: #E67E22 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            outline: none !important;
        }

        /* Form Selects */
        .pv-form-select {
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            padding: 1rem 2.5rem 1rem 1.25rem !important;
            border: 2px solid #999 !important;
            border-radius: 12px !important;
            background: #fdfbf7 !important;
            transition: border-color 0.2s ease !important;
            width: 100% !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            outline: none !important;
            cursor: pointer !important;
            appearance: none !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: right 1rem center !important;
        }

        .pv-form-select:focus {
            border-color: #E67E22 !important;
            background-color: #ffffff !important;
            box-shadow: none !important;
            outline: none !important;
        }

        /* Submit Button */
        .pv-submit-btn {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            background: #E67E22 !important;
            background-size: 200% auto !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 16px !important;
            padding: 1.4rem 3.5rem !important;
            cursor: pointer !important;
            transition: all 0.4s ease !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
            box-shadow: 0 8px 30px rgba(230, 126, 34, 0.35) !important;
        }

        .pv-submit-btn:hover {
            background-position: right center !important;
            transform: translateY(-3px) !important;
            box-shadow: 0 14px 40px rgba(230, 126, 34, 0.4) !important;
        }

        /* =========================================================
           REMOVE ALL GLOW/SHADOW EFFECTS - Comprehensive reset
           ========================================================= */
        /* All form elements - base state */
        form#RegisterSinglePage select,
        form#RegisterSinglePage input,
        form#RegisterSinglePage textarea,
        form#RegisterSinglePage button,
        form#RegisterSinglePage a,
        #RegisterBody select,
        #RegisterBody input,
        #RegisterBody textarea,
        #RegisterBody button,
        #RegisterBody a,
        #RegisterBody table,
        #RegisterBody table tr,
        #RegisterBody table td,
        #RegisterBody table th,
        #ReserversInformation select,
        #ReserversInformation input,
        #Payment select,
        #Payment input,
        .bottom_padding select,
        .bottom_padding input,
        .bottom_padding button {
            box-shadow: none !important;
            outline: none !important;
            -webkit-box-shadow: none !important;
            -moz-box-shadow: none !important;
        }

        /* All form elements - focus state */
        form#RegisterSinglePage select:focus,
        form#RegisterSinglePage input:focus,
        form#RegisterSinglePage textarea:focus,
        form#RegisterSinglePage button:focus,
        form#RegisterSinglePage a:focus,
        #RegisterBody select:focus,
        #RegisterBody input:focus,
        #RegisterBody textarea:focus,
        #RegisterBody button:focus,
        #RegisterBody a:focus,
        #RegisterBody table:focus,
        #RegisterBody table tr:focus,
        #RegisterBody table td:focus,
        #ReserversInformation select:focus,
        #ReserversInformation input:focus,
        #Payment select:focus,
        #Payment input:focus,
        .bottom_padding select:focus,
        .bottom_padding input:focus,
        .bottom_padding button:focus {
            box-shadow: none !important;
            outline: none !important;
            -webkit-box-shadow: none !important;
            -moz-box-shadow: none !important;
        }

        /* All form elements - active/hover states */
        form#RegisterSinglePage select:active,
        form#RegisterSinglePage input:active,
        form#RegisterSinglePage button:active,
        #RegisterBody select:active,
        #RegisterBody input:active,
        #RegisterBody button:active,
        #RegisterBody a:active {
            box-shadow: none !important;
            outline: none !important;
        }

        /* Table specific - remove any webkit focus ring */
        #RegisterBody table *:focus {
            outline: none !important;
            box-shadow: none !important;
        }

        /* Select dropdown - ensure no glow on focus-visible too */
        #RegisterBody select:focus-visible,
        #ReserversInformation select:focus-visible,
        #Payment select:focus-visible,
        .bottom_padding select:focus-visible {
            outline: none !important;
            box-shadow: none !important;
        }

        /* =========================================================
           GENERIC INFO CARD STYLING - Works with any info layout
           ========================================================= */
        .pv-info-card {
            background: #ffffff !important;
            border-radius: 20px !important;
            padding: 1.75rem 2rem !important;
            box-shadow:
                0 2px 4px rgba(0,0,0,0.02),
                0 8px 24px rgba(0,0,0,0.04) !important;
            border: 1px solid rgba(0,0,0,0.08) !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            gap: 1.25rem !important;
            text-decoration: none !important;
            color: inherit !important;
            flex: 0 1 320px !important;
        }

        .pv-info-card:hover {
            transform: translateY(-4px) !important;
            box-shadow:
                0 12px 40px rgba(0,0,0,0.08),
                0 4px 12px rgba(0,0,0,0.04) !important;
            border-color: rgba(230, 126, 34, 0.3) !important;
        }

        /* Card label styling */
        .pv-card-label,
        .pv-info-card .label,
        .pv-info-text .label {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.85rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
            color: #E67E22 !important;
            margin-bottom: 0.5rem !important;
            display: block !important;
        }

        /* External label (outside cards) */
        .pv-external-label {
            font-family: 'Inter', sans-serif !important;
            font-size: 0.9rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
            color: #E67E22 !important;
            margin-bottom: 0.75rem !important;
            display: block !important;
        }

        /* Info text content wrapper */
        .pv-info-text {
            flex: 1 !important;
            min-width: 0 !important;
            font-family: 'Inter', sans-serif !important;
            font-size: 1.2rem !important;
            font-weight: 600 !important;
            color: #333 !important;
            line-height: 1.5 !important;
        }

        .pv-info-text a {
            color: #333 !important;
            text-decoration: none !important;
        }

        .pv-info-text a:hover {
            color: #E67E22 !important;
        }

        /* Info section title (like "Event Info:") - PLAIN TEXT, no card, CENTERED */
        .pv-info-section-title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.75rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 1.5rem !important;
            padding-bottom: 0.75rem !important;
            border-bottom: 2px solid rgba(230, 126, 34, 0.3) !important;
            display: block !important;
            grid-column: 1 / -1 !important;
            text-align: center !important;
            /* Ensure NO card styling */
            background: transparent !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
        }

        /* Info section container styling */
        .pv-info-styled {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)) !important;
            gap: 1.5rem !important;
            background: #ffffff !important;
            padding: 2.5rem 3.5rem !important;
        }

        /* Cards grid within info section - always 2 columns */
        .pv-info-cards-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 1.5rem !important;
            width: 100% !important;
            max-width: 700px !important;
            background: transparent !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
        }

        /* Ensure nested structures don't break */
        .pv-info-text > div,
        .pv-info-text > span {
            display: block !important;
        }

        /* Info content inside cards (the actual data) */
        .pv-info-content {
            font-family: 'Inter', sans-serif !important;
            font-size: 1.1rem !important;
            font-weight: 600 !important;
            color: #333 !important;
            line-height: 1.5 !important;
            margin-top: 0.25rem !important;
        }

        .pv-info-content a {
            color: #333 !important;
            text-decoration: none !important;
        }

        .pv-info-content a:hover {
            color: #E67E22 !important;
        }

        /* Clean up any old calendar icons */
        .pv-info-styled .icon.calendar,
        .pv-info-text .icon.calendar {
            display: none !important;
        }

        /* Override shaded containers to white */
        .cco_body .ads .container.shaded,
        .container.shaded,
        .footnote.selected {
            background-color: #ffffff !important;
        }

        /* Override RegisterHeader blue background to white */
        #RegisterHeader.clearfix.blue,
        #RegisterHeader.blue {
            background-color: #ffffff !important;
            background: #ffffff !important;
        }

        /* Orange border around entire form card */
        form#RegisterSinglePage {
            border: 3px solid #E67E22 !important;
            border-radius: 24px !important;
            overflow: hidden !important;
        }

        /* =========================================================
           HIDE ELEMENTS WE DON'T NEED
           ========================================================= */
        .pv-hero-section,
        .pv-content-card {
            display: none !important;
        }

        /* =========================================================
           OVERRIDE CMS DEFAULT BORDER COLORS
           Change #EDF1F5 (CMS default light gray-blue) to #E67E22 (orange)
           ========================================================= */
        body.pv-registration-page #RegisterBody *,
        body.pv-registration-page #Summary *,
        body.pv-registration-page #ReserversInformation *,
        body.pv-registration-page #Payment *,
        body.pv-registration-page .bottom_padding * {
            border-color: #E67E22 !important;
        }

        /* Keep specific border colors where needed */
        body.pv-registration-page #RegisterBody .performance {
            border: 2px solid transparent !important;
        }

        body.pv-registration-page #RegisterBody .performance:hover {
            border-color: #E67E22 !important;
        }

        body.pv-registration-page #RegisterBody .reservation {
            border: none !important;
        }

        body.pv-registration-page #RegisterBody .remove_reservation {
            border: 1px solid #ddd !important;
        }

        body.pv-registration-page #RegisterBody .reservation:hover .remove_reservation {
            border-color: #ff5252 !important;
        }

        body.pv-registration-page #RegisterBody .remove_reservation:hover {
            border-color: #ff5252 !important;
        }

        /* Form inputs - use #999 for default, #E67E22 for focus */
        body.pv-registration-page #RegisterBody input,
        body.pv-registration-page #RegisterBody select,
        body.pv-registration-page #RegisterBody textarea,
        body.pv-registration-page #Summary input,
        body.pv-registration-page #Summary select,
        body.pv-registration-page #Summary textarea,
        body.pv-registration-page #ReserversInformation input,
        body.pv-registration-page #ReserversInformation select,
        body.pv-registration-page #ReserversInformation textarea,
        body.pv-registration-page #Payment input,
        body.pv-registration-page #Payment select,
        body.pv-registration-page #Payment textarea {
            border-color: #999 !important;
        }

        body.pv-registration-page #RegisterBody input:focus,
        body.pv-registration-page #RegisterBody select:focus,
        body.pv-registration-page #RegisterBody textarea:focus,
        body.pv-registration-page #Summary input:focus,
        body.pv-registration-page #Summary select:focus,
        body.pv-registration-page #Summary textarea:focus,
        body.pv-registration-page #ReserversInformation input:focus,
        body.pv-registration-page #ReserversInformation select:focus,
        body.pv-registration-page #ReserversInformation textarea:focus,
        body.pv-registration-page #Payment input:focus,
        body.pv-registration-page #Payment select:focus,
        body.pv-registration-page #Payment textarea:focus {
            border-color: #E67E22 !important;
        }

        /* Section title underlines */
        body.pv-registration-page .pv-info-section-title {
            border-bottom-color: rgba(230, 126, 34, 0.3) !important;
        }

        /* Section separators - subtle */
        body.pv-registration-page #Summary,
        body.pv-registration-page #ReserversInformation,
        body.pv-registration-page #Payment,
        body.pv-registration-page #RegisterBody {
            border-color: rgba(0,0,0,0.06) !important;
        }

        /* =========================================================
           RESPONSIVE DESIGN - TABLET (768px)
           ========================================================= */
        @media (max-width: 768px) {
            /* Main container */
            .master-content-wrapper {
                padding: 1.5rem 1rem !important;
                max-width: 100% !important;
            }

            /* Banner image */
            #RegisterHeader .banner_image {
                border-radius: 16px !important;
                box-shadow: 0 10px 40px rgba(0,0,0,0.12) !important;
            }

            /* Header content */
            #RegisterHeader .column1 {
                padding: 1.5rem 1rem !important;
                margin-top: 1rem !important;
                border-radius: 16px 16px 0 0 !important;
            }

            /* Special Event badge */
            #RegisterHeader .column1::before {
                font-size: 0.7rem !important;
                padding: 0.4rem 0.85rem !important;
                letter-spacing: 1px !important;
                margin-bottom: 1rem !important;
            }

            /* Event name */
            #RegisterHeader .event_name {
                font-size: 1.65rem !important;
                line-height: 1.25 !important;
                margin-bottom: 0.75rem !important;
            }

            /* Event description */
            #RegisterHeader .event_description {
                font-size: 0.95rem !important;
                line-height: 1.6 !important;
            }

            /* Info grid */
            #RegisterHeader .column2 {
                padding: 1rem !important;
                grid-template-columns: 1fr !important;
                gap: 0.75rem !important;
            }

            #RegisterHeader .column2 > div,
            #RegisterHeader .column2 .map_link,
            #RegisterHeader .column2 .ical_link {
                padding: 1rem !important;
                gap: 0.75rem !important;
            }

            /* Info icons */
            .pv-info-icon {
                width: 40px !important;
                height: 40px !important;
                min-width: 40px !important;
                border-radius: 10px !important;
            }

            .pv-info-icon svg {
                width: 20px !important;
                height: 20px !important;
            }

            #RegisterHeader .column2 .map_link div,
            #RegisterHeader .column2 .ical_link div,
            .pv-info-text div {
                font-size: 0.9rem !important;
            }

            /* Info cards */
            .pv-info-card {
                padding: 1rem !important;
                gap: 0.75rem !important;
                border-radius: 12px !important;
            }

            .pv-info-text {
                font-size: 0.9rem !important;
            }

            .pv-card-label,
            .pv-external-label {
                font-size: 0.65rem !important;
            }

            .pv-info-styled {
                grid-template-columns: 1fr !important;
                padding: 1rem !important;
            }

            .pv-info-section-title {
                font-size: 1.15rem !important;
                margin-bottom: 0.75rem !important;
            }

            .pv-info-cards-grid {
                justify-content: center !important;
                gap: 0.5rem !important;
            }

            /* Info cards - centered vertical layout */
            .pv-info-card {
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
                padding: 0.75rem !important;
                gap: 0.5rem !important;
            }

            .pv-info-content {
                font-size: 0.8rem !important;
            }

            /* Form sections - comfortable mobile padding */
            #RegisterBody {
                padding: 2rem 1.5rem !important;
            }

            #RegisterBody .title {
                font-size: 1.25rem !important;
                margin-bottom: 1rem !important;
            }

            /* Performance/pricing rows */
            #RegisterBody .performance {
                flex-direction: column !important;
                gap: 0.75rem !important;
                text-align: center !important;
                padding: 1rem !important;
                border-radius: 10px !important;
            }

            #Summary,
            #ReserversInformation,
            #Payment {
                padding: 2rem 1.5rem !important;
            }

            #Buttons {
                padding: 1.5rem 1rem !important;
                flex-direction: column !important;
                gap: 2rem !important;
                text-align: center !important;
            }

            #Buttons .total strong,
            #Buttons .total .amount {
                font-size: 1.75rem !important;
            }

            #SubmitButton,
            #Buttons button[name="submit"],
            #Buttons input[type="submit"] {
                width: 100% !important;
                padding: 1rem 1.5rem !important;
                font-size: 1rem !important;
                border-radius: 10px !important;
            }

            /* Section headers */
            .pv-section-header {
                gap: 0.5rem !important;
            }

            .pv-section-icon {
                width: 36px !important;
                height: 36px !important;
            }

            .pv-section-icon svg {
                width: 18px !important;
                height: 18px !important;
            }

            .pv-section-title {
                font-size: 1.15rem !important;
            }

            /* Pricing grid */
            .pv-pricing-grid {
                grid-template-columns: 1fr !important;
                gap: 0.5rem !important;
            }

            /* Selection row - dropdowns + continue */
            .pv-selection-row {
                flex-direction: column !important;
                align-items: stretch !important;
                padding: 1rem !important;
                gap: 0.75rem !important;
            }

            .pv-select-group {
                min-width: 100% !important;
            }

            .pv-select-group select {
                padding: 0.85rem 2.5rem 0.85rem 1rem !important;
                font-size: 16px !important; /* Prevents iOS zoom */
            }

            .pv-continue-wrapper {
                width: 100% !important;
                margin-top: 0.5rem !important;
            }

            .pv-continue-btn {
                width: 100% !important;
                text-align: center !important;
                padding: 1rem 1.5rem !important;
            }

            /* Form labels */
            #Summary label,
            #Summary .label,
            #ReserversInformation label,
            #ReserversInformation .label,
            #Payment label,
            #Payment .label {
                font-size: 0.9rem !important;
            }

            /* Form inputs - mobile sizing (16px prevents iOS zoom) */
            /* body prefix gives HIGHER specificity than desktop rules */
            body.pv-registration-page .bottom_padding input,
            body.pv-registration-page .bottom_padding select,
            body.pv-registration-page .bottom_padding textarea,
            body.pv-registration-page #Summary input,
            body.pv-registration-page #Summary select,
            body.pv-registration-page #Summary textarea,
            body.pv-registration-page #ReserversInformation input,
            body.pv-registration-page #ReserversInformation select,
            body.pv-registration-page #ReserversInformation textarea,
            body.pv-registration-page #Payment input,
            body.pv-registration-page #Payment select,
            body.pv-registration-page #Payment textarea,
            body.pv-registration-page #RegisterBody input,
            body.pv-registration-page #RegisterBody select,
            body.pv-registration-page #RegisterBody textarea,
            body.pv-registration-page form input,
            body.pv-registration-page form select,
            body.pv-registration-page form textarea,
            body.pv-registration-page .pv-styled-input {
                font-size: 16px !important;
                padding: 12px 14px !important;
                min-height: 44px !important;
                height: auto !important;
            }

            /* Buttons - mobile sizing */
            body.pv-registration-page #Buttons button,
            body.pv-registration-page #RegisterBody button,
            body.pv-registration-page form button,
            body.pv-registration-page input[type="button"],
            body.pv-registration-page input[type="submit"],
            body.pv-registration-page .pv-styled-button,
            body.pv-registration-page .pv-continue-btn {
                font-size: 16px !important;
                padding: 14px 20px !important;
                min-height: 48px !important;
            }

            /* Table stacking for form layouts */
            table tr {
                display: flex !important;
                flex-direction: column !important;
                margin-bottom: 0.5rem !important;
            }

            table td {
                display: block !important;
                width: 100% !important;
                padding: 0.35rem 0 !important;
            }

            /* ALL buttons full width */
            button,
            input[type="button"],
            input[type="submit"] {
                width: 100% !important;
                min-width: 100% !important;
            }

            /* Remove button exception */
            button.remove_reservation,
            .remove_reservation {
                width: 24px !important;
                min-width: 24px !important;
                max-width: 24px !important;
            }

            /* Bottom container */
            .bottom_padding {
                border-radius: 0 0 16px 16px !important;
                margin-bottom: 1.5rem !important;
            }
        }

        /* =========================================================
           RESPONSIVE DESIGN - SMALL PHONES (480px)
           ========================================================= */
        @media (max-width: 480px) {
            .master-content-wrapper {
                padding: 1rem 0.75rem !important;
            }

            #RegisterHeader .banner_image {
                border-radius: 12px !important;
            }

            #RegisterHeader .column1 {
                padding: 1rem 0.85rem !important;
                margin-top: 0.75rem !important;
                border-radius: 12px 12px 0 0 !important;
            }

            #RegisterHeader .column1::before {
                font-size: 0.6rem !important;
                padding: 0.35rem 0.7rem !important;
            }

            #RegisterHeader .event_name {
                font-size: 1.35rem !important;
            }

            #RegisterHeader .event_description {
                font-size: 0.85rem !important;
            }

            #RegisterHeader .column2 {
                padding: 0.85rem !important;
            }

            .pv-info-icon {
                width: 36px !important;
                height: 36px !important;
                min-width: 36px !important;
            }

            .pv-info-icon svg {
                width: 18px !important;
                height: 18px !important;
            }

            /* Info cards grid - 2 columns on small phones too */
            .pv-info-cards-grid {
                justify-content: center !important;
                gap: 6px !important;
            }

            .pv-info-card {
                padding: 8px !important;
                gap: 4px !important;
                border-radius: 8px !important;
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
            }

            .pv-info-text {
                font-size: 0.75rem !important;
            }

            .pv-card-label {
                font-size: 0.55rem !important;
            }

            .pv-info-content {
                font-size: 0.7rem !important;
                line-height: 1.3 !important;
            }

            .pv-info-section-title {
                font-size: 1rem !important;
            }

            #RegisterBody,
            #Summary,
            #ReserversInformation,
            #Payment,
            #Buttons {
                padding: 1.5rem 1rem !important;
            }

            #RegisterBody .title,
            #Summary .title,
            #ReserversInformation .title,
            #Payment .title {
                font-size: 1.1rem !important;
                text-align: center !important;
                padding-left: 0 !important;
                border-left: none !important;
            }

            /* Hide decorative bar (::before pseudo-element) on mobile */
            #Summary .title::before,
            #RegisterBody .title::before,
            #ReserversInformation .title::before,
            #Payment .title::before {
                display: none !important;
                content: none !important;
                width: 0 !important;
                height: 0 !important;
            }

            /* Summary section mobile styling */
            #Summary {
                padding: 15px 10px !important;
                margin: 15px 0 !important;
            }

            #Summary table {
                width: 100% !important;
            }

            #Summary table tr {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
                margin-bottom: 10px !important;
            }

            #Summary table td {
                display: block !important;
                width: 100% !important;
                text-align: center !important;
                padding: 4px 0 !important;
            }

            /* Form inputs - small phone sizing */
            /* body prefix gives HIGHER specificity than desktop rules */
            body.pv-registration-page .bottom_padding input,
            body.pv-registration-page .bottom_padding select,
            body.pv-registration-page .bottom_padding textarea,
            body.pv-registration-page #Summary input,
            body.pv-registration-page #Summary select,
            body.pv-registration-page #Summary textarea,
            body.pv-registration-page #ReserversInformation input,
            body.pv-registration-page #ReserversInformation select,
            body.pv-registration-page #ReserversInformation textarea,
            body.pv-registration-page #Payment input,
            body.pv-registration-page #Payment select,
            body.pv-registration-page #Payment textarea,
            body.pv-registration-page #RegisterBody input,
            body.pv-registration-page #RegisterBody select,
            body.pv-registration-page #RegisterBody textarea,
            body.pv-registration-page form input,
            body.pv-registration-page form select,
            body.pv-registration-page form textarea,
            body.pv-registration-page .pv-styled-input {
                font-size: 16px !important;
                padding: 10px 12px !important;
                min-height: 44px !important;
                height: auto !important;
            }

            /* Buttons - small phone sizing */
            body.pv-registration-page #Buttons button,
            body.pv-registration-page #RegisterBody button,
            body.pv-registration-page form button,
            body.pv-registration-page input[type="button"],
            body.pv-registration-page input[type="submit"],
            body.pv-registration-page .pv-styled-button,
            body.pv-registration-page .pv-continue-btn {
                font-size: 15px !important;
                padding: 12px 18px !important;
                min-height: 44px !important;
            }

            #Buttons .total strong,
            #Buttons .total .amount {
                font-size: 1.5rem !important;
            }

            #SubmitButton,
            #Buttons button[name="submit"],
            #Buttons input[type="submit"] {
                padding: 0.85rem 1rem !important;
                font-size: 0.95rem !important;
            }

            .pv-selection-row {
                padding: 0.85rem !important;
            }

            .pv-select-group select {
                padding: 0.75rem 2rem 0.75rem 0.85rem !important;
            }

            .pv-continue-btn {
                padding: 0.85rem 1rem !important;
                font-size: 0.95rem !important;
            }

            .bottom_padding {
                border-radius: 0 0 12px 12px !important;
                margin-bottom: 1rem !important;
            }
        }
    `;

    // Remove existing styles if present
    var existingStyle = document.getElementById("pv-single-event-styles");
    if (existingStyle) existingStyle.remove();

    var styleEl = document.createElement("style");
    styleEl.id = "pv-single-event-styles";
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // =========================================================
    // SVG ICONS
    // =========================================================
    var icons = {
        location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    // =========================================================
    // GENERIC INFO CARD STYLING
    // =========================================================
    function styleInfoCards() {
        console.log("🔍 Starting styleInfoCards...");

        // Find info section - specifically column2 in RegisterHeader
        var infoSection = document.querySelector('#RegisterHeader .column2');

        if (!infoSection) {
            console.log("❌ No .column2 found");
            return;
        }

        if (infoSection.classList.contains('pv-info-styled')) {
            console.log("⏭️ Already styled");
            return;
        }

        // Debug: Log all children
        console.log("📦 Found section with children:", infoSection.children.length);

        // Collect data FIRST before hiding anything
        var sectionTitle = null;
        var locationData = null;
        var dateData = null;
        var locationHref = null;
        var dateHref = null;

        // Find .heading element for title
        var headingEl = infoSection.querySelector('.heading');
        if (headingEl) {
            sectionTitle = headingEl.textContent.trim();
            console.log("📌 Found heading:", sectionTitle);
        }

        // Find location data - look for map_link
        var mapLinkEl = infoSection.querySelector('.map_link');
        if (mapLinkEl) {
            locationHref = mapLinkEl.href || null;
            // The map_link contains a div with the address
            var addrDiv = mapLinkEl.querySelector('div');
            if (addrDiv) {
                locationData = addrDiv.innerHTML;
            } else {
                locationData = mapLinkEl.textContent.trim();
            }
            console.log("📍 Found location:", locationData);

            // Also look for location label (previous sibling or nearby .label)
            var prevEl = mapLinkEl.previousElementSibling;
            if (prevEl && prevEl.classList.contains('label')) {
                // Store label text for later
            }
        }

        // Find date data - look for ical_link
        var icalLinkEl = infoSection.querySelector('.ical_link');
        if (icalLinkEl) {
            dateHref = icalLinkEl.href || null;
            var dateDiv = icalLinkEl.querySelector('div');
            if (dateDiv) {
                dateData = dateDiv.innerHTML;
            } else {
                dateData = icalLinkEl.textContent.trim();
            }
            console.log("📅 Found date:", dateData);
        }

        // Also check for any labels with "Location:" or "Date:" text
        var allLabels = infoSection.querySelectorAll('.label');
        allLabels.forEach(function(label) {
            var labelText = label.textContent.toLowerCase();
            console.log("🏷️ Found label:", label.textContent);
        });

        // NOW hide ALL original children using setAttribute for !important
        var originalChildren = Array.from(infoSection.children);
        originalChildren.forEach(function(child) {
            child.setAttribute('style', 'display: none !important;');
            console.log("🙈 Hiding:", child.className || child.tagName);
        });

        // Build the NEW structure
        var newWrapper = document.createElement('div');
        newWrapper.className = 'pv-info-wrapper';
        newWrapper.style.cssText = 'display: block !important;';

        // Add section title (plain text, no card, no icon, ALWAYS centered)
        if (sectionTitle) {
            var titleEl = document.createElement('div');
            titleEl.className = 'pv-info-section-title';
            titleEl.textContent = sectionTitle;
            // Ensure centering works on ALL screen sizes via inline style
            titleEl.style.setProperty('text-align', 'center', 'important');
            newWrapper.appendChild(titleEl);
            console.log("✅ Added title:", sectionTitle);
        }

        // Create cards grid
        var cardsGrid = document.createElement('div');
        cardsGrid.className = 'pv-info-cards-grid';

        // Add LOCATION card (with icon)
        if (locationData) {
            var locCard = document.createElement('div');
            locCard.className = 'pv-info-card';
            locCard.innerHTML =
                '<div class="pv-info-icon">' + icons.location + '</div>' +
                '<div class="pv-info-text">' +
                    '<span class="pv-card-label">LOCATION</span>' +
                    '<div class="pv-info-content">' + locationData + '</div>' +
                '</div>';
            cardsGrid.appendChild(locCard);
            console.log("✅ Added location card");
        }

        // Add DATE card (with icon)
        if (dateData) {
            var dateCard = document.createElement('div');
            dateCard.className = 'pv-info-card';
            dateCard.innerHTML =
                '<div class="pv-info-icon">' + icons.calendar + '</div>' +
                '<div class="pv-info-text">' +
                    '<span class="pv-card-label">DATE</span>' +
                    '<div class="pv-info-content">' + dateData + '</div>' +
                '</div>';
            cardsGrid.appendChild(dateCard);
            console.log("✅ Added date card");
        }

        newWrapper.appendChild(cardsGrid);

        // Append new content to section
        infoSection.appendChild(newWrapper);
        infoSection.classList.add('pv-info-styled');

        console.log("✅ Info cards styled successfully");
    }

    // Run info card styling
    styleInfoCards();

    // =========================================================
    // STYLE PRICING SECTION - Parses HTML text and creates styled cards
    // =========================================================
    function stylePricingSection() {
        console.log('💰 stylePricingSection() called');
        var registerBody = document.querySelector('#RegisterBody');
        if (!registerBody) {
            console.log('💰 No #RegisterBody found - exiting');
            return;
        }
        if (registerBody.classList.contains('pv-pricing-styled')) {
            console.log('💰 Already styled (has pv-pricing-styled class) - exiting');
            console.log('💰 TIP: Run this to retry: document.querySelector("#RegisterBody").classList.remove("pv-pricing-styled")');
            return;
        }
        console.log('💰 #RegisterBody found, processing...');

        // Get the raw HTML content of RegisterBody
        var html = registerBody.innerHTML;
        console.log('💰 Raw HTML length:', html.length);

        // Find where form controls start - everything after this we leave alone
        var formStart = html.search(/<(input|select|table|form)/i);
        console.log('💰 Form elements start at position:', formStart);
        if (formStart === -1) formStart = html.length;

        // Get only the text before form elements
        var pricingHtml = html.substring(0, formStart);
        console.log('💰 Pricing HTML (first 800 chars):', pricingHtml.substring(0, 800));

        // Strip HTML tags to get plain text, preserve line breaks
        var plainText = pricingHtml
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim();

        console.log('💰 Plain text extracted:', plainText);

        // Split into lines
        var lines = plainText.split('\n').map(function(l) { return l.trim(); }).filter(function(l) { return l && l !== '---'; });

        console.log('💰 Parsing pricing lines:', lines);
        console.log('💰 Number of lines found:', lines.length);

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
            console.log('💰 No valid pricing items found (count:', pricingItems.length, ') - NOT adding styled class so we can retry');
            // DON'T add the class here - we want to be able to retry if parsing failed
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
            console.log('💰 Hidden', siblingsToHide.length, 'original text nodes/elements');

            // THIRD: Insert our styled container after title
            titleNode.insertAdjacentElement('afterend', pricingContainer);

            console.log('💰 Pricing section styled successfully');
        }

        registerBody.classList.add('pv-pricing-styled');
    }

    // Run pricing section styling
    stylePricingSection();

    // =========================================================
    // CENTER CATEGORY DROPDOWN
    // =========================================================
    function centerCategoryDropdown() {
        var registerBody = document.querySelector('#RegisterBody');
        if (!registerBody) return;

        // Find all select elements in RegisterBody
        var selects = registerBody.querySelectorAll('select');
        selects.forEach(function(select) {
            // Look for category-related selects
            var name = (select.name || '').toLowerCase();
            var id = (select.id || '').toLowerCase();
            var parentText = (select.parentElement && select.parentElement.textContent || '').toLowerCase();

            // If it's a category select (or any main dropdown)
            if (name.includes('category') || id.includes('category') ||
                parentText.includes('category') || parentText.includes('select')) {

                // Wrap in centered container if not already wrapped
                if (!select.parentElement.classList.contains('pv-category-wrapper')) {
                    var wrapper = document.createElement('div');
                    wrapper.className = 'pv-category-wrapper';
                    wrapper.style.cssText = `
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        width: 100% !important;
                        margin: 1.5rem 0 !important;
                    `;

                    // Find associated label
                    var label = select.previousElementSibling;
                    if (label && label.tagName === 'LABEL') {
                        label.style.cssText = `
                            font-family: 'Urbanist', sans-serif !important;
                            font-size: 1.25rem !important;
                            font-weight: 700 !important;
                            color: #2980b9 !important;
                            text-align: center !important;
                            margin-bottom: 0.75rem !important;
                            display: block !important;
                        `;
                        wrapper.appendChild(label.cloneNode(true));
                        label.style.display = 'none';
                    }

                    // Style the select
                    select.style.cssText = `
                        max-width: 400px !important;
                        width: 100% !important;
                        border: 2px solid #2980b9 !important;
                        border-radius: 12px !important;
                        padding: 1rem 3rem 1rem 1.5rem !important;
                        font-size: 1.1rem !important;
                        font-weight: 600 !important;
                        font-family: 'Inter', sans-serif !important;
                        background-color: #ffffff !important;
                        color: #333 !important;
                        text-align: center !important;
                        text-align-last: center !important;
                        appearance: none !important;
                        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232980b9' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
                        background-repeat: no-repeat !important;
                        background-position: right 1rem center !important;
                        cursor: pointer !important;
                    `;

                    // Insert wrapper
                    select.parentNode.insertBefore(wrapper, select);
                    wrapper.appendChild(select);

                    console.log('✅ Category dropdown centered:', select.name || select.id);
                }
            }
        });
    }

    centerCategoryDropdown();

    // =========================================================
    // REMOVE DASHED BORDERS FROM CONTAINERS (but NOT form inputs!)
    // =========================================================
    function removeDashedBorders() {
        var registerBody = document.querySelector('#RegisterBody');
        if (!registerBody) return;

        // List of form element tags to NEVER remove borders from
        var formTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'];

        // Find all elements with inline border styles (excluding form inputs)
        var allElements = registerBody.querySelectorAll('*');
        allElements.forEach(function(el) {
            // Skip form elements - we WANT borders on these!
            if (formTags.indexOf(el.tagName) !== -1) {
                return;
            }

            var style = el.getAttribute('style');
            if (style && (style.includes('dashed') || style.includes('dotted'))) {
                el.style.borderStyle = 'none';
                console.log('🧹 Removed dashed border from:', el.className || el.tagName);
            }
        });

        // Only target container patterns (divs, fieldsets, tables) - NOT inputs
        var containers = registerBody.querySelectorAll('div, fieldset, table, tbody, tr, td');
        containers.forEach(function(container) {
            // Only remove ugly dashed/dotted borders from containers
            var currentStyle = window.getComputedStyle(container);
            if (currentStyle.borderStyle === 'dashed' || currentStyle.borderStyle === 'dotted') {
                container.style.border = 'none';
                container.style.borderStyle = 'none';
            }
            container.style.outline = 'none';
        });

        console.log('✅ Dashed borders removed (form inputs preserved)');
    }

    removeDashedBorders();

    // =========================================================
    // ENSURE DELETE BUTTONS ARE STYLED (DIV-based structure)
    // =========================================================
    function styleDeleteButtons() {
        var registerBody = document.querySelector('#RegisterBody');
        if (!registerBody) return;

        // Find all reservation rows (DIV-based, not table)
        var reservations = registerBody.querySelectorAll('.reservation, .clearfix.reservation');
        reservations.forEach(function(row) {
            // Ensure row has position relative for absolute positioning of button
            row.style.position = 'relative';
            row.style.paddingRight = '50px'; // Make room for delete button

            // Find delete button
            var deleteBtn = row.querySelector('.remove_reservation, button.remove_reservation');
            if (deleteBtn && !deleteBtn.classList.contains('pv-delete-styled')) {
                // Apply inline styles to ensure positioning (highest specificity)
                deleteBtn.style.cssText = `
                    position: absolute !important;
                    right: 10px !important;
                    top: 50% !important;
                    transform: translateY(-50%) !important;
                    width: 28px !important;
                    height: 28px !important;
                    min-width: 28px !important;
                    max-width: 28px !important;
                    min-height: 28px !important;
                    max-height: 28px !important;
                    border-radius: 50% !important;
                    background: #fff5f5 !important;
                    border: 1px solid #ffcdd2 !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    color: #999 !important;
                    font-size: 14px !important;
                    font-weight: bold !important;
                    line-height: 1 !important;
                    box-shadow: none !important;
                    outline: none !important;
                    opacity: 0.6 !important;
                    z-index: 100 !important;
                    left: auto !important;
                    float: none !important;
                `;

                // Add hover effect via mouseenter/mouseleave
                deleteBtn.addEventListener('mouseenter', function() {
                    this.style.background = '#ff5252';
                    this.style.borderColor = '#ff5252';
                    this.style.color = 'white';
                    this.style.opacity = '1';
                    this.style.transform = 'translateY(-50%) scale(1.1)';
                });

                deleteBtn.addEventListener('mouseleave', function() {
                    this.style.background = '#fff5f5';
                    this.style.borderColor = '#ffcdd2';
                    this.style.color = '#e57373';
                    this.style.opacity = '0.6';
                    this.style.transform = 'translateY(-50%)';
                });

                // Mark as styled
                deleteBtn.classList.add('pv-delete-styled');
                console.log('✅ Styled delete button in reservation row');
            }
        });

        // Also add hover effect on row to show delete button more prominently
        reservations.forEach(function(row) {
            if (row.classList.contains('pv-row-hover-attached')) return;

            row.addEventListener('mouseenter', function() {
                var btn = this.querySelector('.remove_reservation');
                if (btn) {
                    btn.style.opacity = '1';
                    btn.style.background = '#ffebee';
                    btn.style.borderColor = '#ff5252';
                    btn.style.color = '#ff5252';
                }
            });

            row.addEventListener('mouseleave', function() {
                var btn = this.querySelector('.remove_reservation');
                if (btn && !btn.matches(':hover')) {
                    btn.style.opacity = '0.6';
                    btn.style.background = '#fff5f5';
                    btn.style.borderColor = '#ffcdd2';
                    btn.style.color = '#e57373';
                }
            });

            row.classList.add('pv-row-hover-attached');
        });
    }

    styleDeleteButtons();

    // Re-run on DOM changes (for dynamically added rows and validation messages)
    var observer = new MutationObserver(function(mutations) {
        styleDeleteButtons();
        // Debounce forceFormInputStyles to avoid excessive calls
        clearTimeout(window.pvValidationDebounce);
        window.pvValidationDebounce = setTimeout(function() {
            forceFormInputStyles();
            forceGridLayouts(); // Re-apply grid after DOM changes
        }, 100);
    });

    var registerBody = document.querySelector('#RegisterBody');
    if (registerBody) {
        observer.observe(registerBody, { childList: true, subtree: true });
    }

    // Also observe #Buttons section for validation messages
    var buttonsSection = document.querySelector('#Buttons');
    if (buttonsSection) {
        observer.observe(buttonsSection, { childList: true, subtree: true });
    }

    // Observe entire form for validation message changes
    var form = document.querySelector('form#RegisterSinglePage');
    if (form) {
        var formObserver = new MutationObserver(function(mutations) {
            clearTimeout(window.pvFormValidationDebounce);
            window.pvFormValidationDebounce = setTimeout(function() {
                forceFormInputStyles();
                forceGridLayouts(); // Re-apply grid after DOM changes
            }, 100);
        });
        formObserver.observe(form, { childList: true, subtree: true });
    }

    // =========================================================
    // GENERIC FORM STYLING - Works with any form structure
    // =========================================================

    // Icon definitions for different section types
    var sectionIcons = {
        default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        money: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
        card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
        ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 9a3 3 0 013-3h14a3 3 0 013 3v6a3 3 0 01-3 3H5a3 3 0 01-3-3V9z"/><path d="M9 6v12M15 6v12"/></svg>'
    };

    // Transform any section's title to have an icon
    function transformSectionTitle(section, iconType) {
        if (!section || section.classList.contains('pv-title-transformed')) return;

        var title = section.querySelector('.title, h2, h3, .heading');
        if (title && !title.classList.contains('pv-section-title')) {
            var icon = sectionIcons[iconType] || sectionIcons.default;
            var newTitle = document.createElement('div');
            newTitle.className = 'pv-section-header';
            newTitle.innerHTML = '<div class="pv-section-icon">' + icon + '</div>' +
                '<h3 class="pv-section-title">' + title.textContent + '</h3>';
            title.parentNode.replaceChild(newTitle, title);
        }
        section.classList.add('pv-title-transformed');
    }

    // Style all form inputs in a section
    function styleFormInputs(section) {
        if (!section) return;

        // Style all input types
        var inputs = section.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="password"], textarea');
        inputs.forEach(function(input) {
            input.classList.add('pv-form-input');
        });

        // Style all selects
        var selects = section.querySelectorAll('select');
        selects.forEach(function(select) {
            select.classList.add('pv-form-select');
        });

        // Style all labels
        var labels = section.querySelectorAll('label');
        labels.forEach(function(label) {
            label.classList.add('pv-form-label');
        });
    }

    // Style submit/action buttons
    function styleButtons(section) {
        if (!section) return;

        var submitBtns = section.querySelectorAll('input[type="submit"], button[type="submit"]');
        submitBtns.forEach(function(btn) {
            btn.classList.add('pv-submit-btn');
        });

        // Style continue/next buttons differently
        var actionBtns = section.querySelectorAll('input[type="button"], button:not([type="submit"])');
        actionBtns.forEach(function(btn) {
            if (!btn.classList.contains('pv-submit-btn')) {
                btn.classList.add('pv-continue-btn');
            }
        });
    }

    // Main transformation function - finds and styles all form sections
    function transformAllSections() {
        var form = document.querySelector('form#RegisterSinglePage, form[id*="Register"], form');
        if (!form) return;

        // Find all major sections (divs with IDs or specific classes)
        var sections = form.querySelectorAll('div[id], section, .form-section, .vertical_padding > div');

        sections.forEach(function(section) {
            // Skip if already transformed or is a wrapper
            if (section.classList.contains('pv-transformed')) return;
            if (section.id === '' && !section.className) return;

            // Skip RegisterBody - we don't want icons there
            if (section.id === 'RegisterBody') {
                styleFormInputs(section);
                styleButtons(section);
                section.classList.add('pv-transformed');
                return;
            }

            // Determine icon type based on section content/id
            var sectionText = (section.id + ' ' + section.className + ' ' + (section.textContent || '').substring(0, 100)).toLowerCase();
            var iconType = 'default';

            if (sectionText.includes('information') || sectionText.includes('contact') || sectionText.includes('personal') || sectionText.includes('reserver')) {
                iconType = 'person';
            } else if (sectionText.includes('payment') || sectionText.includes('card') || sectionText.includes('billing')) {
                iconType = 'card';
            } else if (sectionText.includes('summary') || sectionText.includes('donation') || sectionText.includes('total')) {
                iconType = 'money';
            } else if (sectionText.includes('ticket') || sectionText.includes('reservation') || sectionText.includes('register')) {
                iconType = 'ticket';
            }

            // Transform the section (but not RegisterBody)
            transformSectionTitle(section, iconType);
            styleFormInputs(section);
            styleButtons(section);

            section.classList.add('pv-transformed');
        });

        console.log("✅ Form sections transformed");
    }

    // Run generic transformations
    transformAllSections();
    // NOTE: Section visibility (hide until continue click) is handled by the CMS natively
    // We only apply styling - no show/hide functionality needed

    // =========================================================
    // CLEANUP - Remove previous PV elements if they exist
    // =========================================================
    var pvHero = document.querySelector(".pv-hero-section");
    if (pvHero) pvHero.remove();

    var pvCard = document.querySelector(".pv-content-card");
    if (pvCard) pvCard.remove();

    // Make sure bottom_padding is visible
    var bottomPadding = document.querySelector(".bottom_padding");
    if (bottomPadding) {
        bottomPadding.style.display = "block";
    }

    // =========================================================
    // MOBILE-FIRST LAYOUT (AGGRESSIVE JS-BASED APPROACH)
    // =========================================================
    // Detects viewport and applies ALL styles inline:
    // - Centered text and content
    // - Responsive font sizes
    // - Full-width form elements
    // - Proper mobile layout

    function forceFormInputStyles() {
        // Multiple detection methods for mobile
        var mobileMediaQuery = window.matchMedia('(max-width: 768px)');
        var isMobile = mobileMediaQuery.matches;
        var viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

        if (viewportWidth <= 768) {
            isMobile = true;
        }

        console.log("📱 MOBILE-FIRST LAYOUT - Mobile:", isMobile, "| Viewport:", viewportWidth + "px");

        // =====================================================
        // MOBILE LAYOUT: COMPREHENSIVE RESPONSIVE DESIGN
        // =====================================================
        if (isMobile) {
            // Determine if small phone (under 400px)
            var isSmallPhone = viewportWidth < 400;
            var sidePadding = isSmallPhone ? '8px' : '12px';
            var sectionPadding = isSmallPhone ? '12px 10px' : '16px 14px';

            // Main outer containers - minimal padding for max card width
            var outerContainers = document.querySelectorAll('.master-content-wrapper, #BodyContainer, #co_content_container');
            outerContainers.forEach(function(container) {
                container.style.setProperty('width', '100%', 'important');
                container.style.setProperty('max-width', '100%', 'important');
                container.style.setProperty('padding', '8px', 'important');
                container.style.setProperty('margin', '0', 'important');
                container.style.setProperty('box-sizing', 'border-box', 'important');
            });

            // Form container - full width
            var formContainer = document.querySelector('form#RegisterSinglePage');
            if (formContainer) {
                formContainer.style.setProperty('width', '100%', 'important');
                formContainer.style.setProperty('max-width', '100%', 'important');
                formContainer.style.setProperty('padding', '0', 'important');
                formContainer.style.setProperty('margin', '0', 'important');
            }

            // Banner image - full width, proper sizing
            var bannerImage = document.querySelector('#RegisterHeader .banner_image');
            if (bannerImage) {
                bannerImage.style.setProperty('width', '100%', 'important');
                bannerImage.style.setProperty('max-width', '100%', 'important');
                bannerImage.style.setProperty('border-radius', '12px', 'important');
                bannerImage.style.setProperty('margin', '0 0 12px 0', 'important');
                bannerImage.style.setProperty('overflow', 'hidden', 'important');
                var img = bannerImage.querySelector('img');
                if (img) {
                    img.style.setProperty('width', '100%', 'important');
                    img.style.setProperty('height', 'auto', 'important');
                    img.style.setProperty('display', 'block', 'important');
                }
            }

            // RegisterHeader - the main header area
            var registerHeader = document.querySelector('#RegisterHeader');
            if (registerHeader) {
                registerHeader.style.setProperty('padding', '0', 'important');
                registerHeader.style.setProperty('width', '100%', 'important');
            }

            // Column1 - content card with event name/description
            var column1 = document.querySelector('#RegisterHeader .column1');
            if (column1) {
                column1.style.setProperty('width', '100%', 'important');
                column1.style.setProperty('max-width', '100%', 'important');
                column1.style.setProperty('padding', sectionPadding, 'important');
                column1.style.setProperty('margin', '0', 'important');
                column1.style.setProperty('float', 'none', 'important');
                column1.style.setProperty('border-radius', '12px 12px 0 0', 'important');
                column1.style.setProperty('box-sizing', 'border-box', 'important');
            }

            // Column2 - info section with location/date
            var column2 = document.querySelector('#RegisterHeader .column2');
            if (column2) {
                column2.style.setProperty('width', '100%', 'important');
                column2.style.setProperty('max-width', '100%', 'important');
                column2.style.setProperty('padding', sidePadding, 'important');
                column2.style.setProperty('margin', '0', 'important');
                column2.style.setProperty('float', 'none', 'important');
                column2.style.setProperty('display', 'block', 'important');
                column2.style.setProperty('box-sizing', 'border-box', 'important');
            }

            // Special Event badge - scale down
            // This is a ::before pseudo-element, so we handle via class

            // Event name/title - responsive sizing
            var eventName = document.querySelector('.event_name');
            if (eventName) {
                var titleSize = isSmallPhone ? '1.3rem' : '1.5rem';
                eventName.style.setProperty('text-align', 'center', 'important');
                eventName.style.setProperty('font-size', titleSize, 'important');
                eventName.style.setProperty('line-height', '1.25', 'important');
                eventName.style.setProperty('margin-bottom', '10px', 'important');
                eventName.style.setProperty('padding', '0', 'important');
                eventName.style.setProperty('word-wrap', 'break-word', 'important');
            }

            // Event description
            var eventDesc = document.querySelector('.event_description');
            if (eventDesc) {
                var descSize = isSmallPhone ? '0.9rem' : '0.95rem';
                eventDesc.style.setProperty('text-align', 'center', 'important');
                eventDesc.style.setProperty('font-size', descSize, 'important');
                eventDesc.style.setProperty('line-height', '1.5', 'important');
                eventDesc.style.setProperty('margin', '0', 'important');
                eventDesc.style.setProperty('padding', '0', 'important');
            }

            // Section titles (.title class)
            var sectionTitles = document.querySelectorAll('.title');
            sectionTitles.forEach(function(title) {
                var size = isSmallPhone ? '1.1rem' : '1.25rem';
                title.style.setProperty('text-align', 'center', 'important');
                title.style.setProperty('font-size', size, 'important');
                title.style.setProperty('margin-bottom', '12px', 'important');
            });

            // Info wrapper and cards grid
            var infoWrapper = document.querySelector('.pv-info-wrapper');
            if (infoWrapper) {
                infoWrapper.style.setProperty('width', '100%', 'important');
                infoWrapper.style.setProperty('padding', '0', 'important');
                infoWrapper.style.setProperty('margin', '0', 'important');
            }

            var infoGrid = document.querySelector('.pv-info-cards-grid');
            if (infoGrid) {
                // Flexbox centered layout
                infoGrid.style.setProperty('display', 'flex', 'important');
                infoGrid.style.setProperty('flex-wrap', 'wrap', 'important');
                infoGrid.style.setProperty('justify-content', 'center', 'important');
                infoGrid.style.setProperty('gap', isSmallPhone ? '8px' : '10px', 'important');
                infoGrid.style.setProperty('width', '100%', 'important');
                infoGrid.style.setProperty('padding', '0', 'important');
            }

            // Info section title
            var infoTitle = document.querySelector('.pv-info-section-title');
            if (infoTitle) {
                var titleSize = isSmallPhone ? '1rem' : '1.15rem';
                infoTitle.style.setProperty('font-size', titleSize, 'important');
                infoTitle.style.setProperty('margin-bottom', '10px', 'important');
                infoTitle.style.setProperty('padding-bottom', '8px', 'important');
                infoTitle.style.setProperty('text-align', 'center', 'important');
            }

            // Info cards - location and date (2-column grid)
            var infoCards = document.querySelectorAll('.pv-info-card');
            infoCards.forEach(function(card) {
                // Each card takes one grid cell
                card.style.setProperty('width', '100%', 'important');
                card.style.setProperty('padding', isSmallPhone ? '8px' : '10px', 'important');
                card.style.setProperty('margin', '0', 'important');
                card.style.setProperty('border-radius', '10px', 'important');
                card.style.setProperty('display', 'flex', 'important');
                card.style.setProperty('flex-direction', 'column', 'important');
                card.style.setProperty('align-items', 'center', 'important');
                card.style.setProperty('text-align', 'center', 'important');
                card.style.setProperty('gap', '6px', 'important');
                card.style.setProperty('box-sizing', 'border-box', 'important');
            });

            // Info icons - smaller on mobile
            var infoIcons = document.querySelectorAll('.pv-info-icon');
            infoIcons.forEach(function(icon) {
                var iconSize = isSmallPhone ? '36px' : '42px';
                icon.style.setProperty('width', iconSize, 'important');
                icon.style.setProperty('height', iconSize, 'important');
                icon.style.setProperty('min-width', iconSize, 'important');
                icon.style.setProperty('border-radius', '8px', 'important');
                var svg = icon.querySelector('svg');
                if (svg) {
                    var svgSize = isSmallPhone ? '18px' : '20px';
                    svg.style.setProperty('width', svgSize, 'important');
                    svg.style.setProperty('height', svgSize, 'important');
                }
            });

            // Info text content
            var infoTexts = document.querySelectorAll('.pv-info-text');
            infoTexts.forEach(function(text) {
                text.style.setProperty('font-size', isSmallPhone ? '0.85rem' : '0.9rem', 'important');
                text.style.setProperty('line-height', '1.4', 'important');
            });

            // Card labels
            var cardLabels = document.querySelectorAll('.pv-card-label');
            cardLabels.forEach(function(label) {
                label.style.setProperty('font-size', isSmallPhone ? '0.6rem' : '0.65rem', 'important');
                label.style.setProperty('margin-bottom', '4px', 'important');
            });

            // Info content
            var infoContents = document.querySelectorAll('.pv-info-content');
            infoContents.forEach(function(content) {
                content.style.setProperty('font-size', isSmallPhone ? '0.85rem' : '0.9rem', 'important');
            });

            // Form sections - RegisterBody, Summary, etc.
            var formSections = document.querySelectorAll('#RegisterBody, #Summary, #ReserversInformation, #Payment, #Buttons');
            formSections.forEach(function(section) {
                section.style.setProperty('width', '100%', 'important');
                section.style.setProperty('max-width', '100%', 'important');
                section.style.setProperty('padding', sectionPadding, 'important');
                section.style.setProperty('box-sizing', 'border-box', 'important');
                section.style.setProperty('text-align', 'center', 'important');
            });

            // Bottom padding container
            var bottomPadding = document.querySelector('.bottom_padding');
            if (bottomPadding) {
                bottomPadding.style.setProperty('padding', '0', 'important');
                bottomPadding.style.setProperty('margin', '0 0 16px 0', 'important');
                bottomPadding.style.setProperty('border-radius', '0 0 12px 12px', 'important');
            }

            // Pricing info box
            var pricingInfo = document.querySelector('.pv-pricing-info');
            if (pricingInfo) {
                pricingInfo.style.setProperty('padding', isSmallPhone ? '10px' : '12px', 'important');
                pricingInfo.style.setProperty('margin-bottom', '12px', 'important');
                pricingInfo.style.setProperty('border-radius', '10px', 'important');
            }

            // Pricing grid
            var pricingGrid = document.querySelector('.pv-pricing-grid');
            if (pricingGrid) {
                pricingGrid.style.setProperty('display', 'flex', 'important');
                pricingGrid.style.setProperty('flex-direction', 'column', 'important');
                pricingGrid.style.setProperty('gap', '6px', 'important');
            }

            // Price items
            var priceItems = document.querySelectorAll('.pv-price-item');
            priceItems.forEach(function(item) {
                item.style.setProperty('padding', '8px 10px', 'important');
                item.style.setProperty('border-radius', '8px', 'important');
            });

            // Performance/ticket rows
            var performances = document.querySelectorAll('.performance');
            performances.forEach(function(perf) {
                perf.style.setProperty('padding', '12px', 'important');
                perf.style.setProperty('margin-bottom', '8px', 'important');
                perf.style.setProperty('border-radius', '10px', 'important');
                perf.style.setProperty('text-align', 'center', 'important');
            });

            // Reservation rows
            var reservations = document.querySelectorAll('.reservation');
            reservations.forEach(function(res) {
                res.style.setProperty('text-align', 'center', 'important');
                res.style.setProperty('display', 'flex', 'important');
                res.style.setProperty('flex-direction', 'column', 'important');
                res.style.setProperty('align-items', 'center', 'important');
                res.style.setProperty('width', '100%', 'important');
                res.style.setProperty('padding', '10px', 'important');
                res.style.setProperty('margin-bottom', '8px', 'important');
            });

            // =====================================================
            // RESERVATION FORM - Dropdowns and Buttons Layout
            // =====================================================

            // Style the category dropdown container
            var categorySelects = document.querySelectorAll('#RegisterBody select');
            categorySelects.forEach(function(select) {
                select.style.setProperty('width', '100%', 'important');
                select.style.setProperty('max-width', '100%', 'important');
                select.style.setProperty('margin-bottom', '10px', 'important');
                select.style.setProperty('font-size', '14px', 'important');
                select.style.setProperty('padding', '10px 12px', 'important');
            });

            // Find reservation row with dropdown + continue button
            var reservationControls = document.querySelectorAll('#RegisterBody .reservation, #RegisterBody .clearfix');
            reservationControls.forEach(function(ctrl) {
                // Stack elements vertically
                ctrl.style.setProperty('display', 'flex', 'important');
                ctrl.style.setProperty('flex-direction', 'column', 'important');
                ctrl.style.setProperty('align-items', 'center', 'important');
                ctrl.style.setProperty('gap', '8px', 'important');
                ctrl.style.setProperty('width', '100%', 'important');
            });

            // Style CONTINUE and action buttons in RegisterBody - smaller on mobile
            var actionButtons = document.querySelectorAll('#RegisterBody button:not(.remove_reservation), #RegisterBody input[type="button"]:not(.remove_reservation), #RegisterBody input[type="submit"]');
            actionButtons.forEach(function(btn) {
                btn.style.setProperty('font-size', isSmallPhone ? '13px' : '14px', 'important');
                btn.style.setProperty('padding', isSmallPhone ? '10px 16px' : '12px 20px', 'important');
                btn.style.setProperty('min-height', '40px', 'important');
                btn.style.setProperty('width', '100%', 'important');
                btn.style.setProperty('max-width', '280px', 'important');
                btn.style.setProperty('margin', '4px auto', 'important');
                btn.style.setProperty('display', 'block', 'important');
            });

            // Style remove/X button specifically - keep it small
            var removeButtons = document.querySelectorAll('.remove_reservation, button.remove_reservation');
            removeButtons.forEach(function(btn) {
                btn.style.setProperty('width', '28px', 'important');
                btn.style.setProperty('min-width', '28px', 'important');
                btn.style.setProperty('max-width', '28px', 'important');
                btn.style.setProperty('height', '28px', 'important');
                btn.style.setProperty('padding', '0', 'important');
                btn.style.setProperty('font-size', '14px', 'important');
                btn.style.setProperty('position', 'relative', 'important');
                btn.style.setProperty('margin', '4px auto', 'important');
            });

            // MAKE RESERVATION / Final submit button - prominent but not oversized
            var submitButton = document.querySelector('#SubmitButton, #Buttons input[type="submit"], #Buttons button[type="submit"]');
            if (submitButton) {
                submitButton.style.setProperty('font-size', isSmallPhone ? '14px' : '15px', 'important');
                submitButton.style.setProperty('padding', isSmallPhone ? '12px 20px' : '14px 24px', 'important');
                submitButton.style.setProperty('min-height', '46px', 'important');
                submitButton.style.setProperty('width', '100%', 'important');
                submitButton.style.setProperty('max-width', '300px', 'important');
                submitButton.style.setProperty('margin', '0 auto', 'important');
                submitButton.style.setProperty('display', 'block', 'important');
            }

            // =====================================================
            // SUMMARY SECTION - Clean mobile layout
            // =====================================================

            // Fix Summary container
            var summarySection = document.querySelector('#Summary');
            if (summarySection) {
                summarySection.style.setProperty('padding', '15px 10px', 'important');
                summarySection.style.setProperty('margin', '15px 0', 'important');
                summarySection.style.setProperty('background', '#f8f9fa', 'important');
                summarySection.style.setProperty('border-radius', '10px', 'important');
                summarySection.style.setProperty('border', '1px solid #e0e0e0', 'important');
            }

            // Fix Summary title - remove decorative bar (::before pseudo-element)
            var summaryTitle = document.querySelector('#Summary .title, #Summary h3, #Summary h4');
            if (summaryTitle) {
                summaryTitle.style.setProperty('display', 'block', 'important');
                summaryTitle.style.setProperty('text-align', 'center', 'important');
                summaryTitle.style.setProperty('font-size', '18px', 'important');
                summaryTitle.style.setProperty('font-weight', '700', 'important');
                summaryTitle.style.setProperty('color', '#333', 'important');
                summaryTitle.style.setProperty('margin', '0 0 15px 0', 'important');
                summaryTitle.style.setProperty('padding', '0', 'important');
                summaryTitle.style.setProperty('padding-left', '0', 'important');
                summaryTitle.style.setProperty('border-left', 'none', 'important');
                summaryTitle.style.setProperty('position', 'relative', 'important');
            }

            // Additional Donation row - stack label and input
            var donationRow = document.querySelector('#Summary .donation, #Summary [class*="donation"], #Summary tr:has(input)');
            if (donationRow) {
                donationRow.style.setProperty('display', 'flex', 'important');
                donationRow.style.setProperty('flex-direction', 'column', 'important');
                donationRow.style.setProperty('align-items', 'center', 'important');
                donationRow.style.setProperty('gap', '8px', 'important');
                donationRow.style.setProperty('margin', '15px 0', 'important');
                donationRow.style.setProperty('width', '100%', 'important');
            }

            // Donation label
            var donationLabel = document.querySelector('#Summary label, #Summary .donation label, #Summary td:first-child');
            if (donationLabel && donationLabel.textContent && donationLabel.textContent.toLowerCase().includes('donation')) {
                donationLabel.style.setProperty('display', 'block', 'important');
                donationLabel.style.setProperty('text-align', 'center', 'important');
                donationLabel.style.setProperty('font-size', '14px', 'important');
                donationLabel.style.setProperty('margin-bottom', '5px', 'important');
                donationLabel.style.setProperty('width', '100%', 'important');
            }

            // Donation input - make it centered and appropriately sized
            var donationInput = document.querySelector('#Summary input[type="text"], #Summary input[type="number"], #Summary input:not([type="submit"]):not([type="button"])');
            if (donationInput) {
                donationInput.style.setProperty('width', '150px', 'important');
                donationInput.style.setProperty('max-width', '150px', 'important');
                donationInput.style.setProperty('text-align', 'center', 'important');
                donationInput.style.setProperty('margin', '0 auto', 'important');
                donationInput.style.setProperty('display', 'block', 'important');
                donationInput.style.setProperty('font-size', '16px', 'important');
                donationInput.style.setProperty('padding', '10px', 'important');
            }

            // Summary totals - make them readable
            var summaryTotals = document.querySelectorAll('#Summary .total, #Summary .subtotal, #Summary [class*="total"], #Summary tr');
            summaryTotals.forEach(function(total) {
                total.style.setProperty('display', 'block', 'important');
                total.style.setProperty('text-align', 'center', 'important');
                total.style.setProperty('width', '100%', 'important');
                total.style.setProperty('padding', '5px 0', 'important');
                total.style.setProperty('font-size', '14px', 'important');
            });

            // Make the final total prominent
            var finalTotal = document.querySelector('#Summary .total strong, #Summary strong, #Summary [class*="total"] strong');
            if (finalTotal) {
                finalTotal.style.setProperty('font-size', '20px', 'important');
                finalTotal.style.setProperty('color', '#E67E22', 'important');
                finalTotal.style.setProperty('display', 'block', 'important');
                finalTotal.style.setProperty('text-align', 'center', 'important');
                finalTotal.style.setProperty('margin-top', '10px', 'important');
            }

            // Tables - stack vertically
            var tables = document.querySelectorAll('table');
            tables.forEach(function(table) {
                table.style.setProperty('width', '100%', 'important');
                table.style.setProperty('display', 'block', 'important');
            });

            var tableRows = document.querySelectorAll('table tr');
            tableRows.forEach(function(row) {
                row.style.setProperty('display', 'flex', 'important');
                row.style.setProperty('flex-direction', 'column', 'important');
                row.style.setProperty('width', '100%', 'important');
                row.style.setProperty('margin-bottom', '6px', 'important');
                row.style.setProperty('text-align', 'center', 'important');
            });

            var tableCells = document.querySelectorAll('table td, table th');
            tableCells.forEach(function(cell) {
                cell.style.setProperty('display', 'block', 'important');
                cell.style.setProperty('width', '100%', 'important');
                cell.style.setProperty('text-align', 'center', 'important');
                cell.style.setProperty('padding', '4px 0', 'important');
            });

            // Buttons section - stack vertically
            var buttonsSection = document.querySelector('#Buttons');
            if (buttonsSection) {
                buttonsSection.style.setProperty('flex-direction', 'column', 'important');
                buttonsSection.style.setProperty('gap', '12px', 'important');
                buttonsSection.style.setProperty('align-items', 'center', 'important');
            }

            // Total display
            var totalDisplay = document.querySelector('#Buttons .total');
            if (totalDisplay) {
                totalDisplay.style.setProperty('text-align', 'center', 'important');
                var totalStrong = totalDisplay.querySelector('strong');
                if (totalStrong) {
                    totalStrong.style.setProperty('font-size', isSmallPhone ? '1.5rem' : '1.75rem', 'important');
                }
            }

            console.log("📱 Mobile layout applied - Small phone:", isSmallPhone);
        }

        // =====================================================
        // RESPONSIVE INPUT STYLING
        // =====================================================
        var isSmallPhone = viewportWidth < 400;

        // Font sizes - 16px minimum prevents iOS zoom on focus
        var fontSize = isMobile ? '16px' : '1.1rem';
        var inputPadding = isMobile ? (isSmallPhone ? '10px' : '12px 14px') : '0.9rem 1.1rem';
        var inputMinHeight = isMobile ? '42px' : 'auto';
        var buttonFontSize = isMobile ? (isSmallPhone ? '13px' : '14px') : '1rem';
        var buttonPadding = isMobile ? (isSmallPhone ? '10px 14px' : '12px 18px') : '0.9rem 2rem';
        var buttonMinHeight = isMobile ? '40px' : 'auto';
        var labelFontSize = isMobile ? (isSmallPhone ? '12px' : '13px') : '0.95rem';
        var borderRadius = isMobile ? '8px' : '10px';

        // Style ALL inputs
        var inputs = document.querySelectorAll('input, select, textarea');
        var styledCount = 0;

        inputs.forEach(function(input) {
            if (input.type === 'hidden' || input.type === 'checkbox' || input.type === 'radio' || input.type === 'submit' || input.type === 'button' || input.type === 'image') {
                return;
            }
            if (input.closest && input.closest('nav, header, .nav, .header, .menu')) {
                return;
            }

            input.classList.add('pv-styled-input');

            // Base styles
            input.style.setProperty('font-family', "'Inter', sans-serif", 'important');
            input.style.setProperty('border', '2px solid #999', 'important');
            input.style.setProperty('border-radius', borderRadius, 'important');
            input.style.setProperty('box-sizing', 'border-box', 'important');
            input.style.setProperty('background', '#ffffff', 'important');
            input.style.setProperty('color', '#333', 'important');
            input.style.setProperty('outline', 'none', 'important');
            input.style.setProperty('width', '100%', 'important');
            input.style.setProperty('max-width', '100%', 'important');
            input.style.setProperty('font-size', fontSize, 'important');
            input.style.setProperty('padding', inputPadding, 'important');
            input.style.setProperty('min-height', inputMinHeight, 'important');
            input.style.setProperty('height', 'auto', 'important');
            input.style.setProperty('line-height', '1.4', 'important');

            // Mobile: center text, display block
            if (isMobile) {
                input.style.setProperty('display', 'block', 'important');
                input.style.setProperty('margin', '0 auto 8px', 'important');
            }

            if (input.tagName === 'SELECT') {
                input.style.setProperty('cursor', 'pointer', 'important');
                input.style.setProperty('appearance', 'none', 'important');
                input.style.setProperty('-webkit-appearance', 'none', 'important');
                input.style.setProperty('background-image', "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", 'important');
                input.style.setProperty('background-repeat', 'no-repeat', 'important');
                input.style.setProperty('background-position', 'right 1rem center', 'important');
                input.style.setProperty('padding-right', '2.5rem', 'important');
            }

            if (input.tagName === 'TEXTAREA') {
                input.style.setProperty('resize', 'vertical', 'important');
                input.style.setProperty('min-height', isMobile ? '100px' : '80px', 'important');
            }

            styledCount++;
        });

        // Style buttons
        var buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
        buttons.forEach(function(btn) {
            if (btn.classList.contains('remove_reservation') || (btn.closest && btn.closest('.remove_reservation'))) {
                return;
            }
            if (btn.closest && btn.closest('nav, header, .nav, .header, .menu')) {
                return;
            }

            btn.classList.add('pv-styled-button');

            btn.style.setProperty('font-family', "'Inter', sans-serif", 'important');
            btn.style.setProperty('font-weight', '700', 'important');
            btn.style.setProperty('background', 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)', 'important');
            btn.style.setProperty('color', '#ffffff', 'important');
            btn.style.setProperty('border', 'none', 'important');
            btn.style.setProperty('border-radius', borderRadius, 'important');
            btn.style.setProperty('cursor', 'pointer', 'important');
            btn.style.setProperty('text-transform', 'uppercase', 'important');
            btn.style.setProperty('letter-spacing', '0.5px', 'important');
            btn.style.setProperty('box-shadow', '0 4px 15px rgba(230, 126, 34, 0.3)', 'important');
            btn.style.setProperty('font-size', buttonFontSize, 'important');
            btn.style.setProperty('padding', buttonPadding, 'important');
            btn.style.setProperty('min-height', buttonMinHeight, 'important');
            btn.style.setProperty('width', isMobile ? '100%' : 'auto', 'important');
            btn.style.setProperty('max-width', isMobile ? '280px' : 'none', 'important');

            if (isMobile) {
                btn.style.setProperty('display', 'block', 'important');
                btn.style.setProperty('margin', '6px auto', 'important');
                btn.style.setProperty('text-align', 'center', 'important');
            }
        });

        // Style labels
        var labels = document.querySelectorAll('.bottom_padding label, #Summary label, #ReserversInformation label, #Payment label, form label');
        labels.forEach(function(label) {
            label.classList.add('pv-styled-label');
            label.style.setProperty('font-family', "'Inter', sans-serif", 'important');
            label.style.setProperty('font-weight', '600', 'important');
            label.style.setProperty('color', '#333', 'important');
            label.style.setProperty('display', 'block', 'important');
            label.style.setProperty('font-size', labelFontSize, 'important');
            label.style.setProperty('margin-bottom', '8px', 'important');

            if (isMobile) {
                label.style.setProperty('text-align', 'center', 'important');
                label.style.setProperty('width', '100%', 'important');
            }
        });

        // =====================================================
        // CENTER BUTTONS SECTION - Center the boxes themselves
        // NOTE: Don't set display property - CMS handles visibility
        // =====================================================
        function centerButtonsSection() {
            var buttonsSection = document.querySelector('#Buttons');
            if (!buttonsSection) return;

            // Only apply centering styles - do NOT set display (CMS controls visibility)
            // These styles will take effect when CMS makes section visible
            buttonsSection.style.setProperty('flex-direction', 'column', 'important');
            buttonsSection.style.setProperty('align-items', 'center', 'important');
            buttonsSection.style.setProperty('width', '100%', 'important');
            console.log('📦 #Buttons container centering styles applied (display left to CMS)');

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
                console.log('🔘 Submit button wrapper centered');
            }
        }

        centerButtonsSection();

        console.log("✅ MOBILE-FIRST layout applied to", styledCount, "inputs. Mobile:", isMobile);
    }

    // Apply grid layouts to form sections (runs when CMS reveals sections)
    function forceGridLayouts() {
        console.log('🔧 forceGridLayouts() called');

        // #ReserversInformation grid - try multiple selectors
        var riFormContainer = document.querySelector('#ReserversInformation > div > div.clearfix:not(.title)');

        // If not found, try alternative selectors
        if (!riFormContainer) {
            console.log('⚠️ Primary selector failed, trying alternatives...');
            riFormContainer = document.querySelector('#ReserversInformation div.clearfix:not(.title)');
        }
        if (!riFormContainer) {
            riFormContainer = document.querySelector('#ReserversInformation > div.large_top_padding > div.clearfix');
        }
        if (!riFormContainer) {
            // Last resort: find by structure
            var riSection = document.querySelector('#ReserversInformation');
            if (riSection) {
                var candidates = riSection.querySelectorAll('div.clearfix');
                for (var i = 0; i < candidates.length; i++) {
                    if (!candidates[i].classList.contains('title') && candidates[i].children.length > 5) {
                        riFormContainer = candidates[i];
                        console.log('📍 Found form container via fallback search');
                        break;
                    }
                }
            }
        }

        if (riFormContainer) {
            console.log('✅ Found #ReserversInformation form container:', riFormContainer.className);
            console.log('   Current display:', window.getComputedStyle(riFormContainer).display);

            riFormContainer.style.setProperty('display', 'grid', 'important');
            riFormContainer.style.setProperty('grid-template-columns', 'repeat(2, 1fr)', 'important');
            riFormContainer.style.setProperty('gap', '1.5rem 2rem', 'important');
            riFormContainer.style.setProperty('width', '100%', 'important');

            console.log('   After setting: display =', window.getComputedStyle(riFormContainer).display);

            // Style each field row
            var fieldRows = riFormContainer.querySelectorAll(':scope > div.clearfix');
            fieldRows.forEach(function(row, i) {
                row.style.setProperty('display', 'flex', 'important');
                row.style.setProperty('flex-direction', 'column', 'important');
                row.style.setProperty('gap', '0.5rem', 'important');

                // Reset floats inside
                var innerDivs = row.querySelectorAll(':scope > div');
                innerDivs.forEach(function(div) {
                    div.style.setProperty('float', 'none', 'important');
                    div.style.setProperty('margin-left', '0', 'important');
                });

                // Last field spans full width
                if (i === fieldRows.length - 1) {
                    row.style.setProperty('grid-column', '1 / -1', 'important');
                }
            });

            console.log('📊 #ReserversInformation grid applied:', fieldRows.length, 'fields');
        } else {
            console.log('❌ Could NOT find #ReserversInformation form container!');
            console.log('   Available in #ReserversInformation:', document.querySelectorAll('#ReserversInformation *').length, 'elements');
        }

        // #CreditCard grid
        var creditCard = document.querySelector('#Payment #CreditCard');
        if (creditCard) {
            creditCard.style.setProperty('display', 'grid', 'important');
            creditCard.style.setProperty('grid-template-columns', 'repeat(2, 1fr)', 'important');
            creditCard.style.setProperty('gap', '1.5rem 2rem', 'important');
            creditCard.style.setProperty('width', '100%', 'important');
            creditCard.style.setProperty('margin-top', '1rem', 'important');

            // Style each credit card field
            var ccFields = creditCard.querySelectorAll(':scope > div.clearfix');
            ccFields.forEach(function(field) {
                field.style.setProperty('display', 'flex', 'important');
                field.style.setProperty('flex-direction', 'column', 'important');
                field.style.setProperty('gap', '0.5rem', 'important');

                var innerDivs = field.querySelectorAll(':scope > div');
                innerDivs.forEach(function(div) {
                    div.style.setProperty('float', 'none', 'important');
                    div.style.setProperty('margin-left', '0', 'important');
                });
            });

            console.log('📊 #CreditCard grid applied:', ccFields.length, 'fields');
        }

        // Comments section styling
        var comments = document.querySelector('#Payment #Comments');
        if (comments) {
            comments.style.setProperty('display', 'flex', 'important');
            comments.style.setProperty('flex-direction', 'column', 'important');
            comments.style.setProperty('gap', '0.5rem', 'important');
            comments.style.setProperty('margin-top', '1.5rem', 'important');

            var commentDivs = comments.querySelectorAll(':scope > div');
            commentDivs.forEach(function(div) {
                div.style.setProperty('float', 'none', 'important');
                div.style.setProperty('margin-left', '0', 'important');
            });
        }
    }

    // Run on load - apply styling (visibility controlled by CMS)
    forceFormInputStyles();
    forceGridLayouts();
    setTimeout(forceFormInputStyles, 500);
    setTimeout(forceGridLayouts, 600);
    setTimeout(forceFormInputStyles, 1500);
    setTimeout(forceGridLayouts, 1600);

    // AGGRESSIVE: Re-apply on resize (for DevTools device mode changes)
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            console.log("📱 Viewport changed, re-applying styles...");
            forceFormInputStyles();
        }, 100);
    });

    // AGGRESSIVE: Listen for media query changes (works in DevTools!)
    var mobileQuery = window.matchMedia('(max-width: 768px)');
    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener('change', function(e) {
            console.log("📱 Media query changed to mobile:", e.matches);
            forceFormInputStyles();
        });
    } else if (mobileQuery.addListener) {
        // Fallback for older browsers
        mobileQuery.addListener(function(e) {
            console.log("📱 Media query changed to mobile:", e.matches);
            forceFormInputStyles();
        });
    }

    console.log("✅ Paradise Valley Premium styling applied!");
    console.log("💡 To revert, run: window.pvRevertCleanStyle()");

    // Revert function
    window.pvRevertCleanStyle = function() {
        var style = document.getElementById("pv-single-event-styles");
        if (style) style.remove();

        var bottomPadding = document.querySelector(".bottom_padding");
        if (bottomPadding) {
            bottomPadding.style.display = "";
        }

        // Remove injected icons and restore original content
        var mapLink = document.querySelector('#RegisterHeader .column2 .map_link');
        var icalLink = document.querySelector('#RegisterHeader .column2 .ical_link');

        if (mapLink) {
            var textContent = mapLink.querySelector('.pv-info-text');
            if (textContent) {
                mapLink.innerHTML = textContent.innerHTML;
            }
        }

        if (icalLink) {
            var textContent = icalLink.querySelector('.pv-info-text');
            if (textContent) {
                icalLink.innerHTML = textContent.innerHTML;
            }
        }

        console.log("Reverted to original styling");
    };

    // =========================================================
    // DIAGNOSTIC: Inspect #ReserversInformation DOM structure
    // Run: pvDebugForm() in console
    // =========================================================
    window.pvDebugForm = function() {
        var ri = document.querySelector('#ReserversInformation');
        if (!ri) {
            console.log('❌ #ReserversInformation not found');
            return;
        }

        console.log('📋 #ReserversInformation DOM Structure:');
        console.log('Direct children:', ri.children.length);

        Array.from(ri.children).forEach(function(child, i) {
            console.log('  [' + i + '] <' + child.tagName.toLowerCase() +
                       (child.className ? ' class="' + child.className + '"' : '') +
                       (child.id ? ' id="' + child.id + '"' : '') + '>');

            // Show grandchildren too
            if (child.children.length > 0 && child.children.length < 15) {
                Array.from(child.children).forEach(function(gc, j) {
                    console.log('      [' + j + '] <' + gc.tagName.toLowerCase() +
                               (gc.className ? ' class="' + gc.className + '"' : '') + '>');
                });
            } else if (child.children.length >= 15) {
                console.log('      (' + child.children.length + ' children - too many to list)');
            }
        });

        // Check for table
        var table = ri.querySelector('table');
        if (table) {
            console.log('\n📊 Found TABLE with', table.rows.length, 'rows');
        }

        // Check for clearfix
        var clearfix = ri.querySelector('.clearfix');
        if (clearfix) {
            console.log('\n🧹 Found .clearfix with', clearfix.children.length, 'children');
        }

        // Check for form fields
        var inputs = ri.querySelectorAll('input, select, textarea');
        console.log('\n📝 Found', inputs.length, 'form fields (input/select/textarea)');

        return ri;
    };

    console.log("🔍 Debug: Run pvDebugForm() in console to inspect form structure");

})();
