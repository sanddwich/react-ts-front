import React, {useContext, useState} from 'react';
import './Auth.scss';
import {Button, Container, Form} from "react-bootstrap";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthRequestInterface from "../../Interfaces/AuthRequestInterface";
import Loader from "../../Components/Loader/Loader";
import {AxiosResponse} from "axios";
import {observer} from "mobx-react";
import {Context} from "../../index";

interface AuthInterface {}

const Auth = (props: AuthInterface) => {

    const buttonClickHandler = (authData: AuthRequestInterface):void => {
        console.log(authData);
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

export default Auth;