import express from "express";
import mongoose from "mongoose";
import authRoutes from "./src/Routes/UserRoutes"; 
import productRoutes from "./src/Routes/productRoutes";
import mailRoutes from "./src/Routes/mailRouters";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
  next();
});
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
app.use("/api", mailRoutes);


export default app;
