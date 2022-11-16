import { initialCards, elements } from "./data.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Сard.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const userPopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
const profileFormElement = document.querySelector('[name="user-profile"]');
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
  ".elements"
);

const cardPopupClass = new PopupWithForm(".popup_for_card", addNewCard);
const userPopupClass = new PopupWithForm(".popup_for_user", savePopup);
const userInfoClass = new UserInfo({ name: userName, about: aboutUser });

function prepareUserPopup() {
  userPopupClass.open();
  userPopupClass.setEventListeners();
  nameInput.value = userName.textContent;
  aboutInput.value = aboutUser.textContent;
  profileFormValidator.resetValidation();
}

function prepareCardPopup() {
  cardPopupClass.open();
  cardPopupClass.setEventListeners();
  cardFormValidator.resetValidation();
}

function savePopup(evt) {
  evt.preventDefault();
  userInfoClass.setUserInfo(nameInput, aboutInput);
  userPopupClass.close();
}

function handleCardClick(link, name) {
  const imagePopup = new PopupWithImage(".popup_for_photo");
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
    ".elements"
  );
  newCardList.renderItems();
  // newCardList.renderNewItem();
  cardPopupClass.close();
}

userPopupOpenButton.addEventListener("click", prepareUserPopup);
cardPopupOpenButton.addEventListener("click", prepareCardPopup);

defaultCardList.renderItems(true);
