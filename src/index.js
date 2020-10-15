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
const changeAvatarButton = document.querySelector('.profile__avatar');
const list = document.querySelector(".grid__template");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector('.profile__avatar');


let section
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  avatarSelector:".profile__avatar"
});

const imagePopup = new PopupWithImage(".popup_type_grid-img");

const api = new Api({
baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
headers: {
  authorization: "39a08681-995b-4f4f-93e1-9a39f0f490cc",
  "Content-Type": "application/json"
}
});

const addCard = (result) => {
  const card = new Card({
    data: result,
    liked: result.likes.some((user) => user._id === userInfo.getUserId()),
    owned: result.owner._id === userInfo.getUserId(),
    handleCardClick,
    handleLikeClick, 
    handleDelClick},
      ".template-card");
  card.generateCard(open);

}

    const handleCardClick = (result) => {
      imagePopup.open(result);
    }
  
    const handleLikeClick = (card) => {
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

  const handleDelClick = (card) => {
    delPopup.setCallback(() => {
        delSubmitHandler(card)
    })
    delPopup.open()
}

// const profileFormSubmitHandler = (values) => {
//   editProfilePopup.renderLoading(true)
//   api.patchUserData(values).then((result) => {
//     editProfilePopup.close()
//       userInfo.setUserInfo(result.name, result.about)
//       editProfilePopup.renderLoading(false)
//   }).catch((err) => {
//       console.log(err);
//   })
// }

// const avatarSubmitHandler = (values) => {
//   avatarPopup.renderLoading(true)
//   api.patchUserAvatar(values).then((res) => {
//       avatarPopup.close()
//       userInfo.setUserAvatar(res.avatar)
//       avatarPopup.renderLoading(false)
//   }).catch((err) => {
//       console.log(err);
//   })
// }

// const profileAddSubmitHandler = (values) => {
//   photoPopup.renderLoading(true)
//   api.addUserCard(values).then(res => {
//       section.addItem(addNewCard(res))
//       photoPopup.renderLoading(false)
//       photoPopup.close()
//   }).catch((err) => {
//       console.log(err);
//   })

// }


// function submitLoading(isLoading, button) {
//   if (isLoading) {
//     button.textContent = "Сохранение..";
//   } else {
//     button.textContent = "Сохранить";
//   }
// }


const loadCards = () => {
  api.getInitialCards().then((result) => {
      section = new Section({items: result, renderer: addCard}, ".template-card");
      section.renderItems();
  }).catch((err) => {
      console.log(err);
  });

}

  const loadUser = () => {
    return api.getUserData().then((result) => {
        userInfo.setUserInfo(result.name, result.about)
        userInfo.setUserAvatar(result.avatar)
        userInfo.setUserId(result._id)
    }).catch((err) => {
        console.log(err);
    });
}

  

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
  
  

const openEditPopup = () => {
  const userData = userInfo.getUserInfo()
  profileName.value = userData.name;
  profileDescription.value = userData.description;
  editProfilePopup.open()
}

const openAddPopup = () => {
  imagePopup.open()
}

const openAvatarPopup = () => {
  editAvatarPopup.open()
}


const editProfilePopup = new PopupWithForm({popupSelector: ".popup_type_edit-profile"});
const editAvatarPopup = new PopupWithForm({popupSelector: ".popup_type_edit-avatar"});
const addCardPopup = new PopupWithForm({popupSelector: ".popup_type_add-cards"});
const delPopup = new PopupWithSubmit({popupSelector:'.popup_type_submit'});


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
})