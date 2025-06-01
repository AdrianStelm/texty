import { DomElements } from "./DomElements.js";
import { Storage } from "./Storage.js";

export class Modal {
  constructor(dom, storage) {
    this.dom = dom;
    this.storage = storage;
  }

  init() {
    this.dom.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.dom.closeButton.addEventListener("click", this.toggleModal.bind(this));

    this.dom.closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        if (modal) modal.classList.remove("active");
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const noteData = new FormData(this.dom.form);
    const title = noteData.get("note_caption");
    const text = noteData.get("note_text");

    this.storage.saveNote(title, text);
    this.toggleModal();
  }

  toggleModal() {
    this.dom.modalWindow.classList.toggle("active");
  }
}
