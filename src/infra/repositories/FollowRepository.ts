import { QueryRunner, FindOptionsWhere, ILike, In } from 'typeorm';
import { Follow, User } from '@data/models';
import { dataSource } from '@config/dataSource';
import { IPostUpdate } from '@domain/interfaces';

class FollowRepository {
  relations = [];

  async listFollowers(followedId: number): Promise<User[]> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    try {
      const followers = await queryRunner.manager.find(Follow, {
        order: {
          createdAt: 'DESC',
        },
        where: {
          followedId: followedId,
        },
      });
      const followersIds = followers.map((f) => f.followerId);
      return await queryRunner.manager.find(User, {
        where: {
          id: In(followersIds),
        },
      });
    } catch (error) {
      console.log('FollowRepository listAll error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async listFolloweds(followerId: number): Promise<User[]> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    try {
      const followers = await queryRunner.manager.find(Follow, {
        order: {
          createdAt: 'DESC',
        },
        where: {
          followerId: followerId,
        },
      });
      const followedsIds = followers.map((f) => f.followedId);
      return await queryRunner.manager.find(User, {
        where: {
          id: In(followedsIds),
        },
      });
    } catch (error) {
      console.log('FollowRepository listAll error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async addFollow(followerId: number, followedId: number): Promise<boolean> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const follow = await queryRunner.manager.create(Follow, {
        followerId,
        followedId,
      });
      await queryRunner.manager.save(follow);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log('FollowRepository addFollow error', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async deleteFollow(followerId: number, followedId: number): Promise<boolean> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Follow, {
        followerId,
        followedId,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log('FollowRepository deleteFollow error', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new FollowRepository();
