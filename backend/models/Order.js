var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderDate: Date,
  created: Date
});

mongoose.model('Order', OrderSchema);
