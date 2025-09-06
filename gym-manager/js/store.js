const defaultData = {
	trainers: [
		{ id: 't1', name: 'Ava Carter', bio: 'Strength & Conditioning', photo: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600' },
		{ id: 't2', name: 'Liam Brooks', bio: 'HIIT & Mobility', photo: 'https://images.unsplash.com/photo-1594737625785-c6683fc6e2f6?w=600' }
	],
	classes: [
		{ id: 'c1', title: 'HIIT Blast', trainerId: 't2', day: 'Mon', time: '07:00', capacity: 12 },
		{ id: 'c2', title: 'Strength 101', trainerId: 't1', day: 'Wed', time: '18:00', capacity: 10 }
	],
	bookings: []
};

export class DataStore {
	constructor(key) {
		this.key = key;
		this.state = defaultData;
	}
	bootstrap() {
		const existing = localStorage.getItem(this.key);
		if (existing) {
			try {
				this.state = JSON.parse(existing);
			} catch {
				this.state = defaultData;
			}
		} else {
			this.persist();
		}
		if (!('bookings' in this.state)) this.state.bookings = [];
	}
	persist() { localStorage.setItem(this.key, JSON.stringify(this.state)); }
	getTrainers() { return [...this.state.trainers]; }
	getClasses() { return this.state.classes.map(c => ({ ...c, trainer: this.state.trainers.find(t => t.id === c.trainerId) })); }
	getBookings() { return [...this.state.bookings]; }

	addTrainer(trainer) { this.state.trainers.push(trainer); this.persist(); }
	updateTrainer(id, patch) { const t = this.state.trainers.find(t => t.id === id); if (!t) return; Object.assign(t, patch); this.persist(); }
	deleteTrainer(id) { this.state.trainers = this.state.trainers.filter(t => t.id !== id); this.state.classes = this.state.classes.filter(c => c.trainerId !== id); this.persist(); }

	addClass(cls) { this.state.classes.push(cls); this.persist(); }
	updateClass(id, patch) { const c = this.state.classes.find(c => c.id === id); if (!c) return; Object.assign(c, patch); this.persist(); }
	deleteClass(id) { this.state.classes = this.state.classes.filter(c => c.id !== id); this.persist(); }

	bookClass(booking) {
		const klass = this.state.classes.find(c => c.id === booking.classId);
		const count = this.state.bookings.filter(b => b.classId === booking.classId).length;
		if (count >= klass.capacity) { throw new Error('Class is full'); }
		this.state.bookings.push(booking);
		this.persist();
	}
	cancelBooking(id) { this.state.bookings = this.state.bookings.filter(b => b.id !== id); this.persist(); }
}