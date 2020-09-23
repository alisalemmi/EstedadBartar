window.addEventListener('load', () => {
  document.querySelector('.intro').style.animationPlayState = 'running';
  document.querySelector('.intro__logo').style.animationPlayState = 'running';

  document
    .querySelector('.intro__logo')
    .addEventListener('animationend', () => {
      document.querySelector('#check__menu').checked = true;
    });
});
