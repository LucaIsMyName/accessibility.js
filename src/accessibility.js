/**
 * @name accessibility.js
 * @description an accesibility checker for web-development
 */
// Function to check if an element has an empty attribute
function hasEmptyAttribute(element, attributeName) {
    return !element.getAttribute(attributeName);
}


// Function to scan images and SVGs for alt attributes and dimensions
function scanImagesAndSVGs() {
    const imagesAndSVGs = document.querySelectorAll('img, svg');

    imagesAndSVGs.forEach((element) => {
        const hasAltAttribute = element.hasAttribute('alt');
        const hasWidthAttribute = element.hasAttribute('width');
        const hasHeightAttribute = element.hasAttribute('height');

        if (!hasAltAttribute) {
            console.error('Image without alt attribute found, please enter alt text:', element);
        } else if (hasEmptyAttribute(element, 'alt')) {
            console.warn('There is an image with an empty alt attribute:', element);
        }

        if (!hasWidthAttribute || !hasHeightAttribute) {
            console.warn('Image without width or height attributes found:', element);
        }
    });
}

// Function to scan links and buttons for title attributes
function scanLinksAndButtons() {
    const linksAndButtons = document.querySelectorAll('button');

    linksAndButtons.forEach((element) => {
        const hasTitleAttribute = element.hasAttribute('title');

        if (!hasTitleAttribute) {
            console.warn('Button without Title Tag found, please enter Title Text:', element);
        } else if (hasEmptyAttribute(element, 'title')) {
            console.warn('There is a Button/Link with an empty Title attribute:', element);
        }
    });
}

// Function to check font size on viewport resize
function checkFontSize() {
    window.addEventListener('resize', () => {
        const fontSize = window.getComputedStyle(document.body).fontSize;
        const fontSizeNum = parseFloat(fontSize);

        if (fontSizeNum < 12) {
            console.warn('Font under 12px size found');
        }
    });
}

// Call the functions to perform scans
scanImagesAndSVGs();
scanLinksAndButtons();
checkFontSize();

Í