interface IUserModel {
  email: string;
  userId: string;
  username: string;
}
interface IUserLoginModel {
  email: string;
  password: string;
}
interface IUserRegisterModel {
  firstName: string;
  lastName: string;
  password: string;
  confirmedPassword: string;
  email: string;
  userName: string;
}
export { IUserLoginModel, IUserModel, IUserRegisterModel };
