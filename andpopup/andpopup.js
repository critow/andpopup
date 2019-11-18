class Andpopup {
    constructor(selector, options) {
        this.button = document.querySelectorAll(selector);
        this.popup = document.querySelector(`${options.popupSelector}`);

        this.wrapper = this.wrap('div', 'andpopup-wrapper');
        this.close = this.create('div', 'andpopup__close');
        this.overlay = this.createOverlay();

        if (this.button) {
            this.button.forEach(button => {
                button.addEventListener('click', () => {
                    this.showPopup();
                });
            });

            this.wrapper.addEventListener('click', event => {
                if (!event.target.matches(`${options.popupSelector}, ${options.popupSelector} *`)) {
                    this.hidePopup();
                }
            });

            this.close.addEventListener('click', () => {
                this.hidePopup();
            });
        }

        /* send form for constructor */

        if (options.sendForm != null) {
            let form = document.querySelector(`${options.sendForm.formSelector}`);

            this.action(options); //transfer this options to action()

            form.addEventListener('submit', () => {
                this.pending();
                this.pendingLoad(options); //transfer this options to pendingLoad()
                this.sendForm(options); //transfer this options to sendForm()
            });
        }

        /* end send form for constructor */
    }

    hidePopup() {
        this.wrapper.classList.remove('andpopup_show');
        this.overlay.classList.remove('andpopup-overlay_show');
        this.pendingRemove();
        document.body.style.overflow = null;
    }

    showPopup() {
        this.wrapper.classList.add('andpopup_show');
        this.overlay.classList.add('andpopup-overlay_show');
        document.body.style.overflow = 'hidden';
    }

    create(tag, tagClass) { //created element before popup window
        let element = document.createElement(`${tag}`);
        element.className = `${tagClass}`;
        this.popup.prepend(element);

        return element;
    }

    wrap(tag, tagClass) {   //wrapper container for popup window
        this.popup.insertAdjacentHTML('beforebegin', `<${tag} class="${tagClass}">`);
        let wrapper = this.popup.previousSibling;
        wrapper.append(this.popup);

        return wrapper;
    }

    createOverlay() {
        if (document.querySelector('.andpopup-overlay') == null) this.wrapper.insertAdjacentHTML('beforebegin', '<div class="andpopup-overlay">');

        return document.querySelector('.andpopup-overlay');
    }

    /* send form */

    pending() {
        let overlay = document.createElement('div');
        overlay.className = 'andpopup-load-overlay';
        this.popup.append(overlay);
    }

    pendingLoad(options) {   //created block with image for pending block
        let popup = this.popup.querySelector('.andpopup-load-overlay'),
            loaded = document.createElement('div');

        loaded.className = 'andpopup-load-overlay__image';
        popup.append(loaded);

        if (options) {
            let formObject = options.sendForm;

            for (let key in formObject) {
                if (key === 'loadImage') {
                    loaded.style.backgroundImage = formObject[key];
                }
            }
        }

    }

    pendingLoadEnd() {
        let loaded = this.popup.querySelector('.andpopup-load-overlay__image');
        loaded.remove();
    }

    success(options) { // get options of sendForm()/fetch
        let popup = this.popup.querySelector('.andpopup-load-overlay'),
            successImage = document.createElement('div');

        successImage.className = 'andpopup-load-overlay__success-image';
        popup.append(successImage);

        let successText = document.createElement('span');

        successText.className = 'andpopup-load-overlay__success-text';
        successText.innerText = 'Application sent';
        popup.append(successText);

        if (options) {
            let formObject = options.sendForm;

            for (let key in formObject) {
                if (key === 'successImage') {
                    successImage.style.backgroundImage = formObject[key];
                }

                if (key === 'successText') {
                    successText.innerText = formObject[key];
                }
            }
        }

    }

    error(options) { // get options of sendForm()/fetch
        let popup = this.popup.querySelector('.andpopup-load-overlay'),
            errorImage = document.createElement('div');

        errorImage.className = 'andpopup-load-overlay__error-image';
        popup.append(errorImage);

        let errorText = document.createElement('span');

        errorText.className = 'andpopup-load-overlay__error-text';
        errorText.innerText = 'Error, try again';
        popup.append(errorText);

        if (options) {
            let formObject = options.sendForm;

            for (let key in formObject) {
                if (key === 'errorImage') {
                    errorImage.style.backgroundImage = formObject[key];
                }

                if (key === 'errorText') {
                    errorText.innerText = formObject[key];
                }
            }
        }

    }

    pendingRemove() {
        let popup = this.popup.querySelector('.andpopup-load-overlay');
        if (popup) {
            setTimeout(function () {
                popup.remove();
            }, 500);
        }
    }

    action(options) { //get options of constructor
        let formObject = options.sendForm, formSelector;

        for (let key in formObject) {
            if (key === 'formSelector') {
                formSelector = document.querySelector(`${formObject[key]}`);
                if (formSelector.getAttribute('action') === null) {
                    formSelector.setAttribute('action', 'javascript:void(0);')
                }
            }
        }
    }

    sendForm(options) { // get options of constructor
        let formObject = options.sendForm, filePath, formSelector;

        for (let key in formObject) {
            if (key === 'filePath') {
                filePath = formObject[key];
            }
            if (key === 'formSelector') {
                formSelector = document.querySelector(`${formObject[key]}`);
            }
        }

        fetch(filePath, {
            method: 'POST',
            body: new FormData(formSelector)
        }).then(() => {
            this.pendingLoadEnd();
            this.success(options); //transfer constructor -> this -> success()
        }).catch(error => {
            console.log(`Error to send form: ${error}`);
            this.pendingLoadEnd();
            this.error(options); //transfer constructor -> this -> error()
        });
    }

    /* end send form */
}