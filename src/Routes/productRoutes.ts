const express = require('express');
const { createProduct, getAllProducts, getProductByName, getProductByStock, getProductByDate, updateProductById, deleteProductById } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createProduct);
router.get('/', getAllProducts);
router.get('/name/:name', getProductByName);
router.get('/stock/:stock', getProductByStock);
router.get('/date/:date', getProductByDate);
router.put('/:id', protect, updateProductById);
router.delete('/:id', protect, deleteProductById);

module.exports = router;
