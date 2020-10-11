class Api {
        components(config){
    this._url = config.baseUrl;
    this.headers = config.headers;
        }

    //проверка ответа сервера
    _serverAnswer(res){
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      
      //подгрузить с сервера данные карточек
      getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
        })
        .then(this._serverAnswer)
      }
  
      //подгрузить информацию о пользователе с сервера
      getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
        })
        .then(this._serverAnswer)
      }
  
      //загрузить новую инфу о пользователе
      patchUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
          method: "PATCH",
          body: JSON.stringify({
            name: data.name,
            about: data.about,
          }),
        })
        .then(this._serverAnswer)
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
        .then(this._serverAnswer)
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
        .then(this._serverAnswer)
      }
      
      //удалить карточку
      deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          headers: this._headers,
          method: "DELETE",
        })
        .then(this._serverAnswer)
      }
  
      //поставить лайк
      putlike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: "PUT",
          headers: this._headers,
        })
        .then(this._serverAnswer)
      }
  
      //снять лайк
      deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
        })
        .then(this._serverAnswer)
      }
  
    }
  