const path = require('path');
const express = require("express");
const app = express();
const axios = require("axios")
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware');
const Qs = require('qs');
var request = require('request');
var cors = require('cors');

let { mode } = require('minimist')(process.argv.slice(2));
if (!mode) {
    mode = "production";
}

const base = express.Router();
const baseEn = express.Router();
const dist = "dist";
const basePath = mode === "development" ? dist : "";

const pages = ["home", "G-POWER", "products-service", "applications", "media", "partner", "footer"]


app.use(`/${basePath}`, base);
app.use(`/${basePath}/en`, baseEn);
app.use("/favicon.ico", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, 'favicon.ico'));
})

base.use("/", express.static(path.resolve(__dirname, dist)));

// base.use("/api.php", (req, res) => {
//     res.status(200).send("visit api.php")
// })
// let apiProxy  = createProxyMiddleware({
//     target: 'http://g-powertech.com.cn', 
//     changeOrigin: true,
//     onProxyReq: function(proxyReq, req, res){
//         console.dir(req)
//     },
//     onOpen: function(proxySocket){
//         console.log('socket')
//     },
//     onError:function(err){
//         console.log('err')
//     }
// })
// base.use('/api.php', apiProxy);

// const instance = axios.create({
//     baseURL: 'http://g-powertech.com.cn/',
//     timeout: 1000,
//     ransformRequest: [function (data) { // 转换数据
//         data = Qs.stringify(data); // 通过Qs.stringify转换为表单查询参数
//         return data;
//     }],
//     headers: {
//         'Content-Type':'application/x-www-form-urlencoded'
//     }
// });
// instance.post("/api.php",{lang: "cn", act: "newslist"}).then(res => {
//     console.log(res)
// })

// axios.post("http://g-powertech.com.cn/api.php",{act: "newslist"}).then(res => {
//     console.log(res)
// })
//base.use('/api.php', createProxyMiddleware('http://g-powertech.com.cn'));

base.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, "cn" , 'index.html'));
})

pages.forEach(page=> {
    base.get(`/${page}`, function (req, res) {
        res.sendFile(path.resolve(__dirname, dist, "cn" , 'index.html'));
    })
})
base.get("/media/article/:page", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, "en" , 'index.html'));
})

// http://127.0.0.1:3000/dist/media/article/01
baseEn.use("/", express.static(path.resolve(__dirname, dist)));
baseEn.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, "en" , 'index.html'));
})
pages.forEach(page=> {
    baseEn.get(`/${page}`, function (req, res) {
        res.sendFile(path.resolve(__dirname, dist, "en" , 'index.html'));
    })
})
baseEn.get("/media/article/:page", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, "en" , 'index.html'));
})

// //本地服务器解决跨域，不可缺
// app.all('/api.php', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
//   });
let gUrl = "http://g-powertech.com.cn"
base.options('/api.php', cors(), function (req, res) {
    this.setResHeader(res);
      var redirectURL = gUrl + req.path;
      res.send(redirectURL);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//get接口访问，访问自己这个服务器接口
function setResHeader(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,RequestID,X-Content-Type-Options,X-Content-Type-Options,X-Frame-Options,X-Powered-By,X-Version,x-xss-protection,Strict-Transport-Security') // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If neede
}
base.get("/api.php",jsonParser,function(req ,res){
    //console.dir(req.body)
    //服务器获取数据，将不会产生跨域问题
    // axios.post("http://g-powertech.com.cn/api.php", {lang: "zh-CN", act: "newslist"})//req.body)
    // .then((response) => {
    //     //以json格式将服务器获取到的数据返回给前端。
    //     console.dir(response)
    //     res.json(response.data);
    // })
    setResHeader(res)
    var redirectURL = gUrl + req.path;
    delete req.headers.host;
    request.get({ 
        url: redirectURL, 
        //headers: req.headers, 
        body: JSON.stringify(req.body) 
    }, function (error, response, body) {
        console.log(req.headers, JSON.stringify(req.body) )
        console.dir(response)
        if (response) {
          if (response.statusCode !== 200 && response.statusCode !== 201) {
            res.status(response.statusCode).send(response.body ? response.body : '');
          } else {
            res.send(response.body);
          }
        }
        else {
          //next(createError(404));
        }
      })
    // request("http://www.g-powertech.com.cn/api.php?act=newslist", function (error, response, body) {
    //     console.error('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    // })
})

// http://192.168.123.1:3000/dist/api.php
//app.use('api.php', apiProxy);


//base.use('api.php', apiProxy);
// base.use('/api.php', apiProxy);



const ports = 3000;
app.listen(ports, function () {
    console.log('\x1B[36m%s\x1B[0m', `Express app listening on port ${ports}!
Local http://127.0.0.1:${ports}/${basePath}
Com   http://192.168.123.1:${ports}/${basePath}
Home  http://172.40.11.193:${ports}/${basePath}`);
})