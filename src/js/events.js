import Swiper from 'swiper';
import * as swiperOptions from './swiper.config';

function listenWheel(event) {
  const delta = Math.sign(event.deltaY);
  const { seriesSwiper } = window.AllSwipers;
  if (seriesSwiper) {
    if (delta < 0 && seriesSwiper.realIndex === 0) {
      console.log('mainSwiper PREV cross series');
      window.mainSwiper.slidePrev();
      window.removeEventListener('mousewheel', listenWheel, false);
      setTimeout(() => {
        window.mainSwiper.mousewheel.enable();
      }, window.mainSwiper.params.speed + 5);
      // () => {
      //   console.log('mainSwiper PREV cross series');
      //   window.mainSwiper.mousewheel.enable();
      //   console.log(listenWheel);
      //   window.removeEventListener('mousewheel', listenWheel, false);
      // }
    }
    if (delta > 0 && (seriesSwiper.realIndex === seriesSwiper.slides.length - 1)) {
      console.log('mainSwiper Next cross series');
      window.mainSwiper.slideNext();
      window.removeEventListener('mousewheel', listenWheel, false);
      setTimeout(() => {
        window.mainSwiper.mousewheel.enable();
      }, window.mainSwiper.params.speed + 5);
    }
  }
  console.info(delta);
}
// 在大尺寸（>750）下，判断拖动（主要是在滑到series的时候）
function mainSwiperTouchMoveWhenSeriesMdUp(event) {
  if (window.AllSwipers) {
    const { seriesSwiper } = window.AllSwipers;
    const { mainSwiper } = window.AllSwipers;
    // console.log('has AllSwiper');
    if (mainSwiper && seriesSwiper) {
      // console.log('has mainSwiper & seriesSwiper');
      const swiperLen = seriesSwiper.slides.length;
      mainSwiper.allowSlidePrev = true;
      mainSwiper.allowSlideNext = true;
      if (mainSwiper.realIndex === 3) {
        // console.log('main swiper realindex = 3');
        if (swiperLen > 1) {
          mainSwiper.allowSlidePrev = false;
          mainSwiper.allowSlideNext = false;
          if (seriesSwiper.realIndex === 0) {
            window.mainSwiper.allowSlidePrev = true;
            console.log('Allow mainSwiper slide Prev ONLY');
          } else if (seriesSwiper.realIndex === swiperLen - 1) {
            mainSwiper.allowSlideNext = true;
            console.log('Allow mainSwiper slide Next Only');
          } else {
            console.log('Do NOT Allow mainSwiper slide Prev & Next');
          }
        } else {
          console.log('series Len < 1, Allow mainSwiper slide Prev & Next');
        }
      }
    }
  }
}

// 在小尺寸下随时都可以拖动mainswiper
function mainSwiperTouchMoveWhenSeriesMdDown(event) {
  if (window.mainSwiper) {
    window.mainSwiper.allowSlidePrev = true;
    window.mainSwiper.allowSlideNext = true;
  }
}

// 判断当时在个尺寸下是否能拖动mainswiper
function setMainSwiperTouchMoveWhenSeries() {
  if (window.innerWidth < 750.001) {
    mainSwiperTouchMoveWhenSeriesMdDown();
  } else {
    mainSwiperTouchMoveWhenSeriesMdUp();
  }
}

// 判断当时在个尺寸下是否滚轮mainswiper
function setMainSwiperMouseWheelWhenSeries() {
  if (window.innerWidth < 750.001) {
    swiperOptions.mainSwiperOption.mousewheel = true;
    window.AllSwipers.mainSwiper.mousewheel.enable();
    console.log('remove mousewheel');
    window.removeEventListener('mousewheel', listenWheel, false);
  } else {
    swiperOptions.mainSwiperOption.mousewheel = false;
    window.AllSwipers.mainSwiper.mousewheel.disable();
    console.log('add mousewheel');
    window.addEventListener('mousewheel', listenWheel, false);
  }
}

// 判断是否能拖动和滚轮
function mainSwiperTouchMoveAndMouseWheel(isSeries) {
  const { AllSwipers } = window;
  if (isSeries) {
    console.log('Main slide to 3 end, main mousewheel disable');
    setMainSwiperMouseWheelWhenSeries();
    setMainSwiperTouchMoveWhenSeries();
    // 触发resize来判断mainSwiper的allowSlidePrev、allowSlideNext
  } else {
    AllSwipers.mainSwiper.allowSlideNext = true;
    AllSwipers.mainSwiper.allowSlidePrev = true;
  }
  return false;
}

// 自适应监听
const resizeHandler = () => {
  const { AllSwipers } = window;
  console.log('resize');
  if (window.innerWidth < 750.001 && AllSwipers) {
    if (AllSwipers) {
      AllSwipers.mainSwiper.params.freeMode = true;
      swiperOptions.mainSwiperOption.freeMode = true;
      AllSwipers.mainSwiper.update();
      console.log('Freemode true');
      if (AllSwipers.seriesSwiper) {
        AllSwipers.seriesSwiper.destroy();
        AllSwipers.seriesSwiper = null;
      }
      // mainSwiperTouchMoveWhenSeriesMdDown();
      // window.removeEventListener('mousewheel', listenWheel, false);
      console.log('remove listener mousewheel ');
    }
  } else if (AllSwipers) {
    AllSwipers.mainSwiper.params.freeMode = false;
    swiperOptions.mainSwiperOption.freeMode = false;
    AllSwipers.mainSwiper.update();
    console.log('Freemode false');

    swiperOptions.mainSwiperOption.mousewheel = true;
    AllSwipers.mainSwiper.mousewheel.enable();

    if (!AllSwipers.seriesSwiper) {
      console.log('ReInit swiper');
      AllSwipers.seriesSwiper = new Swiper('.p3-contents-swiper', swiperOptions.seriesSwiperOption);
      // mainSwiperTouchMoveAndMouseWheel(AllSwipers.seriesSwiper.realIndex === 3);
    }
  }
};

export {
  mainSwiperTouchMoveAndMouseWheel,
  resizeHandler,
  listenWheel,
};
