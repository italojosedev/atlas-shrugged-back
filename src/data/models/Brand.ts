import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Product } from './index';

@Entity({ name: 'Brand' })
export class Brand {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'name',
  })
  name: string;

  @Column('boolean', {
    name: 'isActived',
    nullable: true,
    default: true,
  })
  isActived: boolean;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
