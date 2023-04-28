'use strict'

var gElCanvas


const MEMES_DB = 'memes'

function onInit() {
  onShowImgGallery()
  
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  addListeners()
}

function renderMeme() {
  const meme = getMeme()
  let currImg = getImageById(meme.selectedImgId)
  const img = new Image()
  img.src = currImg.url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    gMeme.lines.forEach((line, idx) =>
      drawText(line.txt, line.color, line.size, meme.font, line.align, idx)
    )
    changeInputTxt()
  }
}

function drawText(text, color, size, font = 'times', align, lineIdx) {
  const meme = getMeme()
  gCtx.lineWidth = 1
  gCtx.strokeStyle = `white`
  gCtx.fillStyle = `${color}`
  gCtx.font = `${size}px ${font}`
  gCtx.textAlign = `${align}`
  gCtx.textBaseline = 'middle'

  const x = meme.lines[lineIdx].x
  const y = meme.lines[lineIdx].y
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}


function onLineHeightChange(diff) {
  const meme = getMeme()
  const lineIdx = meme.selectedLineIdx
  const line = getLine(lineIdx)
  line.diff += diff
  setTxtPos(lineIdx)
  renderMeme()
}


function setTxtPos(lineIdx) {
  const line = getLine(lineIdx)
  switch (lineIdx) {
    case 0:
      line.x = 50
      line.y = 50 + line.diff
      if (line.y < 50) {
        line.y = 50
        line.diff = 0
      }
      else if (line.y >= gElCanvas.height - 50) {
        line.y = gElCanvas.height - 50
        line.diff = 0
      }
      break

    case 1:
      line.x = 150
      line.y = gElCanvas.height - 50 + line.diff
      if (line.y < 50) {
        line.y = 50
        line.diff = 0
      }
      else if (line.y >= gElCanvas.height - 50) {
        line.y = gElCanvas.height - 50
        line.diff = 0
      }
      break

    default:
      line.x = gElCanvas.width / 2
      line.y = gElCanvas.height / 2 + line.diff
      if (line.y < 50) {
        line.y = 50
        line.diff = 0
      }
      else if (line.y >= gElCanvas.height - 50) {
        line.y = gElCanvas.height - 50
        line.diff = 0
      }
      break
  }
}

function onSelectedMeme(memeInfo) {
  const meme = JSON.parse(decodeURIComponent(memeInfo));
  const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = meme;
  showMemeDesignPage();
  documentActions('.saved-memes-page', 'hidden',  true)
  setMeme(imgId, lineIdx, lines);
  setImg(imgId);
  renderMeme();
}

function changeInputTxt() {
  const txt = getLineTxt()
  document.querySelector('.txt').value = txt
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onChangeTextFont(font) {
  changeFontSize(+font)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  changeInputTxt()
}

function onAddLine() {
  addLine()
  const meme = getMeme()
  const lineIdx = meme.lines.length - 1
  setTxtPos(lineIdx)
  switchLine()
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
}

function onSetFont(diff) {
  changeFontSize(diff)
  renderMeme()
}

function onChangeFont(fontName) {
  console.log(fontName);
  changeFontName(fontName)
  renderMeme()
}

function onChangeColor(color) {
  setColor(color)
  renderMeme()
}

function onChangeAlign(align) {
  changeAlign(align)
  renderMeme()
}

function onChangePage(num) {
  changePage(num)
  renderEmojis()
}

function OnAddEmoji(elBtn) {
  addEmoji(elBtn)
  switchLine()
  renderMeme()
}

function onUploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log(encodedUploadedImgUrl)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    )
  }
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error('Error uploading image')

    const { responseText: url } = XHR

    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error(
      'Error connecting to server with request:',
      req,
      '\nGot response data:',
      ev
    )
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}

function onDownloadImg(elLink) {
  console.log('download')
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onUp() {
  setLineDrag(false)
}

function showMemeDesignPage() {
  documentActions('.home-page', 'hidden',  true)
  documentActions('.saved-memes-page', 'hidden',  true)
  renderEmojis()
  documentActions('.meme-design', 'hidden',  false)
  resetMeme()
}

function onRandomMeme() {
  showMemeDesignPage()
  randomMeme()
  renderMeme()
}

function onSaveMeme() {
  const elFlashMsg = document.querySelector('.flash-msg')
  // elFlashMsg.style.hidden = false
  elFlashMsg.style.translate = '0'
  elFlashMsg.style.opacity = '1'
  setTimeout(() => {
    // elFlashMsg.style.hidden = true
    elFlashMsg.style.translate = '0 100%'
    elFlashMsg.style.opacity = '0'

  }, 2000);
  const meme = gElCanvas.toDataURL()
  let memes = loadFromStorage(STORAGE_KEY)

   memes = (!memes) ? [meme] : memes.push(meme)
  saveToStorage(STORAGE_KEY, memes)
  saveMeme()
}

function saveMeme() {
  const memeInfo = getMeme()
  let memesInfo = loadFromStorage(STORAGE_KEY1) || []
  
  if (memesInfo.length >= 50) {
    memesInfo.shift() // remove oldest meme
  }
  
  memesInfo.push(memeInfo)
  saveToStorage(STORAGE_KEY1, memesInfo)
}

// emojies ///////
function renderEmojis() {
  let strHTML = []
  const emojis = getEmojis()
  emojis.map(emoji => strHTML.push(`<button onclick="OnAddEmoji(this)">${emoji}</button>`))
  document.querySelector('.emojis').innerHTML = strHTML.join(' ')
}

function disableButton(btn) {
  if (btn === 'next') {
    documentActions('.next', 'disbled',  true)

  } else if (btn === 'prev') {
    documentActions('.prev', 'disbled',  true)
  }
  else {
    documentActions('.prev', 'disbled', false)
    documentActions('.next', 'disbled',  false)
  }
}

// add emoji to the img
function addEmoji(elBtn) {
  gMeme.lines.push({
    txt: `${elBtn.innerText}`,
    size: 50,
    align: 'center',
    color: 'black',
    diff: 0,
    x: gElCanvas.height / 2,
    y: gElCanvas.width / 2,
  })
}

// move through the emoji pages////////////
function changePage(num) {
  gPageIdx += num
  if (gPageIdx * PAGE_SIZE + PAGE_SIZE > gEmojis.length) {
    disableButton('next')
  } else if (!gPageIdx) disableButton('prev')
  else disableButton('none')
}

function setText() {
  txt = getLineTxt()
  document.querySelector('.txt').value = txt
}


function getFilterImgs() {
  return gFilteredImgs
}

function getImageById(imgId) {
  let img = gImgs.find((img) => img.id === imgId)
  return img
}

function getImages() {
  return gImgs
}
