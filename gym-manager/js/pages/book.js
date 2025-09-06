function options(list, selected) {
	return list.map(i => `<option value="${i.value}" ${selected === i.value ? 'selected' : ''}>${i.label}</option>`).join('');
}
function classOption(c) { return { value: c.id, label: `${c.title} • ${c.day} ${c.time} (${c.trainer?.name ?? ''})` }; }
function bookingRow(b, c) {
	return `<div class="list-item"><div><strong>${c.title}</strong><div class="muted">${c.day} ${c.time} • ${c.trainer?.name ?? ''}</div></div><button class="btn warn" data-cancel="${b.id}">Cancel</button></div>`;
}

export function renderBook(root, store) {
	const classes = store.getClasses();
	const bookings = store.getBookings();
	root.innerHTML = `
		<section class="card">
			<h2>Book a Class</h2>
			<form id="bookForm" class="card" autocomplete="on">
				<div class="row">
					<div>
						<label for="name">Your name</label>
						<input id="name" name="name" required placeholder="Alex Doe">
					</div>
					<div>
						<label for="email">Email</label>
						<input id="email" name="email" type="email" required placeholder="alex@example.com">
					</div>
				</div>
				<div>
					<label for="classId">Select class</label>
					<select id="classId" name="classId" required>${options(classes.map(classOption))}</select>
				</div>
				<button class="btn" type="submit">Book</button>
				<p id="err" class="muted"></p>
			</form>
			<section class="card">
				<h3>Your Bookings</h3>
				<div class="list">${bookings.map(b => bookingRow(b, classes.find(c => c.id === b.classId) || {})).join('') || '<p class="muted">No bookings yet.</p>'}</div>
			</section>
		</section>
	`;
	const form = document.getElementById('bookForm');
	const err = document.getElementById('err');
	form.addEventListener('submit', e => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(form).entries());
		try {
			store.bookClass({ id: crypto.randomUUID(), classId: data.classId, name: data.name, email: data.email, ts: Date.now() });
			renderBook(root, store);
		} catch (ex) {
			err.textContent = ex.message || String(ex);
		}
	});
	root.querySelectorAll('[data-cancel]').forEach(btn => btn.addEventListener('click', () => {
		store.cancelBooking(btn.getAttribute('data-cancel'));
		renderBook(root, store);
	}));
}