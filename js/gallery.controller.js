'use strict'

function onInit() {
  onShowImgGallery()
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  addListeners()
}

function renderGallery() {
  if (!getFilterImgs() || !getFilterImgs().length){
    const images= getImages() 
    const strHTMLs = images.map(
      (img, idx) =>
        `<img src="meme-imgs (square)/${idx + 1}.jpg" onclick="onSelectedImg(${img.id})" />`
    )
    documentActions('.gallery','innerHTML',strHTMLs.join(''))    
  } else {
    const images= getFilterImgs()
      const strHTMLs = images.map(
        (img) =>
          `<img src="meme-imgs (square)/${img.id}.jpg" onclick="onSelectedImg(${img.id})" />`
      )
      documentActions('.gallery','innerHTML',strHTMLs.join(''))
  }
  renderKeywords()
}

function onSelectedImg(id) {
  showMemeDesignPage()
  documentActions('.home-page', 'hidden',  true)
  setImg(id)
  renderMeme()
}

function onShowImgGallery() {
  documentActions('.meme-design', 'hidden',  true)
  documentActions('.saved-memes-page', 'hidden',  true)
  showImgGallery()
  
}

function onFilterImgs(keyword){
  filterImgs(keyword)
  renderGallery()
}

function renderKeywords(){
  let strHTML=''
  const keywordsMap= getKeywords() 
  for (const key in keywordsMap) {
    strHTML+=`<li><a class="key ${key}" href="#" onclick="onFilterImgs('${key}')">${key}</a></li>`
  }
  documentActions('.search-by-keywords','innerHTML',strHTML)
  for (let key in keywordsMap) {
    documentActions(`.search-by-keywords .${key}`,'style.fontSize',`calc(1em + 4*${keywordsMap[key]}px)`)
  }
}

function showImgGallery() {
  renderGallery()
  documentActions('.home-page', 'hidden',  false)
}
