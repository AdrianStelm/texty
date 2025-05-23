const closeAsideMenuButtton = document.querySelector(
  ".aside-menu_button_close"
);
const asideMenu = document.querySelector(".aside-menu");
const noteLayout = document.querySelector(".notes-layout");

closeAsideMenuButtton.addEventListener("click", () => {
  asideMenu.classList.toggle("non-active");
  noteLayout.classList.toggle("shifted");
});
