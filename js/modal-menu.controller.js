'use strict'

function onToggleModal(){
    
    document.body.classList.toggle('modal-open'); 
    elH3 = document.querySelector('.form-modal .about-us')
    // elH3.innerText = makeLorem()
}
function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    if (document.body.classList.contains('modal-open')) onToggleModal()
}