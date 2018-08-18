var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    category: String,
    price: Number
});

mongoose.model('Product', ProductSchema);