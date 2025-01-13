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
// Menu Fade Animation
// ----------------------------------------

const nav = document.querySelector(".nav");

const mouseHover = function (e) {
  // console.log(this); 1
  // console.log(e.currentTarget); target element

  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    // console.log("link:", link);
    // console.log("sibling:", siblings);
    // console.log("logo:", logo);
    siblings.forEach((sib) => {
      if (sib !== link) {
        sib.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};

nav.addEventListener("mouseover", mouseHover.bind(0.5));

// nav.addEventListener("mouseout", function (e) {
//   mouseHover(e, 1);
// });

nav.addEventListener("mouseout", mouseHover.bind(1));

// ----------------------------------------
// Sticky Navigaion // this method will trigger scroll all the time.
// ----------------------------------------
// const stickyCoords = section1.getBoundingClientRect();
// // console.log(stickyCoords);

// window.addEventListener("scroll", function () {
//   // console.log("window.ScrollY:", window.scrollY);
//   // console.log("BoundingClientRect:", stickyCoords.top);

//   if (this.window.scrollY > stickyCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// ----------------------------------------
// Sticky Navigaion // intersection observer API
// ----------------------------------------
// This API allows our code to basically observe changes to the way that a certain target element intersects another element, or the way it intersects the viewport.

const header = document.querySelector(".header");
// console.log(header);

const navHeight = nav.getBoundingClientRect().height;

// console.log(navHeight);

const stickNav = function (entries, observer) {
  // console.log("entries:", entries);
  const [entry] = entries;
  // console.log("entry:", entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const stickOpt = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(stickNav, stickOpt);
observer.observe(header);

// ----------------------------------------
// Scroll-reveal sections
// ----------------------------------------

const allSections = document.querySelectorAll(".section");
// console.log(allSections);

const cbRevealer = function (entries, observer) {
  const [entry] = entries;
  // console.log("entry:", entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);

  // console.log("observer:", observer);
};

const sectionRevealer = new IntersectionObserver(cbRevealer, { root: null, threshold: 0.15 });

allSections.forEach((section) => {
  sectionRevealer.observe(section);
  section.classList.add("section--hidden");
});

// ----------------------------------------
// Lazy Loading Images
// ----------------------------------------
// to select an element which contains selected attribute, we can do this.
const lazyTargets = document.querySelectorAll("img[data-src]");
// console.log("lazyTargets:", lazyTargets);

const cbLazyImg = function (entries, observer) {
  // console.log("insideCBEntries:", entries);
  const [entry] = entries;
  // console.log("entry:", entry);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    event.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const lazyObserver = new IntersectionObserver(cbLazyImg, { root: null, threshold: 0 });

// console.log("lazyObserver:", lazyObserver);

lazyTargets.forEach((lazyEl) => lazyObserver.observe(lazyEl));

// ----------------------------------------
// Slider - Component
// ----------------------------------------
const slides = document.querySelectorAll(".slide");

const slider = document.querySelector(".slider");

const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");

const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length - 1;

// slider.style.transform = `scale(.5)`;
// slider.style.overflow = `visible`;

// 0%,100%,200%,300%
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${i * 100}%)`;
});

// ------------------------------------------------------
// Before Refactoring the Code
// ------------------------------------------------------
// sliderBtnRight.addEventListener("click", function (e) {
//   if (currentSlide === maxSlide) {
//     currentSlide = 0;
//   } else {
//     currentSlide++;
//   }

//   // -100%,0%,100%,200%
//   slides.forEach((slide, i) => {
//     // console.log("i:", i, "currentSlide:", currentSlide);
//     slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
//   });
// });

// sliderBtnLeft.addEventListener("click", function (e) {
//   if (currentSlide === 0) {
//     currentSlide = maxSlide;
//   } else {
//     currentSlide--;
//   }

//   slides.forEach((slide, i) => {
//     console.log(i, currentSlide);
//     slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
//   });
// });

// Creating Dots here
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide=${i}></button>`);
  });
};
createDots();

const activeDots = function (slide) {
  document.querySelectorAll(".dots__dot").forEach((dot) => dot.classList.remove("dots__dot--active"));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};

activeDots(0);

// Goto the slide
const gotoSlide = function (curSlide) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
};
// gotoSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  gotoSlide(currentSlide);
  activeDots(currentSlide);
};

const pervSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }

  gotoSlide(currentSlide);
  activeDots(currentSlide);
};

sliderBtnRight.addEventListener("click", nextSlide);

sliderBtnLeft.addEventListener("click", pervSlide);

// KeyBoard Functionalities

document.addEventListener("keydown", function (e) {
  // console.log(e);
  if (e.key === "ArrowRight") nextSlide();
  e.key === "ArrowLeft" && pervSlide();
});

// if we click dot, it will goes to that slide.
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    gotoSlide(slide);
    activeDots(slide);
  }
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

// ----------------------------------------------------------

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
