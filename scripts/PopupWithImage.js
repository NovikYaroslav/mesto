import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        console.log(popupSelector)
    }

    open(link, name) {
        super.open();
        console.log(this._popupSelector)
        const PopupPhoto = this._popupSelector.querySelector(".popup__photo")
        PopupPhoto.src = link;
        PopupPhoto.alt = name;
        const popupPhotoCapture = this._popupSelector.querySelector(".popup__photo-capture")
        popupPhotoCapture.textContent = name;
      }
}
