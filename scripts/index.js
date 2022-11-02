import { initialCards, elements } from "./data.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";

const userPopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
const userPopup = document.querySelector(".popup_for_user");
const cardPopup = document.querySelector(".popup_for_card");
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
const cardContainer = document.querySelector(".elements");

// function restoreButtonState(popup) {
//   console.log("restoreButtonState")
//   const saveButton = popup.querySelector(CardFormValidator.this.submitButtons);
//   saveButton.classList.add(this.submitButtonsInactive);
//   saveButton.setAttribute("disabled", true);
// }

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

function preparePopup(event) {
  if (event.target === userPopupOpenButton) {
    prepareUserPopup();
  }
  if (event.target === cardPopupOpenButton) {
    prepareCardPopup();
  }
}

function prepareUserPopup() {
  const profileFormValidator = new FormValidator(
    elements,
    profileFormElement,
  );
  profileFormValidator.enableValidation();
  openPopup(userPopup);
  nameInput.value = userName.textContent;
  aboutInput.value = aboutUser.textContent;
}

function prepareCardPopup() {
  const CardFormValidator = new FormValidator(elements, cardFormElement);
  CardFormValidator.enableValidation();
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
  // restoreButtonState(userPopup);
}

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
  // restoreButtonState(cardPopup);
}

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
