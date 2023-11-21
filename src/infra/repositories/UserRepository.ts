import { FindOneOptions, FindOptionsWhere, ILike, QueryRunner } from 'typeorm';
import { User } from '@models';
import { IUserStore } from '@interfaces';
import { dataSource } from '@config/dataSource';

class UserRepository {
  relations = ['organization'];
  queryRunner = async (): Promise<QueryRunner> => {
    const qr = dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    return qr;
  };

  async list(
    organizationId: number,
    page: number,
    itemsPerPage: number,
    filters?: {
      name?: string;
    }
  ): Promise<{
    rows: User[];
    total: number;
  }> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    const where: FindOptionsWhere<User> = {};

    if (filters?.name) where.fullName = ILike(filters.name);

    try {
      const [rows, total] = await queryRunner.manager.findAndCount(User, {
        where: {
          organization: organizationId,
          ...where,
        },
        order: {
          createdAt: 'ASC',
        },
        take: +itemsPerPage,
        skip: +page * +itemsPerPage,
      });

      return {
        total,
        rows,
      };
    } catch (error) {
      console.log('UserRepository list error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async edit(updateData: Partial<User>, userId: number): Promise<User> {
    const queryRunner: QueryRunner = await this.queryRunner();

    try {
      await queryRunner.manager.update(User, userId, updateData);
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      await queryRunner.commitTransaction();
      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async editAvatar(avatar: string, userId: number): Promise<User> {
    const queryRunner: QueryRunner = await this.queryRunner();

    try {
      await queryRunner.manager.update(User, userId, { avatar });
      await queryRunner.commitTransaction();
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
        relations: ['organization'],
      });
      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async store(body: IUserStore): Promise<User> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user: User = await queryRunner.manager.create(User, {
        ...body,
        organization: body.organization,
      });

      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      delete user.password;

      return user;
    } catch (error) {
      console.log('UserRepository list error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(query: object) {
    const user = await dataSource.manager.findOne(User, {
      where: query,
    });
    return user;
  }

  async findOneById(id: number) {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: {
          id,
        },
        relations: this.relations,
      });

      return user;
    } catch (error) {
      console.log('UserRepository findOneById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async signIn(email: string, password: string): Promise<number | null> {
    const user: User = await this.getUserWithPassword({ email });

    const isValid = await user.comparePassword(password);

    if (isValid) return user.id;

    return null;
  }

  private async getUserWithPassword(
    where: FindOptionsWhere<User>
  ): Promise<User> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    // @ts-ignore
    const user: User = await queryRunner.manager.findOneOrFail(User, {
      where,
      select: ['id', 'fullName', 'code', 'email', 'password'],
    });

    await queryRunner.release();

    return user;
  }
}

export default new UserRepository();
