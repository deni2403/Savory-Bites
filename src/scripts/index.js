import 'regenerator-runtime';
import '../styles/main.scss';
import '../styles/responsif.scss';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#main'),
});

const skipLink = document.querySelector('.skip');
const mainContent = document.querySelector('#main');

skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  mainContent.scrollIntoView({ behavior: 'smooth' });
  skipLink.blur();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
