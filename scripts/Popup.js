export default class Popup {
        constructor (popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        }

        open() {
            this._popupSelector.classList.add("popup_is-open");
            document.addEventListener("keydown", this._handleEscClose);
        };

        close() {
            this._popupSelector.classList.remove("popup_is-open");
            document.addEventListener("keydown", this._handleEscClose);
        };
        
        _handleEscClose = (evt) => {
            if (evt.key === "Escape") {
            this.close();
        }
            };

        setEventListeners() {
            this._popupSelector.addEventListener('click', (event) => {
                if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-bth')) {
                    this.close();
                }
            });
        }
}