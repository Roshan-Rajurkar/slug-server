const Order = require('../../models/Order')

// get all orders from database
 const getOrders = async(req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            status : true, 
            data : orders
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update product',
            error: error.message
        });
    }
}

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'orderId is required.' });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({success : false,  error: 'Order not found.' });
    }

    return res.status(200).json({
      success : true, 
      data : order 
    });
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return res.status(500).json({success : false,  error: 'Internal server error.' });
  }
};

const updateOrderStatusById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { newStatus } = req.body;
    
        if (!orderId || !newStatus) {
          return res.status(400).json({ error: 'Both orderId and newStatus are required.' });
        }
    
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
    
        if (!updatedOrder) {
          return res.status(404).json({ error: 'Order not found.' });
        }
    
        return res.status(200).json(updatedOrder);
      } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ error: 'Internal server error.' });
      }
}


module.exports = { getOrders, updateOrderStatusById, getOrderById };