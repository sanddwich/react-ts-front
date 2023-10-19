import RestApiControllerInterface from "../Ifaces/RestApiControllerInterface";
import ApiServiceInterface from "../Ifaces/ApiServiceInterface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import BackEndData from "../../DefaultData/BackEndData";
import AccessRole from "../Entities/AccessRole";

export default class RestApiAccessRoleController implements RestApiControllerInterface<AccessRole> {
    apiService: ApiServiceInterface;
    private static instance: RestApiAccessRoleController;

    constructor(apiService: ApiServiceInterface) {
        this.apiService = apiService;

        if (RestApiAccessRoleController.instance) {
            return RestApiAccessRoleController.instance;
        }

        RestApiAccessRoleController.instance = this;
    }

    async create(token: string, object: AccessRole): Promise<AxiosResponse> {
        // @ts-ignore
        return undefined;
    }

    async delete(token: string, object: AccessRole): Promise<AxiosResponse> {
        // @ts-ignore
        return undefined;
    }

    async get(token: string): Promise<AxiosResponse> {
        // @ts-ignore
        return undefined;
    }

    async getAll(token: string): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiAccessRolesPoint + '/get_all',
            method: "GET",
            headers: {}
        }

        return await this.apiService.request(
            this.addAuthHeaders(axiosRequestConfig, token)
        );
    }

    async getPart(token: string, pagination: number): Promise<AxiosResponse> {
        // @ts-ignore
        return [];
    }

    async update(token: string, object: AccessRole): Promise<AxiosResponse> {
        // const axiosRequestConfig: AxiosRequestConfig = {
        //     url: BackEndData.restApiAccessRolesPoint + '/' + object.id,
        //     method: "PATCH",
        //     headers: {},
        //     data: {
        //         ...object
        //     }
        //
        // }

        // return await this.apiService.request(
        //     this.addAuthHeaders(axiosRequestConfig, token)
        // );

        // @ts-ignore
        return undefined;
    }

    // @ts-ignore
    find(token: string, searchTerm: string): Promise<AxiosResponse> {

    }

    addAuthHeaders = (axiosRequestConfig: AxiosRequestConfig, token: string): AxiosRequestConfig => {
        const authHeaders = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        };
        axiosRequestConfig.headers = {...axiosRequestConfig.headers, ...authHeaders};

        return axiosRequestConfig;
    }
}