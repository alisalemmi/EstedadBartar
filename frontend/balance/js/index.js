import '../scss/main.scss';

import '../../modules/intro/intro';
import * as Play from '../../modules/button/play';
import * as Fullscreen from './view/fullscreen';
import * as Motion from './view/motion';
import * as Buble from './view/buble';
import * as Touch from './view/touch';
import * as Ball from './view/ball';
import * as Score from './view/score';

const finish = () => {
  Buble.stop();
  Ball.stop();
  // Touch.stop();
  Score.stop();

  document.querySelector('#check__score').checked = true;
};

const start = () => {
  Buble.start();
  Ball.start();
  Score.start();

  // 2. motion
  Motion.addHandler(e => {
    Buble.moveBuble(e); // TODO handle reject
    Buble.validate(finish);
  });
};

Play.playButtonHandler(() => {
  Fullscreen.request(finish); // TODO biuld a real exit handler
});

Touch.start(start);

Touch.validate(finish);

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
