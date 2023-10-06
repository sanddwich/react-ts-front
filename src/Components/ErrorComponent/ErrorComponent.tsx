import React from 'react';
import './ErrorComponent.scss';
import {Alert, Container} from "react-bootstrap";

interface ErrorComponentProps {
    message: string
}

export default function ErrorComponent(props: ErrorComponentProps) {
    return (
        <Alert variant={"warning"}>
            {props.message}
        </Alert>
    );
}