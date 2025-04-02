"use strict"

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    { txt: "Top text", size: 30, color: "white" },
    { txt: "Bottom text", size: 30, color: "yellow" }
  ]
}

// var gImgs = [
//   { id: 1, url: 'img/meme-imgs(square)/1.jpg', keywords: ["funny", "cat"] },
//   { id: 2, url: "img/2.jpg", keywords: ["baby", "cute"] },
// ]

function getMeme() {
  return gMeme
}

function getImgs(){
  return gImgs
}

function getImgById(id){
    const img = gImgs.find(img => img.id === id)
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

function addLine(){
  const newLine = {
    txt: 'New line',
    size: 20,
    color: 'white'
  }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}