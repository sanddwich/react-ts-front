import React, {JSX} from 'react';
import './IconButton.scss';
import {Container} from "react-bootstrap";

interface IconButtonProps {
    children: JSX.Element
    clickHandler: () => void
}

const IconButton = (props:IconButtonProps) => {
    return (
        <Container fluid className={`IconButton p-0`} onClick={() => props.clickHandler()}>
            {props.children}
        </Container>
    );
}

export default IconButton;