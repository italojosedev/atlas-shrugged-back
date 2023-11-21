import { Router } from 'express';
import { UserController } from '@data/controllers';
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
      .route('/users/profile/avatar')
      .put(AuthMiddleware.user, this.multer.single('avatar'));

    return this.router;
  }
}

export default new UserRoutes();
