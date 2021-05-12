import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyToManyProductShoppingPrimaryString1620571186614
  implements MigrationInterface {
  name = 'ManyToManyProductShoppingPrimaryString1620571186614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product` (`id` varchar(255) NOT NULL, `price` int NOT NULL, `quantity` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `shopping_cart` (`shoppingCartId` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `totalPrice` int NOT NULL, `totalQuantity` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`shoppingCartId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `shopping_cart_products_product` (`shoppingCartshoppingCartId` int NOT NULL PRIMARY KEY, `productId` varchar(255) NOT NULL) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` DROP PRIMARY KEY',
    );

    await queryRunner.query(
      'CREATE INDEX `IDX_dc9e8f5bdb50d41440078587ce` ON `shopping_cart_products_product` (`shoppingCartShoppingCartId`)',
    );
    await queryRunner.query(
      'CREATE INDEX `IDX_7724090b3411d17f9578fe400b` ON `shopping_cart_products_product` (`productId`)',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` ADD CONSTRAINT `FK_dc9e8f5bdb50d41440078587ce4` FOREIGN KEY (`shoppingCartShoppingCartId`) REFERENCES `shopping_cart`(`shoppingCartId`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` ADD CONSTRAINT `FK_7724090b3411d17f9578fe400bd` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` DROP FOREIGN KEY `FK_7724090b3411d17f9578fe400bd`',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` DROP FOREIGN KEY `FK_dc9e8f5bdb50d41440078587ce4`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_7724090b3411d17f9578fe400b` ON `shopping_cart_products_product`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_dc9e8f5bdb50d41440078587ce` ON `shopping_cart_products_product`',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` DROP PRIMARY KEY',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` DROP COLUMN `shoppingCartShoppingCartId`',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` DROP COLUMN `shoppingCartshoppingCartId`',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products_product` ADD PRIMARY KEY (`shoppingCartshoppingCartId`)',
    );
    await queryRunner.query('DROP TABLE `shopping_cart_products_product`');
    await queryRunner.query('DROP TABLE `shopping_cart`');
    await queryRunner.query('DROP TABLE `product`');
  }
}
