import { Injectable, Body, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Product from '../db/models/product.entity';

@Injectable()
class ProductSqlService {
  public constructor(
    @InjectRepository(Product)
    public readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async findOneProduct(@Param('productId') id: number): Promise<Product> {
    const products = await this.productRepository.findOne(id);
    return products;
  }

  async create(@Body() product: Product): Promise<Product> {
    const products = await this.productRepository.create(product);

    const saveproductsProduct = await this.productRepository.save(products);
    console.log(saveproductsProduct);
    return saveproductsProduct;
  }

  async deleteProductById(@Param('productId') id: number) {
    const products = await this.findOneProduct(id);

    const deleted = await this.productRepository.delete(products);

    if (deleted) {
      return true;
    }

    return false;
  }
}

export default ProductSqlService;
