import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Navigate, useLocation, Location} from 'react-router-dom';
import {observer} from "mobx-react";
import {Container} from "react-bootstrap";
import AdminMain from "../Pages/AdminMain/AdminMain";

interface AuthCheckerProps {
    children: JSX.Element
}

const AuthChecker = (props: AuthCheckerProps) => {
    const location: Location = useLocation()
    const {appStore} = useContext(Context);
    const [auth, setAuth] = useState<boolean>(appStore.isAuth);

    useEffect(() => {
        appStore.apiService.checkToken(appStore.token)
            .then(res => {
                if (res.status == 200) {
                    appStore.setIsAuth(true);
                } else {
                    appStore.setIsAuth(false);
                }
            })
            .catch(e => {
                appStore.setIsAuth(false);
            });
    }, []);

    return (
        <Container fluid className={"p-0"}>
            {appStore.isAuth ? props.children : <AdminMain />}
            {/*<Navigate to={'/auth'} state={{from: location}}/>*/}
        </Container>
    );
}

export default observer(AuthChecker);