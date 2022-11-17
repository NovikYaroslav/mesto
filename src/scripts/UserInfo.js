export class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
     // к сожалению, я не понимаю, как обойтись без сохранения обьекта, т.к. без него данные не сохраняются. 
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.about = this._about.textContent;
    return this._userInfo;
  }

  setUserInfo(profilePopupInputsData) {
    this._name.textContent = profilePopupInputsData.name;
    this._about.textContent = profilePopupInputsData.about;
  }
}
