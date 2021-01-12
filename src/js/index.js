import "animate.css"
import "@babel/polyfill";

import "../css/loading.css";

import "../fonts/iconfont.js";

//import "locomotive-scroll/dist/locomotive-scroll.css"
//import LocomotiveScroll from 'locomotive-scroll';

//import SuperGif from "../lib/libgif" 
import anime from "animejs/lib/anime.es";
import bgcanvas from './bgcanvas';

import page from 'page.js';

import Swiper, {
  Scrollbar,
  Navigation,
  Mousewheel,
  Parallax,
  History,
  HashNavigation,
  Pagination,
  EffectFade,
  Thumbs,
  Autoplay
} from 'swiper'; // Import Swiper and modules  // https://swiperjs.com/api/#custom-build
import "swiper/swiper.scss";

//import "swiper/components/scrollbar/scrollbar.scss"; // ??? Not work, Need import in main.scss, Why?
//import "../scss/scroll.scss" // But if copy it to ./src/ and import it, it worked, why???

import "../scss/main.scss"; // sideEffects

import axios from "axios";
// import Qs from "qs"
// import  { mainSwiperOption, mediaSwiperOption, techOptions, produtionSwiperOption, supportSwiperOption, modelsThumbSwiperOption, modelDetailSwiperOption, newsSwiperOption } from "./swiper.config";
import * as swiperOptions from "./swiper.config";
import {
  param,
  formatStr
} from "./utils";
import urls from "../mock/urls";
// import "../mock/mock.js"; // sideEffects

const base = process.env.NODE_ENV == "development" ? "/dist/" : "/";
const publicPath = process.env.NODE_ENV == "development" ? "http://g-powertech.com.cn" : "";

class PageSwipers {
  constructor(swiperOptions) {
    Swiper.use([Scrollbar, Navigation, Mousewheel, Parallax, History, HashNavigation, Pagination, EffectFade, Thumbs, Autoplay]); // Install modules

    this.mainSwiper = new Swiper('.o-scroll', swiperOptions.mainSwiperOption);
    this.mediaSwiper = new Swiper('.p1-contents', swiperOptions.mediaSwiperOption);
    this.techSwiper = new Swiper('.p2-contents', swiperOptions.techOptions);
    this.produtionSwiper = new Swiper('.p3-product-msg', swiperOptions.produtionSwiperOption);
    this.supportSwiper = new Swiper(".p5-contents", swiperOptions.supportSwiperOption);
    this.modelsThumbSwiper = new Swiper(".p6-thumb", swiperOptions.modelsThumbSwiperOption);
    Object.assign(swiperOptions.modelDetailSwiperOption, {
      thumbs: {
        swiper: this.modelsThumbSwiper
      }
    })
    this.modelDetailSwiper = new Swiper(".p6-msgcont", swiperOptions.modelDetailSwiperOption);
    this.newsSwiper = new Swiper(".p7-contents", swiperOptions.newsSwiperOption);
  }
}

class PageRouter {
  constructor(mainSwiper) {
    this.pages = [];
    this.mainSwiper = mainSwiper;
  }

  getPagesFromNav() {
    let mainSwiperSlideHistory = Array.from(this.mainSwiper.slides).map(slide => slide.getAttribute("data-history").trim());
    console.log(mainSwiperSlideHistory);
    document.querySelectorAll(".menu-ul li a").forEach((a, idx) => {
      let navHref = a.getAttribute("href").slice(2).replace('&', "").trim();
      this.pages.push({
        navHref,
        navIndex: idx,
        slideTargetIdx: (() => {
          for (let i = 0; i < mainSwiperSlideHistory.length; i++) {
            if (navHref === mainSwiperSlideHistory[i]) {
              return i;
            }
          }
        })()
      });
    });
  }

