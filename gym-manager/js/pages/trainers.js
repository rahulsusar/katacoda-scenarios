function trainerCard(t) {
	return `
		<div class="card">
			<div style="display:flex;gap:.75rem;align-items:center">
				<img src="${t.photo}" alt="${t.name}" style="width:64px;height:64px;border-radius:50%;object-fit:cover">
				<div>
					<h3 style="margin:.2rem 0">${t.name}</h3>
					<p class="muted">${t.bio}</p>
				</div>
			</div>
		</div>`;
}

export function renderTrainers(root, store) {
	const trainers = store.getTrainers();
	root.innerHTML = `
		<section class="card">
			<h2>Our Trainers</h2>
			<div class="grid two">${trainers.map(trainerCard).join('')}</div>
		</section>
	`;
}