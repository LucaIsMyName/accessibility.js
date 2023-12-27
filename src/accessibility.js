/**
 * @name accessibility.js
 * @description an accesibility checker for web-development
 */

// Function to check if an element has an empty attribute
function hasEmptyAttribute(element, attributeName) {
    return !element.getAttribute(attributeName);
}

// Function to find the nearest parent element with a specified class
function findNearestParentWithClass(element, className) {
    while (element && !element.classList.contains(className)) {
        element = element.parentElement;
    }
    return element;
}

// Function to log element details
function logElementDetails(elements, message, isWarning = true) {
    const logFunc = isWarning ? console.warn : console.error;
    console.groupCollapsed(message);
    elements.forEach(({ element, parentBlockClasses }) => {
        logFunc(`%cElement: %o\nParent .block classes: %c${parentBlockClasses.join(' ')}`, 'color: yellow;', element, 'color: white; font-weight:bold;');
    });
    console.groupEnd();
}

// Function to scan images for alt attributes and dimensions
function scanImagesAndSVGs() {
    const imagesAndSVGs = document.querySelectorAll('img');
    let imagesWithoutAlt = [];
    let imagesWithEmptyAlt = [];
    let imagesWithoutDimensions = [];

    imagesAndSVGs.forEach((element) => {
        const parentBlock = findNearestParentWithClass(element, 'block');
        const parentBlockClasses = parentBlock ? Array.from(parentBlock.classList) : ['No parent .block found'];

        const hasAltAttribute = element.hasAttribute('alt');
        const hasWidthAttribute = element.hasAttribute('width');
        const hasHeightAttribute = element.hasAttribute('height');

        if (!hasAltAttribute) {
            imagesWithoutAlt.push({ element, parentBlockClasses });
        } else if (hasEmptyAttribute(element, 'alt')) {
            imagesWithEmptyAlt.push({ element, parentBlockClasses });
        }

        if (!hasWidthAttribute || !hasHeightAttribute) {
            imagesWithoutDimensions.push({ element, parentBlockClasses });
        }
    });

    if (imagesWithoutAlt.length > 0) {
        logElementDetails(imagesWithoutAlt, 'Images without alt attribute:', false);
    }
    if (imagesWithEmptyAlt.length > 0) {
        logElementDetails(imagesWithEmptyAlt, 'Images with empty alt attribute:');
    }
    if (imagesWithoutDimensions.length > 0) {
        logElementDetails(imagesWithoutDimensions, 'Images without width or height attributes:');
    }
}

// Function to scan links and buttons for title attributes
function scanLinksAndButtons() {
    const linksAndButtons = document.querySelectorAll('button');
    let elementsWithoutTitle = [];
    let elementsWithEmptyTitle = [];

    linksAndButtons.forEach((element) => {
        const parentBlock = findNearestParentWithClass(element, 'block');
        const parentBlockClasses = parentBlock ? Array.from(parentBlock.classList) : ['No parent .block found'];

        const hasTitleAttribute = element.hasAttribute('title');

        if (!hasTitleAttribute) {
            elementsWithoutTitle.push({ element, parentBlockClasses });
        } else if (hasEmptyAttribute(element, 'title')) {
            elementsWithEmptyTitle.push({ element, parentBlockClasses });
        }
    });

    if (elementsWithoutTitle.length > 0) {
        logElementDetails(elementsWithoutTitle, 'Buttons without Title Tag:');
    }
    if (elementsWithEmptyTitle.length > 0) {
        logElementDetails(elementsWithEmptyTitle, 'Buttons/Links with an empty Title attribute:');
    }
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
