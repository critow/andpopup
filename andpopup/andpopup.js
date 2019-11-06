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

        this.pendingFlag = true;

        if (options.sendForm != null) {
            let form = document.querySelector(`${options.sendForm.formSelector}`);

            form.addEventListener('submit', () => {
                if (this.pendingFlag === true) {
                    this.pending();
                    this.pendingLoad();
                }
            });
        }

        /* end send form for constructor */
    }

    hidePopup() {
        this.wrapper.classList.remove('andpopup_show');
        this.overlay.classList.remove('andpopup-overlay_show');
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

    sendForm(options) {
        let handler = options.sendForm.handler,
            formSelector = options.sendForm.formSelector;

        fetch(handler, {
            method: 'post',
            body: new FormData(formSelector)
        }).then(response => {

        }).catch(error => {
            console.log(`Error to send form: ${error}`);
        });
    }

    /* end send form */
}