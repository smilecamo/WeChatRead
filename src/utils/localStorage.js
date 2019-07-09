import Storage from 'web-storage-cache'

const localStorage = new Storage()

function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}

function getLocalStorage (key) {
  return localStorage.get(key)
}

// function removeLocalStorage (key) {
//   return localStorage.delete(key)
// }

// function clearLocalStorage () {
//   return localStorage.clear()
// }
// 设置保存信息
function setBookObject (fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}
// 获取保存信息
function getBookObject (fileName, key) {
  let book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}

// 保存字体设置
export function saveFontFamily (fileName, font) {
  return setBookObject(fileName, 'fontFamily', font)
}

// 获取字体设置
export function getFontFamily (fileName) {
  return getBookObject(fileName, 'fontFamily')
}
// 字号设置
export function saveFontSize (fileName, fontSize) {
  return setBookObject(fileName, 'fontSize', fontSize)
}
// 字号获取
export function getFontSize (fileName) {
  return getBookObject(fileName, 'fontSize')
}
// 主题获取
export function getTheme (fileName) {
  return getBookObject(fileName, 'theme')
}
export function saveTheme (fileName, theme) {
  return setBookObject(fileName, 'theme', theme)
}
// 语言
export function saveLocale (locale) {
  return setLocalStorage('locale', locale)
}
export function getLocale () {
  return getLocalStorage('locale')
}
