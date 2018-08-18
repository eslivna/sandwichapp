var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Product = mongoose.model('Product');
let Order = mongoose.model('Order');
let jwt = require('express-jwt');

let auth = jwt({ secret: process.env.BACKEND_SECRET });

router.get('/', function(req, res, next) {
  res.send('server works!');
});

//Get all products
router.get('/API/products/', function(req, res, next) {
  Product.find(function(err, products) {
    if (err) {
      return next(err);
    }
    res.json(products);
  });
});

//Add product
router.post('/API/products/', auth, function(req, res, next) {
  let product = new Product(req.body);
  product.save(function(err, prod) {
    if (err) {
      return next(err);
    }
    res.json(prod);
  });
});

router.param('product', function(req, res, next, id) {
  let query = Product.findById(id);
  query.exec(function(err, product) {
    if (err) {
      return next(err);
    }
    if (!product) {
      return next(new Error('not found ' + id));
    }
    req.product = product;
    return next();
  });
});

//Get product
router.get('/API/product/:product', auth, function(req, res, next) {
  res.json(req.product);
});

//Delete product
router.delete('/API/product/:product', auth, function(req, res) {
  req.product.remove(function(err) {
    if (err) {
      return next(err);
    }
    res.json(req.product);
  });
});

router.put('/API/product/:id', function(req, res) {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, product) => {
      if (err) return err;
      res.json(product);
    }
  );
});

router.get('/API/orders/', function(req, res, next) {
  Order.find(function(err, orders) {
    if (err) {
      return next(err);
    }
    res.json(orders);
  });
});

//Add order
router.post('/API/orders/', auth, function(req, res, next) {
  let order = new Order(req.body);
  order.save(function(err, rec) {
    if (err) {
      return next(err);
    }
    res.json(rec);
  });
});

router.get('/API/order/:user', function(req, res, next) {
  let query = Order.find({ user: req.params.user });
  query.exec(function(err, orders) {
    if (err) {
      return next(err);
    }
    res.json(orders);
  });
});

module.exports = router;
