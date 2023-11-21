import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  VirtualColumn,
  AfterLoad,
  BeforeUpdate,
  JoinColumn,
} from 'typeorm';
import { compare, hash } from 'bcrypt';
import { User } from './index';

@Entity({ name: 'Follow' })
export class Follow {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('integer')
  followerId: number;
  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'followerId' })
  follower: User;

  @Column('integer')
  followedId: number;
  @ManyToOne(() => User, (user) => user.followeds)
  @JoinColumn({ name: 'followedId' })
  followed: User;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
