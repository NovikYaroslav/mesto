export class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo({ userName, about }) {
    this._name.textContent = userName;
    this._about.textContent = about;
  }
}
