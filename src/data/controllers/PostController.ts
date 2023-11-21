import { Request, Response } from 'express';

import { PostRepository } from '@infra/repositories';
import { PostValidator } from '@infra/validators';

class PostController {
  async store(req: Request, res: Response): Promise<any> {
    try {
      console.log('PostController store');
      const body = await PostValidator.store(req.body);

      const post = await PostRepository.store({
        ...body,
        userId: req.auth.id,
      });

      return res.json(post);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      console.log('PostController store');
      const body = await PostValidator.update(req.body);
      const postId = req.params.postId;

      const post = await PostRepository.update(+postId, body);

      return res.json(post);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new PostController();
