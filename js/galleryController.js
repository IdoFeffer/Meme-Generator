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
}

var gImgs = [
  { id: 1, url: "img/meme-imgs(square)/1.jpg", keywords: ["funny", "idea"] },
  { id: 2, url: "img/meme-imgs(square)/2.jpg", keywords: ["funny", "dog"] },
]

function onImgSelect(imgId){
    setImg (imgId)
    renderMeme()
}