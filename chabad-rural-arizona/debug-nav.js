/*
   NAV DEBUGGER v2 - Visual overlay to explore navigation structure
   Run on jewishruralaz.org BEFORE injecting shadow DOM script
*/

(function() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'nav-debug-overlay';
    overlay.innerHTML = `
        <style>
            #nav-debug-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.95);
                z-index: 999999;
                overflow: auto;
                padding: 20px;
                font-family: 'Segoe UI', Arial, sans-serif;
                color: white;
            }
            #nav-debug-overlay h1 { color: #4CAF50; margin-bottom: 10px; }
            #nav-debug-overlay h2 { color: #2196F3; margin: 20px 0 10px; border-bottom: 1px solid #333; padding-bottom: 5px; }
            #nav-debug-overlay .close-btn {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #f44336;
                color: white;
                border: none;
                padding: 10px 20px;
                cursor: pointer;
                border-radius: 5px;
                font-size: 16px;
                z-index: 1000000;
            }
            #nav-debug-overlay .nav-item {
                background: #1a1a2e;
                border-radius: 8px;
                padding: 15px;
                margin: 10px 0;
                border-left: 4px solid #4CAF50;
            }
            #nav-debug-overlay .nav-item.has-submenu { border-left-color: #FF9800; }
            #nav-debug-overlay .nav-text { color: #4CAF50; font-size: 18px; font-weight: bold; }
            #nav-debug-overlay .nav-href { color: #888; font-size: 12px; word-break: break-all; }
            #nav-debug-overlay .nav-selector { color: #9C27B0; font-size: 11px; font-family: monospace; }
            #nav-debug-overlay .submenu { margin-left: 20px; margin-top: 10px; padding-left: 15px; border-left: 2px solid #FF9800; }
            #nav-debug-overlay .submenu-item { padding: 5px 0; }
            #nav-debug-overlay .submenu-text { color: #FF9800; }
            #nav-debug-overlay .code { background: #2d2d2d; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto; white-space: pre; }
            #nav-debug-overlay .copy-btn { background: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px; margin-left: 10px; }
            #nav-debug-overlay .section { margin-bottom: 30px; }
            #nav-debug-overlay .info { color: #888; font-size: 13px; }
        </style>
        <button class="close-btn" onclick="document.getElementById('nav-debug-overlay').remove()">✕ Close</button>
        <h1>Navigation Debugger</h1>
        <div id="debug-content"></div>
    `;
    document.body.appendChild(overlay);

    const content = document.getElementById('debug-content');
    let html = '';

    // 1. Find all span.parent nav items (current method)
    html += '<div class="section"><h2>1. span.parent Navigation Items (Current Method)</h2>';
    const parentSpans = document.querySelectorAll('span.parent');
    html += `<p class="info">Found ${parentSpans.length} span.parent elements</p>`;

    const navData = [];
    parentSpans.forEach((span, i) => {
        const link = span.querySelector('a');
        if (!link) return;

        const text = link.textContent.trim();
        const href = link.getAttribute('href');

        // Look for submenus in various places
        const submenuItems = [];

        // Check inside span
        const innerUl = span.querySelector('ul');
        if (innerUl) {
            innerUl.querySelectorAll('a').forEach(a => {
                const t = a.textContent.trim();
                if (t && t !== text) submenuItems.push({ text: t, href: a.getAttribute('href') });
            });
        }

        // Check next sibling
        let sibling = span.nextElementSibling;
        if (sibling && (sibling.tagName === 'UL' || sibling.classList.contains('submenu') || sibling.classList.contains('dropdown'))) {
            sibling.querySelectorAll('a').forEach(a => {
                const t = a.textContent.trim();
                if (t && t !== text && !submenuItems.find(s => s.text === t)) {
                    submenuItems.push({ text: t, href: a.getAttribute('href') });
                }
            });
        }

        // Check parent's next sibling
        const parent = span.parentElement;
        if (parent) {
            sibling = parent.nextElementSibling;
            if (sibling && (sibling.tagName === 'UL' || sibling.classList.contains('submenu'))) {
                sibling.querySelectorAll('a').forEach(a => {
                    const t = a.textContent.trim();
                    if (t && t !== text && !submenuItems.find(s => s.text === t)) {
                        submenuItems.push({ text: t, href: a.getAttribute('href') });
                    }
                });
            }
        }

        navData.push({ text, href, submenu: submenuItems });

        const hasSubmenu = submenuItems.length > 0;
        html += `<div class="nav-item ${hasSubmenu ? 'has-submenu' : ''}">`;
        html += `<div class="nav-text">${text}</div>`;
        html += `<div class="nav-href">${href}</div>`;
        html += `<div class="nav-selector">span.parent[${i}] > a</div>`;

        if (hasSubmenu) {
            html += `<div class="submenu">`;
            submenuItems.forEach(sub => {
                html += `<div class="submenu-item"><span class="submenu-text">${sub.text}</span> <span class="nav-href">${sub.href}</span></div>`;
            });
            html += `</div>`;
        }
        html += `</div>`;
    });
    html += '</div>';

    // 2. Show DOM structure around nav
    html += '<div class="section"><h2>2. DOM Structure Around Navigation</h2>';
    html += '<p class="info">Showing parent elements of first span.parent</p>';
    if (parentSpans.length > 0) {
        let el = parentSpans[0];
        let path = [];
        for (let i = 0; i < 8 && el; i++) {
            const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';
            const id = el.id ? `#${el.id}` : '';
            path.unshift(`<${el.tagName.toLowerCase()}${id}${classes}>`);
            el = el.parentElement;
        }
        html += `<div class="code">${path.join('\n  ')}</div>`;
    }
    html += '</div>';

    // 3. Look for alternative nav structures
    html += '<div class="section"><h2>3. Alternative Navigation Structures</h2>';

    // Check for ul-based navs
    const navUls = document.querySelectorAll('nav ul, .nav ul, #nav ul, .navigation ul, .main-menu');
    html += `<p class="info">Found ${navUls.length} potential nav UL elements</p>`;
    navUls.forEach((ul, i) => {
        const links = ul.querySelectorAll(':scope > li > a');
        if (links.length >= 3) {
            html += `<div class="nav-item">`;
            html += `<div class="nav-selector">Nav UL[${i}]: ${ul.className || ul.parentElement?.className || 'no class'}</div>`;
            html += `<div class="nav-href">${Array.from(links).map(a => a.textContent.trim()).join(' | ')}</div>`;
            html += `</div>`;
        }
    });
    html += '</div>';

    // 4. Generate code
    html += '<div class="section"><h2>4. Generated Code for test-shadow-dom.js</h2>';
    html += '<p class="info">Copy this to update extractNavLinks() if needed:</p>';

    let code = `// Extracted navigation data\nconst navLinks = [\n`;
    navData.forEach((item, i) => {
        code += `    { text: '${item.text}', href: '${item.href}', submenu: [`;
        if (item.submenu.length > 0) {
            code += '\n';
            item.submenu.forEach((sub, j) => {
                code += `        { text: '${sub.text}', href: '${sub.href}' }${j < item.submenu.length - 1 ? ',' : ''}\n`;
            });
            code += '    ';
        }
        code += `] }${i < navData.length - 1 ? ',' : ''}\n`;
    });
    code += `];`;

    html += `<div class="code">${code}</div>`;
    html += `<button class="copy-btn" onclick="navigator.clipboard.writeText(\`${code.replace(/`/g, '\\`')}\`); this.textContent='Copied!';">Copy Code</button>`;
    html += '</div>';

    // 5. Raw HTML of nav area
    html += '<div class="section"><h2>5. Raw HTML of First Nav Item</h2>';
    if (parentSpans.length > 0) {
        const firstSpan = parentSpans[0];
        const parent = firstSpan.parentElement?.parentElement;
        if (parent) {
            const rawHtml = parent.outerHTML
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .substring(0, 2000);
            html += `<div class="code" style="max-height: 300px; overflow: auto;">${rawHtml}...</div>`;
        }
    }
    html += '</div>';

    content.innerHTML = html;

    console.log('Nav Debug Data:', navData);
})();
