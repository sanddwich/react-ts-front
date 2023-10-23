import BaseEntity from "./BaseEntity";
import Privilege from "./Privilege";

export default class AccessRole extends BaseEntity{
    name: string
    code: string
    description: string
    privileges: Privilege[]

    public static getEmptyAccessRole() {
        return new AccessRole(0, new Date(), new Date(), "", "", "", []);
    }

    public static toUppercaseAccessRoleData(accessRole: AccessRole) {
        accessRole.code = accessRole.code.toUpperCase();
        accessRole.name = accessRole.name.toUpperCase();
        accessRole.description = accessRole.description.toUpperCase();

        return accessRole;
    }

    constructor(id: number, createdDate: Date, modifiedDate: Date, name: string, code: string, description: string, privilege: Privilege[]) {
        super(id, createdDate, modifiedDate);
        this.name = name;
        this.code = code;
        this.description = description;
        this.privileges = privilege;
    }
}