const createNoteButton = document.querySelector(".button__create--note");
const clearNotesButton = document.querySelector(".button__clear--notes");
const modalWindow = document.querySelector(".modal");
const modalWindowForEditNote = document.querySelector(".modal-edit-note");
const closeButton = document.querySelector(".close");
const form = document.querySelector(".form");
const formEditNote = document.querySelector(".form-edit-note");
const closeButtons = document.querySelectorAll(".close");

const noteViewTitle = document.querySelector(".note__title");
const noteBody = document.querySelector(".note__text");

let currentEditingTitle = "";

form.addEventListener("submit", () => {
  const noteData = new FormData(form);

  const title = noteData.get("note_caption");
  const text = noteData.get("note_text");

  localStorage.setItem(title, text);
  modalWindow.classList.remove("active");
  renderNotes();
});

formEditNote.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteData = new FormData(formEditNote);

  const newTitle = noteData.get("new_note_caption") || "New Title";
  const newText = noteData.get("new_note_text");

  if (currentEditingTitle) {
    localStorage.removeItem(currentEditingTitle);
  }

  localStorage.setItem(newTitle, newText);
  modalWindowForEditNote.classList.remove("active");
  renderNotes();
});

createNoteButton.addEventListener("click", () => {
  modalWindow.classList.toggle("active");
});

closeButton.addEventListener("click", () => {
  modalWindow.classList.toggle("active");
});

clearNotesButton.addEventListener("click", () => {
  clearNotes();
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal, .modal-edit-note");
    if (modal) {
      modal.classList.remove("active");
    }
  });
});

function renderNotes() {
  const notesWrapper = document.querySelector(".notes-wrapper");
  notesWrapper.innerHTML = "";

  Object.entries(localStorage).forEach(([title, text]) => {
    const noteCard = document.createElement("article");
    noteCard.className = "notes__card";

    const noteCaption = document.createElement("h2");
    noteCaption.innerText = title;

    const noteText = document.createElement("p");
    noteText.innerText = text.length > 75 ? text.slice(0, 78) + "..." : text;

    const deleteButton = document.createElement("span");
    deleteButton.className = "button__delete--note";

    const editButton = document.createElement("span");
    editButton.className = "button__edit--note";

    editButton.addEventListener("click", () => {
      modalWindowForEditNote.classList.toggle("active");

      const editNoteText = document.querySelector(".input--edit-note_text");
      const editNoteTitle = document.querySelector(".input--edit-note_title");
      editNoteText.value = text;
      editNoteTitle.value = title;

      currentEditingTitle = title;
    });

    noteCard.addEventListener("click", () => {
      document.querySelectorAll(".notes__card").forEach((card) => {
        card.classList.remove("selected");
      });

      noteCard.classList.add("selected");

      noteViewTitle.textContent = title;
      noteBody.textContent = text;
    });

    deleteButton.addEventListener("click", () => {
      deleteNote(title);
    });

    noteCard.appendChild(noteCaption);
    noteCard.appendChild(noteText);
    noteCard.appendChild(deleteButton);
    noteCard.appendChild(editButton);
    notesWrapper.appendChild(noteCard);

    const searchInput = document.getElementById("search-note");
    const resultsList = document.querySelector(".search-results");

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      resultsList.innerHTML = "";

      if (query.length === 0) {
        resultsList.style.display = "none";
        return;
      }

      const filtered = Object.keys(localStorage).filter((note) =>
        note.toLowerCase().includes(query)
      );

      if (filtered.length > 0) {
        filtered.forEach((note) => {
          const li = document.createElement("li");
          li.textContent = note;
          li.addEventListener("click", () => {
            searchInput.value = note;
            resultsList.style.display = "none";
            noteViewTitle.textContent = note;
            const noteContent = localStorage.getItem(note);
            noteBody.textContent = noteContent;
          });
          resultsList.appendChild(li);
        });
        resultsList.style.display = "block";
      } else {
        resultsList.style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search")) {
        resultsList.style.display = "none";
      }
    });
  });
}

function deleteNote(title) {
  localStorage.removeItem(title);
  renderNotes();
}

function clearNotes() {
  localStorage.clear();
  renderNotes();
}

renderNotes();
