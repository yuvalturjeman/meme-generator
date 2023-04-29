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

  function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
