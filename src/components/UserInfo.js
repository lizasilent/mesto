export default class UserInfo {
    constructor ({userNameSelector, userInfoSelector, avatarSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this.userAvatar = document.querySelector(avatarSelector);

    }

    getUserInfo(){
        return {name: this._userName.textContent, 
            description: this._userInfo.textContent}
    }

    setUserInfo({name, description}) {
        this._userName.textContent = name;
        this._userInfo.textContent = description;
        this.userAvatar.src = avatar;
    }
}
