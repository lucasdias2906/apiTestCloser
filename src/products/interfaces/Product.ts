import { Document } from 'mongoose';

export class Product extends Document {
  price: number;
  quantity: number;
}
