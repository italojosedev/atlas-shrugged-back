import User from '@models/User';

declare global {
  namespace Express {
    interface Request {
      auth: User
    }
  }
}