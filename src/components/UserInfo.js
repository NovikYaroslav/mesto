export class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo({ userName, about, avatar }) {
    if (userName) {
      this._name.textContent = userName;
    }
    if (about) {
      this._about.textContent = about;
    }
    if (avatar) {
      this._avatar.src = avatar;
    }
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar.avatarLink;
  }
}
