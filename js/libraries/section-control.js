// SectionControl.js v0.0.1
// Gabriel Manussakis
// MIT licence

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.SectionControl = factory());
}(this, (function () { 

  'use strict';

  function extend(a, b) {
    for (let property in b) {
      if (b.hasOwnProperty(property))
        a[property] = b[property];
    }
    return a;
  }

  // https://davidwalsh.name/javascript-debounce-function
  function debounce(func, wait, immediate) {
    let timeout;

    return function () {
      let context = this, args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function getViewport() {
    let docElem = window.document.documentElement,
      clientW = docElem.clientWidth,
      innerW = window.innerWidth,
      clientH = docElem.clientHeight,
      innerH = window.innerHeight;

    return {
      width: clientW < innerW ? innerW : clientW,
      height: clientH < innerH ? innerH : clientH
    };
  }

  function SectionControl(siteMenu, options) {
    this.menuItems = siteMenu.querySelectorAll('a[href*="#"]');
    this.sections = [];

    this.options = extend({}, this.defaults);
    extend(this.options, options);

    this.init();
  }

  SectionControl.prototype.defaults = {
    axis: 'y',
    className: 'active'
  };

  SectionControl.prototype.init = function () {
    this.getSections();
    this.addListeners();
  };

  SectionControl.prototype.getSections = function () {
    let _this = this;

    Array.from(this.menuItems).forEach(function (item) {
      const sectionId = item.hash.substring(1);
      const section = document.getElementById(sectionId);

      if (!section) {
        throw new Error('Can\'t find ' + sectionId + ' section. Menu items and sections length should match.');
      }

      _this.sections.push(section);
    });
  };

  SectionControl.prototype.addListeners = function () {
    let _this = this;

    Array.from(this.menuItems).forEach(function (item) {
      item.addEventListener('click', function (ev) {
        _this.activeMenu(ev.currentTarget.getAttribute('href'));
      });
    });

    const debounce_itemsFocused = debounce(function () {
      _this.syncSectionToMenu();
    }, 150);

    ['load', 'scroll', 'resize', 'orientationchange'].forEach(function (event) {
      window.addEventListener(event, debounce_itemsFocused);
    });
  };

  SectionControl.prototype.getFocusedSectionIndex = function () {
    let half, edgeA, edgeB;

    if (this.options.axis === 'y') {
      half = getViewport().height / 2;
      edgeA = 'top';
      edgeB = 'bottom';
    } else if (this.options.axis === 'x') {
      half = getViewport().width / 2;
      edgeA = 'left';
      edgeB = 'right';
    }

    for (let i = 0, l = this.sections.length; i < l; i++) {
      const rect = this.sections[i].getBoundingClientRect();

      if (rect[edgeA] < half && rect[edgeB] >= half) {
        return i;
      }
    }
  };

  SectionControl.prototype.syncSectionToMenu = function () {
    const focusedSectionIndex = this.getFocusedSectionIndex();

    if (!isNaN(focusedSectionIndex)) {
      this.activeMenu('#' + this.sections[focusedSectionIndex].id);
    } else {
      this.deactivateAllMenuItems();
    }
  };

  SectionControl.prototype.activeMenu = function (hrefCompare) {
    let arr = [];
    const _this = this;

    for (let i = 0; i < this.menuItems.length; i++) {
      if (this.menuItems[i].getAttribute("href") === hrefCompare) {
        arr.push(this.menuItems[i]);
      }
    }

    this.deactivateAllMenuItems();

    arr.forEach(function (item) {
      item.classList.add(_this.options.className);
    })
  };

  SectionControl.prototype.deactivateAllMenuItems = function () {
    const _this = this;

    this.menuItems.forEach(function (item) {
      item.classList.remove(_this.options.className);
    });
  };

  return SectionControl;

})));
