export const SITE_NAVIGATION_MOBILE_ACTIVE_CLASSNAME = 'site-navigation--mobile-active';

export const SITE_NAVIGATION_TOGGLER_ACIVE_CLASSNAME = 'site-navigation-toggler--active';

export const PORTFOLIO_MODAL_ACTIVE_CLASSNAME = 'portfolio-modal--active';

export const A11Y_PREFERENCES_ACTIVE_CLASSNAME = 'a11y-preferences--visible';

export const ANIMATION_OFF_CLASSNAME = 'animation-off';

export const DARK_THEME_CLASSNAME = 'dark-theme';

export const DEFAULT_THEME_CLASSNAME = 'default-theme';

export const A11Y_PREFERENCES_OBJ_NAME = 'a11yPreferences';

export const SITE_DIRECTIONS = {
    rtl: { 
        transform: -1,
        className: 'rtl'
    },
    ltr: {
        transform: 1,
        className: 'ltr'
    }
};

export const BREAKPOINTS = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

export const A11Y_PREFERENCES_OBJ_KEYS = {
    darkTheme: 'darkTheme',
    animations: 'animations',
};

export const FOCUSABLE_ELEMENTS_STRING = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'details',
    'summary',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
].join(',');

export const KEYCODES = {
    ESC: 27,
    TAB: 9,
};