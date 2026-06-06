function updateClock() {
    const timeDiv = document.getElementById('date-time');
    if (timeDiv) {
        const now = new Date();
        const options = { timeZone: 'Africa/Kampala', hour: '2-digit', minute: '2-digit' };
        timeDiv.innerText = "KAMPALA: " + now.toLocaleTimeString('en-GB', options);
    }
}

function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    
    // Hide everything
    sections.forEach(sec => {
        sec.style.display = "none";
    });

    // Show the one we want
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        // Fix: Home needs flex, others need block
        if (sectionId === 'home') {
            activeSection.style.display = "flex";
        } else {
            activeSection.style.display = "block";
        }
    }

    // Always close sidebar
    const sidebar = document.getElementById("mySidebar");
    if (sidebar) sidebar.style.width = "0";
}

// Fix: changed 'windows' to 'window'
window.onload = function() {
    showSection('home');
    setInterval(updateClock, 1000);
    updateClock();
    
    // Check if status-text exists before setting it
    const status = document.getElementById('status-text');
    if (status) status.innerText = "🚀 Level 1: VM installed. Ready to build the Lab.";
};

// Form listener
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Message received! (Simulated)");
    });
}

// Basic Form Alert
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thanks for reaching out! Since this is a static site, you'll need a service like Formspree to actually get emails.");
});
