import 'animate.css';
// import '@babel/polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../css/loading.css';
import '../fonts/iconfont';

// import 'locomotive-scroll/dist/locomotive-scroll.css'
// import LocomotiveScroll from 'locomotive-scroll';

// import SuperGif from '../lib/libgif';
import anime from 'animejs/lib/anime.es';

import page from 'page.js';
import Swiper from 'swiper';
// import Swiper, {
//   Scrollbar,
//   Navigation,
//   Mousewheel,
//   Parallax,
//   History,
//   HashNavigation,
//   Pagination,
//   EffectFade,
//   Thumbs,
//   Autoplay,
// } from 'swiper'; // Import Swiper and modules  // https://swiperjs.com/api/#custom-build
import 'swiper/swiper.scss';

// import 'swiper/components/scrollbar/scrollbar.scss';
// ??? Not work, Need import in main.scss, Why?
// import '../scss/scroll.scss' // But if copy it to ./src/ and import it, it worked, why???

import '../scss/main.scss'; // sideEffects

import axios from 'axios';
import bgcanvas from './bgcanvas';
import solarsysSVG from './solarsys';
// import Qs from 'qs'
/*
import  { mainSwiperOption,
  mediaSwiperOption,
  techOptions,
  produtionSwiperOption,
  supportSwiperOption,
  modelsThumbSwiperOption,
  modelDetailSwiperOption,
  newsSwiperOption,
} from './swiper.config';
*/
import * as swiperOptions from './swiper.config';
import PageRouter from './router';
import {
  param,
  formatStr,
} from './utils';
import urls from '../mock/urls';
// import '../mock/mock.js'; // sideEffects

const base = process.env.NODE_ENV === 'development' ? '/dist/' : '/';

class PageSwipers {
  constructor({
    mainSwiperOption,
    mediaSwiperOption,
    techOptions,
    produtionSwiperOption,
    supportSwiperOption,
    modelsThumbSwiperOption,
    modelDetailSwiperOption,
    newsSwiperOption,
  } = swiperOptions) {
    // Swiper.use([
    //   Scrollbar,
    //   Navigation,
    //   Mousewheel,
    //   Parallax,
    //   History,
    //   HashNavigation,
    //   Pagination,
    //   EffectFade,
    //   Thumbs,
    //   Autoplay]); // Install modules
    this.mainSwiper = new Swiper('.o-scroll', mainSwiperOption);
    this.mediaSwiper = new Swiper('.p1-contents', mediaSwiperOption);
    this.techSwiper = new Swiper('.p2-contents', techOptions);
    this.produtionSwiper = new Swiper('.p3-product-msg', produtionSwiperOption);
    this.supportSwiper = new Swiper('.p5-contents', supportSwiperOption);
    this.modelsThumbSwiper = new Swiper('.p6-thumb', modelsThumbSwiperOption);
    Object.assign(modelDetailSwiperOption, {
      thumbs: {
        swiper: this.modelsThumbSwiper,
      },
    });
    this.modelDetailSwiper = new Swiper('.p6-msgcont', modelDetailSwiperOption);
    this.newsSwiper = new Swiper('.p7-contents', newsSwiperOption);
  }
}

