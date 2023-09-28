import UserDataInterface from "./UserDataInterface";

export default interface AuthResponseInterface {
    token: string
    user: UserDataInterface
}