  // 配置路由
  configRule() {
    // 配置dev时的base
    page.base(base);
    // 配置根路径路由
    page("/", function () {
      console.log('index');
      document.querySelector("html").classList.remove("open-news");
    })
    // 配置导航路由
    this.pages.forEach(function (navPage, idx) {
      // page(navPage.navHref, function (ctx) {
      //   console.log('11111', ctx)
      // })
      page(new RegExp("(en\\/)?" + navPage.navHref + "\\/?$"), function (ctx) {
        console.log('page.js_router: ', navPage.navHref, ' index_in_pages:', idx);
        console.log("page.js_context:", ctx);

        this.mainSwiper.slideTo(navPage.slideTargetIdx);

        document.querySelector("html").classList.remove("open-news");
      }.bind(this));
    }.bind(this));

    // 配置新闻详情路由
    // page(new RegExp("(en\\/)?" + 'media\\/article\\/\\'+ ":page"), showNews); ????正则获取page失败
    // http://127.0.0.1:3000/dist/media/article/01
    page('media/article/:page', showNews);
    page('en/media/article/:page', showNews);
    function showNews(ctx) {
      document.querySelector("html").classList.add("open-news");
      console.log('page context:showNews:: ', ctx);

      var page = ctx.params.page; //~~ctx.params.page;
      axios[urls.newsArticleData.type](base.replace(/\/$/, '') + urls.newsArticleData.url + "?" + param({
        lang: document.querySelector("html").getAttribute('lang'),
        act: "news",
        newsId: page
      }))
        .then(function (response) {
          let newsData = response && response.data;
          document.querySelector(".news-page-title").innerHTML = newsData.pageTitle;
          document.querySelector(".publish-date").innerHTML = newsData.publishDate;
          document.querySelector(".news-page-body").innerHTML = newsData.pageBody;
          document.querySelector("html").scrollTo(0, 0);
          document.querySelector("html").classList.add("is-loaded");
        })
        .catch(err => {
          console.log(err)
        })
    }
    // 配置其它规则路由
    page("*", function (ctx) {
      console.log(ctx, 'Not Found')
    })

    page();
  }
}

