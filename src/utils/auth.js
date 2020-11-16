
const TokenKey = 'X-Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function getItem(key) {
  return localStorage.getItem(key)
}

export function setItem(key, value) {
  return localStorage.setItem(key, value)
}

export function removeItem(key) {
  return localStorage.removeItem(key)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getCookiesToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setCookiesToken(token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}

export function removeCookiesToken() {
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem(TokenKey)
}
