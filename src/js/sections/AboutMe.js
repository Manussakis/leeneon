import { queryAll } from '../helpers';

export default class AboutMe {
    constructor() {
        this.DOM = {};
        this.DOM.skillBars = queryAll('.skill-bar');
        
        this.init();
    }

    init() {
        this.DOM.skillBars.forEach(bar => {
            const skillValueEl = bar.querySelector('.skill-bar__value');
            const amountBarEl = bar.querySelector('[data-skill-bar-amount]');
            const skillAmount = amountBarEl.getAttribute('data-skill-bar-amount') + '%';
        
            skillValueEl.textContent = skillAmount;
            amountBarEl.style.width = skillAmount;
        });
    }
}
