/*
   VISUAL DEBUG - Shows each fallback image so you can identify which is which
   Run this in console on jewishruralaz.org
*/

(function() {
    const extractBgUrl = (style) => {
        const match = (style || '').match(/url\(['"]?([^'")\s]+)['"]?\)/);
        return match ? match[1] : null;
    };

    const isGoodImage = (url) => {
        if (!url) return false;
        return (url.includes('chabad.org/media/images') || url.includes('fbcdn.net')) &&
               !url.includes('spacer') && !url.includes('logo') && !url.includes('icon');
    };

    // Collect images
    const images = [];
    const seen = new Set();
    document.querySelectorAll('[style*="url"]').forEach(el => {
        const bgUrl = extractBgUrl(el.getAttribute('style'));
        if (bgUrl && isGoodImage(bgUrl) && !seen.has(bgUrl)) {
            seen.add(bgUrl);
            images.push(bgUrl);
        }
    });

    // Create overlay to show images
    const overlay = document.createElement('div');
    overlay.id = 'image-debug-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.95);
        z-index: 99999;
        overflow: auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    `;

    const title = document.createElement('h1');
    title.textContent = 'Click an image to copy its index to console';
    title.style.cssText = 'color: white; text-align: center; margin-bottom: 20px;';
    overlay.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ Close';
    closeBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        z-index: 100000;
    `;
    closeBtn.onclick = () => overlay.remove();
    overlay.appendChild(closeBtn);

    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
        max-width: 1400px;
        margin: 0 auto;
    `;

    // Show first 20 images (the relevant ones)
    images.slice(0, 20).forEach((url, i) => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: #222;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.2s;
        `;
        card.onmouseenter = () => card.style.transform = 'scale(1.02)';
        card.onmouseleave = () => card.style.transform = 'scale(1)';

        const img = document.createElement('div');
        img.style.cssText = `
            width: 100%;
            height: 180px;
            background-image: url('${url}');
            background-size: cover;
            background-position: center;
        `;
        card.appendChild(img);

        const label = document.createElement('div');
        label.style.cssText = `
            padding: 10px;
            color: white;
            font-size: 14px;
        `;
        label.innerHTML = `
            <strong style="color: #4CAF50; font-size: 18px;">Index: ${i}</strong><br>
            <span style="color: #888; font-size: 11px; word-break: break-all;">${url.split('/').pop().substring(0, 30)}...</span>
        `;
        card.appendChild(label);

        card.onclick = () => {
            console.log(`\n📷 INDEX ${i} selected`);
            console.log(`URL: ${url}`);
            console.log(`\nTo use this for a location, add to LOCATION_IMAGE_INDEX:`);
            console.log(`    'payson': ${i},`);
            console.log(`    'white mountains': ${i},`);
            console.log(`    'holbrook': ${i},`);
            console.log(`    'globe': ${i},`);
            console.log(`    'online': ${i},`);
            alert(`Index ${i} copied to console!\n\nUse this in LOCATION_IMAGE_INDEX`);
        };

        grid.appendChild(card);
    });

    overlay.appendChild(grid);

    // Summary at bottom
    const summary = document.createElement('div');
    summary.style.cssText = `
        margin-top: 30px;
        padding: 20px;
        background: #333;
        border-radius: 10px;
        color: white;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    `;
    summary.innerHTML = `
        <h3 style="color: #4CAF50; margin-bottom: 10px;">How to use:</h3>
        <ol style="line-height: 1.8;">
            <li>Click on each image to see its index</li>
            <li>Note which index corresponds to which location:
                <ul>
                    <li>Payson / Rim Country</li>
                    <li>White Mountains</li>
                    <li>Holbrook</li>
                    <li>Globe / Miami</li>
                    <li>Online Programs</li>
                </ul>
            </li>
            <li>Update LOCATION_IMAGE_INDEX in the script with the correct indices</li>
        </ol>
        <pre style="background: #222; padding: 15px; border-radius: 5px; margin-top: 15px; overflow-x: auto;">
const LOCATION_IMAGE_INDEX = {
    'payson': ???,           // Find the Payson image index
    'white mountains': ???,  // Find the White Mountains index
    'holbrook': ???,         // Find the Holbrook index
    'globe': ???,            // Find the Globe/Miami index
    'online': ???            // Find the Online Programs index
};</pre>
    `;
    overlay.appendChild(summary);

    document.body.appendChild(overlay);

    console.log('\n🖼️ IMAGE DEBUG OVERLAY OPENED');
    console.log('Click on images to identify their index numbers');
    console.log('Then update LOCATION_IMAGE_INDEX with the correct values');
})();
