export function renderHome(root, store) {
	root.innerHTML = `
		<section class="card">
			<h2>Welcome to FlexFit Gym</h2>
			<p>Train smarter with expert-led classes, personalized plans, and a community that keeps you motivated.</p>
			<div class="grid three">
				<div class="card">
					<h3>Classes</h3>
					<p>Explore dynamic sessions from HIIT to Strength.</p>
					<a class="btn" href="#/schedule">View Schedule</a>
				</div>
				<div class="card">
					<h3>Trainers</h3>
					<p>Meet certified coaches to guide your journey.</p>
					<a class="btn" href="#/trainers">Our Trainers</a>
				</div>
				<div class="card">
					<h3>Join</h3>
					<p>Flexible memberships for every goal.</p>
					<a class="btn secondary" href="#/membership">Memberships</a>
				</div>
			</div>
		</section>
	`;
}