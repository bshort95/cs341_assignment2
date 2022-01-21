const Stuf = require('../models/stuf');
const Cart = require('../models/cart');


  exports.getStuff = (req, res, next) => {
    Stuf.fetchAll(stuff =>{
    res.render('shop/front',{
        stf : stuff,
        ptitle: 'add product',
        path: '/stuff',
    });
    });
}


exports.getindex = (req, res, next) => {
  Stuf.fetchAll(stuff =>{
    res.render('shop/index',{
        stf : stuff,
        ptitle: 'index',
        path: '/',
    });
    });
}

exports.getStuffs = (req, res, next) => {
  const stufId = req.params.stuffId;
  Stuf.findStuff(stufId, stuff =>{
    res.render('shop/detail',{
      stuff: stuff,
      ptitle: 'details',
      path: '/stuff',
      
  })
  })
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Stuf.fetchAll(stuff => {
      const cartStuff = [];
      for (stff of stuff) {
        const cartStuffData = cart.stuff.find(
          stf => stf.id === stff.id
        );
        if (cartStuffData) {
          cartStuff.push({ stuffData: stff, qty: cartStuffData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        ptitle: 'Your Cart',
        stuff: cartStuff
      });
    });
  });
};

exports.postCart= (req, res, next) => {
const stufId = req.body.stuffId;
  Stuf.findStuff(stufId, stuff =>{
    Cart.addStuff(stufId, stuff.price)

  } )
  res.redirect('/cart')
};


exports.postCartDeleteStuff= (req, res, next) => {
  const stuffId = req.body.stuffId;
  console.log(stuffId)
  Stuf.findStuff(stuffId, stuff => {
    Cart.deletestuff(stuffId, stuff.price);
    res.redirect('/cart');
  });
  
  };


  
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout',{
      ptitle: 'checkout',
      path: '/checkout',
      
  });
  }

  exports.getOrders = (req, res, next) => {
    res.render('shop/orders',{
        ptitle: 'orders',
        path: '/orders',
        
    });
    };
  