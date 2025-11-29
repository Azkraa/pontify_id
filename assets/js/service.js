document.addEventListener('DOMContentLoaded', () => {
    // === Konfigurasi Umum ===
    const observerOptions = {
        root: null, // Menggunakan viewport
        threshold: 0.15 // Pemicu ketika 15% elemen terlihat
    };

    // ===================================
    // 1. ANIMASI ELEMEN UMUM (Judul, Subjudul, CTA)
    // ===================================

    const generalElements = document.querySelectorAll('.animate-on-scroll');
    
    const generalCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Untuk elemen umum, langsung tambahkan kelas is-visible
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const generalObserver = new IntersectionObserver(generalCallback, observerOptions);

    generalElements.forEach(el => {
        generalObserver.observe(el);
    });


    // ===================================
    // 2. ANIMASI KARTU LAYANAN (Staggered)
    // ===================================

    const serviceCards = document.querySelectorAll('.service-card');

    const serviceCardCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                
                // Cari indeks elemen ini di NodeList serviceCards asli untuk stagger
                const index = Array.from(serviceCards).indexOf(card);

                // Tambahkan kelas is-visible setelah penundaan, menggunakan indeks DOM
                setTimeout(() => {
                    card.classList.add('is-visible');
                    observer.unobserve(card); 
                }, index * 150); // Jeda: 0ms, 150ms, 300ms, 450ms, dst.
            }
        });
    };

    const serviceCardObserver = new IntersectionObserver(serviceCardCallback, observerOptions);

    serviceCards.forEach(card => {
        serviceCardObserver.observe(card);
    });
});