'use strict'

function onToggleModal(){
    var aboutMsg = makeLorem()
    documentActions('.modal p','innerText',aboutMsg)
    document.body.classList.toggle('modal-open'); 
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    if (document.body.classList.contains('modal-open')) onToggleModal()
}
