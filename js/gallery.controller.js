'use strict'

function renderGallery() {
  if (!getFilterImgs() || !getFilterImgs().length){
    const images= getImages() 
    const strHTMLs = images.map(
      (img, idx) =>
        `<img src="meme-imgs (square)/${idx + 1}.jpg" onclick="onSelectedImg(${img.id})" />`
    )

    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
    
  } else {
    const images= getFilterImgs()
      const strHTMLs = images.map(
        (img) =>
          `<img src="meme-imgs (square)/${img.id}.jpg" onclick="onSelectedImg(${img.id})" />`
      )
    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
  }
  renderKeywords()
}

function onSelectedImg(id) {
  showMemeDesignPage()
  hideImgGallery()
  setImg(id)
  renderMeme()
}

function onShowImgGallery() {
  hideMemeDesignPage()
  hideSavedMemesPage()
  showImgGallery()
  
}

function onFilterImgs(keyword){
  filterImgs(keyword)
  renderGallery()
}

function renderKeywords(){
  let strHtml=''
  const keywordsMap= getKeywords() 
  for (const key in keywordsMap) {
    strHtml+=`<li><a class="key ${key}" href="#" onclick="onFilterImgs('${key}')">${key}</a></li>`
  }
  document.querySelector('.search-by-keywords').innerHTML = strHtml
  for (let key in keywordsMap) {
    document.querySelector(`.search-by-keywords .${key}`).style.fontSize = `calc(1em + 4*${keywordsMap[key]}px)`
  }
}

function hideImgGallery() {
  documentActions('.home-page', 'hidden',  true)
}

function showImgGallery() {
  renderGallery()
  documentActions('.home-page', 'hidden',  false)
}
