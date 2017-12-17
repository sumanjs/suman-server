"use strict";
var React = require("react");
var demo_1 = require("../iso/demo");
var express = require("express");
var router = express.Router();
var ReactDOMServer = require('react-dom/server');
router.get('/', function (req, res, next) {
    res.send(ReactDOMServer.renderToStaticMarkup(React.createElement(demo_1.Demo, { age: 3, name: "Curt" })));
});
module.exports = router;
