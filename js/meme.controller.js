'use strict'



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

function onSelectedMeme(memeInfo) {
  const meme = JSON.parse(decodeURIComponent(memeInfo));
  const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = meme;
  showMemeDesignPage();
  documentActions('.saved-memes-page', 'hidden', true)
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
  documentActions('.home-page', 'hidden', true)
  documentActions('.saved-memes-page', 'hidden', true)
  renderEmojis()
  documentActions('.meme-design', 'hidden', false)
  resetMeme()
}

function onRandomMeme() {
  showMemeDesignPage()
  randomMeme()
  renderMeme()
}

// emojies ///////
function renderEmojis() {
  var strHTML = []
  const emojis = getEmojis()
  emojis.map(emoji => strHTML.push(`<button onclick="OnAddEmoji(this)">${emoji}</button>`))
  documentActions('.emojis', 'innerHTML', strHTML.join(' '))
}

// move through the emoji pages////////////
function changePage(pageNum) {
  console.log(gPageIdx);
  gPageIdx += pageNum
  if (gPageIdx * PAGE_SIZE === gEmojis.length - 1) gPageIdx = 0
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
