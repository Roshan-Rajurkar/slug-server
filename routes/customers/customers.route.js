const express = require("express");
const { getAllCustomers, checkBlockCustomer } = require("../../controllers/customers/customers.controller");
const router = express.Router();

router.get("/get_all_customers", getAllCustomers);

router.put("/check-block/:id", checkBlockCustomer);
    
module.exports = router;
