import { initialCards } from "./data.js";
import { prepareValidaton } from "./validation.js";
import {restoreButtonState} from "./validation.js";
import {Card} from "./card.js"

const userPopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
// const popupPhoto = document.querySelector(".popup__photo");
// const popupPhotoCapture = document.querySelector(".popup__photo-capture");
// const cardText = document.querySelector(".element__text");
const userPopup = document.querySelector(".popup_for_user");
const cardPopup = document.querySelector(".popup_for_card");
// const photoPopup = document.querySelector(".popup_for_photo");
const closeButtons = document.querySelectorAll(".popup__close");
const profileFormElement = userPopup.querySelector('[name="user-profile"]');
const cardFormElement = document.querySelector('[name="user-card"]');
const nameInput = profileFormElement.querySelector(
  ".popup-fieldset__input_value_name"
);
const aboutInput = profileFormElement.querySelector(
  ".popup-fieldset__input_value_about"
);
const cardTitleInput = document.querySelector(
  ".popup-fieldset__input_value_card-title"
);
const cardPhotoInput = document.querySelector(
  ".popup-fieldset__input_value_card-photo"
);
const userName = document.querySelector(".profile__name");
const aboutUser = document.querySelector(".profile__discription");
// const cardTeamplate = document.querySelector(".cardTeamplate");
const cardContainer = document.querySelector(".elements");
// const popups = document.querySelectorAll(".popup");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", setMouseAction);
  document.addEventListener("keydown", escapePopup);
}

function setMouseAction(event) {
  if (event.target.classList.contains("popup_opened")) {
    const currentPopup = event.target;
    closePopup(currentPopup);
  }
}

function escapePopup(event) {
  if (event.key == "Escape") {
    console.log()
    const targetPopup = document.querySelector(".popup_opened");
    closePopup(targetPopup);
  }
}

function preparePopup(event) {
  if (event.target === userPopupOpenButton) {
    prepareUserPopup();
  }
  if (event.target === cardPopupOpenButton) {
    prepareCardPopup();
  }
}

function prepareUserPopup() {
  prepareValidaton(userPopup);
  openPopup(userPopup);
  nameInput.value = userName.textContent;
  aboutInput.value = aboutUser.textContent;
}

function prepareCardPopup() {
  prepareValidaton(cardPopup);
  openPopup(cardPopup);
  cardTitleInput.value = "";
  cardPhotoInput.value = "";
}

function closePopup(openedPopup) {
  openedPopup.removeEventListener("click", setMouseAction);
  document.removeEventListener("keydown", escapePopup);
  openedPopup.classList.remove("popup_opened");
}

function savePopup(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  aboutUser.textContent = aboutInput.value;
  closePopup(userPopup);
  restoreButtonState(userPopup);
}

// function createCard(item) {
//   const initialCard = cardTeamplate.content
//     .querySelector(".element")
//     .cloneNode(true);
//   const initialCardTitle = initialCard.querySelector(".element__text");
//   const initialCardPhoto = initialCard.querySelector(".element__photo");
//   const deleteButton = initialCard.querySelector(".element__delete-button");
//   const likeButton = initialCard.querySelector(".element__like-button");
//   initialCardPhoto.addEventListener(
//     "click",
//     preparePhotoPopup(initialCardPhoto, initialCardTitle)
//   );
//   deleteButton.addEventListener("click", deleteCard);
//   likeButton.addEventListener("click", likeCard);
//   initialCardTitle.textContent = item.name;
//   initialCardPhoto.src = item.link;
//   initialCardPhoto.alt = item.name;
//   return initialCard;
// }

// function preparePhotoPopup(initialCardPhoto, initialCardTitle) {
//   initialCardPhoto.addEventListener("click", function () {
//     popupPhoto.src = initialCardPhoto.src;
//     popupPhoto.alt = initialCardPhoto.alt;
//     popupPhotoCapture.textContent = initialCardTitle.textContent;
//     openPopup(photoPopup);
//   });
// }

// function loadCards() {
//   initialCards.forEach(function (card) {
//     const initialCard = createCard(card);
//     cardContainer.prepend(initialCard);
//   });
// }

function addNewCard(evt) {
  evt.preventDefault();
  const additionalCard = {
    name: cardTitleInput.value,
    link: cardPhotoInput.value,
  };
  const newCard = new Card(additionalCard, ".cardTeamplate", openPopup);
  const newCardElement = newCard.generateCard();
  cardContainer.prepend(newCardElement);
  closePopup(cardPopup);
  restoreButtonState(cardPopup);
}

// function likeCard(event) {
//   event.target.classList.toggle("element__like-button_active");
// }

// function deleteCard(event) {
//   const element = event.target.closest(".element");
//   element.remove();
// }

closeButtons.forEach(function (closeButton) {
  const popup = closeButton.closest(".popup");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
});

initialCards.forEach((item) => {
  const card = new Card(item, ".cardTeamplate", openPopup);
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);
});



userPopupOpenButton.addEventListener("click", preparePopup);
cardPopupOpenButton.addEventListener("click", preparePopup);
profileFormElement.addEventListener("submit", savePopup);
cardFormElement.addEventListener("submit", addNewCard);

// loadCards();
