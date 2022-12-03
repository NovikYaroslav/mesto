import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popupFormElement = this._popup.querySelector(".popup__form");
    this._inputsList = this._popupFormElement.querySelectorAll(
      ".popup-fieldset__input"
    );
    this._submitButton = this._popupFormElement.querySelector(".popup__save");
  }

  _getInputValues() {
    const inputs = {};
    this._inputsList.forEach((input) => {
      inputs[input.name] = [input.value];
    });
    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElement.addEventListener("submit", (evt) => {
      this._submitFormCallback(evt, this._getInputValues());
    });
  }

  renderLoading(isLoading, message) {
    if (isLoading) {
      this._submitButton.textContent = message;
    } else {
      this._submitButton.textContent = message;
    }
  }

  close() {
    super.close();
    this._popupFormElement.reset();
  }
}
