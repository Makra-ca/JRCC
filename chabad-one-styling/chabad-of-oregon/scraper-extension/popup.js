let currentTab = null;
let imageCount = 0;

// Get current tab info
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  currentTab = tabs[0];
  document.getElementById('url-display').textContent = currentTab.url;
});

// Generate base filename from URL
function getBaseFilename(url) {
  try {
    const urlObj = new URL(url);
    let domain = urlObj.hostname.replace(/^www\./, '');
    let path = urlObj.pathname.replace(/\//g, '_').replace(/^_/, '').replace(/_$/, '');
    if (!path) path = 'home';
    return `${domain}_${path}`;
  } catch {
    return 'event_image';
  }
}

// Activate button click
document.getElementById('activate-btn').addEventListener('click', async () => {
  const btn = document.getElementById('activate-btn');
  const status = document.getElementById('status');
  const instructions = document.getElementById('instructions');

  btn.disabled = true;
  btn.textContent = 'Activating...';

  try {
    // Inject the content script
    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: initImageCapture,
      args: [getBaseFilename(currentTab.url)]
    });

    btn.textContent = 'Selection Mode Active';
    status.textContent = 'Click any image on the page to capture it';
    status.className = 'status';
    instructions.innerHTML = 'Images will save to Downloads.<br>Close this popup when done.';

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'imageCapture') {
        imageCount++;
        status.textContent = `Captured ${imageCount} image${imageCount > 1 ? 's' : ''}`;
      } else if (message.type === 'captureError') {
        status.textContent = 'Error: ' + message.error;
        status.className = 'status error';
      }
    });

  } catch (err) {
    status.textContent = 'Error: ' + err.message;
    status.className = 'status error';
    btn.disabled = false;
    btn.textContent = 'Start Selecting Images';
  }
});

// This function gets injected into the page
function initImageCapture(baseFilename) {
  // Prevent re-initialization
  if (window.__imageCaptureActive) return;
  window.__imageCaptureActive = true;
  window.__imageCaptureCount = 0;

  // Add highlight style
  const style = document.createElement('style');
  style.textContent = `
    .image-capture-hover {
      outline: 3px solid #6B2C3E !important;
      outline-offset: 2px !important;
      cursor: crosshair !important;
    }
    .image-capture-flash {
      animation: captureFlash 0.3s ease-out !important;
    }
    @keyframes captureFlash {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Track all images and background images
  function isImageElement(el) {
    if (el.tagName === 'IMG') return true;
    if (el.tagName === 'PICTURE') return true;
    if (el.tagName === 'SVG') return true;
    // Check for background image
    const bg = window.getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none' && bg.includes('url(')) return true;
    return false;
  }

  // Hover effect
  document.addEventListener('mouseover', (e) => {
    if (isImageElement(e.target)) {
      e.target.classList.add('image-capture-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    e.target.classList.remove('image-capture-hover');
  });

  // Click to capture
  document.addEventListener('click', async (e) => {
    const el = e.target;
    if (!isImageElement(el)) return;

    e.preventDefault();
    e.stopPropagation();

    // Flash effect
    el.classList.add('image-capture-flash');
    setTimeout(() => el.classList.remove('image-capture-flash'), 300);

    try {
      // Get element bounds
      const rect = el.getBoundingClientRect();

      // Create canvas to capture the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Use device pixel ratio for sharp images
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      let captured = false;

      // If it's an IMG element, draw it directly
      if (el.tagName === 'IMG') {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, rect.width, rect.height);
            captured = true;
            resolve();
          };
          img.onerror = () => {
            // CORS error, fall back to html2canvas-like approach
            resolve();
          };
          img.src = el.src;
        });
      }

      // If direct draw failed or it's a background image, use alternative method
      if (!captured) {
        // Create a temporary clone and capture
        const clone = el.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = '-9999px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        document.body.appendChild(clone);

        // For background images, try to extract and draw
        const bg = window.getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none') {
          const urlMatch = bg.match(/url\(['"]?([^'")\s]+)['"]?\)/);
          if (urlMatch) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise((resolve) => {
              img.onload = () => {
                ctx.drawImage(img, 0, 0, rect.width, rect.height);
                captured = true;
                resolve();
              };
              img.onerror = resolve;
              img.src = urlMatch[1];
            });
          }
        }

        document.body.removeChild(clone);
      }

      // If still not captured, take a screenshot of the element region
      if (!captured) {
        // Fall back: fill with placeholder indicating manual screenshot needed
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = '#666';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CORS blocked - use browser screenshot', rect.width/2, rect.height/2);
      }

      // Convert to data URL and trigger download
      const dataUrl = canvas.toDataURL('image/png');
      window.__imageCaptureCount++;
      const filename = `${baseFilename}_${window.__imageCaptureCount}.png`;

      // Create download link
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.click();

      // Notify popup
      chrome.runtime.sendMessage({ type: 'imageCapture', count: window.__imageCaptureCount });

    } catch (err) {
      chrome.runtime.sendMessage({ type: 'captureError', error: err.message });
    }
  }, true);

  // Visual indicator that mode is active
  const indicator = document.createElement('div');
  indicator.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #6B2C3E;
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-family: sans-serif;
    font-size: 13px;
    z-index: 999999;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  indicator.textContent = '📷 Click images to capture';
  document.body.appendChild(indicator);

  // Remove indicator after 3 seconds
  setTimeout(() => indicator.remove(), 3000);
}
