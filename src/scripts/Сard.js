// import { PopupForConformation } from "./PopupForConfirmation";

export class Card {
  constructor(data, templateSelector, openCard, openConfirmation) {
    this._cardName = data.name;
    this._cardPhoto = data.link;
    this.templateSelector = templateSelector;
    this._openCard = openCard;
    this._openConfirmation = openConfirmation;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });
    // this._deleteButton = this._element.querySelector(".element__delete-button");
    // this._deleteButton.addEventListener("click", () => {
    //   this._deleteCard();
    // });
    this._deleteButton = this._element.querySelector(".element__delete-button");
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._openConfirmation();
      });
    }
    this._cardImage = this._element.querySelector(".element__photo");
    this._cardImage.addEventListener("click", () => {
      this._openCard(this._cardPhoto, this._cardName);
    });
  }

  _likeCard() {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._cardPhoto;
    this._cardImage.alt = this._cardName;
    this._element.querySelector(".element__text").textContent = this._cardName;

    return this._element;
  }
}
