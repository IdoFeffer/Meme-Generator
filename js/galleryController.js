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


function onImgSelect(imgId) {
  setImg(imgId)
  renderMeme()
  
  document.querySelector(".gallery-layout").classList.add("hidden")
  document.querySelector(".editor-mems").classList.remove("hidden")
  
}
