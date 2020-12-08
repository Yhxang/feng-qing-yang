//import "animate.css"
import "../css/loading.css";

//import "locomotive-scroll/dist/locomotive-scroll.css"
//import LocomotiveScroll from 'locomotive-scroll';

//import SuperGif from "../lib/libgif" 

import bgcanvas from './bgcanvas';

import Swiper, { Scrollbar, Navigation, Mousewheel, Parallax, History, HashNavigation, Pagination, EffectFade} from 'swiper'; // Import Swiper and modules  // https://swiperjs.com/api/#custom-build

import "swiper/swiper.scss";
//import "swiper/components/scrollbar/scrollbar.scss"; // ??? Not work, Need import in main.scss, Why?
//import "../scss/scroll.scss" // But if copy it to ./src/ and import it, it worked, why???

import "../scss/main.scss";

//import page from "page.js"

(function () {
    
    const $$ = $sel => document.querySelector($sel);
    const docEl = $$('html');
    const lineAnimCanvas = bgcanvas.app.view;
    
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
            document.querySelector(".p0-linebg-wrapper").appendChild(lineAnimCanvas);
            document.querySelectorAll(".p0-logotext .cls-1").forEach((path, index) => {
                path.style.animationDelay = `${2.5 + 0.05 * index}s`
            })
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

    Swiper.use([Scrollbar, Navigation, Mousewheel, Parallax, History, HashNavigation, Pagination, EffectFade]); // Install modules
    let mainSwiperOption = {
        direction: 'vertical', // 垂直切换选项
        //freeMode:true,
        //loop: true, // 循环模式选项
        speed: 900,
        shortSwipes: false,

        mousewheel: true,

        parallax: true,

        scrollbar: {
            el: '.swiper-scrollbar',
        },
        navigation: {
            nextEl: null,
            prevEl: null
        },

        on: {
            init: function () {
                //console.log(this.$wrapperEl[0].style.transitionDuration)
                //this.$wrapperEl[0].style.transitionDuration = "1.2s !important";
                //console.log(this.$wrapperEl[0].style.transitionDuration)
            },
            slideChangeTransitionStart: function () {
                if (this.activeIndex == 2) {
                    let canvasTarget = document.querySelector(".p2-linebg-wrapper");
                    if (!canvasTarget.classList.contains("has-canvas")) {
                        canvasTarget.appendChild(lineAnimCanvas);
                        canvasTarget.classList.add("has-canvas");
                    }
                }
                document.querySelectorAll(".menu-ul a").forEach((a, index) => {
                    if(this.realIndex === index + 1)
                        a.classList.add('active');
                    else
                        a.classList.remove('active')
                })
            },
            slideChangeTransitionEnd: function () {
                //.log(this.slides, this.realIndex, this.slides[this.realIndex])
                this.slides[this.realIndex].classList.add("first-active");
                if (this.realIndex == 1) {
                    document.querySelector(".c-menubox").classList.add("nav-on")
                    this.allowSlidePrev = false;
                } else {
                    this.allowSlidePrev = true;
                }
            }
        },
        // hashNavigation: {
        //     watchState: true,
        //     hashChange: true
        // }
        // history: {
        //     //replaceState: true,
        //     key: 'sub'
        // },
    }
    var mainSwiper = new Swiper('.o-scroll', mainSwiperOption);
    window.mainSwiper= mainSwiper
    // function onMouseWheel(e) {
    //     console.log(e);
    //     clearTimeout(e.target.getAttribute('data-timer'));
    //     //clearTimeout($.data(this, 'timer'));
    //     document.querySelector('.swiper-wrapper').classList.add('mousewheel')
    //     //$(".swiper-wrapper").addClass('mousewheel');
    //     e.target.setAttribute('data-timer', setTimeout(() => {
    //         document.querySelector('.swiper-wrapper').classList.remove('mousewheel')
    //     }, 200))

    // }

    // window.addEventListener( 'mousewheel', onMouseWheel, false )
    // window.addEventListener( 'DOMMouseScroll', onMouseWheel, false )

    var mediaSwiper = new Swiper('.p1-contents', {
        speed: 1100,
        loop: true,
        parallax: true,
        nested: true, // 阻止父级切换
        resistanceRatio: 0,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {

            progress: function (swiper) {
                let interleaveOffset = 0.3;
                swiper.slides.forEach(slide => {

                    let slideProgress = slide.progress;

                    let innerOffset = swiper.width * interleaveOffset;
                    // console.log(slide  )
                    let innerTranslate = slideProgress * innerOffset;
                    //if(swiper.activeIndex ==1) console.log(slide.querySelector('img'))
                    slide.querySelector('img').style.transform = `translate3d(${innerTranslate}px,0,0)`
                    //if(swiper.activeIndex ==1) console.log( `translate3d(${innerTranslate}px,0,0,)`)
                })
            },
            touchStart: function (swiper) {
                this.slides.forEach(slide => slide.style.transition = "")
            },
            slideChangeTransitionStart: function (swiper) {
                mainSwiper.mousewheel.disable();
                //this.slides.forEach(slide => slide.style.transition = "")
            },
            slideChangeTransitionEnd: function (swiper) {
                mainSwiper.mousewheel.enable();
                this.slides.forEach(slide => {
                    let speed = this.params.speed;
                    slide.style.transition = speed + "ms";
                    slide.querySelector("img").style.transition = speed + "ms";
                });
            }
        }
    })
    let techOptions = {

    }
    var techSwiper = new Swiper('.p2-contents', {
        speed: 1200,
        loop: true,
        spaceBetween: 800,
        parallax: true,
        nested: true, // 阻止父级切换
        resistanceRatio: 0,
        noSwiping: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // mousewheel: {
        //     releaseOnEdges: true,
        //     eventsTarged: '#p1-contents',
        // },
        on: {
            slideChangeTransitionStart: function () {
                mainSwiper.mousewheel.disable();
                // this.slides.forEach(slide => {
                //     let myparallax_x = slide.getAttribute('data-myparallax-x');
                //     //slide.style.transform = `translate3d(${myparallax_x}px,0,0)`
                // })

            },
            slideChangeTransitionEnd: function () {
                mainSwiper.mousewheel.enable();
            },
            transitionStart: function () {
                let { prevEl, nextEl } = this.params.navigation;
                this.el.querySelectorAll([prevEl, nextEl].join(",")).forEach(nav => {
                    nav.classList.add("arrow-out");
                })
                //mainSwiper.destroy(false)
            },
            transitionEnd: function () {
                let { prevEl, nextEl } = this.params.navigation;
                this.el.querySelectorAll([prevEl, nextEl].join(",")).forEach(nav => {
                    nav.classList.remove("arrow-out");
                })
            }

        }
    })
    var produtionSwiper = new Swiper('.p3-product-msg', {
        speed: 600,
        loop: true,
        spaceBetween: 100,
        parallax: true,
        nested: true, // 阻止父级切换
        resistanceRatio: 0,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
    })

    var supportSwiper = new Swiper(".p4-contents", {
        // speed: 1200,
        // spaceBetween: 300,
        // direction: "vertical",
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
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
            mainSwiper.slideTo(index + 1)
            //page('/user/'+ index)
            // scroll.scrollTo(document.querySelector("#section" + (index + 1)), {
            //     direction:600
            // });
            $$(".c-header-btn").dispatchEvent(new Event('click'));
        })
    })





})()