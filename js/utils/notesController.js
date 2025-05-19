const createNoteButton = document.querySelector('.button__create--note');
const clearNotesButton = document.querySelector('.button__clear--notes')
const modalWindow = document.querySelector('.modal');
const modalWindowForEditNote = document.querySelector('.modal-edit-note');
const closeButton = document.querySelector('.close');
const form = document.querySelector('.form');
const formEditNote = document.querySelector('.form-edit-note')
const closeButtons = document.querySelectorAll('.close');

let currentEditingTitle = '';

form.addEventListener('submit', () => {
    const noteData = new FormData(form);

    const title = noteData.get('note_caption');
    const text = noteData.get('note_text');

    localStorage.setItem(title, text);
    modalWindow.classList.remove('active'); 
        renderNotes(); 
})

formEditNote.addEventListener('submit', (e) => {
    e.preventDefault()
    const noteData = new FormData(formEditNote);

    const newTitle = noteData.get('new_note_caption');
    const newText = noteData.get('new_note_text');

    if (currentEditingTitle) {
        localStorage.removeItem(currentEditingTitle); 
    }

    localStorage.setItem(newTitle, newText); 
    modalWindowForEditNote.classList.remove('active'); 
    renderNotes(); 
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

closeButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
          const modal = btn.closest('.modal, .modal-edit-note');
          if (modal) {
            modal.classList.remove('active');
           }
         });
});



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

        const editButton = document.createElement('span');
        editButton.className = 'button__edit--note';

        editButton.addEventListener('click', () => {
            modalWindowForEditNote.classList.toggle('active');

            const editNoteText = document.querySelector('.input--edit-note_text')
            const editNoteTitle = document.querySelector('.input--edit-note_title')
            editNoteText.value = text;
            editNoteTitle.value = title;

            currentEditingTitle = title;
        })
        
    
        deleteButton.addEventListener('click', () => {
            deleteNote(title)
        });

        noteCard.appendChild(noteCaption);
        noteCard.appendChild(noteText);
        noteCard.appendChild(deleteButton);
        noteCard.appendChild(editButton);
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