const elements = {
  popup: ".popup",
  forms: ".popup__form",
  inputs: ".popup-fieldset__input",
  sumbitButtons: ".popup__save",
  sumbitButtonsInactive: "popup__save_inactive",
  inputsError: "popup__error"
};

//   берет все формы,создает массив и на каждую форму вешает слушатель (отмена отправки) и вызывает функцию на каждую форму.
function enableValidation(elements) {
  const formList = Array.from(document.querySelectorAll(elements.forms));
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, elements);
  });
}

enableValidation(elements);

//  создает массив из всех инпутов каждой формы и вешает на них слушатель который запускате 2 функции:
// 1. проверяет инпутs, соотвествуют ли введенные данные, требованиям.
// 2. меняет состояние кнопки, в зависимости от результатов проверки инпа.

function setEventListeners(formElement, elements) {
  const inputList = Array.from(formElement.querySelectorAll(elements.inputs));
  const saveButton = formElement.querySelector(elements.sumbitButtons);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, elements);
      toggleButtonState(inputList, saveButton, elements);
    });
    toggleButtonState(inputList, saveButton, elements);
  });
}

//   проверяет валидна ли форма и каждый инпут в отдельности.
function checkInputValidity(formElement, inputElement, elements) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, elements);
  }
}

// если форма невалидна, показывает браузерное сообщение об ошибке и выделяет поле
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
  inputElement.style.setProperty("border-bottom", "1px solid red");
}
// если форма валидна, очишает браузерное сообщение об ошибке.
function hideInputError(formElement, inputElement, elements) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = "";
  inputElement.style.removeProperty("border-bottom", "1px solid red");
}

// проверяет все инпуты, на предмет неваладиности хотя бы одного.
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

// если найдет 1 невалидный инпут, уберает активность кнопки.
// если все инпуты валидны, возвращает валидность кнопки.
function toggleButtonState(inputList, buttonElement, elements) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(elements.sumbitButtonsInactive);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(elements.sumbitButtonsInactive);
    buttonElement.classList.add(elements.sumbitButtons);
    buttonElement.removeAttribute("disabled");
  }
}
