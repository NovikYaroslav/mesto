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
import { data } from "autoprefixer";

const userPopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
const avatarPopupOpenButton = document.querySelector(
  ".profile__avatar-edit-button"
);
const profileFormElement = document.querySelector('[name="user-profile"]');
const cardFormElement = document.querySelector('[name="user-card"]');
const avatarFormElement = document.querySelector('[name="user-avatar"]');
const nameInput = profileFormElement.querySelector(
  ".popup-fieldset__input_value_name"
);
const aboutInput = profileFormElement.querySelector(
  ".popup-fieldset__input_value_about"
);
let ownerId = "id владельца страницы";

const profileFormValidator = new FormValidator(elements, profileFormElement);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(elements, cardFormElement);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(elements, avatarFormElement);
avatarFormValidator.enableValidation();

const yandexApi = new Api(apiconfig);

const cardPopup = new PopupWithForm(".popup_for_card", addNewCard);
cardPopup.setEventListeners();
const userPopup = new PopupWithForm(".popup_for_user", saveUserPopup);
userPopup.setEventListeners();
const avatarPopup = new PopupWithForm(".popup_for_avatar", saveAvatarPopup);
avatarPopup.setEventListeners();
const confirmationPopup = new PopupForConfirmation(
  ".popup_for_conformation",
  handleCardDeleteConfirm
);

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__discription",
  userAvatarSelector: ".profile__avatar",
});

yandexApi
  .getUserInfoFromServer()
  .then((userData) => {
    userData.userName = userData.name;
    delete userData.name;
    userInfo.setUserInfo(userData);
    ownerId = userData._id;
  })
  .catch((error) => alert(`"Данные пользователя не загружены." ${error}`));

const cardList = new Section(
  {
    renderer: (cardData) => {
      const createdCard = new Card(
        cardData,
        ".userCardTeamplate",
        handleCardClick,
        handleCardDeleteClick,
        handleCardLikeClick,
        handleCardLikeDelete,
        ownerId
      );
      const initialCardElement = createdCard.generateCard();
      cardList.addItem(initialCardElement);
    },
  },
  ".elements"
);

yandexApi
  .getCards()
  .then((uploadedCards) => {
    cardList.renderItems(uploadedCards);
  })
  .catch((error) => console.log(error));

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

function prepareAvatarPopup() {
  avatarPopup.open();
  avatarFormValidator.resetValidation();
}

function saveUserPopup(evt, profilePopupInputsData) {
  evt.preventDefault();
  userPopup.renderLoading(true);
  yandexApi
    .editUserInfo(profilePopupInputsData)
    .then()
    .catch((error) => console.log(error))
    .finally(() => userPopup.renderLoading(false));
  userInfo.setUserInfo(profilePopupInputsData);
  userPopup.close();
}

function saveAvatarPopup(evt, avatarPopupInputsData) {
  evt.preventDefault();
  avatarPopup.renderLoading(true);
  yandexApi
    .editUserAvatar(avatarPopupInputsData)
    .finally(() => avatarPopup.renderLoading(false));
  userInfo.setUserAvatar(avatarPopupInputsData);
  avatarPopup.close();
}

function handleCardClick(link, name) {
  const imagePopup = new PopupWithImage(".popup_for_photo");
  imagePopup.open(link, name);
  imagePopup.setEventListeners();
}

function handleCardDeleteClick(card, cardId, deleteCard) {
  confirmationPopup.open();
  confirmationPopup.setEventListeners(card, cardId, deleteCard);
}

function handleCardDeleteConfirm(evt, card, cardId, deleteCard) {
  evt.preventDefault();
  deleteCard(card);
  yandexApi.deleteCard(cardId);
  confirmationPopup.close();
}

function handleCardLikeClick(id, likeCounter) {
  yandexApi
    .setCardLike(id)
    .then((cardData) => {
      likeCounter.textContent = cardData.likes.length;
    })
    .catch((error) => console.log(error));
}

function handleCardLikeDelete(id, likeCounter) {
  yandexApi
    .deleteCardLike(id)
    .then((cardData) => {
      likeCounter.textContent = cardData.likes.length;
    })
    .catch((error) => console.log(error));
}

function createCard(cardData) {
  const createdCard = new Card(
    cardData,
    ".userCardTeamplate",
    handleCardClick,
    handleCardDeleteClick,
    handleCardLikeClick,
    handleCardLikeDelete,
    ownerId
  );
  const createdCardElement = createdCard.generateCard();
  return createdCardElement;
}

function addNewCard(evt, cardPopupInputsData) {
  evt.preventDefault();
  cardPopup.renderLoading(false);
  yandexApi
    .addCards(cardPopupInputsData)
    .then((newCardData) => {
      console.log(newCardData);
      const newCard = createCard(newCardData);
      cardList.addItem(newCard);
    })
    .catch((error) => alert(`Данные пользователя не загружены ${error}`))
    .finally(() => cardPopup.renderLoading(true));
  cardPopup.close();
}

userPopupOpenButton.addEventListener("click", prepareUserPopup);
cardPopupOpenButton.addEventListener("click", prepareCardPopup);
avatarPopupOpenButton.addEventListener("click", prepareAvatarPopup);