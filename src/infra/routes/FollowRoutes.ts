import { Router } from 'express';

import { FollowController } from '@data/controllers';

class FollowRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router.route('/follow/:userId').post(FollowController.follow);
    this.router.route('/unfollow/:userId').post(FollowController.unfollow);

    return this.router;
  }
}

export default new FollowRoutes();
