"use strict"

function renderMeme() {
  const meme = getMeme()

  const img = new Image()
  img.src = getImgById(meme.selectedImgId)

  img.onload = () => {
    const canvas = document.getElementById("meme-canvas")
    const ctx = canvas.getContext("2d")

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // const line = meme.lines[meme.selectedLineIdx]
    meme.lines.forEach((line, idx) => {
      var y
      ctx.font = `${line.size}px Impact`
      ctx.fillStyle = line.color
      ctx.textAlign = "center"

      if (idx === 0) y = 50
      else if (idx === 1) y = canvas.height - 50
      else y = canvas.height / 2
      ctx.fillText(line.txt, canvas.width / 2, y)

      if (idx === meme.selectedLineIdx) {
        const textMetrics = ctx.measureText(line.txt)

        const width = textMetrics.width
        const height = line.size + 10
        const x = canvas.width / 2 - width / 2
        const rectY = y - height + 10

        ctx.strokeStyle = "blue"
        ctx.strokeRect(x, rectY, width, height)
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
  document.getElementById('line-text').value = line.txt

  renderMeme()
}
