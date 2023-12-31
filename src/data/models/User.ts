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
} from 'typeorm';
import { compare, hash } from 'bcrypt';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'fullName',
  })
  fullName: string;

  @Column('varchar', {
    name: 'password',
    select: false,
  })
  password: string;

  @Column('varchar', {
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
  })
  avatar?: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(password?: string): Promise<string> {
    if (password) return hash(password, 10);
    this.password = await hash(this.password, 10);
    return this.password;
  }

  comparePassword(password: string) {
    return compare(password, this.password);
  }

  @AfterLoad()
  updateLogo() {
    if (this.avatar)
      this.avatar = process.env.BASE_URL + '/api/image/' + this.avatar;
  }
}
