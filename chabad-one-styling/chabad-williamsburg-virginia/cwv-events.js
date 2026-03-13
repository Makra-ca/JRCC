/**
 * CHABAD WILLIAMSBURG VIRGINIA EVENTS - Production JavaScript
 * Handles dynamic enhancements for event registration pages
 */
(function() {
  'use strict';

  // =========================================================
  // DEBUG LOGGING - Set to true to see console logs
  // =========================================================
  var DEBUG = true;

  function log(msg, data) {
    if (!DEBUG) return;
    if (data !== undefined) {
      console.log('[CWV]', msg, data);
    } else {
      console.log('[CWV]', msg);
    }
  }

  function logElement(name, el) {
    if (!DEBUG || !el) return;
    var computed = window.getComputedStyle(el);
    console.log('[CWV] ' + name + ':', {
      display: computed.display,
      visibility: computed.visibility,
      classes: el.className,
      inlineStyle: el.getAttribute('style') || '(none)',
      offsetHeight: el.offsetHeight
    });
  }

  // Only run on events pages
  if (!window.location.pathname.includes('/tools/events/')) {
    return;
  }

  log('Script starting...');

  // Check if this is a single event registration page
  var isRegistrationPage = window.location.pathname.includes('/tools/events/register');

  // Add body class for page type
  if (isRegistrationPage) {
    document.body.classList.add('cwv-registration-page');
    log('Registration page detected');
  } else {
    document.body.classList.add('cwv-events-listing');
    log('Events listing page detected');
  }

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

    // Extract #LOCATION: marker (everything after #LOCATION: until next marker or end)
    var locationMatch = text.match(/#LOCATION:\s*(.+?)(?=#DATETIME:|#PRICING:|$)/i);
    if (locationMatch) {
      result.location = locationMatch[1].trim();
      result.description = result.description.replace(/#LOCATION:\s*.+?(?=#DATETIME:|#PRICING:|$)/i, '');
    }

    // Extract #DATETIME: marker (everything until next marker or end)
    var datetimeMatch = text.match(/#DATETIME:\s*(.+?)(?=#LOCATION:|#PRICING:|$)/i);
    if (datetimeMatch) {
      var rawDatetime = datetimeMatch[1].trim();
      // Detect missing line break: lowercase immediately followed by uppercase
      var caseBreak = rawDatetime.match(/^(.+?[a-z])([A-Z].*)$/);
      if (caseBreak) {
        result.datetime = caseBreak[1].trim();
        result.description = result.description.replace(/#DATETIME:\s*.+?(?=#LOCATION:|#PRICING:|$)/i, caseBreak[2]);
      } else {
        result.datetime = rawDatetime;
        result.description = result.description.replace(/#DATETIME:\s*.+?(?=#LOCATION:|#PRICING:|$)/i, '');
      }
    }

    // Extract #PRICING: marker (stop at newline, next marker, or detect case break)
    var pricingMatch = text.match(/#PRICING:\s*([^\n#]+)/i);
    if (pricingMatch) {
      var rawPricing = pricingMatch[1].trim();
      // Detect case break: lowercase immediately followed by uppercase (e.g., "$125Parking")
      // This indicates concatenated text that should be separate
      var caseBreak = rawPricing.match(/^(.+?(?:\$\d+(?:\.\d{2})?))([A-Z].*)$/);
      if (caseBreak) {
        result.pricing = caseBreak[1].trim();
        result.description = result.description.replace(/#PRICING:\s*[^\n#]+/i, ' ' + caseBreak[2]);
      } else {
        result.pricing = rawPricing;
        result.description = result.description.replace(/#PRICING:\s*[^\n#]+/i, '');
      }
    }

    // Clean up description (remove extra whitespace/newlines at end)
    result.description = result.description.replace(/[\s\n]+$/, '').trim();

    return result;
  }

  // =========================================================
  // ENHANCE EVENT INFO SECTION (Registration page only)
  // =========================================================
  if (isRegistrationPage) {
    var eventDescription = document.querySelector('#RegisterHeader .event_description');
    var column2 = document.querySelector('#RegisterHeader .column2');
    // Find reservation overview - look for element containing markers
    // The markers are typically in #Performances > .regular or similar CMS-generated structure
    var reservationOverview = null;
    var reservationElements = document.querySelectorAll('#Performances > .regular, .hide_titles > .regular, #RegisterBody .regular.small_top_margin');
    for (var i = 0; i < reservationElements.length; i++) {
      var el = reservationElements[i];
      var text = el.textContent || '';
      if (text.includes('#LOCATION:') || text.includes('#DATETIME:') || text.includes('#PRICING:')) {
        reservationOverview = el;
        break;
      }
    }

    // Parse markers - check Description first, then Reservation overview as fallback
    var parsedData = { description: '', location: '', datetime: '', pricing: '' };
    var fallbackData = { description: '', location: '', datetime: '', pricing: '' };

    // 1. Check Description for markers
    if (eventDescription) {
      var originalText = eventDescription.textContent || eventDescription.innerText;
      parsedData = parseMarkers(originalText);

      // Update description text (remove markers) if we found any
      if (parsedData.location || parsedData.datetime) {
        eventDescription.textContent = parsedData.description;
      }
    }

    // 2. Fallback: Check Reservation overview if no markers in Description
    if (!parsedData.location && !parsedData.datetime && !parsedData.pricing && reservationOverview) {
      var overviewText = reservationOverview.textContent || reservationOverview.innerText;
      fallbackData = parseMarkers(overviewText);

      // Update overview text (remove markers) if we found any
      if (fallbackData.location || fallbackData.datetime || fallbackData.pricing) {
        reservationOverview.textContent = fallbackData.description;
        parsedData.location = fallbackData.location;
        parsedData.datetime = fallbackData.datetime;
        parsedData.pricing = fallbackData.pricing;
      }
    }

    // Build info cards ONLY if we found markers (no hardcoded defaults)
    if (column2 && !column2.classList.contains('cwv-info-styled')) {
      column2.classList.add('cwv-info-styled');

      var location = parsedData.location;
      var dateTime = parsedData.datetime;
      var pricing = parsedData.pricing;

      // Only create cards if we actually have data from markers
      if (location || dateTime || pricing) {
        var newContent = '<div class="cwv-info-wrapper">';
        newContent += '<div class="cwv-info-cards-grid">';

        // Location card
        if (location) {
          newContent += '<div class="cwv-info-card">';
          newContent += '<div class="cwv-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>';
          newContent += '<div class="cwv-info-text"><span class="cwv-card-label">Location</span><div class="cwv-info-content">' + location + '</div></div>';
          newContent += '</div>';
        }

        // Date card
        if (dateTime) {
          newContent += '<div class="cwv-info-card">';
          newContent += '<div class="cwv-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>';
          newContent += '<div class="cwv-info-text"><span class="cwv-card-label">Date & Time</span><div class="cwv-info-content">' + dateTime + '</div></div>';
          newContent += '</div>';
        }

        // Pricing card (full width below Location + Date)
        if (pricing) {
          newContent += '<div class="cwv-info-card cwv-pricing-card">';
          newContent += '<div class="cwv-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>';
          newContent += '<div class="cwv-info-text"><span class="cwv-card-label">Pricing</span><div class="cwv-info-content">' + pricing + '</div></div>';
          newContent += '</div>';
        }

        newContent += '</div></div>';
        column2.innerHTML = newContent;
      }
      // If no markers found, leave column2 as-is (don't transform it)
    }

    // =========================================================
    // MOVE SUMMARY SECTION TO BOTTOM OF FORM (before Buttons)
    // =========================================================
    var summarySection = document.querySelector('#Summary');
    var buttonsSection = document.querySelector('#Buttons');
    var paymentSection = document.querySelector('#Payment');

    log('Summary section found:', !!summarySection);
    log('Buttons section found:', !!buttonsSection);
    log('Payment section found:', !!paymentSection);
    logElement('#Payment', paymentSection);
    logElement('#SecondaryFormItems', document.querySelector('#SecondaryFormItems'));

    // Move Summary to be right before Buttons (after Payment)
    if (summarySection && buttonsSection) {
      summarySection.classList.add('cwv-summary-moved');
      buttonsSection.parentNode.insertBefore(summarySection, buttonsSection);
      log('Summary moved before #Buttons');
    }

    // =========================================================
    // SHOW FULL DESCRIPTION BY DEFAULT (no truncation)
    // =========================================================
    if (eventDescription) {
      // Ensure description is fully visible - no truncation
      eventDescription.classList.remove('cwv-truncated');
      eventDescription.classList.add('cwv-expanded');
    }

    // =========================================================
    // MUTATION OBSERVER - Watch for CMS form changes
    // Pattern from Paradise Valley: style elements when they appear
    // NEVER force display properties - let CMS control show/hide
    // =========================================================

    // Style delete buttons in reservation rows
    function styleDeleteButtons() {
      var reservations = document.querySelectorAll('.reservation, .clearfix.reservation');
      reservations.forEach(function(row) {
        var deleteBtn = row.querySelector('.remove_reservation, button.remove_reservation');
        if (deleteBtn && !deleteBtn.classList.contains('cwv-delete-styled')) {
          deleteBtn.classList.add('cwv-delete-styled');
        }
      });
    }

    // Apply visual styling to form inputs (NOT display properties)
    function styleFormInputs() {
      var form = document.querySelector('form#RegisterSinglePage');
      if (!form) return;

      // Style inputs - only font/color/border, never display
      var inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(function(input) {
        if (input.type === 'hidden' || input.type === 'checkbox' || input.type === 'radio' ||
            input.type === 'submit' || input.type === 'button' || input.type === 'image') return;
        if (input.closest('#footer, .footer')) return;

        // Mark as styled to avoid re-processing
        if (input.classList.contains('cwv-input-styled')) return;
        input.classList.add('cwv-input-styled');
      });
    }

    // Center the submit button wrapper
    function centerButtonsSection() {
      var buttonsSection = document.querySelector('#Buttons');
      if (!buttonsSection) return;

      // Only apply centering styles - NEVER set display (CMS controls visibility)
      buttonsSection.style.setProperty('flex-direction', 'column', 'important');
      buttonsSection.style.setProperty('align-items', 'center', 'important');

      var submitWrapper = document.querySelector('#SubmitButton_wrapper');
      if (submitWrapper) {
        submitWrapper.style.setProperty('justify-content', 'center', 'important');
      }
    }

    // =========================================================
    // FIX ADD BUTTON - Change "Add" to "Add Reservations"
    // =========================================================
    function styleAddButton() {
      var addButtons = document.querySelectorAll('.add_attendee, button.add_attendee');
      addButtons.forEach(function(btn) {
        if (btn.classList.contains('cwv-add-styled')) return;
        btn.classList.add('cwv-add-styled');

        // Change button text
        var span = btn.querySelector('span');
        if (span && span.textContent.trim() === 'Add') {
          span.textContent = 'Add Reservation';
        } else if (btn.textContent.trim() === 'Add') {
          btn.textContent = 'Add Reservation';
        }

        log('Add button styled');
      });
    }

    // =========================================================
    // STYLE YOUR INFORMATION - Single column, label left (desktop)
    // On mobile: label on top, input below
    // CSS can't override CMS grid, so we use JS
    // =========================================================
    function styleYourInformation() {
      // Get the form container (not the title div)
      var container = document.querySelector('#ReserversInformation > div.large_top_padding.medium_bottom_padding > div.clearfix:not(.title)');
      if (!container) {
        log('Your Information container not found');
        return;
      }

      var isMobile = window.innerWidth < 600;

      // Remove old/opposite classes and re-apply styles
      container.classList.remove('cwv-info-styled', 'cwv-info-styled-mobile', 'cwv-info-styled-desktop');
      container.classList.add(isMobile ? 'cwv-info-styled-mobile' : 'cwv-info-styled-desktop');

      log('Styling Your Information, mobile:', isMobile, 'rows:', container.children.length);

      // Container: single column stack
      container.style.setProperty('display', 'flex', 'important');
      container.style.setProperty('flex-direction', 'column', 'important');
      container.style.setProperty('gap', isMobile ? '1rem' : '0.75rem', 'important');

      // Each field row (direct children with class clearfix)
      var rows = container.children;
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!row.classList.contains('clearfix')) continue;

        row.style.setProperty('display', 'flex', 'important');
        row.style.setProperty('width', '100%', 'important');

        if (isMobile) {
          // Mobile: stack vertically, label on top
          row.style.setProperty('flex-direction', 'column', 'important');
          row.style.setProperty('align-items', 'stretch', 'important');
          row.style.setProperty('gap', '0.25rem', 'important');
        } else {
          // Desktop: horizontal, label left
          row.style.setProperty('flex-direction', 'row', 'important');
          row.style.setProperty('align-items', 'center', 'important');
          row.style.setProperty('gap', '1rem', 'important');
        }

        // Find label (first child div)
        var label = row.querySelector('.label, .g140');
        if (label) {
          label.style.setProperty('float', 'none', 'important');
          label.style.setProperty('margin', '0', 'important');

          if (isMobile) {
            label.style.setProperty('flex', 'none', 'important');
            label.style.setProperty('min-width', 'auto', 'important');
            label.style.setProperty('max-width', 'none', 'important');
            label.style.setProperty('text-align', 'left', 'important');
          } else {
            label.style.setProperty('flex', '0 0 150px', 'important');
            label.style.setProperty('min-width', '150px', 'important');
            label.style.setProperty('max-width', '150px', 'important');
            label.style.setProperty('text-align', 'right', 'important');
          }
        }

        // Find input wrapper
        var inputWrapper = row.querySelector('.float_left, .left_margin');
        if (inputWrapper) {
          inputWrapper.style.setProperty('flex', '1', 'important');
          inputWrapper.style.setProperty('float', 'none', 'important');
          inputWrapper.style.setProperty('margin', '0', 'important');
          if (isMobile) {
            inputWrapper.style.setProperty('width', '100%', 'important');
          }
        }
      }

      log('Your Information styled:', isMobile ? 'mobile (stacked)' : 'desktop (label left)');
    }

    // =========================================================
    // HIDE TOGGLE_OPTIONS - Respect CMS visibility control
    // CMS sets inline display:none when it should be hidden
    // CMS removes/changes it when user clicks "Add additional reservations"
    // We only force hide when CMS wants it hidden (has inline display:none)
    // =========================================================
    function hideToggleOptions() {
      var toggleOptions = document.querySelectorAll('.additionals_toggle > .toggle_options, .toggle_options.medium_vertical_padding.left_padding');
      toggleOptions.forEach(function(el) {
        // Check if CMS has set inline display:none
        var inlineDisplay = el.style.display;

        if (inlineDisplay === 'none') {
          // CMS wants it hidden - reinforce with !important to override any CSS
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('height', '0', 'important');
          el.style.setProperty('overflow', 'hidden', 'important');
          log('Toggle options: CMS wants hidden, enforcing');
        } else {
          // CMS wants it visible (user adding reservation) - remove our overrides
          el.style.removeProperty('visibility');
          el.style.removeProperty('height');
          el.style.removeProperty('overflow');
          log('Toggle options: CMS wants visible, allowing');
        }
      });
    }

    // Run initial styling
    log('Running initial styling...');
    styleDeleteButtons();
    styleFormInputs();
    centerButtonsSection();
    styleAddButton();
    hideToggleOptions();
    styleYourInformation();

    // Run again after short delays (for CMS async loading)
    setTimeout(styleFormInputs, 300);
    setTimeout(styleFormInputs, 800);
    setTimeout(centerButtonsSection, 300);
    setTimeout(styleAddButton, 300);
    setTimeout(styleAddButton, 800);
    setTimeout(styleAddButton, 1500);
    setTimeout(hideToggleOptions, 100);
    setTimeout(hideToggleOptions, 300);
    setTimeout(hideToggleOptions, 800);
    setTimeout(hideToggleOptions, 1500);
    setTimeout(styleYourInformation, 100);
    setTimeout(styleYourInformation, 500);
    setTimeout(styleYourInformation, 1000);

    // Log element states after a delay
    setTimeout(function() {
      log('=== STATE AFTER 1 SECOND ===');
      logElement('#SecondaryFormItems', document.querySelector('#SecondaryFormItems'));
      logElement('#Payment', document.querySelector('#Payment'));
      logElement('#Summary', document.querySelector('#Summary'));
    }, 1000);

    // Watch for DOM changes in RegisterBody (CMS adds/removes sections dynamically)
    var registerBody = document.querySelector('#RegisterBody');
    if (registerBody) {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          if (m.type === 'attributes' && m.target.id) {
            log('Mutation on #' + m.target.id + ':', m.attributeName);
          }
        });
        styleDeleteButtons();
        styleFormInputs();
        styleAddButton();
        hideToggleOptions();
      });
      observer.observe(registerBody, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      log('MutationObserver active on #RegisterBody');
    }

    // Also observe #Buttons section for validation messages
    var btnSection = document.querySelector('#Buttons');
    if (btnSection) {
      var buttonsObserver = new MutationObserver(function() {
        centerButtonsSection();
      });
      buttonsObserver.observe(btnSection, { childList: true, subtree: true });
    }

    // Observe entire form for changes
    var form = document.querySelector('form#RegisterSinglePage');
    if (form) {
      var formObserver = new MutationObserver(function() {
        clearTimeout(window.cwvFormDebounce);
        window.cwvFormDebounce = setTimeout(function() {
          styleFormInputs();
          displaySegmentNames();
        }, 100);
      });
      formObserver.observe(form, { childList: true, subtree: true });
    }

    // =========================================================
    // AUTO-POPULATE BILLING NAME FROM FIRST RESERVATION
    // Copies first/last name from first reservation to billing info
    // =========================================================
    function autoPopulateBillingName() {
      log('Setting up auto-populate for billing name...');

      // Flag to track if we've already populated (don't overwrite user edits)
      var hasPopulated = {
        firstName: false,
        lastName: false
      };

      // Find Your Information section fields
      var reserversSection = document.querySelector('#ReserversInformation');
      if (!reserversSection) {
        log('ReserversInformation section not found');
        return;
      }

      // Find the Your Information input fields by common patterns
      var billingFirstName = reserversSection.querySelector('input[name*="firstName"], input[id*="FirstName"], input[name*="first_name"], input[name*="FirstName"]');
      var billingLastName = reserversSection.querySelector('input[name*="lastName"], input[id*="LastName"], input[name*="last_name"], input[name*="LastName"]');

      log('Billing fields found - firstName:', !!billingFirstName, 'lastName:', !!billingLastName);

      // Function to copy value from reservation to billing info
      function copyToBilling(sourceInput, targetInput, fieldName) {
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
            log('Auto-populated billing ' + fieldName + ':', value);
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
            log('Auto-populated billing ' + fieldName + ':', value);
          }
        });
      }

      // Set up listener for first reservation row
      function setupReservationListeners() {
        // Find first reservation's name inputs
        var firstResFirstName = document.querySelector('.reservation input[name^="firstname"], .reservation input[id*="firstName"], .reservation input[name*="FirstName"]');
        var firstResLastName = document.querySelector('.reservation input[name^="lastname"], .reservation input[id*="lastName"], .reservation input[name*="LastName"]');

        log('Reservation inputs - firstName:', !!firstResFirstName, 'lastName:', !!firstResLastName);

        if (firstResFirstName && billingFirstName) {
          copyToBilling(firstResFirstName, billingFirstName, 'firstName');
        }

        if (firstResLastName && billingLastName) {
          copyToBilling(firstResLastName, billingLastName, 'lastName');
        }
      }

      // Initial setup
      setupReservationListeners();

      // Also watch for new reservations being added (DOM changes)
      var registerBody = document.querySelector('#RegisterBody');
      if (registerBody) {
        var nameObserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
              setTimeout(setupReservationListeners, 100);
            }
          });
        });
        nameObserver.observe(registerBody, { childList: true, subtree: true });
      }

      log('Auto-populate billing name listeners set up');
    }

    // =========================================================
    // SET USA AS DEFAULT COUNTRY
    // =========================================================
    function setDefaultCountry() {
      log('Setting default country to USA...');

      var reserversSection = document.querySelector('#ReserversInformation');
      if (!reserversSection) return;

      var countrySelect = reserversSection.querySelector('select[name*="country"], select[id*="Country"], select[name*="Country"]');
      if (!countrySelect) {
        log('Country select not found');
        return;
      }

      // Only set if empty/default
      if (countrySelect.value && countrySelect.value !== '' && countrySelect.value !== '0') {
        log('Country already set:', countrySelect.value);
        return;
      }

      // Try common values for United States
      var usValues = ['United States', 'US', 'USA', 'United States of America', 'UNITED STATES'];
      var options = countrySelect.options;

      for (var i = 0; i < options.length; i++) {
        var optText = options[i].text.trim().toUpperCase();
        var optVal = options[i].value.trim().toUpperCase();

        for (var j = 0; j < usValues.length; j++) {
          if (optText === usValues[j].toUpperCase() || optVal === usValues[j].toUpperCase()) {
            countrySelect.value = options[i].value;
            countrySelect.dispatchEvent(new Event('change', { bubbles: true }));
            log('Country set to:', options[i].text);
            return;
          }
        }
      }

      log('USA option not found in country dropdown');
    }

    // =========================================================
    // DISPLAY SEGMENT NAMES AS HEADINGS
    // When there are multiple segments (like Seder 1, Seder 2),
    // show segment name prominently above each reservation section
    // =========================================================
    function displaySegmentNames() {
      // Find all performance/segment sections
      var performances = document.querySelectorAll('.performance');

      if (performances.length <= 1) {
        log('Single or no performance sections, skipping segment names');
        return;
      }

      performances.forEach(function(perf, perfIndex) {
        // Check if already processed
        if (perf.dataset.segmentStyled === 'true') return;

        // Find all title elements and get the one with the segment name
        var titles = perf.querySelectorAll('[class*="title"]');
        var segmentName = '';
        var segmentDate = '';

        // Look through titles for the one containing segment info (date pattern)
        titles.forEach(function(titleEl) {
          var text = titleEl.textContent.trim();
          // Match pattern like "First night Seder March 1st Apr 1, 2026 7:30PM"
          // Look for month names which indicate this is the segment title
          if (/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(text) && text.length > 10) {
            // Extract segment name (before the date) and date/time
            var dateMatch = text.match(/^(.+?)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2},?\s+\d{4})\s*(\d{1,2}:\d{2}[AP]M)?/i);
            if (dateMatch) {
              segmentName = dateMatch[1].trim();
              segmentDate = dateMatch[2] + ' ' + dateMatch[3] + (dateMatch[4] ? ' ' + dateMatch[4] : '');
            } else {
              // Fallback: just use the whole text
              segmentName = text;
            }
          }
        });

        if (!segmentName) {
          log('No segment name found for performance', perfIndex);
          return;
        }

        log('Found segment:', segmentName, 'Date:', segmentDate);

        // Create styled segment header if it doesn't exist
        var existingHeader = perf.querySelector('.cwv-segment-header');
        if (!existingHeader) {
          var header = document.createElement('div');
          header.className = 'cwv-segment-header';
          header.innerHTML = '<span class="cwv-segment-name">' + segmentName + '</span>' +
                            (segmentDate ? '<span class="cwv-segment-date">' + segmentDate + '</span>' : '');

          // Insert at the beginning of the performance section
          perf.insertBefore(header, perf.firstChild);
        }

        perf.dataset.segmentStyled = 'true';
        log('Segment header added for:', segmentName);
      });
    }

    // Run auto-populate functions
    autoPopulateBillingName();
    setDefaultCountry();
    displaySegmentNames();

    // Run after delays for CMS async loading
    setTimeout(autoPopulateBillingName, 500);
    setTimeout(autoPopulateBillingName, 1500);
    setTimeout(setDefaultCountry, 300);
    setTimeout(setDefaultCountry, 800);
    setTimeout(displaySegmentNames, 300);
    setTimeout(displaySegmentNames, 800);
    setTimeout(displaySegmentNames, 1500);
  }

  log('CWV Events: Script complete');

})();
