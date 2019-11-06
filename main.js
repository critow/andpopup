window.addEventListener('DOMContentLoaded', () => {
    let modal = new Andpopup('.open-popup', {
        popupSelector: '.popup'
    });

    let sendModal = new Andpopup('.open-submit-popup', {
        popupSelector: '.submit-popup',
        sendForm: {
            handler: './obr.php',
            formSelector: '#submit-form'
        }
    });

    let modal3 = new Andpopup('.open-modal-3', {
        popupSelector: '.modal-3',
        sendForm: {
            handler: './obr.php',
            formSelector: '#submit-form-3'
        }
    });
});