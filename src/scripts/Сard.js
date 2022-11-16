export class Card {
  constructor(data, templateSelector, openCard) {
    this.cardName = data.name;
    this.cardPhoto = data.link;
    this.templateSelector = templateSelector;
    this._openCard = openCard;
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

  _likeCard() {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
    this._cardImage = this._element.querySelector(".element__photo");
    this._cardImage.addEventListener("click", () => {
      this._openCard(this.cardPhoto, this.cardName);
    });
  }
}
