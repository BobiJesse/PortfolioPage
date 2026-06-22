/* =========================
   FOOTER
========================= */

fetch("Footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    });

/* =========================
    NAVBAR
========================= */

fetch("Navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;

        highlightCurrentPage();
        setupHamburgerMenu();
        setupSubmenus();
        setupNavbarScroll();
    });

/* =========================
   CURRENT PAGE
========================= */

function highlightCurrentPage() 
{
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.id = "current-page";
        }
    });

    document.querySelectorAll(".hamburger-dropdown a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.id = "current-page-hamburger";
        }
    });
}

/* =========================
   HAMBURGER MENU
========================= */

function setupHamburgerMenu() {
    const burger = document.querySelector(".hamburger-button");
    const dropdown = document.getElementById("hamburger-dropdown");

    if (!burger || !dropdown)
        return;

    burger.addEventListener("click", (event) => {
        event.stopPropagation();

        dropdown.style.display =
            dropdown.style.display === "block"
                ? "none"
                : "block";
    });

    dropdown.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    document.addEventListener("click", () => {
        dropdown.style.display = "none";
    });

    dropdown.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            dropdown.style.display = "none";
        });
    });
}

function setupSubmenus() {
    const buttons = document.querySelectorAll(".submenu-toggle");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const submenu = button.parentElement;

            submenu.classList.toggle("open");
        });
    });
}

/* =========================
   NAVBAR SCROLL
========================= */

function setupNavbarScroll() 
{
    const navbar = document.querySelector(".navbar");

    if (!navbar || !document.body.classList.contains("navbar-scroll-fade")) return;

    window.addEventListener("scroll", () => {
        const maxScroll = 200;
        const scroll = Math.min(window.scrollY, maxScroll);

        const opacity = scroll / maxScroll;

        navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    });
}

/* =========================
   HERO VIDEO
========================= */

const heroVideo = document.getElementById("hero-video");

if (heroVideo) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play();
            } else {
                heroVideo.pause();
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(heroVideo);
}