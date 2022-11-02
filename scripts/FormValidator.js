export class FormValidator {
  constructor(elements, formElement) {
    this.popup = elements.popup;
    this.forms = elements.forms;
    this.inputs = elements.inputs;
    this.submitButtons = elements.submitButtons;
    this.submitButtonsInactive = elements.submitButtonsInactive;
    this.inputsError = elements.inputsError;
    this.formElement = formElement;
  }

  _checkInputValidity = (formElement, inputElement) => {
    // console.log("CheckInputValidity")
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
    // console.log("ShowErrors")
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this.inputsError);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (formElement, inputElement) => {
    // console.log("HideErrors")
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this.inputsError);
    errorElement.textContent = "";
  };

  _hasInvalidInput = (inputList) => {
    // console.log("hasInvalidInput")
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  };

  _prepareValidaton = () => {
    console.log("prepareValidation");
    
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.inputs)
    );
    inputList.forEach((inputElement) => {
      this._hideInputError(this.formElement, inputElement);
    });
  };

  _restoreButtonState = () => {
    console.log("restoreButtonState");
    const saveButton = this.formElement.querySelector(this.submitButtons);
    saveButton.classList.add(this.submitButtonsInactive);
    saveButton.setAttribute("disabled", true);
  };

  _setEventListeners = (formElement) => {
    // console.log("Listeners enabled")
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
    // console.log("toggleButtonState")
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.submitButtonsInactive);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this.submitButtonsInactive);
      buttonElement.classList.add(this.submitButtons);
      buttonElement.removeAttribute("disabled");
    }
  };

  enableValidation = () => {
    console.log("enable validation")
    this._prepareValidaton();
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this.formElement);
  };
}

//   берет все формы,создает массив и на каждую форму вешает слушатель (отмена отправки) и вызывает функцию на каждую форму.
// function enableValidation(elements) {
//   const formList = Array.from(document.querySelectorAll(elements.forms));
//   formList.forEach(function (formElement) {
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, elements);
//   });
// }

//  создает массив из всех инпутов каждой формы и вешает на них слушатель который запускате 2 функции:
// 1. проверяет инпутs, соотвествуют ли введенные данные, требованиям.
// 2. меняет состояние кнопки, в зависимости от результатов проверки инпа.

// function setEventListeners(formElement, elements) {
//   const inputList = Array.from(formElement.querySelectorAll(elements.inputs));
//   const saveButton = formElement.querySelector(elements.sumbitButtons);
//   inputList.forEach(function (inputElement) {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, elements);
//       toggleButtonState(inputList, saveButton, elements);
//     });
//     toggleButtonState(inputList, saveButton, elements);
//   });
// }

//   проверяет валидна ли форма и каждый инпут в отдельности.
// function checkInputValidity(formElement, inputElement, elements) {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       elements
//     );
//   } else {
//     hideInputError(formElement, inputElement, elements);
//   }
// }

// если форма невалидна, показывает браузерное сообщение об ошибке и выделяет поле
// function showInputError(formElement, inputElement, errorMessage, elements) {
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
//   inputElement.classList.add(elements.inputsError);
//   errorElement.textContent = errorMessage;
// }
// // если форма валидна, очишает браузерное сообщение об ошибке.
// function hideInputError(formElement, inputElement, elements) {
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
//   inputElement.classList.remove(elements.inputsError);
//   errorElement.textContent = "";
// }

// проверяет все инпуты, на предмет неваладиности хотя бы одного.
// function hasInvalidInput(inputList) {
//   return inputList.some(function (inputElement) {
//     return !inputElement.validity.valid;
//   });
// }

// если найдет 1 невалидный инпут, убנрает активность кнопки.
// если все инпуты валидны, возвращает валидность кнопки.
// function toggleButtonState(inputList, buttonElement, elements) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(elements.sumbitButtonsInactive);
//     buttonElement.setAttribute("disabled", true);
//   } else {
//     buttonElement.classList.remove(elements.sumbitButtonsInactive);
//     buttonElement.classList.add(elements.sumbitButtons);
//     buttonElement.removeAttribute("disabled");
//   }
// }

// export function prepareValidaton(preparedPopup) {
//   const formElement = preparedPopup.querySelector(elements.forms);
//   const inputList = Array.from(formElement.querySelectorAll(elements.inputs));
//   inputList.forEach(function (inputElement) {
//     hideInputError(formElement, inputElement, elements);
//   });
// }

// export function restoreButtonState(popup) {
//   const saveButton = popup.querySelector(elements.sumbitButtons);
//   saveButton.classList.add(elements.sumbitButtonsInactive);
//   saveButton.setAttribute("disabled", true);
// }

//
