'use strict'
const gEmojis = ['🤣', '🥸', '😅', '🥴', '🥹', '😫', '😤', '🤪', '😵‍💫', '😨']
var gPageIdx = 0
var gCtx
var gCurrShape = 'rect'
var gMemes
const PAGE_SIZE = 3
var gKeywordSearchCountMap = {
  funny: 1,
  dog: 1,
  politics: 1,
  cute: 1,
  baby: 1,
  dog: 1,
  sleep: 1,
  cat: 1,
  happy: 1,
  man: 1,
  confused: 1,
  surprise: 1,
  creepy: 1,
  awkward: 1,
} 

var gImgs = [
  { id: 1, url: 'meme-imgs (square)/1.jpg', keywords: ['funny', 'politics'] },
  { id: 2, url: 'meme-imgs (square)/2.jpg', keywords: ['cute', 'dog'] },
  { id: 3, url: 'meme-imgs (square)/3.jpg', keywords: ['baby', 'dog'] },
  { id: 4, url: 'meme-imgs (square)/4.jpg', keywords: ['sleep', 'cat'] },
  { id: 5, url: 'meme-imgs (square)/5.jpg', keywords: ['baby', 'happy'] },
  { id: 6, url: 'meme-imgs (square)/6.jpg', keywords: ['man', 'confused'] },
  { id: 7, url: 'meme-imgs (square)/7.jpg', keywords: ['baby', 'surprise'] },
  { id: 8, url: 'meme-imgs (square)/8.jpg', keywords: ['man', 'creepy'] },
  { id: 9, url: 'meme-imgs (square)/9.jpg', keywords: ['baby', 'funny'] },
  { id: 10, url: 'meme-imgs (square)/10.jpg', keywords: ['politics', 'funny'] },
  { id: 11, url: 'meme-imgs (square)/11.jpg', keywords: ['man', 'awkward'] },
  { id: 12, url: 'meme-imgs (square)/12.jpg', keywords: ['man', 'famous'] },
  { id: 13, url: 'meme-imgs (square)/13.jpg', keywords: ['man', 'famous'] },

]
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  font: 'Arial',
  lines: [
    {
      txt: 'Change meme text',
      size: 40,
      align: 'left',
      color: 'black',
      diff: 0,
      x: 50,
      y: 50,
      isDrag: false,
    },
  ],
}

function resetMeme() {
  gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'Change meme text ',
        size: 40,
        align: 'left',
        color: 'black',
        diff: 0,
        x: 50,
        y: 50,
        isDrag: false,
      },
    ],
  }
}



function setMeme(ImgId, lineIdx, allLines) {
  gMeme = {
    selectedImgId: ImgId,
    selectedLineIdx: lineIdx,
    lines: allLines,
  }
  console.log('gMeme', gMeme)
}

function setImg(id) {
  gMeme.selectedImgId = id
}



function setLineTxt(newTxt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function addLine(txt = 'type...') {
  gMeme.lines.push({
    txt: txt,
    size: 40,
    align: 'center',
    color: 'black',
    diff: 0,
    x: 200,
    y: 200,
    isDrag: false,
  })
}

function deleteLine() {
  if (gMeme.lines.length === 1) return
  gMeme.lines.splice(gMeme.lines.length - 1, 1)
}

function removeLine() {
  if (gMeme.lines.length === 1) return
  gMeme.lines.splice(gMeme.lines.length - 1, 1)
}

function changeAlign(align) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  const txtWidth = gCtx.measureText(line.txt).width

  switch (align) {
    case 'left':
      if (gMeme.selectedLineIdx === 0) line.x = 50
      else line.x = 150
      break

    case 'right':
      line.x = gElCanvas.height - txtWidth
      break

    default:
      line.x = gElCanvas.height / 2 - txtWidth / 2
      break
  }
}

function switchLine() {
  if (gMeme.lines.length === 1) return
  if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
  else if (gMeme.selectedLineIdx === gMeme.lines.length - 1)
    gMeme.selectedLineIdx = 0
}

function isLineClicked(clickedPos) {
  const line = getCurrLine()
  const metrics = gCtx.measureText(line.txt)
  const txtWidth = metrics.width
  const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent

  const { x, y } = line

  if (
    gMeme.selectedLineIdx === 0 &&
    clickedPos.x >= x &&
    clickedPos.x <= x + txtWidth &&
    clickedPos.y <= y + fontHeight / 2 &&
    clickedPos.y >= y
  )
    return true
  if (
    gMeme.selectedLineIdx !== 0 &&
    clickedPos.x >= x - txtWidth / 2 &&
    clickedPos.x <= x + txtWidth / 2 &&
    clickedPos.y >= y - fontHeight / 2 &&
    clickedPos.y <= y + fontHeight / 2
  )
    return true
}

function setLineDrag(isDrag) {
  const line = getCurrLine()
  line.isDrag = isDrag
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function randomMeme() {
  console.log('randommemem');
  gMeme.selectedImgId = getRandomIntInclusive(1, gImgs.length - 1)
  if (Math.random() > 0.5) {
    addLine()
    setTxtPos(1)
  }
  gMeme.lines.forEach(line => {
    line.txt = makeLorem(3)
    line.size = getRandomIntInclusive(30, 45)
    line.color = getRandomColor()
  })
}

function changeFontName(fontName) {
  gMeme.font = fontName
}

function setColor(newColor) {
  gMeme.lines[gMeme.selectedLineIdx].color = newColor
}
function changeFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function getEmojis() {
  const startIdx = gPageIdx * PAGE_SIZE
  return gEmojis.slice(startIdx, startIdx + 3)
}

function getLineTxt() {
  const idx = gMeme.selectedLineIdx
  return gMeme.lines[idx].txt
}

function getLine(idx) {
  return gMeme.lines[idx]
}

function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getMeme() {
  return gMeme
}

function getKeywords() {
  return gKeywordSearchCountMap
}
