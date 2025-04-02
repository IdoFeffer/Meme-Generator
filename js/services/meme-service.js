"use strict"

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Your text here",
      size: 20,
      color: "blue",
    },
  ],
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

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff
}