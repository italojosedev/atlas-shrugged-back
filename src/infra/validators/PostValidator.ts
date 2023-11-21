import * as Yup from 'yup';
import { IPostStore, IPostUpdate } from '@domain/interfaces';

class PostValidator {
  async store(obj: Partial<IPostStore>): Promise<Partial<IPostStore>> {
    const schema = Yup.object().shape({
      content: Yup.string().max(280).required(),
    });

    return schema.validate(obj);
  }

  async update(obj: Partial<IPostUpdate>): Promise<Partial<IPostUpdate>> {
    const schema = Yup.object().shape({
      content: Yup.string().max(280).required(),
    });

    return schema.validate(obj);
  }
}

export default new PostValidator();
