export default class Card {
  constructor({data, cardSelector, handleCardClick, liked, owned, handleDelCard, handleLikeCard }) {
    this._image = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.owned = owned;
    this._liked = liked;
    this.handleDelCard = handleDelCard;
    this.handleLikeCard = handleLikeCard;
  }


     getCardId() {
         return this._cardId
   }
    
    getCardLiked() {
           return this._liked
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
    this._cardLikeCounter = this._element.querySelector(".grid__like-counter");
    this._cardLikeCounter.textContent = this._likes.length;
    this._cardLikeBtn.addEventListener('click', this._cardLiked)
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    if (!this.owned) {
      this._cardDeleteBtn.style.display = "none";
  }

    if (this._liked) {
      this._cardLikeBtn.classList.add("grid__like_active-btn");
  }
    return this._element;
  }

  _cardLiked = () => {
    this.handleLikeCard(this)
 }

likeCounter = (arr, liked) => {
this._liked = liked
this._toggleCardLiked()
this._likes = arr;
this._cardLikeCounter.textContent = this._likes.length;
}


_toggleCardLiked = () => {
  if (this._liked) {
    this._cardLikeBtn.classList.add("grid__like_active-btn");
  } else {
    this._cardLikeBtn.classList.remove("grid__like_active-btn");
  }
}

  delCard = () => {
    this._element.remove();
}


  _setEventListeners() {
    this._element
      .querySelector(".grid__like-btn")
      .addEventListener("click", () => {
        this._toggleCardLiked();
      });


    this._element
      .querySelector(".grid__delete-btn")
      .addEventListener("click", () => {
        this.handleDelCard(this);
      });

    this._element
      .querySelector(".grid__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._title, this._image);
      });
  }
}


  

  