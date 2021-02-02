import * as PIXI from 'pixi.js';
// import * as PIXI from 'pixi.js-legacy';
// console.log(111)

// function webGLSupported() {
//   const canvas = document.createElement('canvas');
//   const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
//   return gl;
// }
// console.log(webGLSupported(),22);

const imgspriteSrc = require('../images/p0_canvasimg.png');

// const type = "WebGL";
// if (!PIXI.utils.isWebGLSupported()) {
//     type = "canvas";
// }
// PIXI.utils.sayHello(type);
const WIDTH = 1920;
const HEIGHT = 330;
const lineWidth = 1;
const color = 0x383e96;

const app = new PIXI.Application({
  transparent: true,
  antialias: true, // 抗锯齿
});

const container = new PIXI.Container();
app.stage.addChild(container);

const pointers1 = [
  { x: 0 - 20, y: 190 },
  { x: 95, y: 109 },
  { x: 1274, y: 281 },
  { x: 1920 + 20, y: 64 },
];
const pointers2 = [
  { x: 0 - 20, y: 190 },
  { x: 624, y: 65 },
  { x: 1274, y: 202 },
  { x: 1920 + 20, y: 119 },
];

// 两条折线
const line1 = new PIXI.Graphics();
const line2 = new PIXI.Graphics();
line1.lineStyle(lineWidth, color, 1);
line2.lineStyle(lineWidth, color, 1);
container.addChild(line1);
container.addChild(line2);

// 小圆点
const circ = new PIXI.Graphics();
circ.beginFill(color);
circ.drawCircle(0, 0, 2);
circ.endFill();

const circTexture = app.renderer.generateTexture(circ);
const circs = [];
const circContainer = new PIXI.Container();
for (let i = 0; i < 10; i += 1) {
  const circsprite = PIXI.Sprite.from(circTexture);
  circsprite.anchor.x = 0.5;
  circsprite.anchor.y = 0.5;
  circsprite.cacheAsBitmap = true;
  circs.push(circsprite);
  circContainer.addChild(circsprite);
}

// 圆圈线（交叉处）
const ring = new PIXI.Graphics();
ring.lineStyle(lineWidth, color, 0.6);
ring.drawCircle(0, 0, 32);
const ringTexture = app.renderer.generateTexture(ring);
const ringSprite = PIXI.Sprite.from(ringTexture);
ringSprite.anchor.x = 0.5;
ringSprite.anchor.y = 0.5;
ringSprite.cacheAsBitmap = true;
circContainer.addChild(ringSprite);

app.stage.addChild(circContainer);

/**
 * 生产一个带有固定参数偏移量的函数，这个函数会被作为map映射函数
 *
 * @param {Number} offset 偏移量
 * @param {Number} count 步进
 * @return {Function}
 */
function fromToMap(offset, count) {
  return (point, i) => {
    const sin = Math.sin(count) * offset;
    const cos = Math.cos(count) * offset;
    return {
      x: point.x + (i % 2 === 0 ? sin : cos),
      y: point.y + (i % 2 === 0 ? cos : sin),
    };
  };
}

/**
 * 自适应设置PIXI app尺寸为浏览器宽
 *
 * @param {Object} app PIXI app
 * @return {undefined}
 */
function resize(APP = app) {
  return () => {
    const vpw = window.innerWidth;
    const vph = window.innerHeight;

    let nvw;
    let nvh;
    if (vph / vpw < HEIGHT / WIDTH) {
      nvh = vph;
      nvw = (nvh * WIDTH) / HEIGHT;
    } else {
      nvw = vpw;
      nvh = (nvw * HEIGHT) / WIDTH;
    }
    APP.renderer.resize(nvw, nvh);
    APP.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
  };
}

/**
 * 求两个线段交点坐标
 *
 * @param {Array} L1 line为两个对象组成的数组:[{x1,y1},{x2,y2}]，对象属性x/y分别是线段首尾坐标，下同
 * @param {Array} L2
 * @return {Object} 返回 {x, y}
 */
