export default class UserInfo {
    constructor ({userNameSelector, userInfoSelector, avatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        return {
            name: this._userName.textContent, 
            about: this._userInfo.textContent
        }
    }

    setUserInfo(newName, newDescription) {
        this._userName.textContent = newName;
        this._userInfo.textContent = newDescription;
    }


    setUserAvatar(newAvatar) {
        this._userAvatar.style.backgroundImage = `url("${newAvatar}")`;
    }

    getUserId() {
        return this._userId
    }
    
    setUserId(id) {
        this._userId = id;
    }

    
}
