import {AxiosRequestConfig, AxiosResponse} from "axios";
import AuthRequestInterface from "../../Interfaces/AuthRequestInterface";

export default interface ApiServiceInterface {
    request: (axiosRequestConfig: AxiosRequestConfig) => Promise<AxiosResponse>
    convertErrorToAxiosResponse: (e: any) => AxiosResponse
    checkToken: (token: string) => Promise<AxiosResponse>
    authenticate: (authRequest: AuthRequestInterface) => Promise<AxiosResponse>
}