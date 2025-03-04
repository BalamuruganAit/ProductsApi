import express from "express";
import { 
  createProduct, 
  createProductWithMultipleImages,
  getAllProducts,  
  getProductByStock, 
  getProductByDate, 
  updateProductById, 
  deleteProductById, 
  uploadSingle, uploadMultiple,} from "../Controller/productController";
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/product", uploadSingle, createProduct);
router.post("/product/multiple", uploadMultiple, createProductWithMultipleImages);
router.get("/getAllProduct", getAllProducts);
router.get("/getProductByStock/:stock", getProductByStock);
router.get("/getProductByDate/:date", getProductByDate);
router.put("/updateProduct:id", protect, updateProductById);
router.delete("/deleteProduct:id", protect, deleteProductById);

export default router;
