const imageModal = document.querySelector(".popup_type_grid-img");
const imageModalSrc = imageModal.querySelector(".popup__image");
const imageModalTitle = imageModal.querySelector(".popup__title");


  class Card {
    constructor(data, cardSelector) {
      this._image = data.link;
      this._title = data.name;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector) 
        .content 
        .querySelector(".grid__item")
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

      _handleOpenPopup(){
        
        imageModalSrc.src = this._image;
        imageModalTitle.textContent =  this._title;
        imageModal.classList.add("popup_is-open");
    }

      _handleClosePopup(){
        imageModalSrc.src = "";
        imageModalTitle.textContent =  "";
        imageModal.classList.remove("popup_is-open");
      }



    _setEventListeners() {

        this._element.querySelector(".grid__like-btn").addEventListener('click', () => {
            this._handleLikeClick();
          });

        this._element.querySelector(".grid__delete-btn").addEventListener('click', () => {
            this._handleDeleteClick();
          });

          this._element.querySelector(".grid__image").addEventListener('click', () => {
             this._handleOpenPopup();
              });

            imageModal.querySelector(".popup__close-btn").addEventListener('click', () => {
            this._handleClosePopup();
                   });

    }
  
  }
  
 
  


  export default Card;