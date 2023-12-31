import React, {createContext} from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import {BrowserRouter} from 'react-router-dom'
import AppStore from "./Store/AppStore";
import ContextInterface from "./Interfaces/ContextInterface";
import APIService from "./Services/APIService";
import RestApiUserController from "./Solid/Classes/RestApiUserController";
import RestApiPrivilegeController from "./Solid/Classes/RestApiPrivilegeController";
import RestApiAccessRoleController from "./Solid/Classes/RestApiAccessRoleController";

const appStore = new AppStore(
    new APIService(),
    new RestApiUserController(new APIService()),
    new RestApiAccessRoleController(new APIService()),
    new RestApiPrivilegeController(new APIService())
);
export const Context = createContext<ContextInterface>({
    appStore
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Context.Provider value={{appStore}}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
