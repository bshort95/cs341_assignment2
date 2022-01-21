
const { redirect } = require('express/lib/response');
const Stuf = require('../models/stuf')



exports.getaddstuff = (req, res, next) => {
    res.render('admin/edit-product',
    {ptitle: 'add product',
    path:'/admin/add-product',
    formsCSS: true,
    stuffCSS: true,
    activeAddStuff: true,
    edit: false
  });
  };




exports.postaddstuff = (req, res, next) => {
    const title = req.body.title
    const url = req.body.url
    const desc = req.body.desc
    const price = req.body.price
   const stuf = new Stuf(null,title, url, desc, price);
   stuf.save();
    res.redirect('/');
  }


  exports.geteditstuff = (req, res, next) => {
      const editMode = req.query.edit;
      if(!editMode){
          return res.redirect('/');
      }
      console.log(editMode);
      const stuffId = req.params.stuffId;
      Stuf.findStuff(stuffId, stuff =>{
        if(!stuff){
            return redirect('/');
        }
        res.render('admin/edit-product',
        {ptitle: 'add product',
        path:'/admin/edit-product',
        edit: editMode,
        stuff: stuff
      });
      })
  };

  exports.posteditstuff = (req, res, next) => {
    const prodId = req.body.stuffId;
    const up_title = req.body.title;
    const up_url = req.body.url;
    const up_price = req.body.price;
    const up_desc = req.body.desc;
    const up_stuf = new Stuf(prodId, up_title, up_url, up_desc, up_price)

    up_stuf.save();
    res.redirect('/admin/adfront')
};


exports.postdeletestuff = (req, res, next) => {
    const stuffId = req.body.stuffId;
    Stuf.delete(stuffId);
    res.redirect('/admin/adfront')
    
};

  exports.adfront= (req, res, next) => {
    Stuf.fetchAll(stuff =>{
        res.render('admin/adfront',{
            stf : stuff,
            ptitle: 'admin product',
            path: '/admin/adfront',
        });
    });
  }