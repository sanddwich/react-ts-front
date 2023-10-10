import BaseEntity from "./BaseEntity";
import AccessRole from "./AccessRole";

export default class User extends BaseEntity{
    name: string | undefined
    surname: string | undefined
    username: string
    password: string
    email: string
    active: boolean
    accessToken: string | undefined
    accessRole: AccessRole[]

    constructor(
        id: number,
        createdDate: Date,
        modifiedDate: Date,
        name: string | undefined,
        surname: string | undefined,
        username: string,
        password: string,
        email: string,
        active: boolean,
        accessToken: string | undefined,
        accessRole: AccessRole[]
    ) {
        super(id, createdDate, modifiedDate);
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.active = active;
        this.accessToken = accessToken;
        this.accessRole = accessRole;
    }


}