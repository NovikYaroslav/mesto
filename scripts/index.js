const popupOpenButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".user-discription__input_value_name");
const aboutInput = formElement.querySelector(".user-discription__input_value_about");
const userName = document.querySelector(".profile__name");
const aboutUser = document.querySelector(".profile__discription");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = userName.textContent;
  aboutInput.value = aboutUser.textContent;
}
function closePopup() {
  popup.classList.remove("popup_opened");
}
function savePopup(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  aboutUser.textContent = aboutInput.value;
  closePopup();
}

popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", savePopup);
