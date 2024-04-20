const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select : false
  },
  profileImg: {
    type: String,
    default : 'https://foundersguide.com/wp-content/uploads/2022/01/Untitled-design-2022-01-26T113456.782.jpg'
  },
  blocked: {
    type: Boolean,
    default : false
  },
},{
    timestamps : true
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;