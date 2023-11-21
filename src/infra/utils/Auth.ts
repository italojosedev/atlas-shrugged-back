import jwt from 'jsonwebtoken';

export class Auth {
  async sign(userId: number, expiresIn = '1d'): Promise<string> {
    const token = jwt.sign({}, process.env.JWT_SECRET, {
      subject: JSON.stringify({
        userId,
      }),
      // expiresIn
    });
    return token;
  }

  async verify(token: string): Promise<any> {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return JSON.parse(payload.sub.toString());
  }
}
export default new Auth();
