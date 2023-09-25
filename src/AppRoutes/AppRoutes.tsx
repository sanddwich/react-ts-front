import {Routes, Route} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Main from '../Pages/Mian/Main';
import Second from "../Pages/Second/Second";
import {Context} from "../index";
import {useContext} from "react";
import {observer} from "mobx-react";

interface AppRoutesInterface {
}

const AppRoutes = (props: AppRoutesInterface) => {
    const {appStore} = useContext(Context);

    return (
        <Routes>
            <Route path={appStore.routes.userLinks.node} element={appStore.routes.userLinks.layout}>
                {appStore.routes.userLinks.urls.map((value, index) =>
                    <Route
                        key={index}
                        index={!!value.index ? true : false}
                        path={!value.index ? value.url : ''}
                        element={value.component}
                    />
                )}
            </Route>

            <Route path={appStore.routes.superUserLinks.node} element={appStore.routes.superUserLinks.layout}>
                {appStore.routes.superUserLinks.urls.map((value, index) =>
                    <Route
                        key={index}
                        index={!!value.index ? true : false}
                        path={value.url}
                        element={value.component}
                    />
                )}
            </Route>

            <Route path={appStore.routes.adminLinks.node} element={appStore.routes.adminLinks.layout}>
                {appStore.routes.adminLinks.urls.map((value, index) =>
                    <Route
                        key={index}
                        index={!!value.index ? true : false}
                        path={value.url}
                        element={value.component}
                    />
                )}
            </Route>
        </Routes>
    );
};

export default observer(AppRoutes);
