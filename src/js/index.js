//import "animate.css"
import "../css/loading.css"
import "../scss/main.scss"

import "/node_modules/locomotive-scroll/dist/locomotive-scroll.css"

import SuperGif from "../lib/libgif"

import bgcanvas from './bgcanvas'

import LocomotiveScroll from 'locomotive-scroll';

import Swiper from 'swiper'; 
import "/node_modules/swiper/swiper-bundle.min.css" 

(function () {
    const $$ = $sel => document.querySelector($sel);
    const docEl = $$('html');



    document.querySelector(".p0-linebg-wrapper").appendChild(bgcanvas.app.view);
    let scroll;
    setTimeout(() => {
        //return
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
        let logogifimg = require("../images/logo_anim.gif");
        let logogif = new Image();
        logogif.src = logogifimg;

        setTimeout(() => {
            // scroll.scrollTo(document.querySelector('#section0'), {
            //     duration: 400,
            //     callback: function () {
            //         console.log('scroll to #section0');
            //         scroll.stop()
            //     }
            // })
            docEl.classList.add("is-loaded");
            setTimeout(() => {
                document.getElementById("p0-mainlogo-image").appendChild(logogif);
                setTimeout(() => {
                    scroll.start();
                    scroll.scrollTo("#section1", {
                        duration: 400,
                    })
                }, 8000)
            }, 500)
        }, 500);
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
        // const sup1 = new SuperGif({ 
        //     gif: document.getElementById('logoimg'),
        //     loop_mode: false,
        // } );
        // sup1.load();
        // window.sup1 = sup1;
    }, 100)



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
            scroll.scrollTo(document.querySelector("#section" + (index + 1)), {
                direction:600
            });
            $$(".c-header-btn").dispatchEvent(new Event('click'));
        })
    })

    var mySwiper = new Swiper('.swiper-container', { 
        direction: "horizontal",
        speed: 850,
        parallax: !0,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

})()