
|----src/				项目源文件文件夹
|       |---- css/			css文件夹
|       |       |---- loading.css		加载loading动画           
|       |---- fonts/			字体文件包
|       |---- fonts-sim/			压缩提取后的字体文件包
|       |---- images/			图片文件夹
|       |---- js/			javascript项目源文件
|       |       |---- bgcanvas.js		背景线图动画
|       |       |---- events.js		处理产品与服务部分的事件
|       |       |---- index.js		js 根文件
|       |       |---- router.js		路由
|       |       |---- solarsys.js		卫星动画
|       |       |---- swiper.config.js		swiper配置
|       |       |---- utils.js		工具函数
|       |---- lib/			js库
|       |---- mock/			测试数据
|       |---- scss/			scss样式文件夹
|       |       |---- animation.scss		animation动画预设
|       |       |---- bootstrap.custom.scss	bootstrap自定义
|       |       |---- main.scss		项目样式主文件
|       |       |---- scroll.scss		滚动条样式
|       |---- templates/
|       |       |---- index_cn.pug		中文版页面模板文件
|       |       |---- index_en.pug		英文版页面模板文件
|
|-- ref/				参考文件及过程源文件
|-- dist/				项目已编译文件夹，内为正式网站文件
|       |---- cn/			中文主页html（放服务器时去拿出文件夹到外层，下同）
|       |---- en/			英文主页html
|       |---- css/			css样式
|       |---- fonts/			字体
|       |---- images/			图片
|       |---- js/			JavaScript
|       |----news_img/			新闻测试内容
|       |----favicon.ico			网站浏览器标签图标
|
|-- babel.config.js			babel配置
|-- index.js				搭建简易测试服务器
|-- package.json			项目配置
|-- webpack.config.js			webpack配置