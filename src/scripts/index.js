import '../styles/main.css';
import '../styles/responsive.css';
import '../styles/animation.css';
import App from './views/app';
import swRegister from './utils/sw-register';


const setupNewsletter = () => {
    const form = document.querySelector('.newsletter__form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            // just dummy alert
            alert(`Thank you for subscribing with: ${email}`);
            form.reset();
        });
    }
};

const setupScrollAnimation = () => {
    const cards = document.querySelectorAll('.restaurant-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
};

window.addEventListener('DOMContentLoaded', () => {
    // setupNavbarMenu();
    // setupRestaurant();
    // setupFeatures();
    // setupNewsletter();
    // setupScrollAnimation();
});

const app = new App({
    button: document.querySelector('#menu'),
    drawer: document.querySelector('#drawer'),
    content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
});

