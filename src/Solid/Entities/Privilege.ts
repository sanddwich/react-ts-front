import BaseEntity from "./BaseEntity";

export default class Privilege extends BaseEntity{
    name: string
    code: string
    description: string

    constructor(id: number, createdDate: Date, modifiedDate: Date, name: string, code: string, description: string) {
        super(id, createdDate, modifiedDate);
        this.name = name;
        this.code = code;
        this.description = description;
    }
}