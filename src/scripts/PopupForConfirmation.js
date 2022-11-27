import { Popup } from "./Popup.js";
// import { Card } from "./Сard.js";

export class PopupForConfirmation extends Popup {
  constructor(popupSelector, ) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__save");
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
    });
  }

  close() {
    super.close();
  }
}