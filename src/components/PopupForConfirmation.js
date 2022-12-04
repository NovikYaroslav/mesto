import { Popup } from "../components/Popup.js";

export class PopupForConfirmation extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__save");
    this._submitFormCallback = submitFormCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._submitFormCallback(
        evt,
        this._card,
        this._cardId,
        this._confirmAction
      );
    });
  }
  open(card, cardId, confirmAction) {
    super.open();
    this._card = card;
    this._cardId = cardId;
    this._confirmAction = confirmAction;
  }
}
