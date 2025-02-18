const createNoteButton = document.querySelector('.button__create--note');
const clearNotesButton = document.querySelector('.button__clear--notes')
const modalWindow = document.querySelector('.modal');
const closeButton = document.querySelector('.close');
const form = document.querySelector('.form');

form.addEventListener('submit', () => {
    const noteData = new FormData(form);

    const title = noteData.get('note_caption');
    const text = noteData.get('note_text');

    localStorage.setItem(title, text);
})

createNoteButton.addEventListener('click', () => {
    modalWindow.classList.toggle('active');
})

closeButton.addEventListener('click', () => {
    modalWindow.classList.toggle('active');
})

clearNotesButton.addEventListener('click', () => {
    clearNotes()
})

function renderNotes() {
    const notesWrapper = document.querySelector('.notes-wrapper');
    notesWrapper.innerHTML = ''; 

    Object.entries(localStorage).forEach(([title, text]) => {
        const noteCard = document.createElement('article');
        noteCard.className = 'notes__card';

        const noteCaption = document.createElement('h2');
        noteCaption.innerText = title;

        const noteText = document.createElement('p');
        noteText.innerText = text;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'button__delete--note';

        deleteButton.addEventListener('click', () => {
            deleteNote(title)
        });

        noteCard.appendChild(noteCaption);
        noteCard.appendChild(noteText);
        noteCard.appendChild(deleteButton);
        notesWrapper.appendChild(noteCard);
    });
}

function deleteNote(title) {
    localStorage.removeItem(title);
    renderNotes(); 
}

function clearNotes() {
    localStorage.clear()
    renderNotes()
}

renderNotes();