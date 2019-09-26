const TokenKey = 'my-manager-accessToken'

export function getToken() {
    let jsonStr = localStorage.getItem(TokenKey);
    if (!jsonStr) {
        return null;
    }
    let dataObj = JSON.parse(localStorage.getItem(TokenKey));
    if (new Date().getTime() > dataObj.time) {
        localStorage.removeItem(TokenKey);
        return null;
    } else {
        return dataObj.data
    }
}

export function setToken(token) {
    let currentTime = new Date().getTime();
    // 设置过期时间 (30分钟)
    let pastTime = 30 * 60 * 1000;
    return localStorage.setItem(TokenKey, JSON.stringify({data: token, time: currentTime + pastTime}))
}

export function removeToken() {
    return localStorage.removeItem(TokenKey)
}
