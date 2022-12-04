import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector(".popup__photo");
    this._popupPhotoCapture = this._popup.querySelector(
      ".popup__photo-capture"
    );
  }

  open(link, name) {
    super.open();
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupPhotoCapture.textContent = name;
  }
}
