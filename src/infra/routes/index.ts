import { Application } from 'express';

import ErrorHandler from '@config/errors/ErrorHandler';
import AuthRoutes from './AuthRoutes';
import PostRoutes from './PostRoutes';
import UserRoutes from './UserRoutes';
import FollowRoutes from './FollowRoutes';

const API = '/api';

class Routes {
  public setRoutes(app: Application): void {
    // commons routes
    app.use(API, AuthRoutes.getRoutes());
    app.use(API, PostRoutes.getRoutes());
    app.use(API, UserRoutes.getRoutes());
    app.use(API, FollowRoutes.getRoutes());
    // error handling
    app.use(ErrorHandler.use);
  }
}

export default new Routes();
