import RestApiControllerInterface from "../Ifaces/RestApiControllerInterface";
import ApiServiceInterface from "../Ifaces/ApiServiceInterface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import BackEndData from "../../DefaultData/BackEndData";
import AccessRole from "../Entities/AccessRole";
import RequestSearchData from "../RequestClasses/RequestSearchData";

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
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiAccessRolesPoint + '/add',
            method: "POST",
            headers: {},
            data: {
                ...object
            }
        }

        return await this.apiService.request(
            this.addAuthHeaders(axiosRequestConfig, token)
        );
    }

    async delete(token: string, object: AccessRole): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiAccessRolesPoint + '/delete',
            method: "POST",
            headers: {},
            data: {
                ...object
            }
        }

        return await this.apiService.request(
            this.addAuthHeaders(axiosRequestConfig, token)
        );
    }

    async get(token: string, id: string): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiAccessRolesPoint + '/get/' + id,
            method: "GET",
            headers: {}
        }

        return await this.apiService.request(
            this.addAuthHeaders(axiosRequestConfig, token)
        );
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
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiAccessRolesPoint + '/patch',
            method: "PATCH",
            headers: {},
            data: {
                ...object
            }

        }

        return await this.apiService.request(
            this.addAuthHeaders(axiosRequestConfig, token)
        );
    }

    async find(token: string, searchTerm: string): Promise<AxiosResponse> {
        const requestSearchData: RequestSearchData = new RequestSearchData(searchTerm);
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiAccessRolesPoint + '/find',
            method: "POST",
            headers: {},
            data: {
                ...requestSearchData
            }
        }

        return await this.apiService.request(
            this.addAuthHeaders(axiosRequestConfig, token)
        );
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