export default abstract class BaseEntity {
    id: number | undefined
    createdDate: Date
    modifiedDate: Date

    protected constructor(id: number | undefined, createdDate: Date, modifiedDate: Date) {
        this.id = id;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }
}