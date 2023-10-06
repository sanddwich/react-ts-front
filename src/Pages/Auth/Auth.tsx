import React, {useContext, useEffect, useState} from 'react';
import './Auth.scss';
import {Button, Container, Form} from "react-bootstrap";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthRequestInterface from "../../Interfaces/AuthRequestInterface";
import {observer} from "mobx-react";
import ErrorComponent from "../../Components/ErrorComponent/ErrorComponent";
import {Context} from "../../index";

interface AuthInterface {
}

const Auth = (props: AuthInterface) => {
    const {appStore} = useContext(Context);

    const buttonClickHandler = (authData: AuthRequestInterface): void => {
        // console.log(authData);
    }

    return (
        <Container
            fluid
            className={`Auth p-0`}
        >
            <AuthForm buttonClickHandler={buttonClickHandler}/>
        </Container>
    );
}

export default observer(Auth);