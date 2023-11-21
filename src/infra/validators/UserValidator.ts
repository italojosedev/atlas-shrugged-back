import * as Yup from 'yup';
import { IUserStore, IUserLogin } from '@interfaces';
import { User } from '../models/User';

class UserValidator {
  async store(obj: object): Promise<Partial<IUserStore>> {
    const schema = Yup.object().shape({
      fullName: Yup.string().required(),
      password: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    return schema.validate(obj);
  }

  async edit(obj: object): Promise<Partial<User>> {
    const schema = Yup.object().shape({
      fullName: Yup.string(),
      email: Yup.string().email(),
      code: Yup.string(),
      office: Yup.string(),
    });

    return schema.validate(obj);
  }

  async signIn(obj: IUserLogin): Promise<Partial<IUserLogin>> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    return schema.validate(obj);
  }
}

export default new UserValidator();
