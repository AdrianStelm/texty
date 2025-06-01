const selectElement = document.getElementById("select-theme");

const header = document.querySelector(".header");
const modalEdit = document.querySelector(".modal-content--edit-note");
const modal = document.querySelector(".modal-content--create-note");
const closeButton = document.querySelectorAll(".close");
const noteCards = document.querySelectorAll(".notes__card");
const themeSelector = document.querySelector("#select-theme");
const createNoteButton = document.querySelector(".button__create--note");
const asideMenu = document.querySelector(".aside-menu");
const closeAsideMenuButton = document.querySelector(".aside-menu_button_close");
const searchResults = document.querySelector(".search-results");
const searchNotesInput = document.querySelector("#search-note");
const buttonClearNotes = document.querySelector(".button__clear--notes");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const elementsToChange = [
  header,
  modal,
  document.body,
  ...noteCards,
  ...closeButton,
  themeSelector,
  createNoteButton,
  asideMenu,
  closeAsideMenuButton,
  searchResults,
  searchNotesInput,
  buttonClearNotes,
];

function switchToDarkTheme() {
  sessionStorage.setItem("theme", "dark");
  for (let elem of elementsToChange) {
    elem.setAttribute("theme", "dark");
  }

  document.querySelectorAll(".notes__card").forEach((note) => {
    note.setAttribute("theme", "dark");
  });

  document.querySelectorAll(".close").forEach((note) => {
    note.setAttribute("theme", "dark");
  });
}

function switchToWhiteTheme() {
  sessionStorage.setItem("theme", "white");
  for (let elem of elementsToChange) {
    elem.removeAttribute("theme");
  }

  document.querySelectorAll(".notes__card").forEach((note) => {
    note.removeAttribute("theme");
  });

  document.querySelectorAll(".close").forEach((note) => {
    note.removeAttribute("theme");
  });
}

selectElement.addEventListener("change", () => {
  let selectedTheme = selectElement.value;
  if (selectedTheme == "dark") {
    switchToDarkTheme();
    console.log("dark");
  } else if (selectedTheme == "white") {
    switchToWhiteTheme();
  } else if (selectedTheme == "red") {
    switchToRedTheme();
  }
});

if (sessionStorage.getItem("theme") == "dark") {
  switchToDarkTheme();
} else if (sessionStorage.getItem("theme") == "white") {
  switchToWhiteTheme();
}
