import { Router } from 'express';
import { UserController, OrganizationController } from '@organization';
import { AuthMiddleware } from '@middlewares';
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
    this.router
      .route('/users')
      .get(AuthMiddleware.user, UserController.list)
      .post(AuthMiddleware.user, UserController.store);
    this.router
      .route('/users/avatar/:id')
      .put(mult.single('avatar'), AuthMiddleware.user, UserController.avatar);
    this.router
      .route('/users/:userId')
      .get(AuthMiddleware.user, UserController.showById)
      .put(AuthMiddleware.user, UserController.edit);
    this.router.route('/users/signin').post(UserController.signIn);
    this.router.route('/users/signup').post(OrganizationController.signUp);

    this.router
      .route('/account')
      .get(AuthMiddleware.user, UserController.detail)
      .put(AuthMiddleware.user, UserController.updateMyAccount);

    this.router
      .route('/account/avatar')
      .put(
        AuthMiddleware.user,
        this.multer.single('avatar'),
        UserController.avatar
      );

    return this.router;
  }
}

export default new UserRoutes();
