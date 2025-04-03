"use strict"

const STORAGE_KEY = "savedMemes"
var gSavedMems = []

function saveToStorage(key, value) {
  const json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

function loadFromStorage(key) {
  const json = localStorage.getItem(key)
  return JSON.parse(json)
}

function onSaveMeme() {
  const savedMems = loadFromStorage(STORAGE_KEY) || []
  const memeCopy = JSON.parse(JSON.stringify(gMeme))

  if (gMeme.selectedImgId === -1 && gMeme.imgUrl) {
    memeCopy.imgUrl = gMeme.imgUrl
  }

  savedMems.push(memeCopy)
  saveToStorage(STORAGE_KEY, savedMems)
}

function save(userPrefs) {
  saveToStorage(STORAGE_KEY, userPrefs)
}

function get() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

function _saveMemeToStorage() {
  saveToStorage(PLACE_KEY, gMeme)
}

function onShowSavedMeme() {
  var savedMems = loadFromStorage("savedMems") || []
  const elSaved = document.querySelector(".saved-memes")

  // const strHTMLs = savedMems.map((meme, idx) => {
  //   const imgUrl = meme.uploadedImgUrl || getImgById(meme.selectedImgId)
  //   return `
  //           <img src="${imgUrl}" onclick="onLoadSavedMeme(${idx})" />
  //         `
  // })
  const strHTMLs = savedMems.map((meme, idx) => {
    console.log('🖼 imgUrl:', imgUrl)
    const imgUrl = meme.imgUrl || getImgById(meme.selectedImgId)
    if (!imgUrl) {
      console.warn(`⚠️ Missing image for meme at index ${idx}`)
      return ''
    } 
    return `
      <img src="${imgUrl}" onclick="onLoadSavedMeme(${idx})" />
    `
  })
  
  elSaved.innerHTML = strHTMLs.join("")
  elSaved.classList.remove("hidden")

  document.querySelector(".gallery-layout").classList.add("hidden")
  document.querySelector(".editor-mems").classList.add("hidden")
}

function onLoadSavedMeme(idx) {
  const savedMems = loadFromStorage("savedMemes") || []
  const memeToLoad = savedMems[idx]
  if (!memeToLoad) return console.warn("❌ Meme not found")

  gMeme = JSON.parse(JSON.stringify(memeToLoad)) 
  renderMeme()

  document.querySelector(".editor-mems").classList.remove("hidden")
  document.querySelector(".saved-memes").classList.add("hidden")
}
