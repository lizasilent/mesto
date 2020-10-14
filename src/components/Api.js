export default class Api {
        constructor(config){
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
        }

    //проверка ответа сервера
    _getServerAnswer(res){
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }

       //получить информацию о пользователе

       getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
        })
        .then(this._getServerAnswer)
      }
      
      //подгрузить с сервера данные карточек
      getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
        .then(this._getServerAnswer)
      }
  
  
      //загрузить новую инфу о пользователе
      patchUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
          method: "PATCH",
          body: JSON.stringify({
            name: data.name,
            description: data.description,
          }),
        })
        .then(this._getServerAnswer)
      }
    
      //обновить аватар
      patchAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          headers: this._headers,
          method: "PATCH",
          body: JSON.stringify({
            avatar: data.avatar,
          }),
        })
        .then(this._getServerAnswer)
      }
    

      //добавить новую карточку
      postNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
          method: "POST",
          body: JSON.stringify({
            name: data.name,
            link: data.link,
          }),
        })
        .then(this._getServerAnswer)
      }
      
      //удалить карточку
      deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          headers: this._headers,
          method: "DELETE",
        })
        .then(this._getServerAnswer)
      }
  
      //поставить лайк
      putlike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: "PUT",
          headers: this._headers,
        })
        .then(this._getServerAnswer)
      }
  
      //снять лайк
      deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
        })
        .then(this._getServerAnswer)
      }
  
    }
  