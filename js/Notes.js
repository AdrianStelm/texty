import { DomElements } from "./DomElements.js";
import { Storage } from "./Storage.js";

export class Notes {
  constructor(dom, storage) {
    this.dom = dom;
    this.storage = storage;
  }

  renderNotes() {
    this.dom.notesWrapper.innerHTML = "";
    const notes = this.storage.getNotes();

    notes.forEach(([title, text]) => {
      const noteCard = this.createNoteCard(title, text);
      this.dom.notesWrapper.appendChild(noteCard);
    });

    this.setupNoteViewListeners();
  }

  createNoteCard(title, text) {
    const noteCard = document.createElement("article");
    noteCard.className = "notes__card";

    const noteCaption = document.createElement("h2");
    noteCaption.innerText = title;

    const noteText = document.createElement("p");
    noteText.innerText = text.length > 75 ? `${text.slice(0, 78)}...` : text;

    const deleteButton = document.createElement("span");
    deleteButton.className = "button__delete--note";

    noteCard.addEventListener("click", () => this.selectNote(title, text));
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.storage.deleteNote(title);
      this.renderNotes();
    });

    noteCard.append(noteCaption, noteText, deleteButton);
    return noteCard;
  }

  selectNote(title, text) {
    document.querySelectorAll(".notes__card").forEach((card) => {
      card.classList.remove("selected");
    });

    this.dom.noteViewTitle.textContent = title;
    this.dom.noteBody.textContent = text;
    this.dom.noteViewTitle.dataset.key = title;
  }

  setupNoteViewListeners() {
    this.dom.noteBody.addEventListener("blur", () => this.updateNoteContent());
    this.dom.noteViewTitle.addEventListener("blur", () =>
      this.updateNoteTitle()
    );
  }

  updateNoteContent() {
    const newText = this.dom.noteBody.textContent.trim();
    const currentKey = this.dom.noteViewTitle.dataset.key;

    if (currentKey) {
      this.storage.saveNote(currentKey, newText);
      this.renderNotes();
    }
  }

  updateNoteTitle() {
    const newTitle = this.dom.noteViewTitle.textContent.trim();
    const oldKey = this.dom.noteViewTitle.dataset.key;
    const currentText = this.dom.noteBody.textContent.trim();

    if (!newTitle || !oldKey) return;

    if (newTitle !== oldKey) {
      if (localStorage.getItem(newTitle)) {
        alert("Note with such title already exists");
        this.dom.noteViewTitle.textContent = oldKey;
        return;
      }
      this.storage.deleteNote(oldKey);
    }

    this.storage.saveNote(newTitle, currentText);
    this.dom.noteViewTitle.dataset.key = newTitle;
    this.renderNotes();
  }
}
