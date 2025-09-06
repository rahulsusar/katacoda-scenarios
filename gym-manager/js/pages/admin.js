function trainerRow(t) {
	return `<tr><td><img src="${t.photo}" alt="${t.name}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;margin-right:.5rem;vertical-align:middle">${t.name}</td><td>${t.bio}</td><td style="text-align:right"><button class="btn warn" data-del-trainer="${t.id}">Delete</button></td></tr>`;
}
function classRow(c, store) {
	const trainer = store.getTrainers().find(t => t.id === c.trainerId);
	return `<tr><td>${c.title}</td><td>${trainer?.name ?? ''}</td><td>${c.day} ${c.time}</td><td>${c.capacity}</td><td style="text-align:right"><button class="btn warn" data-del-class="${c.id}">Delete</button></td></tr>`;
}

export function renderAdmin(root, store) {
	const trainers = store.getTrainers();
	const classes = store.getClasses();
	root.innerHTML = `
		<section class="card">
			<h2>Admin Dashboard</h2>
			<div class="grid two">
				<form id="addTrainer" class="card">
					<h3>Add Trainer</h3>
					<label for="tname">Name</label>
					<input id="tname" name="name" required>
					<label for="tbio">Bio</label>
					<input id="tbio" name="bio" required>
					<label for="tphoto">Photo URL</label>
					<input id="tphoto" name="photo" required>
					<button class="btn" type="submit">Add Trainer</button>
				</form>
				<form id="addClass" class="card">
					<h3>Add Class</h3>
					<label for="ctitle">Title</label>
					<input id="ctitle" name="title" required>
					<div class="row">
						<div>
							<label for="cday">Day</label>
							<select id="cday" name="day">
								<option>Mon</option><option>Tue</option><option>Wed</option><option>Thu</option><option>Fri</option><option>Sat</option><option>Sun</option>
							</select>
						</div>
						<div>
							<label for="ctime">Time</label>
							<input id="ctime" name="time" required placeholder="07:00">
						</div>
					</div>
					<label for="ctrainer">Trainer</label>
					<select id="ctrainer" name="trainerId">${trainers.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}</select>
					<label for="ccap">Capacity</label>
					<input id="ccap" name="capacity" type="number" min="1" value="10">
					<button class="btn" type="submit">Add Class</button>
				</form>
			</div>
			<div class="card">
				<h3>Trainers</h3>
				<table><thead><tr><th>Name</th><th>Bio</th><th></th></tr></thead><tbody>${trainers.map(trainerRow).join('')}</tbody></table>
			</div>
			<div class="card">
				<h3>Classes</h3>
				<table><thead><tr><th>Title</th><th>Trainer</th><th>Time</th><th>Capacity</th><th></th></tr></thead><tbody>${classes.map(c => classRow(c, store)).join('')}</tbody></table>
			</div>
		</section>
	`;

	document.getElementById('addTrainer').addEventListener('submit', e => {
		e.preventDefault();
		const f = e.target;
		const t = { id: crypto.randomUUID(), name: f.name.value, bio: f.bio.value, photo: f.photo.value };
		store.addTrainer(t);
		renderAdmin(root, store);
	});
	document.getElementById('addClass').addEventListener('submit', e => {
		e.preventDefault();
		const f = e.target;
		const c = { id: crypto.randomUUID(), title: f.title.value, day: f.day.value, time: f.time.value, trainerId: f.trainerId.value, capacity: Number(f.capacity.value || 10) };
		store.addClass(c);
		renderAdmin(root, store);
	});
	root.querySelectorAll('[data-del-trainer]').forEach(btn => btn.addEventListener('click', () => {
		store.deleteTrainer(btn.getAttribute('data-del-trainer'));
		renderAdmin(root, store);
	}));
	root.querySelectorAll('[data-del-class]').forEach(btn => btn.addEventListener('click', () => {
		store.deleteClass(btn.getAttribute('data-del-class'));
		renderAdmin(root, store);
	}));
}