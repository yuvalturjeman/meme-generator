'use strict'

let gFilteredImgs


function filterImgs(keyword) {
    let counter = 0
    gFilteredImgs = gImgs.reduce((acc, img) => {
      if (img.keywords.includes(`${keyword}`)) {
        counter++
        if (counter === 1) {
          gKeywordSearchCountMap[keyword]
            ? gKeywordSearchCountMap[keyword]++
            : (gKeywordSearchCountMap[keyword] = 1)
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