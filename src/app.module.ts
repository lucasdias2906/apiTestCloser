import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as OrmOptions from './config/orm';

import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import ShoppingCartModule from './shoppingCart/shoppingCart.module';
import ShoppingRelationModule from './shoppingCart/shoppingRelation.module';

import ProductSqlModule from './products/productSql.module';
import { ProductModule } from './products/product.module';

import { AuthModule } from './auth/auth.module';

const conection = MongooseModule.forRoot(
  'mongodb+srv://testcloser:lucas@cluster0.vuyx3.mongodb.net/apiproducts?retryWrites=true&w=majority',
);

@Module({
  imports: [
    conection,
    ProductModule,
    AuthModule,
    TypeOrmModule.forRoot(OrmOptions),
    ShoppingCartModule,
    ProductSqlModule,
    ShoppingRelationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
