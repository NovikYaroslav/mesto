import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popupFormElement = this._popup.querySelector(".popup__form");
    this._inputsList = this._popupFormElement.querySelectorAll(
      ".popup-fieldset__input"
    );
    this._inputs = {};
  }

  _getInputValues() {
    // Учитывая, что здесь я прохожусь по массиву, то реализовать аналогично UserInfo не получилось.
    // Вынес this._inputs в конструктор. тут только собрал для него данные. Вроде он не должен сохраняться и храниться в памяти.
    this._inputsList.forEach((input) => {
      this._inputs[input.name] = [input.value];
    });
    return this._inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElement.addEventListener("submit", (evt) => {
      this._submitFormCallback(evt, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupFormElement.reset();
  }
}
