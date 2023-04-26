let gMemes
let gElCanvas
let gCtx
let gCurrShape = 'rect'
let isDecreaseLineHeight = false
let isIncreaseLineHeight = false
const MEMES_DB = 'memes'
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  onShowImgGallery()
  // setLanguage()
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
    isDecreaseLineHeight = false
    isIncreaseLineHeight = false

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


function isDecreaseLineHt(bool) {
  isDecreaseLineHeight = bool
  const meme = getMeme()
  const lineIdx = meme.selectedLineIdx
  setTxtPos(lineIdx)
  renderMeme()
}

function isIncreaseLineHt(bool) {
  isIncreaseLineHeight = bool
  const meme = getMeme()
  const lineIdx = meme.selectedLineIdx
  setTxtPos(lineIdx)
  renderMeme()
}

function setTxtPos(lineIdx) {
  const line = getLine(lineIdx)

  if (isDecreaseLineHeight) line.diff += 10
  if (isIncreaseLineHeight) line.diff += -10

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

function renderMemesPage() {
  let strHtml = []
  gMemes = loadFromStorage(STORAGE_KEY)
  const memesInfo = loadFromStorage(STORAGE_KEY1)
  if (Array.isArray(gMemes)) {
    gMemes.map((meme, idx) => {
      strHtml.push(`<img src="${meme}" onclick="onSelectedMeme('${encodeURIComponent(JSON.stringify(memesInfo[idx]))}')">`);
    })
  } else {
    console.log('not array')
    strHtml.push('<h3>no saved memes</h3>')
  }
  document.querySelector('.saved-memes-container').innerHTML = strHtml.join('')
}

function onSelectedMeme(memeInfo) {
  const meme = JSON.parse(decodeURIComponent(memeInfo));
  const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = meme;
  showMemeDrawerPage();
  hideMemesPage();
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
function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function onDown(ev) {
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  console.log('pos', pos)
  if (!isLineClicked(pos)) return

  setLineDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const { isDrag } = getCurrLine()

  if (!isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onSaveMeme() {
  const memeInfo = getMeme()
  let memesInfo = loadFromStorage(STORAGE_KEY1)
  memesInfo = (!memesInfo) ? [memeInfo] : memesInfo.push(memeInfo)
  loadToStorage(STORAGE_KEY1, memesInfo)
}

function onSaveMemeData() {
  const elFlashMsg = document.querySelector('.flash-msg')
  elFlashMsg.style.translate = '0'
  elFlashMsg.style.opacity = '1'
  setTimeout(() => {
    elFlashMsg.style.translate = '0 100%'
    elFlashMsg.style.opacity = '0'

  }, 2000);
  const meme = gElCanvas.toDataURL()
  let memes = loadFromStorage(STORAGE_KEY)
  console.log('memes', memes)
  !memes ? memes = [meme] : memes.push(meme)
  loadToStorage(STORAGE_KEY, memes)
  onSaveMeme()
}

function onShowMemesPage() {
  hideGallery()
  hideMemeDrawerPage()
  renderMemesPage()
  documentActions('.memes-page', 'hidden',  false)
}

function showMemeDrawerPage() {
  hideGallery()
  hideMemesPage()
  renderEmojis()
  documentActions('.meme-creating', 'hidden',  false)
  resetMeme()
}

function hideMemeDrawerPage() {
  documentActions('.meme-creating', 'hidden',  true)
}

function hideMemesPage() {
  documentActions('.memes-page', 'hidden',  true)
}

function onRandomMeme() {
  showMemeDrawerPage()
  randomMeme()
  renderMeme()
}

function renderEmojis() {
  let strHTML = []
  const emojis = getEmojis()
  emojis.map(emoji => strHTML.push(`<button onclick="OnAddEmoji(this)">${emoji}</button>`))
  document.querySelector('.emojis').innerHTML = strHTML.join(' ')
}



function disableButton(btn) {

  if (btn === 'next') {
    documentActions('.next', 'disbled',  true)
    documentActions('.prev', 'disbled',  false)
  } else if (btn === 'prev') {
    documentActions('.prev', 'disbled',  true)
    documentActions('.next', 'disbled',  false)
  }
  else {
    documentActions('.prev', 'disbled', false)
    documentActions('.next', 'disbled',  false)
  }
}

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

function documentActions(elName, action,  value) {
  const elSelector = document.querySelector(elName)
  elSelector[action] = value
}


