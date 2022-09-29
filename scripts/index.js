const userPopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
const userPopup = document.getElementById("userPopup");
const cardPopup = document.getElementById("cardPopup");
const userPopupCloseButton = document.getElementById("userPopupClose");
const cardPopupCloseButton = document.getElementById("cardPopupClose");
const likeButtons = document.querySelectorAll(".element__like-button");
const formElement = userPopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".user-discription__input_value_name");
const aboutInput = formElement.querySelector(".user-discription__input_value_about");
const userName = document.querySelector(".profile__name");
const aboutUser = document.querySelector(".profile__discription");

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

function closePopup() {
  userPopup.classList.remove("popup_opened");
  cardPopup.classList.remove("popup_opened");
}

function savePopup(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  aboutUser.textContent = aboutInput.value;
  closePopup();
}

function likeCard(event) {
  event.target.classList.toggle("element__like-button_active");
}

likeButtons.forEach(function (likeButton) {
  likeButton.addEventListener("click", likeCard);
});

userPopupOpenButton.addEventListener("click", openPopup);
cardPopupOpenButton.addEventListener("click", openPopup);
userPopupCloseButton.addEventListener("click", closePopup);
cardPopupCloseButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", savePopup);
