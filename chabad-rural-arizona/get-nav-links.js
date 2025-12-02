/* Get all navigation links - paste in console on jewishruralaz.org */

(function() {
    const output = [];
    output.push('='.repeat(50));
    output.push('NAVIGATION LINKS');
    output.push('='.repeat(50));

    // Try multiple selectors for nav
    const navSelectors = [
        '.site-nav-wrapper a',
        '.header-wrapper nav a',
        '#header a',
        '.nav a',
        '.menu a',
        '.navigation a'
    ];

    let allLinks = [];

    navSelectors.forEach(sel => {
        const links = document.querySelectorAll(sel);
        if (links.length > 0) {
            output.push(`\n## Found via: ${sel}`);
            links.forEach(a => {
                const text = a.textContent?.trim();
                const href = a.getAttribute('href');
                if (text && text.length < 50 && href) {
                    const fullUrl = href.startsWith('/') ? href : '/' + href;
                    output.push(`- "${text}" → ${fullUrl}`);
                    allLinks.push({ text, href: fullUrl });
                }
            });
        }
    });

    // Also get any dropdown menus
    output.push('\n## All Header Links');
    const headerLinks = document.querySelectorAll('#header a');
    headerLinks.forEach(a => {
        const text = a.textContent?.trim();
        const href = a.getAttribute('href');
        const parent = a.closest('li')?.className || '';
        if (text && text.length < 40 && href && !href.includes('javascript')) {
            output.push(`- "${text}" → ${href} ${parent ? `(${parent})` : ''}`);
        }
    });

    // Footer links too
    output.push('\n## Footer Links');
    const footerLinks = document.querySelectorAll('#footer a');
    footerLinks.forEach(a => {
        const text = a.textContent?.trim();
        const href = a.getAttribute('href');
        if (text && text.length < 40 && href) {
            output.push(`- "${text}" → ${href}`);
        }
    });

    const result = output.join('\n');
    console.log(result);

    navigator.clipboard?.writeText(result).then(() => {
        console.log('\n✅ Copied to clipboard!');
    }).catch(() => {});

    return result;
})();
