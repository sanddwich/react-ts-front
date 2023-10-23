import RestApiControllerInterface from "../Ifaces/RestApiControllerInterface";
import ApiServiceInterface from "../Ifaces/ApiServiceInterface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import BackEndData from "../../DefaultData/BackEndData";
import Privilege from "../Entities/Privilege";
import RequestSearchData from "../RequestClasses/RequestSearchData";

export default class RestApiPrivilegeController implements RestApiControllerInterface<Privilege> {
    apiService: ApiServiceInterface;
    private static instance: RestApiPrivilegeController;

    constructor(apiService: ApiServiceInterface) {
        this.apiService = apiService;

        if (RestApiPrivilegeController.instance) {
            return RestApiPrivilegeController.instance;
        }

        RestApiPrivilegeController.instance = this;
    }

    async create(token: string, object: Privilege): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiPrivilegesPoint + '/add',
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

    async delete(token: string, object: Privilege): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiPrivilegesPoint + '/delete',
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
            url: BackEndData.restApiPrivilegesPoint + '/get/' + id,
            method: "GET",
            headers: {}
        }

        return await this.apiService.request(
            this.addAuthHeaders(axiosRequestConfig, token)
        );
    }

    async getAll(token: string): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiPrivilegesPoint + '/get_all',
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

    async update(token: string, object: Privilege): Promise<AxiosResponse> {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: BackEndData.restApiPrivilegesPoint + '/patch',
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
            url: BackEndData.restApiPrivilegesPoint + '/find',
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