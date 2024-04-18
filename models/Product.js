const mongoose = require('mongoose');
const User = require('./User');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  file: {
    type: String,
    default : 'https://foundersguide.com/wp-content/uploads/2022/01/Untitled-design-2022-01-26T113456.782.jpg'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
},{
    timestamps : true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;