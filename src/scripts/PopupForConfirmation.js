import { Popup } from "./Popup.js";
import { Card } from "./Сard.js";

export class PopupForConformation extends Popup {
  constructor(popupSelector, ) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__save");
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
    Card.deleteCard()});
  }

  close() {
    super.close();
  }
}