import "./pages/index.css";
import { settings } from "./components/initials.js";
import Api from "./components/Api.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithSubmit from "./components/PopupWithSubmit";
import FormValidator from "./components/FormValidator.js";

const editProfileButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const list = document.querySelector(".grid__template");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector('.profile__avatar');



const api = new Api({
baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
headers: {
  authorization: "39a08681-995b-4f4f-93e1-9a39f0f490cc",
  "Content-Type": "application/json"
}
});

// function submitLoading(isLoading, button) {
//   if (isLoading) {
//     button.textContent = "Сохранение..";
//   } else {
//     button.textContent = "Сохранить";
//   }
// }

const cardList = new Section(
  {
    data: initialCards,
    renderer: addCard
    },
  ".template-card"
);



let initialCards = [];
let userId = "";
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((result) => {
    const [items, userInfo] = result;
    userId = userInfo._id;
    cardList.renderItems(items);
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
});


  const addCard = (data) => {
    const card = new Card(data, userId, ".template-card", handleCardClick, handleDelete, deleteLike, putLike);
    list.prepend(card.generateCard());

      function handleCardClick(name, link) {
        imagePopup.open(name, link);
      }
    
      function handleDelete(data) {
        submitPopup.setFormSubmitHandler(() => {
          api
            .deleteCard(data._id)
            .then(() => {
              card.removeCard();
              submitPopup.close();
            })
            .catch((err) => {
              console.log(`${err}`);
            });
        })
        submitPopup.open();
      }

      function deleteLike(cardId){
        api
        .deleteLike(cardId)
        .then(() => {
          console.log("Сняли лайк");
        })
        .catch((err) => {
          console.log(err);
        });
      }
    
      function putLike(cardId){
        api
          .putlike(cardId)
          .then(() => {
            console.log("Поставили лайк");
          })
          .catch((err) => {
            console.log(err);
          });
      }
  };
  

  // const addCard = (item) => {
  //   const card = new Card({
  //     data: item,
  //     cardSelector: ".template-card",
  //     handleCardClick: (name, link) => {
  //       imagePopup.open(name, link);
  //     }
  //   }).generateCard();
  //   list.prepend(card);
  // };
  
  

// const avatarPopup = new PopupWithForm({
//     popupSelector: ".popup_type_edit-avatar",
//     formSubmitCallback: (data) => {
//       addCard({
//         name: data["image-title"],
//         link: data["image-src"],
//       });
//       addCardPopup.close();
//     },
// });


// Попап подтверждения удаления
const submitPopup = new PopupWithSubmit({
  popupSelector: ".popup_type_submit"
});
submitPopup.setEventListeners();



// Попап-картинка

const imagePopup = new PopupWithImage(".popup_type_grid-img");
imagePopup.setEventListeners();

//Активация класса-акцептора информации

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  avatarSelector:".profile__avatar"
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
