export default class UserInfo {
    constructor ({userNameSelector, userInfoSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo(){
    const name = this._userName.textContent;
    const description = this._userInfo.textContent;

        return {name, description}
    }

    setUserInfo(newUserName, newUserInfo) {
        this._userName.textContent = newUserName;
        this._userInfo.textContent = newUserInfo;
    }
}
