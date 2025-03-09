
const selectElement = document.getElementById("select-theme");

const header = document.querySelector('.header')
const modalEdit = document.querySelector('.modal-content--edit-note')
const modal = document.querySelector('.modal-content--create-note')
const modalEditNote = document.querySelector('.modal-edit-note')
const closeButton = document.querySelectorAll('.close')
const noteCards = document.querySelectorAll('.notes__card')

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;


const elementsToChange = [header, modal, modalEdit, document.body, ...noteCards, ...closeButton]


function switchToDarkTheme() {
    for (let elem of elementsToChange) {
        elem.setAttribute('theme','dark')
    }    

    document.querySelectorAll('.notes__card').forEach(note => {
        note.setAttribute('theme', 'dark');
    });

    document.querySelectorAll('.close').forEach(note => {
        note.setAttribute('theme', 'dark');
    });     
}

function switchToWhiteTheme() {
    for (let elem of elementsToChange) {
        elem.removeAttribute('theme')
    }    

    document.querySelectorAll('.notes__card').forEach(note => {
        note.removeAttribute('theme');
    });

    document.querySelectorAll('.close').forEach(note => {
        note.removeAttribute('theme');
    });     
}


if (prefersDark) {   
    switchToDarkTheme()
}

selectElement.addEventListener('change', () => {
    let selectedTheme = selectElement.value;
    if (selectedTheme  == 'dark') {
        switchToDarkTheme()
        console.log('dark')
    } else if(selectedTheme  == 'white') {
        switchToWhiteTheme()
    }
})