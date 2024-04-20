const express = require("express");
const { getAllCustomers } = require("../../controllers/customers/customers.controller");
const router = express.Router();

router.get("/get_all_customers", getAllCustomers);
    
module.exports = router;
