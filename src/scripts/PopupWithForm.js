import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popupFormElement = this._popupSelector.querySelector(".popup__form");
    this._inputsList = this._popupFormElement.querySelectorAll(
      ".popup-fieldset__input"
    );
  }

  _getInputValues() {
    this._inputs = {};
    this._inputsList.forEach((input) => {
      this._inputs[input.name] = [input.value];
    });
    return this._inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElement.addEventListener("submit", this._submitFormCallback);
  }

  close() {
    super.close();
    this._getInputValues();
    this._popupFormElement.reset();
  }
}
