import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import Product from './product.entity';

@Entity()
export default class ShoppingCart {
  @PrimaryGeneratedColumn()
  shoppingCartId: number;

  @Column()
  userId: number;

  @Column()
  totalPrice: number;

  @Column()
  totalQuantity: number;

  @ManyToMany((type) => Product)
  @JoinTable()
  products: Product;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
