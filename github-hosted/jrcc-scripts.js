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
    }

    // MOBILE SIDEBAR REDESIGN
    if (window.innerWidth <= 768) {
        var mobileInitialized = false;

        function redesignMobileSidebar() {
            if (mobileInitialized) return;

            var mobileSidebar = document.querySelector('.g260, div.g260, .cco_search_header, div[class*="g260"], .sidebar-local-navigation, .co_local_menu');
            if (!mobileSidebar) {
                setTimeout(redesignMobileSidebar, 500);
                return;
            }

            mobileInitialized = true;

            // Create mobile menu button
            var mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
            mobileMenuBtn.style.cssText = 'position:fixed!important;bottom:20px!important;right:20px!important;width:60px!important;height:60px!important;background:linear-gradient(135deg,#3b82f6,#2563eb)!important;border-radius:50%!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;z-index:1001!important;box-shadow:0 4px 20px rgba(59,130,246,0.4)!important;border:none!important;cursor:pointer!important;transition:all 0.3s ease!important;';

            // Style hamburger lines
            var spans = mobileMenuBtn.querySelectorAll('span');
            for (var i = 0; i < spans.length; i++) {
                spans[i].style.cssText = 'width:24px!important;height:3px!important;background:white!important;border-radius:2px!important;transition:all 0.3s ease!important;';
            }

            document.body.appendChild(mobileMenuBtn);

            // Style mobile sidebar
            mobileSidebar.style.cssText = 'position:fixed!important;bottom:-100%!important;left:0!important;right:0!important;width:100%!important;background:linear-gradient(to top,#ffffff,#f8fafc)!important;border-radius:30px 30px 0 0!important;padding:30px 20px 40px!important;max-height:80vh!important;overflow-y:auto!important;transition:bottom 0.4s cubic-bezier(0.25,0.46,0.45,0.94)!important;z-index:1000!important;box-shadow:0 -10px 40px rgba(0,0,0,0.15)!important;';

            var isMobileOpen = false;

            // Create overlay
            var overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;background:rgba(0,0,0,0.5)!important;z-index:999!important;opacity:0!important;visibility:hidden!important;transition:all 0.3s ease!important;';
            document.body.appendChild(overlay);

            // Toggle function
            function toggleMobileMenu() {
                isMobileOpen = !isMobileOpen;
                if (isMobileOpen) {
                    mobileSidebar.style.bottom = '0';
                    overlay.style.opacity = '1';
                    overlay.style.visibility = 'visible';
                    mobileMenuBtn.style.transform = 'rotate(180deg)';
                    // Animate hamburger to X
                    spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
                } else {
                    mobileSidebar.style.bottom = '-100%';
                    overlay.style.opacity = '0';
                    overlay.style.visibility = 'hidden';
                    mobileMenuBtn.style.transform = 'rotate(0)';
                    // Reset hamburger
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }

            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
            overlay.addEventListener('click', toggleMobileMenu);

            // Style mobile sidebar links
            var mobileLinks = mobileSidebar.querySelectorAll('a');
            for (var j = 0; j < mobileLinks.length; j++) {
                mobileLinks[j].style.cssText += 'display:block!important;padding:15px 20px!important;color:#1e293b!important;text-decoration:none!important;border-radius:12px!important;margin-bottom:8px!important;background:#f1f5f9!important;font-weight:500!important;transition:all 0.2s ease!important;';

                mobileLinks[j].addEventListener('click', function() {
                    toggleMobileMenu();
                });
            }

            // Add header to mobile sidebar
            var mobileHeader = document.createElement('div');
            mobileHeader.innerHTML = '<h3 style="margin:0;color:#1e293b;font-size:20px;font-weight:700;">Menu</h3>';
            mobileHeader.style.cssText = 'text-align:center!important;margin-bottom:25px!important;padding-bottom:15px!important;border-bottom:2px solid #e2e8f0!important;';
            mobileSidebar.insertBefore(mobileHeader, mobileSidebar.firstChild);

            // Add pull indicator
            var pullIndicator = document.createElement('div');
            pullIndicator.style.cssText = 'position:absolute!important;top:10px!important;left:50%!important;transform:translateX(-50%)!important;width:40px!important;height:4px!important;background:#cbd5e1!important;border-radius:2px!important;';
            mobileSidebar.insertBefore(pullIndicator, mobileSidebar.firstChild);
        }

        redesignMobileSidebar();
        setTimeout(redesignMobileSidebar, 1000);
        setTimeout(redesignMobileSidebar, 2000);
    }
})();

/* ======================================== */
/* PAGE-SPECIFIC STYLING: VOLUNTEER FORMS */
/* ======================================== */

(function() {
    function styleVolunteerForms() {
        // Check if on volunteer form page
        var isVolunteerPage =
            window.location.href.indexOf('6695166') !== -1 ||
            window.location.href.indexOf('volunteer') !== -1;

        if (!isVolunteerPage) return;

        // Add page-specific class
        document.body.classList.add('volunteer-form-page');

        // Find and enhance form elements
        var formContainer = document.querySelector('.form-container, #form-container, .co_content_container form');
        if (formContainer) {
            formContainer.classList.add('volunteer-form-container');

            // Enhance form inputs
            var inputs = formContainer.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
            inputs.forEach(function(input) {
                input.classList.add('volunteer-form-control');
                // Add floating label effect
                if (input.value) {
                    input.classList.add('has-value');
                }
                input.addEventListener('blur', function() {
                    if (this.value) {
                        this.classList.add('has-value');
                    } else {
                        this.classList.remove('has-value');
                    }
                });
            });

            // Enhance checkboxes
            var checkboxes = formContainer.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function(checkbox) {
                var wrapper = checkbox.closest('label');
                if (wrapper) {
                    wrapper.classList.add('volunteer-checkbox-label');
                }
            });

            // Enhance submit button
            var submitBtn = formContainer.querySelector('input[type="submit"], button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('volunteer-submit-btn');

                // Add loading state on submit
                var form = submitBtn.closest('form');
                if (form) {
                    form.addEventListener('submit', function() {
                        submitBtn.classList.add('loading');
                        submitBtn.value = 'Submitting...';
                    });
                }
            }
        }
    }

    // Run styling
    styleVolunteerForms();
    setTimeout(styleVolunteerForms, 500);
    setTimeout(styleVolunteerForms, 1000);
    setTimeout(styleVolunteerForms, 2000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleVolunteerForms);
    }
})();

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

    function styleKosherFoodBankPages() {
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
    styleKosherFoodBankPages();
    setTimeout(styleKosherFoodBankPages, 500);
    setTimeout(styleKosherFoodBankPages, 1000);
    setTimeout(styleKosherFoodBankPages, 2000);

    // Also run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', styleKosherFoodBankPages);
    } else {
        styleKosherFoodBankPages();
    }

    // Watch for dynamic content loading
    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function() {
            if (!initialized) {
                styleKosherFoodBankPages();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();

/* End of JRCC Custom Scripts */