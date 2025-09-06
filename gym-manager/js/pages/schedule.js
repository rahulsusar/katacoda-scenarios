function classRow(c) {
	return `<tr><td>${c.title}</td><td>${c.trainer?.name ?? ''}</td><td><span class="pill">${c.day}</span> ${c.time}</td><td>${c.capacity}</td></tr>`;
}

export function renderSchedule(root, store) {
	const classes = store.getClasses();
	root.innerHTML = `
		<section class="card">
			<h2>Class Schedule</h2>
			<div class="card">
				<table>
					<thead><tr><th>Class</th><th>Trainer</th><th>Time</th><th>Capacity</th></tr></thead>
					<tbody>${classes.map(classRow).join('')}</tbody>
				</table>
			</div>
			<a class="btn" href="#/book">Book a Class</a>
		</section>
	`;
}