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


  function loadToStorage(key,val) {
    localStorage.setItem(key, JSON.stringify(val))
  }
  
  function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  }
