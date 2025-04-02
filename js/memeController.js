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

    meme.lines.forEach((line, idx) => {
      
      gCtx.font = `${line.size}px ${line.font || 'Impact'}`
      gCtx.textAlign = "center"
      gCtx.textBaseline = "middle"

      gCtx.fillStyle = line.color
      gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    
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
  const meme = getMeme()
  const prevColor = meme.lines[meme.selectedLineIdx].color
  
  switchLine()

  const newLine = meme.lines[meme.selectedLineIdx]
  newLine.color = prevColor

  document.getElementById("line-text").value = newLine.txt
  renderMeme()
}

// REMOVE 
function onRemoveLine(){
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  if (gMeme.lines.length === 0){
    gMeme.selectedLineIdx = -1
  } else {
    gMeme.selectedLineIdx = 0
  }
  renderMeme()
}