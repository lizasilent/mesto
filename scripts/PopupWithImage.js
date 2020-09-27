class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    }

    open() {
        this._popupSelector.classList.add("popup_is-open");
        this._popupSelector.querySelector(".grid__image")
        .addEventListener("click", () => {
          this._createPopup({ name: this._title, link: this._image });
        });
    };


}