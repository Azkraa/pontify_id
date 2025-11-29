document.addEventListener('DOMContentLoaded', function() {
    const menuToggler = document.getElementById('menuToggler');
    const navbarCenter = document.getElementById('navbarCenter');
    const navbar = document.querySelector('.navbar');

    if (menuToggler && navbarCenter) {
        menuToggler.addEventListener('click', function() {
            // 1. Toggles the menu visibility (for the navbar-center CSS)
            navbarCenter.classList.toggle('active');
            
            // 2. Toggles the icon animation (for the hamburger CSS)
            menuToggler.classList.toggle('open'); 
        });
        
        // Optional: Close menu when a link is clicked
        const navLinks = navbarCenter.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCenter.classList.remove('active');
                menuToggler.classList.remove('open');
            });
        });
    }

    // Scroll effect (already present and correct)
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});