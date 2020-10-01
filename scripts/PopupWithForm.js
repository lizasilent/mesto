import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor ({popupSelector, formSubmitCallback, setFormInputs }) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
        this._setFormInputs = setFormInputs;
        this._form = this._popup.querySelector(".popup__form");

    }

    _getInputValues(){
        this._inputs = this._popup.querySelector(".popup__input");
        this._formValues = {};
        this._inputs.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }


    close() {
        super.close();
        this._form.reset();
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", () => {
            evt.preventDefault();
            this._userName.textContent =  this._inputName.value;
            this._userInformation.textContent =  this._inputDescription.value;
            this.close();
        })
    }
}
