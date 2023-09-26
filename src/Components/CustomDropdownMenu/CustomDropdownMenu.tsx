import React from 'react';
import './CustomDropdownMenu.scss';
import {Container, Dropdown} from "react-bootstrap";
import LinkInterface from "../../Interfaces/LinkInterface";
import NodeInterface from "../../Interfaces/NodeInterface";
import CustomDropdownItem from "../CustomDropdownItem/CustomDropdownItem";

interface CustomDropdownMenuInterface {
    menu: NodeInterface
    name: string
    onLinkClick: () => void
}

const CustomDropdownMenu = (props: CustomDropdownMenuInterface) => {
    return (
        <Container fluid className={`CustomDropdownMenu p-0`}>
            <Dropdown>
                <Container fluid className={`p-0`}>
                    <Dropdown.Toggle
                        className={`CustomDropdownMenu__toggle`}
                        variant={`dark`}
                    >
                        {props.name}
                    </Dropdown.Toggle>
                </Container>
                <Dropdown.Menu className={`CustomDropdownMenu__menu`}>
                    {props.menu.urls.map((value, index) => {
                            if (value.url != '*') return (
                                <CustomDropdownItem
                                    key = {index}
                                    value={value}
                                    to={props.menu.node + (!!value.index ? '' : value.url)}
                                    onLinkClick={props.onLinkClick}
                                />
                            );
                        }
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    );
}

export default CustomDropdownMenu