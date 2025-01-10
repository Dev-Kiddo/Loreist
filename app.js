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
// Page navigation - Using Event Deligation
// ---------------------------------------------------------------

// document.querySelectorAll(".nav__link").forEach((el) =>
//   el.addEventListener("click", function (e) {
//     console.log("Link");
//     e.preventDefault();
//     console.log(this); //log current el which is attached to the event listner.in this case its nav__link.

//     const id = this.getAttribute("href");
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   })
// );

// Deligation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log("Target:", e.target);
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// ----------------------------------------
// Tabbed Component
// ----------------------------------------
// const tabs = document.querySelectorAll(".operations__tab");

// const tabContainer = document.querySelector(".operations__tab-container");

// const tabsContent = document.querySelectorAll(".operations__content");

// tabContainer.addEventListener("click", function (e) {
//   const clicked = e.target.closest(".operations__tab");

//   // Guard Clause
//   if (!clicked) return;

//   tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
//   clicked.classList.toggle("operations__tab--active");

//   // console.log(clicked.dataset.tab);

//   tabsContent.forEach((cont) => cont.classList.remove("operations__content--active"));

//   document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.toggle("operations__content--active");
//   // console.log(document.querySelector(`.operations__content--${clicked.dataset.tab}`));
// });

const tabs = document.querySelectorAll(".operations__tab");

const tabContainer = document.querySelector(".operations__tab-container");

const contentContainer = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  const click = e.target.closest(".operations__tab");

  if (!click) return;
  // console.log(click);

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  click.classList.add("operations__tab--active");

  contentContainer.forEach((content) => content.classList.remove("operations__content--active"));
  document.querySelector(`.operations__content--${click.dataset.tab}`).classList.toggle("operations__content--active");
  // console.log(document.querySelector(`.operations__content--${click.dataset.tab}`));
});

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

// ----------------------------------------------------------
// Add Event Listner
// ----------------------------------------------------------

// Event is basically a signal, that is generated by a certain dom node.
// Signal means - Something happened like click somewhere, mouse moving.

// No matter if we handle a certain event or not, for example click => the event will always happen when a user clicks.

// it does not matter if we are listining it or not.

// ----------------------------------------------

// ----------------------------------------------------------
// Bubbling and Capturing
// ----------------------------------------------------------

// <html lang="en">
// <head>
//     <title>Document</title>
// </head>
// <body>
//     <section>
//         <p>A paragraph with a <a href="#">Link</a></p>
//     </section>
// </body>
// </html>

// in the above we have added a anchour element inside paragraph.
// if the click event happened,

// the event will happen in the root of the document, not in <a> target element.

// from there, CAPTURING phase happens.

// where the event travel all the way down to document root to target element.

// While coming it will passthrought every single element of the target elememnt.

// EG: document > html > body > section > p > a

// Once it reaches the target element, it will runs the callback func

// and then the event actually travel back to its origin where it strted. (document root again) - this is BUBBLING phase

// so we use this to create very power full patters. we can create a event one for target element, and one for one of its parent element.

// BY DEFALUT: event can only handled in the target and bubbling phase.

// However we can setup events in the capturing phase instead.

// Also, not all the event have a capturing and bubbling phase.

// Generzte random rgb values here
// // rgb(255, 255, 255);

// const randomInt = (min, max) => Math.floor(Math.random() * max - min + 1) + min;

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// const sampleEl = document.createElement("div");
// sampleEl.style.width = "100px";
// sampleEl.style.height = "100px";
// sampleEl.style.backgroundColor = randomColor(100, 100);

// document.querySelector(".header__title").prepend(sampleEl);

// console.log(sampleEl);

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   console.log(e);
//   console.log("Im nav__link");
//   this.style.backgroundColor = randomColor();
//   // e.stopPropagation(); to stop the propogstion.
//   // e.target() - will return the targeted element.
//   // e.currentTarget() - will return the current target.
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   console.log(e);
//   console.log("nav__links");
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   console.log(e);
//   console.log("Im nav");
//   this.style.backgroundColor = randomColor();
// });

// ----------------------------------------------------------
// DOM traversing - Walking through the DOM
// ----------------------------------------------------------

// So, this means we can select an element based on another element.

// const heading = document.querySelector("h1");

// heading.querySelectorAll(".highlight"); it will return all the child elements insice the h1 called highlight.
// console.log(heading.querySelectorAll(".highlight"));

// ----------------------------------------------------------
// Going Downwards: Child
// ----------------------------------------------------------

// console.log(heading.childNodes);
// console.log(heading.children);

// console.log(heading.firstElementChild);//will return the exact first children
// console.log(heading.lastElementChild);//will return the exact last children

// ----------------------------------------------------------
// Going Upwards: Parent
// ----------------------------------------------------------
// console.log(heading.parentNode);
// console.log(heading.parentELement);

// h1.closest(".header")
// The closest method is lika a querySelector All, it will also accepts a queryString as an input.but it will goes upwards like Parent.No matter how far from the parent treee.

// the query selectior all will give its child.
