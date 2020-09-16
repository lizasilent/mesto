class Card {
  constructor(data, cardSelector, createPopup) {
    this._image = data.link;
    this._title = data.name;
    this._cardSelector = cardSelector;
    this._createPopup = createPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".grid__image");
    const cardTitle = this._element.querySelector(".grid__text");

    cardImage.src = this._image;
    cardTitle.textContent = this._title;

    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector(".grid__like-btn")
      .classList.toggle("grid__like_active-btn");
  }

  _handleDeleteClick() {
    this._element
      .querySelector(".grid__delete-btn")
      .closest(".grid__item")
      .remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid__like-btn")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".grid__delete-btn")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".grid__image")
      .addEventListener("click", () => {
        this._createPopup({ name: this._title, link: this._image });
      });
  }
}

export default Card;
