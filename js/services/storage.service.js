'use strict'

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
      let img = new Image() 
      img.src = event.target.result 
  

      img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0]) 
  }


  function saveToStorage(key,val) {
    localStorage.setItem(key, JSON.stringify(val))
  }

    function saveMeme() {
    const memeInfo = getMeme()
    let memesInfo = loadFromStorage(STORAGE_KEY1)
    memesInfo = (!memesInfo) ? [memeInfo] : memesInfo.push(memeInfo)
    saveToStorage(STORAGE_KEY1, memesInfo)
  }
