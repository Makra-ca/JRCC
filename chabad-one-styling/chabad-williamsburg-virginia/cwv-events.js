/**
 * CHABAD WILLIAMSBURG VIRGINIA EVENTS - Production JavaScript
 * Handles dynamic enhancements for event registration pages
 */
(function() {
  'use strict';

  // Only run on events pages
  if (!window.location.pathname.includes('/tools/events/')) {
    return;
  }

  // Check if this is a single event registration page
  var isRegistrationPage = window.location.pathname.includes('/tools/events/register');

  // Add body class for page type
  if (isRegistrationPage) {
    document.body.classList.add('cwv-registration-page');
  } else {
    document.body.classList.add('cwv-events-listing');
  }

  // =========================================================
  // PARSE MARKERS FROM DESCRIPTION
  // Markers: #LOCATION: text here   #DATETIME: text here
  // =========================================================
  function parseMarkers(text) {
    var result = {
      description: text,
      location: '',
      datetime: ''
    };

    // Extract #LOCATION: marker (everything after #LOCATION: until newline or next marker)
    var locationMatch = text.match(/#LOCATION:\s*(.+?)(?=\n#|\n*$)/i);
    if (locationMatch) {
      result.location = locationMatch[1].trim();
      result.description = result.description.replace(/#LOCATION:\s*.+?(?=\n#|\n*$)/i, '');
    }

    // Extract #DATETIME: marker
    var datetimeMatch = text.match(/#DATETIME:\s*(.+?)(?=\n#|\n*$)/i);
    if (datetimeMatch) {
      result.datetime = datetimeMatch[1].trim();
      result.description = result.description.replace(/#DATETIME:\s*.+?(?=\n#|\n*$)/i, '');
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
    // Find reservation overview - look for element containing #LOCATION or #DATETIME markers
    var reservationOverview = null;
    var reservationElements = document.querySelectorAll('.reservations > div, .reservations > .clearfix, .performance .clearfix');
    for (var i = 0; i < reservationElements.length; i++) {
      var el = reservationElements[i];
      var text = el.textContent || '';
      if (text.includes('#LOCATION:') || text.includes('#DATETIME:')) {
        reservationOverview = el;
        break;
      }
    }

    // Parse markers - check Description first, then Reservation overview as fallback
    var parsedData = { description: '', location: '', datetime: '' };
    var fallbackData = { description: '', location: '', datetime: '' };

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
    if (!parsedData.location && !parsedData.datetime && reservationOverview) {
      var overviewText = reservationOverview.textContent || reservationOverview.innerText;
      fallbackData = parseMarkers(overviewText);

      // Update overview text (remove markers) if we found any
      if (fallbackData.location || fallbackData.datetime) {
        reservationOverview.textContent = fallbackData.description;
        parsedData.location = fallbackData.location;
        parsedData.datetime = fallbackData.datetime;
      }
    }

    // Build info cards ONLY if we found markers (no hardcoded defaults)
    if (column2 && !column2.classList.contains('cwv-info-styled')) {
      column2.classList.add('cwv-info-styled');

      var location = parsedData.location;
      var dateTime = parsedData.datetime;

      // Only create cards if we actually have data from markers
      if (location || dateTime) {
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

        newContent += '</div></div>';
        column2.innerHTML = newContent;
      }
      // If no markers found, leave column2 as-is (don't transform it)
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
  }

  console.log('CWV Events: Styles applied');

})();
