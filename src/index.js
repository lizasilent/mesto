import "./pages/index.css";
import { initialCards, settings } from "./components/initials.js";
// import Api from "./components/Api.js"
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";
// import PopupWithSubmit from "./components/PopupWithSubmit";


const editProfileButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const list = document.querySelector(".grid__template");

// const api = new Api({
// baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
// headers: {
//   authorization: '9a08681-995b-4f4f-93e1-9a39f0f490cc',
//   "content-type": "application/json"
// }

// })


const addCard = (item) => {
  const card = new Card({
    data: item,
    cardSelector: ".template-card",
    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    }
  }).generateCard();
  list.prepend(card);
};

const cardList = new Section(
  {
    data: initialCards,
    renderer: (data) => {
      addCard(data);
    },
  },
  ".template-card"
);

cardList.renderItems();

// Попап-картинка

const imagePopup = new PopupWithImage(".popup_type_grid-img");
imagePopup.setEventListeners();


// // Попап подтверждения удаления
// const submitPopup = new PopupWithSubmit({
//   popupSelector: ".popup_type_submit"
// });
// submitPopup.setEventListeners();



//Активация класса-акцептора информации

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
});

//Попап-редактор инфы

const editProfilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  formSubmitCallback: (data) => {
    userInfo.setUserInfo(data);
    editProfilePopup.close();
  },
  setFormInputs: (formElement) => {
    formElement.name.value = userInfo.getUserInfo().name;
    formElement.description.value = userInfo.getUserInfo().description;
  },
});

editProfilePopup.setEventListeners();
editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  editFormValidator.enableValidation();
});

// Попап для добавления картинки
const addCardPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-cards",
  formSubmitCallback: (data) => {
    addCard({
      name: data["image-title"],
      link: data["image-src"],
    });
    addCardPopup.close();
  },
});

addCardPopup.setEventListeners();
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.enableValidation();
});


// Классы валидации форм

const addPopupForm = document
  .querySelector(".popup_type_add-cards")
  .querySelector(".popup__form");
const addCardFormValidator = new FormValidator(settings, addPopupForm);
addCardFormValidator.enableValidation();

const editPopupForm = document
  .querySelector(".popup_type_edit-profile")
  .querySelector(".popup__form");
const editFormValidator = new FormValidator(settings, editPopupForm);
editFormValidator.enableValidation();





// //Тесты попапов

// const popupsubmit = document.querySelector(".popup_type_edit-avatar");
// const testbutn = document.querySelector('.profile__avatar');

// function open(popup) {
//   popup.classList.add("popup_is-open");
// }


// testbutn.addEventListener("click", open(popupsubmit));
