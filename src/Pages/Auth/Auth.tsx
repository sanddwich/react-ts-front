import React from 'react';
import './Auth.scss';
import {Button, Container, Form} from "react-bootstrap";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthRequestInterface from "../../Interfaces/AuthRequestInterface";

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