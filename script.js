// for navigation bar responsive
let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");
let close = document.querySelector("#close-bars");

menu.addEventListener("click", () => {
  close.style.display = "inline-block";
  menu.style.display = "none";
  navbar.style.display = "block";
});

close.addEventListener("click", () => {
    menu.style.display = "inline-block";
    close.style.display = "none";
    navbar.style.display = "none";
  });

// for search form display

let search = document.querySelector('#search-form');
let closeSearch = document.querySelector('#close');
let searchIcon = document.querySelector('#search-icon');

searchIcon.addEventListener('click', () => {
    search.style.top = "0";
});

closeSearch.addEventListener('click', () => {
    search.style.top = "-110%";
});


// home slider

let swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});