const path = require('path');
const express = require("express");
const app = express();

let { mode } = require('minimist')(process.argv.slice(2));
if (!mode) {
    mode = "production";
}

const base = express.Router();
const dist = "dist";
const basePath = mode === "development" ? dist : "";

app.use(`/${basePath}`, base);

base.use("/", express.static(path.resolve(__dirname, dist)));

base.use("/favicon.ico", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, 'favicon.ico'));
})
base.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, dist, 'index.html'));
})

app.listen(3000, function () {
    console.log('Express app listening on port 3000!');
})