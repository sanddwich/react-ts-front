import BaseEntity from "./BaseEntity";
import AccessRole from "./AccessRole";

export default class User extends BaseEntity{
    private name?: string
    private surname?: string
    private username: string
    private email: string
    private active: boolean
    private accessToken?: string
    private accessRole: AccessRole[]

    constructor(id: number, createdDate: Date, modifiedDate: Date, username: string, email: string, active: boolean, accessRole: AccessRole[]) {
        super(id, createdDate, modifiedDate);
        this.username = username;
        this.email = email;
        this.active = active;
        this.accessRole = accessRole;
    }
}