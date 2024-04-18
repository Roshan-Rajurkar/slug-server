const Product = require("../../models/Product");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRETE,
});

const getAllProducts = async (_, res) => {
    try {
        const availableProducts = await Product.find();
        res.status(200).json({
            status: true,
            data: availableProducts,
            message: "Products fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Fetch the product from the database by its ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({
        status: 'success',
        data: product
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

const addProduct = async (req, res) => {
    // const uploaded_image = await cloudinary.uploader.upload(req.file.path);

    try {
        const {
            name,
            description,
            price,
            isPublished
        } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            isPublished,
            // file: uploaded_image?.secure_url
        });

        const savedProduct = await newProduct.save();

        res.status(200).json({
            status: 'success',
            data: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to add product',
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const {
            name,
            description,
            price,
            isPublished,
            
        } = req.body;

        let updatedProduct;

        if (req.file) {
            const uploaded_image = await cloudinary.uploader.upload(req.file.path);
            updatedProduct = await Product.findByIdAndUpdate(productId, {
                name,
                description,
                price,
                isPublished,
                file: uploaded_image?.secure_url
            }, { new: true });
        } else {
            updatedProduct = await Product.findByIdAndUpdate(productId, {
                name,
                description,
                price,
                isPublished
            }, { new: true });
        }

        if (!updatedProduct) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update product',
            error: error.message
        });
    }
};


const deleteProduct = async(req,res)  => {
  
  try {
    const product_id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(product_id, {new : true});

      res.status(200).json({
        status: 'success',
        data: deletedProduct
    });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to update product',
        error: error.message
    });
  }
}

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct, getProductById };
