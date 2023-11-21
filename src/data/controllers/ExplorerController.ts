import { Request, Response } from 'express';

import { PostRepository, UserRepository } from '@infra/repositories';
import { PostValidator } from '@infra/validators';

class ExplorerController {
  async posts(req: Request, res: Response): Promise<any> {
    try {
      console.log('ExplorerController posts');
      const userId = req.auth.id;

      const posts = await PostRepository.explorer(userId);

      return res.json(posts);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  async users(req: Request, res: Response): Promise<any> {
    try {
      console.log('ExplorerController users');
      const { name } = req.query;

      const posts = await UserRepository.search(name as string);

      return res.json(posts);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new ExplorerController();
