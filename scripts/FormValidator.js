export class FormValidator {
  constructor(elements, formElement) {
    this.forms = elements.forms;
    this.inputs = elements.inputs;
    this.submitButtons = elements.submitButtons;
    this.submitButtonsInactive = elements.submitButtonsInactive;
    this.inputsError = elements.inputsError;
    this.formElement = formElement;
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this.inputsError);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this.inputsError);
    errorElement.textContent = "";
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  };

  _prepareValidaton = () => {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.inputs)
    );
    inputList.forEach((inputElement) => {
      this._hideInputError(this.formElement, inputElement);
    });
  };

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this.inputs));
    const saveButton = formElement.querySelector(this.submitButtons);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, saveButton);
      });
      this._toggleButtonState(inputList, saveButton);
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.submitButtonsInactive);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this.submitButtonsInactive);
      buttonElement.removeAttribute("disabled");
    }
  };

  enableValidation = () => {
    console.log("enable validation");
    this._prepareValidaton();
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this.formElement);
  };
}

// function restoreButtonState(popup) {
//   const saveButton = popup.querySelector(elements.sumbitButtons);
//   saveButton.classList.add(elements.sumbitButtonsInactive);
//   saveButton.setAttribute("disabled", true);
// }
