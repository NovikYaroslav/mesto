import { elements, apiconfig } from "./data.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Сard.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupForConfirmation } from "./PopupForConfirmation.js";
import { UserInfo } from "./UserInfo.js";
import "../pages/index.css";
import Api from "./API.js";

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

const profileFormValidator = new FormValidator(elements, profileFormElement);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(elements, cardFormElement);
cardFormValidator.enableValidation();

const cardList = new Section(
  {
    renderer: (cardData) => {
      const createdCard = new Card(
        cardData,
        ".serverCardTeamplate",
        handleCardClick
      );
      const initialCardElement = createdCard.generateCard();
      cardList.addItem(initialCardElement);
    },
  },
  ".elements"
);

const yandexApi = new Api(apiconfig);

yandexApi
  .getCards()
  .then((uploadedCards) => {
    console.log("загрузился");
    console.log(uploadedCards);
    cardList.renderItems(uploadedCards);
  })
  .catch((error) => console.log(error));

const cardPopup = new PopupWithForm(".popup_for_card", addNewCard);
cardPopup.setEventListeners();
const userPopup = new PopupWithForm(".popup_for_user", savePopup);
userPopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__discription",
});

function prepareUserPopup() {
  userPopup.open();
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  aboutInput.value = userInfoData.about;
  profileFormValidator.resetValidation();
}

function prepareCardPopup() {
  cardPopup.open();
  cardFormValidator.resetValidation();
}

function savePopup(evt, profilePopupInputsData) {
  evt.preventDefault();
  userPopup.close();
  yandexApi.editUserInfo(profilePopupInputsData)
  userInfo.setUserInfo(profilePopupInputsData);
}

function handleCardClick(link, name) {
  const imagePopup = new PopupWithImage(".popup_for_photo");
  imagePopup.open(link, name);
  imagePopup.setEventListeners();
}

function handleCardDeleteClick() {
  const confirmationPopup = new PopupForConfirmation(".popup_for_conformation");
  confirmationPopup.open();
  confirmationPopup.setEventListeners();
}

function createCard(cardData) {
  const createdCard = new Card(
    cardData,
    ".userCardTeamplate",
    handleCardClick,
    handleCardDeleteClick
  );
  const createdCardElement = createdCard.generateCard();
  return createdCardElement;
}

function addNewCard(evt, cardPopupInputsData) {
  evt.preventDefault();
  createCard(cardPopupInputsData);
  const newCard = createCard(cardPopupInputsData);
  cardList.addItem(newCard);
  yandexApi.addCards(cardPopupInputsData)
  cardPopup.close();
}

// ты добавляешь карточки. cardPopupInputsData почему-то массив. разберись как они создавались раньше.

userPopupOpenButton.addEventListener("click", prepareUserPopup);
cardPopupOpenButton.addEventListener("click", prepareCardPopup);

yandexApi
  .getUserInfo()
  .then((userData) => {
    // console.log("загрузился профиль");
    // console.log(userData);
    userData.userName = userData.name;
    delete userData.name;
    userInfo.setUserInfo(userData);
    // console.log(userData);
    // выглядит не очень красиво. но хранящееся в массиве сервера "name",мне не подходит, т.к. у имени профиля name="userName".
    // Это сделано, т.к. автоматические проверки не пропускают 2 идентичных name. У карточек name="name".
  })
  .catch((error) => console.log(error));

