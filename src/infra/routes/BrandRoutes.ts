import { Router } from 'express';
import { CommonsControllers } from '@controllers';

class BrandRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router
      .route('/categories')
      .get(CommonsControllers.CategoryController.listAll)
      .post(CommonsControllers.CategoryController.store);
    this.router
      .route('/brands')
      .get(CommonsControllers.BrandController.listAll)
      .post(CommonsControllers.BrandController.store);

    return this.router;
  }
}

export default new BrandRoutes();
