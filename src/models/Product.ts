import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  stock: number;
  tags: string[];
  rating?: number;
  reviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [{ type: String, required: true }],
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  tags: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
