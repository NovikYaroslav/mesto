const forms = document.querySelectorAll(".popup__form");
const submitButtons = document.querySelectorAll(".popup__save");


function validateInput(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.name}-error`);
    if (inputElement.checkValidity()) {
        console.log("input valid")
        errorElement.textContent = "";
       }
       else {
        console.log("input invalid")
        errorElement.textContent = inputElement.validationMessage;
        inputElement.style.setProperty("border-bottom", "1px solid red")
       }
}

function validateFormLive(event) {
   validateInput(event.target)
}


forms.forEach ( function (form) {
    form.addEventListener("submit", function validateForm (event) {
        event.preventDefault();
        validateInput(nameInput)
        validateInput(aboutInput)
        validateInput(cardTitleInput)
        validateInput(cardPhotoInput)
       if (form.checkValidity()) {
        console.log("valid")
        form.reset()
       }
       else {
       
  
       }
    })
    form.addEventListener("input", validateFormLive)
})
















































// #FF0000