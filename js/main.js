"use strict"

let gLastPos
var gIsMouseDown = false
var gElCanvas = document.getElementById("meme-canvas")

function onInit() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")


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
  document.querySelector(".editor-mems").classList.add("hidden")
  document.querySelector(".gallery-layout").classList.remove("hidden")
}

function onCanvasClick(ev) {
  const canvas = document.getElementById("meme-canvas")
  const ctx = canvas.getContext("2d")

  const x = ev.offsetX
  const y = ev.offsetY
  const meme = getMeme()

  meme.lines.forEach((line, idx) => {
    let lineY
    if (idx === 0) lineY = 50
    else if (idx === 1) lineY = canvas.height - 50
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
////////////////////////////////////
function getEvPos(ev) {
  const TOUCH_EVS = ["touchstart", "touchmove", "touchend"]
  let pos

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    }
  } else {
    pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }
  }
  return pos
}

function onDown(ev) {
  if (ev.type === 'mousedown') ev.preventDefault()

  const pos = getEvPos(ev)
  const lineIdx = getLineClickedIdx(pos)
  if (lineIdx === -1) return

  console.log('drag started for line', lineIdx)

  gMeme.selectedLineIdx = lineIdx
  gMeme.lines[lineIdx].isDrag = true
  gLastPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  
  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (!line.isDrag) return
  
  const pos = getEvPos(ev)
  const dx = pos.x - gLastPos.x
  const dy = pos.y - gLastPos.y
  
  console.log('before:', line.pos)
  line.pos.x += dx
  line.pos.y += dy

  console.log('Δx:', dx, 'Δy:', dy)
  gLastPos = pos
  renderMeme()
}

function onUp() {
  // if (ev.type === 'mousedown') ev.preventDefault()
  gIsMouseDown = false

  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (line) line.isDrag = false
  document.body.style.cursor = 'grab'
}

function getLineClickedIdx(pos) {
  const canvas = document.getElementById("meme-canvas")
  const ctx = canvas.getContext("2d")

  for (let i = 0; i < gMeme.lines.length; i++) {
    const line = gMeme.lines[i]

    if (!line.pos || !line.txt) continue

    ctx.font = `${line.size}px Impact`
    const textWidth = ctx.measureText(line.txt).width
    const textHeight = line.size + 10

    const xStart = line.pos.x - textWidth / 2
    const xEnd = line.pos.x + textWidth / 2
    const yStart = line.pos.y - textHeight + 10
    const yEnd = line.pos.y

    if (pos.x >= xStart && pos.x <= xEnd
      && pos.y >= yStart && pos.y <= yEnd) {
      return i
    }
  }
  return -1
}
