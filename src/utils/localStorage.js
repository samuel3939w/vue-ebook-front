import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value) {
    return localStorage.set(key, value)
}

export function getLocalStorage(key) {
    return localStorage.get(key)
}

export function removeLocalStorage(key) {
    return localStorage.delete(key)
}

export function clearLocalStorage() {
    return localStorage.clear()
}

export function saveBookShelf(shelf){
    return setLocalStorage('shelf',shelf)
}

export function getBookShelf(){
    return getLocalStorage('shelf')
}

export function setBookObject(fileName, key, value) {
    let book = getLocalStorage(`${fileName}-info`)
    if (!book) {
        book = {}
    }
    book[key] = value
    setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject(fileName, key) {
    let book = getLocalStorage(`${fileName}-info`)
    if (!book) {
        return null
    }
    return book[key]
}

export function getLocale(){
    return getLocalStorage('locale')
}

export function saveLocale(locale){
    return setLocalStorage('locale',locale)
}

export function saveFontFamily(fileName, font) {
    setBookObject(fileName, "fontFamily", font)
}

export function getFontFamily(fileName) {
    return getBookObject(fileName, "fontFamily")
}

export function saveFontSize(fileName, fontSize) {
    setBookObject(fileName, "fontSize", fontSize)
}

export function getFontSize(fileName) {
    return getBookObject(fileName, "fontSize")
}

export function saveTheme(fileName, theme) {
    setBookObject(fileName, "theme", theme)
}

export function getTheme(fileName){
    return getBookObject(fileName,"theme")
}

export function saveLocation(fileName, location){
    setBookObject(fileName, "location", location)
}

export function getLocation(fileName){
    return getBookObject(fileName, "location")
}

export function saveReadTime(fileName, readTime){
    setBookObject(fileName, "readTime", readTime)
}

export function getReadTime(fileName){
    return getBookObject(fileName, "readTime")
}

export function saveBookmark(fileName, bookmark){
    setBookObject(fileName, "bookmark", bookmark)
}

export function getBookmark(fileName){
    return getBookObject(fileName, "bookmark")
}