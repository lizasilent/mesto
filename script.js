//Modals 
let editProfileModal = document.querySelector(".popup_type_edit-profile");
let addCardsModal = document.querySelector(".popup_type_add-cards");
let imageModal = document.querySelector(".popup_type_grid-img");
let popup = document.querySelector(".popup__container");

//Data etc
let userName = document.querySelector(".profile__name");
let userInformation = document.querySelector(".profile__description");
let inputName = editProfileModal.querySelector(".popup__text_name");
let inputDescription = editProfileModal.querySelector(".popup__text_description");
let inputPlace = addCardsModal.querySelector(".popup__text_place");
let inputImageSource = addCardsModal.querySelector(".popup__source");
let list = document.querySelector(".grid__template");
let imageModalSrc = imageModal.querySelector(".popup__image");
let imageModalTitle = imageModal.querySelector(".popup__title");
let closeImageModalButton = imageModal.querySelector(".popup__close-btn");


//Buttons
let editProfileButton = document.querySelector(".profile__edit-btn");
let closeEditProfileModalButton = editProfileModal.querySelector(".popup__close-btn");
let addCardButton = document.querySelector('.profile__add-btn');
let closeAddCardsModalModalButton = addCardsModal.querySelector(".popup__close-btn");


function openPopup () {
  editProfileModal.classList.toggle("popup_is-open");
  inputName.value = userName.textContent;
  inputDescription.value = userInformation.textContent;
}

function openPopup2 () {
  addCardsModal.classList.toggle("popup_is-open");
}

function saveInfo (event) {
  event.preventDefault();
  userName.textContent = inputName.value;
  userInformation.textContent = inputDescription.value;
  openPopup();
  }

function addCardSubmitHandler (event) {
    event.preventDefault();
    renderCard({name: inputPlace.value, link:inputImageSource.value});
    openPopup2();
  }
  

editProfileButton.addEventListener("click", ()  => { openPopup(editProfileModal)
});

closeEditProfileModalButton.addEventListener("click", () =>  { openPopup(editProfileModal)
});

addCardButton.addEventListener("click", () =>  { openPopup2(addCardsModal)
});

closeAddCardsModalModalButton.addEventListener("click", () =>  { openPopup2(addCardsModal)
});


popup.addEventListener("submit", saveInfo);
addCardsModal.addEventListener("submit", addCardSubmitHandler);


const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector(".template-card").content.querySelector(".grid__item");


function handleLikeClick(gridLikeButton) {
  gridLikeButton.classList.toggle("grid__like_active-btn");
  
}

function handleDeleteClick() {
  event.target.closest(".grid__item").remove();
}

function handleImageOpen(src, textcontent) {
  imageModal.classList.toggle("popup_is-open");
  imageModalSrc.src = src;
  imageModalTitle.textContent = textcontent; 
}


function createCard(data) {
  const gridElement = cardTemplate.cloneNode(true);
  const gridText = gridElement.querySelector(".grid__text");
  const gridImage = gridElement.querySelector(".grid__image");
  const gridLikeButton = gridElement.querySelector(".grid__like-btn");
  const gridDeleteButton = gridElement.querySelector(".grid__delete-btn");


  gridText.textContent = data.name;
  gridImage.src = data.link;


  gridLikeButton.addEventListener("click", () => { handleLikeClick(gridLikeButton)});
  gridDeleteButton.addEventListener("click", () => { handleDeleteClick(gridDeleteButton)});


  gridImage.addEventListener("click", () => { handleImageOpen(data.link, data.name)});
  closeImageModalButton.addEventListener("click", handleImageOpen);

  return gridElement;
}


function renderCard(data) {
  list.prepend(createCard(data)); 
}

initialCards.forEach((data) => {
  renderCard(data);
})


// Картинка 





