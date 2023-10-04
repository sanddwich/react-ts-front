import {makeAutoObservable} from "mobx";
import UserDataInterface from "../Interfaces/UserDataInterface";
import BackendInterface from "../Interfaces/BackendInterface";
import BackEndData from "../DefaultData/BackEndData";
import LinkListInterface from "../Interfaces/LinkListInterface";
import LinkListData from "../DefaultData/LinkListData";
import APIService from "../Services/APIService";
import AuthResponseInterface from "../Interfaces/AuthResponseInterface";
import {AxiosResponse} from "axios";
import {AuthTypeInterface} from "../Interfaces/AuthTypeInterface";
import NodeInterface from "../Interfaces/NodeInterface";

export default class AppStore {
    userData = {} as UserDataInterface;
    token: string = '';
    isAuth: boolean = false;
    backEnd = BackEndData as BackendInterface;
    routes = LinkListData as LinkListInterface;
    clientLinks: NodeInterface[] = [];
    linksVersion: number = Date.now();
    apiService: APIService = new APIService();
    initialize: boolean = true;

    constructor() {
        this.setTokenFromLocalStorage().then().catch(e => this.setDefaultSettings());
        makeAutoObservable(this);
    }

    setToken = (val: string):void => {
        localStorage.setItem("token", val);
        this.token = val;
    }

    setUserData = (user: UserDataInterface): void => {
        this.userData = user;
    }

    setIsAuth = (val: boolean):void => {
        this.isAuth = val;
    }

    setTokenFromLocalStorage = async():Promise<any> => {
        const token = localStorage.getItem("token");
        if(!!token) {
            let res = await this.apiService.checkToken(token);
            if (!!res.status && res.status == 200 && !!res.data.result) {
                this.authDefaultSettings(token);
                return;
            }
        }

        this.setDefaultSettings();
    }

    setDefaultSettings = ():void => {
        this.setToken('');
        this.setIsAuth(false);
        this.setClientLinks([this.routes.userLinks]);
        this.setLinksVersionAndInitializeV1();
    }

    authDefaultSettings = (token: string):void => {
        this.setClientLinks([this.routes.userLinks, this.routes.adminLinks]);
        this.setToken(token);
        this.setIsAuth(true);
        this.setLinksVersionAndInitializeV1();
    }

    setLinksVersionAndInitializeV1 = ():void => {
        this.setLinksVersion(Date.now());
        this.setInitialize(false);
        console.log(this);
    }

    setLinksVersion = (val: number):void => {
        this.linksVersion = val;
    }

    setClientLinks = (clientLinks: NodeInterface[]):void => {
        this.clientLinks = clientLinks;
    }

    checkTokenFromLocalStorage = ():void => {
        const token = localStorage.getItem("token");
        !!token ? this.setToken(token) : this.setToken("");
    }

    setInitialize = (val: boolean):void => {
        this.initialize = val;
    }
}