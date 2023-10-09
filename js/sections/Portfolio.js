import "wicg-inert";
import Isotope from "isotope-layout";
import anime from 'animejs/lib/anime.es.js';
import Swiper from "swiper";
import 'swiper/swiper-bundle.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import SwiperCore, { Navigation, EffectFade } from 'swiper/core';
import { 
    isRtl,
    getEl,
    queryAll,
    bodyChildrenInert,
    isPortfolioModalOpen,
    getSiteDir,
    isAnimationOff, 
    bodyScrollable,
    setInertToSibligs
} from '../helpers';
import { 
    KEYCODES,    
    PORTFOLIO_MODAL_ACTIVE_CLASSNAME,
    SITE_DIRECTIONS,
} from "../constants";

// configure Swiper to use modules
SwiperCore.use([Navigation, EffectFade]);

export default class Portfolio {
    constructor() {
        this.DOM = {};
        this.DOM.portfolioModalEl = getEl('#portfolio-modal');

        this.portfolioSwiper;
        this.portfolioCarouselOpenedIndex;
        this.portfolioCarouselCount;
        this.portfolioIsotope;

        this.init();
    }

    init() {
        this.addListeners();
        this.initPortfolioIsotope();
    }

    addListeners() {        
        document.addEventListener('keydown', this.onEscPortfolioModal.bind(this));
        getEl('.portfolio-modal__main-inner').addEventListener('click', this.onClickPortfolioInner.bind(this));

        window.addEventListener('popstate', this.onWindowPopstate.bind(this));

        queryAll('.portfolio__grid-link').forEach(link => {
            link.addEventListener('click', this.onClickPortfolioLink.bind(this));
        });
    }

    onWindowPopstate (event) {
        if (isPortfolioModalOpen()) {
            event.preventDefault();
            history.pushState(null, null, '#porfolio');
            this.closePortfolioModal();
        }
    }

    initPortfolioIsotope () {
        this.portfolioIsotope = new Isotope('.portfolio__grid', {
            itemSelector: '.portfolio__thumb',
            layoutMode: 'masonry',
            originLeft: !isRtl(),
        });
    
        const portfolioNavLinks = document.querySelectorAll('.navigation--portfolio .navigation__link');
    
        portfolioNavLinks.forEach(link => {
            link.addEventListener('click', event => {
                const navLink = event.currentTarget;
                const filterValue = navLink.getAttribute('data-filter');
    
                this.portfolioIsotope.arrange({ filter: filterValue });
                portfolioNavLinks.forEach(link => {
                    link.classList.remove('navigation__link--active');
                });
                navLink.classList.add('navigation__link--active');
            });
        });        
    }

    onClickPortfolioLink(event) {
        event.preventDefault();
        let index = 0;
    
        if (event.currentTarget !== window) {
            const portfolioLinks = queryAll('.portfolio__grid-link');
            index = Array.from(portfolioLinks).indexOf(event.currentTarget);
        }
    
        this.portfolioCarouselCount = queryAll('.portfolio-item').length;
        this.portfolioCarouselOpenedIndex = index;
        this.openPortfolioModal(index);
    }    

    onEscPortfolioModal(event) {
        if (event.keyCode === KEYCODES.ESC && isPortfolioModalOpen()) {
            event.preventDefault();
            this.triggerClosePortfolioModal();
        }
    }    

    onClickPortfolioInner(event) {
        if (event.target === event.currentTarget) {
            this.triggerClosePortfolioModal();
        }
    }    

    triggerClosePortfolioModal() {
        if (isPortfolioModalOpen()) {
            this.closePortfolioModal();
        }
    }

    openPortfolioModal(index) {
        const that = this;
        const animationOff = isAnimationOff();
    
        anime({
            targets: '#portfolio-modal',
            duration: animationOff ? 100 : 300,
            easing: 'linear',
            opacity: animationOff ? 1 : [0, 1],
            begin: function (anim) {
                bodyScrollable(false);
                that.DOM.portfolioModalEl.classList.add(PORTFOLIO_MODAL_ACTIVE_CLASSNAME);
                that.DOM.portfolioModalEl.inert = false;
            },
            complete: function (anim) {
                that.initPortfolioCarousel(index);
                bodyChildrenInert(true, that.DOM.portfolioModalEl);
                that.focusPortfolioItemTitle(index);
            }
        });
    }    

    closePortfolioModal() {
        const that = this;
        const animationOff = isAnimationOff();
    
        anime({
            targets: '#portfolio-modal',
            easing: 'linear',
            opacity: animationOff ? 0 : [1, 0],
            duration: animationOff ? 1 : 300,
            complete: function (anim) {
                that.DOM.portfolioModalEl.classList.remove(PORTFOLIO_MODAL_ACTIVE_CLASSNAME);
                that.DOM.portfolioModalEl.inert = true;
                queryAll('.portfolio-nav__button--prev, .portfolio-nav__button--next, .portfolio-nav__button--close, .portfolio-item__imgs, .portfolio-item__content').forEach(el => el.style.opacity = 0);
                bodyScrollable(true);
                that.portfolioCarouselNavHandlers('remove');
                that.portfolioSwiper.destroy(true, true);
                that.disablePortfolioNavButton('prev', false);
                that.disablePortfolioNavButton('next', false);
                bodyChildrenInert(false, that.DOM.portfolioModalEl);
                queryAll('.portfolio__grid-link')[that.portfolioCarouselOpenedIndex].focus();
            },
        });
    }

