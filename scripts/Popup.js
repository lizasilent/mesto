export default class Popup {
        constructor (popupSelector) {
        this._popupSelector = popupSelector;
        }

        open() {
            this._popupSelector.classList.add("popup_is-open");
        };

        close() {
            this._popupSelector.classList.remove("popup_is-open");
        };
        
        _handleEscClose(evt) {
            if (evt.key === "Escape") {
            this.close();
    }
        };

        setEventListeners() {
            this._popupCloseBtn = this._popupSelector.querySelector(".popup__close-btn");
            this._popupCloseBtn.addEventListener("click", () => {
                this.close();
            });
    }
}