// PARADISE VALLEY - Single Event Page Large Card Styling
// Run this in browser console on event registration pages
// URL pattern: /tools/events/register_cdo/eventid/XXXXX

(function() {
    // Only run on event registration pages
    if (!window.location.pathname.includes("/tools/events/register")) {
        console.log("This script is for event registration pages");
        return;
    }

    console.log("🎨 Applying Paradise Valley Large Card Styling...");

    // =========================================================
    // LOAD GOOGLE FONT
    // =========================================================
    if (!document.getElementById("pv-urbanist-font")) {
        var fontLink = document.createElement("link");
        fontLink.id = "pv-urbanist-font";
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap";
        document.head.appendChild(fontLink);
    }

    // =========================================================
    // CSS STYLES
    // =========================================================
    var css = `
        /* =========================================================
           PAGE BACKGROUND
           ========================================================= */
        body.cco_body {
            background: #f0f2f5 !important;
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
            padding: 2rem 1.5rem 3rem !important;
        }

        /* Hide original header (we'll use the form's header instead) */
        .master-content-wrapper > header.article-header {
            display: none !important;
        }

        /* =========================================================
           VERTICAL PADDING - Contains the main form
           ========================================================= */
        .vertical_padding {
            background: #ffffff !important;
            border-radius: 20px 20px 0 0 !important;
            box-shadow: 0 5px 30px rgba(0,0,0,0.1) !important;
            padding: 0 !important;
            overflow: hidden !important;
        }

        /* =========================================================
           FORM CONTAINER
           ========================================================= */
        form#RegisterSinglePage {
            font-family: 'Urbanist', sans-serif !important;
        }

        /* =========================================================
           REGISTER HEADER - Image + Event Info
           ========================================================= */
        #RegisterHeader {
            padding: 0 !important;
            background: #ffffff !important;
        }

        /* Banner Image */
        #RegisterHeader .banner_image {
            margin: 0 !important;
            padding: 0 !important;
        }

        #RegisterHeader .banner_image img {
            width: 100% !important;
            height: auto !important;
            display: block !important;
            border-radius: 20px 20px 0 0 !important;
        }

        /* Event Info Layout - Two columns */
        #RegisterHeader .column1,
        #RegisterHeader .column2 {
            float: none !important;
            width: 100% !important;
            padding: 2rem !important;
            box-sizing: border-box !important;
        }

        /* Column 1 - Event Description */
        #RegisterHeader .column1 {
            border-bottom: 2px solid #f0f0f0 !important;
        }

        #RegisterHeader .event_name {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 2rem !important;
            font-weight: 800 !important;
            color: #333 !important;
            margin-bottom: 1rem !important;
            line-height: 1.3 !important;
        }

        #RegisterHeader .event_description {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.15rem !important;
            line-height: 1.8 !important;
            color: #555 !important;
        }

        #RegisterHeader .event_description br {
            display: block !important;
            content: "" !important;
            margin-top: 0.5rem !important;
        }

        /* Column 2 - Event Info Sidebar */
        #RegisterHeader .column2 {
            background: linear-gradient(135deg, #2980b9 0%, #1a5276 100%) !important;
            color: #ffffff !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
            padding: 1.5rem 2rem !important;
        }

        #RegisterHeader .column2 .heading {
            grid-column: 1 / -1 !important;
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin-bottom: 0.5rem !important;
        }

        #RegisterHeader .column2 .label {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 0.85rem !important;
            font-weight: 600 !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            color: rgba(255,255,255,0.8) !important;
            margin-bottom: 0.25rem !important;
        }

        #RegisterHeader .column2 a,
        #RegisterHeader .column2 .map_link,
        #RegisterHeader .column2 .ical_link {
            color: #ffffff !important;
            text-decoration: none !important;
        }

        #RegisterHeader .column2 .map_link div,
        #RegisterHeader .column2 .ical_link div {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.1rem !important;
            font-weight: 600 !important;
            color: #ffffff !important;
        }

        /* Hide calendar icon */
        #RegisterHeader .column2 .icon.calendar {
            display: none !important;
        }

        /* =========================================================
           REGISTER BODY - Ticket Selection
           ========================================================= */
        #RegisterBody {
            padding: 2rem !important;
            background: #fafbfc !important;
        }

        #RegisterBody .title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 1.5rem !important;
        }

        /* Performance/Ticket rows */
        #RegisterBody .performance {
            background: #ffffff !important;
            border: 2px solid #e8e8e8 !important;
            border-radius: 16px !important;
            padding: 1.5rem !important;
            margin-bottom: 1rem !important;
            transition: all 0.2s ease !important;
        }

        #RegisterBody .performance:hover {
            border-color: #E67E22 !important;
            box-shadow: 0 4px 15px rgba(230, 126, 34, 0.1) !important;
        }

        #RegisterBody .performance .bold {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.1rem !important;
            font-weight: 700 !important;
            color: #333 !important;
        }

        /* Ticket dropdowns */
        #RegisterBody select {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1rem !important;
            padding: 0.75rem 1rem !important;
            border: 2px solid #e0e0e0 !important;
            border-radius: 10px !important;
            background: #ffffff !important;
            min-width: 180px !important;
            cursor: pointer !important;
            transition: border-color 0.2s ease !important;
        }

        #RegisterBody select:focus {
            border-color: #2980b9 !important;
            outline: none !important;
        }

        /* Add attendee button */
        #RegisterBody button {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            background: #E67E22 !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 10px !important;
            padding: 0.75rem 1.5rem !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
        }

        #RegisterBody button:hover {
            background: #D35400 !important;
            transform: translateY(-1px) !important;
        }

        /* =========================================================
           BOTTOM PADDING - Form Fields
           ========================================================= */
        .bottom_padding {
            display: block !important;
            background: #ffffff !important;
            border-radius: 0 0 20px 20px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
            padding: 0 !important;
            margin-bottom: 2rem !important;
        }

        /* Summary section */
        #Summary {
            padding: 2rem !important;
            border-bottom: 2px solid #f0f0f0 !important;
        }

        #Summary .title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            color: #333 !important;
        }

        /* Donation input */
        #TotalDonation {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.1rem !important;
            padding: 0.75rem 1rem !important;
            border: 2px solid #e0e0e0 !important;
            border-radius: 10px !important;
            width: 120px !important;
        }

        #TotalDonation:focus {
            border-color: #2980b9 !important;
            outline: none !important;
        }

        /* =========================================================
           RESERVERS INFORMATION - Contact Details
           ========================================================= */
        #ReserversInformation {
            padding: 2rem !important;
            border-bottom: 2px solid #f0f0f0 !important;
        }

        #ReserversInformation .title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 1.5rem !important;
        }

        #ReserversInformation label,
        #ReserversInformation .label {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 0.95rem !important;
            font-weight: 600 !important;
            color: #555 !important;
        }

        #ReserversInformation input[type="text"],
        #ReserversInformation input[type="email"],
        #ReserversInformation input[type="tel"],
        #ReserversInformation select {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.05rem !important;
            padding: 0.85rem 1rem !important;
            border: 2px solid #e0e0e0 !important;
            border-radius: 10px !important;
            transition: border-color 0.2s ease !important;
            width: 100% !important;
            box-sizing: border-box !important;
        }

        #ReserversInformation input:focus,
        #ReserversInformation select:focus {
            border-color: #2980b9 !important;
            outline: none !important;
        }

        /* =========================================================
           PAYMENT SECTION
           ========================================================= */
        #Payment {
            padding: 2rem !important;
            border-bottom: 2px solid #f0f0f0 !important;
        }

        #Payment .title {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 1.5rem !important;
        }

        #Payment input,
        #Payment select,
        #Payment textarea {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.05rem !important;
            padding: 0.85rem 1rem !important;
            border: 2px solid #e0e0e0 !important;
            border-radius: 10px !important;
            transition: border-color 0.2s ease !important;
        }

        #Payment input:focus,
        #Payment select:focus,
        #Payment textarea:focus {
            border-color: #2980b9 !important;
            outline: none !important;
        }

        /* =========================================================
           SUBMIT BUTTON
           ========================================================= */
        #Buttons {
            padding: 2rem !important;
            text-align: center !important;
        }

        #SubmitButton,
        #Buttons button[name="submit"] {
            font-family: 'Urbanist', sans-serif !important;
            font-size: 1.3rem !important;
            font-weight: 700 !important;
            background: linear-gradient(135deg, #E67E22 0%, #D35400 100%) !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 14px !important;
            padding: 1.1rem 3rem !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 20px rgba(230, 126, 34, 0.3) !important;
        }

        #SubmitButton:hover,
        #Buttons button[name="submit"]:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 25px rgba(230, 126, 34, 0.4) !important;
        }

        /* Disabled state */
        #SubmitButton_wrapper.disabled button {
            background: #cccccc !important;
            box-shadow: none !important;
            cursor: not-allowed !important;
        }

        /* =========================================================
           HIDE ELEMENTS WE DON'T NEED
           ========================================================= */
        /* Hide the pv- elements we added earlier if they exist */
        .pv-hero-section,
        .pv-content-card {
            display: none !important;
        }

        /* =========================================================
           RESPONSIVE DESIGN
           ========================================================= */
        @media (max-width: 768px) {
            .master-content-wrapper {
                padding: 1rem !important;
            }

            #RegisterHeader .column1,
            #RegisterHeader .column2 {
                padding: 1.5rem !important;
            }

            #RegisterHeader .event_name {
                font-size: 1.5rem !important;
            }

            #RegisterHeader .column2 {
                grid-template-columns: 1fr !important;
            }

            #RegisterBody,
            #Summary,
            #ReserversInformation,
            #Payment,
            #Buttons {
                padding: 1.5rem !important;
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
    // REMOVE PREVIOUS PV ELEMENTS IF THEY EXIST
    // =========================================================
    var pvHero = document.querySelector(".pv-hero-section");
    if (pvHero) pvHero.remove();

    var pvCard = document.querySelector(".pv-content-card");
    if (pvCard) pvCard.remove();

    // Show the header if it was hidden
    var header = document.querySelector("header.article-header");
    if (header) {
        header.style.display = "none"; // Keep it hidden, we use form header
    }

    // Make sure bottom_padding is visible
    var bottomPadding = document.querySelector(".bottom_padding");
    if (bottomPadding) {
        bottomPadding.style.display = "block";
    }

    console.log("✅ Paradise Valley styling applied!");
    console.log("💡 To revert, run: window.pvRevertSingleEvent()");

    // Revert function
    window.pvRevertSingleEvent = function() {
        var style = document.getElementById("pv-single-event-styles");
        if (style) style.remove();

        var bottomPadding = document.querySelector(".bottom_padding");
        if (bottomPadding) {
            bottomPadding.style.display = "";
        }

        console.log("Reverted to original");
    };

})();
