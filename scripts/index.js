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
const popupPhoto = document.querySelector(".popup__photo");
const popupPhotoCapture = document.querySelector(".popup__photo-capture");
const cardText = document.querySelector(".element__text");
const userPopup = document.querySelector(".popup_for_user");
const cardPopup = document.querySelector(".popup_for_card");
const photoPopup = document.querySelector(".popup_for_photo");
const userPopupCloseButton = userPopup.querySelector(".popup__close_for_user");
const cardPopupCloseButton = cardPopup.querySelector(".popup__close_for_card");
const photoPopupCloseButton = photoPopup.querySelector(".popup__close_for_photo");
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
const cardTeamplate = document.querySelector(".cardTeamplate");
const cardContainer = document.querySelector(".elements");

function openPopup(event) {
  if (event.target === userPopupOpenButton) {
    userPopup.classList.add("popup_opened");
    nameInput.value = userName.textContent;
    aboutInput.value = aboutUser.textContent;
  }
  if (event.target === cardPopupOpenButton) {
    cardPopup.classList.add("popup_opened");
    cardTitleInput.value = "";
    cardPhotoInput.value = "";
  }
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
}

function savePopup(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  aboutUser.textContent = aboutInput.value;
  closePopup(userPopup);
}

function createCard(item) {
  const initialCard = cardTeamplate.content.cloneNode(true);
  const initialCardTitle = initialCard.querySelector(".element__text");
  const initialCardPhoto = initialCard.querySelector(".element__photo");
  initialCardPhoto.addEventListener("click", function () {
    photoPopup.classList.toggle("popup_opened");
    popupPhoto.src = initialCardPhoto.src;
    popupPhoto.alt = initialCardPhoto.alt;
    popupPhotoCapture.textContent = initialCardTitle.textContent;
  });
  const deleteButton = initialCard.querySelector(".element__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  const likeButton = initialCard.querySelector(".element__like-button");
  likeButton.addEventListener("click", likeCard);
  initialCardTitle.textContent = item.name;
  initialCardPhoto.src = item.link;
  initialCardPhoto.alt = item.name;
  return initialCard;
}

function loadCards() {
  initialCards.forEach(function (card) {
    const initialCard = createCard(card);
    cardContainer.prepend(initialCard);
  });
}

loadCards();

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

function likeCard(event) {
  event.target.classList.toggle("element__like-button_active");
}

function deleteCard(event) {
  event.target.parentElement.remove();
}

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
profileFormElement.addEventListener("submit", savePopup);
cardFormElement.addEventListener("submit", addNewCard);
