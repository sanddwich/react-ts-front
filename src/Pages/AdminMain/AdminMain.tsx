import React, {useContext, useEffect, useState} from 'react';
import './AdminMain.scss';
import {Button, Container} from "react-bootstrap";
import {Context} from "../../index";

interface AdminMainProps {}

const AdminMain = (props: AdminMainProps) => {
    const [data, setData] = useState({});
    const {appStore} = useContext(Context);

    const sendRequest = () => {
        appStore.authRequest({
            url: appStore.backEnd.apiServiceControllerGetExample,
            method: "GET"
        }).then(res => console.log(res)).catch(e => console.log(e));
    }

    const logout = ():void => {
        appStore.simpleRequest({
            url: appStore.backEnd.authApiLogoutUrl,
            method: "POST",
            data: {
                token: appStore.token,
            }
        }).then(res => console.log("RES: ", res)).catch(e => console.log("Error: ", e));
    }

    function unAuth() {
        appStore.setToken(appStore.token + "222");
        sendRequest();
    }

    return (
        <Container>
            <h1>AdminMain</h1>

            <Button onClick={() => sendRequest()}>getAuthApi</Button>
            <Button variant={"dark"} onClick={() => unAuth()}>unAuth</Button>
            <Button variant={"danger"} onClick={() => logout()}>logout</Button>
        </Container>
    )
}

export default AdminMain