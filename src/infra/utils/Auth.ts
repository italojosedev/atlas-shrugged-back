import jwt from 'jsonwebtoken';

export class Auth {
  async sign(userId: number, expiresIn = '1d'): Promise<string> {
    const token = jwt.sign(
      { id: userId, class: 'user' },
      process.env.JWT_SECRET,
      {
        // expiresIn
      }
    );
    return token;
  }

  async verify(token: string): Promise<any> {
    const payload = jwt.decode(token);
    console.log(payload);
    return payload;
    // return JSON.parse(payload.sub.toString());
  }
}
export default new Auth();
