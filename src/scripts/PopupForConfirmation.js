import { Popup } from "./Popup.js";

export class PopupForConfirmation extends Popup {
  constructor(popupSelector, submitFormCallback ) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__save");
    this._submitFormCallback = submitFormCallback
  }

  setEventListeners(card, cardId, confirmAction) {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      console.log("Yes")
      this._submitFormCallback(evt, card, cardId, confirmAction)
    });
  }

  close() {
    super.close();
  }
}