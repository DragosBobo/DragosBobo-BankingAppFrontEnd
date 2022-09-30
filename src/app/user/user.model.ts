interface IUserModel {
  email: string;
  userId: string;
  username: string;
}
interface IUserLoginModel {
  email: string;
  password: string;
}
export { IUserLoginModel, IUserModel };
