import React, {useContext} from 'react';
import './TestPage.scss';
import {Button, Container} from "react-bootstrap";
import axios, {AxiosRequestConfig} from "axios";
import {Context} from "../../index";

interface TestPageInterface {}

const TestPage = (props: TestPageInterface) => {
    const urlExample = 'https://fakestoreapi.com/productsQQQQ';
    const {appStore} = useContext(Context)

    const request = async (axiosRequestConfig: AxiosRequestConfig):Promise<any> => {
        const res = await appStore.apiService.simpleRequest(axiosRequestConfig);
        console.log(res);
    }

    const getRequest = ():void => {
        request({
            url: urlExample,
            method: "GET"
        });
    }

    return (
        <Container>
            <h1>TestPage</h1>
            <div className={`d-flex`}>
                <Button
                    type={`button`}
                    variant={"info"}
                    onClick={() => getRequest()}
                >
                    Get Request
                </Button>
            </div>
        </Container>
    );
}

export default TestPage;