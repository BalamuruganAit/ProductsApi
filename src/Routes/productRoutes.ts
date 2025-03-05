import express from "express";
import { 
  createProductWithMultipleImages,
  getAllProducts,  
  getProductByStock, 
  getProductByDate, 
  updateProductById, getProductByName,
  deleteProductById, getProductById,
  uploadSingle, uploadMultiple,} from "../Controller/productController";
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/product", uploadMultiple, createProductWithMultipleImages);
router.get("/getAllProduct", getAllProducts);
router.post('/getProductByName',getProductByName)
router.get("/getProductByStock/:stock", getProductByStock);
router.post("/getProductByDate", getProductByDate);
router.get("/getProductById/:id", getProductById);
router.put("/updateProduct/:id",  updateProductById);
router.delete("/deleteProduct/:id",  deleteProductById);

export default router;
