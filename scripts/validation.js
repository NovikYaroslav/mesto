const forms = document.querySelectorAll(".popup__form");
const submitButtons = document.querySelectorAll(".popup__save");


// function validateInput(inputElement) {
//     const errorElement = document.querySelector(`#${inputElement.name}-error`);
//     if (inputElement.checkValidity()) {
//         console.log("input valid")
//         errorElement.textContent = "";
//        }
//        else {
//         console.log("input invalid")
//         errorElement.textContent = inputElement.validationMessage;
//         inputElement.style.setProperty("border-bottom", "1px solid red")
//        }
// }

// function validateFormLive(event) {
//    validateInput(event.target)
// }


// forms.forEach ( function (form) {
//     form.addEventListener("submit", function validateForm (event) {
//         event.preventDefault();
//         validateInput(nameInput)
//         validateInput(aboutInput)
//         validateInput(cardTitleInput)
//         validateInput(cardPhotoInput)
//        if (form.checkValidity()) {
//         console.log("valid")
//         form.reset()
//        }
//        else {
       
  
//        }
//     })
//     form.addEventListener("input", validateFormLive)
// })

// // выфвфывфывфывфывфывфыв

// function validateInput(inputElement, form) {
//     const errorElement = document.querySelector(`#${inputElement.name}-error`);
//     if (inputElement.checkValidity()) {
//         console.log("input valid")
//         errorElement.textContent = "";
//        }
//        else {
//         console.log("input invalid")
//         errorElement.textContent = inputElement.validationMessage;
//         inputElement.style.setProperty("border-bottom", "1px solid red")
//        }
//     if (form.checkValidity()) {
//         submitButtonsState(true)
//     }
//     else {
//         submitButtonsState(false)
//     }
// }

// function submitButtonsState (isActive) {
//     submitButtons.forEach( function (button) {
//         if (isActive) {
//         button.classList.add("popup__save")  
//         button.classList.remove("popup__save_inactive") 
//         }
//         else {
//         button.setAttribute("disabled", true)
//         button.classList.remove("popup__save")  
//         button.classList.add("popup__save_inactive")
//         }
//     })
// }

// function validateFormLive(event) {
//    validateInput(event.target)
// }


// forms.forEach ( function (form) {
//     form.addEventListener("submit", function validateForm (event) {
//         event.preventDefault();
//         makeValidate (form)
//         console.log("makevalidate")
// })
// })

// function makeValidate (form) {
//     validateInput(nameInput, form)
//     validateInput(aboutInput, form)
//     validateInput(cardTitleInput, form)
//     validateInput(cardPhotoInput, form)
//     console.log("hi")
//    if (form.checkValidity()) {
//     console.log("valid")
//     form.reset()
//    }
//    else {
//    }
//    form.addEventListener("input", validateFormLive)
// }












































// #FF0000