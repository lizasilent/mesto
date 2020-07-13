let openModalButton = document.querySelector(".profile__edit-btn");
let modal = document.querySelector(".popup");
let closeModalButton = document.querySelector(".popup__close-btn");
let popup = modal.querySelector(".popup__container");
let userName = document.querySelector(".profile__name");
let userInformation = document.querySelector(".profile__description");
let inputName = modal.querySelector(".popup__text_name");
let inputDescription = modal.querySelector(".popup__text_description");

function openPopup () {
  modal.classList.add("popup_is-open");
  inputName.value = userName.textContent;
  inputDescription.value = userInformation.textContent;
}

function closePopup () {
  modal.classList.remove("popup_is-open");
  }

function saveInfo () {
  event.preventDefault();
  userName.textContent = inputName.value;
  userInformation.textContent = inputDescription.value;
  closePopup ();
  }

openModalButton.addEventListener("click", openPopup);
closeModalButton.addEventListener('click', closePopup);
popup.addEventListener("submit", saveInfo);


