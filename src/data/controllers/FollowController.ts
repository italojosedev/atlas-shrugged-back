import { Request, Response } from 'express';

import { PostRepository, UserRepository } from '@infra/repositories';
import { PostValidator } from '@infra/validators';

class FollowController {
  async follow(req: Request, res: Response): Promise<any> {
    try {
      console.log('FollowController posts');
      const followerID = req.auth.id;

      const followedId = req.params.userId;

      // const posts = await PostRepository.explorer(userId);

      return res.json({});
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
  async unfollow(req: Request, res: Response): Promise<any> {
    try {
      console.log('FollowController posts');
      const followerID = req.auth.id;

      const followedId = req.params.userId;

      // const posts = await PostRepository.explorer(userId);

      return res.json({});
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new FollowController();
