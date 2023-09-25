import React from 'react';
import './Auth.scss';
import {Container} from "react-bootstrap";

interface AuthInterface {}

const Auth = (props: AuthInterface) => {
    return (
        <Container fluid className={`Auth p-0`}>Auth</Container>
    );
}

export default Auth;