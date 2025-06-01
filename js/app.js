import { DomElements } from "./DomElements.js";
import { Storage } from "./Storage.js";
import { Modal } from "./Modal.js";
import { Notes } from "./Notes.js";
import { Search } from "./Search.js";

class App {
  constructor() {
    this.dom = new DomElements();
    this.storage = new Storage();
    this.modal = new Modal(this.dom, this.storage);
    this.search = new Search(this.dom, this.storage);
    this.notes = new Notes(this.dom, this.storage);

    this.init();
  }

  init() {
    this.modal.init();
    this.search.init();
    this.notes.renderNotes();

    this.dom.createNoteButton.addEventListener("click", () => {
      this.dom.modalWindow.classList.toggle("active");
    });

    this.dom.clearNotesButton.addEventListener("click", () => {
      this.storage.clearNotes();
      this.notes.renderNotes();
    });
  }
}

new App();
