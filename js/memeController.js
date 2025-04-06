"use strict"
var selectedImage = null
var gCtx


function renderMeme() {
  const meme = getMeme()
  const img = new Image()

  img.src =
    meme.selectedImgId === -1 ? meme.imgUrl : getImgById(meme.selectedImgId)
  img.onload = () => {
    const canvas = document.getElementById("meme-canvas")
    gCtx = canvas.getContext("2d")
    gCtx.drawImage(img, 0, 0, canvas.width, canvas.height)

    meme.lines.forEach((line, idx) => {
      gCtx.font = `${line.size}px ${line.font || "Impact"}`
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
  // document.querySelector(".filter-words").classList.add("hidden")
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
  console.log("📌 Add line clicked")
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
function onRemoveLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  if (gMeme.lines.length === 0) {
    gMeme.selectedLineIdx = -1
  } else {
    gMeme.selectedLineIdx = 0
  }
  renderMeme()
}

// ADD STICKER
function onAddSticker(value) {
  const newLine = {
    txt: value,
    size: 20,
    color: "white",
    pos: { x: 250, y: 250 },
    isDrag: false,
  }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  renderMeme()
}

// UPLOAD FILE FROM DEVICE
function onImgInput(ev) {
  const reader = new FileReader()

  reader.onload = function (event) {
    const img = new Image()
    img.src = event.target.result

    img.onload = () => {
      // gMeme.selectedImgId = -1
      // gMeme.imgUrl = img.src
      // drawImgOnCanvas(img)

      // const newImg = {
      //   id: gImgs.length + 1,
      //   url: img.src,
      //   keywords: ["uploaded"],
      // }

      const newImg = {
        id: gImgs.length + gUploadedImgs.length + 1,
        url: img.src,
        keywords: ['uploaded']
      }
      gUploadedImgs.push(newImg)
      gMeme.selectedImgId = newImg.id


      gImgs.push(newImg)
      saveToStorage(gImgs)
      gMeme.selectedImgId = newImg.id
      // gMeme.imgUrl = img.src
      renderMeme()
    }
  }
  reader.readAsDataURL(ev.target.files[0])
}

function drawImgOnCanvas(img) {
  const canvas = document.getElementById("meme-canvas")
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const hRatio = canvas.width / img.width
  const vRatio = canvas.height / img.height
  const ratio = Math.min(hRatio, vRatio)
  const centerShift_x = (canvas.width - img.width * ratio) / 2
  const centerShift_y = (canvas.height - img.height * ratio) / 2

  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  )
}

// Share meme 
function onShareMeme() {
  const canvas = document.getElementById("meme-canvas")
  canvas.toBlob((blob) => {
    const file = new File([blob], "my-meme.jpg", { type: "image/jpeg" })

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: "Check out my meme!",
        text: "I made this meme using Funny Memes 🤣",
        files: [file],
      })
    } else {
      alert("Sharing not supported on this device.")
    }
  }, "image/jpeg")
}

function onDeleteMeme(idx){
  const savedMemes = loadFromStorage('savedMemes') || []
  savedMemes.splice(idx, 1)
  saveToStorage('savedMemes', savedMemes)
  onShowSavedMeme()
}

////////////////////////////////////////////////
