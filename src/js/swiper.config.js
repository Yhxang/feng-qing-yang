/* eslint-disable no-undef */
import SwiperAnimation from '@cycjimmy/swiper-animation';
import bgcanvas from './bgcanvas';

const swiperAnimation = new SwiperAnimation();

const pageHistory = [];
const lineAnimCanvas = bgcanvas.app.view;
const mainSwiperOption = {
  direction: 'vertical', // 垂直切换选项
  // freeMode:true,
  slidesPerView: 'auto', // 适配最后一页不规则的高度
  speed: 900,
  mousewheel: true,
  parallax: true,
  resistanceRatio: 0, // 第一个和最后一个slide 禁止拖动
  observer: true,
  // observeParents: true, // 开启会在freemode下出现莫名其妙的贴合slide的bug，像是开启了freeModeSticky:true
  observeSlideChildren: true,
  slideClass: 'section-slide',
  scrollbar: {
    el: '.main-scrollbar',
    draggable: true,
  },
  // noSwipingClass: 'stop-swiping',
  navigation: {
    nextEl: null,
    prevEl: null,
  },
  breakpoints: {
    750.001: {
      noSwipingClass: 'stop-swiping',
    },
    // '@1.00': {
    //   freeMode: 'false'
    // }
  },
  on: {
    init() {
      // console.log(this.$wrapperEl[0].style.transitionDuration)
      // this.$wrapperEl[0].style.transitionDuration = '1.2s !important';
      // console.log(this.$wrapperEl[0].style.transitionDuration)
      swiperAnimation.init(this).animate();
    },
    resize() {
      console.log('swiper resize!');
    },
    slideChange() {
      swiperAnimation.init(this).animate();
      const { activeIndex } = this;
      const slideHistory = this.slides[activeIndex].getAttribute('data-history');

      if (pageHistory[pageHistory.length - 1] !== slideHistory) {
        pageHistory.push(slideHistory);
        window.history.pushState(null, '', slideHistory);
      }
    },
    slideChangeTransitionStart() {
      const { activeIndex } = this; // main swiper index
      if (activeIndex === 2) {
        const canvasTarget = document.querySelector('.p2-linebg-wrapper');
        if (!canvasTarget.classList.contains('has-canvas')) {
          canvasTarget.appendChild(lineAnimCanvas);
          canvasTarget.classList.add('has-canvas');
        }
      }

      const $columnIndex = activeIndex - 1; // 栏目index 首页不算正式页面所以减一
      let columnIndex = $columnIndex;
      if ($columnIndex > 2 && $columnIndex <= 4) {
        columnIndex = 2;
      } else if ($columnIndex > 4) {
        columnIndex = $columnIndex - 2;
      }
      // console.log('history: ',
      //   window.history,
      //   swiper.slides[activeIndex].getAttribute('data-history'));
      // console.log({activeIndex, columnIndex, pages, page:pages[columnIndex]});

      document.querySelectorAll('.menu-ul a').forEach((a, index) => {
        if (columnIndex === index) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    },
    slideChangeTransitionEnd() {
      this.slides[this.realIndex].classList.add('first-active');
      if (this.realIndex !== 0) {
        document.querySelector('html').classList.add('nav-on');
      }
    },
  },
  // history: {
  //   //replaceState: true,
  //   key: ''
  // },
};

const mediaSwiperOption = {
  speed: 1100,
  // loop: true,
  parallax: true,
  nested: true, // 阻止父级切换
  resistanceRatio: 0,
  watchSlidesProgress: true,
  watchOverflow: true, // 只有一个slide时隐藏导航左右
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // on: {
  //   progress(swiper) {
  //     return;
  //     let interleaveOffset = 0.3;
  //     swiper.slides.forEach(slide => {

  //       let slideProgress = slide.progress;

  //       let innerOffset = swiper.width * interleaveOffset;
  //       let innerTranslate = slideProgress * innerOffset;
  //       slide.querySelector('.media-content').style
  //         .transform = `translate3d(${innerTranslate}px,0,0)`
  //     })
  //   },
  //   touchStart: function (swiper) {
  //     //this.slides.forEach(slide => slide.style.transition = '')
  //   },
  //   slideChangeTransitionStart() {
  //     mainSwiper.mousewheel.disable();
  //     //this.slides.forEach(slide => slide.style.transition = '')
  //   },
  //   slideChangeTransitionEnd(swiper) {
  //     mainSwiper.mousewheel.enable();
  //     return;
  //     this.slides.forEach(slide => {
  //       let speed = this.params.speed;
  //       slide.style.transition = speed + 'ms';
  //       slide.querySelector('.media-content').style.transition = speed + 'ms';
  //     });
  //   }
  // }
};

const techOptions = {
  speed: 600,
  autoHeight: true,
  spaceBetween: 80,
  parallax: true,
  nested: true, // 阻止父级切换
  resistanceRatio: 0,
  noSwiping: true,
  watchSlidesProgress: true,
  // noSwipingClass: 'stop-swiping',
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
    dragSize: 120,
  },
  breakpoints: {
    768.001: {
      // shortSwipes: false,
      speed: 1200,
      spaceBetween: 800,
      noSwipingClass: 'stop-swiping',
    },
    // 992.001:{
    //   scrollbar: ''
    // }
  },
  on: {
    slideChangeTransitionStart() {
      mainSwiper.mousewheel.disable();
    },
    slideChangeTransitionEnd() {
      mainSwiper.mousewheel.enable();
    },
    transitionStart() {
      const {
        prevEl,
        nextEl,
      } = this.params.navigation;
      this.el.querySelectorAll([prevEl, nextEl].join(',')).forEach((nav) => {
        nav.classList.add('arrow-out');
      });
      // mainSwiper.destroy(false)
    },
    transitionEnd() {
      const {
        prevEl,
        nextEl,
      } = this.params.navigation;
      this.el.querySelectorAll([prevEl, nextEl].join(',')).forEach((nav) => {
        nav.classList.remove('arrow-out');
      });

      const scrollbarDrag = this.el.querySelector('.swiper-scrollbar-drag');

      if (this.activeIndex === this.slides.length - 1) {
        scrollbarDrag.classList.add('dragged-end');
      } else {
        scrollbarDrag.classList.remove('dragged-end');
      }
    },
  },
};

const produtionSwiperOption = {
  speed: 600,
  loop: true,
  // autoplay: true,
  spaceBetween: 100,
  parallax: true,
  nested: true, // 阻止父级切换
  resistanceRatio: 0,
  // noSwipingClass: 'stop-swiping',
  autoHeight: true,
  navigation: {
    nextEl: '.p3-next',
    prevEl: '.p3-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
};

const supportSwiperOption = {
  // speed: 1200,
  // spaceBetween: 300,
  // direction: 'vertical',
  slideActiveClass: 'support-slide-active',
  noSwipingClass: 'stop-swiping',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
};

const modelsThumbSwiperOption = {
  direction: 'vertical',
  threshold: 10,
  nested: true,
  mousewheel: true,
  slidesPerView: 4,
  spaceBetween: 30,
  watchSlidesVisibility: true,
  // centerInsufficientSlides: true,
  scrollbar: {
    el: '.p6-thumb-scrollbar',
    draggable: true,
    dragSize: 76,
  },
  on: {
    transitionStart() {
      mainSwiper.mousewheel.disable();
    },
    transitionEnd() {
      mainSwiper.mousewheel.enable();
    },
  },
};

const modelDetailSwiperOption = {
  slideActiveClass: 'case-slide-active',
  noSwipingClass: 'stop-swiping',
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  thumbs: {
    swiper: null, // modelsThumbSwiper,
  },
};

const newsSwiperOption = {
  spaceBetween: 28,
  slidesPerView: 1, // 'auto'
  roundLengths: true, // 将slide的宽和高取整
  // initialSlide: 2,
  // loop: true,
  // loopAdditionalSlides: 1,
  slideToClickedSlide: true,
  grabCursor: true,
  observer: true,
  observeSlideChildren: true,
  autoHeight: true,
  navigation: {
    nextEl: '.p7-prev',
    prevEl: '.p7-next',
  },
  breakpoints: {
    750: {
      spaceBetween: 15,
      slidesPerView: 2, // 'auto'
      loop: false,
      grabCursor: false,
    },
    992: {
      spaceBetween: 15,
      slidesPerView: 2,
      loop: false,
      grabCursor: false,
    },
    1200: {
      spaceBetween: 15,
      slidesPerView: 3,
      loop: false,
      grabCursor: false,
    },
    1400: {
      spaceBetween: 48,
      slidesPerView: 3,
      loop: false,
      grabCursor: false,
    },
  },
};

export {
  mainSwiperOption,
  mediaSwiperOption,
  techOptions,
  produtionSwiperOption,
  supportSwiperOption,
  modelsThumbSwiperOption,
  modelDetailSwiperOption,
  newsSwiperOption,
};
