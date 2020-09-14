
  class Card {
    // в конструкторе будут динамические данные,
    // для каждого экземпляра свои
    constructor(image, title) {
      // text и image — приватные поля,
      // они нужны только внутри класса
      this._image = image;
      this._title = title;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(".template-card") //найдём template-элемент с классом card-template
        .content // извлечём его содержимое
        .querySelector(".grid__item") //в содержимом найдём элемент с классом card
        .cloneNode(true); //клонируем его,
  
      // вернём DOM-элемент карточки
      return cardElement;
    }
  
    generateCard() {
      // Запишем разметку в приватное поле _element.
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
      this.setEventListeners();
  
      // Добавим данные
  
      const cardImage = this._element.querySelector(".grid__image");
      const cardTitle = this._element.querySelector(".grid__text");
  
      cardImage.src = this._image;
      cardTitle.textContent = this._title;
  
      // Вернём элемент наружу
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

    // handleOpenPopup(){
    //     imageModalSrc.src = this._image;
    //     imageModalTitle.textContent =  this._title;
    //     imageModal.classList.add("popup_is-open");
    // }

    // handleClosePopup(){
    //     imageModalSrc.src = "";
    //     imageModalTitle.textContent =  "";
    //     imageModal.classList.remove("popup_is-open");
    //   }
  

    setEventListeners() {

        this._element.querySelector(".grid__like-btn").addEventListener('click', () => {
            this._handleLikeClick();
          });

        this._element.querySelector(".grid__delete-btn").addEventListener('click', () => {
            this._handleDeleteClick();
          });

      //   this._element.querySelector(".grid__image").addEventListener('click', () => {
      //  this.handleOpenPopup();
      //   });

      //   imageModal.querySelector(".popup__close-btn").addEventListener('click', () => {
      //       this.handleClosePopup();
      //        });
    }
  
  }
  
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.link, item.name);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    list.append(cardElement);
  });
  