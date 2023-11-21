import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'Post' })
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'content',
    default: '',
  })
  content: string;

  @Column('boolean', {
    name: 'isActived',
    nullable: true,
    default: true,
  })
  isActived: boolean;

  @Column('integer')
  userId: number;
  @OneToMany(() => User, (user) => user.posts)
  @JoinColumn({
    name: 'userId',
  })
  user: User;

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
