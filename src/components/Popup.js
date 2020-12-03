export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popup.querySelector('.popup__close-btn');
    this._submitButton = this._popup.querySelector('.popup__submit-btn');
  }

  open() {
    this._popup.classList.add("popup_is-open");
    document.body.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_is-open");
    document.body.removeEventListener("keydown", this._handleEscClose);
  }

  renderLoading(isLoading) {
    if (isLoading) {
        this._submitButton.textContent = 'Сохранение...'
    } else {
        this._submitButton.textContent = 'Сохранить'
    }
}

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
