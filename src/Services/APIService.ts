import axios, {AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig} from 'axios';
import BackEndData from "../DefaultData/BackEndData";
import AuthRequestInterface from "../Interfaces/AuthRequestInterface";
import UserDataInterface from "../Interfaces/UserDataInterface";

export default class APIService {
    private axiosService = axios.create();

    simpleRequest = async (axiosRequestConfig: AxiosRequestConfig):Promise<AxiosResponse> => {
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

    checkToken = async (token: string):Promise<any> => {
        return await this.simpleRequest({
            url: BackEndData.apiCheckTokenUrl,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        });
    }

    authenticate = async (authRequest: AuthRequestInterface):Promise<AxiosResponse> => {
        return await this.simpleRequest({
            url: BackEndData.authenticateUrlPoint,
            method: "POST",
            data: authRequest
        });
    }
}
