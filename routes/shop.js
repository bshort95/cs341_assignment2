const path = require('path');

const express = require('express');
const router = express.Router();
const frontController = require('../controllers/front')

router.get('/',frontController.getindex);
router.get('/stuff',frontController.getStuff);
router.get('/cart', frontController.getCart);
router.get('/checkout', frontController.getCheckout);
router.get('/orders',frontController.getOrders);
router.post('/cart', frontController.postCart);
router.post('/cart-delete-item',frontController.postCartDeleteStuff);

router.get('/stuff/:stuffId',frontController.getStuffs);

module.exports = router;
