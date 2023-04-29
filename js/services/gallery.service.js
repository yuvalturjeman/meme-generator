'use strict'

var gFilteredImgs
var gKeywordSearchCountMap = {
  funny: 1,
  dog: 1,
  politics: 1,
  cute: 1,
  baby: 1,
  dog: 1,
  sleep: 1,
  cat: 1,
  happy: 1,
  man: 1,
  confused: 1,
  surprise: 1,
  creepy: 1,
  awkward: 1,
} 


function filterImgs(keyword) {
    var counter = 0
    gFilteredImgs = gImgs.reduce((acc, img) => {
      if (img.keywords.includes(`${keyword}`)) {
        counter++
        if (counter === 1) {
          gKeywordSearchCountMap[keyword] = (gKeywordSearchCountMap[keyword]) ? gKeywordSearchCountMap[keyword]++ : 1
        }
        acc.push(img)
      }
      return acc
    }, [])
    return gFilteredImgs
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
