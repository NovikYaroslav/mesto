export class Card {
  constructor(
    data,
    templateSelector,
    openCard,
    openConfirmation,
    setLike,
    deleteLike,
    ownerId
  ) {
    this._cardName = data.name;
    this._cardPhoto = data.link;
    this._cardLikes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._pageOwnerId = ownerId;
    this.templateSelector = templateSelector;
    this._openCard = openCard;
    this._openConfirmation = openConfirmation;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    this._isLiked = this._cardLikes.some(
      (item) => item._id === this._pageOwnerId
    );
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
      this._toggleCardLikes();
      this._isLiked = !this._isLiked;
    });
    this._deleteButton = this._element.querySelector(".element__delete-button");
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._openConfirmation(this._element, this._cardId, this._deleteCard);
      });
    }
    this._cardImage = this._element.querySelector(".element__photo");
    this._cardImage.addEventListener("click", () => {
      this._openCard(this._cardPhoto, this._cardName);
    });
  }

  _renderCardLikes() {
    this._likeCounter.textContent = this._cardLikes.length;
    if (this._cardLikes.length <= 0) {
      this._likeCounter.textContent = "";
    }
    if (this._isLiked) {
      this._likeButton.classList.add("element__like-button_active");
    }
  }

  _likeCard() {
    this._setLike(this._cardId, this._likeCounter, this._cardLikes);
    this._likeButton.classList.add("element__like-button_active");
  }

  _deleteLikeCard() {
    this._deleteLike(this._cardId, this._likeCounter, this._cardLikes);
    this._likeButton.classList.remove("element__like-button_active");
  }

  _toggleCardLikes() {
    if (this._isLiked) {
      this._deleteLikeCard();
    } else {
      this._likeCard();
    }
  }

  _deleteCard(card) {
    card.remove();
    card = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._setEventListeners();
    this._renderCardLikes();
    this._cardImage.src = this._cardPhoto;
    this._cardImage.alt = this._cardName;
    this._element.querySelector(".element__text").textContent = this._cardName;
    if (this._cardOwnerId !== this._pageOwnerId) {
      this._deleteButton.remove();
    }
    return this._element;
  }
}
