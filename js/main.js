"use strict"
let gLastPos
var gIsMouseDown = false
var gElCanvas = document.getElementById("meme-canvas")

function onInit() {
  gElCanvas = document.getElementById("meme-canvas")
  gCtx = gElCanvas.getContext("2d")

  renderGallery()
  gElCanvas.addEventListener("click", onCanvasClick)

  gElCanvas.addEventListener("mousedown", onDown)
  gElCanvas.addEventListener("mousemove", onMove)
  gElCanvas.addEventListener("mouseup", onUp)

  gElCanvas.addEventListener("touchstart", onDown, { passive: false })
  gElCanvas.addEventListener("touchmove", onMove, { passive: false })
  gElCanvas.addEventListener("touchend", onUp)
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
  document.querySelector(".editor-mems").classList.add("hidden")
  document.querySelector(".gallery-layout").classList.remove("hidden")
}

// Canvas clicks
function onCanvasClick(ev) {
  const canvas = document.getElementById("meme-canvas")
  const ctx = canvas.getContext("2d")

  const x = ev.offsetX
  const y = ev.offsetY
  const meme = getMeme()
  // const prevColor = meme.lines[meme.selectedLineIdx].color

  meme.lines.forEach((line, idx) => {
    ctx.font = `${line.size}px Impact`
    const textWidth = ctx.measureText(line.txt).width
    const textHeight = line.size + 10

    const xStart = line.pos.x - textWidth / 2
    const xEnd = line.pos.x + textWidth / 2
    const yStart = line.pos.y - textHeight + 10
    const yEnd = line.pos.y

      if (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd) {
      meme.selectedLineIdx = idx
      renderMeme()

      document.getElementById("line-text").value = line.txt
    }
  })
}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container")
  gElCanvas.width = elContainer.clientWidth

  if (gElImg) {
    gElCanvas.height =
      (gElImg.naturalHeight / gElImg.naturalWidth) * gElCanvas.width
  } else {
    gElCanvas.height = gElCanvas.width
  }
}

// Move text with mouse/touche

function getEvPos(ev) {
  const rect = gElCanvas.getBoundingClientRect()

  let clientX, clientY
  if (ev.type.startsWith("touch")) {
    ev.preventDefault()
    const touch = ev.changedTouches[0]
    clientX = touch.clientX
    clientY = touch.clientY
  } else {
    clientX = ev.clientX
    clientY = ev.clientY
  }

  const scaleX = gElCanvas.width / rect.width
  const scaleY = gElCanvas.height / rect.height

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  }
}

function onDown(ev) {
  const pos = getEvPos(ev)
  gElCanvas.style.cursor = "grabbing"


  if (ev.type === "mousedown") ev.preventDefault()

  const lineIdx = getLineClickedIdx(pos)
  if (lineIdx === -1) return

  gMeme.selectedLineIdx = lineIdx
  gMeme.lines[lineIdx].isDrag = true
  gLastPos = pos
  gElCanvas.style.cursor = "grab"
}

function onMove(ev) {

  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (!line.isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gLastPos.x
  const dy = pos.y - gLastPos.y

  line.pos.x += dx
  line.pos.y += dy
  gLastPos = pos
  getEvPos(ev)
  renderMeme()
}

function onUp() {
  
  gIsMouseDown = false

  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (line) line.isDrag = false
  document.body.style.cursor = "grab"
}

function getLineClickedIdx(pos) {
  const canvas = document.getElementById("meme-canvas")
  const ctx = canvas.getContext("2d")

  for (let i = 0; i < gMeme.lines.length; i++) {
    const line = gMeme.lines[i]

    if (!line.pos || !line.txt) continue

    ctx.font = `${line.size}px Impact`
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    const textWidth = ctx.measureText(line.txt).width
    const textHeight = line.size + 10

    const xStart = line.pos.x - textWidth / 2
    const xEnd = line.pos.x + textWidth / 2
    const yStart = line.pos.y - textHeight / 2
    const yEnd = line.pos.y + textHeight / 2

    if (pos.x >= xStart && pos.x <= xEnd && pos.y >= yStart && pos.y <= yEnd) {
      return i
    }
  }
  return -1
}

function onSetFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font
  renderMeme()
}

function onMoveText(direction) {
  const line = gMeme.lines[gMeme.selectedLineIdx]

  if (direction === "left") line.pos.x -= 10
  else if (direction === "right") line.pos.x += 10
  else if (direction === "center") {
    const canvas = document.getElementById("meme-canvas")
    line.pos.x = canvas.width / 2
  } else if (direction === "up") line.pos.y -= 5
  else if (direction === "down") line.pos.y += 5

  renderMeme()
}

function onRandomMeme() {
  const imgs = getImgs()
  const randomImg = imgs[Math.floor(Math.random() * imgs.length)]
  gMeme.selectedImgId = randomImg.id

  gMeme.lines = [
    {
      txt: "Surprise!",
      size: 30,
      color: "blue",
      font: "Impact",
      pos: { x: 250, y: 50 },
      isDrag: false,
    },
  ]
  gMeme.selectedLineIdx = 0

  document.querySelector(".gallery-layout").classList.add("hidden")
  document.querySelector(".editor-mems").classList.remove("hidden")
  renderMeme()
}

// function onKeywords() {
//   const elKeywords = document.querySelector(".keywords-container")
//   const strHTMLs = Object.entries(keywords).map(([word, count]) => {
//     return `
//     <span onclick="onKeywordClick('${word}')"
//           style='font-size: ${count + 12}px'>${word}
//     </span>
//     `
//   })
//   elKeywords.innerHTML = strHTMLs.join("")
//   // document.querySelector(".keywords-container").classList.add("block")
// }

function onKeywordClick(word){
  keywords[word]++

  const filterImg = getImgs().filter(img.keywords.includes(word))
  renderGallery()
  if (!keywords[word]) keywords[word] = 1
  else keywords[word]++
}

function toggleMenu() {
  document.body.classList.toggle("menu-open")
}

function toggleModal() {
  document.querySelector(".modal").classList.toggle("hidden")
}

function dropdowntoggle() {
  document.querySelectorAll(".dropdown-toggle")
}
