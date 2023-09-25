import React from 'react';
import './Default.scss';
import {Container} from "react-bootstrap";

interface DefaultInterface {}

const Default = (props: DefaultInterface) => {
    return (
        <Container fluid className={`Default p-0`}>
            <h1>Default Page</h1>
        </Container>
    );
}

export default Default;