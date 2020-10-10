import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    }   


setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", () => {
      this._formSubmitCallback(this._getInputValues());
    });
  }

}
