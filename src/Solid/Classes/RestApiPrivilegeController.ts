import RestApiControllerInterface from "../Ifaces/RestApiControllerInterface";
import ApiServiceInterface from "../Ifaces/ApiServiceInterface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import BackEndData from "../../DefaultData/BackEndData";
import Privilege from "../Entities/Privilege";

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
        // @ts-ignore
        return undefined;
    }

    async delete(token: string, object: Privilege): Promise<AxiosResponse> {
        // @ts-ignore
        return undefined;
    }

    async get(token: string): Promise<AxiosResponse> {
        // @ts-ignore
        return undefined;
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
        // const axiosRequestConfig: AxiosRequestConfig = {
        //     url: BackEndData.restApiPrivilegesPoint + '/' + object.id,
        //     method: "PATCH",
        //     headers: {},
        //     data: {
        //         ...object
        //     }
        //
        // }
        //
        // return await this.apiService.request(
        //     this.addAuthHeaders(axiosRequestConfig, token)
        // );

        // @ts-ignore
        return undefined;
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