(function () {
  const $$ = $sel => document.querySelector($sel);
  const docEl = $$('html');
  const lineAnimCanvas = bgcanvas.app.view;
  let AllSwipers;

  const lang = docEl.getAttribute('lang');

  function timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, 'done');
    })
  }

  new Promise((resolve, reject) => {
    let logogif = $$("#logo-gif-img");
    window.logogif = logogif;
    if (logogif.complete) {
      resolve();
    } else {
      logogif.addEventListener("load", resolve);
      logogif.addEventListener("error", reject);
    }

    // 初始化所有Swiper
    //console.log(swiperOptions.mainSwiperOption)
    AllSwipers = new PageSwipers(swiperOptions);
    window.mainSwiper = AllSwipers.mainSwiper;
    window.addEventListener("resize", e => {
      // if(window.innerWidth<768.001&&(window.innerWidth/window.innerHeight>360/600)){
      if (window.innerWidth < 768.001) {
        AllSwipers.mainSwiper.params.freeMode = swiperOptions.mainSwiperOption.freeMode = true;
      } else {
        AllSwipers.mainSwiper.params.freeMode = swiperOptions.mainSwiperOption.freeMode = false;
      }

      AllSwipers.mainSwiper.update();
    })
    window.dispatchEvent(new Event("resize"));

    // 获取新闻列表
    void function getNewsList() {
      axios[urls.newsListData.type](base.replace(/\/$/, '') + urls.newsListData.url + "?" + param({
        lang,
        act: "newslist"
      }))
        .then(function (response) {
          let newsListData = response && response.data;
          let newsTemplate = document.getElementById("newsTemplate").innerHTML;
          //console.log(newsListData)
          newsListData.forEach(data => {
            //let data= newsListData[0]
            data.url = "./media/article/" + data.newsId;
            let html = newsTemplate;
            for (let prop in data) {
              let val = data[prop];
              html = html.replace(`{{${prop}}}`, val);
            }
            AllSwipers.newsSwiper.appendSlide(html);
          })
          AllSwipers.mainSwiper.update();

          let newsDesc = document.getElementsByClassName("news-desc");
          for (let i = 0; i < newsDesc.length; i++) {
            formatStr(newsDesc[i]);
          }
          let newsLink = document.querySelectorAll(".p7-news-link")
          for (let i = 0; i < newsLink.length; i++) {
            newsLink[i].addEventListener('click', e => {
              document.querySelector('html').classList.add("open-news");
              document.querySelector("html").classList.remove("is-loaded");
            })
          }

          document.querySelector(".news_page").appendChild($$(".footer").cloneNode(true));
          document.querySelector(".news-back").addEventListener("click", e => {
            e.preventDefault()
            page(base + 'media');
            document.querySelector(".o-scroll").focus();
          })
        })
        .catch(function (error) {
          console.log(error);
        })
    }()

  }).then(value => {
    // load 完成
    docEl.classList.add("is-loaded");
    console.log('loaded');

    // 初始化重载 logo 演绎 gif
    logogif.src = logogif.src;

    // 初始化路由
    let router = new PageRouter(AllSwipers.mainSwiper);
    router.getPagesFromNav();
    router.configRule();
    console.log(router.pages);

    // 首页slogan SVG动画
    anime({
      targets: '#slogan .slogan-1',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 800,
      fill: ["none", "#393e96"],
      delay: function (el, i) {
        return i * 80 + 3000
      },
      //direction: 'alternate',
      //loop: true
    });

    // 将 canvas 动画添加到 dom
    document.querySelector(".p0-linebg-wrapper").appendChild(lineAnimCanvas);

    return timeout(10);
  }).then(value => {
    // 为dom添加事件
    void function addEvent(){
      // 如果不用page直接使用href，则需要使用相对路径如'./media'，但这样的话，从新闻详情页返回时，将会出现如下错乱
      // /dist/media/article/3  => /dist/media/article/media
      // 因此需要使用根路径，如/dist/media，这样无论从哪儿回来都会正确，但是直接在a标签的href上写根路径无法生效，media会被视作params {0: media}
      // 因此只能拦截a的点击事件，用page代理:
      document.querySelectorAll(".menu-ul li a").forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          page(base + e.currentTarget.getAttribute("href").trim());
        })
      })

      document.querySelector(".menu-switch-mobile").addEventListener('click', e => {
        let menubox = $$(".c-menubox");
        if (menubox.classList.contains("nav-show-mobile")) {
          menubox.classList.remove("nav-show-mobile");
        } else {
          menubox.classList.add("nav-show-mobile");
        }
      })
      document.querySelectorAll(".text-current").forEach(a => {
        a.addEventListener("click", e => {
          let menubox = document.querySelector(".c-menubox");
          menubox.classList.remove("nav-show-mobile");
        })
      })
      document.querySelector(".menu-logo").addEventListener("click", e => {
        e.preventDefault();
        document.querySelector("html").classList.remove("open-news");
        page(base +  e.currentTarget.getAttribute("href").trim());
        AllSwipers.mainSwiper.slideTo(0);
      })
    }();

    // 添加文字transition-delay
    void function addTransitionDelay(){
      document.querySelectorAll(".p5-box").forEach(titBox => {
        let paragraph = titBox.querySelector("p");
        paragraph.innerHTML = Array.from(paragraph.innerText.replace(/<br *?\/>/g, "\n")).map((char, i) => {
          return char === "\n" ? "<br>" : `<span style="transition-delay:${i / 20}s">${char}</span>`
        }).join("");
      })
    }();

    // 应用案例栏目的圆圈动画
    void function solarsysSVG() {
      //var path = anime.path('.solar-10');
      let svgObj = {
        deg1: 0,
        deg2: 0
      };
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
          warnicon.setAttribute("opacity", parseInt(svgObj.deg1 / 20) % 2 === 0 ? 1 : .6)
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
      console.log('卫星旋转SVG start playing');
    }();
    
    return timeout(8000);
  })

  function resize() {
    document.querySelector("p.scale").innerText = `${window.innerWidth}*${window.innerHeight}__`
  }
  resize();
  window.addEventListener("resize", resize);
})()