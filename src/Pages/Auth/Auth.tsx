import React, {useContext, useEffect, useState} from 'react';
import './Auth.scss';
import {Button, Container, Form} from "react-bootstrap";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthRequestInterface from "../../Interfaces/AuthRequestInterface";
import {observer} from "mobx-react";
import MessageComponent from "../../Components/MessageComponent/MessageComponent";
import {Context} from "../../index";

interface AuthInterface {
}

const Auth = (props: AuthInterface) => {
    const {appStore} = useContext(Context);
    const [error, setError] = useState<string>("");

    const showError = (message: string) => {
        // console.log(message);
        setError(message);
        setTimeout(() => {
            setError("");
        }, 5000);
    }

    return (
        <Container
            fluid
            className={`Auth p-0`}
        >
            <AuthForm showError={showError}/>
            <div className={`p-2`}></div>
            {!!error && <MessageComponent message={error} variant={"danger"}/>}
        </Container>
    );
}

export default observer(Auth);