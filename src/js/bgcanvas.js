import * as PIXI from 'pixi.js'
console.log(PIXI)
const type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}
PIXI.utils.sayHello(type);

const WIDTH = 1920;
const HEIGHT = 330;
const lineWidth = 3;

const app = new PIXI.Application({
    transparent: true,
    antialias: true //抗锯齿
});
// document.body.appendChild(app.view);
document.querySelector(".p0-linebg").appendChild(app.view);
const container = new PIXI.Container();
app.stage.addChild(container);
//container.x = (window.innerWidth - 1920) / 2
//container.scale = window.innerWidth / 1920
console.log(container)

const line1 = new PIXI.Graphics();

line1.lineStyle(lineWidth, 0x383e96, 1);

line1.moveTo(50, 350)
line1.lineTo(250, 350);
line1.lineTo(100, 400);
line1.lineTo(50, 350);
//line1.closePath();

container.addChild(line1);
let count = 0;
app.ticker.add(() => {
    count += 0.01;

    line1.clear();
    line1.lineStyle(lineWidth, 0x383e96, 0.5);
    line1.moveTo(0 + Math.sin(count) * 20, 190 + Math.cos(count) * 20)
    line1.lineTo(95 + Math.cos(count) * 20, 109+ Math.sin(count) * 20)
    line1.lineTo(1274+ Math.sin(count) * 20, 281 +  Math.cos(count) * 20)
    line1.lineTo(1920 + Math.cos(count) * 20, 64 + Math.sin(count) * 20)

})
resize(app)();
window.addEventListener('resize', resize(app));


function resize(app) {
    return function (){
        const vpw = window.innerWidth-20;
        const vph = window.innerHeight;

        let nvw;
        let nvh;
        if (vph / vpw < HEIGHT / WIDTH) {
            nvh = vph;
            nvw = (nvh * WIDTH) / HEIGHT;
        }else{
            nvw = vpw;
            nvh = (nvw * HEIGHT) / WIDTH;
        }
        app.renderer.resize(nvw, nvh);
        app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
    }
}