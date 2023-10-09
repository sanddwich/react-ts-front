export default interface RestApiController<T> {
    get: () => T | undefined
    getPart: (pagination: number) => T[]
    getAll: () => T[]
    create: (object: T) => T | undefined
    update: (object: T) => T | undefined
    delete: (object: T) => T | undefined
}