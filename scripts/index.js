const userPopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");

const userPopup = document.getElementById("userPopup");
const cardPopup = document.getElementById("cardPopup");

const userPopupCloseButton = document.getElementById("userPopupClose");
const cardPopupCloseButton = document.getElementById("cardPopupClose");


const formElement = userPopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".user-discription__input_value_name");
const aboutInput = formElement.querySelector(".user-discription__input_value_about");
const userName = document.querySelector(".profile__name");
const aboutUser = document.querySelector(".profile__discription");

function openUserPopup() {
  userPopup.classList.add("popup_opened");
  nameInput.value = userName.textContent;
  aboutInput.value = aboutUser.textContent;
}
function openCardPopup() {
  cardPopup.classList.add("popup_opened");
}

function closeUserPopup() {
  userPopup.classList.remove("popup_opened");
}
function closeCardPopup() {
  cardPopup.classList.remove("popup_opened");
}
//сделать eventTarget



function savePopup(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  aboutUser.textContent = aboutInput.value;
  closeUserPopup();
}

userPopupOpenButton.addEventListener("click", openUserPopup);
cardPopupOpenButton.addEventListener("click", openCardPopup);
userPopupCloseButton.addEventListener("click", closeUserPopup);
cardPopupCloseButton.addEventListener("click", closeCardPopup);
formElement.addEventListener("submit", savePopup);
