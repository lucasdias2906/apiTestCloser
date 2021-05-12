import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Shopping_cart_products_product from '../db/models/shoppingRelation';

@Injectable()
class ShoppingCartServiceRelation {
  public constructor(
    @InjectRepository(Shopping_cart_products_product)
    public readonly shoppingRelationRepository: Repository<Shopping_cart_products_product>,
  ) {}
}

export default ShoppingCartServiceRelation;
