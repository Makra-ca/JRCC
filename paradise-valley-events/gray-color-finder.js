// PARADISE VALLEY - Gray Color Finder Diagnostic Tool
// Paste this in browser console to find all elements using gray colors

(function() {
    console.log("🔍 Scanning for gray-colored elements...");

    // Gray colors to look for
    var grayPatterns = [
        /rgb\(245,\s*245,\s*245\)/i,     // #F5F5F5
        /rgb\(240,\s*240,\s*240\)/i,     // #F0F0F0
        /rgb\(238,\s*238,\s*238\)/i,     // #EEEEEE
        /rgb\(224,\s*224,\s*224\)/i,     // #E0E0E0
        /rgb\(204,\s*204,\s*204\)/i,     // #CCCCCC
        /rgb\(189,\s*189,\s*189\)/i,     // #BDBDBD
        /rgb\(158,\s*158,\s*158\)/i,     // #9E9E9E
        /rgb\(117,\s*117,\s*117\)/i,     // #757575
        /rgb\(96,\s*96,\s*96\)/i,        // #606060
        /#[fF]5[fF]5[fF]5/,              // #F5F5F5
        /#[fF]0[fF]0[fF]0/,              // #F0F0F0
        /#[eE]{6}/,                       // #EEEEEE
        /#[eE]0[eE]0[eE]0/,              // #E0E0E0
        /#[cC]{6}/,                       // #CCCCCC
        /#[bB][dD][bB][dD][bB][dD]/,     // #BDBDBD
        /#9[eE]9[eE]9[eE]/,              // #9E9E9E
        /#757575/,                        // #757575
        /#808080/,                        // Gray
        /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.[0-2]/  // Light black overlays
    ];

    var allElements = document.querySelectorAll('*');
    var grayElements = [];

    allElements.forEach(function(el) {
        var styles = window.getComputedStyle(el);
        var bgColor = styles.backgroundColor;
        var bgImage = styles.backgroundImage;
        var borderColor = styles.borderColor;
        var color = styles.color;

        var isGray = false;
        var matchedColor = '';
        var property = '';

        // Check background-color
        grayPatterns.forEach(function(pattern) {
            if (pattern.test(bgColor)) {
                isGray = true;
                matchedColor = bgColor;
                property = 'background-color';
            }
        });

        // Check background-image for gradients with gray
        if (bgImage && bgImage !== 'none') {
            grayPatterns.forEach(function(pattern) {
                if (pattern.test(bgImage)) {
                    isGray = true;
                    matchedColor = bgImage.substring(0, 100) + '...';
                    property = 'background-image';
                }
            });
        }

        // Check border-color
        grayPatterns.forEach(function(pattern) {
            if (pattern.test(borderColor)) {
                isGray = true;
                matchedColor = borderColor;
                property = 'border-color';
            }
        });

        if (isGray) {
            grayElements.push({
                element: el,
                tagName: el.tagName,
                id: el.id || '(no id)',
                className: el.className || '(no class)',
                property: property,
                color: matchedColor,
                selector: getSelector(el)
            });
        }
    });

    // Helper to get a useful selector
    function getSelector(el) {
        if (el.id) return '#' + el.id;
        if (el.className && typeof el.className === 'string') {
            var classes = el.className.split(' ').filter(function(c) { return c.length > 0; });
            if (classes.length > 0) return el.tagName.toLowerCase() + '.' + classes.slice(0, 2).join('.');
        }
        return el.tagName.toLowerCase();
    }

    // Output results
    console.log("===============================================");
    console.log("🎨 GRAY COLOR FINDER - Found " + grayElements.length + " elements");
    console.log("===============================================");

    // Group by selector
    var grouped = {};
    grayElements.forEach(function(item) {
        var key = item.selector + ' (' + item.property + ')';
        if (!grouped[key]) {
            grouped[key] = { count: 0, color: item.color, elements: [] };
        }
        grouped[key].count++;
        grouped[key].elements.push(item.element);
    });

    // Display grouped results
    Object.keys(grouped).forEach(function(key) {
        var group = grouped[key];
        console.log("📦 " + key + " × " + group.count);
        console.log("   Color: " + group.color);
        // Highlight first element
        if (group.elements[0]) {
            group.elements[0].style.outline = '3px solid red';
            group.elements[0].style.outlineOffset = '2px';
        }
    });

    console.log("===============================================");
    console.log("💡 Elements with gray colors are now highlighted with red outlines");
    console.log("💡 Run window.clearGrayHighlights() to remove highlights");

    // Store for clearing
    window.grayHighlightedElements = grayElements;

    // Clear function
    window.clearGrayHighlights = function() {
        if (window.grayHighlightedElements) {
            window.grayHighlightedElements.forEach(function(item) {
                item.element.style.outline = '';
                item.element.style.outlineOffset = '';
            });
            console.log("✅ Gray highlights cleared");
        }
    };

    return grayElements;
})();
