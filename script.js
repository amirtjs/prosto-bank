'use strict';

const modalWindow = document.querySelector('.modal-window'),
  overlay = document.querySelector('.overlay'),
  btnCloseModalWindow = document.querySelector('.btn--close-modal-window'),
  btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');

const sliderWrap = document.querySelector('.slider'),
  slides = document.querySelectorAll('.slide'),
  lengthOfSlides = slides.length,
  header = document.querySelector('.nav__links'),
  btnShowMore = document.querySelector('.btn--scroll-to'),
  sectionToShow = document.querySelector(`#section--1`),
  tabsWrapp = document.querySelector('.operations__tab-container');

const tabs = document.querySelectorAll('.operations__content'),
  navLinks = document.querySelector('.nav__links'),
  navLogo = document.querySelector('.nav__logo'),
  navTitle = document.querySelector('.nav__text');

const sectionHeader = document.querySelector('.header'),
  nav = document.querySelector('.nav'),
  navSize = nav.getBoundingClientRect();

const allSections = document.querySelectorAll('section');
const sectionImages = document.querySelectorAll('img[data-src]');

// Modal window
const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModalWindow.length; i++)
  btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// smooth scrolling through the site

function scrollToSeaction(e) {
  e.preventDefault();
  if (!e.target.closest('li')) return;

  const section = document.querySelector(`${e.target.getAttribute('href')}`);

  // Use the old method for better browser support
  const cords = section.getBoundingClientRect();
  window.scrollTo({
    left: cords.left + window.pageXOffset,
    top: cords.top + window.pageYOffset,
    behavior: 'smooth',
  });
}

// also implementation a new method
header.addEventListener('click', scrollToSeaction);

btnShowMore.addEventListener('click', function () {
  sectionToShow.scrollIntoView({ behavior: 'smooth' });
});

// Implementation of tabs

function openTabs(e) {
  e.preventDefault();
  if (!e.target.classList.contains('btn')) return;

  tabsWrapp
    .querySelectorAll('.btn')
    .forEach(el => el.classList.remove('operations__tab--active'));

  tabs.forEach(el => el.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${e.target.dataset.tab}`)
    .classList.add('operations__content--active');

  e.target.classList.add('operations__tab--active');
}

tabsWrapp.addEventListener('click', openTabs);

//dimming when pointing the navbar

navLinks.addEventListener('mouseover', darkenElems.bind(0.4));
navLinks.addEventListener('mouseout', darkenElems.bind(1));
function darkenElems(e) {
  const navLinks = e.target.closest('.nav').querySelectorAll('.nav__link');
  const arrOfItems = Array.from(navLinks);

  arrOfItems.push(navLogo, navTitle);

  arrOfItems.forEach(el => {
    if (e.target.classList.contains('btn')) {
      el.style.opacity = 1;
    }
    if (el !== e.target) {
      el.style.opacity = this;
    }
  });
}

// sticky nav

function showNav(entries) {
  if (entries[0].isIntersecting === false) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}
const observ = new IntersectionObserver(showNav, {
  root: null,
  rootMargin: `${navSize.height}px`,
});
observ.observe(sectionHeader);

//Displaying elements when scrolling

function displayElementsByScroll(entries, observer) {
  const entry = entries[0];
  const target = entry.target;
  if (!entry.isIntersecting === true) return;
  target.classList.remove('hidden');
  observer.unobserve(target);
}

const observAllSections = new IntersectionObserver(displayElementsByScroll, {
  root: null,
  threshold: 0.25,
});
allSections.forEach(section => {
  section.classList.add('hidden');
  observAllSections.observe(section);
});

//Lazy Loading

const observImg = new IntersectionObserver(changeImg, {
  root: null,
  threshold: 0.2,
});

function changeImg(entry, observer) {
  if (!entry[0].isIntersecting) return;

  entry[0].target.src = entry[0].target.dataset.src;
  observer.unobserve(entry[0].target);
  entry[0].target.addEventListener('load', function () {
    entry[0].target.classList.remove('lazy-img');
  });
}

sectionImages.forEach(img => observImg.observe(img));

// slider

let currantSlide = 0;
slides.forEach((el, index) => {
  el.style.transform = `translateX(${index * 100}%)`;
});
document
  .querySelector('.slider__btn--right')
  .addEventListener('click', function () {
    if (currantSlide === lengthOfSlides - 1) {
      currantSlide = 0;
    } else {
      currantSlide++;
    }

    slides.forEach((el, index) => {
      el.style.transform = `translateX(${(index - currantSlide) * 100}%)`;
    });
  });
document
  .querySelector('.slider__btn--left')
  .addEventListener('click', function () {
    if (currantSlide === 0) {
      currantSlide = lengthOfSlides - 1;
    } else {
      currantSlide--;
    }

    slides.forEach((el, index) => {
      el.style.transform = `translateX(${(index - currantSlide) * 100}%)`;
    });
  });
