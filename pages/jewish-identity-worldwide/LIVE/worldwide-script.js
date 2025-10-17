console.log('=== SCRIPT LOADED FROM EXTERNAL FILE ===');
console.log('Document ready state:', document.readyState);

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    console.log('Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded fired!');
        initWorldwideServices();
    });
} else {
    console.log('DOM already ready, initializing immediately...');
    initWorldwideServices();
}

function initWorldwideServices() {
    console.log('=== INITIALIZING WORLDWIDE SERVICES ===');

    // Load JSON data
    console.log('Looking for worldwide-data element...');
    const dataElement = document.getElementById('worldwide-data');
    console.log('Found dataElement:', dataElement);

    if (!dataElement) {
        console.error('ERROR: worldwide-data element not found!');
        console.log('All script elements:', document.querySelectorAll('script[type="application/json"]'));
        return;
    }

    console.log('dataElement text content length:', dataElement.textContent.length);

    let data;
    try {
        data = JSON.parse(dataElement.textContent);
        console.log('Successfully loaded data:', data);
    } catch (e) {
        console.error('Failed to parse JSON:', e);
        return;
    }

    // Build Hero Section
    console.log('Building hero section...');
    const heroSection = document.getElementById('jiw-hero-section');
    console.log('Hero section element:', heroSection);

    heroSection.innerHTML = `
        <div class="jiw-hero-content">
            <h1 class="jiw-hero-title">${data.hero.title}</h1>
            <p class="jiw-hero-subtitle">${data.hero.subtitle}</p>
        </div>
    `;

    // Build Content
    console.log('Building content...');
    const container = document.getElementById('jiw-content-container');
    console.log('Container element:', container);

    let cardNumber = 1;
    let html = '';

    console.log('Processing', data.locations.length, 'locations...');

    data.locations.forEach(location => {
        html += `
            <div class="jiw-location-section">
                <div class="jiw-location-header">
                    <h2 class="jiw-location-title">${location.locationName}</h2>
                </div>
                <div class="jiw-services-grid">
        `;

        location.cards.forEach(card => {
            const featuredClass = card.featured ? ' featured' : '';

            html += `
                <div class="jiw-service-card${featuredClass}">
                    <div class="jiw-service-number">${cardNumber}</div>
                    <h3 class="jiw-service-name">${card.serviceName}</h3>
            `;

            // Website and Cost Section
            if (card.website || card.cost || card.isFree) {
                html += '<div class="jiw-service-info">';

                if (card.website) {
                    html += `<a href="${card.website}" class="jiw-service-link" target="_blank">${card.websiteDisplay}</a>`;
                }

                if (card.isFree) {
                    html += `<div class="jiw-service-cost free">${card.freeText}</div>`;
                } else if (card.cost) {
                    html += `<div class="jiw-service-cost">Cost: ${card.cost}</div>`;
                }

                if (card.donationNote) {
                    html += `<p style="margin-top: 1rem; font-size: 0.95rem; line-height: 1.6;">${card.donationNote}</p>`;
                }

                html += '</div>';
            }

            // Contact Section
            if (card.contact || card.title || card.email || card.phone) {
                html += '<div class="jiw-contact-info">';

                if (card.contact) {
                    html += `<div class="jiw-contact-item"><strong>Contact:</strong> ${card.contact}</div>`;
                }
                if (card.title) {
                    html += `<div class="jiw-contact-item"><strong>Title:</strong> ${card.title}</div>`;
                }
                if (card.email) {
                    html += `<div class="jiw-contact-item"><strong>Email:</strong> <a href="mailto:${card.email}">${card.email}</a></div>`;
                }
                if (card.phone) {
                    html += `<div class="jiw-contact-item"><strong>Phone:</strong> <a href="tel:${card.phone.replace(/\s/g, '')}">${card.phone}</a></div>`;
                }

                html += '</div>';
            }

            html += '</div>';
            cardNumber++;
        });

        html += `
                </div>
            </div>
        `;
    });

    console.log('Generated HTML length:', html.length);
    console.log('Setting innerHTML...');

    container.innerHTML = html;

    console.log('=== SUCCESS ===');
    console.log('Successfully built', cardNumber - 1, 'cards');
    console.log('Hero element:', document.getElementById('jiw-hero-section'));
    console.log('Container element children:', document.getElementById('jiw-content-container').children.length);
    console.log('=== DONE ===');
}
