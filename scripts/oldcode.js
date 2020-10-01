// //Открываем и закрываем модалки
// function openModalWindow(modalWindow) {
//   modalWindow.classList.add("popup_is-open");
//   document.addEventListener("keydown", closeModalByEsc);
// }

// function closeModalWindow(modalWindow) {
//   modalWindow.classList.remove("popup_is-open");
//   document.removeEventListener("keydown", closeModalByEsc);
// }

// function closeModalByEsc(evt) {
//   const popupIsOpen = document.querySelector(".popup_is-open");
//   if (evt.key === "Escape") {
//     closeModalWindow(popupIsOpen);
//   }
// }

// function closeModalByOverlay(evt) {
//   if (!evt.target.closest(".popup__form")) {
//     closeModalWindow(evt.target.closest(".popup"));
//   }
// }


// editProfileModal.addEventListener("click", closeModalByOverlay);
// addCardsModal.addEventListener("click", closeModalByOverlay);
// imageModal.addEventListener("click", closeModalByOverlay);

//Сохраняем введенную информацию

// function saveInfo(event) {
//   event.preventDefault();
//   userName.textContent = inputName.value;
//   userInformation.textContent = inputDescription.value;
//   closeModalWindow(editProfileModal);
// }

// Создаем карточки

// function createNewCard(data) {
//   const card = new Card(data, ".template-card", createImageModal);
//   const cardElement = card.generateCard();
//   list.prepend(cardElement);
// }

// function addCardSubmitHandler(event) {
//   event.preventDefault();
//   createNewCard({ name: inputPlace.value, link: inputImageSource.value });
//   closeModalWindow(addCardsModal);
//   addCardsForm.reset();
// }

// initialCards.forEach((data) => {
//   createNewCard(data);
// });


// Тыкаем на кнопки для модалки edit
// editProfileButton.addEventListener("click", () => {
//   openModalWindow(editProfileModal);
//   inputName.value = userName.textContent;
//   inputDescription.value = userInformation.textContent;
// });

// closeEditProfileModalButton.addEventListener("click", () => {
//   closeModalWindow(editProfileModal);
// });

// // Тыкаем на кнопки для модалки addcard
// addCardButton.addEventListener("click", () => {
//   openModalWindow(addCardsModal);
// });
// closeAddCardsModalModalButton.addEventListener("click", () => {
//   closeModalWindow(addCardsModal);
// });

// popup.addEventListener("submit", saveInfo);
// addCardsModal.addEventListener("submit", addCardSubmitHandler);



// Создание попапа с картинкой

// function createImageModal(data) {
//   openModalWindow(imageModal);
//   imageModalSrc.src = data.link;
//   imageModalTitle.textContent = data.name;
//   imageModalSrc.alt = data.name;
// }

// closeImageModalButton.addEventListener("click", () => {
//   closeModalWindow(imageModal);
// });


// // Классы валидации
// const addInfoValidator = new FormValidator(settings, editProfileModal);
// addInfoValidator.enableValidation();
// const addCardValidator = new FormValidator(settings, addCardsModal);
// addCardValidator.enableValidation();


