import RestApiController from "../Ifaces/RestApiController";
import User from "../Entities/User";

export default class RestApiUserController implements RestApiController<User>{
    create(object: User): User | undefined {
        return undefined;
    }

    delete(object: User): User | undefined {
        return undefined;
    }

    get(): User | undefined {
        return undefined;
    }

    getAll(): User[] {
        return [];
    }

    getPart(pagination: number): User[] {
        return [];
    }

    update(object: User): User | undefined {
        return undefined;
    }

}