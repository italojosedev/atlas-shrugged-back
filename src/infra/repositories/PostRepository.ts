import { QueryRunner, FindOptionsWhere, ILike } from 'typeorm';
import { Post } from '@data/models';
import { dataSource } from '@config/dataSource';
import { IPostUpdate } from '@domain/interfaces';

class PostRepository {
  relations = [];

  async listAll(name?: string): Promise<Post[]> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();

    const where: FindOptionsWhere<Post> = {};
    try {
      const rows = await queryRunner.manager.find(Post, {
        order: {
          createdAt: 'DESC',
        },
        where,
      });

      return rows;
    } catch (error) {
      console.log('PostRepository listAll error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async store(body: Partial<Post>): Promise<Partial<Post>> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newPost = await queryRunner.manager.create(Post, body);
      await queryRunner.manager.save(newPost);

      await queryRunner.commitTransaction();
      return newPost;
    } catch (error) {
      console.log('PostRepository store error', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async update(
    postId: number,
    body: Partial<IPostUpdate>
  ): Promise<Partial<Post>> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(
        Post,
        {
          id: postId,
        },
        body as Post
      );

      await queryRunner.commitTransaction();

      const post = await queryRunner.manager.findOne(Post, {
        where: { id: postId },
      });
      return post;
    } catch (error) {
      console.log('PostRepository update error', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async explorer(page: number = 0, perPage: number = 10): Promise<any[]> {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      const rows = await queryRunner.manager.find(Post, {
        order: {
          createdAt: 'DESC',
        },
        where: {},
        take: perPage,
        skip: page * perPage,
      });

      return rows;
    } catch (error) {
      console.log('PostRepository listAll error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new PostRepository();
