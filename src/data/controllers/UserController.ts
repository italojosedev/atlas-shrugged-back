import { UserRepository } from '@infra/repositories';
import Auth from '@infra/utils/Auth';
import { UserValidator } from '@infra/validators';
import { Request, Response } from 'express';

class AuthController {
  async signUp(req: Request, res: Response): Promise<any> {
    try {
      console.log('AuthController signUp');

      const body = await UserValidator.store(req.body);

      const user = await UserRepository.store(body);
      const accessToken = await Auth.sign(user.id);
      return res.json({ user, accessToken });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  async signIn(req: Request, res: Response): Promise<any> {
    try {
      console.log('AuthController signIn');
      const { email, password } = await UserValidator.signIn(req.body);
      const userId = await UserRepository.signIn(email, password);
      const user = await UserRepository.findOne(userId);

      const accessToken = await Auth.sign(user.id);
      return res.json({
        accessToken,
        user,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
  async showProfile(req: Request, res: Response): Promise<any> {
    try {
      console.log('AuthController showProfile');
      const userId = req.auth.id;

      const user = await UserRepository.findOne(+userId);

      return res.json(user);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<any> {
    try {
      console.log('AuthController updateProfile');
      const userId = req.auth.id;

      const body = await UserValidator.edit(req.body);

      const user = await UserRepository.edit(body, userId);

      return res.json(user);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  async updateProfileAvatar(req: Request, res: Response): Promise<any> {
    try {
      console.log('AuthController updateProfileAvatar');
      const userId = req.auth.id;
      const avatar = req.file.filename;
      const user = await UserRepository.editAvatar(avatar, userId);

      return res.json(user);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new AuthController();
