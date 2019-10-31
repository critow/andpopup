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
    }

    hidePopup() {
        this.wrapper.classList.remove('andpopup_show');
        this.overlay.classList.remove('andpopup-overlay_show');
    }

    showPopup() {
        this.wrapper.classList.add('andpopup_show');
        this.overlay.classList.add('andpopup-overlay_show');
    }

    create(tag, tagClass) {
        let element = document.createElement(`${tag}`);
        element.className = `${tagClass}`;
        this.popup.prepend(element);
        return element;
    }

    wrap(tag, tagClass) {
        this.popup.insertAdjacentHTML('beforebegin', `<${tag} class="${tagClass}">`);
        let wrapper = document.querySelector(`.${tagClass}`);
        wrapper.append(this.popup);
        return wrapper;
    }

    createOverlay() {
        if (document.querySelector('.andpopup-overlay') == null) this.wrapper.insertAdjacentHTML('beforebegin', '<div class="andpopup-overlay">');
        return document.querySelector('.andpopup-overlay');
    }
}