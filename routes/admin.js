const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const stuff = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product',
  {ptitle: 'add product',
  path:'/admin/add-product',
  formsCSS: true,
  stuffCSS: true,
  activeAddStuff: true


}
  
  );
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  stuff.push({title: req.body.title});
  res.redirect('/');
});


exports.routes = router;
exports.stuff = stuff;