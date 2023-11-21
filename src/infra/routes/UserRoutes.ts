import { Router } from 'express';
import { PostController, UserController } from '@data/controllers';
import { AuthMiddleware } from '@data/middlewares';
import multer, { Multer } from 'multer';
import { storage } from '@config/upload';

const mult = multer({ storage });

class UserRoutes {
  public router: Router;
  public multer: Multer;

  constructor() {
    this.router = Router();
    this.multer = multer({ storage });
  }

  getRoutes() {
    this.router.route('/users');

    this.router
      .route('/users/profile')
      .get(AuthMiddleware.user, UserController.showProfile)
      .put(AuthMiddleware.user, UserController.updateProfile);
    this.router
      .route('/users/profile/avatar')
      .put(
        AuthMiddleware.user,
        this.multer.single('avatar'),
        UserController.updateProfileAvatar
      );

    this.router
      .route('/users/:userId/posts')
      .get(AuthMiddleware.user, PostController.listByUserId);

    return this.router;
  }
}

export default new UserRoutes();
