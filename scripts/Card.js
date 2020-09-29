export default class Card {
  constructor({data, cardSelector, handleCardClick}) {
    this._image = data.link;
    this._title = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    this._cardImage = this._element.querySelector(".grid__image");
    this._cardTitle = this._element.querySelector(".grid__text");
    this._cardLikeBtn = this._element.querySelector(".grid__like-btn");
    this._cardDeleteBtn = this._element.querySelector(".grid__delete-btn");

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    return this._element;
  }

  _handleLikeClick() {
    this._cardLikeBtn.classList.toggle("grid__like_active-btn");
  }

  _handleDeleteClick() {
    this._cardDeleteBtn.closest(".grid__item")
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

