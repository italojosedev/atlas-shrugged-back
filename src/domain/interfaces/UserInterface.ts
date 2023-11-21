

export interface IUserStore {
  fullName: string;
  password: string;
  email?: string;
}
export interface IUserLogin {
  password: string;
  email: string;
}
