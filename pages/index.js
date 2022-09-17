const popupOpenButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const popupSaveButton = popup.querySelector(".popup__save");
const formElement = popup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".user-discription__name");
const aboutInput = formElement.querySelector(".user-discription__about");
const userName = document.querySelector(".profile-info__user-name");
const aboutUser = document.querySelector(".profile-info__user-discription");

function openPopup() {
  popup.classList.add("popup_opened");
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
