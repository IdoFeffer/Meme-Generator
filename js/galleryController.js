"use strict"

function renderGallery() {
  const imgs = getImgs()
  const elGallery = document.querySelector(".gallery-layout")

  const strHTMLs = imgs.map((img) => {
    return `
        <img src="${img.url}"
        onclick="onImgSelect(${img.id})"/>
        `
  })
  elGallery.innerHTML = strHTMLs.join("")

  document.querySelector(".saved-memes").classList.add("hidden")
}

function onImgSelect(imgId) {
  setImg(imgId)
  renderMeme()

  document.querySelector(".gallery-layout").classList.add("hidden")
  document.querySelector(".editor-mems").classList.remove("hidden")
}

function onShowSavedMeme() {
  const savedMems = loadFromStorage("savedMemes") || []
  const elSaved = document.querySelector(".saved-memes")

  const strHTMLs = savedMems.map((meme, idx) => {
    const imgUrl = getImgById(meme.selectedImgId)
    return `
      <img src="${imgUrl}" onclick="onLoadSavedMeme(${idx})" />
    `
  })

  elSaved.innerHTML = strHTMLs.join("")
  elSaved.classList.remove("hidden")

  document.querySelector(".gallery-layout").classList.add("hidden")
  document.querySelector(".editor-mems").classList.add("hidden")
}

function onFilter(value) {
  if (!value) {
    renderGallery()
    return
  }

  const imgs = getImgs()
  const filteredImgs = value
    ? imgs.filter((img) => img.keywords.includes(value))
    : imgs

  const strHTMLs = filteredImgs.map((img, idx) => {
    const imgUrl = getImgById(img.id)
    return `
            <img src="${imgUrl}" onclick="onImgSelect(${img.id})" />
          `
  })
  const elGallery = document.querySelector(".gallery-layout")
  elGallery.innerHTML = strHTMLs.join("")

}
