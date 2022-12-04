import { elements, apiconfig } from "./data.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Сard.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupForConfirmation } from "../components/PopupForConfirmation";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/API.js";
import "../pages/index.css";

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
confirmationPopup.setEventListeners();
const imagePopup = new PopupWithImage(".popup_for_photo");
imagePopup.setEventListeners();

const profileFormValidator = new FormValidator(elements, profileFormElement);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(elements, cardFormElement);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(elements, avatarFormElement);
avatarFormValidator.enableValidation();

const yandexApi = new Api(apiconfig);

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__discription",
  userAvatarSelector: ".profile__avatar",
});

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
      cardList.addInitialItems(initialCardElement);
    },
  },
  ".elements"
);

Promise.all([yandexApi.getUserInfoFromServer(), yandexApi.getCards()])
  .then((serverData) => {
    serverData[0].userName = serverData[0].name;
    delete serverData[0].name;
    userInfo.setUserInfo(serverData[0]);
    ownerId = serverData[0]._id;
    cardList.renderItems(serverData[1]);
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
  const message = "Сохранение...";
  userPopup.renderLoading(true, message);
  yandexApi
    .editUserInfo(profilePopupInputsData)
    .then(() => {
      userInfo.setUserInfo(profilePopupInputsData);
      userPopup.close();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      const message = "Сохранить";
      userPopup.renderLoading(false, message);
    });
}

function saveAvatarPopup(evt, avatarPopupInputsData) {
  evt.preventDefault();
  console.log(avatarPopupInputsData);
  const message = "Сохранение...";
  avatarPopup.renderLoading(true, message);
  yandexApi
    .editUserAvatar(avatarPopupInputsData)
    .then(() => {
      userInfo.setUserAvatar(avatarPopupInputsData);
      avatarPopup.close();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      const message = "Сохранить";
      avatarPopup.renderLoading(false, message);
    });
}

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

function handleCardDeleteClick(card, cardId, deleteCard) {
  confirmationPopup.open(card, cardId, deleteCard);
}

function handleCardDeleteConfirm(evt, card, cardId, deleteCard) {
  evt.preventDefault();
  yandexApi
    .deleteCard(cardId)
    .then(() => {
      deleteCard(card);
      confirmationPopup.close();
    })
    .catch((error) => console.log(error));
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
      if (cardData.likes.length <= 0) {
        likeCounter.textContent = "";
      }
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
  const message = "Создаю...";
  cardPopup.renderLoading(true, message);
  yandexApi
    .addCards(cardPopupInputsData)
    .then((newCardData) => {
      const newCard = createCard(newCardData);
      cardList.addItem(newCard);
      cardPopup.close();
    })
    .catch((error) => alert(`Данные пользователя не загружены ${error}`))
    .finally(() => {
      const message = "Создать";
      cardPopup.renderLoading(false, message);
    });
}

userPopupOpenButton.addEventListener("click", prepareUserPopup);
cardPopupOpenButton.addEventListener("click", prepareCardPopup);
avatarPopupOpenButton.addEventListener("click", prepareAvatarPopup);
