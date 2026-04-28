// ================= CONTACT FORM =================
const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    form.reset();
  });
}


// ================= SLIDER =================
let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const slideContainer = document.querySelector(".slides");
const nextBtn = document.querySelector(".nav-btn.right");
const prevBtn = document.querySelector(".nav-btn.left");

function updateSlide() {
  if (!slideContainer || slides.length === 0) return;
  slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// NEXT
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
    resetAutoSlide();
  });
}

// PREVIOUS
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentSlide =
      (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
    resetAutoSlide();
  });
}


// ================= AUTO SLIDE =================
let autoSlide;

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 6000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();


// ================= PAUSE ON HOVER =================
const slider = document.querySelector(".dashboard-slider");

if (slider) {
  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", startAutoSlide);
}


// ================= TOUCH / SWIPE =================
let startX = 0;

if (slideContainer) {
  slideContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slideContainer.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
      } else {
        currentSlide =
          (currentSlide - 1 + slides.length) % slides.length;
      }

      updateSlide();
      resetAutoSlide();
    }
  });
}


// ================= SCROLL ANIMATION =================
const sections = document.querySelectorAll('.section');

function revealSections() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);


// ================= MOBILE MENU =================
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("mobile-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
    });
  });
}