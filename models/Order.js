const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  customer: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
  },
  shipping: {
    company: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    }
  },
  deliveryAddress: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  products: [{
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  }],
  paymentInfo: {
    businessName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    total: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: String,
      required: true
    }
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
