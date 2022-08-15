import { EmailValidator } from "@angular/forms";

interface CreateUserModel {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmedPassword: string;
}

export{ CreateUserModel}