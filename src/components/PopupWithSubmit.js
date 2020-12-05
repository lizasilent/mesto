import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
      this._submitCallback = null;
  }

  setCallback(callback) {
    this._submitCallback = callback;
}


  setEventListeners() {
      super.setEventListeners();
      this._submitButton.addEventListener("click", (event) => {
        event.preventDefault();  
        this._submitCallback();
        })
      }
}
