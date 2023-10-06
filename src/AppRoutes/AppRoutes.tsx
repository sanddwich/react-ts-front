import {Routes, Route} from "react-router-dom";
import {Context} from "../index";
import {useContext} from "react";
import {observer} from "mobx-react";

interface AppRoutesInterface {
}

const AppRoutes = (props: AppRoutesInterface) => {
    const {appStore} = useContext(Context);

    return (
        <Routes key={appStore.linksVersion}>
            {appStore.clientLinks.map(route =>
                <Route key={route.authType} path={route.node} element={route.layout}>
                    {route.urls.map((url, index) =>
                        <Route
                            key={index}
                            index={!!url.index ? true : false}
                            path={!url.index ? url.url : ''}
                            element={url.component}
                        />
                    )}
                </Route>
            )}
        </Routes>
    );
};

export default observer(AppRoutes);
