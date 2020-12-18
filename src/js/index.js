//import "animate.css"
import "@babel/polyfill";

import "../css/loading.css";

//import "../fonts/iconfont.css"

import "../fonts/iconfont.js";

//import "locomotive-scroll/dist/locomotive-scroll.css"
//import LocomotiveScroll from 'locomotive-scroll';

//import SuperGif from "../lib/libgif" 
import anime from "animejs/lib/anime.es";
import bgcanvas from './bgcanvas';

import Swiper, { Scrollbar, Navigation, Mousewheel, Parallax, History, HashNavigation, Pagination, EffectFade, Thumbs } from 'swiper'; // Import Swiper and modules  // https://swiperjs.com/api/#custom-build
import "swiper/swiper.scss";
//import "swiper/components/scrollbar/scrollbar.scss"; // ??? Not work, Need import in main.scss, Why?
//import "../scss/scroll.scss" // But if copy it to ./src/ and import it, it worked, why???

import "../scss/main.scss"; // sideEffects

import axios from "axios";

import urls from "../mock/urls";
import "../mock/mock.js"; // sideEffects


(function () {

  void function solarsysSVG() {
    //var path = anime.path('.solar-10');
    let svgObj = { deg1: 0, deg2: 0 };
    let innerCircHolder = document.querySelector("#innerCircHolder");
    let outerCircHolder = document.querySelector("#outerCircHolder");
    let warnicon = document.querySelector("#warnicon");
    let innerCx = 114.75;
    let innerCy = 114.75;
    anime({
      targets: svgObj,
      deg1: 360,
      easing: 'linear',
      duration: 4000,
      loop: true,
      update: function () {
        innerCircHolder.setAttribute('transform', `rotate(${svgObj.deg1}, ${innerCx} ${innerCy})`);
        warnicon.setAttribute("opacity", parseInt(svgObj.deg1 / 5) % 2 === 0 ? 1 : .6)
      }
    });
    anime({
      targets: svgObj,
      deg2: 360,
      easing: 'linear',
      duration: 15000,
      loop: true,
      update: function () {
        outerCircHolder.setAttribute('transform', `rotate(${svgObj.deg2}, ${innerCx} ${innerCy})`);
      }
    });
  }();

  const $$ = $sel => document.querySelector($sel);
  const docEl = $$('html');
  const lineAnimCanvas = bgcanvas.app.view;

  let scroll;
  setTimeout(() => {
    anime({
      targets: '#slogn .cls-1',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 800,
      fill: ["none", "#393e96"],
      delay: function (el, i) { return i * 80 + 3000 },
      //direction: 'alternate',
      //loop: true
    });
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

  Swiper.use([Scrollbar, Navigation, Mousewheel, Parallax, History, HashNavigation, Pagination, EffectFade, Thumbs]); // Install modules
  //$$("#section6").style.height=`${813/800*100}vh`;
  let mainSwiperOption = {
    direction: 'vertical', // 垂直切换选项
    //freeMode:true,
    slidesPerView: 'auto', // 适配最后一页不规则的高度

    speed: 900,
    shortSwipes: false,

    mousewheel: true,

    parallax: true,

    scrollbar: {
      el: '.main-scrollbar',
    },
    noSwipingClass: "stop-swiping",
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
        console.log(this.realIndex, this.activeIndex)
        if (this.activeIndex == 2) {
          let canvasTarget = document.querySelector(".p2-linebg-wrapper");
          if (!canvasTarget.classList.contains("has-canvas")) {
            canvasTarget.appendChild(lineAnimCanvas);
            canvasTarget.classList.add("has-canvas");
          }
        }
        document.querySelectorAll(".menu-ul a").forEach((a, index) => {
          if (this.realIndex === index + 1)
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
  // window.mainSwiper= mainSwiper;
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

  //window.addEventListener( 'mousewheel', onMouseWheel, false )
  //window.addEventListener( 'DOMMouseScroll', onMouseWheel, false )

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
    noSwipingClass: "stop-swiping",
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
    noSwipingClass: "stop-swiping",
    autoHeight: true,
    navigation: {
      nextEl: '.p3-next',
      prevEl: '.p3-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  })
  document.querySelectorAll(".p4-box").forEach(titBox => {
    titBox.innerHTML = Array.from(titBox.innerText).map((char, i) => {
      return char === "\n" ? "<br>" : `<span style="transition-delay:${i / 20}s">${char}</span>`
    }).join("");
  })

  var supportSwiper = new Swiper(".p4-contents", {
    // speed: 1200,
    // spaceBetween: 300,
    // direction: "vertical",
    slideActiveClass: 'support-slide-active',
    noSwipingClass: "stop-swiping",
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
  })

  var modelsThumbSwiper = new Swiper(".p5-thumb", {
    direction: "vertical",
    threshold: 10,
    nested: true,
    mousewheel: true,
    slidesPerView: 4,
    spaceBetween: 30,
    watchSlidesVisibility: true,
    //centerInsufficientSlides: true,
    scrollbar: {
      el: '.p5-thumb-scrollbar',
      draggable: true,
      dragSize: 76
    },
    on: {
      transitionStart: function (swiper) {
        mainSwiper.mousewheel.disable();
        //this.slides.forEach(slide => slide.style.transition = "")
      },
      transitionEnd: function (swiper) {
        mainSwiper.mousewheel.enable();
      },
    }
  })
  var modelDetailSwiper = new Swiper(".p5-msgcont", {
    slideActiveClass: 'case-slide-active',
    noSwipingClass: "stop-swiping",
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: modelsThumbSwiper,
    },
    on: {
      slideChange: function () {
        setTimeout(() => {
          let svgBoxs = document.querySelectorAll(".case-slide-active svg>rect");
          let smallbox = svgBoxs[0];
          let bigbox = svgBoxs[1]
          let warning = document.querySelector(".case-slide-active svg>g")
          bigbox.setAttribute("opacity", 0);
          warning.setAttribute("opacity", 0);
          let scaleObj = { small: 0, big: 0 };
          let tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 1000
          })
          tl.add({
            targets: scaleObj,
            small: 1,
            duration: 200,
            update: function () {
              smallbox.setAttribute('transform', `scale(${scaleObj.small})`)
            }
          })
            .add({
              targets: '.case-slide-active svg>line',
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: 'easeInOutSine',
              duration: 200,
              //delay: -50,
              //delay: function(el, i) { return i * 250 },
              direction: 'alternate',
              loop: true
            })
            .add({
              // targets: "#imageholder #bigbox",
              // scale: [0, 1],
              // duration: 300,
              targets: scaleObj,
              big: 1,
              duration: 200,
              update: function () {
                bigbox.setAttribute('transform', `scale(${scaleObj.big})`)
                bigbox.setAttribute("opacity", scaleObj.big)
                warning.setAttribute("opacity", scaleObj.big)
              }
            })
        }, 0);
      }
    }

  })

  axios[urls.newsListData.type](urls.newsListData.url)
    .then(function(response){
      let newsListData = response && response.data;
      let newsTemplate = document.getElementById("newsTemplate").innerHTML;
      console.log(newsListData)
      newsListData.forEach(data => {
        //let data= newsListData[0]
        let html = newsTemplate;
        for(let prop in data){
          html = html.replace(`{{${prop}}}`, data[prop]);
        }
        newsSwiper.appendSlide(html);
      })
      
      //console.log(response );
    })
    .catch(function(error){
      console.log(error);
    })

  var newsSwiper = new Swiper(".p6-contents", {
    spaceBetween: 40,
    slidesPerView: 1,//"auto"
    roundLengths: true, // 将slide的宽和高取整
    navigation: {
      nextEl: '.p6-prev',
      prevEl: '.p6-next',
    },
    breakpoints: {
      768: {
        spaceBetween: 15,
        slidesPerView: 2,//"auto"
      },
      992: {
        spaceBetween: 15,
        slidesPerView: 2,
      },
      1200: {
        spaceBetween: 15,
        slidesPerView: 3,
      },
      1400: {
        spaceBetween: 48,
        slidesPerView: 3
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
      mainSwiper.slideTo(index + 1)
      //page('/user/'+ index)
      // scroll.scrollTo(document.querySelector("#section" + (index + 1)), {
      //     direction:600
      // });
      $$(".c-header-btn").dispatchEvent(new Event('click'));
    })
  })

  function resize() {
    document.querySelector("p.scale").innerText = `${window.innerWidth}*${window.innerHeight}`
  }
  resize()
  window.addEventListener("resize", resize)
})()