self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('flexfit-static-v1').then(cache => cache.addAll([
			'/',
			'/index.html',
			'/css/styles.css',
			'/js/main.js',
			'/js/router.js',
			'/js/store.js',
			'/js/pages/home.js',
			'/js/pages/schedule.js',
			'/js/pages/trainers.js',
			'/js/pages/membership.js',
			'/js/pages/book.js',
			'/js/pages/admin.js'
		]))
	);
});
self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(res => res || fetch(e.request))
	);
});