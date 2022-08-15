import { CreateUserModel ,LoginUserModel } from "./user.model";


var mockUser : CreateUserModel={
    firstName: "Andrei",
    lastName: "popescu",
    userName: "AndreiPopescu",
    email: "Andrei.popescu@gmail.com",
    password: "Parola12345@",
    confirmedPassword: "Parola12345@"
}
var MockLogioginUser : LoginUserModel ={
    email: "Andrei.popescu@gmail.com",
    password: "Parola12345@"
}
export{mockUser,MockLogioginUser}