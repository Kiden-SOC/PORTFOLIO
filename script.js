const SECTIONS = ['home', 'skills', 'projects', 'certs', 'about', 'contact'];
const TITLES = {
    home: 'Kiden Sarah Ruth Lubang | Aspiring SOC Analyst',
    skills: 'Skills & Competencies | Kiden Lubang',
    projects: 'Projects | Kiden Lubang',
    certs: 'Certifications | Kiden Lubang',
    about: 'About Me | Kiden Lubang',
    contact: 'Contact | Kiden Lubang'
};


/* ---------- Clock ---------- */
function updateClock() {
    const timeDiv = document.getElementById('date-time');
    if (!timeDiv) return;
    const options = { timeZone: 'Africa/Kampala', hour: '2-digit', minute: '2-digit' };
    timeDiv.textContent = 'KAMPALA: ' + new Date().toLocaleTimeString('en-GB', options);
}

/* ---------- Sections ---------- */
function showSection(sectionId) {
    if (!SECTIONS.includes(sectionId)) sectionId = 'home';

    document.querySelectorAll('.content-section').forEach((sec) => {
        sec.classList.toggle('is-active', sec.id === sectionId);
    });

    document.querySelectorAll('.main-nav a[data-section]').forEach((a) => {
        if (a.dataset.section === sectionId) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
    });

    document.title = TITLES[sectionId];
    window.scrollTo({ top: 0 });
}

document.querySelectorAll('[data-section]').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.dataset.section;
        if (location.hash !== '#' + id) history.pushState(null, '', '#' + id);
        showSection(id);
    });
});

// Back / forward buttons
window.addEventListener('hashchange', () => showSection(location.hash.slice(1)));

/* ---------- Certificate viewer ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(img) {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
}

document.querySelectorAll('#certs .cert-display-img').forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View larger: ' + img.alt);
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(img);
        }
    });
});

document.getElementById('closeLightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
});

/* ---------- Contact form ---------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('cf-name').value.trim();
        const email = document.getElementById('cf-email').value.trim();
        const message = document.getElementById('cf-message').value.trim();

        const subject = 'Portfolio message from ' + name;
        const body = message + '\n\nFrom: ' + name + ' (' + email + ')';

        window.location.href = 'mailto:lubangruth@gmail.com?subject=' +
            encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

        document.getElementById('form-status').textContent =
            'Opening your email app with the message ready to send.';
    });
}

/* ---------- Start up ---------- */
window.addEventListener('load', () => {
    showSection(location.hash.slice(1) || 'home');
    updateClock();
    setInterval(updateClock, 1000);
});