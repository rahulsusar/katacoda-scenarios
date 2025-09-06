export function initRouter(routes) {
	function render() {
		const hash = location.hash.replace(/^#/, '') || '/';
		const handler = routes[hash] || routes['/'];
		handler && handler();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	window.addEventListener('hashchange', render, { passive: true });
	window.addEventListener('load', render, { once: true });
}