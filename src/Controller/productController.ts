const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage }).single('image');

exports.createProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    try {
      const { name, price, stock } = req.body;
      const product = new Product({ name, price, stock, image: req.file.path });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductByName = async (req, res) => {
  const product = await Product.findOne({ name: req.params.name });
  res.json(product);
};

exports.getProductByStock = async (req, res) => {
  const products = await Product.find({ stock: req.params.stock });
  res.json(products);
};

exports.getProductByDate = async (req, res) => {
  const products = await Product.find({ createdAt: { $gte: new Date(req.params.date) } });
  res.json(products);
};

exports.updateProductById = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

exports.deleteProductById = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};