function intersect(L1, L2) {
  // 解构赋值取得 x1,y1,x2,y2,x3,y3,x4,y4
  const [{ x1, y1 }, { x2, y2 }] = L1;
  const [{ x3, y3 }, { x4, y4 }] = L2;

  // 利用公式推导出 k、b和x、y的关系。
  const k1 = (y1 - y2) / (x1 - x2);
  let b1 = y1 - (k1 * x1);
  const k2 = (y3 - y4) / (x3 - x4);
  let b2 = y3 - (k2 * x3);
  // a、b 为交点坐标
  let a;
  let b;
  // 判断 k=0 时
  if (x1 === x2) {
    // k1,
    b1 = 0;
    a = x1;
    b = k2 * a + b2;
  }
  if (x3 === x4) {
    // k2,
    b2 = 0;
    a = x3;
    b = k1 * a + b1;
  }
  // 判断 交点 是否在两条线段上
  // eslint-disable-next-line max-len
  // if(((a>x1&&a<x2)||(a<x1&&a>x2)||a==x1||a==x2)&&((a>x3&&a<x4)||(a<x3&&a>x4)||a==x3||a==x4)&&x1!=x2&&x3!=x4){
  a = (b2 - b1) / (k1 - k2);
  b = k1 * a + b1;
  // }
  // 返回结果
  // let str;
  let point;
  if (a !== undefined && b !== undefined) {
    // str = `交点为(${a},${b})`
    point = { x: a, y: b };
  // eslint-disable-next-line max-len
  } else if ((k1 === k2) && (b1 === b2) && (((x1 === x3) && (x2 === x4)) || ((x1 === x4) && (x2 === x3)))) {
    console.log('两线段重合');
  } else if (k1 === k2) {
    console.log('两线段平行');
  } else {
    console.log('两线段不相交');
  }
  return point;
}

function onAssertsLoaded() {
  const imgsprites = [];
  for (let i = 0; i < 3; i += 1) {
    const imgsprite = PIXI.Sprite.from(imgspriteSrc);
    imgsprite.cacheAsBitmap = true;
    imgsprites.push(imgsprite);
    container.addChild(imgsprite);
  }

  let count = 0;
  app.ticker.add(() => {
    count += 0.01;

    const topointer1 = pointers1.map(fromToMap(20, count));
    const topointer2 = pointers2.map(fromToMap(10, count));
    line1.clear();
    line1.lineStyle(lineWidth, 0x383e96, 0.5);
    line1.moveTo(topointer1[0].x, topointer1[0].y);
    line1.lineTo(topointer1[1].x, topointer1[1].y);
    line1.lineTo(topointer1[2].x, topointer1[2].y);
    line1.lineTo(topointer1[3].x, topointer1[3].y);
    line2.clear();
    line2.lineStyle(lineWidth, 0x383e96, 0.5);
    line2.moveTo(topointer2[0].x, topointer2[0].y);
    line2.lineTo(topointer2[1].x, topointer2[1].y);
    line2.lineTo(topointer2[2].x, topointer2[2].y);
    line2.lineTo(topointer2[3].x, topointer2[3].y);

    circs.forEach((c, i) => {
      // 线顶点的圆点位置
      const $c = c;
      if (i < 8) { // 9,10 是线交叉点
        const firstLinePointerLen = topointer1.length;

        $c.x = i < firstLinePointerLen ? topointer1[i].x : topointer2[(i - firstLinePointerLen)].x;
        $c.y = i < firstLinePointerLen ? topointer1[i].y : topointer2[(i - firstLinePointerLen)].y;
      }
    });

    const intersectPoint1 = intersect([
      {
        x1: topointer1[1].x,
        y1: topointer1[1].y,
      }, {
        x2: topointer1[2].x,
        y2: topointer1[2].y,
      },
    ], [
      {
        x3: topointer2[0].x,
        y3: topointer2[0].y,
      }, {
        x4: topointer2[1].x,
        y4: topointer2[1].y,
      },
    ]);
    if (intersectPoint1) {
      circs[8].x = intersectPoint1.x;
      ringSprite.x = intersectPoint1.x;
      circs[8].y = intersectPoint1.y;
      ringSprite.y = intersectPoint1.y;
    }

    const intersectPoint2 = intersect([
      {
        x1: topointer1[2].x,
        y1: topointer1[2].y,
      }, {
        x2: topointer1[3].x,
        y2: topointer1[3].y,
      },
    ], [
      {
        x3: topointer2[2].x,
        y3: topointer2[2].y,
      }, {
        x4: topointer2[3].x,
        y4: topointer2[3].y,
      },
    ]);
    if (intersectPoint2) {
      circs[9].x = intersectPoint2.x;
      circs[9].y = intersectPoint2.y;
      imgsprites[2].x = intersectPoint2.x;
      imgsprites[2].y = intersectPoint2.y + 5;
    }

    imgsprites[0].x = topointer1[1].x;
    imgsprites[0].y = topointer1[1].y - 30;

    imgsprites[1].x = topointer1[2].x;
    imgsprites[1].y = topointer1[2].y + 5;

    imgsprites[0].alpha = Math.abs(Math.sin(count * 10)) * 0.5;
    imgsprites[1].alpha = Math.abs(Math.cos(count * 8)) * 0.5;
    imgsprites[2].alpha = Math.abs(Math.sin(count * 9)) * 0.5;
    ringSprite.scale.x = Math.sin(count / 2) * 0.25 + 0.75;
    ringSprite.scale.y = Math.sin(count / 2) * 0.25 + 0.75;
  });
  resize(app)();
  window.addEventListener('resize', resize(app));
}
app.loader.add(imgspriteSrc).load(onAssertsLoaded);

// document.querySelector(".p0-linebg-wrapper").appendChild(app.view);
export default { app };
