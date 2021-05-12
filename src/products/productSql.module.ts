import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductSQLService from './productSql.service';
import ProductSQL from '../db/models/product.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ProductSQL])],
  providers: [ProductSQLService],
  exports: [ProductSQLService],
})
class ProductSqlModule {}

export default ProductSqlModule;
