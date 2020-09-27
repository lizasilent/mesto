import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._title = this._popup.querySelector('.popup__title');
    }

    open(data) {
        super.open();
        this._image.src = data.link;
        this._title.textContent = data.name;
        this._image.alt = data.name;
    };
}
