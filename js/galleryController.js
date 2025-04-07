"use strict"

function renderGallery() {
  const imgs = getImgs()
  const elGallery = document.querySelector(".gallery-layout")

  const strHTMLs = imgs.map((img) => {
    return `
        <img src="${img.url}"onclick="onImgSelect(${img.id})"/>
        `
  })
  elGallery.innerHTML = strHTMLs.join("")

  document.querySelector(".filter-words").classList.remove("hidden")
  document.querySelector(".filters").classList.remove("hidden")
  document.querySelector(".surprise").classList.remove("hidden")
  document.querySelector(".keywords-container").classList.remove("hidden")
  document.querySelector(".btn-clear").classList.remove("hidden")
  document.querySelector(".surprise").classList.remove("hidden")  
}

function onImgSelect(imgId) {
  setImg(imgId)
  renderMeme()
  
  document.querySelector(".gallery-layout").classList.add("hidden")
  document.querySelector(".keywords-container").classList.add("hidden")
  document.querySelector(".btn-clear").classList.add("hidden")
  document.querySelector(".file-btn").classList.add("hidden")
  document.querySelector(".surprise").classList.add("hidden")
  document.querySelector(".btn-clear").classList.add("hidden")
  document.querySelector(".filter-words").classList.add("hidden")


  document.querySelector(".editor-mems").classList.remove("hidden")
}

function onShowSavedMeme() {
  const savedMems = loadFromStorage("savedMemes") || []
  const elSaved = document.querySelector(".saved-memes")
  
  const strHTMLs = savedMems.map((meme, idx) => {
    const imgUrl = getImgById(meme.selectedImgId)
    return `
    <div class="saved-meme-wrapper">
    <img src="${imgUrl}" onclick="onLoadSavedMeme(${idx})" />
    <button onclick="onDeleteMeme(${idx})" class="btn-delete">🗑️</button>
    </div>
    `
  })
  
  elSaved.innerHTML = strHTMLs.join("")
  elSaved.classList.remove("hidden")
  
  document.querySelector(".gallery-layout").classList.add("hidden")
  document.querySelector(".editor-mems").classList.add("hidden")
  document.querySelector(".filter-words").classList.add("hidden")
  document.querySelector(".keywords-container").classList.add("hidden")
  document.querySelector(".file-btn").classList.add("hidden")
  document.querySelector(".btn-clear").classList.add("hidden")
  document.querySelector(".surprise").classList.add("hidden")

}

function onFilter(value) {
  if (!value) {
    renderGallery()
    return
  }
  const imgs = getImgs()
  const filteredImgs = imgs.filter((img) =>
    img.keywords.some((keyword) =>
      keyword.toLowerCase().includes(value.toLowerCase())
    )
  )

  const strHTMLs = filteredImgs.map((img) => {
    const imgUrl = getImgById(img.id)
    return `
            <img src="${imgUrl}" onclick="onImgSelect(${img.id})" />
          `
  })
  const elGallery = document.querySelector(".gallery-layout")
  elGallery.innerHTML = strHTMLs.join("")

}
