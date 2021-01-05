import Mock, {
  Random
} from "mockjs";
import urls from "./urls";
// let config=require('../../webpack.config')
// console.log(webpack)
const mode = process.env.NODE_ENV;
const basePath = mode === "development" ? "dist" : "";

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
// params.newsListData = [
//   {
//     "newsId":"3",
//     "title":"风氢扬科技CHIGMA 120系统正式亮相FCVC2020",
//     "imgsrc":"\/uploadfile\/image\/20210102\/3bc926881.jpg",
//     "description":"9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃...",
//     "date":"1970-01-01"
//   },{
//     "newsId":"1",
//     "title":"风动鹏城，氢扬湾区-风氢扬科技“论剑”高工氢电年会",
//     "imgsrc":"\/uploadfile\/image\/20210102\/68fb07acb.jpg",
//     "description":"以“氢色十城关不住 千辆氢车竞争先”为主题的2020高工氢电年会在深圳盛大举办。11月27日上午，在以“系统强大与国产猛进”为主题的氢燃料电池系统专场上......",
//     "date":"2800-01-03"
//   },{
//     "newsId":"2",
//     "title":"风氢扬燃料电池物流车整装待发",
//     "imgsrc":"\/uploadfile\/image\/20210102\/c374c01ab.jpg",
//     "description":"由风氢扬科技自主设计开发的65kW燃料电池系统近日进行示范展示。4月23日，浙江省委常委黄建发和金华市市长尹学群等领导在金华指导工作，现场参观燃料电池物流车，与现场人员一起探讨燃料...",
//     "date":"1970-01-01"
//   }];
params.newsListData = [
  {
    'date': '2020-11-28',
    'title': '风动鹏城，氢扬湾区-风氢扬科技“论剑”高工氢电年会',
    'imgsrc': './news_img/p6_news_2.jpg',
    'description': "以“氢色十城关不住 千辆氢车竞争先”为主题的2020高工氢电年会在深圳盛大举办。11月27日上午，在以“系统强大与国产猛进”为主题的氢燃料电池系统专场上......",
    'newsId': '02'
  }, {
    'date': '2020-9-15',
    'title': '风氢扬科技CHIGMA 120系统正式亮相FCVC2020',
    'imgsrc': './news_img/p6_news_1.jpg',
    'description': "9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开，风氢扬科技携最新大功率燃料电池系统.....",
    'newsId': '01'
  },{
    'date': '2020-4-23',
    'title': '风氢扬燃料电池物流车整装待发',
    'imgsrc': './news_img/p6_news_3.jpg',
    'description': "由风氢扬科技自主设计开发的65kW燃料电池系统近日进行示范展示。4月23日，浙江省委常委黄建发和金华市市长尹学群等领导在金华指导工作，现场参观燃料电池物流车，与现场人员一起探讨燃料电池工作原理、燃料电池车辆运营优势。",
    'newsId': '03'
  }
]

