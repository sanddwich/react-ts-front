import React from 'react';
import './MessageComponent.scss';
import {Alert, AlertProps, Container} from "react-bootstrap";

interface MessageComponentProps {
    variant: string
    message: string
}

export default function MessageComponent(props: MessageComponentProps) {
    return (
        <Alert variant={props.variant}>
            {props.message}
        </Alert>
    );
}