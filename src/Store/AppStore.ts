import {makeAutoObservable} from "mobx";
import UserDataInterface from "../Interfaces/UserDataInterface";
import BackendInterface from "../Interfaces/BackendInterface";
import BackEndData from "../DefaultData/BackEndData";
import LinkListInterface from "../Interfaces/LinkListInterface";
import LinkListData from "../DefaultData/LinkListData";
import APIService from "../Services/APIService";
import AuthResponseInterface from "../Interfaces/AuthResponseInterface";

export default class AppStore {
    userData = {} as UserDataInterface;
    token: string = '';
    isAuth: boolean = false;
    backEnd = BackEndData as BackendInterface;
    routes = LinkListData as LinkListInterface;
    apiService: APIService = new APIService();

    constructor() {
        this.setTokenFromLocalStorage();
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

    setTokenFromLocalStorage = (): void => {
        const token = localStorage.getItem("token");
        !!token ? this.setToken(token) : this.setToken("");
    }
}