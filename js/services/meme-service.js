"use strict"

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Top text",
      size: 20,
      color: "white",
      pos: { x: 250, y: 50 },
      isDrag: false,
    },
    {
      txt: "Bottom text",
      size: 20,
      color: "white",
      pos: { x: 250, y: 250 },
      isDrag: false,
    },
  ],
}

var gImgs = [
  { id: 1, url: "img/meme-imgs(square)/1.jpg", keywords: ["funny", "trump"] },
  { id: 2, url: "img/meme-imgs(square)/2.jpg", keywords: ["baby", "dog"] },
  { id: 3, url: "img/meme-imgs(square)/3.jpg", keywords: ["dog", "baby"] },
  { id: 4, url: "img/meme-imgs(square)/4.jpg", keywords: ["cat", "cute"] },
  { id: 5, url: "img/meme-imgs(square)/5.jpg", keywords: ["baby", "funny"] },
  { id: 6, url: "img/meme-imgs(square)/6.jpg", keywords: ["surprised", "man"] },
  {
    id: 7,
    url: "img/meme-imgs(square)/7.jpg",
    keywords: ["baby", "surprised"],
  },
  { id: 8, url: "img/meme-imgs(square)/8.jpg", keywords: ["surprised", "man"] },
  { id: 9, url: "img/meme-imgs(square)/9.jpg", keywords: ["baby", "cool"] },
  { id: 10, url: "img/meme-imgs(square)/10.jpg", keywords: ["obama", "funny"] },
  { id: 11, url: "img/meme-imgs(square)/11.jpg", keywords: ["funny", "kiss"] },
  { id: 12, url: "img/meme-imgs(square)/12.jpg", keywords: ["you", "point"] },
  {
    id: 13,
    url: "img/meme-imgs(square)/13.jpg",
    keywords: ["movie", "you"],
  },
  { id: 14, url: "img/meme-imgs(square)/14.jpg", keywords: ["matrix", "cool"] },
  { id: 15, url: "img/meme-imgs(square)/15.jpg", keywords: ["funny", "man"] },
  { id: 16, url: "img/meme-imgs(square)/16.jpg", keywords: ["happy", "man"] },
  { id: 17, url: "img/meme-imgs(square)/17.jpg", keywords: ["putin", "funny"] },
  { id: 18, url: "img/meme-imgs(square)/18.jpg", keywords: ["toy", "buzz"] },
]

const userService = {
  save,
  get,
}

const keywords = {
  funny: 12,
  baby: 5,
  cat: 3,
  dog: 8,
}

function getMeme() {
  return gMeme
}

function getImgs() {
  // return gImgs
  return [...gImgs, ...gUploadedImgs]
}

function getImgById(id) {
  const img = gImgs.find((img) => img.id === id)
  if (!img) return ``
  return img.url
}

// TEXT EDIT
function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

// SELECT IMG FROM GALLERY
function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

// TEXT LINE COLOR
function setLineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

// FONT SIZE
function changeFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff
}

// ADD LINE
function addLine() {
  const newLine = {
    txt: "New line",
    size: 20,
    color: "white",
    pos: { x: 250, y: 250 },
    isDrag: false,
  }

  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

// SWITCH LINE
function switchLine() {
  var currIdx = gMeme.selectedLineIdx

  var nextIdx = (currIdx + 1) % gMeme.lines.length
  gMeme.selectedLineIdx = nextIdx
}

// TODO
function renderSavedMemes() {
  const savedMems = loadFromStorage("savedMems") || []
  const elSaved = document.querySelector(".saved-memes")

  const strHTMLs = savedMems.map((meme, idx) => {
    const imgUrl = meme.imgUrl || getImgById(meme.selectedImgId)
    if (!imgUrl) return ""

    return `
      <div class="saved-meme-preview">
        <img src="${imgUrl}" onclick="onLoadSavedMeme(${idx})" />
        <button class="deleted-btn" onclick="onDeleteMeme(${idx})">🗑️ Delete</button>
      </div>
    `
  })

  elSaved.innerHTML = strHTMLs.join("")
}

function onDeleteMeme(idx) {
  const savedMems = loadFromStorage("savedMems") || []
  savedMems.splice(idx, 1)
  saveToStorage("savedMems", savedMems)
  renderSavedMemes()
}
