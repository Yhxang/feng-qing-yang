import Mock, {
  Random
} from "mockjs";
import urls from "./urls";
// let config=require('../../webpack.config')
// console.log(webpack)
const mode = process.env.NODE_ENV;

console.log('loaded mockjs');
let params = Mock.mock({
  'newsListData|3': [{
    'date': '@date',
    'title': '风氢扬科技CHIGMA 120系统正式亮相FCVC2020', //'@ctitle',
    'imgsrc': Random.image('641x427'),
    'description': "9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开，风氢扬科技携最新大功率燃料电池系统-CHIGMA 120系统参展。CHIGMA 120系统一亮相，便吸引众多参会代表前来围观交流，.....",
    'url': '/news/01'
  }]
})

Mock.setup({
  timeout: '200-600'
})
//console.log(params.newsListData)

// 暂时假数据
params.newsListData = [
  {
    'date': '2020-9-15',
    'title': '风氢扬科技CHIGMA 120系统正式亮相FCVC2020',
    'imgsrc': './news_img/p6_news_1.jpg',
    'description': "9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开，风氢扬科技携最新大功率燃料电池系统.....",
    'url': './media/article/01'
  },{
    'date': '2020-11-28',
    'title': '风动鹏城，氢扬湾区-风氢扬科技“论剑”高工氢电年会',
    'imgsrc': './news_img/p6_news_2.jpg',
    'description': "以“氢色十城关不住 千辆氢车竞争先”为主题的2020高工氢电年会在深圳盛大举办。11月27日上午，在以“系统强大与国产猛进”为主题的氢燃料电池系统专场上......",
    'url': './media/article/02'
  },{
    'date': '2020-4-23',
    'title': '风氢扬燃料电池物流车整装待发',
    'imgsrc': './news_img/p6_news_3.jpg',
    'description': "由风氢扬科技自主设计开发的65kW燃料电池系统近日进行示范展示。4月23日，浙江省委常委黄建发和金华市市长尹学群等领导在金华指导工作，现场参观燃料电池物流车，与现场人员一起探讨燃料电池工作原理、燃料电池车辆运营优势。",
    'url': './media/article/03'
  }
]

params.articleData = {
  "pageTitle": "风氢扬科技CHIGMA 120系统正式亮相FCVC2020",
  "publishDate": "2020-9-15",
  "pageBody": `<p>9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开，风氢扬科技携最新大功率燃料电池系统-CHIGMA 120系统参展。CHIGMA 120系统一亮相，便吸引众多参会代表前来围观交流，成为整个展馆炙手可热的展品之一。</p><p>CHIGMA 120系统，是风氢扬科技针对中国重卡车型长时间运行、高负载率及工况恶劣等运营工况开发而成的大功率燃料电池系统；CHIGMA120系统通过整车控制策略、系统集成、核心零部件三大核心领域的技术提升，从而拥有更长寿命、更高集成度和更高可靠性，满足重卡车辆持续高速工况的需求，同时还将实现全生命周期的成本降低。</p><img src="${mode=="development" ? "/dist/" : "/"}news_img/news_proxy.png"><p>FCVC2020正在如火如荼的进行中，我们期待更多的新老朋友莅临B109风氢扬展台，与我们互动交流、沟通合作，共话中国氢能美好明天！</p>`
}


Mock.mock(urls.newsListData.url, urls.newsListData.type, params.newsListData);

Mock.mock(new RegExp(urls.newsArticleData.url + "\\d+"), urls.newsArticleData.type, params.articleData);