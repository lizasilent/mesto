export default class Popup {
        constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        }

        open() {
            this._popup.classList.add("popup_is-open");
            document.body.addEventListener("keydown", this._handleEscClose);
        };

        close() {
            this._popup.classList.remove("popup_is-open");
            document.body.addEventListener("keydown", this._handleEscClose);
        };

        _handleEscClose = (evt) => {
            if (evt.key === "Escape") {
            this.close();
        }
            };

        setEventListeners() {

            this._popup.addEventListener('click', (event) => {
                if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-bth')) {
                    this.close();
                }
            });
        }
}

