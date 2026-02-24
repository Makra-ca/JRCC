/**
 * Chabad One Styler - Content Script
 * Captures element info for debugging CSS selectors
 */

(function() {
  let isInspecting = false;
  let hoveredElement = null;
  let panel = null;

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggle') {
      isInspecting = message.enabled;
      if (isInspecting) {
        enableInspector();
      } else {
        disableInspector();
      }
      sendResponse({ success: true });
    } else if (message.action === 'getStatus') {
      sendResponse({ enabled: isInspecting });
    }
  });

  function enableInspector() {
    document.body.classList.add('chabad-styler-active');
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    document.addEventListener('click', handleClick, true);
    createPanel();
    showNotification('Inspector ON - Click any element');
  }

  function disableInspector() {
    document.body.classList.remove('chabad-styler-active');
    document.removeEventListener('mouseover', handleMouseOver, true);
    document.removeEventListener('mouseout', handleMouseOut, true);
    document.removeEventListener('click', handleClick, true);
    removeHighlight();
    removePanel();
  }

  function handleMouseOver(e) {
    if (!isInspecting) return;
    if (e.target.closest('.chabad-styler-panel')) return;

    removeHighlight();
    hoveredElement = e.target;
    hoveredElement.classList.add('chabad-styler-highlight');
  }

  function handleMouseOut(e) {
    if (!isInspecting) return;
    removeHighlight();
  }

  function handleClick(e) {
    if (!isInspecting) return;
    if (e.target.closest('.chabad-styler-panel')) return;

    e.preventDefault();
    e.stopPropagation();

    const element = e.target;
    const info = captureElementInfo(element);
    displayInfo(info);
  }

  function removeHighlight() {
    if (hoveredElement) {
      hoveredElement.classList.remove('chabad-styler-highlight');
      hoveredElement = null;
    }
    // Also remove any stray highlights
    document.querySelectorAll('.chabad-styler-highlight').forEach(el => {
      el.classList.remove('chabad-styler-highlight');
    });
  }

  function captureElementInfo(element) {
    const info = {
      // Basic info
      tagName: element.tagName.toLowerCase(),
      id: element.id || null,
      classes: Array.from(element.classList).filter(c => !c.startsWith('chabad-styler')),

      // Selector paths
      uniqueSelector: getUniqueSelector(element),
      fullPath: getFullPath(element),

      // Attributes
      attributes: getAttributes(element),

      // Parent chain (4 levels up)
      parentChain: getParentChain(element, 4),

      // Computed styles (key ones)
      computedStyles: getKeyComputedStyles(element),

      // Inline styles
      inlineStyles: element.getAttribute('style') || null,

      // Dimensions
      dimensions: getDimensions(element),

      // Inner HTML (truncated)
      innerHTML: element.innerHTML.substring(0, 500),

      // Outer HTML (truncated)
      outerHTML: element.outerHTML.substring(0, 800),

      // Text content
      textContent: element.textContent.trim().substring(0, 200)
    };

    return info;
  }

  function getUniqueSelector(element) {
    if (element.id) {
      return '#' + element.id;
    }

    const parts = [];
    let current = element;

    while (current && current !== document.body && parts.length < 5) {
      let selector = current.tagName.toLowerCase();

      if (current.id) {
        selector = '#' + current.id;
        parts.unshift(selector);
        break;
      }

      if (current.classList.length > 0) {
        const classes = Array.from(current.classList)
          .filter(c => !c.startsWith('chabad-styler'))
          .slice(0, 3)
          .join('.');
        if (classes) {
          selector += '.' + classes;
        }
      }

      parts.unshift(selector);
      current = current.parentElement;
    }

    return parts.join(' > ');
  }

  function getFullPath(element) {
    const parts = [];
    let current = element;

    while (current && current !== document.documentElement) {
      let selector = current.tagName.toLowerCase();

      if (current.id) {
        selector += '#' + current.id;
      }

      if (current.classList.length > 0) {
        const classes = Array.from(current.classList)
          .filter(c => !c.startsWith('chabad-styler'))
          .join('.');
        if (classes) {
          selector += '.' + classes;
        }
      }

      // Add nth-child if needed
      const parent = current.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === current.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1;
          selector += ':nth-child(' + index + ')';
        }
      }

      parts.unshift(selector);
      current = current.parentElement;
    }

    return parts.join(' > ');
  }

  function getAttributes(element) {
    const attrs = {};
    for (const attr of element.attributes) {
      if (attr.name !== 'class' && attr.name !== 'style' && !attr.name.startsWith('chabad-styler')) {
        attrs[attr.name] = attr.value.substring(0, 100);
      }
    }
    return attrs;
  }

  function getParentChain(element, levels) {
    const chain = [];
    let current = element.parentElement;
    let count = 0;

    while (current && current !== document.body && count < levels) {
      chain.push({
        tagName: current.tagName.toLowerCase(),
        id: current.id || null,
        classes: Array.from(current.classList).filter(c => !c.startsWith('chabad-styler'))
      });
      current = current.parentElement;
      count++;
    }

    return chain;
  }

  function getKeyComputedStyles(element) {
    const computed = window.getComputedStyle(element);
    return {
      display: computed.display,
      position: computed.position,
      width: computed.width,
      height: computed.height,
      padding: computed.padding,
      margin: computed.margin,
      border: computed.border,
      background: computed.background.substring(0, 100),
      color: computed.color,
      fontSize: computed.fontSize,
      fontFamily: computed.fontFamily.substring(0, 50),
      flexDirection: computed.flexDirection,
      justifyContent: computed.justifyContent,
      alignItems: computed.alignItems,
      float: computed.float,
      overflow: computed.overflow
    };
  }

  function getDimensions(element) {
    const rect = element.getBoundingClientRect();
    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      top: Math.round(rect.top),
      left: Math.round(rect.left)
    };
  }

  function createPanel() {
    if (panel) return;

    panel = document.createElement('div');
    panel.className = 'chabad-styler-panel';
    panel.innerHTML = `
      <div class="chabad-styler-panel-header">
        <span class="chabad-styler-panel-title">Chabad One Styler</span>
        <button class="chabad-styler-panel-close">&times;</button>
      </div>
      <div class="chabad-styler-panel-content">
        <p class="chabad-styler-hint">Click any element to inspect</p>
      </div>
      <div class="chabad-styler-panel-actions">
        <button class="chabad-styler-copy-btn">Copy Info</button>
      </div>
    `;

    document.body.appendChild(panel);

    // Close button
    panel.querySelector('.chabad-styler-panel-close').addEventListener('click', () => {
      isInspecting = false;
      disableInspector();
      chrome.storage.local.set({ enabled: false });
    });

    // Copy button
    panel.querySelector('.chabad-styler-copy-btn').addEventListener('click', copyInfo);
  }

  function removePanel() {
    if (panel) {
      panel.remove();
      panel = null;
    }
  }

  function displayInfo(info) {
    if (!panel) return;

    const content = panel.querySelector('.chabad-styler-panel-content');

    // Format for easy reading and copying
    const formatted = `
## Element Info

**Tag:** ${info.tagName}
**ID:** ${info.id || 'none'}
**Classes:** ${info.classes.length > 0 ? info.classes.join(', ') : 'none'}

### Selectors
**Unique:** \`${info.uniqueSelector}\`
**Full Path:** \`${info.fullPath}\`

### Parent Chain
${info.parentChain.map((p, i) => `${i + 1}. ${p.tagName}${p.id ? '#' + p.id : ''}${p.classes.length > 0 ? '.' + p.classes.join('.') : ''}`).join('\n')}

### Attributes
${Object.keys(info.attributes).length > 0 ? Object.entries(info.attributes).map(([k, v]) => `- ${k}: "${v}"`).join('\n') : 'none'}

### Computed Styles
- display: ${info.computedStyles.display}
- position: ${info.computedStyles.position}
- width: ${info.computedStyles.width}
- height: ${info.computedStyles.height}
- padding: ${info.computedStyles.padding}
- margin: ${info.computedStyles.margin}
- float: ${info.computedStyles.float}
- flex-direction: ${info.computedStyles.flexDirection}
- justify-content: ${info.computedStyles.justifyContent}
- align-items: ${info.computedStyles.alignItems}

### Dimensions
${info.dimensions.width}x${info.dimensions.height}px at (${info.dimensions.left}, ${info.dimensions.top})

### Inline Styles
${info.inlineStyles || 'none'}

### Text Content
${info.textContent || '(empty)'}

### Outer HTML (truncated)
\`\`\`html
${info.outerHTML}
\`\`\`
`;

    // Store for copying
    panel.dataset.info = formatted;

    // Display in panel (simplified view)
    content.innerHTML = `
      <div class="chabad-styler-info">
        <div class="chabad-styler-info-row">
          <span class="chabad-styler-label">Element:</span>
          <code>${info.tagName}${info.id ? '#' + info.id : ''}${info.classes.length > 0 ? '.' + info.classes.join('.') : ''}</code>
        </div>
        <div class="chabad-styler-info-row">
          <span class="chabad-styler-label">Selector:</span>
          <code>${info.uniqueSelector}</code>
        </div>
        <div class="chabad-styler-info-row">
          <span class="chabad-styler-label">Display:</span>
          <code>${info.computedStyles.display}</code>
        </div>
        <div class="chabad-styler-info-row">
          <span class="chabad-styler-label">Size:</span>
          <code>${info.dimensions.width}x${info.dimensions.height}px</code>
        </div>
        <div class="chabad-styler-info-row">
          <span class="chabad-styler-label">Parents:</span>
          <code>${info.parentChain.map(p => p.tagName + (p.classes.length > 0 ? '.' + p.classes[0] : '')).join(' < ')}</code>
        </div>
      </div>
      <p class="chabad-styler-hint">Click "Copy Info" to get full details for Claude</p>
    `;
  }

  function copyInfo() {
    if (!panel || !panel.dataset.info) {
      showNotification('No element selected yet');
      return;
    }

    navigator.clipboard.writeText(panel.dataset.info).then(() => {
      showNotification('Copied! Paste to Claude');
    }).catch(err => {
      console.error('Failed to copy:', err);
      showNotification('Copy failed');
    });
  }

  function showNotification(message) {
    const existing = document.querySelector('.chabad-styler-notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = 'chabad-styler-notification';
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => notif.remove(), 2000);
  }

  // Check if we should auto-enable (based on stored state)
  chrome.storage.local.get(['enabled'], (result) => {
    if (result.enabled) {
      isInspecting = true;
      enableInspector();
    }
  });
})();
