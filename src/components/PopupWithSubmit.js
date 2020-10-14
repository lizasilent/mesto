import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
  }

  setFormSubmitHandler(set) {
    this._handleSubmit = set;
  }


  setEventListeners() {
      super.setEventListeners();
      this._formSelector.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleSubmit();
        });
      }
}