import Product from '../../db/models/product.entity';

export default class TestUtilProduct {
  static giveMeAvaliableProduct(): Product {
    const product = new Product();
    (product.id = '1'),
      (product.price = 1),
      (product.quantity = 10),
      (product.createdAt = new Date());

    return product;
  }
}
