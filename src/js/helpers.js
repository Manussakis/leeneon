import {
    FOCUSABLE_ELEMENTS_STRING,
    SITE_NAVIGATION_MOBILE_ACTIVE_CLASSNAME,
    PORTFOLIO_MODAL_ACTIVE_CLASSNAME,
    A11Y_PREFERENCES_ACTIVE_CLASSNAME,
    ANIMATION_OFF_CLASSNAME,
    DARK_THEME_CLASSNAME,
    KEYCODES
} from "./constants";

export function bodyChildrenInert(state, activeChildEl) {
    Array.from(document.getElementById('site').children).forEach(function (child) {
        if (child !== activeChildEl) {
            child.inert = state;
        }
    });
}

// https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export function trapFocus(e) {
    const allFocusablesEls = e.currentTarget.querySelectorAll(FOCUSABLE_ELEMENTS_STRING);
    const firstTabStop = allFocusablesEls[0];
    const lastTabStop = allFocusablesEls[allFocusablesEls.length - 1];

    if (e.keyCode === KEYCODES.TAB) {
        if (e.shiftKey) {
            if (document.activeElement === firstTabStop) {
                e.preventDefault();
                lastTabStop.focus();
            }
        } else {
            if (document.activeElement === lastTabStop) {
                e.preventDefault();
                firstTabStop.focus();
            }
        }
    }
}

export function setTrapFocus(action, element) {
    if (action === 'add') {

        setTimeout(function () {
            element.querySelectorAll(FOCUSABLE_ELEMENTS_STRING)[0].focus();
        }, 100);

        element.addEventListener('keydown', trapFocus);

    } else if (action === 'remove') {
        element.removeEventListener('keydown', trapFocus);

    } else {
        throw new Error("The action options for trapFocus are only 'add' or 'remove'");
    }
}

export function getEl(selector) {
    return document.querySelector(selector);
}

export function queryAll(selector) {
    return document.querySelectorAll(selector);
}

export function getViewport() {
    const docElem = window.document.documentElement,
        clientW = docElem.clientWidth,
        innerW = window.innerWidth,
        clientH = docElem.clientHeight,
        innerH = window.innerHeight;

    return {
        width: clientW < innerW ? innerW : clientW,
        height: clientH < innerH ? innerH : clientH
    };
}

export function appendEl(referenceEl, child) {
    if (typeof child === "string") {
        referenceEl.insertAdjacentHTML('beforeend', child);
    } else {
        referenceEl.appendChild(child);
    }
}

export function insertAfter(referenceEl, sibling) {
    if (typeof sibling === "string") {
        referenceEl.insertAdjacentHTML('afterend', sibling);
    } else {
        referenceEl.parentElement.insertBefore(sibling, referenceEl.nextSibling);
    }
}

export function selectorMatches(el, selector) {
    const p = Element.prototype,
        f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };

    return f.call(el, selector);
}

export function getClosest(element, ancestor) {
    while (element) {
        if (selectorMatches(element, ancestor)) break;
        element = element.parentElement;
    }
    return element;
}

export function isWindowGreaterOrEqual(value) {
    return getViewport().width >= value;
}

export function isSiteNavigationMobilActive() {
    return getEl('#site-navigation').classList.contains(SITE_NAVIGATION_MOBILE_ACTIVE_CLASSNAME);
}

export function isPortfolioModalOpen() {
    return getEl('#portfolio-modal').classList.contains(PORTFOLIO_MODAL_ACTIVE_CLASSNAME);
}

export function isA11yPreferencesOpen() {
    return getEl('#a11y-preferences').classList.contains(A11Y_PREFERENCES_ACTIVE_CLASSNAME);
}

export function isRtl() {
    return getComputedStyle(document.body).direction === "rtl";
}

export function getSiteDir() {
    return getComputedStyle(document.body).direction;
}

export function isAnimationOff() {
    return document.body.classList.contains(ANIMATION_OFF_CLASSNAME);
}

export function bodyScrollable(state) {
    document.body.classList[state ? 'remove' : 'add']('overflow-hidden');
}

export function isDarkThemeActive() {
    return document.body.classList.contains(DARK_THEME_CLASSNAME);
}

export function setInertToSibligs(state, activeSiblingEl) {
    Array.from(activeSiblingEl.parentElement.children).forEach(child => {
        if (child !== activeSiblingEl) {
            if (!child.classList.contains('sr-only')) {
                child.inert = state;
            }
        }
    });
}

export function getPrefersColorScheme() {
    return window.matchMedia('(prefers-color-scheme: dark)');
}

export function isDarkModeActivated() {
    const mqDarkColorScheme = getPrefersColorScheme();

    return mqDarkColorScheme && mqDarkColorScheme.matches;
}

export function getPrefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)");
}

export function isReducedMotionActivated() {
    const mqPreferesReducedMotion = getPrefersReducedMotion();

    return mqPreferesReducedMotion && mqPreferesReducedMotion.matches;
}

// Get top and Left body scroll
export function pageScroll() {
    const docElem = document.documentElement;
    
    return {
        top: window.pageYOffset || docElem.scrollTop,
        left: window.pageXOffset || docElem.scrollLeft
    };
}

// Get top and Left positions relatives to body
export function getOffset(element) {
    const rect = element.getBoundingClientRect();
    
    return {
        top: rect.top + pageScroll().top,
        left: rect.left + pageScroll().left
    };
}