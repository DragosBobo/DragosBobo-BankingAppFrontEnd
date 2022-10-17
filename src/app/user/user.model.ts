import { FormControl } from '@angular/forms';

interface IUserModel {
  email: string;
  userId: string;
  username: string;
}
interface IUserLoginModel {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
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
