import { Router } from 'express';
import { PostController } from '@data/controllers';
import { AuthMiddleware } from '@data/middlewares';

class PostRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router.route('/posts').post(AuthMiddleware.user, PostController.store);

    return this.router;
  }
}

export default new PostRoutes();
