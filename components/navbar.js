let menuBtn = document.querySelector(".menu-button");
let navbar = document.querySelector(".navbar__list");

menuBtn.onclick = () => {
  menuBtn.classList.toggle("fa-times");
  navbar.classList.toggle("navbar__active");
};
