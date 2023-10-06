import React, {useContext} from 'react';
import './TestPage.scss';
import {Button, Container} from "react-bootstrap";
import axios, {AxiosRequestConfig} from "axios";
import {Context} from "../../index";
import AuthRequestInterface from "../../Interfaces/AuthRequestInterface";

interface TestPageInterface {}

const TestPage = (props: TestPageInterface) => {
    const {appStore} = useContext(Context)

    const request = async (axiosRequestConfig: AxiosRequestConfig):Promise<any> => {
        const res = await appStore.apiService.request(axiosRequestConfig);
        console.log(res);
    }

    const getRequest = ():void => {
        request({
            url: appStore.backEnd.authApiRootPoint,
            method: "GET"
        });
    }

    const checkTokenRequest = async ():Promise<any> => {
        const res = await appStore.apiService.checkToken(appStore.token);
        console.log(res);
    }

    const authenticate = async ():Promise<any> => {
        const authRequest :AuthRequestInterface = {
          username: 'user',
          password: 'user'
        };

        const res = await appStore.apiService.authenticate(authRequest);

        if (res.status == 200) {
            if (!!res.data.user) appStore.setUserData(res.data.user);
            if (!!res.data.token) appStore.setToken(res.data.token);
        }

        console.log(res)
    }

    const getUserData = ():void => {
        console.log({...appStore.userData});
        console.log(appStore.token);
    }

    return (
        <Container>
            <h1>TestPage</h1>
            <Container className={`pb-2`}>
                <h3 className={`w-100`}>Simple Get Request</h3>
                <Button
                    type={`button`}
                    variant={"info"}
                    onClick={() => getRequest()}
                >
                    Get Request
                </Button>
            </Container>
            <Container className={`pb-2`}>
                <h3 className={`w-100`}>Check Token Request</h3>
                <Button
                    type={`button`}
                    variant={"success"}
                    onClick={() => checkTokenRequest()}
                >
                    Check Token
                </Button>
            </Container>
            <Container className={`pb-2`}>
                <h3 className={`w-100`}>Auth Request</h3>
                <Button
                    type={`button`}
                    variant={"secondary"}
                    onClick={() => authenticate()}
                >
                    Authenticate
                </Button>
            </Container>
            <Container className={`pb-2`}>
                <h3 className={`w-100`}>Get UserData</h3>
                <Button
                    type={`button`}
                    variant={"dark"}
                    onClick={() => getUserData()}
                >
                    Get Userdata
                </Button>
            </Container>
        </Container>
    );
}

export default TestPage;