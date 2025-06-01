export class DomElements {
  constructor() {
    this.createNoteButton = document.querySelector(".button__create--note");
    this.clearNotesButton = document.querySelector(".button__clear--notes");
    this.modalWindow = document.querySelector(".modal");
    this.closeButton = document.querySelector(".close");
    this.form = document.querySelector(".form");
    this.closeButtons = document.querySelectorAll(".close");
    this.noteViewTitle = document.querySelector(".note__title");
    this.noteBody = document.querySelector(".note__text");
    this.notesWrapper = document.querySelector(".notes-wrapper");
    this.searchInput = document.getElementById("search-note");
    this.resultsList = document.querySelector(".search-results");
  }
}
