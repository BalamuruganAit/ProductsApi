import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

// const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const authRoutes = require('./Routes/UserRoutes');
const productRoutes = require('./routes/productRoutes');
dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB Connected')).catch((err: any) => console.log(err));
app.use('/api/auth', authRoutes);
app.use('/api/auth', productRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));