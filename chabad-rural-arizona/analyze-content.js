/* Analyze the main content area - paste in console */

(function() {
    const output = [];
    output.push('='.repeat(60));
    output.push('CONTENT AREA DEEP DIVE');
    output.push('='.repeat(60));
    output.push('');

    // Find the main content wrapper
    const bodyWrapper = document.querySelector('.body_wrapper');
    if (!bodyWrapper) {
        output.push('ERROR: .body_wrapper not found');
        console.log(output.join('\n'));
        return;
    }

    output.push('## Body Wrapper Structure');
    output.push('Classes: ' + bodyWrapper.className);
    output.push('');

    // Get all widgets
    output.push('## All Widgets');
    const widgets = bodyWrapper.querySelectorAll('[class*="widget"]');
    widgets.forEach((w, i) => {
        const classes = w.className;
        const text = w.textContent?.trim().substring(0, 80) || '';
        output.push(`\n### Widget ${i + 1}`);
        output.push(`Classes: ${classes}`);
        output.push(`Preview: "${text}..."`);

        // Get immediate children structure
        output.push('Children:');
        Array.from(w.children).forEach(child => {
            const tag = child.tagName.toLowerCase();
            const childClasses = child.className || '';
            const childText = child.textContent?.trim().substring(0, 50) || '';
            output.push(`  <${tag} class="${childClasses}"> "${childText}..."`);
        });
    });
    output.push('');

    // Hero section
    output.push('## Hero Section');
    const hero = document.querySelector('[class*="hero"]');
    if (hero) {
        output.push('Classes: ' + hero.className);
        output.push('Tag: ' + hero.tagName);
        output.push('HTML (first 500 chars):');
        output.push(hero.outerHTML.substring(0, 500));
    } else {
        output.push('No hero found');
    }
    output.push('');

    // Sidebar check
    output.push('## Sidebar');
    const sidebar = document.querySelector('.sidebar, #sidebar, [class*="side"]');
    if (sidebar) {
        output.push('Found: ' + sidebar.className);
    } else {
        output.push('No sidebar found');
    }
    output.push('');

    // Main columns/grid
    output.push('## Layout Columns');
    const cols = bodyWrapper.querySelectorAll('[class*="col"], [class*="grid"], [class*="row"]');
    cols.forEach(c => {
        output.push('- ' + c.className);
    });
    if (cols.length === 0) output.push('No obvious column classes found');
    output.push('');

    // Links with images (likely cards)
    output.push('## Image Links (likely cards)');
    const imgLinks = bodyWrapper.querySelectorAll('a img');
    Array.from(imgLinks).slice(0, 10).forEach(img => {
        const a = img.closest('a');
        const src = img.src || '';
        const href = a?.href || '';
        if (!src.includes('spacer.gif')) {
            output.push(`- ${src.substring(src.lastIndexOf('/') + 1)} → ${href}`);
        }
    });
    output.push('');

    // Promo slider details
    output.push('## Promo Slider Details');
    const slider = document.querySelector('.promo_slider');
    if (slider) {
        output.push('Full HTML (first 1000 chars):');
        output.push(slider.outerHTML.substring(0, 1000));
    }
    output.push('');

    // Sneak peek widgets (location cards)
    output.push('## Sneak Peek Widgets (Location Cards)');
    const sneaks = document.querySelectorAll('.sneak_peek');
    sneaks.forEach((s, i) => {
        output.push(`\n### Location ${i + 1}`);
        const title = s.querySelector('h3, h4, .title, strong, b')?.textContent || 'No title';
        output.push(`Title: ${title}`);
        const link = s.querySelector('a')?.href || 'No link';
        output.push(`Link: ${link}`);
        const img = s.querySelector('img:not([src*="spacer"])')?.src || 'No image';
        output.push(`Image: ${img}`);
    });

    const result = output.join('\n');
    console.log(result);

    // Try to copy
    navigator.clipboard?.writeText(result).then(() => {
        console.log('\n✅ Copied to clipboard!');
    }).catch(() => {});

    return result;
})();
