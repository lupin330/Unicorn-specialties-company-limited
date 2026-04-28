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
  slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// NEXT
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide >= slides.length) currentSlide = 0;
    updateSlide();
    resetAutoSlide();
  });
}

// PREVIOUS
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    updateSlide();
    resetAutoSlide();
  });
}

// ================= AUTO SLIDE =================
let autoSlide = setInterval(nextSlide, 6000);

function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) currentSlide = 0;
  updateSlide();
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 6000);
}

// ================= PAUSE ON HOVER =================
const slider = document.querySelector(".dashboard-slider");

if (slider) {
  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", resetAutoSlide);
}

// ================= TOUCH / SWIPE SUPPORT =================
let startX = 0;
let endX = 0;

if (slideContainer) {
  slideContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slideContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
}

function handleSwipe() {
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // swipe left → next
      nextSlide();
    } else {
      // swipe right → previous
      currentSlide--;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      updateSlide();
    }
    resetAutoSlide();
  }
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