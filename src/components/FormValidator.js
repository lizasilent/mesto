class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this.form = form;
  }

  //функции показа ошибки
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //функция скрытия ошибки
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  //функция валидации объекта
  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  //валидация
  _hasInvalidInput = (inputs) => {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //функция изменения кнопки при вводе правильных данных
  _checkButtonState = (inputs, buttonElement) => {
    if (this._hasInvalidInput(inputs)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  enableValidation() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //установка слушателей
  _setEventListeners = () => {
    const inputs = Array.from(this.form.querySelectorAll(this._inputSelector));
    const buttonElement = this.form.querySelector(this._submitButtonSelector);

    this._checkButtonState(
      inputs,
      buttonElement,
      this._submitButtonSelector,
      this._inactiveButtonClass
    );
    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this.form, inputElement);
        this._checkButtonState(inputs, buttonElement);
      });
    });
  };
}

export default FormValidator;