(function initPage() {
  const $$ = ($sel) => document.querySelector($sel);
  const docEl = $$('html');
  const logogif = $$('#logo-gif-img');
  const lineAnimCanvas = bgcanvas.app.view;
  let AllSwipers;

  const lang = docEl.getAttribute('lang');

  function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms, 'done');
    });
  }

  new Promise((resolve, reject) => {
    if (logogif.complete) {
      resolve();
    } else {
      logogif.addEventListener('load', resolve);
      logogif.addEventListener('error', reject);
    }

    // 初始化所有Swiper
    // console.log(swiperOptions.mainSwiperOption)

    AllSwipers = new PageSwipers(swiperOptions);
    window.mainSwiper = AllSwipers.mainSwiper;
    const resizeHandler = () => {
      // if(window.innerWidth<768.001&&(window.innerWidth/window.innerHeight>360/600)){
      if (window.innerWidth < 768.001) {
        AllSwipers.mainSwiper.params.freeMode = true;
        swiperOptions.mainSwiperOption.freeMode = true;
        console.log('Freemode true');
      } else {
        AllSwipers.mainSwiper.params.freeMode = false;
        swiperOptions.mainSwiperOption.freeMode = false;
        console.log('Freemode false');
      }

      AllSwipers.mainSwiper.update();
    };
    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    // 获取新闻列表
    (function getNewsList() {
      axios[urls.newsListData.type](`${base.replace(/\/$/, '')}${urls.newsListData.url}?${param({
        lang,
        act: 'newslist',
      })}`)
        .then((response) => {
          const newsListData = response && response.data;
          const newsTemplate = document.getElementById('newsTemplate').innerHTML;
          // console.log(newsListData)
          newsListData.forEach((data) => {
            // let data= newsListData[0]
            const $data = { ...data };
            $data.url = `./media/article/${data.newsId}`;
            let html = newsTemplate;
            // for (let prop in $data) {
            //   let val = $data[prop];
            //   html = html.replace(`{{${prop}}}`, val);
            // }
            // for(const [key, value] of Object.entries($data)) {
            //   html = html.replace(`{{${key}}}`, value);
            // }
            Object.entries($data).forEach(([key, value]) => {
              html = html.replace(`{{${key}}}`, value);
            });
            AllSwipers.newsSwiper.appendSlide(html);
          });
          AllSwipers.mainSwiper.update();

          const newsDesc = document.getElementsByClassName('news-desc');
          for (let i = 0; i < newsDesc.length; i += 1) {
            formatStr(newsDesc[i]);
          }
          const newsLink = document.querySelectorAll('.p7-news-link');
          for (let i = 0; i < newsLink.length; i += 1) {
            newsLink[i].addEventListener('click', () => {
              document.querySelector('html').classList.add('open-news');
              document.querySelector('html').classList.remove('is-loaded');
            });
          }

          document.querySelector('.news_page').appendChild($$('.footer').cloneNode(true));
          document.querySelector('.news-back').addEventListener('click', (e) => {
            e.preventDefault();
            page(`${base}media`);
            document.querySelector('.o-scroll').focus();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }());
  }).then(() => {
    // load 完成
    docEl.classList.add('is-loaded');
    console.log('Loaded');

    // 初始化重载 logo 演绎 gif
    // eslint-disable-next-line no-self-assign
    logogif.src = logogif.src;

    // 图片延迟加载
    // js替换的src，不会被计入document的load事件，因此要手动侦听所有img的load
    function loadImg(imgEle) {
      const $imgEle = imgEle;
      return new Promise((resolve, reject) => {
        const loadSrc = $imgEle.getAttribute('data-load-src');
        const tagName = $imgEle.tagName.toLowerCase();
        //console.log(tagName)
        if (loadSrc) {
          if (tagName === 'img') {
            $imgEle.src = loadSrc;
          } else if (tagName === 'image') {
            $imgEle.setAttribute('xlink:href', loadSrc);
          }
          $imgEle.addEventListener('load', resolve);
          $imgEle.addEventListener('error', reject);
        } else {
          resolve();
        }
      });
    }
    const promises = Array.from(document.querySelectorAll('img')).map(loadImg);
    // promises.concat(Array.from(document.querySelectorAll('image')).map(loadImg));
    // iPhone 6S中SVG <image>未加载xlink:href

    // polyfill Promise.allsettled
    function allsettled($promises) {
      const wrappedPromises = $promises.map((p) => Promise.resolve(p)
        .then(
          (val) => ({ status: 'fulfilled', value: val }),
          (err) => ({ status: 'rejected', reason: err }),
        ));
      return Promise.all(wrappedPromises);
    }
    allsettled(promises).then(() => {
      AllSwipers.mainSwiper.update();
      console.log('All images loaded!');
    }).catch((err) => {
      console.log(`Images load err: ${err}`);
    });
    console.log(AllSwipers);
    // 初始化路由
    const router = new PageRouter(AllSwipers.mainSwiper);
    router.getPagesFromNav();
    router.configRule();
    console.log(router.pages);

    // 首页slogan SVG动画
    anime({
      targets: '#slogan .slogan-1',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 800,
      fill: ['none', '#393e96'],
      delay(el, i) {
        return i * 80 + 3000;
      },
      // direction: 'alternate',
      // loop: true
    });

    // 将 canvas 动画添加到 dom
    document.querySelector('.p0-linebg-wrapper').appendChild(lineAnimCanvas);

    return timeout(10);
  }).then(() => {
    // 为dom添加事件
    (function addEvent() {
      // 如果不用page直接使用href，则需要使用相对路径如'./media'，但这样的话，从新闻详情页返回时，将会出现如下错乱
      // /dist/media/article/3  => /dist/media/article/media
      // 因此需要使用根路径，如/dist/media，这样无论从哪儿回来都会正确，但是直接在a标签的href上写根路径无法生效，media会被视作params {0: media}
      // 因此只能拦截a的点击事件，用page代理:
      document.querySelectorAll('.menu-ul li a').forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          page(base + e.currentTarget.getAttribute('href').trim());
        });
      });

      document.querySelector('.menu-switch-mobile').addEventListener('click', () => {
        const menubox = $$('.c-menubox');
        if (menubox.classList.contains('nav-show-mobile')) {
          menubox.classList.remove('nav-show-mobile');
        } else {
          menubox.classList.add('nav-show-mobile');
        }
      });
      document.querySelectorAll('.text-current').forEach((a) => {
        a.addEventListener('click', () => {
          const menubox = document.querySelector('.c-menubox');
          menubox.classList.remove('nav-show-mobile');
        });
      });
      document.querySelector('.menu-logo').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('html').classList.remove('open-news');
        page(base + e.currentTarget.getAttribute('href').trim());
        AllSwipers.mainSwiper.slideTo(0);
      });
    }());

    // 添加文字transition-delay
    (function addTransitionDelay() {
      document.querySelectorAll('.p5-box').forEach((titBox) => {
        const paragraph = titBox.querySelector('p');
        paragraph.innerHTML = Array.from(paragraph.innerText.replace(/<br *?\/>/g, '\n')).map((char, i) => (char === '\n' ? '<br>' : `<span style='transition-delay:${i / 20}s'>${char}</span>`)).join('');
      });
    }());

    // 应用案例栏目的圆圈动画
    solarsysSVG();

    // return timeout(3000);
  });

  function resize() {
    document.querySelector('p.scale').innerText = `${window.innerWidth}*${window.innerHeight}__`;
  }
  resize();
  window.addEventListener('resize', resize);
}());
