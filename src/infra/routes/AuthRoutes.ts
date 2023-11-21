import { Router } from 'express';

import { AuthController } from '@data/controllers';

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router.route('/signin').post(AuthController.signIn);
    this.router.route('/signup').post(AuthController.signUp);

    return this.router;
  }
}

export default new UserRoutes();
