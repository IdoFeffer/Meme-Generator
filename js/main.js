"use strict"

function onInit() {
  renderGallery()
  renderMeme()
}

// download canvas
function onDownloadCanvas(elLink) {
  const canvas = document.getElementById("meme-canvas")
  const dataUrl = canvas.toDataURL()
  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = "my-meme.jpg"
}

// color
function onSetColor(ev) {
  const color = ev.target.value
  setLineColor(color)
  renderMeme()
}

function onBackToGallery() {
  document.querySelector('.editor-mems').classList.add('hidden')
  document.querySelector('.gallery-layout').classList.remove('hidden')
}


