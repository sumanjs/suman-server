import * as React from 'react';
import {Demo} from "../iso/demo";
const express = require("express");
const router = express.Router();
const ReactDOMServer = require('react-dom/server');

///////////////////////


router.get('/', function (req, res, next) {

  res.send(ReactDOMServer.renderToStaticMarkup(<Demo age={3} name="Curt"/>));

});

module.exports = router;
