import { ProductService } from './product.service';
import ProductSqlService from './productSql.service';
import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { Product } from './interfaces/Product';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private readonly productSqlService: ProductSqlService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Product[]> {
    const products = this.productService.getAll();
    console.log(products);
    return products;
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product> {
    return this.productService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() product: Product): Promise<Product> {
    const created = await this.productService.create(product);
    const creeatedTambem = await this.productSqlService.productRepository.create(
      product,
    );

    console.log('EEEE', creeatedTambem);
    return created;
  }
}
