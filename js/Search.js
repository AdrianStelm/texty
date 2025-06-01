import { DomElements } from "./DomElements.js";
import { Storage } from "./Storage.js";

export class Search {
  constructor(dom, storage) {
    this.dom = dom;
    this.storage = storage;
  }

  init() {
    this.dom.searchInput.addEventListener("input", () => this.handleSearch());
    document.addEventListener("click", (e) =>
      this.closeResultsOnClickOutside(e)
    );
  }

  handleSearch() {
    const query = this.dom.searchInput.value.toLowerCase();
    this.dom.resultsList.innerHTML = "";

    if (!query) {
      this.dom.resultsList.style.display = "none";
      return;
    }

    const notes = this.storage.getNotes();
    const filtered = notes.filter(([note]) =>
      note.toLowerCase().includes(query)
    );

    if (filtered.length) {
      filtered.forEach(([note]) => {
        const li = document.createElement("li");
        li.textContent = note;
        li.addEventListener("click", () => this.selectFoundNote(note));
        this.dom.resultsList.appendChild(li);
      });
      this.dom.resultsList.style.display = "block";
    } else {
      this.dom.resultsList.style.display = "none";
    }
  }

  selectFoundNote(note) {
    this.dom.searchInput.value = note;
    this.dom.resultsList.style.display = "none";
    this.dom.noteViewTitle.textContent = note;
    this.dom.noteViewTitle.dataset.key = note;
    this.dom.noteBody.textContent = localStorage.getItem(note);
  }

  closeResultsOnClickOutside(e) {
    if (!e.target.closest(".search")) {
      this.dom.resultsList.style.display = "none";
    }
  }
}
