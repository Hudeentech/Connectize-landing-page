// Mobile menu toggle and accessibility
document.addEventListener('DOMContentLoaded', function () {
	const btn = document.getElementById('mobile-menu-button');
	const panel = document.getElementById('mobile-menu-panel');
	const overlay = document.getElementById('mobile-menu');
	if (!btn || !panel || !overlay) return;

	const focusableSelector = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
	let lastFocused = null;

	function openMenu() {
		lastFocused = document.activeElement;
		panel.classList.add('open');
		overlay.classList.add('open');
		document.documentElement.classList.add('menu-open');
		btn.setAttribute('aria-expanded', 'true');
		// Prevent background scroll
		document.body.style.overflow = 'hidden';
		// focus first focusable in panel
		const first = panel.querySelector(focusableSelector);
		if (first) first.focus();
	}

	function closeMenu() {
		panel.classList.remove('open');
		overlay.classList.remove('open');
		document.documentElement.classList.remove('menu-open');
		btn.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = '';
		if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
	}

	function toggleMenu() {
		if (panel.classList.contains('open')) closeMenu(); else openMenu();
	}

	btn.addEventListener('click', function (e) {
		e.stopPropagation();
		toggleMenu();
	});

	overlay.addEventListener('click', function () {
		closeMenu();
	});

	// close when a mobile link is clicked
	panel.addEventListener('click', function (e) {
		const el = e.target.closest('.mobile-link');
		if (el) closeMenu();
	});

	// keyboard support
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && panel.classList.contains('open')) {
			closeMenu();
		}
		if (e.key === 'Tab' && panel.classList.contains('open')) {
			// simple focus trap
			const focusable = Array.from(panel.querySelectorAll(focusableSelector));
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	});

	// close on resize to avoid stuck state
	window.addEventListener('resize', function () {
		if (window.innerWidth >= 768 && panel.classList.contains('open')) {
			closeMenu();
		}
	});
});

