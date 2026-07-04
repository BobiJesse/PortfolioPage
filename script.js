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

function highlightCurrentPage() {
    let currentPage = window.location.pathname.split("/").pop();

    // If we're at "/", treat it as index.html
    if (currentPage === "") {
        currentPage = "index.html";
    }

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

function closeAllMenus() {
    document.getElementById("hamburger-dropdown")?.classList.remove("open");
    document.querySelector(".hamburger-button")?.classList.remove("open");

    document.querySelectorAll(".submenu.open").forEach(s => {
        s.classList.remove("open");
    });
}

function setupHamburgerMenu() {
    const burger = document.querySelector(".hamburger-button");
    const dropdown = document.getElementById("hamburger-dropdown");

    if (!burger || !dropdown) return;

    burger.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdown.classList.toggle("open");
        burger.classList.toggle("open");

        document.querySelectorAll(".submenu.open").forEach(submenu => {
            submenu.classList.remove("open");
        });
    });

    dropdown.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    document.addEventListener("click", () => {
        dropdown.classList.remove("open");
        burger.classList.remove("open");

        document.querySelectorAll(".submenu.open").forEach(submenu => {
            submenu.classList.remove("open");
        });
    });

    dropdown.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            dropdown.classList.remove("open");
            burger.classList.remove("open");

            document.querySelectorAll(".submenu.open").forEach(submenu => {
                submenu.classList.remove("open");
            });
        });
    });

    document.addEventListener("click", closeAllMenus);
}

function setupSubmenus() {
    const submenus = document.querySelectorAll(".submenu");

    submenus.forEach(submenu => {
        const button = submenu.querySelector(".submenu-toggle");

        button.addEventListener("click", (e) => {
            e.stopPropagation();

            submenus.forEach(s => {
                if (s !== submenu) s.classList.remove("open");
            });

            submenu.classList.toggle("open");
        });
    });
}

/* =========================
   NAVBAR SCROLL
========================= */

function setupNavbarScroll() {
    const navbar = document.querySelector(".navbar");

    if (!navbar || !document.body.classList.contains("navbar-scroll-fade")) return;

    window.addEventListener("scroll", () => {
        const maxScroll = 200;
        const scroll = Math.min(window.scrollY, maxScroll);

        const opacity = scroll / maxScroll;

        navbar.style.setProperty("--navbar-opacity", opacity);

        if (scroll > 0.7) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
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