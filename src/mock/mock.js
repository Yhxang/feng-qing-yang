import Mock, { Random } from "mockjs";
import urls from "./urls";
console.log('load mockjs')
let params = Mock.mock({
    'newsListData|5': [{
        'date': '@date',
        'title': '风氢扬科技CHIGMA 120系统正式亮相FCVC2020',//'@ctitle',
        'imgsrc': Random.image('641x427'),
        'description': "9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开，风氢扬科技携最新大功率燃料电池系统-CHIGMA 120系统参展。CHIGMA 120系统一亮相，便吸引众多参会代表前来围观交流，.....",
        'url': '@url'
    }]
})

Mock.setup({
    timeout: '200-600'
})


Mock.mock(urls.newsListData.url, urls.newsListData.type, params.newsListData)
