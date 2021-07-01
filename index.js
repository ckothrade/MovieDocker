const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Item = require('./models/item');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo', 
    {useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connect!!!'))
  .catch(err => console.log(err));



app.get('/', (req, res) => {
  Item.find()
  .then(items => res.render('index', { items }))
  .catch(err => res.status(404).json({ msg: 'No items found!'}));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server listening...'));


