import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import BackEndData from "../DefaultData/BackEndData";

export default class APIService {
    private baseUrl = BackEndData.apiUrl;
    private axiosService = axios.create();

    simpleRequest = async (axiosRequestConfig: AxiosRequestConfig):Promise<any> => {
        let res = {};
        await this.axiosService(axiosRequestConfig)
            .then(resp => {res = resp})
            .catch(e => {res = {error: e, status: 404}});

        // return res as AxiosResponse;
        return res;
    }


}
