export class FormValidator {
  constructor(elements, formElement) {
    this._forms = elements.forms;
    this._inputs = elements.inputs;
    this._submitButtons = elements.submitButtons;
    this._submitButtonsInactive = elements.submitButtonsInactive;
    this._inputsError = elements.inputsError;
    this._formElement = formElement;
    this._saveButton = this._formElement.querySelector(this._submitButtons);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputs)
    );
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputsError);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputsError);
    errorElement.textContent = "";
  };

  _hasInvalidInput = () => {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._saveButton.classList.add(this._submitButtonsInactive);
      this._saveButton.setAttribute("disabled", true);
    } else {
      this._saveButton.classList.remove(this._submitButtonsInactive);
      this._saveButton.removeAttribute("disabled");
    }
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
