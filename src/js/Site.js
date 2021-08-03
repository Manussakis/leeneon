import 'focus-visible';
import SiteHeader from "./sections/SiteHeader";
import AboutMe from "./sections/AboutMe";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import A11yPreferences from "./sections/A11yPreferences";
import Preloader from "./sections/Preloader";
import GreetingClass  from "./libraries/greeting-class";
import objectFitImages from 'object-fit-images';
import "jarallax/dist/jarallax.css";
import { jarallax } from "jarallax";
import { SITE_DIRECTIONS } from "./constants";
import { 
    isRtl,
    getEl,
    queryAll
} from './helpers';

export default class Site {
    constructor(siteState) {
        this.siteState = siteState;
        
        this.DOM = {};
        this.DOM.skipToContentBtn = getEl('#skip-to-content');

        this.pageScroll;

        this.init();
    }

    init() {
        this.setSiteDirection();
        this.initSiteSections();
        this.initPlugins();
        this.addListeners();
    }

    setSiteDirection() {
        const bodyEl = document.body;
        const htmlEl = document.documentElement;
        
        if (isRtl()) {
            bodyEl.classList.remove(SITE_DIRECTIONS.ltr.className);
            bodyEl.classList.add(SITE_DIRECTIONS.rtl.className);
            htmlEl.setAttribute('dir', SITE_DIRECTIONS.rtl.className);
        } else {
            bodyEl.classList.remove(SITE_DIRECTIONS.rtl.className);
            bodyEl.classList.add(SITE_DIRECTIONS.ltr.className);
            htmlEl.setAttribute('dir', SITE_DIRECTIONS.ltr.className);
        }
    }        

    initSiteSections() {
        if(getEl('.page-home')) {
            new SiteHeader();
            new AboutMe();
            new Portfolio();
            new Contact();
            new A11yPreferences(this.siteState);
            new Preloader(this.siteState);
        }
    }

    initPlugins() {     
        new GreetingClass();

        // Polyfill object-fit/object-position
        objectFitImages();

        this.initJarallax();
    }

    addListeners() {
        this.DOM.skipToContentBtn.addEventListener('click', this.onClickSkipToMainContent.bind(this));
    }

    onClickSkipToMainContent(event) {
        getEl(event.currentTarget.hash).focus();
    }

    initJarallax() {
        if (queryAll('.jarallax').length) {
            jarallax(queryAll('.jarallax'), {
                speed: 0.5,
                automaticResize: true
            });
        }        
    }
}