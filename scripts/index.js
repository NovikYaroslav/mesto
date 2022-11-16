import { initialCards, elements } from "./data.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Сard.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";

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
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const createdCard = new Card(cardData, ".cardTeamplate", handleCardClick);
      const initialCardElement = createdCard.generateCard();
      defaultCardList.addItem(initialCardElement);
    },
  },
  cardContainer
);


const cardPopupClass = new PopupWithForm(cardPopup, addNewCard)
const userPopupClass = new PopupWithForm(userPopup, savePopup)

//
// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   popup.addEventListener("click", setMouseAction);
//   document.addEventListener("keydown", escapePopup);
// }

// function setMouseAction(event) {
//   if (event.target.classList.contains("popup_opened")) {
//     const currentPopup = event.target;
//     closePopup(currentPopup);
//   }
// }

// function escapePopup(event) {
//   if (event.key == "Escape") {
//     console.log();
//     const targetPopup = document.querySelector(".popup_opened");
//     closePopup(targetPopup);
//   }
// }

function prepareUserPopup() {
  userPopupClass.open();
  userPopupClass.setEventListeners();
  // openPopup(userPopup);
  nameInput.value = userName.textContent;
  aboutInput.value = aboutUser.textContent;
  profileFormValidator.resetValidation();
}

function prepareCardPopup() {
cardPopupClass.open()
cardPopupClass.setEventListeners()
  // openPopup(cardPopup);
  cardTitleInput.value = "";
  cardPhotoInput.value = "";
  cardFormValidator.resetValidation();
}

// function closePopup(openedPopup) {
//   openedPopup.removeEventListener("click", setMouseAction);
//   document.removeEventListener("keydown", escapePopup);
//   openedPopup.classList.remove("popup_opened");
// }

function savePopup(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  aboutUser.textContent = aboutInput.value;
  userPopupClass.close()
}

function handleCardClick(link, name) {
  const imagePopup = new PopupWithImage(photoPopup);
  imagePopup.open(link, name);
  imagePopup.setEventListeners();
}

function addNewCard(evt) {
  evt.preventDefault();
  const additionalCard = {
    name: cardTitleInput.value,
    link: cardPhotoInput.value,
  };
  const newCardList = new Section(
    {
      items: additionalCard,
      renderer: (additionalCard) => {
        const createdCard = new Card(
          additionalCard,
          ".cardTeamplate",
          handleCardClick
        );
        const newCardElement = createdCard.generateCard();
        newCardList.addItem(newCardElement);
      },
    },
    cardContainer
  );
  newCardList.renderItems();
  // newCardList.renderNewItem();
  cardPopupClass.close()
  // closePopup(cardPopup);
}

// closeButtons.forEach(function (closeButton) {
//   const popup = closeButton.closest(".popup");
//   closeButton.addEventListener("click", function () {
//     closePopup(popup);
//   });
// });

userPopupOpenButton.addEventListener("click", prepareUserPopup);
cardPopupOpenButton.addEventListener("click", prepareCardPopup);
// profileFormElement.addEventListener("submit", savePopup);
// cardFormElement.addEventListener("submit", addNewCard);

defaultCardList.renderItems(true);
