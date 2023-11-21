import * as Yup from 'yup';

class UserValidator {
  async store(obj: object): Promise<Partial<any>> {
    const schema = Yup.object().shape({
      fullName: Yup.string().required(),
      password: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    return schema.validate(obj);
  }

  async edit(obj: object): Promise<Partial<any>> {
    const schema = Yup.object().shape({
      fullName: Yup.string(),
      email: Yup.string().email(),
      code: Yup.string(),
      office: Yup.string(),
    });

    return schema.validate(obj);
  }

  async signIn(obj: any): Promise<Partial<any>> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    return schema.validate(obj);
  }
}

export default new UserValidator();
