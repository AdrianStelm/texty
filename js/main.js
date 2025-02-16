const createNoteButton = document.querySelector('.button__create--note');
const modalWindow = document.querySelector('.modal');
const closeButton = document.querySelector('.close');

createNoteButton.addEventListener('click', () => {
    modalWindow.classList.toggle('active');
})

closeButton.addEventListener('click', () => {
    modalWindow.classList.toggle('active');
})
