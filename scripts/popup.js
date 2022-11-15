export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key == "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupSelector.querySelector(".popup__close")
    console.log(closeButton)
    closeButton.addEventListener("click", () =>
     {
        this.close();
      });
    this._popupSelector.addEventListener("click", (event) => {
        if (event.target.classList.contains("popup_opened")) {
            this.close();
          }
    });
  }
}
