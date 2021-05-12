import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import ShoppingCart from './shoppingCart.entity';

@Entity()
export default class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  // @ManyToMany((type) => ShoppingCart)
  // @JoinTable()
  // shoppingCart: ShoppingCart;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
