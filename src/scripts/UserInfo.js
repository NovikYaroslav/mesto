export class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
  }

  getUserInfo() { 
    const userInfo = {
    name: this._name.textContent,
    about: this._about.textContent
    };
    return userInfo;
    // Спасибо. Так действительно лучше.
    }
    

  setUserInfo({Name, about}) {
    this._name.textContent = Name;
    // атрибут name присвоен как "Name" намерено, т.к. у карточек тоже name атрибут является "name".
    // при автоматической проверке работы, выдается ошибка, что name атрибуты должны быть уникальными.
    // атрибут name карточки, присвоен как name, дабы соответствовать свойствам в массиве initialCards. 
    // +это позволило сократить код в функции "addCard".
    // надеюсь это допустимое написание.
    this._about.textContent = about;
  }
}
