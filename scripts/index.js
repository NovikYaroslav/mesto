const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const userPopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
const cardsPhotos = document.querySelectorAll(".element__photo");
const popupPhoto = document.querySelector(".popup__photo");
const popupPhotoCapture = document.querySelector(".popup__photo-capture");
const cardText = document.querySelector(".element__text");
const userPopup = document.getElementById("userPopup");
const cardPopup = document.getElementById("cardPopup");
const photoPopup = document.getElementById("photoPopup");
const userPopupCloseButton = document.getElementById("userPopupClose");
const cardPopupCloseButton = document.getElementById("cardPopupClose");
const photoPopupCloseButton = document.getElementById("photoPopupClose");
const likeButtons = document.querySelectorAll(".element__like-button");
const likeButtonsArray = Array.from(likeButtons);
const formElement = userPopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(
  ".popup-fieldset__input_value_name"
);
const aboutInput = formElement.querySelector(
  ".popup-fieldset__input_value_about"
);
const userName = document.querySelector(".profile__name");
const aboutUser = document.querySelector(".profile__discription");
const deleteButtons = document.querySelectorAll(".element__delete-button");

// Функции

// Функция, открытия Попаво профиля и карточки.
function openPopup(event) {
  if (event.target === userPopupOpenButton) {
    userPopup.classList.add("popup_opened");
    nameInput.value = userName.textContent;
    aboutInput.value = aboutUser.textContent;
  }
  if (event.target === cardPopupOpenButton) {
    cardPopup.classList.add("popup_opened");
  }
}

// Функция закрытия Попапов

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
}

// Функция сохранения Попапа профиля

function savePopup(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  aboutUser.textContent = aboutInput.value;
  closePopup(userPopup);
}

// Функция активации лайка
function likeCard(event) {
  event.target.classList.toggle("element__like-button_active");
}

// Функция открытия Попапа фотографии
function openPhoto(event) {
  photoPopup.classList.toggle("popup_opened");
  popupPhoto.src = event.target.src;
  popupPhotoCapture.textContent = "Подпись из карточки";
}

// Функция удаления карточки
function deleteCard(event) {
  event.target.parentElement.remove();
}

//Обработка массивов

// Обработка массива с кнопками лайков
likeButtonsArray.forEach(function (likeButton) {
  likeButton.addEventListener("click", likeCard);
});

// Обработка ноды с карточками
cardsPhotos.forEach(function (cardPhoto) {
  cardPhoto.addEventListener("click", openPhoto);
});

// обработка ноды с кнопками удаления
deleteButtons.forEach(function (deleteButton) {
  deleteButton.addEventListener("click", deleteCard);
});

// Слушатели
userPopupOpenButton.addEventListener("click", openPopup);
cardPopupOpenButton.addEventListener("click", openPopup);

userPopupCloseButton.addEventListener("click", function () {
  closePopup(userPopup);
});
cardPopupCloseButton.addEventListener("click", function () {
  closePopup(cardPopup);
});
photoPopupCloseButton.addEventListener("click", function () {
  closePopup(photoPopup);
});

formElement.addEventListener("submit", savePopup);
