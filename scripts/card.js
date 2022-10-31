import {initialCards} from "./data.js"




export class Card {
  constructor(data, templateSelector) {
    this.cardName = data.name;
    this.cardPhoto = data.link;
    this.templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__photo").src = this.cardPhoto;
    this._element.querySelector(".element__photo").alt = this.cardName;
    this._element.querySelector(".element__text").textContent = this.cardName;

    return this._element;
  }

  _likeCard(likeButton) {
    likeButton.classList.toggle("element__like-button_active");
  }

  _deleteButton() {
    this._element.remove();
  }

  _preparePhotoPopup(initialCardPhoto, initialCardTitle) {
    const popupPhoto = document.querySelector(".popup__photo");
    const popupPhotoCapture = document.querySelector(".popup__photo-capture");
    const photoPopup = document.querySelector(".popup_for_photo");
      popupPhoto.src = initialCardPhoto.src;
      popupPhoto.alt = initialCardPhoto.alt;
      popupPhotoCapture.textContent = initialCardTitle.textContent;
      this._openPopup(photoPopup);
  }

  _openPopup(popup) {
    popup.classList.add("popup_opened");
    popup.addEventListener("click", setMouseAction);
    document.addEventListener("keydown", escapePopup);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".element__like-button");
    likeButton.addEventListener("click", () => {
      this._likeCard(likeButton);
    });
    const deleteButton = this._element.querySelector(".element__delete-button");
    deleteButton.addEventListener("click", () => {
      this._deleteButton();
    });
    const initialCardPhoto = this._element.querySelector(".element__photo");
    const initialCardTitle = this._element.querySelector(".element__text");
    initialCardPhoto.addEventListener(
      "click",
      this._preparePhotoPopup(initialCardPhoto, initialCardTitle)
    );
  }

  // Тимплейта, Изображения, названия
  // Возьми разметку, создай начальные карточки, добавь начальные карточки на страницу, создай карточки пользователя.
  // Слушатели: на Изображении, на кнопке удалить, на кнопке лайка.
}

// class UserCard extends Card {
//   constructor(templateSelector) {
//     super(templateSelector);
//     this.cardName = cardTitleInput.value;
//     this.cardPhoto = cardPhotoInput.value;
//   }

//   generateCard() {
//     this._element = super._getTemplate();
//     super._setEventListeners()
//     this._setEventListeners();
//     this._element.querySelector(".element__photo").src = this.cardPhoto;
//     this._element.querySelector(".element__text").textContent = this.cardName;

//     return this._element;
//   }

//   _addNewCard(evt) {
//     evt.preventDefault();
//     const newCard = generateCard();
//     cardContainer.prepend(newCard);
//     closePopup(cardPopup);
//     restoreButtonState(cardPopup);
//   }
// }



initialCards.forEach((item) => {
  const card = new Card(item, ".cardTeamplate");
  const cardElement = card.generateCard();

  document.querySelector(".elements").prepend(cardElement);
});

