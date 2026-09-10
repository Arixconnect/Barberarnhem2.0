const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Menu openen'); toggle.textContent = '☰'; }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen'); toggle.textContent = open ? '×' : '☰'; });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });

// Independent native range controls support touch, mouse and keyboard.
document.querySelectorAll('.comparison').forEach(comparison => {
  const range = comparison.querySelector('input');
  range.addEventListener('input', () => {
    comparison.style.setProperty('--split', `${range.value}%`);
    range.setAttribute('aria-valuetext', `${range.value}% voor zichtbaar`);
  });
});

const carousel = document.querySelector('.hero-carousel');
const slides = [...carousel.querySelectorAll('.hero-slide')];
const pauseButton = carousel.querySelector('.carousel-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentSlide = 0;
let paused = reducedMotion.matches;
let carouselTimer;
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
    slide.setAttribute('aria-hidden', String(i !== currentSlide));
  });
  carousel.querySelector('.carousel-count').textContent = `${currentSlide + 1} / ${slides.length}`;
}
function scheduleSlides() {
  clearInterval(carouselTimer);
  pauseButton.textContent = paused ? '▶' : 'Ⅱ';
  pauseButton.setAttribute('aria-label', paused ? 'Diavoorstelling afspelen' : 'Diavoorstelling pauzeren');
  if (!paused && !document.hidden) carouselTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}
carousel.querySelector('.carousel-prev').addEventListener('click', () => { showSlide(currentSlide - 1); scheduleSlides(); });
carousel.querySelector('.carousel-next').addEventListener('click', () => { showSlide(currentSlide + 1); scheduleSlides(); });
pauseButton.addEventListener('click', () => { paused = !paused; scheduleSlides(); });
document.addEventListener('visibilitychange', scheduleSlides);
reducedMotion.addEventListener('change', event => { paused = event.matches; scheduleSlides(); });
scheduleSlides();
