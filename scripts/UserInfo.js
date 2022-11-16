export class UserInfo {
  constructor({ name, about }) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.about = this._about.textContent;
    return this._userInfo;
  }

  setUserInfo(nameInput, aboutInput) {
    this._name.textContent = nameInput.value;
    this._about.textContent = aboutInput.value;
  }
}
