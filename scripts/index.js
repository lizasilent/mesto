import {initialCards, settings} from "./initials.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";


const editProfileButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const list = document.querySelector(".grid__template");



const addCard = (item) => {
  const card = new Card({
      data: item,
      cardSelector: ".template-card",
      handleCardClick: (name, link) => {
        imagePopup.open(name, link)
      }
  }).generateCard();
  list.prepend(card);
}

const cardList = new Section({
  data: initialCards,
  renderer: (data) => {
      addCard(data);
  }

}, ".template-card")

cardList.renderItems();


const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description"
  }
);


const imagePopup = new PopupWithImage(".popup_type_grid-img");
imagePopup.setEventListeners();


const editProfilePopup = new PopupWithForm ({
  popupSelector: ".popup_type_edit-profile",
  formSubmitHandler: (data) => {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
},
  setFormInputs: formElement => {
  formElement.name.value = userInfo.getUserInfo().name;
  formElement.job.value = userInfo.getUserInfo().job;
}
});

editProfilePopup.setEventListeners();
editProfileButton.addEventListener('click', () => {
  editProfilePopup.open();
  editFormValidator.checkFormState();
});

const addCardPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-cards",
  formSubmitHandler: (data) => {
      addCard({
          name: data[`place`],
          link: data[`image`]
      });
      addCardPopup.close();
  }
})

addCardPopup.setEventListeners();
addCardButton.addEventListener('click', () => {
  addCardPopup.open()
  addCardFormValidator.checkFormState()
})

const addPopupForm = document.querySelector(".popup_type_add-cards").querySelector(".popup__form");
const addCardFormValidator = new FormValidator(settings, addPopupForm);
addCardFormValidator.enableValidation();

const editPopupForm = document.querySelector(".popup_type_edit-profile").querySelector(".popup__form");
const editFormValidator = new FormValidator(settings, editPopupForm);
editFormValidator.enableValidation();


