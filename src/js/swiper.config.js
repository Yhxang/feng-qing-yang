import bgcanvas from './bgcanvas';
import SwiperAnimation from "@cycjimmy/swiper-animation";
const swiperAnimation = new SwiperAnimation();

const pageHistory = [];
const lineAnimCanvas = bgcanvas.app.view;
const mainSwiperOption = {
  direction: 'vertical', // 垂直切换选项
  //freeMode:true,
  slidesPerView: 'auto', // 适配最后一页不规则的高度
  speed: 900,
  mousewheel: true,
  parallax: true,
  resistanceRatio: 0, //第一个和最后一个slide 禁止拖动
  observer: true,
  // observeParents: true,
  observeSlideChildren: true,
  scrollbar: {
    el: '.main-scrollbar',
    draggable: true,
  },
  //noSwipingClass: "stop-swiping",
  navigation: {
    nextEl: null,
    prevEl: null
  },
  breakpoints: {
    750.001: {
      noSwipingClass: "stop-swiping",
    },
    // '@1.00': { 
    //   freeMode: "false"
    // }
  },
  on: {
    init: function () {
      //console.log(this.$wrapperEl[0].style.transitionDuration)
      //this.$wrapperEl[0].style.transitionDuration = "1.2s !important";
      //console.log(this.$wrapperEl[0].style.transitionDuration)
      swiperAnimation.init(this).animate();
    },
    resize: function (swiper) {
      console.log('swiper resize!')
    },
    slideChange: function (swiper) {
      swiperAnimation.init(this).animate();
      let activeIndex = swiper.activeIndex;
      let slideHistory = swiper.slides[activeIndex].getAttribute('data-history');

      if (pageHistory[pageHistory.length - 1] !== slideHistory) {
        pageHistory.push(slideHistory);
        history.pushState(null, '', slideHistory);
      }

    },
    slideChangeTransitionStart: function (swiper) {
      let activeIndex = swiper.activeIndex; // main swiper index
      if (activeIndex == 2) {
       
        let canvasTarget = document.querySelector(".p2-linebg-wrapper");
        if (!canvasTarget.classList.contains("has-canvas")) {
          canvasTarget.appendChild(lineAnimCanvas);
          canvasTarget.classList.add("has-canvas");
        }
      }

      let _columnIndex = activeIndex - 1; // 栏目index 首页不算正式页面所以减一
      let columnIndex = _columnIndex;
      if (_columnIndex > 2 && _columnIndex <= 4) {
        columnIndex = 2;
      } else if (_columnIndex > 4) {
        columnIndex = _columnIndex - 2;
      }
      //console.log('history: ', window.history,swiper.slides[activeIndex].getAttribute('data-history'))
      //console.log({activeIndex, columnIndex, pages, page:pages[columnIndex]})

      document.querySelectorAll(".menu-ul a").forEach((a, index) => {
        if (columnIndex === index)
          a.classList.add('active');
        else
          a.classList.remove('active');
      })
    },
    slideChangeTransitionEnd: function () {
      this.slides[this.realIndex].classList.add("first-active");
      if (this.realIndex !== 0) {
        document.querySelector("html").classList.add("nav-on");

        return;
        if (this.realIndex == 1) {
          this.allowSlidePrev = false;
        } else {
          this.allowSlidePrev = true;
        }
      }
    }
  },
  // history: {
  //   //replaceState: true,
  //   key: ''
  // },
}

const mediaSwiperOption = {
  speed: 1100,
  //loop: true,
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
      return;
      let interleaveOffset = 0.3;
      swiper.slides.forEach(slide => {

        let slideProgress = slide.progress;

        let innerOffset = swiper.width * interleaveOffset;
        // console.log(slide  )
        let innerTranslate = slideProgress * innerOffset;
        //if(swiper.activeIndex ==1) console.log(slide.querySelector('img'))
        slide.querySelector('.media-content').style.transform = `translate3d(${innerTranslate}px,0,0)`
        //if(swiper.activeIndex ==1) console.log( `translate3d(${innerTranslate}px,0,0,)`)
      })
    },
    touchStart: function (swiper) {
      //this.slides.forEach(slide => slide.style.transition = "")
    },
    slideChangeTransitionStart: function (swiper) {
      mainSwiper.mousewheel.disable();
      //this.slides.forEach(slide => slide.style.transition = "")
    },
    slideChangeTransitionEnd: function (swiper) {
      mainSwiper.mousewheel.enable();
      return;
      this.slides.forEach(slide => {
        let speed = this.params.speed;
        slide.style.transition = speed + "ms";
        slide.querySelector('.media-content').style.transition = speed + "ms";
      });
    }
  }
}

