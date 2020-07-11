import { User } from "./user.model";

export default interface Credentials {
    username: string;
    password: string;
}

export default interface LoggedUser {
    user: User, 
    token: string
}