import anime from 'animejs/lib/anime.es.js';
import { 
    getEl,
    isWindowGreaterOrEqual,
    getSiteDir,
    isAnimationOff
} from '../helpers';
import { 
    SITE_DIRECTIONS,
    BREAKPOINTS
} from "../constants";

export default class Preloader {
    constructor(siteState) {
        this.siteState = siteState;
        
        this.DOM = {};
        this.DOM.preloader = getEl('.site-preloader');

        this.init();
    }

    init() {
        this.initSubscriptions();
    }

    initSubscriptions() {
        this.siteState.getLocalStoragedA11yPreferencesWasSetted$().subscribe(() => {
            if(this.DOM.preloader) {
                this.runSiteLoadAnimation();
            }
        });
    }

    runSiteLoadAnimation() {
        const that = this;

        const transformDirection = SITE_DIRECTIONS[getSiteDir()].transform;
        const siteLoadingTimeline = anime.timeline();
        const animationOff = isAnimationOff();
        const opacity0to1 = animationOff ? 1 : [0, 1];
        const preLoaderAnimation = {
            targets: '.site-preloader',
            opacity: animationOff ? 0 : [1, 0],
            delay: animationOff ? 700 : 500,
            duration: animationOff ? 1 : 200,
            easing: 'linear',
            complete: function () {
                that.DOM.preloader.style.display = 'none';
                document.body.classList.remove('site-is-loading');
            },
        };
        const siteBrandAnimation = {
            targets: '.site-brand',
            opacity: opacity0to1,
            easing: 'linear',
            duration: animationOff ? 1 : 1500,
        }
        const bannerContentAnimation = {
            targets: '#banner, .site-main, .site-footer__inner',
            opacity: opacity0to1,
            easing: 'linear',
            duration: animationOff ? 1 : 1200,
            begin: function (anim) {
                const siteHeader = getEl('#site-header');

                if (siteHeader.classList.contains('site-header--anim')) {
                    siteHeader.classList.remove('site-header--anim');
                }
            }
        };        

        if (!isWindowGreaterOrEqual(BREAKPOINTS.lg)) {
            const offset = animationOff ? 0 : '-=750';

            siteLoadingTimeline
                .add(preLoaderAnimation)
                .add(siteBrandAnimation)
                .add({
                    targets: '#site-navigation-toggler',
                    translateY: animationOff ? 0 : [-20, 0],
                    opacity: opacity0to1,
                }, offset)
                .add(bannerContentAnimation, offset);
        } else {
            const stagger = animationOff ? 0 : 50;
            const offset = animationOff ? 0 : '-=750';

            siteLoadingTimeline
                .add(preLoaderAnimation)
                .add(siteBrandAnimation)
                .add({
                    targets: '.site-navigation .navigation__item, .button--a11y-preferences',
                    translateY: animationOff ? 0 : [-20, 0],
                    opacity: opacity0to1,
                    delay: anime.stagger(stagger),
                }, offset)
                .add({
                    targets: '.site-social-links--footer .button--icon',
                    translateX: animationOff ? 0 : [(20 * transformDirection), 0],
                    opacity: opacity0to1,
                    delay: anime.stagger(stagger),
                }, offset)
                .add({
                    targets: '.line--social-links',
                    translateY: animationOff ? 0 : [20, 0],
                    opacity: opacity0to1,
                    easing: 'easeOutQuad',
                }, offset)
                .add(bannerContentAnimation, offset);
        }
    }
}