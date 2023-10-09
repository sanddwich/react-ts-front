export default abstract class BaseEntity {
    private _id: number
    private _createdDate: Date
    private _modifiedDate: Date

    protected constructor(id: number, createdDate: Date, modifiedDate: Date) {
        this._id = id;
        this._createdDate = createdDate;
        this._modifiedDate = modifiedDate;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get createdDate(): Date {
        return this._createdDate;
    }

    set createdDate(value: Date) {
        this._createdDate = value;
    }

    get modifiedDate(): Date {
        return this._modifiedDate;
    }

    set modifiedDate(value: Date) {
        this._modifiedDate = value;
    }
}