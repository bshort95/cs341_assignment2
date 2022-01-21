const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminController = require('../controllers/admin')
const router = express.Router();



// /admin/add-product => GET
router.get('/add-product', adminController.getaddstuff);

router.get('/adfront',adminController.adfront);

// /admin/add-product => POST
router.post('/add-product', adminController.postaddstuff);

router.post('/edit-product', adminController.posteditstuff);

router.get('/edit-product/:stuffId',adminController.geteditstuff);

router.post('/delete-product',adminController.postdeletestuff);


module.exports = router;