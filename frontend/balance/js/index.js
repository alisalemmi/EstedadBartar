import '../scss/main.scss';

import '../../modules/intro/intro';
import * as Fullscreen from './view/fullscreen';
import * as Play from '../../modules/button/play';

Play.playButtonHandler(() => {
  Fullscreen.request(() => {
    document.querySelector('#check__score').checked = true;
  }); // TODO biuld a real exit handler
});

// const DOM = {
//   polygons: document.querySelectorAll('.polygon')
// };

// DOM.polygons.forEach(p => {
//   p.style.left = '10rem';
// });

// /**
//  * generate a regular polygon. return points string.
//  * @param {Number} v number of vertices
//  */
// const polygonGenerator = v => {
//   const r = 100;
//   let points = '';

//   for (let i = 0; i < v; i++) {
//     const d = (i / v) * 2 * Math.PI;
//     points += `${r * Math.cos(d) + r},${r * Math.sin(d) + r} `;
//   }

//   return points;
// };

// const polygon = document.getElementById('polygon').getContext('2d');
