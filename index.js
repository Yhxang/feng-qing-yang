const path = require('path');
const express = require("express");
const app = express();

let { mode } = require('minimist')(process.argv.slice(2));
if (!mode) {
    mode = "production";
}

const base = express.Router();
const baseEn = express.Router();
const dist = "dist";
const basePath = mode === "development" ? dist : "";

const pages = ["home", "G-POWER", "products-service", "applications", "media"]

app.use(`/${basePath}`, base);
app.use(`/${basePath}/en`, baseEn);
app.use("/favicon.ico", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, 'favicon.ico'));
})

base.use("/", express.static(path.resolve(__dirname, dist)));
base.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, "cn" , 'index.html'));
})

pages.forEach(page=> {
    base.get(`/${page}`, function (req, res) {
        res.sendFile(path.resolve(__dirname, dist, "cn" , 'index.html'));
    })
})

baseEn.use("/", express.static(path.resolve(__dirname, dist)));
baseEn.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, "en" , 'index.html'));
})
pages.forEach(page=> {
    baseEn.get(`/${page}`, function (req, res) {
        res.sendFile(path.resolve(__dirname, dist, "en" , 'index.html'));
    })
})


const ports = 3000;
app.listen(ports, function () {
    console.log('\x1B[36m%s\x1B[0m', `Express app listening on port ${ports}!\n http://127.0.0.1:3000/${basePath}`);
})