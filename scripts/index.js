import { initialCards, elements } from "./data.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Сard.js";

const userPopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
const userPopup = document.querySelector(".popup_for_user");
const cardPopup = document.querySelector(".popup_for_card");
const photoPopup = document.querySelector(".popup_for_photo");
const closeButtons = document.querySelectorAll(".popup__close");
const popupPhoto = photoPopup.querySelector(".popup__photo");
const popupPhotoCapture = photoPopup.querySelector(".popup__photo-capture");
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
const cardContainer = document.querySelector(".elements");

const profileFormValidator = new FormValidator(elements, profileFormElement);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(elements, cardFormElement);
cardFormValidator.enableValidation();

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
    console.log();
    const targetPopup = document.querySelector(".popup_opened");
    closePopup(targetPopup);
  }
}

function prepareUserPopup() {
  openPopup(userPopup);
  nameInput.value = userName.textContent;
  aboutInput.value = aboutUser.textContent;
  profileFormValidator.resetValidation();
}

function prepareCardPopup() {
  openPopup(cardPopup);
  cardTitleInput.value = "";
  cardPhotoInput.value = "";
  cardFormValidator.resetValidation();
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
}

function openCard(link, name) {
  popupPhoto.src = link;
  popupPhoto.alt = name;
  popupPhotoCapture.textContent = name;
  openPopup(photoPopup);
}

function createCard(cardData) {
  const createdCard = new Card(cardData, ".cardTeamplate", openCard);
  const createdCardElement = createdCard.generateCard();
  return createdCardElement;
}

function addNewCard(evt) {
  evt.preventDefault();
  const additionalCard = {
    name: cardTitleInput.value,
    link: cardPhotoInput.value,
  };
  const newCard = createCard(additionalCard);
  cardContainer.prepend(newCard);
  closePopup(cardPopup);
}

closeButtons.forEach(function (closeButton) {
  const popup = closeButton.closest(".popup");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
});

initialCards.forEach((item) => {
  const defaultCardElement = createCard(item);
  cardContainer.prepend(defaultCardElement);
});

userPopupOpenButton.addEventListener("click", prepareUserPopup);
cardPopupOpenButton.addEventListener("click", prepareCardPopup);
profileFormElement.addEventListener("submit", savePopup);
cardFormElement.addEventListener("submit", addNewCard);
