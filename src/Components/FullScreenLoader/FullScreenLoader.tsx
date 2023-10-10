import React from 'react';
import './FullScreenLoader.scss'
import {Container} from "react-bootstrap";

interface FullScreenLoaderProps {
    children: JSX.Element
}

const FullScreenLoader = (props: FullScreenLoaderProps) => {
    return (
        <Container fluid className={`FullScreenLoader`}>
            {props.children}
        </Container>
    );
}

export default FullScreenLoader;