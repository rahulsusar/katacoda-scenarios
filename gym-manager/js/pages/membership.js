export function renderMembership(root) {
	root.innerHTML = `
		<section class="card">
			<h2>Membership Plans</h2>
			<div class="grid three">
				<div class="card">
					<h3>Basic</h3>
					<p class="muted">Gym floor access</p>
					<p><strong>$19/mo</strong></p>
					<a class="btn" href="#/book">Get Started</a>
				</div>
				<div class="card">
					<h3>Plus</h3>
					<p class="muted">Gym + 4 classes</p>
					<p><strong>$39/mo</strong></p>
					<a class="btn secondary" href="#/book">Choose Plus</a>
				</div>
				<div class="card">
					<h3>Pro</h3>
					<p class="muted">Unlimited classes</p>
					<p><strong>$59/mo</strong></p>
					<a class="btn" href="#/book">Go Pro</a>
				</div>
			</div>
		</section>
	`;
}