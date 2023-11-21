import { QueryRunner, In, FindOptionsWhere, ILike } from 'typeorm';
import { Brand } from '@models';
import { dataSource } from '@config/dataSource';

class BrandRepository {
  relations = [];

  async listAll(name?: string): Promise<Brand[]> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();

    const where: FindOptionsWhere<Brand> = {};
    if (name) where.name = ILike(`%${name}%`);
    try {
      const rows = await queryRunner.manager.find(Brand, {
        order: {
          name: 'ASC',
        },
        where,
      });

      return rows;
    } catch (error) {
      console.log('BrandRepository listAll error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getByName(name: string): Promise<Brand> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();

    const where: FindOptionsWhere<Brand> = {
      name: ILike(name),
    };
    try {
      const brand = await queryRunner.manager.findOne(Brand, {
        order: {
          name: 'ASC',
        },
        where,
      });

      return brand;
    } catch (error) {
      console.log('BrandRepository getbyname error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async store(body: Partial<Brand>): Promise<Partial<Brand>> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newBrand = await queryRunner.manager.create(Brand, body);
      await queryRunner.manager.save(newBrand);

      await queryRunner.commitTransaction();
      return newBrand;
    } catch (error) {
      console.log('BrandRepository store error', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new BrandRepository();
