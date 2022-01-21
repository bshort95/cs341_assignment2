const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json');

module.exports = class Cart {

    static addStuff(id, stfPrice){

    fs.readFile(p, (err, fileContents) =>{
        let cart = {stuff: [] , tPrice: 0};
        if(!err){
            cart = JSON.parse(fileContents);
        }
        
        const exist_stuffIn = cart.stuff.findIndex(stuf => stuf.id === id);
        
        const exist_stuff = cart.stuff[exist_stuffIn];
        let up_stuff;
        if(exist_stuff)
        {
            up_stuff = {... exist_stuff};
            up_stuff.qty = up_stuff.qty + 1;
            cart.stuff = [...cart.stuff]
            cart.stuff[exist_stuffIn] = up_stuff;
        }else{
        up_stuff = {id: id, qty: 1}
        cart.stuff = [...cart.stuff, up_stuff]    
    }
        cart.tPrice = cart.tPrice + stfPrice;
        
        fs.writeFile(p, JSON.stringify(cart), (err) =>{
            console.log(err);
        })
    })

    }

    static deletestuff(id, price){
        fs.readFile(p, (err, fileContent) =>{
            if(err){
                return;
            }
            const up_cart = {...JSON.parse(fileContent)};
            const stuff = up_cart.stuff.find(stf => stf.id === id);
            if(!stuff){
                return;
            }

            const stuffqty = stuff.qty;
            up_cart.stuff = up_cart.stuff.filter(stf => stf.id !== id)
            up_cart.tPrice = up_cart.tPrice - (price * stuffqty)

            fs.writeFile(p, JSON.stringify(up_cart), (err) =>{
                console.log(err);
            })

        })


    }

    static getCart(cb){
        fs.readFile(p, (err, fileContent) =>{
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }
            else{
            cb(cart);
        }
        });
    
    
    }

}