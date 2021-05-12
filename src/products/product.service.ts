import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/Product';
import { InjectModel } from '@nestjs/mongoose';
import ProductSqlService from '../products/productSql.service';

import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('products') private readonly productModel: Model<Product>,
    private readonly productSqlService: ProductSqlService,
  ) {}

  async getAll() {
    const product = await this.productModel.find().exec();
    console.log(product);
    return product;
  }

  async getById(id: number) {
    const product = await this.productModel.findById(id).exec();
    console.log(product);
    return product;
  }

  async create(product: Product) {
    const createdProduct = new this.productModel(product);
    const save = await createdProduct.save();
    const { price, _id, quantity } = createdProduct;
    console.log('IDDD', _id);
    const values = {
      id: `${_id}`,
      price: price,
      quantity: quantity,
    };
    const saveTotal = await this.productSqlService.productRepository.save(
      values,
    );

    console.log('Save', saveTotal);

    return save;
  }

  async deleteById(id: string) {
    const products = await this.productModel.findByIdAndDelete(id).exec();

    const deleteProduct = await this.productSqlService.productRepository.delete(
      id,
    );

    console.log(deleteProduct);

    return products;
  }
}
