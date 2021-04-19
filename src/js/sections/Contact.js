import { 
    getEl,
    queryAll,
    appendEl,
    insertAfter
} from '../helpers';

export default class Contact {
    constructor() {
        this.DOM = {};
        this.DOM.contactForm = getEl('#contact-form');
        this.DOM.contactFormFieldEls = queryAll('#contact-form .form__field');
        this.DOM.contactFormSubmitButton = getEl('#contact-form__submit-button');

        this.contactFormInvalidsFieldsList = [];
        this.contactFormData = {
            name: {
                validate: function (val) {
                    return val.trim().length > 0;
                },
                isValid: false,
                label: 'Name',
                errorMessage: 'Name is a require field.',
            },
            email: {
                validate: function (val) {
                    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
                    return emailReg.test(val);
                },
                isValid: false,
                label: 'Email',
                errorMessage: 'Insert a valid e-mail.'
            },
            message: {
                validate: function (val) {
                    return val.trim().length > 0;
                },
                isValid: false,
                label: 'Message',
                errorMessage: 'Message is a require field.',
            },
        }

        this.init();
    }

    init() {
        this.addListeners();        
    }

    addListeners() {
        this.DOM.contactForm.addEventListener('submit', this.onSubmitContactForm.bind(this));
    }

    onSubmitContactForm(event) {
        event.preventDefault();
        this.clearAllFormErros();
        this.contactFormInvalidsFieldsList = [];
    
        this.DOM.contactFormFieldEls.forEach(input => {
            const fieldName = input.getAttribute('name');
    
            this.contactFormData[fieldName].isValid = this.contactFormData[fieldName].validate(input.value.trim());
    
            if (!this.contactFormData[fieldName].isValid) {
    
                this.showContactFormError(input, this.contactFormData[fieldName].errorMessage);
    
                this.contactFormInvalidsFieldsList.push(this.contactFormData[fieldName].label);
            }
        });
    
        if (this.isContactFormValid()) {
            [
                'form__message--visible',
                'form__message--error',
                'form__message--success'
            ].forEach(className => getEl('#form-live-region').classList.remove(className));
            this.sendContactEmail();
        }        
    }

    clearAllFormErros() {
        const liveRegion = getEl('#form-live-region');
        const formErrorMessage = queryAll('.form__error-message');
        const formErrorIcons = queryAll('.form__error-icon');
    
        [
            'form__message--visible',
            'form__message--error',
            'form__message--success'
        ].forEach(className => liveRegion.classList.remove(className));
    
        liveRegion.innerHTML = '';
    
        queryAll('.form__field').forEach(field => {
            field.classList.remove('form__field--error');
            field.setAttribute("aria-invalid", null);
            field.setAttribute("aria-describedby", null);
        });
    
        if (formErrorMessage.length) {
            formErrorMessage.forEach(errorEl => errorEl.remove());
        }
    
        if (formErrorIcons.length) {
            formErrorIcons.forEach(errorIcon => errorIcon.remove());
        }
    }

    showContactFormError(inputEl, errorMessage) {
        const formLiveRegionEl = getEl('#form-live-region');
        const errorEl = `<span id="${inputEl.id}-error" class="form__error-message">${errorMessage}</span>`;
        const errorIcon = this.getErrorIcon();
    
        inputEl.classList.add('form__field--error');
        inputEl.setAttribute("aria-invalid", "true");
        insertAfter(inputEl, errorEl);
        insertAfter(inputEl, errorIcon);
        inputEl.setAttribute("aria-describedby", inputEl.id + "-error");
    
        if (formLiveRegionEl.innerHTML.length == 0) {
            appendEl(formLiveRegionEl, `<p><strong>There were some issues with the form submission:</strong></p>`);
            formLiveRegionEl.classList.remove('form__message--success');
            [
                'form__message--visible',
                'form__message--error',
            ].forEach(className => formLiveRegionEl.classList.add(className));
        }
    
        appendEl(formLiveRegionEl, `<a href="#${inputEl.id}">${errorMessage}</a><br>`);
    }   
    
    getErrorIcon() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svgEl = document.createElementNS(svgNS, "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        svgEl.setAttribute('height', '24');
        svgEl.setAttribute('width', '24');
        svgEl.setAttribute('viewBox', '0 0 24 24');
        svgEl.classList.add('form__error-icon');

        path.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z');

        svgEl.appendChild(path);

        return svgEl;
    }

    isContactFormValid() {
        return this.contactFormInvalidsFieldsList.length === 0;
    }

    // This function only simulate an AJAX request receiving a fake data as an answer.
    // You should edit it in order to make the contact form working considering your backend setup.
    sendContactEmail() {
        this.DOM.contactFormSubmitButton.classList.add('button--spinner');

        setTimeout(() => {
            const fakeData = {
                status: "success",
                message: "Message has been sent :)",
            };
            const formLiveRegionEl = getEl('#form-live-region');

            [
                'form__message--visible',
                'form__message--success'
            ].forEach(className => formLiveRegionEl.classList.add(className));

            formLiveRegionEl.innerHTML = "<strong>" + fakeData.message + "</strong>";

            this.DOM.contactFormFieldEls.forEach(field => field.value = '');

            this.DOM.contactFormSubmitButton.classList.remove('button--spinner');
        }, 2000);
    }
}