'use strict'

// const DISPLAY_KEY = 'favLayout'

// function setLanguage() {
//     const lng = getValFromParam('lng')
//     if(lng) gCurrLang = lng
//     doTrans()
//   }
  
//   function makeQUeryParams() {
//     var lang = getLang()
//   }
  
  
//   function getValFromParam(key) {
//     const queryStringParams = new URLSearchParams(window.location.search)
//     return queryStringParams.get(key)
//   }
  
//   function render() {
//     renderFilterByQueryStringParams()
//     onShowGallery()
  
//   }
  
//   function onSetLang(lang) {
//     // console.log('lang:', lang)
//     setLang(lang)
//     // if lang is hebrew add RTL class to document.body
//     if (lang === 'he') {
//         document.body.classList.add('rtl')
//         setQueryStringParams({lng: 'he'})
        
//     }
//     else {
//         document.body.classList.remove('rtl')
//         setQueryStringParams({lng: 'en'})
  
//     }
//     render()
//   }

//   function onChangeDisplay(display) {
//     setDisplay(display)
//     renderBooks()
//     setLang()
// }

// function setDisplay(display) {
//     saveToStorage(DISPLAY_KEY, display)
//     gDisplay = display
// }

// function setQueryStringParams(newParams) {
//     const url = new URL(window.location.href)
//     const params = new URLSearchParams(url.search)
//     for (var paramName in newParams) {
//         const paramValue = newParams[paramName]
//         params.set(paramName, paramValue)
//     }
//     url.search = params.toString()
//     window.history.pushState({ path: url.href }, '', url.href)
// }

// function getValFromParam(key) {
//     const queryStringParams = new URLSearchParams(window.location.search)
//     return queryStringParams.get(key)
// }

// function onInit() {
//     render()
//     setLanguage()
// }

// function setLanguage() {
//     const lng = getValFromParam('lng')
//     if(lng) gCurrLang = lng
//     doTrans()
// }

// function render() {
//     renderFilterByQueryStringParams()
//     renderBooks()
//     // renderModalByQueryStringParams()
// }

// function onChangeDisplay(display) {
//     setDisplay(display)
//     renderBooks()
//     setLang()
// }

// function renderBooks() {
//     var display = getDisplay()
//     if (display === 'table') renderBooksTable()
//     else if (display === 'grid') renderBooksCards()
//     doTrans()
// }

// function onReadBook(bookId) {
//     var book = getBookById(bookId)
//     var elModal = document.querySelector('.modal')
//     elModal.querySelector('h3').innerText = book.title
//     elModal.querySelector('h4 span').innerText = `${book.price}$`;
//     elModal.querySelector('p').innerText = book.desc
//     elModal.classList.add('open')
//     var params = { id: book.id, rating: book.rating, modal: 'open' };
//     setQueryStringParams(params)
    
// }

// function renderModalByQueryStringParams() {
//     const queryStringParams = new URLSearchParams(window.location.search)
//     if (queryStringParams.get('modal') === 'open')
//         onReadBook(queryStringParams.get('id'))
// }