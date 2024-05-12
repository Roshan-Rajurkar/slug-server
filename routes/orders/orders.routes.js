const express = require("express");
const { getOrders, updateOrderStatusById, getOrderById } = require("../../controllers/orders/orders.controllers");
const router = express.Router();

router.get("/orders", getOrders);

router.get("/orders/:id", getOrderById);

router.put("/orders/status/:orderId", updateOrderStatusById);

module.exports = router;
