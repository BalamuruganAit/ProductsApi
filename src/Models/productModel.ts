import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    productName: string;
    productStock: number;
    productCreatedDate: Date;  
    productImage: string[];
}

const ProductSchema: Schema = new Schema({
    productName: { type: String, required: true },
    productStock: { type: Number, required: true },
    productCreatedDate: { type: Date, required: true, default: Date.now },  
    productImage: [{ type: String, required: true }]
});

export default mongoose.model<IProduct>("Product", ProductSchema);
