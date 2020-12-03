import "./pages/index.css";
import { settings } from "./components/initials.js";
import Api from "./components/Api.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PicturePopup.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithSubmit from "./components/PopupWithSubmit";
import FormValidator from "./components/FormValidator.js";

const editProfileButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const changeAvatarButton = document.querySelector('.profile__avatar');
const list = document.querySelector(".grid__template");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


let section
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  avatarSelector: ".profile__avatar"}
);

const imagePopup = new PopupWithImage(".popup_type_grid-img");

const api = new Api({
baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
headers: {
  authorization: "1b98b7f8-c29f-4d66-ae18-3d1d376d7ed7",
  "Content-Type": "application/json"
}
});


// Карточка и все что внутри неё

const addCard = (result) => {
  const card = new Card({
      data: result,
      cardSelector: ".template-card",
      handleCardClick,
      liked: result.likes.some((user) => user._id === userInfo.getUserId()),
      owned: result.owner._id === userInfo.getUserId(),
      handleDelCard,
      handleLikeCard
  }).generateCard();
  list.prepend(card);
}


const handleCardClick = (name, link) => {
  imagePopup.open(name, link)
}

const handleDelCard = (card) => {
  delPopup.setCallback(() => {
      delSubmitHandler(card)
  })
  delPopup.open()
}

const handleLikeCard = (card) => {
  const handleLikeResponse = (res) => {
    card.likeCounter(res.likes, res.likes.some((user) => user._id === userInfo.getUserId()))
}
if (!card.getCardLiked()) {
    api.takeCardLike(card.getCardId()).then(handleLikeResponse).catch((err) => {
        console.log(err);
    })
} else {
    api.removeCardLke(card.getCardId()).then(handleLikeResponse).catch((err) => {
        console.log(err);
    })
}
}

// Попап с удалением карточки

const delSubmitHandler = (card) => {
  api.delCard(card.getCardId()).then(() => card.delCard()).catch((err) => {
      console.log(err);
  })
}
  

//Попап-редактор инфы

const profileFormSubmitHandler = (values) => {
  editProfilePopup.renderLoading(true)
  api.patchUserData(values).then((result) => {
    editProfilePopup.close()
      userInfo.setUserInfo(result.name, result.about)
      editProfilePopup.renderLoading(false)
  }).catch((err) => {
      console.log("Не загрузить описание профиля: " + err);
  })
}


//Попап-редактор аватара

const avatarSubmitHandler = (values) => {
  editAvatarPopup.renderLoading(true)
  api.patchUserAvatar(values).then((res) => {
    editAvatarPopup.close()
      userInfo.setUserAvatar(res.avatar)
      editAvatarPopup.renderLoading(false)
  }).catch((err) => {
      console.log("Не загрузить аватар: " + err);
  })
}


//Попап для добавления карточки

const addCardSubmitHandler = (data) => {
  addCardPopup.renderLoading(true)
  api.addUserCard(({
    name: data["image-title"],
    link: data["image-src"]
  })).then(result => {
      section.addItem(addCard(result))
      addCardPopup.renderLoading(false)
      addCardPopup.close()
  }).catch((err) => {
      console.log("Не добавить карточку: " + err);
  })
}


// Загрузка карточек с сервера

const loadCards = () => {
  api.getInitialCards().then((result) => {
      section = new Section({
          data: result,
          renderer: (data) => {
              addCard(data);
          }
        },
         ".template-card");

        section.renderItems();

  }).catch((err) => {
    console.log("Не загрузились карточки: " + err);
      
  });
}

// Загрузка инфы пользователя с сервера

const loadUser = () => {
  return api.getUserData().then((result) => {
      userInfo.setUserInfo(result.name, result.about)
      userInfo.setUserAvatar(result.avatar)
      userInfo.setUserId(result._id)
  }).catch((err) => {
      console.log("Не загрузился юзер: " + err);
  });
  
}

//Открытие попапов

const openEditPopup = () => {
  const userData = userInfo.getUserInfo()
  profileName.value = userData.name;
  profileDescription.value = userData.about;
  editProfilePopup.open();
}

const openAddPopup = () => {
  addCardPopup.open();
}

const openAvatarPopup = () => {
  editAvatarPopup.open();
}


// Создание экземпляров классов попапов и слушатели событий для них

const editProfilePopup = new PopupWithForm( profileFormSubmitHandler, ".popup_type_edit-profile");
const editAvatarPopup = new PopupWithForm( avatarSubmitHandler, ".popup_type_edit-avatar");
const addCardPopup = new PopupWithForm( addCardSubmitHandler, ".popup_type_add-cards");
const delPopup = new PopupWithSubmit(".popup_type_submit");


editProfilePopup.setEventListeners();
editAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
delPopup.setEventListeners();
imagePopup.setEventListeners();

editProfileButton.addEventListener("click", openEditPopup);
addCardButton.addEventListener("click", openAddPopup);
changeAvatarButton.addEventListener("click", openAvatarPopup);




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

const editAvatarForm = document
  .querySelector(".popup_type_edit-avatar")
  .querySelector(".popup__form");
const editAvatarValidator = new FormValidator(settings, editAvatarForm);
editAvatarValidator.enableValidation();


loadUser().then(loadCards).catch((err) => {
  console.log(err);
  });