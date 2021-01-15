import anime from 'animejs/lib/anime.es';

export default function solarsysSVG() {
  // var path = anime.path('.solar-10');
  const svgObj = {
    deg1: 0,
    deg2: 0,
  };
  const innerCircHolder = document.querySelector('#innerCircHolder');
  const outerCircHolder = document.querySelector('#outerCircHolder');
  const warnicon = document.querySelector('#warnicon');
  const innerCx = 114.75;
  const innerCy = 114.75;
  anime({
    targets: svgObj,
    deg1: 360,
    easing: 'linear',
    duration: 4000,
    loop: true,
    update() {
      innerCircHolder.setAttribute('transform', `rotate(${svgObj.deg1}, ${innerCx} ${innerCy})`);
      warnicon.setAttribute('opacity', parseInt(svgObj.deg1 / 20, 10) % 2 === 0 ? 1 : 0.6);
    },
  });
  anime({
    targets: svgObj,
    deg2: 360,
    easing: 'linear',
    duration: 15000,
    loop: true,
    update() {
      outerCircHolder.setAttribute('transform', `rotate(${svgObj.deg2}, ${innerCx} ${innerCy})`);
    },
  });
  console.log('卫星旋转SVG start playing');
}
