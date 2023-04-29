'use strict'
const STORAGE_KEY = 'memes'
const STORAGE_KEY1 = 'memesInfo'


// saved memes page
function renderSavedMemesPage() {
    console.log('memespage');
    var strHtml = []
    gMemes = loadFromStorage(STORAGE_KEY)
    const memesInfo = loadFromStorage(STORAGE_KEY1)
    if (Array.isArray(gMemes)) {
      gMemes.map((meme, idx) => {
        strHtml.push(`<img src="${meme}" onclick="onSelectedMeme('${encodeURIComponent(JSON.stringify(memesInfo[idx]))}')">`);
      })
    } else {
      strHtml.push('<h3>no saved memes</h3>')
    }
    documentActions('.saved-memes-container','innerHTML',strHtml.join(''))
  }
  // show saved memes////
  function onShowSavedMemesPage() {
    documentActions('.home-page', 'hidden',  true)
    documentActions('.meme-design', 'hidden',  true)
    showSavedMemesPage()
  }

// show saved memes page
  function showSavedMemesPage() {
    renderSavedMemesPage()
    documentActions('.saved-memes-page', 'hidden',  false)
  }

  function onSaveMeme() {
    savedMemeMsg()
    saveMeme()
  }

  function saveMeme() {
    const meme = gElCanvas.toDataURL()
    var memes = loadFromStorage(STORAGE_KEY)
    memes = (memes && Array.isArray(memes)) ? [...memes, meme] : [meme]
  
    saveToStorage(STORAGE_KEY, memes)
  
    const memeInfo = getMeme()
    var memesInfo = loadFromStorage(STORAGE_KEY1) 
    memesInfo = (memesInfo && Array.isArray(memesInfo)) ? [...memesInfo, memeInfo] : [memeInfo] 
    saveToStorage(STORAGE_KEY1, memesInfo)
  }
  
  function savedMemeMsg() {
    const elFlashMsg = document.querySelector('.save-meme-msg')
    elFlashMsg.style.display = 'inline'
    setTimeout(() => {
      elFlashMsg.style.display = 'none'
    }, 2000);
  }
  

  
