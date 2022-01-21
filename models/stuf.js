const fs = require('fs');
const path = require('path');
const { cachedDataVersionTag } = require('v8');
const Cart = require('./cart')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'stuff.json');

const getStuffFromFile = cb =>{
    
      
      fs.readFile(p, (err, fileContent) => {
        if (err) {
          console.log( "error reading "+ err)
          return cb([]);
        }
        cb(JSON.parse(fileContent));
      });



}

module.exports = class Stuf {
  constructor(id, title, url, desc, price) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.desc= desc;
    this.price = price;

  }

  save() {
      
            getStuffFromFile(stuff => {
        if(this.id)
      {
       const ex_stuff = stuff.findIndex(stf => stf.id === this.id);  
       const up_stuff = [...stuff];
       up_stuff[ex_stuff] = this;
       fs.writeFile(p, JSON.stringify(up_stuff), err => {
        console.log(err);
      });
      }
      else{
      this.id = Math.random().toString();
  
        stuff.push(this);
        fs.writeFile(p, JSON.stringify(stuff), err => {
            console.log(err);
          });
      }});
    
    }

  static fetchAll(cb) {
    getStuffFromFile(cb);
  }

  static findStuff(id, cb) {
    getStuffFromFile(stuff => {

        const stu = stuff.find(p => p.id === id )
        cb(stu)
    })

  }

  static delete(id){
    getStuffFromFile(stuff => {
        const stuf = stuff.find(stuff => stuff.id === id)
        const up_stuff = stuff.filter(stf => stf.id !== id)
        fs.writeFile(p, JSON.stringify(up_stuff), err => {
            if(!err){
                Cart.deletestuff(id, stuf.price);
            }
          });
    })





  }
};
