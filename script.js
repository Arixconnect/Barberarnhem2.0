const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Menu openen'); toggle.textContent = '☰'; }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen'); toggle.textContent = open ? '×' : '☰'; });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
