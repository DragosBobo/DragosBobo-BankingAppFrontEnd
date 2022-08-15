import { EmailValidator } from "@angular/forms";

interface CreateUserModel {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmedPassword: string;
}
interface LoginUserModel {
    email: string;
    password: string;
}
export { CreateUserModel ,LoginUserModel}