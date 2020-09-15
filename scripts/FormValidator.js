class FormValidator {
  constructor(settings, form) {
    this.form = form;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  //показать ошибку
  _showInputError(inputElement, errorMessage){
    this._errorElement = this.form.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  //скрыть ошибку
  _hideInputError(inputElement) {
    this._errorElement = this.form.querySelector( `#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  };

  //проверка валидности
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputs){
    return inputs.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  //изменить состояние кнопки

  _checkButtonState(inputs, buttonElement){
    if (this._hasInvalidInput(inputs)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //добавить слушатели

  _setEventListeners() {
    const inputs = Array.from(this.form.querySelectorAll(this._inputSelector));
    const buttonElement = this.form.querySelector(this._submitButtonSelector);
    this._checkButtonState(inputs, buttonElement);

    inputs.forEach(inputElement => {
      inputElement.addEventListener("input", function() {
        this._checkInputValidity(inputElement);
        this._checkButtonState(inputs, buttonElement);
      });
    });
  };

  // валидация

  enableValidation() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this.form);
  }
}


export default FormValidator;