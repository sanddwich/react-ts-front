import BaseEntity from "./BaseEntity";

export default class Privilege extends BaseEntity{
    name: string
    code: string
    description: string

    public static getEmptyPrivilege() {
        return new Privilege(0, new Date(), new Date(), "", "", "");
    }

    public static toUppercaseAccessRoleData(privilege: Privilege) {
        privilege.code = privilege.code.toUpperCase();
        privilege.name = privilege.name.toUpperCase();
        privilege.description = privilege.description.toUpperCase();

        return privilege;
    }

    constructor(id: number, createdDate: Date, modifiedDate: Date, name: string, code: string, description: string) {
        super(id, createdDate, modifiedDate);
        this.name = name;
        this.code = code;
        this.description = description;
    }
}