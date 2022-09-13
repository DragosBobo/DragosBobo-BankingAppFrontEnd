import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
interface CreateUserModel {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmedPassword: string;
}
interface LoginUserModel {
    email: FormControl<string>;
    password: FormControl<string>;
}
export { CreateUserModel ,LoginUserModel}