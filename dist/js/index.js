/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/loading.css":
/*!*****************************!*
  !*** ./src/css/loading.css ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://feng-qing-yang/./src/css/loading.css?");

/***/ }),

/***/ "./src/fonts/iconfont.css":
/*!********************************!*
  !*** ./src/fonts/iconfont.css ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://feng-qing-yang/./src/fonts/iconfont.css?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://feng-qing-yang/./src/scss/main.scss?");

/***/ }),

/***/ "./src/images/logo_anim.gif":
/*!**********************************!*
  !*** ./src/images/logo_anim.gif ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/logo_anim.gif?e7088\";\n\n//# sourceURL=webpack://feng-qing-yang/./src/images/logo_anim.gif?");

/***/ }),

/***/ "./src/images/p0_canvasimg.png":
/*!*************************************!*
  !*** ./src/images/p0_canvasimg.png ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/p0_canvasimg.png?ba118\";\n\n//# sourceURL=webpack://feng-qing-yang/./src/images/p0_canvasimg.png?");

/***/ }),

/***/ "./src/js/bgcanvas.js":
/*!****************************!*
  !*** ./src/js/bgcanvas.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n\r\nconst imgspriteSrc = __webpack_require__(/*! ../images/p0_canvasimg.png */ \"./src/images/p0_canvasimg.png\");\r\n\r\n// const type = \"WebGL\";\r\n// if (!PIXI.utils.isWebGLSupported()) {\r\n//     type = \"canvas\";\r\n// }\r\n// PIXI.utils.sayHello(type);\r\n\r\nconst WIDTH = 1920;\r\nconst HEIGHT = 330;\r\nconst lineWidth = 1;\r\nconst color = 0x383e96;\r\n\r\nconst app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application({\r\n    transparent: true,\r\n    antialias: true //抗锯齿\r\n});\r\n\r\n\r\napp.loader.add(imgspriteSrc).load(onAssertsLoaded);\r\n\r\n\r\nconst container = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();\r\napp.stage.addChild(container);\r\n\r\nconst pointers1 = [\r\n    {x: 0-20, y: 190},\r\n    {x: 95, y: 109},\r\n    {x: 1274, y: 281},\r\n    {x: 1920+20, y: 64}\r\n]\r\nconst pointers2 = [\r\n    {x: 0-20, y: 190},\r\n    {x: 624, y: 65},\r\n    {x: 1274, y: 202},\r\n    {x: 1920+20, y: 119}\r\n]\r\n\r\n// 两条折线\r\nconst line1 = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\r\nconst line2 = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\r\nline1.lineStyle(lineWidth, color, 1);\r\nline2.lineStyle(lineWidth, color, 1);\r\ncontainer.addChild(line1);\r\ncontainer.addChild(line2);\r\n\r\n// 小圆点\r\nlet circ = new  pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\r\ncirc.beginFill(color);\r\ncirc.drawCircle(0, 0, 2);\r\ncirc.endFill();\r\n\r\nlet circTexture = app.renderer.generateTexture(circ);\r\nlet circs = [];\r\nlet circContainer = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();\r\nfor(let i = 0; i < 10; i++){\r\n    const circsprite = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(circTexture);\r\n    circsprite.anchor.x = 0.5;\r\n    circsprite.anchor.y = 0.5;\r\n    circsprite.cacheAsBitmap = true;\r\n    circs.push(circsprite);\r\n    circContainer.addChild(circsprite);\r\n}\r\n\r\n// 圆圈线（交叉处）\r\nlet ring = new  pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\r\nring.lineStyle(lineWidth, color, .6);\r\nring.drawCircle(0, 0, 32);\r\nlet ringTexture = app.renderer.generateTexture(ring);\r\nconst ringSprite = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(ringTexture);\r\nringSprite.anchor.x = ringSprite.anchor.y = 0.5;\r\nringSprite.cacheAsBitmap = true;\r\ncircContainer.addChild(ringSprite);\r\n\r\napp.stage.addChild(circContainer);\r\n\r\n/**\r\n * 生产一个带有固定参数偏移量的函数，这个函数会被作为map映射函数\r\n *\r\n * @param {Number} offset 偏移量\r\n * @param {Number} count 步进\r\n * @return {Function} \r\n */\r\nfunction fromToMap(offset, count){\r\n    return function(point, i){\r\n        let sin = Math.sin(count) * offset;\r\n        let cos = Math.cos(count) * offset;\r\n        return {\r\n            x: point.x + (i % 2 == 0 ? sin : cos) ,\r\n            y: point.y + (i % 2 == 0 ? cos : sin)\r\n        }\r\n    }\r\n}\r\n\r\nfunction onAssertsLoaded(){\r\n    const imgsprites = [];\r\n    for(let i = 0; i < 3; i++){\r\n        let imgsprite = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(imgspriteSrc);\r\n        imgsprite.cacheAsBitmap = true;\r\n        imgsprites.push(imgsprite);\r\n        container.addChild(imgsprite);\r\n    }\r\n\r\n    let count = 0;\r\n    app.ticker.add(() => {\r\n        count += 0.01;\r\n    \r\n        let topointer1 = pointers1.map(fromToMap(20, count));\r\n        let topointer2 = pointers2.map(fromToMap(10, count));\r\n        line1.clear();\r\n        line1.lineStyle(lineWidth, 0x383e96, 0.5);\r\n        line1.moveTo(topointer1[0].x, topointer1[0].y);\r\n        line1.lineTo(topointer1[1].x, topointer1[1].y);\r\n        line1.lineTo(topointer1[2].x, topointer1[2].y);\r\n        line1.lineTo(topointer1[3].x, topointer1[3].y);\r\n        line2.clear();\r\n        line2.lineStyle(lineWidth, 0x383e96, 0.5);\r\n        line2.moveTo(topointer2[0].x, topointer2[0].y);\r\n        line2.lineTo(topointer2[1].x, topointer2[1].y);\r\n        line2.lineTo(topointer2[2].x, topointer2[2].y);\r\n        line2.lineTo(topointer2[3].x, topointer2[3].y);\r\n    \r\n        circs.forEach((c, i)=> { \r\n            // 线顶点的圆点位置\r\n            if(i < 8) {  // 9,10 是线交叉点\r\n                const firstLinePointerLen = topointer1.length; \r\n    \r\n                c.x = i < firstLinePointerLen ? topointer1[i].x : topointer2[(i - firstLinePointerLen)].x;\r\n                c.y = i < firstLinePointerLen ? topointer1[i].y : topointer2[(i - firstLinePointerLen)].y;\r\n            }\r\n        })\r\n\r\n        const intersectPoint1 = intersect([\r\n            {\r\n                x1: topointer1[1].x, \r\n                y1: topointer1[1].y\r\n            }, {\r\n                x2: topointer1[2].x, \r\n                y2: topointer1[2].y\r\n            }\r\n        ],[\r\n            {\r\n                x3: topointer2[0].x, \r\n                y3: topointer2[0].y\r\n            }, {\r\n                x4: topointer2[1].x, \r\n                y4: topointer2[1].y\r\n            }  \r\n        ])\r\n        if(intersectPoint1){\r\n            circs[8].x = ringSprite.x = intersectPoint1.x;\r\n            circs[8].y = ringSprite.y = intersectPoint1.y;\r\n        }\r\n    \r\n        const intersectPoint2 = intersect([\r\n            {\r\n                x1: topointer1[2].x, \r\n                y1: topointer1[2].y\r\n            }, {\r\n                x2: topointer1[3].x, \r\n                y2: topointer1[3].y\r\n            }\r\n        ],[\r\n            {\r\n                x3: topointer2[2].x, \r\n                y3: topointer2[2].y\r\n            }, {\r\n                x4: topointer2[3].x, \r\n                y4: topointer2[3].y\r\n            }  \r\n        ])\r\n        if(intersectPoint2){\r\n            circs[9].x = intersectPoint2.x;\r\n            circs[9].y = intersectPoint2.y;\r\n            imgsprites[2].x = intersectPoint2.x;\r\n            imgsprites[2].y = intersectPoint2.y + 5;\r\n        }\r\n    \r\n    \r\n        imgsprites[0].x = topointer1[1].x;\r\n        imgsprites[0].y = topointer1[1].y - 30;\r\n    \r\n        imgsprites[1].x = topointer1[2].x;\r\n        imgsprites[1].y = topointer1[2].y + 5;\r\n    \r\n        imgsprites[0].alpha = Math.abs(Math.sin(count * 10)) * .5;\r\n        imgsprites[1].alpha = Math.abs(Math.cos(count * 8)) * .5;\r\n        imgsprites[2].alpha = Math.abs(Math.sin(count * 9)) * .5;\r\n        ringSprite.scale.x = ringSprite.scale.y = Math.sin(count /2) * .25 + .75;\r\n    })\r\n    resize(app)();\r\n    window.addEventListener('resize', resize(app));\r\n}\r\n\r\n/**\r\n * 自适应设置PIXI app尺寸为浏览器宽\r\n *\r\n * @param {Object} app PIXI app\r\n * @return {undefined}  \r\n */\r\nfunction resize(app) {\r\n    return function (){\r\n        const vpw = window.innerWidth;\r\n        const vph = window.innerHeight;\r\n\r\n        let nvw;\r\n        let nvh;\r\n        if (vph / vpw < HEIGHT / WIDTH) {\r\n            nvh = vph;\r\n            nvw = (nvh * WIDTH) / HEIGHT;\r\n        }else{\r\n            nvw = vpw;\r\n            nvh = (nvw * HEIGHT) / WIDTH;\r\n        }\r\n        app.renderer.resize(nvw, nvh);\r\n        app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);\r\n    }\r\n}\r\n\r\n/**\r\n * 求两个线段交点坐标\r\n *\r\n * @param {Array} line1 line为两个对象组成的数组:[{x1,y1},{x2,y2}]，对象属性x/y分别是线段首尾坐标，下同\r\n * @param {Array} line2\r\n * @return {Object} 返回 {x, y}\r\n */\r\nfunction intersect(line1,line2){\r\n    // 解构赋值取得 x1,y1,x2,y2,x3,y3,x4,y4\r\n    let [{x1,y1},{x2,y2}] = line1;\r\n    let [{x3,y3},{x4,y4}] = line2;\r\n    \r\n    // 利用公式推导出 k、b和x、y的关系。\r\n    let k1 = (y1-y2)/(x1-x2);\r\n    let b1 = y1 - (k1*x1);\r\n    let k2 = (y3-y4)/(x3-x4);\r\n    let b2 = y3 - (k2*x3);\r\n    // a、b 为交点坐标\r\n    let a;\r\n    let b;\r\n    // 判断 k=0 时\r\n    if(x1==x2){\r\n        k1,b1 = 0;\r\n        a = x1;\r\n        b = k2*a + b2;\r\n    }\r\n    if(x3==x4){\r\n        k2,b2 = 0;\r\n        a = x3;\r\n        b = k1*a + b1;\r\n    }\r\n    // 判断 交点 是否在两条线段上\r\n    //if(((a>x1&&a<x2)||(a<x1&&a>x2)||a==x1||a==x2)&&((a>x3&&a<x4)||(a<x3&&a>x4)||a==x3||a==x4)&&x1!=x2&&x3!=x4){\r\n        a = (b2-b1)/(k1-k2);\r\n        b = k1*a + b1;\r\n    //}\r\n    // 返回结果\r\n    //let str;\r\n    if(a!==undefined&&b!==undefined){\r\n        //str = `交点为(${a},${b})`\r\n        return {x: a, y: b};\r\n    }else if((k1==k2)&&(b1==b2)&&(((x1==x3)&&(x2==x4))||((x1==x4)&&(x2==x3)))){\r\n        console.log( \"两线段重合\")\r\n    }else if(k1==k2){\r\n        console.log(\"两线段平行\")\r\n    }else{\r\n        console.log(\"两线段不相交\")\r\n    }\r\n    //return str;\r\n}\r\n//document.querySelector(\".p0-linebg\").appendChild(app.view);\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ app });\n\n//# sourceURL=webpack://feng-qing-yang/./src/js/bgcanvas.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ \"./node_modules/@babel/polyfill/lib/index.js\");\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_loading_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/loading.css */ \"./src/css/loading.css\");\n/* harmony import */ var _fonts_iconfont_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fonts/iconfont.css */ \"./src/fonts/iconfont.css\");\n/* harmony import */ var _bgcanvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bgcanvas */ \"./src/js/bgcanvas.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/core/core-class.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/scrollbar/scrollbar.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/navigation/navigation.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/mousewheel/mousewheel.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/parallax/parallax.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/history/history.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/hash-navigation/hash-navigation.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/pagination/pagination.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/effect-fade/effect-fade.js\");\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/esm/components/thumbs/thumbs.js\");\n/* harmony import */ var swiper_swiper_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/swiper.scss */ \"./node_modules/swiper/swiper.scss\");\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n//import \"animate.css\"\r\n\r\n\r\n\r\n\r\n\r\n//import * as a from \"../fonts/iconfont\";\r\n\r\n//import \"locomotive-scroll/dist/locomotive-scroll.css\"\r\n//import LocomotiveScroll from 'locomotive-scroll';\r\n\r\n//import SuperGif from \"../lib/libgif\" \r\n//import anime from \"animejs/lib/anime.es\";\r\n\r\n\r\n // Import Swiper and modules  // https://swiperjs.com/api/#custom-build\r\n\r\n\r\n//import \"swiper/components/scrollbar/scrollbar.scss\"; // ??? Not work, Need import in main.scss, Why?\r\n//import \"../scss/scroll.scss\" // But if copy it to ./src/ and import it, it worked, why???\r\n\r\n\r\n\r\n//import page from \"page.js\"\r\n\r\n(function () {\r\n    // setTimeout(()=>{\r\n    //     anime({\r\n    //         targets: '#p0-logotext path',\r\n    //         strokeDashoffset: [anime.setDashoffset, 0],\r\n    //         easing: 'easeInOutSine',\r\n    //         duration: 1500,\r\n    //         delay: function(el, i) { return i * 250 },\r\n    //         direction: 'alternate',\r\n    //         loop: true\r\n    //       });\r\n    // },3000)\r\n    \r\n    \r\n    const $$ = $sel => document.querySelector($sel);\r\n    const docEl = $$('html');\r\n    const lineAnimCanvas = _bgcanvas__WEBPACK_IMPORTED_MODULE_5__.default.app.view;\r\n    \r\n    let scroll;\r\n    setTimeout(() => {\r\n        /*\r\n        scroll = new LocomotiveScroll({\r\n            el: document.querySelector(\"#page-scroll\"),\r\n            smooth: true,\r\n            scrollFromAnywhere: true,\r\n            repeat: true,\r\n            getSpeed: true,\r\n            getDirection: true\r\n            //direction: \"horizontal\"\r\n        });\r\n        scroll.stop();\r\n        window.scroll = scroll;\r\n        scroll.on('scroll', (args) => {\r\n            // Get all current elements : args.currentElements\r\n            if (typeof args.currentElements['tar'] === 'object') {\r\n                let progress = args.currentElements['tar'].progress;\r\n                \r\n                let prg = progress >= 0.5 ? 1 : progress / 0.5;\r\n                console.log(`translate(${-prg}%,0,0)`);\r\n                let p0BluebgImg =  document.querySelector(\".p0-bluebg-img\");\r\n                p0BluebgImg.style.transform = `translate3d(${(prg - 1) * 100}%,0,0)`;\r\n                p0BluebgImg.style.opacity = prg;\r\n                // ouput log example: 0.34\r\n                // gsap example : myGsapAnimation.progress(progress);\r\n            }\r\n        })\r\n        // window.scroll.on('call', func => {\r\n        //     // Using modularJS\r\n        //     this.call(...func);\r\n        //     // Using jQuery events\r\n        //     //$(document).trigger(func);\r\n        //     // Or do it your own way 😎\r\n        // });\r\n        scroll.on('call', function (value, way, obj) {\r\n            console.log(value, way, obj)\r\n            // Using modularJS\r\n            //this.call(...func);\r\n            // Using jQuery events\r\n            //$(document).trigger(func);\r\n            // Or do it your own way 😎\r\n        });\r\n        */\r\n        let logogifimg = __webpack_require__(/*! ../images/logo_anim.gif */ \"./src/images/logo_anim.gif\");\r\n        let logogif = new Image();\r\n        logogif.src = logogifimg;\r\n\r\n        // setTimeout(() => {\r\n        //     // scroll.scrollTo(document.querySelector('#section0'), {\r\n        //     //     duration: 400,\r\n        //     //     callback: function () {\r\n        //     //         console.log('scroll to #section0');\r\n        //     //         scroll.stop()\r\n        //     //     }\r\n        //     // })\r\n        //     docEl.classList.add(\"is-loaded\");\r\n        //     setTimeout(() => {\r\n        //         document.getElementById(\"p0-mainlogo-image\").appendChild(logogif);\r\n        //         setTimeout(() => {\r\n        //             scroll.start();\r\n        //             scroll.scrollTo(\"#section1\", {\r\n        //                 duration: 400,\r\n        //             })\r\n        //         }, 8000)\r\n        //     }, 500)\r\n        // }, 500);\r\n\r\n        function timeout(ms) {\r\n            return new Promise((resolve, reject) => {\r\n                setTimeout(resolve, ms, 'done');\r\n            })\r\n        }\r\n\r\n        timeout(500).then(value => {\r\n            docEl.classList.add(\"is-loaded\");\r\n            console.log('loaded')\r\n            document.querySelector(\".p0-linebg-wrapper\").appendChild(lineAnimCanvas);\r\n            document.querySelectorAll(\".p0-logotext .cls-1\").forEach((path, index) => {\r\n                path.style.animationDelay = `${2.5 + 0.05 * index}s`\r\n            })\r\n            return timeout(500);\r\n        }).then(value => {\r\n            document.getElementById(\"p0-mainlogo-image\").appendChild(logogif);\r\n            console.log('logo gif start playing')\r\n            return timeout(8000);\r\n        }).then(value => {\r\n            console.log('start scroll')\r\n            // scroll.start();\r\n            // scroll.scrollTo(\"#section1\", {\r\n            //     duration: 400,\r\n            // })\r\n        })\r\n\r\n\r\n        // const sup1 = new SuperGif({ \r\n        //     gif: document.getElementById('logoimg'),\r\n        //     loop_mode: false,\r\n        // } );\r\n        // sup1.load();\r\n        // window.sup1 = sup1;\r\n    }, 100)\r\n\r\n    swiper__WEBPACK_IMPORTED_MODULE_6__.default.use([swiper__WEBPACK_IMPORTED_MODULE_7__.default, swiper__WEBPACK_IMPORTED_MODULE_8__.default, swiper__WEBPACK_IMPORTED_MODULE_9__.default, swiper__WEBPACK_IMPORTED_MODULE_10__.default, swiper__WEBPACK_IMPORTED_MODULE_11__.default, swiper__WEBPACK_IMPORTED_MODULE_12__.default, swiper__WEBPACK_IMPORTED_MODULE_13__.default, swiper__WEBPACK_IMPORTED_MODULE_14__.default, swiper__WEBPACK_IMPORTED_MODULE_15__.default]); // Install modules\r\n    //$$(\"#section6\").style.height=`${813/800*100}vh`;\r\n    let mainSwiperOption = {\r\n        direction: 'vertical', // 垂直切换选项\r\n        //freeMode:true,\r\n        slidesPerView: 'auto', // 适配最后一页不规则的高度\r\n\r\n        speed: 900,\r\n        shortSwipes: false,\r\n\r\n        mousewheel: true,\r\n\r\n        parallax: true,\r\n\r\n        scrollbar: {\r\n            el: '.main-scrollbar',\r\n        },\r\n        noSwipingClass: \"stop-swiping\",\r\n        navigation: {\r\n            nextEl: null,\r\n            prevEl: null\r\n        },\r\n\r\n        on: {\r\n            init: function () {\r\n                //console.log(this.$wrapperEl[0].style.transitionDuration)\r\n                //this.$wrapperEl[0].style.transitionDuration = \"1.2s !important\";\r\n                //console.log(this.$wrapperEl[0].style.transitionDuration)\r\n            },\r\n            slideChangeTransitionStart: function () {\r\n                if (this.activeIndex == 2) {\r\n                    let canvasTarget = document.querySelector(\".p2-linebg-wrapper\");\r\n                    if (!canvasTarget.classList.contains(\"has-canvas\")) {\r\n                        canvasTarget.appendChild(lineAnimCanvas);\r\n                        canvasTarget.classList.add(\"has-canvas\");\r\n                    }\r\n                }\r\n                document.querySelectorAll(\".menu-ul a\").forEach((a, index) => {\r\n                    if(this.realIndex === index + 1)\r\n                        a.classList.add('active');\r\n                    else\r\n                        a.classList.remove('active')\r\n                })\r\n            },\r\n            slideChangeTransitionEnd: function () {\r\n                //.log(this.slides, this.realIndex, this.slides[this.realIndex])\r\n                this.slides[this.realIndex].classList.add(\"first-active\");\r\n                if (this.realIndex == 1) {\r\n                    document.querySelector(\".c-menubox\").classList.add(\"nav-on\")\r\n                    this.allowSlidePrev = false;\r\n                } else {\r\n                    this.allowSlidePrev = true;\r\n                }\r\n            }\r\n        },\r\n        // hashNavigation: {\r\n        //     watchState: true,\r\n        //     hashChange: true\r\n        // }\r\n        // history: {\r\n        //     //replaceState: true,\r\n        //     key: 'sub'\r\n        // },\r\n    }\r\n    var mainSwiper = new swiper__WEBPACK_IMPORTED_MODULE_6__.default('.o-scroll', mainSwiperOption);\r\n    // window.mainSwiper= mainSwiper;\r\n    // function onMouseWheel(e) {\r\n    //     console.log(e);\r\n    //     clearTimeout(e.target.getAttribute('data-timer'));\r\n    //     //clearTimeout($.data(this, 'timer'));\r\n    //     document.querySelector('.swiper-wrapper').classList.add('mousewheel')\r\n    //     //$(\".swiper-wrapper\").addClass('mousewheel');\r\n    //     e.target.setAttribute('data-timer', setTimeout(() => {\r\n    //         document.querySelector('.swiper-wrapper').classList.remove('mousewheel')\r\n    //     }, 200))\r\n\r\n    // }\r\n\r\n    //window.addEventListener( 'mousewheel', onMouseWheel, false )\r\n    //window.addEventListener( 'DOMMouseScroll', onMouseWheel, false )\r\n\r\n    var mediaSwiper = new swiper__WEBPACK_IMPORTED_MODULE_6__.default('.p1-contents', {\r\n        speed: 1100,\r\n        loop: true,\r\n        parallax: true,\r\n        nested: true, // 阻止父级切换\r\n        resistanceRatio: 0,\r\n        watchSlidesProgress: true,\r\n        navigation: {\r\n            nextEl: '.swiper-button-next',\r\n            prevEl: '.swiper-button-prev',\r\n        },\r\n        on: {\r\n\r\n            progress: function (swiper) {\r\n                let interleaveOffset = 0.3;\r\n                swiper.slides.forEach(slide => {\r\n\r\n                    let slideProgress = slide.progress;\r\n\r\n                    let innerOffset = swiper.width * interleaveOffset;\r\n                    // console.log(slide  )\r\n                    let innerTranslate = slideProgress * innerOffset;\r\n                    //if(swiper.activeIndex ==1) console.log(slide.querySelector('img'))\r\n                    slide.querySelector('img').style.transform = `translate3d(${innerTranslate}px,0,0)`\r\n                    //if(swiper.activeIndex ==1) console.log( `translate3d(${innerTranslate}px,0,0,)`)\r\n                })\r\n            },\r\n            touchStart: function (swiper) {\r\n                this.slides.forEach(slide => slide.style.transition = \"\")\r\n            },\r\n            slideChangeTransitionStart: function (swiper) {\r\n                mainSwiper.mousewheel.disable();\r\n                //this.slides.forEach(slide => slide.style.transition = \"\")\r\n            },\r\n            slideChangeTransitionEnd: function (swiper) {\r\n                mainSwiper.mousewheel.enable();\r\n                this.slides.forEach(slide => {\r\n                    let speed = this.params.speed;\r\n                    slide.style.transition = speed + \"ms\";\r\n                    slide.querySelector(\"img\").style.transition = speed + \"ms\";\r\n                });\r\n            }\r\n        }\r\n    })\r\n    let techOptions = {\r\n\r\n    }\r\n    var techSwiper = new swiper__WEBPACK_IMPORTED_MODULE_6__.default('.p2-contents', {\r\n        speed: 1200,\r\n        loop: true,\r\n        spaceBetween: 800,\r\n        parallax: true,\r\n        nested: true, // 阻止父级切换\r\n        resistanceRatio: 0,\r\n        noSwiping: true,\r\n        watchSlidesProgress: true,\r\n        navigation: {\r\n            nextEl: '.swiper-button-next',\r\n            prevEl: '.swiper-button-prev',\r\n        },\r\n        // mousewheel: {\r\n        //     releaseOnEdges: true,\r\n        //     eventsTarged: '#p1-contents',\r\n        // },\r\n        on: {\r\n            slideChangeTransitionStart: function () {\r\n                mainSwiper.mousewheel.disable();\r\n                // this.slides.forEach(slide => {\r\n                //     let myparallax_x = slide.getAttribute('data-myparallax-x');\r\n                //     //slide.style.transform = `translate3d(${myparallax_x}px,0,0)`\r\n                // })\r\n\r\n            },\r\n            slideChangeTransitionEnd: function () {\r\n                mainSwiper.mousewheel.enable();\r\n            },\r\n            transitionStart: function () {\r\n                let { prevEl, nextEl } = this.params.navigation;\r\n                this.el.querySelectorAll([prevEl, nextEl].join(\",\")).forEach(nav => {\r\n                    nav.classList.add(\"arrow-out\");\r\n                })\r\n                //mainSwiper.destroy(false)\r\n            },\r\n            transitionEnd: function () {\r\n                let { prevEl, nextEl } = this.params.navigation;\r\n                this.el.querySelectorAll([prevEl, nextEl].join(\",\")).forEach(nav => {\r\n                    nav.classList.remove(\"arrow-out\");\r\n                })\r\n            }\r\n\r\n        }\r\n    })\r\n    var produtionSwiper = new swiper__WEBPACK_IMPORTED_MODULE_6__.default('.p3-product-msg', {\r\n        speed: 600,\r\n        loop: true,\r\n        spaceBetween: 100,\r\n        parallax: true,\r\n        nested: true, // 阻止父级切换\r\n        resistanceRatio: 0,\r\n        pagination: {\r\n            el: '.swiper-pagination',\r\n            type: 'bullets',\r\n            clickable: true\r\n        },\r\n    })\r\n\r\n    var supportSwiper = new swiper__WEBPACK_IMPORTED_MODULE_6__.default(\".p4-contents\", {\r\n        // speed: 1200,\r\n        // spaceBetween: 300,\r\n        // direction: \"vertical\",\r\n        navigation: {\r\n            nextEl: '.swiper-button-next',\r\n            prevEl: '.swiper-button-prev',\r\n        },\r\n        effect: \"fade\",\r\n        fadeEffect: {\r\n            crossFade: true\r\n        },\r\n    })\r\n\r\n    var modelsThumbSwiper = new swiper__WEBPACK_IMPORTED_MODULE_6__.default(\".p5-thumb\", {\r\n        direction: \"vertical\",\r\n        nested: true,\r\n        mousewheel: true,\r\n        slidesPerView: 4,\r\n        watchSlidesVisibility: true,\r\n        //centerInsufficientSlides: true,\r\n        scrollbar: {\r\n            el: '.p5-thumb-scrollbar',\r\n            draggable: true,\r\n            dragSize: 76\r\n        }\r\n    })\r\n    var modelDetailSwiper = new swiper__WEBPACK_IMPORTED_MODULE_6__.default(\".p5-msgcont\", {\r\n        effect: \"fade\",\r\n        fadeEffect: {\r\n            crossFade: true\r\n        },\r\n        thumbs: {\r\n            swiper: modelsThumbSwiper,\r\n        },\r\n        on: {\r\n            transitionStart: function (swiper) {\r\n                mainSwiper.mousewheel.disable();\r\n                //this.slides.forEach(slide => slide.style.transition = \"\")\r\n            },\r\n            transitionEnd: function (swiper) {\r\n                mainSwiper.mousewheel.enable();\r\n            },\r\n            mousewheel: function(){\r\n                console.log('wheel')\r\n            }\r\n        }\r\n        \r\n    })\r\n\r\n    var newsSwiper = new swiper__WEBPACK_IMPORTED_MODULE_6__.default(\".p6-contents\", {\r\n        spaceBetween: 48,\r\n        slidesPerView: 3,//\"auto\"\r\n        roundLengths: true, // 将slide的宽和高取整\r\n        navigation: {\r\n            nextEl: '.p6-prev',\r\n            prevEl: '.p6-next',\r\n        },\r\n    })\r\n\r\n    $$(\".c-header-btn\").addEventListener('click', e => {\r\n        if (!docEl.classList.contains('nav-on')) {\r\n            docEl.classList.add('nav-on');\r\n        } else {\r\n            docEl.classList.remove('nav-on');\r\n        }\r\n    })\r\n\r\n    document.querySelectorAll(\".menu-ul li\").forEach((li, index) => {\r\n        li.querySelector(\"a\").addEventListener(\"click\", e => {\r\n            e.preventDefault();\r\n            mainSwiper.slideTo(index + 1)\r\n            //page('/user/'+ index)\r\n            // scroll.scrollTo(document.querySelector(\"#section\" + (index + 1)), {\r\n            //     direction:600\r\n            // });\r\n            $$(\".c-header-btn\").dispatchEvent(new Event('click'));\r\n        })\r\n    })\r\n\r\n    function resize(){\r\n        document.querySelector(\"p.scale\").innerText= `${window.innerWidth}*${window.innerHeight}`\r\n    }\r\n    resize()\r\n    window.addEventListener(\"resize\", resize)\r\n\r\n\r\n\r\n})()\n\n//# sourceURL=webpack://feng-qing-yang/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/js/index.js","vendors"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = function() {
/******/ 		
/******/ 		};
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = function() {
/******/ 		
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		__webpack_require__.x = function() {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = function() {
/******/ 		
/******/ 			}
/******/ 			chunkLoadingGlobal = chunkLoadingGlobal.slice();
/******/ 			for(var i = 0; i < chunkLoadingGlobal.length; i++) webpackJsonpCallback(chunkLoadingGlobal[i]);
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			var executeModules = data[3];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfeng_qing_yang"] = self["webpackChunkfeng_qing_yang"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;