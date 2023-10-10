import axios, {AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig} from 'axios';
import BackEndData from "../DefaultData/BackEndData";
import AuthRequestInterface from "../Interfaces/AuthRequestInterface";
import ApiServiceInterface from "../Solid/Ifaces/ApiServiceInterface";

//Singleton
export default class APIService implements ApiServiceInterface{
    private axiosService = axios.create();
    private static instance:APIService;

    constructor() {
        if (APIService.instance) {
            return APIService.instance;
        }
        APIService.instance = this;
    }

    request = async (axiosRequestConfig: AxiosRequestConfig):Promise<AxiosResponse> => {
        let res = {} as AxiosResponse;
        await this.axiosService(axiosRequestConfig)
            .then(resp => {res = resp})
            .catch(e => {res = this.convertErrorToAxiosResponse(e)});

        return res;
    }

    convertErrorToAxiosResponse = (e: any):AxiosResponse => {
        const res = {
            data: {error: e},
            status: 404,
        } as AxiosResponse;

        return res;
    }

    checkToken = async (token: string):Promise<AxiosResponse> => {
        return await this.request({
            url: BackEndData.apiCheckTokenUrl,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        });
    }

    authenticate = async (authRequest: AuthRequestInterface):Promise<AxiosResponse> => {
        return await this.request({
            url: BackEndData.authenticateUrlPoint,
            method: "POST",
            data: authRequest
        });
    }
}
