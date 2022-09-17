// получить элементы
const PopupOpenButton = document.querySelector(".edit-button");
const Popup = document.querySelector(".popup");
const PopupCloseButton = Popup.querySelector(".popup__close");
const PopupSaveButton = Popup.querySelector(".popup__save");
let formElement = Popup.querySelector(".user-discription");
let nameInput = formElement.querySelector(".user-discription__name");
let aboutInput = formElement.querySelector(".user-discription__about");

const UserName = document.querySelector(".profile-info__user-name")
const AboutUser = document.querySelector(".profile-info__user-discription")

const OpenPopup = function () {
  Popup.classList.add("popup_opened");
};
const ClosePopup = function () {
    Popup.classList.remove("popup_opened");
  };

const SavePopup = function (evt) {
    evt.preventDefault();
    // nameInput.value = UserName.textContent;
    // aboutInput.value = AboutUser.textContent;
    UserName.textContent = nameInput.value;
    AboutUser.textContent = aboutInput.value;
    ClosePopup()
}


// добавить слушатель на кнопки 
PopupOpenButton.addEventListener("click", OpenPopup);
PopupCloseButton.addEventListener("click", ClosePopup);
formElement.addEventListener('submit', SavePopup); 

console.log(AboutUser.textContent)
console.log(UserName.textContent)
console.log(typeof nameInput.value)
console.log(aboutInput.value)




















// UserName.textContent = " "
// AboutUser.textContent =" "
// UserName.textContent = `${nameInput.value}`
// AboutUser.textContent = `${aboutInput.value}`