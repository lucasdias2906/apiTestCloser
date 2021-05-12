import ShoppingCart from '../../db/models/shoppingCart.entity';

export default class TestUtil {
  static giveMeAvaliableShop(): ShoppingCart {
    const shop = new ShoppingCart();
    (shop.shoppingCartId = 1),
      (shop.userId = 1),
      (shop.totalQuantity = 10),
      (shop.totalPrice = 100);

    return shop;
  }
}
