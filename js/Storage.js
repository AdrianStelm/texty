export class Storage {
  getNotes() {
    return Object.entries(localStorage);
  }

  saveNote(title, text) {
    localStorage.setItem(title, text);
  }

  deleteNote(title) {
    localStorage.removeItem(title);
  }

  clearNotes() {
    localStorage.clear();
  }
}
