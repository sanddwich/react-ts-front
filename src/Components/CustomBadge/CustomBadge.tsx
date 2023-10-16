import React from 'react';
import './CustomBadge.scss';
import {Icon} from "../Icon";
import {Container} from "react-bootstrap";
import AccessRole from "../../Solid/Entities/AccessRole";

interface CustomBadgeProps {
    showImg: "right" | "left"
    title: string
}

const CustomBadge = (props: CustomBadgeProps) => {
    return (
        <div className={`CustomBadge bg-primary`}>
            <div className={`CustomBadge__cont  d-inline-flex`}>
                {props.showImg == "left" && (
                    <div className={`CustomBadge__img`}>
                        <Icon iconName={"Trash3Fill"}/>
                    </div>
                )}
                <div className={`CustomBadge__title`}>
                    {props.title}
                </div>
                {props.showImg == "right" && (
                    <div className={`CustomBadge__img`}>
                        <Icon iconName={"Trash3Fill"}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomBadge;