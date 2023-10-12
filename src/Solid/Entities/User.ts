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
    accessRoles: AccessRole[]

    constructor(
        id: number | undefined,
        createdDate: Date,
        modifiedDate: Date,
        name: string | undefined,
        surname: string | undefined,
        username: string,
        password: string,
        email: string,
        active: boolean,
        accessToken: string | undefined,
        accessRoles: AccessRole[]
    ) {
        super(id, createdDate, modifiedDate);
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.active = active;
        this.accessToken = accessToken;
        this.accessRoles = accessRoles;
    }


}