const techOptions = {
  speed: 600,
  autoHeight: true,
  spaceBetween: 80,
  parallax: true,
  nested: true, // 阻止父级切换
  resistanceRatio: 0,
  noSwiping: true,
  watchSlidesProgress: true,
  //noSwipingClass: "stop-swiping",
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // mousewheel: {
  //     releaseOnEdges: true,
  //     eventsTarged: '#p1-contents',
  // },
  scrollbar: {
    el: '.p2-thumb-scrollbar',
    draggable: true,
    dragSize: 120
  },
  breakpoints: {
    768.001: {
      //shortSwipes: false,
      speed: 1200,
      spaceBetween: 800,
      noSwipingClass: "stop-swiping",
    },
    // 992.001:{
    //   scrollbar: ''
    // }
  },
  on: {
    slideChangeTransitionStart: function (swiper) {
      mainSwiper.mousewheel.disable();
    },
    slideChangeTransitionEnd: function (swiper) {
      mainSwiper.mousewheel.enable();
    },
    transitionStart: function (swiper) {
      let {
        prevEl,
        nextEl
      } = swiper.params.navigation;
      swiper.el.querySelectorAll([prevEl, nextEl].join(",")).forEach(nav => {
        nav.classList.add("arrow-out");
      })
      //mainSwiper.destroy(false)
    },
    transitionEnd: function (swiper) {
      let {
        prevEl,
        nextEl
      } = swiper.params.navigation;
      swiper.el.querySelectorAll([prevEl, nextEl].join(",")).forEach(nav => {
        nav.classList.remove("arrow-out");
      })

      let scrollbarDrag = swiper.el.querySelector(".swiper-scrollbar-drag");

      if (swiper.activeIndex === swiper.slides.length - 1) {
        scrollbarDrag.classList.add('dragged-end')
      } else {
        scrollbarDrag.classList.remove('dragged-end')
      }
    }
  }
}

const produtionSwiperOption = {
  speed: 600,
  loop: true,
  //autoplay: true,
  spaceBetween: 100,
  parallax: true,
  nested: true, // 阻止父级切换
  resistanceRatio: 0,
  //noSwipingClass: "stop-swiping",
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
}

const supportSwiperOption = {
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
}

const modelsThumbSwiperOption = {
  direction: "vertical",
  threshold: 10,
  nested: true,
  mousewheel: true,
  slidesPerView: 4,
  spaceBetween: 30,
  watchSlidesVisibility: true,
  //centerInsufficientSlides: true,
  scrollbar: {
    el: '.p6-thumb-scrollbar',
    draggable: true,
    dragSize: 76
  },
  on: {
    transitionStart: function (swiper) {
      mainSwiper.mousewheel.disable();
    },
    transitionEnd: function (swiper) {
      mainSwiper.mousewheel.enable();
    },
  }
}

const modelDetailSwiperOption = {
  slideActiveClass: 'case-slide-active',
  noSwipingClass: "stop-swiping",
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  thumbs: {
    swiper: null //modelsThumbSwiper,
  }
}

const newsSwiperOption = {
  spaceBetween: 28,
  slidesPerView: 1, //"auto"
  roundLengths: true, // 将slide的宽和高取整
  initialSlide: 2,
  loop: true,
  loopAdditionalSlides: 1,
  slideToClickedSlide: true,
  grabCursor: true,
  navigation: {
    nextEl: '.p7-prev',
    prevEl: '.p7-next',
  },
  breakpoints: {
    750: {
      spaceBetween: 15,
      slidesPerView: 2, //"auto"
      loop: false,
      grabCursor: false
    },
    992: {
      spaceBetween: 15,
      slidesPerView: 2,
      loop: false,
      grabCursor: false
    },
    1200: {
      spaceBetween: 15,
      slidesPerView: 3,
      loop: false,
      grabCursor: false
    },
    1400: {
      spaceBetween: 48,
      slidesPerView: 3,
      loop: false,
      grabCursor: false
    }
  }
};

export { mainSwiperOption, mediaSwiperOption, techOptions, produtionSwiperOption, supportSwiperOption, modelsThumbSwiperOption, modelDetailSwiperOption, newsSwiperOption }