    portfolioCarouselNavHandlers(action) {
        if (action !== 'add' && action !== 'remove') {
            throw new Error("The action paramenter should be only 'add' or 'remove'");
        }
    
        queryAll('.portfolio-nav__button--close').forEach(
            button => button[action + 'EventListener']('click', this.triggerClosePortfolioModal.bind(this)));
    }    

    initPortfolioCarousel(index) {
        const that = this;
        
        this.portfolioSwiper = new Swiper('.portfolio-modal__carousel', {
            effect: isAnimationOff() ? 'fade' : 'slide', 
            fadeEffect: {
                crossFade: isAnimationOff() ? true : false, 
            },
            slidesPerView: 1,
            spaceBetween: 10,
            speed: isAnimationOff() ? 100 : 300,
            allowTouchMove: false,
            initialSlide: index,
            navigation: {
                nextEl: '.portfolio-nav__button--next',
                prevEl: '.portfolio-nav__button--prev',
            },
            on: {
                init: function (swiper) {
                    const activeSlide = swiper.slides[swiper.activeIndex];
    
                    that.managePortfolioItemInert(activeSlide);
                    bodyChildrenInert(true, that.DOM.portfolioModalEl);
                    that.animePortfolioItemContent();
                    that.portfolioCarouselNavHandlers('add');
                },
                slideChangeTransitionStart: function(swiper) {
                    anime({
                        targets: '.portfolio-modal__main-inner',
                        scrollTop: 0,
                        duration: isAnimationOff() ? 10 : 300,
                        easing: 'easeInOutCubic'
                    });
                },
                slideChangeTransitionEnd: function (swiper) {
                    const activeSlide = swiper.slides[swiper.activeIndex];
    
                    that.managePortfolioItemInert(activeSlide);
                    that.managePortfolioNavButtonState(swiper.activeIndex, swiper.slides.length);
                    that.focusPortfolioItemTitle(swiper.activeIndex);
                }
            }
        });
    }    

    managePortfolioItemInert(activeSlide) {
        activeSlide.inert = false;
        setInertToSibligs(true, activeSlide);
    }

    animePortfolioItemContent() {
        const that = this;
        const animationOff = isAnimationOff();
        const opacity0to1 = animationOff ? 1 : [0, 1];
        const offset900 = animationOff ? 0 : 900;
        const transformDirection = SITE_DIRECTIONS[getSiteDir()].transform;
        const tl = anime.timeline({
            duration: animationOff ? 100 : 500,
            delay: animationOff ? 0 : 100,
        });
    
        tl
            .add({
                targets: '.portfolio-item__imgs',
                easing: 'easeOutQuad',
                opacity: opacity0to1,
                translateX: animationOff ? 0 : [(-20 * transformDirection), 0],
            })
            .add({
                targets: '.portfolio-item__content',
                easing: 'easeOutQuad',
                opacity: opacity0to1,
                translateY: animationOff ? 0 : [20, 0],
            }, (animationOff ? 0 : '-=200'))
            .add({
                targets: '.portfolio-nav__button--prev',
                opacity: opacity0to1,
                translateX: animationOff ? 0 : [(-20 * transformDirection), 0],
            }, offset900)
            .add({
                targets: '.portfolio-nav__button--next',
                opacity: opacity0to1,
                translateX: animationOff ? 0 : [(20 * transformDirection), 0],
                complete: function (anim) {
                    that.managePortfolioNavButtonState(that.portfolioCarouselOpenedIndex, that.portfolioCarouselCount);
                }
            }, offset900)
            .add({
                targets: '.portfolio-nav__button--close',
                opacity: opacity0to1
            }, offset900);
    }    

    managePortfolioNavButtonState(portfolioCarouselOpenedIndex, portfolioCarouselCount) {
        if (portfolioCarouselOpenedIndex === 0) {
            this.disablePortfolioNavButton('prev', true);
            this.disablePortfolioNavButton('next', false);
        } else if ((portfolioCarouselOpenedIndex + 1) === portfolioCarouselCount) {
            this.disablePortfolioNavButton('next', true);
            this.disablePortfolioNavButton('prev', false);
        } else {
            this.disablePortfolioNavButton('next', false);
            this.disablePortfolioNavButton('prev', false);
        }
    }    

    focusPortfolioItemTitle(index) {
        queryAll('.portfolio-item__title')[index].focus();
    }    

    disablePortfolioNavButton(direction, disabled) {
        const buttonEl = getEl('.portfolio-nav__button--' + direction);
    
        if (disabled) {
            buttonEl.classList.add('button--disabled');
            buttonEl.setAttribute('disabled', 'disabled');
        } else {
            buttonEl.classList.remove('button--disabled');
            buttonEl.removeAttribute('disabled');
        }
    }    
}