import viewport from './viewport.js';
import circleGenerator from './circles.js';
import colors from './colors.js';
import initGame from './game.js';

const main = document.querySelector('main');
const svg = document.querySelector('svg');

viewport.init(main, svg);

circleGenerator.init(svg);

const circles = document.querySelectorAll('svg > circle');
colors.init(circles);

document.addEventListener('touchstart', () => { }, { passive: true });

document.addEventListener('click', initGame(circles));