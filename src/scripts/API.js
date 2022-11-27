export default class Api {
  constructor({ url, teamId, headers }) {
    this._url = url;
    this._headers = headers;
    this._teamId = teamId;
  }

  getCards() {
    return fetch(`${this._url}/v1/${this._teamId}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
      }
    });
  }
  addCards(newCardData) {
    return fetch(`${this._url}/v1/${this._teamId}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: `${newCardData.name}`,
        link: `${newCardData.link}`,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json();
      } else {
        Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
      }
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/v1/${this._teamId}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
      }
    });
  }

  editUserInfo(profileData) {
    console.log(profileData)
    fetch(`${this._url}/v1/${this._teamId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${profileData.userName}`,
        about: `${profileData.about}`,
      }),
    });
  }

  likeCard() {}

  deleteCard() {
    return fetch(
      `${this._url}/v1/${this._teamId}/cards/638384ccb1cbff185a85408f`,
      {
        headers: this._headers,
        method: "DELETE",
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
      }
    });
  }
}
