console.log('=== SCRIPT LOADED FROM EXTERNAL FILE ===');
console.log('Document ready state:', document.readyState);

// Wait for DOM to be fully loaded, then wait a bit more for Chabad One to inject content
if (document.readyState === 'loading') {
    console.log('Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded fired!');
        // Wait a bit for Chabad One to inject the HTML content
        setTimeout(tryInitialize, 100);
    });
} else {
    console.log('DOM already ready, initializing with delay...');
    // Wait a bit for Chabad One to inject the HTML content
    setTimeout(tryInitialize, 100);
}

function tryInitialize() {
    console.log('=== ATTEMPTING TO INITIALIZE ===');

    // Check if elements exist, retry if not
    const heroSection = document.getElementById('jiw-hero-section');
    const container = document.getElementById('jiw-content-container');

    console.log('Hero section found:', !!heroSection);
    console.log('Container found:', !!container);

    if (!heroSection || !container) {
        console.log('Elements not ready yet, retrying in 200ms...');
        setTimeout(tryInitialize, 200);
        return;
    }

    console.log('Elements found! Proceeding with initialization...');
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
    console.log('Hero data:', data.hero);

    // Create elements programmatically instead of using template literals
    const heroContent = document.createElement('div');
    heroContent.className = 'jiw-hero-content';

    const heroTitle = document.createElement('h1');
    heroTitle.className = 'jiw-hero-title';
    heroTitle.textContent = data.hero.title;

    const heroSubtitle = document.createElement('p');
    heroSubtitle.className = 'jiw-hero-subtitle';
    heroSubtitle.textContent = data.hero.subtitle;

    heroContent.appendChild(heroTitle);
    heroContent.appendChild(heroSubtitle);
    heroSection.appendChild(heroContent);

    console.log('Hero section built successfully');

    // Build Content
    console.log('Building content...');
    const container = document.getElementById('jiw-content-container');
    console.log('Container element:', container);

    let cardNumber = 1;

    console.log('Processing', data.locations.length, 'locations...');

    data.locations.forEach(function(location) {
        // Create location section
        const locationSection = document.createElement('div');
        locationSection.className = 'jiw-location-section';

        // Create location header
        const locationHeader = document.createElement('div');
        locationHeader.className = 'jiw-location-header';

        const locationTitle = document.createElement('h2');
        locationTitle.className = 'jiw-location-title';
        locationTitle.textContent = location.locationName;

        locationHeader.appendChild(locationTitle);
        locationSection.appendChild(locationHeader);

        // Create services grid
        const servicesGrid = document.createElement('div');
        servicesGrid.className = 'jiw-services-grid';

        location.cards.forEach(function(card) {
            // Create service card
            const serviceCard = document.createElement('div');
            serviceCard.className = 'jiw-service-card' + (card.featured ? ' featured' : '');

            // Add card number
            const serviceNumber = document.createElement('div');
            serviceNumber.className = 'jiw-service-number';
            serviceNumber.textContent = cardNumber;
            serviceCard.appendChild(serviceNumber);

            // Add service name
            const serviceName = document.createElement('h3');
            serviceName.className = 'jiw-service-name';
            serviceName.textContent = card.serviceName;
            serviceCard.appendChild(serviceName);

            // Website and Cost Section
            if (card.website || card.cost || card.isFree) {
                const serviceInfo = document.createElement('div');
                serviceInfo.className = 'jiw-service-info';

                if (card.website) {
                    const link = document.createElement('a');
                    link.href = card.website;
                    link.className = 'jiw-service-link';
                    link.target = '_blank';
                    link.textContent = card.websiteDisplay;
                    serviceInfo.appendChild(link);
                }

                if (card.isFree) {
                    const costDiv = document.createElement('div');
                    costDiv.className = 'jiw-service-cost free';
                    costDiv.textContent = card.freeText;
                    serviceInfo.appendChild(costDiv);
                } else if (card.cost) {
                    const costDiv = document.createElement('div');
                    costDiv.className = 'jiw-service-cost';
                    costDiv.textContent = 'Cost: ' + card.cost;
                    serviceInfo.appendChild(costDiv);
                }

                if (card.donationNote) {
                    const noteP = document.createElement('p');
                    noteP.style.marginTop = '1rem';
                    noteP.style.fontSize = '0.95rem';
                    noteP.style.lineHeight = '1.6';
                    noteP.textContent = card.donationNote;
                    serviceInfo.appendChild(noteP);
                }

                serviceCard.appendChild(serviceInfo);
            }

            // Contact Section
            if (card.contact || card.title || card.email || card.phone) {
                const contactInfo = document.createElement('div');
                contactInfo.className = 'jiw-contact-info';

                if (card.contact) {
                    const contactItem = document.createElement('div');
                    contactItem.className = 'jiw-contact-item';
                    const strong = document.createElement('strong');
                    strong.textContent = 'Contact:';
                    contactItem.appendChild(strong);
                    contactItem.appendChild(document.createTextNode(' ' + card.contact));
                    contactInfo.appendChild(contactItem);
                }

                if (card.title) {
                    const titleItem = document.createElement('div');
                    titleItem.className = 'jiw-contact-item';
                    const strong = document.createElement('strong');
                    strong.textContent = 'Title:';
                    titleItem.appendChild(strong);
                    titleItem.appendChild(document.createTextNode(' ' + card.title));
                    contactInfo.appendChild(titleItem);
                }

                if (card.email) {
                    const emailItem = document.createElement('div');
                    emailItem.className = 'jiw-contact-item';
                    const strong = document.createElement('strong');
                    strong.textContent = 'Email:';
                    emailItem.appendChild(strong);
                    emailItem.appendChild(document.createTextNode(' '));
                    const emailLink = document.createElement('a');
                    emailLink.href = 'mailto:' + card.email;
                    emailLink.textContent = card.email;
                    emailItem.appendChild(emailLink);
                    contactInfo.appendChild(emailItem);
                }

                if (card.phone) {
                    const phoneItem = document.createElement('div');
                    phoneItem.className = 'jiw-contact-item';
                    const strong = document.createElement('strong');
                    strong.textContent = 'Phone:';
                    phoneItem.appendChild(strong);
                    phoneItem.appendChild(document.createTextNode(' '));
                    const phoneLink = document.createElement('a');
                    phoneLink.href = 'tel:' + card.phone.replace(/\s/g, '');
                    phoneLink.textContent = card.phone;
                    phoneItem.appendChild(phoneLink);
                    contactInfo.appendChild(phoneItem);
                }

                serviceCard.appendChild(contactInfo);
            }

            servicesGrid.appendChild(serviceCard);
            cardNumber++;
        });

        locationSection.appendChild(servicesGrid);
        container.appendChild(locationSection);
    });

    console.log('=== SUCCESS ===');
    console.log('Successfully built', cardNumber - 1, 'cards');
    console.log('Hero element:', document.getElementById('jiw-hero-section'));
    console.log('Container element children:', document.getElementById('jiw-content-container').children.length);
    console.log('=== DONE ===');
}
