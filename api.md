# 风氢扬项目后台接口
## 一、新闻栏目

### 1. 新闻列表接口 
* url： `api/newslist`  
* 返回：`<Object[]>`  

返回一个由新闻列表参数object组成的列表。 

每个新闻列表参数Ojbect包括以下参数：  
|参数字段|说明|格式|举例|
|--|--|--|--|
|date|发布日期|`yyyy-MM-dd HH:mm:ss`|2020-09-15 11:11:11|
|title|列表标题|string|风氢扬科技CHIGMA 120系统正式亮相FCVC2020|
|imgsrc|新闻列表缩略图url|string|news_img/img_1.jpg|
|description|新闻列表简述|string(100)|9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开，风氢扬科技携最新大功率燃料电池系统-CHIGMA 120系统参展。|
|url|新闻列表跳转链接，格式为`/news/:page`，page为该新闻的编号，到时访问 host.com/news/first_News_Id即可访问新闻详情页|string|/news/first_News_Id|
  
  
### 2. 新闻详情页接口
* url： `/api/news/:page`  

`:page`为该新闻条目的编号Id，也是列表链接中的编号  

* 返回: `<Object>`

包含新闻详情页的内容参数：
|参数字段|说明|格式|举例|
|--|--|--|--|
|pageTitle|新闻标题|string|风氢扬科技CHIGMA 120系统正式亮相FCVC2020|
|publishDate|发布时间|`yyyy-MM-dd HH:mm:ss`|2020-09-15 11:11:11|
|pageBody|文章正文html|string|`<p>9月14-16日，由中国汽车工程学会和国际氢能与燃料电池协会（筹）共同主办的“第五届国际氢能与燃料电池汽车大会”（FCVC 2020）在上海汽车会展中心隆重召开</p><img src="/news_img/news_proxy.png"><p>FCVC2020正在如火如荼的进行中</p>`|