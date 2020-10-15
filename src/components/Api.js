export default class Api {
        constructor(config){
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
        }

        getInitialCards() {
          return this._fetch('/cards', 'GET')
      }
  
      addUserCard(values) {
          return this._fetch('/cards', 'POST', JSON.stringify({
              name: values.place,
              link: values.link
          }))
      }
  
      takeCardLike(cardId) {
          return this._fetch(`/cards/likes/${cardId}`, 'PUT')
      }
  
      removeCardLke(cardId) {
          return this._fetch(`/cards/likes/${cardId}`, 'DELETE')
      }
  
      delCard(cardId) {
          return this._fetch(`/cards/${cardId}`, 'DELETE')
      }
  
      getUserData() {
          return this._fetch('/users/me', 'GET')
      }
  
      patchUserData(values) {
          return this._fetch('/users/me', 'PATCH', JSON.stringify({
              name: values.name,
              about: values.job
          }))
  
      }
  
      patchUserAvatar(values) {
          return this._fetch('/users/me/avatar', 'PATCH', JSON.stringify({
              avatar: values.link
          }))
      }
  
      _fetch(url, method, body) {
          return fetch(this._baseUrl + url, {
              method: method,
              headers:
              this._headers,
              body: body
          }).then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
          });
      }
  }
  
  