import { Router } from 'express';
import { AuthMiddleware } from '@middlewares';

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router.route('/signin').post(UserController.signIn);
    this.router.route('/forgot').post(UserController.forgotPassword);

    return this.router;
  }
}

export default new UserRoutes();
