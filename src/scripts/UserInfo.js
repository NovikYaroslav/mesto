export class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(userAvatarSelector)
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  getUserAvatar() {
    return this._avatar.src;
  }

  setUserInfo({ userName, about, avatar, _id }) {
    this._name.textContent = userName;
    this._about.textContent = about;
    if (avatar) {
      this._avatar.src = avatar
    }
  }

  setUserAvatar(avatarLink) {
    this._avatar.src = avatarLink.link;
  }

}
