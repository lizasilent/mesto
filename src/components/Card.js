export default class Card {
  constructor({data, userId, cardSelector, handleCardClick, handleDeleteCard, deleteLike, addLike}) {
    this.data = data;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._deleteLike = deleteLike;
    this._addLike = addLike;
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
    this._countLikes = this._element.querySelector(".grid__like-counter");
    this._countLikes.textContent = this._likes.length;

    this._cardImage.src = this.data.link;
    this._cardImage.alt = this.data.name;
    this._cardTitle.textContent = this.data.name;

    return this._element;
  }

  _handleLikeClick() {
    this._cardLikeBtn.classList.toggle("grid__like_active-btn");
  }

  //метод удаляет карточки с фото
  removeCard(){
    this._element.remove();
    this._element = null;
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
        this.removeCard();
      });

    this._element
      .querySelector(".grid__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._title, this._image);
      });
  }
}

