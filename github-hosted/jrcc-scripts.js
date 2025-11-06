/* JRCC Custom Scripts - Hosted on GitHub */
/* This file contains all page-specific JavaScript for JRCC website */

/* ======================================== */
/* SIDEBAR ENHANCEMENT FOR DESKTOP AND MOBILE */
/* ======================================== */

(function() {
    // DESKTOP SIDEBAR REDESIGN
    if (window.innerWidth > 768) {
        var desktopInitialized = false;

        function redesignDesktopSidebar() {
            if (desktopInitialized) return;

            // Find ALL potential sidebars (not just the first one)
            var allSidebars = document.querySelectorAll('.g260, div.g260, .cco_search_header, div[class*="g260"], .sidebar-local-navigation, .co_local_menu, div.float_right.no_margin');

            if (allSidebars.length === 0) {
                setTimeout(redesignDesktopSidebar, 500);
                return;
            }

            // Find the sidebar with the most navigation links
            var originalSidebar = null;
            var maxLinks = 0;

            for (var i = 0; i < allSidebars.length; i++) {
                var sidebar = allSidebars[i];
                var linkCount = sidebar.querySelectorAll('a').length;

                // Only consider sidebars with links
                if (linkCount > maxLinks) {
                    maxLinks = linkCount;
                    originalSidebar = sidebar;
                }
            }

            // If no sidebar with links found, wait and retry
            if (!originalSidebar || maxLinks === 0) {
                setTimeout(redesignDesktopSidebar, 500);
                return;
            }

            desktopInitialized = true;

            // Force original sidebar to be hidden and positioned
            originalSidebar.style.cssText = 'position:fixed!important;right:-300px!important;top:50%!important;transform:translateY(-50%)!important;width:280px!important;max-width:280px!important;background:rgba(255,255,255,0.98)!important;backdrop-filter:blur(20px)!important;-webkit-backdrop-filter:blur(20px)!important;border-radius:16px 0 0 16px!important;box-shadow:-8px 0 32px rgba(0,0,0,0.15)!important;padding:2rem 1.5rem!important;max-height:85vh!important;overflow-y:auto!important;transition:right 0.4s cubic-bezier(0.25,0.46,0.45,0.94)!important;z-index:999!important;';

            // Create tab element
            var tab = document.createElement('div');
            tab.innerHTML = '☰';
            tab.style.cssText = 'position:fixed!important;right:0!important;top:50%!important;transform:translateY(-50%)!important;width:40px!important;height:120px!important;background:rgba(255,255,255,0.95)!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important;border-radius:16px 0 0 16px!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:24px!important;color:#1e3a8a!important;cursor:pointer!important;z-index:1000!important;box-shadow:-4px 0 16px rgba(0,0,0,0.1)!important;transition:all 0.25s cubic-bezier(0.25,0.46,0.45,0.94)!important;';
            document.body.appendChild(tab);

            var isExpanded = false;
            var collapseTimeout = null;
            var isClickingLink = false;
            var isMouseOverSidebarArea = false;

            // Combined hover area - track when mouse is over tab OR sidebar
            function checkMousePosition(e) {
                var tabRect = tab.getBoundingClientRect();
                var sidebarRect = originalSidebar.getBoundingClientRect();
                var x = e.clientX;
                var y = e.clientY;

                return (
                    (x >= tabRect.left && x <= tabRect.right && y >= tabRect.top && y <= tabRect.bottom) ||
                    (x >= sidebarRect.left && x <= sidebarRect.right && y >= sidebarRect.top && y <= sidebarRect.bottom)
                );
            }

            // Hover on tab
            tab.addEventListener('mouseenter', function(e) {
                clearTimeout(collapseTimeout);
                isMouseOverSidebarArea = true;
                tab.style.background = 'rgba(255,255,255,1)';
                tab.style.color = '#3b82f6';
                if (!isExpanded) {
                    isExpanded = true;
                    originalSidebar.style.right = '40px';
                }
            });

            // Hover on sidebar itself
            originalSidebar.addEventListener('mouseenter', function(e) {
                clearTimeout(collapseTimeout);
                isMouseOverSidebarArea = true;
                if (!isExpanded) {
                    isExpanded = true;
                    originalSidebar.style.right = '40px';
                }
            });

            // Track mouse movement globally to detect when truly leaving
            document.addEventListener('mousemove', function(e) {
                var wasOver = isMouseOverSidebarArea;
                isMouseOverSidebarArea = checkMousePosition(e);

                // If we just left the sidebar area
                if (wasOver && !isMouseOverSidebarArea && !isClickingLink) {
                    clearTimeout(collapseTimeout);
                    collapseTimeout = setTimeout(function() {
                        if (!isClickingLink) {
                            tab.style.background = 'rgba(255,255,255,0.95)';
                            tab.style.color = '#1e3a8a';
                            isExpanded = false;
                            originalSidebar.style.right = '-300px';
                        }
                    }, 500);
                }
            });

            // Handle link clicks in sidebar
            var sidebarLinks = originalSidebar.querySelectorAll('a');
            for (var i = 0; i < sidebarLinks.length; i++) {
                sidebarLinks[i].addEventListener('click', function() {
                    isClickingLink = true;
                    // Allow brief time for navigation
                    setTimeout(function() {
                        isClickingLink = false;
                    }, 1000);
                });
            }

            // Enhance sidebar styling
            var allLinks = originalSidebar.querySelectorAll('a');
            for (var j = 0; j < allLinks.length; j++) {
                allLinks[j].style.cssText += 'display:block!important;padding:12px 16px!important;color:#1e3a8a!important;text-decoration:none!important;border-radius:8px!important;transition:all 0.2s ease!important;margin-bottom:4px!important;font-weight:500!important;';

                allLinks[j].addEventListener('mouseenter', function() {
                    this.style.background = 'linear-gradient(135deg,#eff6ff,#dbeafe)';
                    this.style.color = '#1d4ed8';
                    this.style.transform = 'translateX(4px)';
                });

                allLinks[j].addEventListener('mouseleave', function() {
                    this.style.background = 'transparent';
                    this.style.color = '#1e3a8a';
                    this.style.transform = 'translateX(0)';
                });
            }

            // Add header to sidebar
            var header = document.createElement('div');
            header.innerHTML = '<span style="font-size:18px;font-weight:700;color:#1e3a8a;">Quick Navigation</span>';
            header.style.cssText = 'margin-bottom:1.5rem!important;padding-bottom:1rem!important;border-bottom:2px solid #e0e7ff!important;';
            originalSidebar.insertBefore(header, originalSidebar.firstChild);

            // Add close button for accessibility
            var closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = 'position:absolute!important;top:10px!important;right:10px!important;background:transparent!important;border:none!important;font-size:24px!important;color:#64748b!important;cursor:pointer!important;padding:0!important;width:30px!important;height:30px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:50%!important;transition:all 0.2s ease!important;';
            closeBtn.setAttribute('aria-label', 'Close sidebar');
            originalSidebar.appendChild(closeBtn);

            closeBtn.addEventListener('click', function() {
                isExpanded = false;
                originalSidebar.style.right = '-300px';
                tab.style.background = 'rgba(255,255,255,0.95)';
                tab.style.color = '#1e3a8a';
            });

            closeBtn.addEventListener('mouseenter', function() {
                this.style.background = '#fee2e2';
                this.style.color = '#dc2626';
            });

            closeBtn.addEventListener('mouseleave', function() {
                this.style.background = 'transparent';
                this.style.color = '#64748b';
            });
        }

        // Run desktop sidebar redesign
        redesignDesktopSidebar();
        setTimeout(redesignDesktopSidebar, 1000);
        setTimeout(redesignDesktopSidebar, 2000);
        return; // Exit - don't run mobile code
    }

    // MOBILE SIDEBAR BOTTOM SHEET
    // Only run on mobile devices

    var mobileSidebar = null;
    var backdrop = null;
    var isOpen = false;
    var initialized = false;

    function createMobileSidebar() {
        // Prevent multiple initializations
        if (initialized) return;

        // Find navigation elements (NOT the search form container)
        var navElement = document.querySelector('.co_local_menu, .sidebar-local-navigation');
        if (!navElement) {
            return;
        }

        // Check if navigation has links
        var linkCount = navElement.querySelectorAll('a').length;
        if (linkCount === 0) {
            return;
        }

        initialized = true;

        // Calculate responsive sizing based on screen size
        var viewportHeight = window.innerHeight;
        var sidebarHeight = viewportHeight <= 667 ? '85vh' : '80vh'; // iPhone SE gets more height
        var visibleTab = '80px'; // Larger visible tab for better discoverability

        // Create mobile sidebar container
        mobileSidebar = document.createElement('div');
        mobileSidebar.className = 'jrcc-mobile-sidebar';
        mobileSidebar.style.cssText = 'position:fixed!important;bottom:0!important;left:0!important;right:0!important;width:100%!important;height:'+sidebarHeight+'!important;background:rgba(255,255,255,0.98)!important;backdrop-filter:blur(20px) saturate(180%)!important;-webkit-backdrop-filter:blur(20px) saturate(180%)!important;border-radius:28px 28px 0 0!important;box-shadow:0 -8px 32px rgba(0,0,0,0.2)!important;transform:translateY(calc(100% - '+visibleTab+'))!important;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1)!important;z-index:100001!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;padding:20px!important;padding-top:80px!important;';

        // Add iOS-style handle pill at top
        var handle = document.createElement('div');
        handle.style.cssText = 'position:absolute!important;top:16px!important;left:50%!important;transform:translateX(-50%)!important;width:48px!important;height:5px!important;background:rgba(30,58,138,0.4)!important;border-radius:3px!important;pointer-events:none!important;';
        mobileSidebar.appendChild(handle);

        // Add visible label "SIDEBAR" below handle
        var label = document.createElement('div');
        label.textContent = 'SIDEBAR';
        label.style.cssText = 'position:absolute!important;top:30px!important;left:0!important;right:0!important;text-align:center!important;font-family:Urbanist,sans-serif!important;font-size:14px!important;font-weight:700!important;color:rgba(30,58,138,0.8)!important;letter-spacing:0.1em!important;pointer-events:none!important;';
        mobileSidebar.appendChild(label);

        var contentWrapper = document.createElement('div');
        contentWrapper.style.cssText = 'width:100%!important;overflow-x:hidden!important;';

        // Clone the navigation element
        var clonedContent = navElement.cloneNode(true);
        clonedContent.style.display = 'block';
        clonedContent.style.visibility = 'visible';
        clonedContent.style.opacity = '1';

        // Transfer navigation children
        while (clonedContent.firstChild) {
            contentWrapper.appendChild(clonedContent.firstChild);
        }

        // Look for promotional widget boxes from the correct container
        // Wait a bit for widgets to load, then search
        setTimeout(function() {
            // Find the ads/promotional container - this is .ads.g260, NOT .g260.cco_search_header
            var adsContainer = document.querySelector('.ads.g260');
            if (!adsContainer) {
                return;
            }

            // Find all widget_content divs that contain promotional links
            var widgetContents = adsContainer.querySelectorAll('.widget_content');
            var promoWidgets = [];

            // Keywords to identify promotional links
            var promoKeywords = ['bookstore', 'hebrew', 'exodus', 'womens', 'women', 'circle', 'verification', 'magazine'];

            for (var i = 0; i < widgetContents.length; i++) {
                var widget = widgetContents[i];
                var links = widget.querySelectorAll('a[href]');

                // Check if any link in this widget matches our keywords
                for (var j = 0; j < links.length; j++) {
                    var linkText = links[j].textContent.trim().toLowerCase();
                    var isPromo = false;

                    for (var k = 0; k < promoKeywords.length; k++) {
                        if (linkText.indexOf(promoKeywords[k]) !== -1) {
                            isPromo = true;
                            break;
                        }
                    }

                    if (isPromo) {
                        promoWidgets.push(widget);
                        break; // Only add widget once
                    }
                }
            }

            // Also find Contact and Donate links from header
            var contactLink = document.querySelector('a[href*="3767140"]'); // Contact page ID
            var donateLink = document.querySelector('a[href*="3772561"]'); // Donate page ID
            var quickLinksList = [];

            if (contactLink) {
                quickLinksList.push(contactLink);
            }
            if (donateLink) {
                quickLinksList.push(donateLink);
            }

            // Add QUICK LINKS section if we have any
            if (quickLinksList.length > 0 || promoWidgets.length > 0) {

                // Add "QUICK LINKS" header
                var quickLinksHeader = document.createElement('div');
                quickLinksHeader.textContent = 'QUICK LINKS';
                quickLinksHeader.style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:14px!important;font-weight:700!important;color:#f59e0b!important;text-transform:uppercase!important;letter-spacing:0.05em!important;margin:24px 0 12px 4px!important;border-top:2px solid rgba(30,58,138,0.1)!important;padding-top:20px!important;';
                contentWrapper.appendChild(quickLinksHeader);

                // Add Contact and Donate links first (styled as buttons)
                for (var i = 0; i < quickLinksList.length; i++) {
                    var quickLinkClone = quickLinksList[i].cloneNode(true);
                    quickLinkClone.style.cssText = 'display:block!important;padding:14px 20px!important;margin:10px 0!important;font-family:Urbanist,sans-serif!important;font-size:16px!important;font-weight:700!important;color:#1e3a8a!important;text-decoration:none!important;background:linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)!important;border-radius:12px!important;border:2px solid #2a75b8!important;text-align:center!important;box-shadow:0 2px 6px rgba(0,0,0,0.1)!important;text-transform:uppercase!important;letter-spacing:0.05em!important;';
                    contentWrapper.appendChild(quickLinkClone);
                }

                // Then add promotional widgets
                for (var i = 0; i < promoWidgets.length; i++) {
                    var widgetClone = promoWidgets[i].cloneNode(true);

                    // Style the cloned widget
                    widgetClone.style.cssText = 'display:block!important;margin:12px 0!important;padding:12px!important;background:#ffffff!important;border-radius:10px!important;border:1px solid rgba(30,58,138,0.15)!important;box-shadow:0 2px 6px rgba(0,0,0,0.08)!important;';

                    // Style all links inside the widget
                    var widgetLinks = widgetClone.querySelectorAll('a');
                    for (var j = 0; j < widgetLinks.length; j++) {
                        widgetLinks[j].style.cssText = 'display:block!important;color:#1e3a8a!important;text-decoration:none!important;font-family:Urbanist,sans-serif!important;font-size:15px!important;font-weight:600!important;';
                    }

                    contentWrapper.appendChild(widgetClone);
                }
            }
        }, 1000); // Wait 1 second for widgets to load

        // Force visibility of all child elements AND style them beautifully
        var allElements = contentWrapper.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            var el = allElements[i];
            if (el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE' && el.type !== 'hidden') {
                if (el.style.display === 'none') el.style.display = 'block';
                el.style.visibility = 'visible';
                if (el.style.opacity === '0') el.style.opacity = '1';
            }
        }

        // Style navigation links (NOT promotional boxes)
        var allLinks = contentWrapper.querySelectorAll('a');
        for (var i = 0; i < allLinks.length; i++) {
            var link = allLinks[i];

            // Check if this is a promotional box link (has target="_blank" or contains an image)
            var isPromoBox = link.hasAttribute('target') && link.getAttribute('target') === '_blank';
            var hasImage = link.querySelector('img') !== null;

            if (isPromoBox || hasImage) {
                // Style promotional boxes - ensure images show properly
                link.style.cssText = 'display:block!important;margin:12px 0!important;padding:0!important;text-decoration:none!important;background:transparent!important;border:none!important;border-radius:12px!important;overflow:hidden!important;box-shadow:0 2px 8px rgba(0,0,0,0.1)!important;';

                // Ensure the image inside is fully visible
                var img = link.querySelector('img');
                if (img) {
                    img.style.cssText = 'width:100%!important;height:auto!important;display:block!important;border-radius:12px!important;';
                }
            } else {
                // Style navigation links - clean white background
                link.style.cssText = 'display:block!important;padding:14px 18px!important;margin:6px 0!important;font-family:Urbanist,sans-serif!important;font-size:16px!important;font-weight:500!important;color:#1e3a8a!important;text-decoration:none!important;background:#ffffff!important;border-radius:12px!important;border:1px solid rgba(30,58,138,0.15)!important;transition:all 0.3s cubic-bezier(0.4,0,0.2,1)!important;box-shadow:0 1px 3px rgba(0,0,0,0.05)!important;';

                // Add hover effect with event listeners
                link.addEventListener('touchstart', function() {
                    this.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
                    this.style.transform = 'translateX(4px)';
                    this.style.borderColor = 'rgba(30,58,138,0.3)';
                    this.style.boxShadow = '0 2px 8px rgba(30,58,138,0.15)';
                });
                link.addEventListener('touchend', function() {
                    this.style.background = '#ffffff';
                    this.style.transform = 'translateX(0)';
                    this.style.borderColor = 'rgba(30,58,138,0.15)';
                    this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                });
            }
        }

        // Remove ALL yellow/orange backgrounds and borders - check ALL elements
        var allElements2 = contentWrapper.querySelectorAll('*');
        for (var i = 0; i < allElements2.length; i++) {
            var el = allElements2[i];
            var style = el.style;

            // Remove yellow/orange backgrounds
            if (style.backgroundColor) {
                if (style.backgroundColor.includes('255, 243') ||
                    style.backgroundColor.includes('255, 193') ||
                    style.backgroundColor.includes('rgb(255') ||
                    style.backgroundColor.includes('253, 230') ||
                    style.backgroundColor.includes('249, 242')) {
                    style.backgroundColor = 'transparent';
                }
            }

            // Remove yellow/orange borders
            if (style.borderColor && (style.borderColor.includes('orange') || style.borderColor.includes('255, 193'))) {
                style.border = 'none';
            }

            // Remove yellow/orange border shorthand properties
            if (style.border && style.border.includes('rgb(255')) {
                style.border = 'none';
            }
        }

        // Style section headers if they exist
        var headers = contentWrapper.querySelectorAll('h2, h3, h4, .header, [class*="header"]');
        for (var i = 0; i < headers.length; i++) {
            headers[i].style.cssText = 'font-family:Urbanist,sans-serif!important;font-size:14px!important;font-weight:700!important;color:#64748b!important;text-transform:uppercase!important;letter-spacing:0.05em!important;margin:20px 0 10px 4px!important;background:transparent!important;border:none!important;';
        }

        // Style images to be responsive and properly displayed
        var allImages = contentWrapper.querySelectorAll('img');
        for (var i = 0; i < allImages.length; i++) {
            allImages[i].style.cssText = 'max-width:100%!important;height:auto!important;display:block!important;margin:12px 0!important;border-radius:12px!important;box-shadow:0 2px 8px rgba(0,0,0,0.1)!important;';
        }

        // Style promotional boxes/divs that contain images or special content
        var allDivs = contentWrapper.querySelectorAll('div');
        for (var i = 0; i < allDivs.length; i++) {
            var div = allDivs[i];
            // If div contains an image or has specific classes, style it
            if (div.querySelector('img') || div.className) {
                div.style.cssText = 'margin:12px 0!important;display:block!important;';
            }
        }

        mobileSidebar.appendChild(contentWrapper);
        document.body.appendChild(mobileSidebar);

        // Create backdrop overlay
        backdrop = document.createElement('div');
        backdrop.style.cssText = 'position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;background:rgba(0,0,0,0.5)!important;opacity:0!important;visibility:hidden!important;z-index:100000!important;transition:all 0.3s ease!important;pointer-events:none!important;';
        document.body.appendChild(backdrop);

        // Touch event handlers
        var touchStartY = 0;
        var touchStartTime = 0;

        mobileSidebar.addEventListener('touchstart', function(e) {
            if (!isOpen) {
                touchStartY = e.touches[0].clientY;
                touchStartTime = Date.now();
            }
        }, {passive: true});

        mobileSidebar.addEventListener('touchend', function(e) {
            if (!isOpen) {
                var touchEndY = e.changedTouches[0].clientY;
                var touchEndTime = Date.now();
                var verticalDiff = Math.abs(touchEndY - touchStartY);
                var timeDiff = touchEndTime - touchStartTime;

                // Tap to open (minimal movement, quick duration)
                if (verticalDiff < 20 && timeDiff < 400) {
                    e.preventDefault();
                    e.stopPropagation();
                    open();
                }
                // Swipe up to open
                else if (touchEndY < touchStartY - 30 && timeDiff < 500) {
                    e.preventDefault();
                    e.stopPropagation();
                    open();
                }
            }
        });

        // Click handler for desktop testing
        mobileSidebar.addEventListener('click', function(e) {
            if (!isOpen) {
                var rect = mobileSidebar.getBoundingClientRect();
                var clickY = e.clientY;
                if (clickY >= rect.top) {
                    e.preventDefault();
                    open();
                }
            }
        });

        // Backdrop close handlers
        backdrop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            close();
        });

        backdrop.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            close();
        });

        // Keyboard handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                close();
            }
        });

        function open() {
            isOpen = true;
            mobileSidebar.style.transform = 'translateY(0)';
            mobileSidebar.style.setProperty('transform', 'translateY(0)', 'important');
            backdrop.style.opacity = '1';
            backdrop.style.visibility = 'visible';
            backdrop.style.pointerEvents = 'auto';
        }

        function close() {
            isOpen = false;
            mobileSidebar.style.setProperty('transform', 'translateY(calc(100% - '+visibleTab+'))', 'important');
            backdrop.style.opacity = '0';
            backdrop.style.visibility = 'hidden';
            backdrop.style.pointerEvents = 'none';
        }
    }

    // Try creating the sidebar multiple times with increasing delays
    // This ensures we catch it after the CMS has loaded all navigation content
    createMobileSidebar();
    setTimeout(createMobileSidebar, 500);
    setTimeout(createMobileSidebar, 1000);
    setTimeout(createMobileSidebar, 1500);
    setTimeout(createMobileSidebar, 2000);
    setTimeout(createMobileSidebar, 3000);
    setTimeout(createMobileSidebar, 4000);
    setTimeout(createMobileSidebar, 5000);

    // Also try on page load
    window.addEventListener('load', createMobileSidebar);

    // Watch for dynamic content loading with MutationObserver
    var observer = new MutationObserver(function() {
        if (!initialized) createMobileSidebar();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: VOLUNTEER FORMS */
/* ======================================== */
/* NOTE: Comprehensive volunteer form styling with typewriter animations */
/* is handled in jrcc-form-styles-all-complete-fixed.js */
/* This avoids duplication and ensures consistent styling */

/* ======================================== */
/* PAGE-SPECIFIC STYLING: SCHOLARSHIP FORM */
/* ======================================== */

(function() {
    function styleScholarshipForm() {
        // Check if on scholarship form page
        var isScholarshipPage =
            window.location.href.indexOf('scholarship') !== -1 ||
            window.location.href.indexOf('yeshiva') !== -1 ||
            document.title.toLowerCase().includes('scholarship');

        if (!isScholarshipPage) return;

        // Add page-specific class
        document.body.classList.add('scholarship-form-page');

        // Find and enhance form elements
        var formContainer = document.querySelector('.form-container, #form-container, .co_content_container form');
        if (formContainer) {
            formContainer.classList.add('scholarship-form-container');

            // Group form sections
            var formGroups = formContainer.querySelectorAll('.form-group, .field-group, fieldset');
            formGroups.forEach(function(group, index) {
                group.classList.add('scholarship-form-section');

                // Add progress indicator
                if (index === 0) {
                    var progress = document.createElement('div');
                    progress.className = 'scholarship-progress';
                    for (var i = 1; i <= formGroups.length; i++) {
                        var step = document.createElement('div');
                        step.className = 'scholarship-progress-step';
                        step.textContent = i;
                        if (i === 1) step.classList.add('active');
                        progress.appendChild(step);
                    }
                    formContainer.insertBefore(progress, formContainer.firstChild);
                }
            });

            // Enhance form controls
            var inputs = formContainer.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select');
            inputs.forEach(function(input) {
                input.classList.add('scholarship-form-control');
            });

            // Enhance radio buttons and checkboxes
            var radios = formContainer.querySelectorAll('input[type="radio"]');
            radios.forEach(function(radio) {
                var wrapper = radio.closest('label');
                if (wrapper) {
                    wrapper.classList.add('scholarship-radio-label');
                }
            });

            var checkboxes = formContainer.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function(checkbox) {
                var wrapper = checkbox.closest('label');
                if (wrapper) {
                    wrapper.classList.add('scholarship-checkbox-label');
                }
            });

            // Enhance submit button
            var submitBtn = formContainer.querySelector('input[type="submit"], button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('scholarship-submit-btn');

                // Add loading state
                var form = submitBtn.closest('form');
                if (form) {
                    form.addEventListener('submit', function() {
                        submitBtn.classList.add('loading');
                        submitBtn.value = 'Processing Application...';
                    });
                }
            }

            // Add tooltips for help text
            var helpTexts = formContainer.querySelectorAll('.help-text, .field-help, .description');
            helpTexts.forEach(function(help) {
                var tooltip = document.createElement('div');
                tooltip.className = 'scholarship-tooltip';
                tooltip.innerHTML = '<span class="tooltip-icon">?</span><span class="tooltip-text">' + help.textContent + '</span>';
                help.parentNode.replaceChild(tooltip, help);
            });
        }
    }

    // Run styling
    styleScholarshipForm();
    setTimeout(styleScholarshipForm, 500);
    setTimeout(styleScholarshipForm, 1000);
    setTimeout(styleScholarshipForm, 2000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleScholarshipForm);
    }
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: EDUCATION SUBSIDIES */
/* ======================================== */

(function() {
    function styleEducationSubsidiesPage() {
        // Check if on education subsidies page
        var isEducationPage =
            window.location.href.indexOf('education') !== -1 ||
            window.location.href.indexOf('subsid') !== -1;

        if (!isEducationPage) return;

        // Add page-specific class
        document.body.classList.add('education-subsidies-page');

        // Create main container if needed
        var mainContainer = document.querySelector('.subsidies-main-container');
        if (!mainContainer) {
            mainContainer = document.createElement('div');
            mainContainer.className = 'subsidies-main-container';

            var content = document.querySelector('.co_content_container, .main-content, #content');
            if (content) {
                // Move content into container
                while (content.firstChild) {
                    mainContainer.appendChild(content.firstChild);
                }
                content.appendChild(mainContainer);
            }
        }

        // Create carousel navigation
        var carouselData = [
            { icon: '🎓', title: 'Tuition Assistance', amount: 'Up to $5,000' },
            { icon: '📚', title: 'Book Stipend', amount: 'Up to $500' },
            { icon: '💻', title: 'Technology Grant', amount: 'Up to $1,000' },
            { icon: '🏫', title: 'After School Programs', amount: 'Up to $2,000' },
            { icon: '🎨', title: 'Enrichment Activities', amount: 'Up to $1,500' },
            { icon: '🚌', title: 'Transportation', amount: 'Up to $800' }
        ];

        var carouselHTML = '<div class="subsidies-nav-carousel">' +
            '<button class="carousel-control prev">‹</button>' +
            '<div class="subsidies-cards-wrapper">';

        carouselData.forEach(function(item, index) {
            carouselHTML += '<div class="subsidy-nav-card' + (index === 0 ? ' active' : '') + '" data-index="' + index + '">' +
                '<div class="subsidy-card-icon">' + item.icon + '</div>' +
                '<div class="subsidy-card-title">' + item.title + '</div>' +
                '<div class="subsidy-card-amount">' + item.amount + '</div>' +
                '</div>';
        });

        carouselHTML += '</div>' +
            '<button class="carousel-control next">›</button>' +
            '<div class="carousel-indicators">';

        for (var i = 0; i < Math.ceil(carouselData.length / 4); i++) {
            carouselHTML += '<span class="carousel-dot' + (i === 0 ? ' active' : '') + '"></span>';
        }

        carouselHTML += '</div></div>';

        // Insert carousel at the top of content
        mainContainer.insertAdjacentHTML('afterbegin', carouselHTML);

        // Carousel functionality
        var currentSlide = 0;
        var cardsWrapper = document.querySelector('.subsidies-cards-wrapper');
        var cards = document.querySelectorAll('.subsidy-nav-card');
        var prevBtn = document.querySelector('.carousel-control.prev');
        var nextBtn = document.querySelector('.carousel-control.next');
        var dots = document.querySelectorAll('.carousel-dot');

        function updateCarousel() {
            var cardsPerSlide = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 480 ? 2 : 1;
            var maxSlide = Math.ceil(cards.length / cardsPerSlide) - 1;

            if (currentSlide < 0) currentSlide = 0;
            if (currentSlide > maxSlide) currentSlide = maxSlide;

            var translateX = currentSlide * -100;
            cardsWrapper.style.transform = 'translateX(' + translateX + '%)';

            // Update controls
            prevBtn.classList.toggle('disabled', currentSlide === 0);
            nextBtn.classList.toggle('disabled', currentSlide === maxSlide);

            // Update dots
            dots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        prevBtn.addEventListener('click', function() {
            currentSlide--;
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            currentSlide++;
            updateCarousel();
        });

        // Card click handlers
        cards.forEach(function(card) {
            card.addEventListener('click', function() {
                cards.forEach(function(c) { c.classList.remove('active'); });
                this.classList.add('active');

                // Update content display
                var index = this.getAttribute('data-index');
                var contentSections = document.querySelectorAll('.content-section');
                contentSections.forEach(function(section, i) {
                    section.classList.toggle('active', i == index);
                });
            });
        });

        // Initialize carousel
        updateCarousel();

        // Handle window resize
        window.addEventListener('resize', updateCarousel);
    }

    // Run styling
    styleEducationSubsidiesPage();
    setTimeout(styleEducationSubsidiesPage, 500);
    setTimeout(styleEducationSubsidiesPage, 1000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleEducationSubsidiesPage);
    }
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: JVS TEMPLATE */
/* ======================================== */

(function() {
    function styleJVSTemplate() {
        // Check if on JVS page
        var isJVSPage =
            window.location.href.indexOf('jvs') !== -1 ||
            window.location.href.indexOf('vocational') !== -1 ||
            document.title.toLowerCase().includes('jvs');

        if (!isJVSPage) return;

        // Add page-specific class
        document.body.classList.add('jvs-page');

        // Create container structure
        var container = document.querySelector('.jvs-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'jvs-container';

            var content = document.querySelector('.co_content_container, .main-content, #content');
            if (content) {
                while (content.firstChild) {
                    container.appendChild(content.firstChild);
                }
                content.appendChild(container);
            }
        }

        // Enhance service cards
        var serviceCards = document.querySelectorAll('.service-card, .program-card, .jvs-service');
        serviceCards.forEach(function(card) {
            card.classList.add('jvs-service-card');

            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Create animated background particles
        var particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:-1;';

        for (var i = 0; i < 20; i++) {
            var particle = document.createElement('div');
            particle.style.cssText = 'position:absolute;width:4px;height:4px;background:rgba(59,130,246,0.3);border-radius:50%;';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = 'float ' + (15 + Math.random() * 10) + 's infinite ease-in-out';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }

        document.body.appendChild(particlesContainer);

        // Add floating animation
        var style = document.createElement('style');
        style.textContent = '@keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 25% { transform: translateY(-20px) translateX(10px); } 50% { transform: translateY(10px) translateX(-10px); } 75% { transform: translateY(-10px) translateX(5px); } }';
        document.head.appendChild(style);
    }

    // Run styling
    styleJVSTemplate();
    setTimeout(styleJVSTemplate, 500);
    setTimeout(styleJVSTemplate, 1000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleJVSTemplate);
    }
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: KEHILLA TEMPLATE */
/* ======================================== */

(function() {
    function styleKehillaTemplate() {
        // Check if on Kehilla page
        var isKehillaPage =
            window.location.href.indexOf('kehilla') !== -1 ||
            window.location.href.indexOf('community') !== -1 ||
            document.title.toLowerCase().includes('kehilla');

        if (!isKehillaPage) return;

        // Add page-specific class
        document.body.classList.add('kehilla-page');

        // Create container structure
        var container = document.querySelector('.kehilla-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'kehilla-container';

            var content = document.querySelector('.co_content_container, .main-content, #content');
            if (content) {
                while (content.firstChild) {
                    container.appendChild(content.firstChild);
                }
                content.appendChild(container);
            }
        }

        // Enhance program cards
        var programCards = document.querySelectorAll('.program-card, .kehilla-program, .service-item');
        programCards.forEach(function(card, index) {
            card.classList.add('kehilla-program-card');
            card.classList.add('animate-fade-in');
            card.style.animationDelay = (index * 0.1) + 's';

            // Add icon if missing
            if (!card.querySelector('.kehilla-program-icon')) {
                var icon = document.createElement('div');
                icon.className = 'kehilla-program-icon';
                icon.innerHTML = '🌟';
                card.insertBefore(icon, card.firstChild);
            }
        });

        // Enhance events list
        var events = document.querySelectorAll('.event-item, .kehilla-event');
        events.forEach(function(event) {
            event.classList.add('kehilla-event-item');

            // Add date display if missing
            var dateText = event.querySelector('.date, .event-date');
            if (dateText && !event.querySelector('.kehilla-event-date')) {
                var dateDisplay = document.createElement('div');
                dateDisplay.className = 'kehilla-event-date';
                var date = new Date(dateText.textContent);
                if (!isNaN(date)) {
                    dateDisplay.innerHTML = '<span class="kehilla-event-month">' +
                        date.toLocaleDateString('en-US', { month: 'short' }) +
                        '</span><span class="kehilla-event-day">' +
                        date.getDate() + '</span>';
                    event.insertBefore(dateDisplay, event.firstChild);
                }
            }
        });

        // Add smooth scroll for anchor links
        var anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Run styling
    styleKehillaTemplate();
    setTimeout(styleKehillaTemplate, 500);
    setTimeout(styleKehillaTemplate, 1000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleKehillaTemplate);
    }
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: KOSHER FOOD BANK */
/* ======================================== */

(function() {
    var initialized = false;

    function styleKosherFoodBankPage() {
        if (initialized) return;

        // CHECK: Are we on any Kosher Food Bank page?
        var isKosherFoodBankPage =
            window.location.href.indexOf('6819985') !== -1 || // Main page
            window.location.href.indexOf('6820886') !== -1 || // About Us
            window.location.href.toLowerCase().indexOf('kosher-food-bank') !== -1 ||
            window.location.href.toLowerCase().indexOf('get-help') !== -1 ||
            window.location.href.toLowerCase().indexOf('projects') !== -1;

        if (!isKosherFoodBankPage) return;

        initialized = true;

        // Mark page for CSS targeting
        document.body.classList.add('kosher-food-bank-page');

        // NAVIGATION ENHANCEMENTS
        function createMobileMenuToggle() {
            // Check if button already exists
            if (document.querySelector('.mobile-menu-toggle')) return;

            var navigation = document.querySelector('#navigation');
            if (!navigation) return;

            var toggleButton = document.createElement('button');
            toggleButton.className = 'mobile-menu-toggle';
            toggleButton.textContent = 'MENU';
            toggleButton.setAttribute('aria-label', 'Toggle navigation menu');

            // Add click handler
            toggleButton.addEventListener('click', function() {
                var menuContent = document.querySelector('.chabad_menu_content');
                if (menuContent) {
                    menuContent.classList.toggle('menu-open');
                    toggleButton.textContent = menuContent.classList.contains('menu-open') ? 'CLOSE' : 'MENU';
                }
            });

            // Insert button as first child of navigation
            navigation.insertBefore(toggleButton, navigation.firstChild);
        }

        // Ensure navigation links are BLACK (not white/invisible)
        function ensureNavColors() {
            var links = document.querySelectorAll('#navigation a, #menu a');
            links.forEach(function(link) {
                // Remove webkit text fill color that might make text invisible
                link.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
                link.style.removeProperty('fill');

                // Ensure link is visible
                if (!link.classList.contains('selected')) {
                    link.style.setProperty('color', '#000000', 'important');
                }
            });
        }

        // DONATE BUTTON ENHANCEMENT
        function enhanceDonateButton() {
            // Find donate links and add pulsing effect
            var donateLinks = document.querySelectorAll('a[href*="donate"], a[href*="Donate"]');

            donateLinks.forEach(function(link) {
                // Check if it's a main donate button (not in navigation)
                if (!link.closest('#navigation') && !link.closest('#menu')) {
                    link.classList.add('donate-link-pulse');
                }
            });

            // Special handling for donate card if it exists
            var promoCards = document.querySelectorAll('.sPromo-wrap');
            var donateCard = null;

            promoCards.forEach(function(card) {
                var caption = card.querySelector('.caption');
                if (caption && caption.textContent.toUpperCase().includes('DONATE')) {
                    donateCard = card;
                }
            });

            if (donateCard) {
                // Find or create donate link
                var existingLink = donateCard.querySelector('a[href*="donate"]');
                if (!existingLink) {
                    // Look for donate URL in nearby cards
                    var nextCard = donateCard.nextElementSibling;
                    if (nextCard && nextCard.classList.contains('sPromo-wrap')) {
                        var nextLink = nextCard.querySelector('a[href*="donate"]');
                        if (nextLink) {
                            // Create pulsing donate button
                            var pulsingLink = document.createElement('a');
                            pulsingLink.href = nextLink.href;
                            pulsingLink.className = 'donate-link-pulse';
                            pulsingLink.textContent = 'DONATE NOW';
                            pulsingLink.setAttribute('target', '_blank');
                            donateCard.appendChild(pulsingLink);

                            // Hide the duplicate card
                            nextCard.style.display = 'none';
                        }
                    }
                }
            }
        }

        // CARD HEIGHT FIXES
        function fixCardHeights() {
            var cards = document.querySelectorAll('.sPromo-wrap');
            cards.forEach(function(card) {
                // Remove inline height constraints
                card.style.removeProperty('height');
                card.style.removeProperty('max-height');
                card.style.removeProperty('min-height');
                card.style.overflow = 'visible';
            });
        }

        // RUN ALL ENHANCEMENTS
        createMobileMenuToggle();
        ensureNavColors();
        enhanceDonateButton();
        fixCardHeights();

        // Re-apply color fixes periodically (to fight CMS overrides)
        // But not as aggressively as the original (was every 100ms)
        setInterval(ensureNavColors, 1000);
    }

    // Try multiple times to catch CMS loading
    styleKosherFoodBankPage();
    setTimeout(styleKosherFoodBankPage, 500);
    setTimeout(styleKosherFoodBankPage, 1000);
    setTimeout(styleKosherFoodBankPage, 2000);

    // Also run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleKosherFoodBankPage);
    } else {
        styleKosherFoodBankPage();
    }

    // Watch for dynamic content loading
    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function() {
            if (!initialized) {
                styleKosherFoodBankPage();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: GMACH DONATION FORM */
/* ======================================== */

(function() {
    var initialized = false;

    function styleGmachDonationForm() {
        if (initialized) return;

        // Find the form - try by id first, then by name
        var form = document.querySelector('form#form1') || document.querySelector('form[name="form_3767140"]');
        if (!form) return; // Form not found, will retry

        initialized = true;

        // Add body class for CSS styling - this is the MOST IMPORTANT part
        // The external CSS will handle all the visual styling based on this class
        document.body.className = (document.body.className || '') + ' gmach-donation-form-page';

        console.log('JRCC: Gmach form styled - body class added');

        // Only add JavaScript interactions (not visual styles)
        // Add focus/blur event listeners for form inputs
        var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
        for (var i = 0; i < inputs.length; i++) {
            // Remove any inline styles that might exist
            inputs[i].removeAttribute('style');

            inputs[i].addEventListener('focus', function() {
                this.classList.add('focused');
            });
            inputs[i].addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        }

        // Add hover effects for buttons via classes
        var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"], .form-submit button');
        for (var i = 0; i < submitButtons.length; i++) {
            // Remove any inline styles
            submitButtons[i].removeAttribute('style');

            submitButtons[i].addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            submitButtons[i].addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        }

        // Mobile responsive check - add class instead of inline styles
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
        }
    }

    // Try multiple times with increasing delays
    styleGmachDonationForm();
    setTimeout(styleGmachDonationForm, 500);
    setTimeout(styleGmachDonationForm, 1000);
    setTimeout(styleGmachDonationForm, 1500);
    setTimeout(styleGmachDonationForm, 2000);

    // Try on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleGmachDonationForm);
    }

    // Try on window load
    window.addEventListener('load', styleGmachDonationForm);

    // Watch for dynamic content with MutationObserver
    var observer = new MutationObserver(function() {
        if (!initialized) styleGmachDonationForm();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: HEALTHY AT HOME */
/* ======================================== */

(function() {
    var initialized = false;

    function styleHealthyAtHomeForm() {
        if (initialized) return;

        // Check if we're on the Healthy At Home Registration page by URL
        var isHealthyAtHomePage = window.location.href.indexOf('/aid/6991302/') !== -1 ||
                                   window.location.href.indexOf('Healthy-At-Home-Registration') !== -1;

        if (!isHealthyAtHomePage) return;

        // Find the form
        var form = document.querySelector('form[name="form_6991302"]') ||
                   document.querySelector('form[id="6991302"]') ||
                   document.querySelector('form.userform-form');

        if (!form) return;

        initialized = true;

        // Add body class for CSS styling - let CSS handle all visual styling
        document.body.className = (document.body.className || '') + ' healthy-at-home-form-page';

        console.log('JRCC: Healthy At Home form styled - body class added');

        // Add JavaScript interactions only (no visual styles)
        var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
        for (var i = 0; i < inputs.length; i++) {
            // Remove any inline styles
            inputs[i].removeAttribute('style');

            inputs[i].addEventListener('focus', function() {
                this.classList.add('focused');
            });
            inputs[i].addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        }
    }

    // Try multiple times with increasing delays
    styleHealthyAtHomeForm();
    setTimeout(styleHealthyAtHomeForm, 500);
    setTimeout(styleHealthyAtHomeForm, 1000);
    setTimeout(styleHealthyAtHomeForm, 1500);
    setTimeout(styleHealthyAtHomeForm, 2000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleHealthyAtHomeForm);
    }

    window.addEventListener('load', styleHealthyAtHomeForm);

    var observer = new MutationObserver(function() {
        if (!initialized) styleHealthyAtHomeForm();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: SENIORS NIGHT OUT */
/* ======================================== */

(function() {
    var initialized = false;

    function styleSeniorsNightOutForm() {
        if (initialized) return;

        // Check if we're on the Seniors Night Out page by URL
        var isSeniorsNightOutPage = window.location.href.indexOf('/aid/6750519/') !== -1 ||
                                     window.location.href.indexOf('Seniors-Night-Out') !== -1;

        if (!isSeniorsNightOutPage) return;

        // Find the form
        var form = document.querySelector('form[name="form_6750519"]') ||
                   document.querySelector('form[id="6750519"]') ||
                   document.querySelector('form.userform-form');

        if (!form) return;

        initialized = true;

        // Add body class for CSS styling - let CSS handle all visual styling
        document.body.className = (document.body.className || '') + ' seniors-night-out-form-page';

        console.log('JRCC: Seniors Night Out form styled - body class added');

        // Add JavaScript interactions only (no visual styles)
        var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select');
        for (var i = 0; i < inputs.length; i++) {
            // Remove any inline styles
            inputs[i].removeAttribute('style');

            inputs[i].addEventListener('focus', function() {
                this.classList.add('focused');
            });
            inputs[i].addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        }

        var submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
        for (var i = 0; i < submitButtons.length; i++) {
            // Remove any inline styles
            submitButtons[i].removeAttribute('style');

            submitButtons[i].addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            submitButtons[i].addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        }
    }

    // Try multiple times with increasing delays
    styleSeniorsNightOutForm();
    setTimeout(styleSeniorsNightOutForm, 500);
    setTimeout(styleSeniorsNightOutForm, 1000);
    setTimeout(styleSeniorsNightOutForm, 1500);
    setTimeout(styleSeniorsNightOutForm, 2000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleSeniorsNightOutForm);
    }

    window.addEventListener('load', styleSeniorsNightOutForm);

    var observer = new MutationObserver(function() {
        if (!initialized) styleSeniorsNightOutForm();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();

/* ======================================== */
/* MAIN PAGE DETECTION AND INITIALIZATION */
/* ======================================== */

(function() {
    // Main initialization function that calls all page-specific functions
    function initializeAllPages() {
        console.log('JRCC: Checking page type and initializing appropriate styles...');

        // Get current URL and page info
        var currentURL = window.location.href.toLowerCase();
        var pageTitle = document.title.toLowerCase();

        // Check for Volunteer Form (Article ID: 6695166)
        if (currentURL.indexOf('6695166') !== -1 || currentURL.indexOf('volunteer') !== -1) {
            console.log('JRCC: Volunteer form detected');
            styleVolunteerForm();
        }

        // Check for Scholarship Form
        if (currentURL.indexOf('scholarship') !== -1 || currentURL.indexOf('yeshiva') !== -1 || pageTitle.includes('scholarship')) {
            console.log('JRCC: Scholarship form detected');
            styleScholarshipForm();
        }

        // Check for Education Subsidies
        if (currentURL.indexOf('education') !== -1 || currentURL.indexOf('subsid') !== -1) {
            console.log('JRCC: Education subsidies page detected');
            styleEducationSubsidiesPage();
        }

        // Check for JVS Template
        if (currentURL.indexOf('jvs') !== -1 || currentURL.indexOf('vocational') !== -1 || pageTitle.includes('jvs')) {
            console.log('JRCC: JVS page detected');
            styleJVSTemplate();
        }

        // Check for Kehilla Template
        if (currentURL.indexOf('kehilla') !== -1 || currentURL.indexOf('community') !== -1 || pageTitle.includes('kehilla')) {
            console.log('JRCC: Kehilla page detected');
            styleKehillaTemplate();
        }

        // Check for Kosher Food Bank pages
        if (currentURL.indexOf('6819985') !== -1 || // Main page
            currentURL.indexOf('6820886') !== -1 || // About Us
            currentURL.indexOf('kosher-food-bank') !== -1 ||
            currentURL.indexOf('get-help') !== -1 ||
            currentURL.indexOf('projects') !== -1) {
            console.log('JRCC: Kosher Food Bank page detected');
            styleKosherFoodBankPage();
        }

        // Check for Gmach Donation Form (form#form1 or form[name="form_3767140"])
        if (document.querySelector('form#form1') || document.querySelector('form[name="form_3767140"]')) {
            console.log('JRCC: Gmach Donation form detected');
            styleGmachDonationForm();
        }

        // Check for Healthy At Home Registration (Article ID: 6991302)
        if (currentURL.indexOf('6991302') !== -1 || currentURL.indexOf('healthy-at-home') !== -1) {
            console.log('JRCC: Healthy At Home registration detected');
            styleHealthyAtHomeForm();
        }

        // Check for Seniors Night Out (Article ID: 6750519)
        if (currentURL.indexOf('6750519') !== -1 || currentURL.indexOf('seniors-night-out') !== -1) {
            console.log('JRCC: Seniors Night Out page detected');
            styleSeniorsNightOutForm();
        }
    }

    // Run initialization on various page load events
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAllPages);
    } else {
        // DOM is already loaded
        initializeAllPages();
    }

    // Also run on window load for safety
    window.addEventListener('load', initializeAllPages);

    // Run with delays to handle dynamic content
    setTimeout(initializeAllPages, 500);
    setTimeout(initializeAllPages, 1000);
    setTimeout(initializeAllPages, 2000);

    // Set up MutationObserver for dynamic content
    var observer = new MutationObserver(function(mutations) {
        // Check if significant changes occurred
        for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes.length > 0) {
                // New content added, re-run initialization
                initializeAllPages();
                break;
            }
        }
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('JRCC custom scripts loaded successfully');
})();

/* End of JRCC Custom Scripts */