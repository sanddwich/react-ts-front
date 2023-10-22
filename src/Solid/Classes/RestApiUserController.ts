import RestApiControllerInterface from "../Ifaces/RestApiControllerInterface";
import User from "../Entities/User";
import ApiServiceInterface from "../Ifaces/ApiServiceInterface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import BackEndData from "../../DefaultData/BackEndData";
import RequestSearchData from "../RequestClasses/RequestSearchData";

export default class RestApiUserController implements RestApiControllerInterface<User> {
    apiService: ApiServiceInterface;
    private static instance: RestApiUserController;

    constructor(apiService: ApiServiceInterface) {
        this.apiService = apiService;

        if (RestApiUserController.instance) {
            return RestApiUserController.instance;
        }

        RestApiUserController.instance = this;
    }

    async create(token: string, object: User): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiUsersPoint + '/add',
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

    async delete(token: string, object: User): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiUsersPoint + '/delete',
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

    async get(token: string): Promise<AxiosResponse> {
        // @ts-ignore
        return undefined;
    }

    async getAll(token: string): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiUsersPoint + '/get_all',
            method: "GET",
            headers: {}
        }

        return await this.apiService.request(
            this.addAuthHeaders(axiosRequestConfig, token)
        );
    }

    async find(token: string, searchTerm: string): Promise<AxiosResponse> {
        const requestSearchData: RequestSearchData = new RequestSearchData(searchTerm);
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiUsersPoint + '/find',
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

    async getPart(token: string, pagination: number): Promise<AxiosResponse> {
        // @ts-ignore
        return [];
    }

    async update(token: string, object: User): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiUsersPoint + '/patch',
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

    addAuthHeaders = (axiosRequestConfig: AxiosRequestConfig, token: string): AxiosRequestConfig => {
        const authHeaders = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        };
        axiosRequestConfig.headers = {...axiosRequestConfig.headers, ...authHeaders};

        return axiosRequestConfig;
    }
}