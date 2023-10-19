import React, {useContext, useEffect, useState} from 'react';
import './AdminMain.scss';
import {Button, Card, Container} from "react-bootstrap";
import {Context} from "../../index";
import {NavLink} from "react-router-dom";

interface AdminMainProps {
}

const AdminMain = (props: AdminMainProps) => {
    const {appStore} = useContext(Context);


    return (
        <Container fluid className={`AdminMain`}>
            <h1>Административная панель</h1>
            <Container fluid className={`AdminMain__cards d-flex justify-content-start align-items-start`}>
                {appStore.routes.adminLinks.urls.map((route, index) => {
                    if (!!route.icon) return (
                        <Card key={index} className={`AdminMain__card`}>
                            <Card.Body>
                                <Container
                                    fluid
                                    className={`AdminMain__cardIcon d-flex justify-content-center align-items-center`}
                                >
                                    {route.icon}
                                </Container>

                                <Container
                                    fluid
                                    className={`AdminMain__cardTitle d-flex justify-content-center align-items-center`}
                                >
                                    <Card.Title>{route.title}</Card.Title>
                                </Container>


                                <Container
                                    fluid
                                    className={`AdminMain__cardButton d-flex justify-content-end align-items-center`}
                                >
                                    <NavLink
                                        to={appStore.routes.adminLinks.node + route.url}
                                    >
                                        <Button variant="primary">Перейти</Button>
                                    </NavLink>
                                </Container>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Container>
        </Container>
    )
}

export default AdminMain;