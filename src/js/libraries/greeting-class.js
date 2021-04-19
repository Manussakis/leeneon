// Add a class when element enter in viewport
(function (global, factory) {

    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('greetingClass/greetingClass', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory();
    } else {
        // Browser globals
        global.GreetingClass = factory();
    }

}(this, function () {

    'use strict';

    function extend(a, b) {
        for (var prop in b) {
            if (b.hasOwnProperty(prop))
                a[prop] = b[prop];
        }
        return a;
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function nodeToArray(obj) {
        return Array.prototype.slice.call(obj);
    }

    function getViewport() {
        var docElem = window.document.documentElement,
            clientW = docElem.clientWidth,
            innerW = window.innerWidth,
            clientH = docElem.clientHeight,
            innerH = window.innerHeight;

        return {
            width: clientW < innerW ? innerW : clientW,
            height: clientH < innerH ? innerH : clientH
        };
    }

    function stringToArray(str) {
        return str.trim().split(/\s+/g);
    }

    var events = {
        on: function (elem, events, fnc) {
            stringToArray(events).forEach(function (evType) {
                elem.addEventListener(evType, fnc, false);
            });
        },

        off: function (elem, events, fnc) {
            stringToArray(events).forEach(function (evType) {
                elem.removeEventListener(evType, fnc, false);
            });
        }
    };

    function inViewport(element, axis, value) {
        var rect = element.getBoundingClientRect(),
            viewportSize, edgeA, edgeB, amount;

        if (axis === 'y') {
            viewportSize = getViewport().height;
            edgeA = 'top';
            edgeB = 'bottom';
            amount = element.offsetHeight * (value || 0);
        } else if (axis === 'x') {
            viewportSize = getViewport().width;
            edgeA = 'left';
            edgeB = 'right';
            amount = element.offsetWidth * (value || 0);
        }
        return (rect[edgeA] <= (viewportSize - amount) && rect[edgeB] >= amount);
    }

    function checkList(num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr[i] = false;
        }
        return arr;
    }

    function GreetingClass(options) {
        this.options = extend({}, this.defaults());
        extend(this.options, options);

        this.elements = nodeToArray(document.querySelectorAll('[data-gc]'));
        this.classes = this.dataList('data-gc');
        this.amounts = this.amontList();
        this.checkList = checkList(this.elements.length);
        this.handle = debounce(this.mainHandle.bind(this), this.options.delay);

        this.create();
    }

    GreetingClass.prototype.defaults = function () {
        return {
            axis: 'y',
            amount: 0,
            delay: 0,
            freq: 'once'
        };
    };

    GreetingClass.prototype.create = function () {
        this.addListeners();
    };

    GreetingClass.prototype.amontList = function () {
        var arr = [];
        var fnc = function (el) {
            var am = el.getAttribute('data-gc-amount');
            if (!am) arr.push(this.options.amount);
            else arr.push(parseFloat(am));
        }.bind(this);

        this.elements.forEach(fnc);

        return arr;
    };

    GreetingClass.prototype.dataList = function (dataName) {
        var arr = [];
        var fnc = function (el) {
            var val = el.getAttribute(dataName);
            arr.push(val);
        };

        this.elements.forEach(fnc);

        return arr;
    };

    GreetingClass.prototype.stateList = function () {
        var fnc = function (el, i) {
            return inViewport(el, this.options.axis, this.amounts[i]);
        }.bind(this);

        var arr = this.elements.map(fnc);

        return arr;
    };

    GreetingClass.prototype.addClassOnce = function () {
        var arr = [];
        var fnc = function (el) {
            var val = (el.getAttribute('data-gc-freq') || this.options.freq);
            arr.push(val);
        }.bind(this);

        this.elements.forEach(fnc);

        return arr;
    };


    GreetingClass.prototype.inView = function () {
        var fnc = function (el, i) {
            return inViewport(el, this.options.axis, Math.min(0, this.amounts[i]));
        }.bind(this);

        var arr = this.elements.map(fnc);

        return arr;
    };

    GreetingClass.prototype.mainHandle = function () {
        var fnc = function (el, i) {
            var className = this.classes[i];

            // Verifica se className já foi adicionada
            if (this.addClassOnce()[i] === 'once' && this.checkList[i]) {
                return;
            }

            if (this.addClassOnce()[i] === 'ever') {
                // Verifica se pode retirar a class do elemento
                if (!this.stateList()[i] && !this.inView()[i]) {
                    if (el.classList.contains(className)) {
                        el.classList.remove(className);
                        this.checkList[i] = false;
                        
                        return;
                    }
                }
            }

            if (!el.classList.contains(className) && this.stateList()[i]) {
                el.classList.add(className);
                if (this.addClassOnce()[i] !== 'ever') {
                    this.checkList[i] = true;
                }
                
                return;
            }

        }.bind(this);

        this.elements.forEach(fnc);

        if (this.checkList.indexOf(false) === -1)
            events.off(window, 'scroll resize orientationchange', this.handle);
    };

    GreetingClass.prototype.addListeners = function () {
        events.on(window, 'load scroll resize orientationchange', this.handle);
    };

    GreetingClass.prototype.destroy = function () {
        events.off(window, 'load scroll resize orientationchange', this.handle);
        this.elements = [];
        this.classes = [];
        this.amounts = [];
        this.checkList = [];
        this.handle = function () { };
    };

    return GreetingClass;

}));
