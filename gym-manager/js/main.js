import { initRouter } from '/js/router.js';
import { DataStore } from '/js/store.js';
import { renderHome } from '/js/pages/home.js';
import { renderSchedule } from '/js/pages/schedule.js';
import { renderTrainers } from '/js/pages/trainers.js';
import { renderMembership } from '/js/pages/membership.js';
import { renderBook } from '/js/pages/book.js';
import { renderAdmin } from '/js/pages/admin.js';
import '/js/sw-register.js';

const appEl = document.getElementById('app');

document.getElementById('year').textContent = new Date().getFullYear();

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
	const expanded = navToggle.getAttribute('aria-expanded') === 'true';
	navToggle.setAttribute('aria-expanded', String(!expanded));
	nav.classList.toggle('collapsed');
});

const store = new DataStore('flexfit_v1');
store.bootstrap();

const routes = {
	'/': () => renderHome(appEl, store),
	'/schedule': () => renderSchedule(appEl, store),
	'/trainers': () => renderTrainers(appEl, store),
	'/membership': () => renderMembership(appEl, store),
	'/book': () => renderBook(appEl, store),
	'/admin': () => renderAdmin(appEl, store)
};

initRouter(routes);