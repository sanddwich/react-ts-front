import React from 'react';
import './CustomDropdownItem.scss';
import {Container, Dropdown} from "react-bootstrap";
import LinkInterface from "../../Interfaces/LinkInterface";
import {NavLink} from "react-router-dom";

interface CustomDropdownItemInterface {
    value: LinkInterface
    to: string
    onLinkClick: () => void
}

const CustomDropdownItem = (props: CustomDropdownItemInterface) => {
    return (
        <NavLink to={props.to}>
            <Container fluid className={`CustomDropdownItem p-0`}>
                <div className={`CustomDropdownItem__item`} onClick={props.onLinkClick}>
                    {props.value.title}
                </div>
            </Container>
        </NavLink>
    );
}

export default CustomDropdownItem