// params.articleData = {
//   "code":"1",
//   "newsId":"2",
//   "pageTitle":"风氢扬燃料电池物流车整装待发",
//   "imgsrc":"\/uploadfile\/image\/20210102\/c374c01ab.jpg",
//   "pageBody":`
// <p>\r\n\t
//     <span style=\"color:#222222;font-family:Consolas, Lucida Console , Courier New , monospace;white-space:pre-wrap;background-color:#FFFFFF;\">9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开，风氢扬科技携最新大功率燃料电池系统-CHIGMA 120系统参展。CHIGMA 120系统一亮相，便吸引众多参会代表前来围观交流，成为整个展馆炙手可热的展品之一。<\/span> \r\n<\/p>\r\n
//         <p>\r\n\t
//             <span style=\"color:#222222;font-family:Consolas, Lucida Console , Courier New , monospace;white-space:pre-wrap;background-color:#FFFFFF;\">
//                 <span style=\"color:#222222;font-family:Consolas, Lucida Console , Courier New , monospace;white-space:pre-wrap;background-color:#FFFFFF;\">CHIGMA 120系统，是风氢扬科技针对中国重卡车型长时间运行、高负载率及工况恶劣等运营工况开发而成的大功率燃料电池系统；CHIGMA120系统通过整车控制策略、系统集成、核心零部件三大核心领域的技术提升，从而拥有更长寿命、更高集成度和更高可靠性，满足重卡车辆持续高速工况的需求，同时还将实现全生命周期的成本降低。<\/span><\/span> \r\n<\/p>\r\n
//                     <p>\r\n\t
//                         <span style=\"color:#222222;font-family:Consolas, Lucida Console , Courier New , monospace;white-space:pre-wrap;background-color:#FFFFFF;\">
//                             <img src=\"\/uploadfile\/image\/20210102\/f149c51b1.png\" alt=\"\" \/><\/span> \r\n<\/p>\r\n
//                             <p>\r\n\t
//                                 <span style=\"color:#222222;font-family:Consolas, Lucida Console , Courier New , monospace;white-space:pre-wrap;background-color:#FFFFFF;\">
//                                     <br \/>\r\n<\/span> \r\n<\/p>\r\n
//                                     <p>\r\n\t
//                                         <span style=\"color:#222222;font-family:Consolas, Lucida Console , Courier New , monospace;white-space:pre-wrap;background-color:#FFFFFF;\">
//                                             <span style=\"color:#222222;font-family:Consolas, Lucida Console , Courier New , monospace;white-space:pre-wrap;background-color:#FFFFFF;\">FCVC2020正在如火如荼的进行中，我们期待更多的新老朋友莅临B109风氢扬展台，与我们互动交流、沟通合作，共话中国氢能美好明天！<\/span>
//                                                 <br \/>\r\n<\/span> \r\n<\/p>`,
//   "publishDate":"1970-01-01"
// }
let path = mode=="development" ? "/dist/" : "/";
params.articleData = [
  {
    "pageTitle": "风氢扬科技CHIGMA 120系统正式亮相FCVC2020",
    "publishDate": "2020-9-15",
    "pageBody": `<p>9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开，风氢扬科技携最新大功率燃料电池系统-CHIGMA 120系统参展。CHIGMA 120系统一亮相，便吸引众多参会代表前来围观交流，成为整个展馆炙手可热的展品之一。</p><p>CHIGMA 120系统，是风氢扬科技针对中国重卡车型长时间运行、高负载率及工况恶劣等运营工况开发而成的大功率燃料电池系统；CHIGMA120系统通过整车控制策略、系统集成、核心零部件三大核心领域的技术提升，从而拥有更长寿命、更高集成度和更高可靠性，满足重卡车辆持续高速工况的需求，同时还将实现全生命周期的成本降低。</p><img src="${path}news_img/news_proxy.png"><p>FCVC2020正在如火如荼的进行中，我们期待更多的新老朋友莅临B109风氢扬展台，与我们互动交流、沟通合作，共话中国氢能美好明天！</p>`
  },
  {
    "pageTitle": "风动鹏城，氢扬湾区-风氢扬科技“论剑”高工氢电年会",
    "publishDate": " 2020-11-28",
    "pageBody": `<p>11月25-27日，以“氢色十城关不住 千辆氢车竞争先”为主题的2020高工氢电年会在深圳盛大举办。</p>
    <p>11月27日上午，在以“系统强大与国产猛进”为主题的氢燃料电池系统专场上，风氢扬科技总经理刘军瑞发表题为“大功率燃料电池系统的工程实践“的主题演讲，简要分析了中国燃料燃电池发展的前景及痛点，详细阐述了风氢扬科技大功率系统开发的底层逻辑、技术积累及实践应用；风氢扬主要聚焦大功率燃料电池系统集成、长寿命技术开发及高可靠解决方案；通过控制策略、集成设计、电堆资源三位一体保障，保障公司竞争力持续领先；现阶段公司核心产品CHIGMA系列燃料电池系统涵盖65kW至 125kW的中、高功率产品系列。</p>
    <p>11月27日晚上，以“榜样的力量”为主题的2020高工金球奖颁奖典礼隆重召开。风氢扬科技凭借大功率燃料电池系统CHIGMA 120及快速的产品研发能力、完善的产品布局荣获“燃料电池系统2020年度好产品奖”及 “2020年度快速成长企业奖”。</p>
    <p style='text-align:center'>风氢扬科技总经理刘军瑞发表主题演讲</p>
    <img style="margin-bottom: 10px;" src="${path}news_img/news01_01.jpg">
    <img style="margin-bottom: 10px;" src="${path}news_img/news01_02.jpg">
    <p style='text-align:center'>风氢扬科技总经理刘军瑞参加圆桌会谈</p>
    <img style="margin-bottom: 10px;" src="${path}news_img/news01_03.jpg">
    <img style="margin-bottom: 10px;" src="${path}news_img/news01_04.jpg">
    <img style="margin-bottom: 10px;" src="${path}news_img/news01_05.jpg">
    <p style='text-align:center'>风氢扬科技荣获“2020年度快速成长企业奖”</p>
    <img style="margin-bottom: 10px;" src="${path}news_img/news01_06.jpg">
    `
  },
  
  {
    "pageTitle": "风氢扬燃料电池物流车整装待发",
    "publishDate": "2020-04-23",
    "pageBody": `
    <p>由风氢扬科技自主设计开发的65kW燃料电池系统近日进行示范展示。4月23日，浙江省委常委黄建发和金华市市长尹学群等领导在金华指导工作，现场参观燃料电池物流车，与现场人员一起探讨燃料电池工作原理、燃料电池车辆运营优势。</p>
    <img style="margin-bottom: 10px;" src="${path}news_img/news03_01.jpg">
    <img style="margin-bottom: 10px;" src="${path}news_img/news03_02.jpg">
    <img style="margin-bottom: 10px;" src="${path}news_img/news03_03.jpg">
    <p style='text-align:center'>尹市长和黄常委与技术人员探讨燃料电池产品优势及工作原理</p>`
  }
]


Mock.mock(urls.newsListData.url, urls.newsListData.type, options => { 
  let res = JSON.parse(options.body);
  let { act, lang, newsId } = res;

  if(act === "newslist"){
    console.log(`mockjs：return 新闻列表（版本：${lang}）`);
    return params.newsListData;
  }else if(act === "news"){
    console.log(`mockjs：return 新闻详情newsId（版本：${lang}）：  ${newsId}`);
    return params.articleData[~~newsId-1];
  }else{
    console.log("没有act参数!");
  }
  
});