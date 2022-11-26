export default class Api {
    constructor({ url, teamId, headers }) {
        this._url = url
        this._headers = headers
        this._teamId = teamId
    }


getCards() {
    return fetch(`${this._url}/v1/${this._teamId}/cards`, {
        headers: this._headers,
        method: "GET",
    })
      .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            Promise.reject(`Ошибка: ${response.status} ${response.statusText}`)
          }
      })
}
addCards() {}
deleteCard() {}
likeCard() {}
getUserInfo() {}


}