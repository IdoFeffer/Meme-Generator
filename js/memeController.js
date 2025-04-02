"use strict"

var gCtx

function renderMeme() {
  const meme = getMeme()

  const img = new Image()
  img.src = getImgById(meme.selectedImgId)

  img.onload = () => {
    const canvas = document.getElementById("meme-canvas")
    const gCtx = canvas.getContext("2d")

    gCtx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // const line = meme.lines[meme.selectedLineIdx]
    meme.lines.forEach((line, idx) => {
      gCtx.font = `${line.size}px Impact`
      gCtx.fillStyle = line.color
      gCtx.textAlign = "center"
      gCtx.fillText(line.txt, line.pos.x, line.pos.y)

      // const x = line.pos.x
      // const y = line.pos.y
    
      if (idx === meme.selectedLineIdx) {
        const textMetrics = gCtx.measureText(line.txt)
        const width = textMetrics.width
        const height = line.size + 10
        const x = line.pos.x - width / 2
        const rectY = line.pos.y - height + 10

        gCtx.strokeStyle = "blue"
        gCtx.strokeRect(x, rectY, width, height)
      }
    })
  }
}

// MEME TEXT EDIT
function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

// FONT SIZE
function onChangeFontSize(diff) {
  changeFontSize(diff)
  renderMeme()
}

// ADD LINE
function onAddLine() {
  addLine()
  renderMeme()
}

// SWITCH LINES
function onSwitchLine() {
  switchLine()

  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  document.getElementById("line-text").value = line.txt

  renderMeme()
}
