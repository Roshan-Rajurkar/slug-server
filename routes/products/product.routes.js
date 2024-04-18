const express = require("express");
const { verifyToken } = require("../../middlewares/verifyToken");
const { addProduct, getAllProducts, updateProduct, deleteProduct } = require("../../controllers/products/product.controller");
const upload = require("../../middlewares/fileUpload");
const router = express.Router();

router.get("/get_all_products", getAllProducts);

router.post("/add_product",upload.single('file'), addProduct);

router.put("/edit_product/:id",upload.single('file'), updateProduct);

router.delete("/delete_product/:id", deleteProduct);

module.exports = router;
