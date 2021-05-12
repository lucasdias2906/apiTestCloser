import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  price: Number,
  quantity: Number,
});
