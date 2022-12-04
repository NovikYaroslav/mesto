export class Api {
  constructor({ url, teamId, headers }) {
    this._url = url;
    this._headers = headers;
    this._teamId = teamId;
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        `Ошибка: ${response.status} ${response.statusText}`
      );
    }
  }

  getCards() {
    return fetch(`${this._url}/v1/${this._teamId}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => {
      return this._checkServerResponse(response);
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
      return this._checkServerResponse(response);
    });
  }

  getUserInfoFromServer() {
    return fetch(`${this._url}/v1/${this._teamId}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => {
      return this._checkServerResponse(response);
    });
  }

  editUserInfo(profileData) {
    return fetch(`${this._url}/v1/${this._teamId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${profileData.userName}`,
        about: `${profileData.about}`,
      }),
    }).then((response) => {
      return this._checkServerResponse(response);
    });
  }

  editUserAvatar(avatar) {
    return fetch(`${this._url}/v1/${this._teamId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatar.avatarLink}`,
      }),
    }).then((response) => {
      return this._checkServerResponse(response);
    });
  }

  setCardLike(cardId) {
    return fetch(`${this._url}/v1/${this._teamId}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((response) => {
      return this._checkServerResponse(response);
    });
  }

  deleteCardLike(cardId) {
    return fetch(`${this._url}/v1/${this._teamId}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then((response) => {
      return this._checkServerResponse(response);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/v1/${this._teamId}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((response) => {
      return this._checkServerResponse(response);
    });
  }
}
