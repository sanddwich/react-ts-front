import {useContext, useState} from "react";
import "./Main.scss";
import {Container, Button, Badge} from "react-bootstrap";
import axios from "axios";
import {Context} from "../../index";
import {observer} from "mobx-react";

interface MainInterface {
}

const Main = (props: MainInterface) => {
    return (
        <Container fluid>Main</Container>
    );
};

export default observer(Main);
