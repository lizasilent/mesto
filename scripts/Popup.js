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
            this._popupSelector.querySelector(".popup__close-btn").addEventListener("click", () => {
                this.close();
            });
    }
}