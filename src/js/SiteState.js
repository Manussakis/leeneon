import { BehaviorSubject } from "rxjs";
import { A11Y_PREFERENCES_OBJ_NAME } from "./constants";
import { 
    isDarkModeActivated,
    isReducedMotionActivated
} from './helpers';

export default class SiteState {
    constructor() {
        this.siteTheme = new BehaviorSubject('default');
        this.siteAnimations = new BehaviorSubject(false);
        this.localStoragedA11yPreferencesWasSetted = new BehaviorSubject({});

        this.init();
    }

    init() {
        this.setA11yPreferencesBasedOnStorage();
    }

    emitSiteTheme(value) {
        this.siteTheme.next(value);
    }

    emitSiteAnimations(value) {
        this.siteAnimations.next(value);
    }

    emitLocalStoragedA11yPreferencesWasSetted(value) {
        this.localStoragedA11yPreferencesWasSetted.next(value);
    }

    getSiteTheme$() {
        return this.siteTheme.asObservable();
    }

    getSiteAnimations$() {
        return this.siteAnimations.asObservable();
    }

    getLocalStoragedA11yPreferencesWasSetted$() {
        return this.localStoragedA11yPreferencesWasSetted.asObservable();
    }

    setA11yPreferencesBasedOnStorage() {
        const a11yPreferencesObj = this.getLocalStoragedA11yPreferencesObj() || this.setAndGetFirstLocalStoragedA11yPreferences();

        if (a11yPreferencesObj.darkTheme) {
            this.emitSiteTheme('dark');        
        } else {
            this.emitSiteTheme('default');
        }
    
        if (a11yPreferencesObj.animations) {
            this.emitSiteAnimations(true);
        } else {
            this.emitSiteAnimations(false);
        }

        this.emitLocalStoragedA11yPreferencesWasSetted(true);
    }    

    getLocalStoragedA11yPreferencesObj() {
        const a11yPreferencesStoraged = localStorage.getItem(A11Y_PREFERENCES_OBJ_NAME);
    
        if (a11yPreferencesStoraged) {
            return JSON.parse(a11yPreferencesStoraged);
        }
    }  
    
    setAndGetFirstLocalStoragedA11yPreferences() {
        const a11yPreferencesObj = {
            darkTheme: isDarkModeActivated(),
            animations: !isReducedMotionActivated(),
        }
    
        localStorage.setItem(A11Y_PREFERENCES_OBJ_NAME, JSON.stringify(a11yPreferencesObj));
    
        return JSON.parse(localStorage.getItem(A11Y_PREFERENCES_OBJ_NAME));
    }    

    updateStoragedA11yPreferences(key, value) {
        const a11yPreferences = this.getLocalStoragedA11yPreferencesObj() || this.setAndGetFirstLocalStoragedA11yPreferences();
    
        a11yPreferences[key] = value;
    
        localStorage.setItem(A11Y_PREFERENCES_OBJ_NAME, JSON.stringify(a11yPreferences));
    }
}
