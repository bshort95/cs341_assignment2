const path = require('path');
const PORT = process.env.PORT || 5000
const cors = require('cors') // Place this with other requires (like 'path' and 'express')
const MONGODB_URL = process.env.MONGODB_URL ||'mongodb+srv://brudder123:7SXs3xESZxm6qHWQ@cluster0.by4op.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
                        


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/',errorController.get404);




const corsOptions = {
  origin: "https://shop-webdev2.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  family: 4
};





mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(PORT);
})
.catch(err => {
  console.log(err);
});




