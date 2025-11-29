document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SEGMENTED SWITCH LOGIC ---
    const selectorButtons = document.querySelectorAll('.selector-btn');
    const companyGrid = document.getElementById('company-grid');
    const umkmGrid = document.getElementById('umkm-grid');

    // Helper to restart card animations
    const triggerCardAnimations = (gridElement) => {
        const cards = gridElement.querySelectorAll('.pricing-card');
        cards.forEach((card, index) => {
            card.classList.remove('fade-in-up');
            void card.offsetWidth; // Force reflow
            card.classList.add('fade-in-up');
            card.style.animationDelay = `${(index + 1) * 0.1}s`;
        });
    };

    // --- 2. ANIMATED COUNTER FOR PRICING ---
    const counters = document.querySelectorAll('.card-price .amount');
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const duration = 1500;
        const step = (target / duration) * 16;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                let displayText;
                if (target === 800000) displayText = Math.ceil(current / 1000) + 'k';
                else displayText = (Math.ceil(current) / 1000000).toFixed(1).replace('.0', '') + 'juta';
                element.textContent = displayText;
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 800000) element.textContent = '800k';
                else if (target === 1200000) element.textContent = '1,2juta';
                else if (target === 2500000) element.textContent = '2,5juta';
                else if (target === 5000000) element.textContent = '5juta';
                else if (target === 10000000) element.textContent = '10juta';
            }
        };
        requestAnimationFrame(updateCounter);
    };

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.closest('.active-grid')) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- Function to switch package ---
    const switchPackage = (target) => {
        // Update button active state
        selectorButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.selector-btn[data-target="${target}"]`).classList.add('active');

        // Toggle pricing grids
        if (target === 'umkm') {
            companyGrid.classList.remove('active-grid');
            umkmGrid.classList.add('active-grid');
            triggerCardAnimations(umkmGrid);
        } else {
            umkmGrid.classList.remove('active-grid');
            companyGrid.classList.add('active-grid');
            triggerCardAnimations(companyGrid);
        }

        // Save selection to localStorage
        localStorage.setItem('selectedPackage', target);

        // Restart price counter animation for visible grid
        const activeCounters = document.querySelectorAll('.active-grid .card-price .amount');
        activeCounters.forEach(counter => {
            const targetPrice = counter.getAttribute('data-target');
            if (targetPrice === '800000') counter.textContent = '800k';
            else if (targetPrice === '1200000') counter.textContent = '1,2juta';
            else if (targetPrice === '2500000') counter.textContent = '2,5juta';
            else if (targetPrice === '5000000') counter.textContent = '5juta';
            else if (targetPrice === '10000000') counter.textContent = '10juta';

            // If counter is already visible, animate immediately, else observe
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounter(counter);
            } else {
                counterObserver.observe(counter);
            }
        });
    };

    // --- Attach click listeners ---
    selectorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchPackage(target);
        });
    });

    // --- Restore last selected package from localStorage ---
    const savedPackage = localStorage.getItem('selectedPackage');
    if (savedPackage) {
        switchPackage(savedPackage);
    } else {
        // Default initial setup
        triggerCardAnimations(companyGrid);
    }

    // --- 3. INTRO ANIMATIONS (Header text) ---
    const introElements = document.querySelectorAll('.pricing-hero .fade-in-up');
    const introObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // CSS handles the animation start when visible
            }
        });
    }, { threshold: 0.1 });

    introElements.forEach(el => {
        introObserver.observe(el);
    });
});
