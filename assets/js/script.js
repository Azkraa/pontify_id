document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------
    // Load Navbar and initialize responsiveness
    // ----------------------------------------------
    function loadNavbar() {
        const placeholder = document.getElementById('navbar-placeholder');
        if (!placeholder) return;

        // Note: Make sure the path 'partials/navbar.html' is correct
        fetch('partials/navbar.html') 
            .then(res => res.text())
            .then(html => {
                placeholder.innerHTML = html;
                
                // ----------------------------------------------
                // FIX: INITIALIZE RESPONSIVENESS HERE
                // ----------------------------------------------
                const menuToggler = document.getElementById('menuToggler');
                const navbarCenter = document.getElementById('navbarCenter');
                const navbar = document.querySelector('.navbar'); // It should now exist

                if (menuToggler && navbarCenter) {
                    menuToggler.addEventListener('click', function() {
                        navbarCenter.classList.toggle('active');
                        menuToggler.classList.toggle('open');
                    });
                    
                    // Close menu when a link is clicked
                    const navLinks = navbarCenter.querySelectorAll('a');
                    navLinks.forEach(link => {
                        link.addEventListener('click', () => {
                            navbarCenter.classList.remove('active');
                            menuToggler.classList.remove('open');
                        });
                    });
                }
                // ----------------------------------------------
                
                // Set active link after navbar is added into DOM
                setActiveNavbarLink();
                
                // Ensure the scroll effect also runs the first time on the newly loaded navbar
                if (window.scrollY > 10 && navbar) {
                    navbar.classList.add("scrolled");
                }
            })
            .catch(err => console.error("Navbar load error:", err));
    }

    // ----------------------------------------------
    // Set active link (for page-to-page navigation)
    // ----------------------------------------------
    function setActiveNavbarLink() {
        // ... (rest of your setActiveNavbarLink function remains unchanged) ...
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.navbar-center ul li a');

        links.forEach(link => {
            const linkPage = link.getAttribute('href');
            link.classList.remove('active');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // ----------------------------------------------
    // Load Footer
    // ----------------------------------------------
    function loadFooter() {
        // ... (rest of your loadFooter function remains unchanged) ...
        const placeholder = document.getElementById('footer-placeholder');
        if (!placeholder) return;

        fetch('partials/footer.html')
            .then(res => res.text())
            .then(html => {
                placeholder.innerHTML = html;
            })
            .catch(err => console.error("Footer load error:", err));
    }

    // ----------------------------------------------
    // Navbar scroll effect
    // ----------------------------------------------
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            if (window.scrollY > 10) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // ----------------------------------------------
    // Start
    // ----------------------------------------------
    loadNavbar();
    loadFooter();
});