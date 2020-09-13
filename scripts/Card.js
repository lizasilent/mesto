const initialCards = [
    {
      name: "Архыз",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
  
  // Разметка
  const list = document.querySelector(".grid__template");
  const gridElement = list.querySelector(".grid__item");
  
  //Модалки
  const editProfileModal = document.querySelector(".popup_type_edit-profile");
  const addCardsModal = document.querySelector(".popup_type_add-cards");
  const imageModal = document.querySelector(".popup_type_grid-img");
  const popup = document.querySelector(".popup__form");
  
  //Buttons
  const editProfileButton = document.querySelector(".profile__edit-btn");
  const closeEditProfileModalButton = editProfileModal.querySelector(
    ".popup__close-btn"
  );
  const addCardButton = document.querySelector(".profile__add-btn");
  const closeAddCardsModalModalButton = addCardsModal.querySelector(
    ".popup__close-btn"
  );
  const closeImageModalButton = imageModal.querySelector(".popup__close-btn");
  
  //
  const imageModalSrc = imageModal.querySelector(".popup__image");
  const imageModalTitle = imageModal.querySelector(".popup__title");
  
  
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
  
    handleLikeClick() {
      this._element
        .querySelector(".grid__like-btn")
        .classList.toggle("grid__like_active-btn");
    }
  
    handleDeleteClick() {
      this._element
        .querySelector(".grid__delete-btn")
        .closest(".grid__item")
        .remove();
    }
  

    setEventListeners() {

        this._element.querySelector(".grid__image").addEventListener('click', () => {
            this._handleOpenPopup();
          });

        this._element.querySelector(".grid__like-btn").addEventListener('click', () => {
            this.handleLikeClick();
          });

          this._element.querySelector(".grid__delete-btn").addEventListener('click', () => {
            this. handleDeleteClick();
          });

    }
  
    //   openModalWindow() {
    //     imageModalSrc.src = this._image;
    //     imageModalTitle.textContent =  this._title;
    //     imageModal.classList.add("popup_is-open");
    //   }
  
    //   closeModalWindow() {
    //     imageModal.classList.remove("popup_is-open");
    //   }
  }
  
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.link, item.name);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    list.append(cardElement);
  });
  