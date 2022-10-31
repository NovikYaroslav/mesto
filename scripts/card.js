const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

class Card {
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
    this._element.querySelector(".element__photo").src = this.cardPhoto;
    this._element.querySelector(".element__text").textContent = this.cardName;

    return this._element;
  }

  // Тимплейта, Изображения, названия
  // Возьми разметку, создай начальные карточки, добавь начальные карточки на страницу, создай карточки пользователя.
  // Слушатели: на Изображении, на кнопке удалить, на кнопке лайка.
}

initialCards.forEach((item) => {
    const card = new Card(item, ".cardTeamplate")
    const cardElement = card.generateCard();

    document.querySelector(".elements").prepend(cardElement)
})
