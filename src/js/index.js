//import "animate.css"
import "../css/loading.css";

//import "locomotive-scroll/dist/locomotive-scroll.css"
//import LocomotiveScroll from 'locomotive-scroll';

//import SuperGif from "../lib/libgif" 

import bgcanvas from './bgcanvas';

import Swiper, { Scrollbar, Navigation, Mousewheel, Parallax, History} from 'swiper'; // Import Swiper and modules  // https://swiperjs.com/api/#custom-build

import "swiper/swiper.scss";
//import "swiper/components/scrollbar/scrollbar.scss"; // ??? Not work, Need import in main.scss, Why?
//import "../scss/scroll.scss" // But if copy it to ./src/ and import it, it worked, why???

import "../scss/main.scss";

(function () {
    const $$ = $sel => document.querySelector($sel);
    const docEl = $$('html');

    document.querySelector(".p0-linebg-wrapper").appendChild(bgcanvas.app.view);
    let scroll;
    setTimeout(() => {
        /*
        scroll = new LocomotiveScroll({
            el: document.querySelector("#page-scroll"),
            smooth: true,
            scrollFromAnywhere: true,
            repeat: true,
            getSpeed: true,
            getDirection: true
            //direction: "horizontal"
        });
        scroll.stop();
        window.scroll = scroll;
        scroll.on('scroll', (args) => {
            // Get all current elements : args.currentElements
            if (typeof args.currentElements['tar'] === 'object') {
                let progress = args.currentElements['tar'].progress;
                
                let prg = progress >= 0.5 ? 1 : progress / 0.5;
                console.log(`translate(${-prg}%,0,0)`);
                let p0BluebgImg =  document.querySelector(".p0-bluebg-img");
                p0BluebgImg.style.transform = `translate3d(${(prg - 1) * 100}%,0,0)`;
                p0BluebgImg.style.opacity = prg;
                // ouput log example: 0.34
                // gsap example : myGsapAnimation.progress(progress);
            }
        })
        // window.scroll.on('call', func => {
        //     // Using modularJS
        //     this.call(...func);
        //     // Using jQuery events
        //     //$(document).trigger(func);
        //     // Or do it your own way 😎
        // });
        scroll.on('call', function (value, way, obj) {
            console.log(value, way, obj)
            // Using modularJS
            //this.call(...func);
            // Using jQuery events
            //$(document).trigger(func);
            // Or do it your own way 😎
        });
        */
        let logogifimg = require("../images/logo_anim.gif");
        let logogif = new Image();
        logogif.src = logogifimg;

        // setTimeout(() => {
        //     // scroll.scrollTo(document.querySelector('#section0'), {
        //     //     duration: 400,
        //     //     callback: function () {
        //     //         console.log('scroll to #section0');
        //     //         scroll.stop()
        //     //     }
        //     // })
        //     docEl.classList.add("is-loaded");
        //     setTimeout(() => {
        //         document.getElementById("p0-mainlogo-image").appendChild(logogif);
        //         setTimeout(() => {
        //             scroll.start();
        //             scroll.scrollTo("#section1", {
        //                 duration: 400,
        //             })
        //         }, 8000)
        //     }, 500)
        // }, 500);

        function timeout(ms) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, ms, 'done');
            })
        }

        timeout(500).then(value => {
            docEl.classList.add("is-loaded");
            console.log('loaded')
            return timeout(500);
        }).then(value => {
            document.getElementById("p0-mainlogo-image").appendChild(logogif);
            console.log('logo gif start playing')
            return timeout(8000);
        }).then(value => {
            console.log('start scroll')
            // scroll.start();
            // scroll.scrollTo("#section1", {
            //     duration: 400,
            // })
        })


        // const sup1 = new SuperGif({ 
        //     gif: document.getElementById('logoimg'),
        //     loop_mode: false,
        // } );
        // sup1.load();
        // window.sup1 = sup1;
    }, 100)

    Swiper.use([Scrollbar, Navigation, Mousewheel, Parallax, History]); // Install modules
    var mainSwiper = new Swiper('.o-scroll', {
        direction: 'vertical', // 垂直切换选项
        //loop: true, // 循环模式选项
        speed: 600,

        mousewheel: true,

        parallax: true,

        scrollbar: {
            el: '.swiper-scrollbar',
        },
        navigation:{
            nextEl: null,
            prevEl: null
        },

        on: {
            slideChangeTransitionEnd: function(){
                console.log(this.slides, this.realIndex, this.slides[this.realIndex])
                this.slides[this.realIndex].classList.add("first-active");
                if( this.realIndex == 1 ){
                    this.allowSlidePrev= false;
                }else{
                    this.allowSlidePrev= true;
                }
            }
        },
        history: {
            replaceState: true,
        },
    })

    var mediaSwiper = new Swiper('.p1-contents', {
        speed: 800,
        loop: true,
        parallax: true,
        nested: true, // 阻止父级切换
        resistanceRatio: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // mousewheel: {
        //     releaseOnEdges: true,
        //     eventsTarged: '#p1-contents',
        // },
        on: {
            slideChangeTransitionStart: function(){
                mainSwiper.mousewheel.disable();
            },
            slideChangeTransitionEnd: function(){
                mainSwiper.mousewheel.enable();
            }
        }
    })


    $$(".c-header-btn").addEventListener('click', e => {
        if (!docEl.classList.contains('nav-on')) {
            docEl.classList.add('nav-on');
        } else {
            docEl.classList.remove('nav-on');
        }
    })

    document.querySelectorAll(".menu-ul li").forEach((li, index) => {
        li.querySelector("a").addEventListener("click", e => {
            e.preventDefault();
            mediaSwiper.slideTo(index + 1)
            // scroll.scrollTo(document.querySelector("#section" + (index + 1)), {
            //     direction:600
            // });
            $$(".c-header-btn").dispatchEvent(new Event('click'));
        })
    })



    

})()