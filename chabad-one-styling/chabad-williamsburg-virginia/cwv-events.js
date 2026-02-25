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

        // Pricing card
        if (pricing) {
          newContent += '<div class="cwv-info-card">';
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
    // ADD READ MORE TOGGLE TO DESCRIPTION
    // =========================================================
    if (eventDescription && !eventDescription.classList.contains('cwv-truncated')) {
      // Only add if description is long enough
      if (eventDescription.textContent.length > 150) {
        eventDescription.classList.add('cwv-truncated');

        var readMoreBtn = document.createElement('button');
        readMoreBtn.type = 'button';
        readMoreBtn.className = 'cwv-read-more-btn';
        readMoreBtn.innerHTML = 'Read more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';

        eventDescription.parentNode.insertBefore(readMoreBtn, eventDescription.nextSibling);

        readMoreBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var isExpanded = eventDescription.classList.contains('cwv-expanded');

          if (isExpanded) {
            eventDescription.classList.remove('cwv-expanded');
            eventDescription.classList.add('cwv-truncated');
            readMoreBtn.classList.remove('cwv-expanded');
            readMoreBtn.innerHTML = 'Read more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
          } else {
            eventDescription.classList.remove('cwv-truncated');
            eventDescription.classList.add('cwv-expanded');
            readMoreBtn.classList.add('cwv-expanded');
            readMoreBtn.innerHTML = 'Show less <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
          }
        });
      }
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

    // Run initial styling
    log('Running initial styling...');
    styleDeleteButtons();
    styleFormInputs();
    centerButtonsSection();

    // Run again after short delays (for CMS async loading)
    setTimeout(styleFormInputs, 300);
    setTimeout(styleFormInputs, 800);
    setTimeout(centerButtonsSection, 300);

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
        }, 100);
      });
      formObserver.observe(form, { childList: true, subtree: true });
    }
  }

  log('CWV Events: Script complete');

})();
