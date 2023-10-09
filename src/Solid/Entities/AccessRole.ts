import BaseEntity from "./BaseEntity";
import Privilege from "./Privilege";

export default class AccessRole extends BaseEntity{
    private name: string
    private code: string
    private description: string
    private privilege: Privilege[]

    constructor(id: number, createdDate: Date, modifiedDate: Date, name: string, code: string, description: string, privilege: Privilege[]) {
        super(id, createdDate, modifiedDate);
        this.name = name;
        this.code = code;
        this.description = description;
        this.privilege = privilege;
    }
}