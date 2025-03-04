import express from "express";
import mongoose from "mongoose";
import authRoutes from "./src/Routes/UserRoutes"; 
import productRoutes from "./src/Routes/productRoutes";

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb://localhost:27017/ProductApi";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = 5000; 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
