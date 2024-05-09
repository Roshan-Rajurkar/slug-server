const express = require("express");
const { getOrders, updateOrderStatusById } = require("../../controllers/orders/orders.controllers");
const router = express.Router();

router.get("/orders", getOrders);

router.put("/orders/status/:orderId", updateOrderStatusById);
    
module.exports = router;
