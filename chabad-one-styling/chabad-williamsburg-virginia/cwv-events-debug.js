/**
 * CWV EVENTS DEBUG SCRIPT
 * Paste this into browser console to understand what CMS is doing
 * with visibility/display on form sections
 */
(function() {
  console.log('='.repeat(60));
  console.log('CWV DEBUG: Starting visibility analysis...');
  console.log('='.repeat(60));

  // Key elements to monitor
  var elementsToWatch = [
    '#SecondaryFormItems',
    '#Payment',
    '#ReserversInformation',
    '#Summary',
    '#Buttons',
    '#AdditionalInformation',
    '#CreditCard',
    '#Totals'
  ];

  // Log current state of all elements
  function logCurrentState() {
    console.log('\n--- CURRENT STATE ---');
    elementsToWatch.forEach(function(selector) {
      var el = document.querySelector(selector);
      if (!el) {
        console.log(selector + ': NOT FOUND');
        return;
      }

      var computed = window.getComputedStyle(el);
      var inlineStyle = el.getAttribute('style') || '(none)';
      var classes = el.className || '(no classes)';

      console.log('\n' + selector + ':');
      console.log('  display (computed):', computed.display);
      console.log('  visibility (computed):', computed.visibility);
      console.log('  inline style:', inlineStyle);
      console.log('  classes:', classes);
      console.log('  offsetHeight:', el.offsetHeight, '(0 = hidden)');
    });
  }

  // Log initial state
  logCurrentState();

  // Watch for changes
  console.log('\n--- WATCHING FOR CHANGES ---');
  console.log('Select a category to see what CMS does...\n');

  var registerBody = document.querySelector('#RegisterBody');
  if (registerBody) {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Attribute changes (style, class)
        if (mutation.type === 'attributes') {
          var target = mutation.target;
          var id = target.id || target.className || target.tagName;

          if (mutation.attributeName === 'style') {
            console.log('[STYLE CHANGE] #' + id);
            console.log('  new style:', target.getAttribute('style'));
          }
          if (mutation.attributeName === 'class') {
            console.log('[CLASS CHANGE] #' + id);
            console.log('  new classes:', target.className);
          }
        }

        // Child nodes added/removed
        if (mutation.type === 'childList') {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === 1) { // Element node
                console.log('[NODE ADDED]', node.id || node.className || node.tagName);
              }
            });
          }
          if (mutation.removedNodes.length > 0) {
            mutation.removedNodes.forEach(function(node) {
              if (node.nodeType === 1) {
                console.log('[NODE REMOVED]', node.id || node.className || node.tagName);
              }
            });
          }
        }
      });
    });

    observer.observe(registerBody, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      childList: true,
      subtree: true
    });

    console.log('Observer active on #RegisterBody');
  }

  // Also watch SecondaryFormItems specifically
  var secondary = document.querySelector('#SecondaryFormItems');
  if (secondary) {
    var secObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        console.log('[SecondaryFormItems CHANGE]', m.attributeName, '=', secondary.getAttribute(m.attributeName));
      });
    });
    secObserver.observe(secondary, { attributes: true });
    console.log('Observer active on #SecondaryFormItems');
  }

  // Helper to re-check state
  window.cwvDebugState = logCurrentState;
  console.log('\nTip: Run cwvDebugState() anytime to see current state');

})();
