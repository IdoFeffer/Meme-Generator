"use strict"

function renderMeme() {
  const meme = getMeme()

  const img = new Image()
  img.src = getImgById(meme.selectedImgId)

  img.onload = () => {
    const canvas = document.getElementById("meme-canvas")
    const ctx = canvas.getContext("2d")

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    const line = meme.lines[meme.selectedLineIdx]
    ctx.font = `${line.size}px Impact`
    ctx.fillStyle = line.color
    ctx.textAlign = "center"
    ctx.fillText(line.txt, canvas.width / 2, 50)
  }
}


// MEME TEXT EDIT 
function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}
