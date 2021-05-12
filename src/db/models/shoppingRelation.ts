import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import Product from './product.entity';

@Entity()
export default class Shopping_cart_products_product {
  @PrimaryColumn()
  shoppingCartshoppingCartId: number;

  @Column()
  productId: string;
}
