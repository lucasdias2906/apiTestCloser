import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Response,
  UseGuards,
  Request,
} from '@nestjs/common';
import ShoppingCartService from '../shoppingCart/shoppingCart.service';
import ShoppingRelationService from '../shoppingCart/shoppingRelation.service';
import ShoppingCart from '../db/models/shoppingCart.entity';
import ShoppingProduct from '../db/models/shoppingRelation';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly ShoppingRelationService: ShoppingRelationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/shoppingCart')
  async getAllShoppingProduct(@Response() res): Promise<any> {
    const query = await this.shoppingCartService.shoppingCartRepository.query(
      'SELECT sp_cart.shoppingCartId, sp_cart.userId, sp_cart.totalPrice, sp_cart.totalQuantity,sp_many_product.productId,product.price, product.quantity FROM shopping_cart AS sp_cart INNER JOIN shopping_cart_products_product AS sp_many_product ON sp_many_product.shoppingCartshoppingCartId = sp_cart.shoppingCartId INNER JOIN product ON sp_many_product.productId = product.id;',
    );

    const fill = await query.filter((product) => {
      if (product.shoppingCartId) {
        const values = {
          shoppingCartId: product.shoppingCartId,
          userId: product.userId,
          totalPrice: product.price,
          totalQuantity: product.quantity,
          products: {
            productId: product.productId,
            price: product.price,
            quantity: product.quantity,
          },
        };

        console.log(values);
        return values;
      } else {
        return res.json({ message: 'erro' });
      }
    });

    return res.json(fill);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/shoppingCartProduct')
  async getAllRelation(): Promise<any> {
    const query = await this.ShoppingRelationService.shoppingRelationRepository.query(
      'SELECT * FROM shopping_cart_products_product;',
    );
    return query;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/shoppingCart')
  async create(
    @Body() shoppingCart: ShoppingCart,
    @Request() req,
  ): Promise<any> {
    console.log('req', req.user.userId);
    const values: any = {
      userId: req.user.userId,
      totalPrice: shoppingCart.totalPrice,
      totalQuantity: shoppingCart.totalQuantity,
    };
    const query = await this.shoppingCartService.shoppingCartRepository.create(
      values,
    );

    console.log(query);
    const saveShop = await this.shoppingCartService.shoppingCartRepository.save(
      query,
    );
    console.log(saveShop);
    return saveShop;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/shoppingCartProduct')
  async createShoppingProduct(
    @Body() shoppingCartProducts: ShoppingProduct,
  ): Promise<any> {
    const values: any = {
      productId: shoppingCartProducts.productId,
      shoppingCartshoppingCartId:
        shoppingCartProducts.shoppingCartshoppingCartId,
    };
    const queryShoppingProduct = await this.ShoppingRelationService.shoppingRelationRepository.create(
      values,
    );
    console.log(queryShoppingProduct);
    const saveShopProduct = await this.ShoppingRelationService.shoppingRelationRepository.save(
      queryShoppingProduct,
    );
    console.log(saveShopProduct);
    return saveShopProduct;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/shoppingCartProduct/:productId')
  async deleteShoppingProduct(@Param('productId') id: string) {
    console.log('ID', id);
    const deleteProductofShop = await this.ShoppingRelationService.shoppingRelationRepository.query(
      `DELETE FROM shopping_cart_products_product WHERE productId = "${id}";`,
    );

    console.log(deleteProductofShop);

    return deleteProductofShop;
  }
}

// ('SELECT * FROM shopping_cart INNER JOIN shopping_cart_products_product AS sp_many_product ON sp_many_product.shoppingCartshoppingCartId = shopping_cart.shoppingCartId INNER JOIN product  ON sp_many_product.productId = product.id;');
