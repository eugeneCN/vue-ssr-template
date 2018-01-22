export function toUpperCase(str) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase())
}

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(c) {
    return (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  })
}

export function parseCookie(cookies) {
  var cookie = ''
  Object.keys(cookies).forEach(item => {
    cookie += `${item}=${cookies[item]};`
  })
  return cookie
}
