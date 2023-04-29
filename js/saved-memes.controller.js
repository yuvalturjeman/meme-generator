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
