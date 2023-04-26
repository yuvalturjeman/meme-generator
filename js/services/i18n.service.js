'use strict'

var gCurrLang = 'en'

var gTrans = {
    'option1': {en: 'funny',he: 'מצחיק'},
    'option2': {en: 'politics' ,he: 'פוליטיקה'},
    'option3': {en: 'cute', he: 'חמוד'},
    'option4': {en: 'dog',he: 'כלב'},
    'option5': {en: 'baby',he: 'תינוק'},
    'option6': {en: 'sleep',he: 'ישן'},
    'option7': {en: 'cat',he: 'חתול'},
    'option8': {en: 'happy',he: 'שמח'},
    'option9': {en: 'confused',he: 'מבולבל'},
    'option9': { en: 'surprise', he: 'מופתע'},
    'option10': {en: 'creepy', he: 'מבחיל'},
    'option11': {en: 'awkward',he: 'מוזר'},
    'option12': {en: 'famous',he: 'מפורסם'},
    'option13': {en: 'mission',he:  'משימתי'},
    'option14': {en: 'zero',he: 'אפס'},
    'option15': {en: 'scary',he: 'מפחיד'},
    'option16': {en: 'toy',he: 'צעצוע'},
}



function getTrans(transKey) {
    // get from gTrans
    const transMap = gTrans[transKey]
    // if key is unknown return 'UNKNOWN'
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    // If translation not found - use english
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    // console.log('els:', els)
    els.forEach(el => {
        // get the data-trans and use getTrans to replace the innerText 
        const transKey = el.dataset.trans
        // console.log('transKey:', transKey)
        const transTxt = getTrans(transKey)
        // console.log('transTxt:', transTxt)
        // support placeholder    
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
    return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
    return kg * 2.20462262185
}

function getPastRelativeFrom(ts) {
    const diff = Date.now() - new Date(ts)
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const formatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })
    if (seconds <= 60) return formatter.format(-seconds, 'seconds')
    if (minutes <= 60) return formatter.format(-minutes, 'minutes')
    if (hours <= 24) return formatter.format(-hours, 'hours')
    return formatter.format(-days, 'days')
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatNumSimple(num) {
    return num.toLocaleString(gCurrLang)
}
