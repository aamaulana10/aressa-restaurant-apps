import '../styles/main.css';
import '../styles/responsive.css';
import '../styles/animation.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import WebSocketInitiator from './utils/websocket-initiator';
import CONFIG from './globals/config';


let prevPage = null;

const setupHeaderScroll = () => {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

const app = new App({
    button: document.querySelector('#menu'),
    drawer: document.querySelector('#drawer'),
    content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', async () => {
    if (prevPage && prevPage.beforeLeave) {
        await prevPage.beforeLeave();
      }
      prevPage = await app.renderPage();
});

window.addEventListener('load', async() => {
    prevPage = await app.renderPage();
    setupHeaderScroll();
    // swRegister();
    WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});

