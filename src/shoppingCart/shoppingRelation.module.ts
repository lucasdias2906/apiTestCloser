import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ShoppingRelationService from './shoppingRelation.service';
import ShoppingRelation from '../db/models/shoppingRelation';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ShoppingRelation])],
  providers: [ShoppingRelationService],
  exports: [ShoppingRelationService],
})
class ShoppingCartModule {}

export default ShoppingCartModule;
