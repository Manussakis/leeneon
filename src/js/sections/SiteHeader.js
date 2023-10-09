import SectionControl from "../libraries/section-control";
import Headroom from "headroom.js";
import anime from 'animejs/lib/anime.es.js';
import "wicg-inert";
import { 
    KEYCODES,
    BREAKPOINTS,    
    SITE_DIRECTIONS,
    SITE_NAVIGATION_TOGGLER_ACIVE_CLASSNAME,
    SITE_NAVIGATION_MOBILE_ACTIVE_CLASSNAME,
} from "../constants";
import { 
    getEl,
    queryAll,
    bodyChildrenInert,
    setTrapFocus,
    debounce,
    isWindowGreaterOrEqual,
    isSiteNavigationMobilActive,
    isPortfolioModalOpen,
    getSiteDir,
    isAnimationOff,
    bodyScrollable,
    setInertToSibligs,
    getClosest,
    getOffset,
} from '../helpers';

export default class SiteHeader {
    constructor() {    
        this.DOM = {};
        this.DOM.siteHeader = getEl('.site-header');
        this.DOM.siteNavigationToggler = getEl('#site-navigation-toggler');
        this.DOM.siteNavigationClose = getEl('#site-navigation-close');
        this.DOM.siteNavigation = getEl('#site-navigation');
        this.DOM.siteMenu = getEl('#site-menu');
        this.DOM.hashLinks = queryAll('a[href*="#"]');

        this.init();
    }

    init() {
        this.manageSiteMobileNavigation();
        this.initPlugins();
        this.addListeners();
    }

    initPlugins() {
        new SectionControl(this.DOM.siteMenu);
        this.headroom = new Headroom(this.DOM.siteHeader);
        this.headroom.init();
    }  

