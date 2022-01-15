const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const adminData = require('./admin');


router.get('/', (req, res, next) => {
    const stuff = adminData.stuff
    res.render('shop',{
        stf : stuff,
        ptitle: 'add product',
        path: '/',
        hasStuff: stuff.length > 0,
        activeShop: true,
        productCSS: true

    });
});

module.exports = router;
