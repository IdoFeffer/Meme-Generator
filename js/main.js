"use strict"

function onInit() {
  renderGallery()
  renderMeme()

  const canvas = document.getElementById("meme-canvas")
  canvas.addEventListener("click", onCanvasClick)
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
  document.querySelector(".editor-mems").classList.add("hidden")
  document.querySelector(".gallery-layout").classList.remove("hidden")
}

function onCanvasClick(ev) {
  const canvas = document.getElementById("meme-canvas")
  const ctx = canvas.getContext("2d")
  
  const x = ev.offsetX
  const y = ev.offsetY
  const meme = getMeme()

  meme.lines.forEach ((line, idx) => {
    
    let lineY
    if (idx === 0) lineY = 50
    else if (idx === 1) lineY - canvas.height - 50
    else lineY = canvas.height / 2

    const textWidth = ctx.measureText(line.txt).width
    const textHeight = line.size + 10

    const xStart = canvas.width / 2 - textWidth / 2
    const xEnd = canvas.width / 2 + textWidth / 2
    const yStart = lineY - textHeight
    const yEnd = lineY

    if (x >= xStart && y <= xEnd && y >= yStart && y <= yEnd) {
      gMeme.selectedLineIdx = idx
      renderMeme()

      document.getElementById('line-text').value = line.txt
    }
  })
}
