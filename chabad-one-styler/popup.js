// Popup script for Chabad One Styler

const toggle = document.getElementById('toggleInspector');
const status = document.getElementById('status');

// Get current state
chrome.storage.local.get(['enabled'], (result) => {
  toggle.checked = result.enabled || false;
  updateStatus(result.enabled || false);
});

// Handle toggle change
toggle.addEventListener('change', async () => {
  const enabled = toggle.checked;

  // Save state
  chrome.storage.local.set({ enabled });

  // Send message to content script
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { action: 'toggle', enabled }, (response) => {
        if (chrome.runtime.lastError) {
          // Content script might not be loaded, try injecting it
          console.log('Content script not ready, page may need refresh');
          status.textContent = enabled ? 'On (refresh page)' : 'Off';
          status.className = 'status' + (enabled ? ' active' : '');
        } else {
          updateStatus(enabled);
        }
      });
    }
  } catch (err) {
    console.error('Error:', err);
  }
});

function updateStatus(enabled) {
  status.textContent = enabled ? 'Active - click elements to inspect' : 'Off';
  status.className = 'status' + (enabled ? ' active' : '');
}
