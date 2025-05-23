const createNoteButton = document.querySelector(".button__create--note");
const clearNotesButton = document.querySelector(".button__clear--notes");
const modalWindow = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const form = document.querySelector(".form");
const closeButtons = document.querySelectorAll(".close");

const noteViewTitle = document.querySelector(".note__title");
const noteBody = document.querySelector(".note__text");

form.addEventListener("submit", () => {
  const noteData = new FormData(form);

  const title = noteData.get("note_caption");
  const text = noteData.get("note_text");

  localStorage.setItem(title, text);
  modalWindow.classList.remove("active");
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
    const modal = btn.closest(".modal");
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

    noteCard.addEventListener("click", () => {
      document.querySelectorAll(".notes__card").forEach((card) => {
        card.classList.remove("selected");
      });

      noteCard.classList.add("selected");

      noteViewTitle.textContent = title;
      noteBody.textContent = text;

      noteViewTitle.dataset.key = title;
    });

    deleteButton.addEventListener("click", () => {
      deleteNote(title);
    });

    noteCard.appendChild(noteCaption);
    noteCard.appendChild(noteText);
    noteCard.appendChild(deleteButton);
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
            noteViewTitle.dataset.key = note;
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

    noteBody.addEventListener("blur", () => {
      const newText = noteBody.textContent.trim();
      const currentKey = noteViewTitle.dataset.key;

      if (currentKey) {
        localStorage.setItem(currentKey, newText);
        renderNotes();
      }
    });

    noteViewTitle.addEventListener("blur", () => {
      const newTitle = noteViewTitle.textContent.trim();
      const oldKey = noteViewTitle.dataset.key;
      const currentText = noteBody.textContent.trim();

      if (!newTitle || !oldKey) return;

      if (newTitle !== oldKey) {
        if (localStorage.getItem(newTitle)) {
          alert("Note with such title is exist");
          noteViewTitle.textContent = oldKey;
          return;
        }

        localStorage.removeItem(oldKey);
      }

      localStorage.setItem(newTitle, currentText);
      noteViewTitle.dataset.key = newTitle;
      renderNotes();
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
