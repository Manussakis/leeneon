import "wicg-inert";
import { 
    getEl,
    bodyChildrenInert,
    setTrapFocus,
    isSiteNavigationMobilActive,
    isA11yPreferencesOpen,
    isDarkThemeActive,
    getPrefersColorScheme,
    isDarkModeActivated,
    getPrefersReducedMotion,
    isReducedMotionActivated
} from '../helpers';
import { 
    DEFAULT_THEME_CLASSNAME,
    ANIMATION_OFF_CLASSNAME,
    DARK_THEME_CLASSNAME,
    A11Y_PREFERENCES_OBJ_KEYS,
    KEYCODES
} from "../constants";

export default class A11yPreferencs {
    constructor(siteState) {
        this.siteState = siteState;

        this.a11yPreferencesEl = getEl('#a11y-preferences');
        this.a11yPreferencesBtn = getEl('#a11y-preferences-btn');
        this.darkThemeControlEl = getEl('#dark-theme-control');
        this.animControlEl = getEl('#disable-anim-control');

        this.lastPageActiveEl = "";        

        this.init();
    }

    init() {
        if (!isA11yPreferencesOpen()) {
            this.a11yPreferencesEl.inert = true;
        }

        this.initSubscriptions();
        this.addListeners();
    }

    initSubscriptions() {
        this.siteState.getSiteTheme$().subscribe(theme => {
            if (theme === 'dark') {
                document.body.classList.remove(DEFAULT_THEME_CLASSNAME);
                document.body.classList.add(DARK_THEME_CLASSNAME);
                this.darkThemeControlEl.setAttribute('aria-checked', 'true');
                this.siteState.updateStoragedA11yPreferences(A11Y_PREFERENCES_OBJ_KEYS.darkTheme, true);
            } else if (theme === 'default') {
                document.body.classList.remove(DARK_THEME_CLASSNAME);
                document.body.classList.add(DEFAULT_THEME_CLASSNAME);
                this.darkThemeControlEl.setAttribute('aria-checked', 'false');
                this.siteState.updateStoragedA11yPreferences(A11Y_PREFERENCES_OBJ_KEYS.darkTheme, false);
            }
        });
        
        this.siteState.getSiteAnimations$().subscribe(value => {
            if (value) {
                document.body.classList.remove(ANIMATION_OFF_CLASSNAME);
                this.animControlEl.setAttribute('aria-checked', 'true');
                this.siteState.updateStoragedA11yPreferences(A11Y_PREFERENCES_OBJ_KEYS.animations, true);
            } else {
                document.body.classList.add(ANIMATION_OFF_CLASSNAME);
                this.animControlEl.setAttribute('aria-checked', 'false');
                this.siteState.updateStoragedA11yPreferences(A11Y_PREFERENCES_OBJ_KEYS.animations, false);
            }
        });
    }

    addListeners() {
        document.addEventListener('keydown', this.onEscA11yPreferences.bind(this));
        this.a11yPreferencesBtn.addEventListener('click', this.openA11yPreferences.bind(this));
        getEl('#a11y-preferences-close-btn').addEventListener('click', this.closeA11yPreferences.bind(this));
        getEl('#skip-to-a11y-preferences').addEventListener('click', this.openA11yPreferences.bind(this));
        getEl('#a11y-preferences-overlay').addEventListener('click', this.closeA11yPreferences.bind(this));
        this.darkThemeControlEl.addEventListener('click', this.toggleSiteTheme.bind(this));
        this.animControlEl.addEventListener('click', this.toggleAnimation.bind(this));
        
        if (getPrefersColorScheme().addEventListener) {
            getPrefersColorScheme().addEventListener('change', this.onChangePrefersColorSchema.bind(this));
        } else {
            getPrefersColorScheme().addListener(this.onChangePrefersColorSchema.bind(this));
        }
        
        if (getPrefersReducedMotion().addEventListener) {
            getPrefersReducedMotion().addEventListener('change', this.onChangePrefersReducdMotion.bind(this));
        } else {
            getPrefersReducedMotion().addListener(this.onChangePrefersReducdMotion.bind(this));
        }
    }

    onEscA11yPreferences(event) {
        if (event.keyCode === KEYCODES.ESC && isA11yPreferencesOpen()) {
            event.preventDefault();
            this.closeA11yPreferences();
        }
    }

    openA11yPreferences() {
        this.lastPageActiveEl = document.activeElement;
        bodyChildrenInert(true, this.a11yPreferencesEl);
        this.a11yPreferencesEl.inert = false;
        this.a11yPreferencesEl.style.display = 'block';
        this.a11yPreferencesBtn.setAttribute('aria-expanded', 'true');
        setTimeout(() => {
            this.a11yPreferencesEl.classList.add('a11y-preferences--visible');
            setTrapFocus('add', this.a11yPreferencesEl);
        }, 10);
    }    

    closeA11yPreferences() {
        this.a11yPreferencesEl.classList.remove('a11y-preferences--visible');
        this.a11yPreferencesBtn.setAttribute('aria-expanded', 'false');
        setTrapFocus('remove', this.a11yPreferencesEl);
        this.a11yPreferencesEl.inert = true;
    
        setTimeout(() => {
            this.a11yPreferencesEl.style.display = 'none';
        }, 200);
    
        if (isSiteNavigationMobilActive()) {
            getEl('.site-header').inert = false;
        } else {
            bodyChildrenInert(false, this.a11yPreferencesEl);
        }
    
        this.lastPageActiveEl.focus();
    }  
    
    toggleSiteTheme() {
        if (isDarkThemeActive()) {
            this.siteState.emitSiteTheme('default');        
        } else {
            this.siteState.emitSiteTheme('dark');
        }
    }
    
    toggleAnimation(event) {
        if (event.currentTarget.getAttribute('aria-checked') === 'true') {
            this.siteState.emitSiteAnimations(false);
        } else {
            this.siteState.emitSiteAnimations(true);
        }
    }    
    
    onChangePrefersColorSchema() {
        if (isDarkModeActivated()) {
            this.siteState.emitSiteTheme('dark');        
        } else {
            this.siteState.emitSiteTheme('default');
        }
    }

    onChangePrefersReducdMotion() {
        if (isReducedMotionActivated()) {
            this.siteState.emitSiteAnimations(false);
        } else {
            this.siteState.emitSiteAnimations(true);
        }
    }    
}
