/**
 * CWV Font Debug Script
 * Run this in console to check what's affecting font sizes
 */
(function() {
  console.log('=== CWV FONT DEBUG ===\n');

  // Elements to check
  const selectors = [
    { name: 'Body', sel: 'body' },
    { name: 'Section Title', sel: '#RegisterBody .title' },
    { name: 'Form Label', sel: '#ReserversInformation .label' },
    { name: 'Input Field', sel: '#ReserversInformation input.co_form_input' },
    { name: 'Radio Item', sel: '.form-radio-item' },
    { name: 'Radio Label', sel: '.form-radio-item label' },
    { name: 'Checkbox Item', sel: '.form-checkbox-item' },
    { name: 'Checkbox Label', sel: '.form-checkbox-item label' },
    { name: 'Payment Label', sel: '#Payment .label' },
    { name: 'Payment Input', sel: '#Payment input.co_form_input' },
    { name: 'Additional Info Title', sel: '#AdditionalInformation .title' },
  ];

  selectors.forEach(({ name, sel }) => {
    const el = document.querySelector(sel);
    if (!el) {
      console.log(`❌ ${name} (${sel}): NOT FOUND`);
      return;
    }

    const computed = window.getComputedStyle(el);
    const inlineStyle = el.getAttribute('style');

    console.log(`\n📌 ${name} (${sel})`);
    console.log(`   Font Family: ${computed.fontFamily}`);
    console.log(`   Font Size: ${computed.fontSize}`);
    console.log(`   Font Weight: ${computed.fontWeight}`);
    console.log(`   Line Height: ${computed.lineHeight}`);

    if (inlineStyle) {
      console.log(`   ⚠️  INLINE STYLE: "${inlineStyle}"`);
    }

    // Check for CMS classes that might affect styling
    const classes = el.className;
    if (classes && typeof classes === 'string') {
      const cmsClasses = classes.split(' ').filter(c =>
        c.includes('co_') || c.includes('regular') || c.includes('small') ||
        c.includes('large') || c.includes('bold') || c.includes('font')
      );
      if (cmsClasses.length) {
        console.log(`   ⚠️  CMS CLASSES: ${cmsClasses.join(', ')}`);
      }
    }
  });

  // Check what stylesheets are loaded
  console.log('\n\n=== STYLESHEETS LOADED ===');
  Array.from(document.styleSheets).forEach((sheet, i) => {
    try {
      const href = sheet.href || 'inline';
      const rules = sheet.cssRules ? sheet.cssRules.length : 'N/A';
      console.log(`${i + 1}. ${href.substring(0, 80)} (${rules} rules)`);
    } catch (e) {
      console.log(`${i + 1}. ${sheet.href || 'inline'} (cross-origin, cannot read)`);
    }
  });

  // Check for any font-size rules in CMS stylesheets
  console.log('\n\n=== CMS FONT-SIZE RULES (checking accessible sheets) ===');
  Array.from(document.styleSheets).forEach(sheet => {
    try {
      if (!sheet.cssRules) return;
      Array.from(sheet.cssRules).forEach(rule => {
        if (rule.style && rule.style.fontSize) {
          const sel = rule.selectorText || '';
          // Only show rules that might affect our elements
          if (sel.includes('label') || sel.includes('input') ||
              sel.includes('form') || sel.includes('title') ||
              sel.includes('.regular') || sel.includes('.small') ||
              sel.includes('.bold') || sel.includes('co_')) {
            console.log(`   ${sel}: font-size: ${rule.style.fontSize}`);
          }
        }
      });
    } catch (e) {
      // Cross-origin sheet, skip
    }
  });

  // Check parent elements for inherited font sizes
  console.log('\n\n=== INHERITANCE CHECK (label element) ===');
  const labelEl = document.querySelector('#ReserversInformation .label');
  if (labelEl) {
    let current = labelEl;
    let depth = 0;
    while (current && depth < 10) {
      const computed = window.getComputedStyle(current);
      const tag = current.tagName?.toLowerCase() || 'unknown';
      const id = current.id ? `#${current.id}` : '';
      const cls = current.className && typeof current.className === 'string'
        ? '.' + current.className.split(' ').slice(0, 2).join('.')
        : '';
      console.log(`   ${depth}: <${tag}${id}${cls}> font-size: ${computed.fontSize}`);
      current = current.parentElement;
      depth++;
    }
  }

  console.log('\n\n=== DEBUG COMPLETE ===');
  console.log('Look for:');
  console.log('1. Inline styles overriding CSS');
  console.log('2. CMS classes like .regular, .small, .bold');
  console.log('3. CMS stylesheets with font-size rules');
  console.log('4. Inherited font sizes from parent elements');

})();
