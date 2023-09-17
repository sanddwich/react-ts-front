import {makeAutoObservable} from "mobx";
import UserDataInterface from "../Interfaces/UserDataInterface";
import BackendInterface from "../Interfaces/BackendInterface";
import BackEndData from "../DefaultData/BackEndData";

export default class AppStore {
    userData = {} as UserDataInterface;
    backEnd = BackEndData as BackendInterface;

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