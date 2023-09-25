import {makeAutoObservable} from "mobx";
import UserDataInterface from "../Interfaces/UserDataInterface";
import BackendInterface from "../Interfaces/BackendInterface";
import BackEndData from "../DefaultData/BackEndData";
import LinkListInterface from "../Interfaces/LinkListInterface";
import LinkListData from "../DefaultData/LinkListData";

export default class AppStore {
    userData = {} as UserDataInterface;
    backEnd = BackEndData as BackendInterface;
    routes = LinkListData as LinkListInterface;

    constructor() {
        this.setTokenFromLocalStorage();
        makeAutoObservable(this);
    }

    setToken = (val: string):void => {
        localStorage.setItem("token", val);
        this.userData.token = val;
    }

    setUserData = (userData: UserDataInterface): void => {
        this.userData = userData;
    }

    setTokenFromLocalStorage = (): void => {
        const token = localStorage.getItem("token");
        !!token ? this.setToken(token) : this.setToken("");
    }
}