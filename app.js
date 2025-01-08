"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// ---------------------------------------------------------------
// Model Window
// ---------------------------------------------------------------

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// ---------------------------------------------------------------
// Scroll btn "Smooth"
// ---------------------------------------------------------------
btnScrollTo.addEventListener("click", function (e) {
  //   console.log(e);
  const s1coords = section1.getBoundingClientRect();
  //   console.log(s1coords);

  //   console.log("scrollY:", scrollY);
  //   console.log("window.scroll:", window.scrollTo(s1coords.top));

  //   window.scrollTo(s1coords.left, s1coords.top + window.scrollY);

  //   Old method
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: "smooth",
  //   });

  // New Method
  section1.scrollIntoView({ behavior: "smooth" });
});

// ---------------------------------------------------------------
// Scroll btn "Smooth"
// ---------------------------------------------------------------

// ----------------------------------------
// Cookie- Message
// ----------------------------------------
// Creating and inserting elements
// ----------------------------------------

// const message = document.createElement("div");
// message.classList.add("msg-text");
// message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Prepend - will add the element as first child
// document.querySelector(".header").prepend(message);

// append - will add the element as last child
// document.querySelector(".header").append(message);

// Both will not work at a time, if we have to see both, we have to use clone

// document.querySelector(".header").append(message.cloneNode(true));

// before method will add the element as its initial sibling
// document.querySelector(".header").before(message);

// document.querySelector(".btn--close-cookie").addEventListener("click", function () {
//   message.remove(); new method to remove dynamically element

//   console.log(message.parentElement.removeChild(message));
// });

// console.log(message);

// ----------------------------------------
// Styles Dynamically Add
// ----------------------------------------

// message.style.backgroundColor = "grey";

// element.style.property will get the inline css which is applied
// this wont give us a external css styles.
// console.log(message.style.backgroundColor);

// if we have to grt external stylesheet property
// we have to use getComputedStyle() method

// console.log(getComputedStyle(message).color);

// console.log(getComputedStyle(message).height);

// console.log((message.style.height = parseInt(getComputedStyle(message).height)) + 40 + "px");

// message.style.height = parseInt(getComputedStyle(message).height) + 40 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered") - this will modify the css : root variable.
// console.log(document.documentElement.style.setProperty("--color-primary", "orangered"));

// const logo = document.querySelector(".nav__logo");

// ----------------------------------------------
// Attribute
// ----------------------------------------------

// console.log(logo.getAttribute("alt"));
// console.log(logo.alt);

// console.log(logo.getAttribute("designer"));
// console.log(logo.designer);

// Dataset is a special one to add unique attribute
// console.log(logo.dataset);
