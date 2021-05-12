import { Injectable, Body, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ShoppingCart from '../db/models/shoppingCart.entity';

@Injectable()
class ShoppingCartService {
  public constructor(
    @InjectRepository(ShoppingCart)
    public readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async findAll(): Promise<ShoppingCart[]> {
    const shop = await this.shoppingCartRepository.find();
    return shop;
  }

  async findOneShop(
    @Param('shoppingCartId') id: number,
  ): Promise<ShoppingCart> {
    const shop = await this.shoppingCartRepository.findOne(id);
    return shop;
  }

  async create(@Body() shoppingCart: ShoppingCart): Promise<ShoppingCart> {
    const shop = await this.shoppingCartRepository.create(shoppingCart);

    const saveShopProduct = await this.shoppingCartRepository.save(shop);
    return saveShopProduct;
  }

  async deleteShopById(@Param('shoppingCartId') id: number) {
    const shop = await this.findOneShop(id);

    const deleted = await this.shoppingCartRepository.delete(shop);

    if (deleted) {
      return true;
    }

    return false;
  }
}

export default ShoppingCartService;