    addListeners() {
        this.DOM.siteNavigationToggler.addEventListener('click', this.toggleMobileNavbar.bind(this));
        this.DOM.siteNavigationClose.addEventListener('click', this.closeMobileNavbar.bind(this));
        document.addEventListener('keydown', this.onKeydownDocument.bind(this));
        document.addEventListener('keyup', this.onKeyupDocument.bind(this));
        window.addEventListener('resize', debounce(this.manageSiteMobileNavigation.bind(this), 250));
        
        window.addEventListener('popstate', (event) => {
            if (!isPortfolioModalOpen()) {
                this.scrollToSection(window.location.hash, false);
            } 
        });

        this.DOM.hashLinks.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const newHash = event.currentTarget.hash;
                
                this.scrollToSection(newHash, true);
            });
        });        
    }

    scrollToSection(newHash, pushState) {        
        let sectionEl;
        
        if (newHash.length) {
            sectionEl = getEl(newHash);
        } 

        if (sectionEl) {
            const doc = document.documentElement;
            const pageScrollTop = doc.scrollTop;
            const sectionOffsetTop = getOffset(sectionEl).top;
            let offset;

            if (pageScrollTop < sectionOffsetTop) {
                offset = sectionOffsetTop;
            } else {
                offset = sectionOffsetTop - this.DOM.siteHeader.offsetHeight;
            }

            const scrollAnimeProps = {
                targets: [doc, document.body],
	            scrollTop: offset,
	            duration: isAnimationOff() ? 1 : 300,
                easing: 'easeInOutCubic',
                complete: function (anim) {
                    sectionEl.focus();
                    
                    if (pushState) {
                        history.pushState(null, null, newHash);                        
                    }
                },
            };

            if (isSiteNavigationMobilActive()) {
                anime
                    .timeline({ duration: 500, })
                    .add(this.getCloseMobileNavbarAnimeProps())
                    .add(scrollAnimeProps, (isAnimationOff() ? 2 : 200));
            } else {
                anime(scrollAnimeProps);
            }
        }
    }

    onPageScrollStart() {
        if (isSiteNavigationMobilActive()) {
            this.closeMobileNavbar();
        }
    }

    onPageScrollStop(event) {
        event.detail.anchor.focus();
    }

    onKeydownDocument(event) {
        if (event.keyCode === KEYCODES.ESC && isSiteNavigationMobilActive()) {
            event.preventDefault();
            this.closeMobileNavbar();
        }
    }

    onKeyupDocument(event) {
        if (event.keyCode === KEYCODES.TAB && !isSiteNavigationMobilActive()) {
            this.showHeaderWhenFocused();
        }
    }

    showHeaderWhenFocused() {
        if (getClosest(document.activeElement, '#site-header')) {
            this.headroom.pin();
        }
    }

    manageSiteMobileNavigation() {
        if (!isWindowGreaterOrEqual(BREAKPOINTS.lg)) {
            if (!isSiteNavigationMobilActive()) {
                this.DOM.siteNavigation.inert = true;
            }
        } else {
            this.DOM.siteNavigation.inert = false;
    
            if (isSiteNavigationMobilActive()) {
                this.setSiteNavigationDesktop();
            }
        }
    }    

    toggleMobileNavbar() {
        if (isSiteNavigationMobilActive()) {
            this.closeMobileNavbar();
        } else {
            this.openMobileNavbar();
        }
    }

    openMobileNavbar() {
        const that = this;
        this.headroom.freeze();
    
        const transformDirection = SITE_DIRECTIONS[getSiteDir()].transform;
        const tl = anime.timeline({
            duration: 700,
            begin: function () {
                that.DOM.siteNavigationToggler.classList.add(SITE_NAVIGATION_TOGGLER_ACIVE_CLASSNAME);
                that.DOM.siteNavigationToggler.setAttribute('aria-expanded', 'true');
                that.DOM.siteNavigation.classList.add(SITE_NAVIGATION_MOBILE_ACTIVE_CLASSNAME);
                that.DOM.siteHeader.classList.add('site-header--mobile-navigation-active');
                bodyScrollable(false);
                that.DOM.siteNavigation.inert = false;
                bodyChildrenInert(true, that.DOM.siteHeader);
                setInertToSibligs(true, that.DOM.siteNavigation);
            },
            complete: function () {
                setTrapFocus('add', that.DOM.siteNavigation);
            }
        });
        const animationOff = isAnimationOff();
        const opacity0to1 = animationOff ? 1 : [0, 1];
        const duration = animationOff ? 1 : 200;
        const stagger = animationOff ? 0 : 50;
    
        tl
            .add({
                targets: '.site-navigation',
                opacity: opacity0to1,
                easing: 'linear',
                duration: duration,
            })
            .add({
                targets: ".site-navigation .navigation__item, .button--a11y-preferences",
                translateX: animationOff ? 0 : [(-50 * transformDirection), 0],
                opacity: opacity0to1,
                delay: anime.stagger(stagger),
            }, duration)
            .add({
                targets: '.site-social-links--header .button--icon',
                translateY: animationOff ? 0 : [20, 0],
                opacity: opacity0to1,
                delay: anime.stagger(stagger),
            }, duration);
    }
    
    getCloseMobileNavbarAnimeProps() {
        const that = this;
        
        return {
            targets: '.site-navigation',
            opacity: 0,
            easing: 'linear',
            duration: isAnimationOff() ? 1 : 200,
            complete: function () {
                that.setSiteNavigationDesktop();
                that.headroom.unfreeze();
                that.DOM.siteNavigationToggler.focus();
                that.DOM.siteHeader.classList.remove('site-header--mobile-navigation-active');
            },
            begin: function () {
                setTrapFocus('remove', that.DOM.siteNavigation);
            }
        };
    }

    closeMobileNavbar() {
        anime(this.getCloseMobileNavbarAnimeProps());
    }

    setSiteNavigationDesktop() {
        bodyScrollable(true);
        bodyChildrenInert(false, this.DOM.siteHeader);
        setInertToSibligs(false, this.DOM.siteNavigation);
        this.DOM.siteNavigationToggler.classList.remove(SITE_NAVIGATION_TOGGLER_ACIVE_CLASSNAME);
        this.DOM.siteNavigationToggler.setAttribute('aria-expanded', 'false');
        this.DOM.siteNavigation.classList.remove(SITE_NAVIGATION_MOBILE_ACTIVE_CLASSNAME);
        this.DOM.siteNavigation.style.opacity = '';
        getEl('#a11y-preferences-btn').style.opacity = '';
        queryAll('#site-navigation .navigation__item').forEach(item => {
            item.style.transform = "";
            item.style.opacity = "";
        });
    
        queryAll('.site-social-links--header .button--icon').forEach(socialLink => {
            socialLink.style.transform = "";
            socialLink.style.opacity = "";
        });
    }    
}