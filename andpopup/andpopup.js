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

            form.addEventListener('submit', () => {
                this.pending();
                this.pendingLoad();
                this.sendForm(options); //transfer this options to sendForm()
            });
        }

        /* end send form for constructor */
    }

    hidePopup() {
        this.wrapper.classList.remove('andpopup_show');
        this.overlay.classList.remove('andpopup-overlay_show');
        this.pendingRemove();
    }

    showPopup() {
        this.wrapper.classList.add('andpopup_show');
        this.overlay.classList.add('andpopup-overlay_show');
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

        return overlay;
    }

    pendingLoad() {   //created block with image for pending block
        let popup = this.popup.querySelector('.andpopup-load-overlay'),
            loaded = document.createElement('div');

        loaded.className = 'andpopup-load-overlay__image';
        loaded.style.backgroundImage = 'url(https://i.pinimg.com/originals/76/77/ed/7677edd5a44b10130b8824ca020ba60b.gif)';
        popup.append(loaded);

        return loaded;
    }

    pendingLoadEnd() {
        let loaded = this.popup.querySelector('.andpopup-load-overlay__image');
        loaded.remove();
    }

    check() {
        let popup = this.popup.querySelector('.andpopup-load-overlay'),
            checkImage = document.createElement('div'),
            checkArray = [];

        checkImage.className = 'andpopup-load-overlay__check-image';
        checkImage.style.backgroundImage = 'url(https://thumbs.gfycat.com/ShyCautiousAfricanpiedkingfisher-max-1mb.gif)';
        popup.append(checkImage);

        let checkText = document.createElement('span');

        checkText.className = 'andpopup-load-overlay__check-text';
        checkText.innerText = 'Application sent';
        popup.append(checkText);

        checkArray.push(checkImage, checkText);

        return checkArray;
    }

    pendingRemove() {
        let popup = this.popup.querySelector('.andpopup-load-overlay');
        if (popup) {
            setTimeout(function () {
                popup.remove();
            }, 500);
        }
    }

    sendForm(options) { // got options of constructor
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
        }).then(response => {
            console.log(response); //TODO: Do not forget to remove
            this.pendingLoadEnd();
            this.check();
        }).catch(error => {
            console.log(`Error to send form: ${error}`);
        });
    }

    /* end send form */
}