import {AxiosRequestConfig, AxiosResponse} from "axios";

export default interface RestApiControllerInterface<T> {
    get: (token: string) => Promise<AxiosResponse>
    getPart: (token: string, pagination: number) => Promise<AxiosResponse>
    getAll: (token: string) => Promise<AxiosResponse>
    create: (token: string, object: T) => Promise<AxiosResponse>
    update: (token: string, object: T) => Promise<AxiosResponse>
    delete: (token: string, object: T) => Promise<AxiosResponse>
    addAuthHeaders: (axiosRequestConfig: AxiosRequestConfig, token: string) => AxiosRequestConfig
    find: (token: string, searchTerm: string) => Promise<AxiosResponse>
}