// Scroll-triggered animations using IntersectionObserver
document.addEventListener('DOMContentLoaded', function () {
	const opts = {
		root: null,
		rootMargin: '0px 0px -8% 0px',
		threshold: 0.08
	};

	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				// stop observing to keep element visible
				obs.unobserve(entry.target);
			}
		});
	}, opts);

	// Observe elements with these classes
	document.querySelectorAll('.fade-in-scroll, .slide-up-scroll').forEach(el => {
		observer.observe(el);
	});
});

