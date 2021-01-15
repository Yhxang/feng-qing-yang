import page from 'page.js';
import axios from 'axios';
import urls from '../mock/urls';
import { param } from './utils';

const base = process.env.NODE_ENV === 'development' ? '/dist/' : '/';

export default class PageRouter {
  constructor(mainSwiper) {
    this.pages = [];
    this.mainSwiper = mainSwiper;
  }

  getPagesFromNav() {
    const mainSwiperSlideHistory = Array.from(this.mainSwiper.slides).map((slide) => slide.getAttribute('data-history').trim());
    console.log(mainSwiperSlideHistory);
    document.querySelectorAll('.menu-ul li a').forEach((a, idx) => {
      const navHref = a.getAttribute('href').slice(2).replace('&', '').trim();
      this.pages.push({
        navHref,
        navIndex: idx,
        slideTargetIdx: (() => {
          for (let i = 0; i < mainSwiperSlideHistory.length; i += 1) {
            if (navHref === mainSwiperSlideHistory[i]) {
              return i;
            }
          }
          return 0;
        })(),
      });
    });
  }

  // 配置路由
  configRule() {
    // 配置dev时的base
    page.base(base);
    // 配置根路径路由
    page('/', () => {
      console.log('index');
      document.querySelector('html').classList.remove('open-news');
    });
    // 配置导航路由
    this.pages.forEach((navPage, idx) => {
      // page(navPage.navHref, function (ctx) {
      //   console.log('11111', ctx)
      // })
      const $this = this;
      page(new RegExp(`(en\\/)?${navPage.navHref}\\/?$`), (ctx) => {
        console.log('page.js_router: ', navPage.navHref, ' index_in_pages:', idx);
        console.log('page.js_context:', ctx);

        $this.mainSwiper.slideTo(navPage.slideTargetIdx);

        document.querySelector('html').classList.remove('open-news');
      });
    });

    // 配置新闻详情路由
    // page(new RegExp('(en\\/)?' + 'media\\/article\\/\\'+ ':page'), showNews); ????正则获取page失败
    // http://127.0.0.1:3000/dist/media/article/01
    function showNews(ctx) {
      document.querySelector('html').classList.add('open-news');
      console.log('page context:showNews:: ', ctx);

      const $page = ctx.params.page; // ~~ctx.params.page;
      axios[urls.newsArticleData.type](`${base.replace(/\/$/, '')}${urls.newsArticleData.url}?${param({
        lang: document.querySelector('html').getAttribute('lang'),
        act: 'news',
        newsId: $page,
      })}`)
        .then((response) => {
          const newsData = response && response.data;
          document.querySelector('.news-page-title').innerHTML = newsData.pageTitle;
          document.querySelector('.publish-date').innerHTML = newsData.publishDate;
          document.querySelector('.news-page-body').innerHTML = newsData.pageBody;
          document.querySelector('html').scrollTo(0, 0);
          document.querySelector('html').classList.add('is-loaded');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    page('media/article/:page', showNews);
    page('en/media/article/:page', showNews);

    // 配置其它规则路由
    page('*', (ctx) => {
      console.log(ctx, 'Not Found');
    });

    page();
  }
}
