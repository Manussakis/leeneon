import 'focus-visible';
import SiteHeader from "./sections/SiteHeader";
import AboutMe from "./sections/AboutMe";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import A11yPreferences from "./sections/A11yPreferences";
import Preloader from "./sections/Preloader";
import GreetingClass  from "./libraries/greeting-class";
import objectFitImages from 'object-fit-images';
import SmoothScroll from "smooth-scroll";
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
        this.initSubscriptions();
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
        new SiteHeader(this.siteState);
        new AboutMe();
        new Portfolio();        
        new Contact();
        new A11yPreferences(this.siteState);
        new Preloader(this.siteState);
    }

    initPlugins() {     
        this.initSmoothScroll();
        
        new GreetingClass();

        // Polyfill object-fit/object-position
        objectFitImages();

        this.initJarallax();
    }

    initSubscriptions() {
        this.siteState.getSiteAnimations$().subscribe(state => {
            const speed = state ? 300 : 1;
            
            this.initSmoothScroll(speed);
        });
    }

    addListeners() {
        this.DOM.skipToContentBtn.addEventListener('click', this.onClickSkipToMainContent.bind(this));
    }    

    onPageScrollStop(event) {
        event.detail.anchor.focus();
    }

    onClickSkipToMainContent(event) {
        getEl(event.currentTarget.hash).focus();
    }

    initSmoothScroll(speed) {
        if (this.pageScroll) {
            this.pageScroll.destroy();
        }

        this.pageScroll = new SmoothScroll('a[href*="#"]', {
            speed: speed,
            speedAsDuration: true,
            easing: 'easeInOutCubic',
        });
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