export class Card {
  constructor(data, templateSelector, openPopup) {
    this.cardName = data.name;
    this.cardPhoto = data.link;
    this.templateSelector = templateSelector;
    this._openPopup = openPopup;
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

  _OpenCard() {
    const photoPopup = document.querySelector(".popup_for_photo");
    const popupPhoto = document.querySelector(".popup__photo");
    const popupPhotoCapture = document.querySelector(".popup__photo-capture");
    popupPhoto.src = this.cardPhoto;
    popupPhoto.alt = this.cardName;
    popupPhotoCapture.textContent = this.cardName;
    this._openPopup(photoPopup);
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
    initialCardPhoto.addEventListener("click", () => {
      this._OpenCard();
    });
  }
}
