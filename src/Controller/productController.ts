import { Request, Response } from "express";
import Product from "../Models/productModel";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage });


export const createProductWithMultipleImages = async (req: Request, res: Response) => {
  try {
    const { productName, productStock } = req.body;
    const productImages = req.files ? (req.files as Express.Multer.File[]).map(file => file.filename) : [];

    const product = new Product({ productName, productStock, productImage: productImages });
    await product.save();

    res.status(200).json({ message: "Product created successfully", newProduct: product });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// export const createProductWithMultipleImages = async (req: Request, res: Response) => {
//   try {
//     const { productName, productStock } = req.body;
//     const productImages = req.files ? (req.files as Express.Multer.File[]).map(file => file.filename) : [];

//     if (!productImages.length) {
//       return res.status(400).json({ message: "No images uploaded" });
//     }

//     const product = new Product({ productName, productStock, productImage: productImages });
//     await product.save();
//     res.status(200).json({ message: "created successfully", newproduct: product })
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong", error });
//   }
// };

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    const formattedProducts = products.map((product: any) => ({
      id: product._id,
      productName: product.productName,
      productStock: product.productStock,
      productImage: product.productImage,
    }));

    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}

export const getProductByName = async (req: Request, res: Response) => {
  try {
    const { productName } = req.body; 

    if (!productName) {
      res.status(400).json({ message: "Product name is required" });
      return;
    }

    const filterProduct = await Product.find({
      productName: { $regex: productName, $options: "i" } 
    });

    if (!filterProduct.length) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(filterProduct);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const getProductByStock = async (req: Request, res: Response) => {
  try {
    const { stock } = req.params;
    const productStock = parseInt(stock, 10);

    if (isNaN(productStock)) {
      res.status(400).json({ message: "Invalid stock value" });
      return;
    }

    const filterProduct = await Product.find({ productStock });

    if (!filterProduct.length) {
      res.status(404).json({ message: "No products found with the given stock" });
      return;
    }

    res.status(200).json(filterProduct);
  } catch (error) {
    console.error("Error fetching product by stock:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getProductByDate = async (req: Request, res: Response): Promise<void> => {
  try {
      const { date } = req.body; 

      if (!date) {
          res.status(400).json({ message: "Date is required" });
          return;
      }

      const productCreatedDate = new Date(date);

      if (isNaN(productCreatedDate.getTime())) {
          res.status(400).json({ message: "Invalid date format" });
          return;
      }

      const nextDay = new Date(productCreatedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const filterProduct = await Product.find({
          productCreatedDate: { $gte: productCreatedDate, $lt: nextDay }
      });

      if (filterProduct.length === 0) {
          res.status(404).json({ message: "No products found for the given date" });
          return;
      }

      res.status(200).json(filterProduct);
  } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
  }
};


export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { productName, productStock } = req.body;
    const productImages = req.files ? (req.files as Express.Multer.File[]).map(file => file.filename) : [];

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, productStock, ...(productImages.length > 0 && { productImage: productImages }) },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};



export const uploadSingle = multer({ storage, fileFilter }).single("productImage")
export const uploadMultiple = upload.array("productImage", 5);
export { upload };
