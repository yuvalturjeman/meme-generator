'use strict'

function makeLorem(wordCount = 30) {
  const words = [ 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
  var txt = ''
  while (wordCount > 0) {
    wordCount--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function makeMemesTxt() {
  const memesTxt = ['When your code is not functioning', 'when to tierd to go to bed','when you did wrong']
  var txt = ''
    txt += memesTxt[Math.floor(Math.random() * memesTxt.length)] + ' '
    return txt
  }

// function makeLoremHe(wordCount = 30) {
//   const words = ['השמיים', 'מעל', 'הנמל', 'היה', 'צבע של הטלוויזיה', 'מכון', 'אל', 'ערוץ מת', '.', 'כל', 'זה קרה', 'פחות או יותר', '.', 'אני', 'שייך', 'הסיפור', 'לאט לאט', 'מאנשים שונים', 'גם', 'בכלליות', 'קורה', 'במקרים כאלה', 'כל פעם', 'זה', 'היה', 'סיפור שונה', '.', 'זה', 'היה', 'תענוג', 'גם', 'בער']
//   var txt = ''
//   while (wordCount > 0) {
//     wordCount--
//     txt += words[Math.floor(Math.random() * words.length)] + ' '
//   }
//   return txt
// }

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// general actions for document selectors////////
function documentActions(elName, action, value) {
  const elSelector = document.querySelector(elName)
  elSelector[action] = value
}
