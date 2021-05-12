import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ShoppingCartService from './shoppingCart.service';
import ShoppingCart from '../db/models/shoppingCart.entity';
import { ShoppingCartController } from './shoppingCart.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService],
})
class ShoppingCartModule {}

export default ShoppingCartModule;
