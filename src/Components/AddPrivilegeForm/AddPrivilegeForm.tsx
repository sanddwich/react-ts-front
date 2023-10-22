import React, {useContext, useEffect, useState} from 'react';
import './AddPrivilegeForm.scss';
import {Container, Form} from "react-bootstrap";
import AccessRole from "../../Solid/Entities/AccessRole";
import {Context} from "../../index";
import Privilege from "../../Solid/Entities/Privilege";
import CustomBadge from "../CustomBadge/CustomBadge";
import {Icon} from "../Icon";

interface AddPrivilegeFormProps {
    accessRole: AccessRole
}

const AddPrivilegeForm = (props: AddPrivilegeFormProps) => {
    const [search, setSearch] = useState<string>("");
    const {appStore} = useContext(Context);
    const filterRolePrivileges = ():Array<Privilege> => {
        let res = appStore.privileges;
        props.accessRole.privileges.map(priv => {
            res = res.filter(f => f.code !== priv.code);
        });
        return sorting(res);
    }
    const [additionalPrivileges, setAdditionalPrivileges] = useState<Array<Privilege>>(filterRolePrivileges());

    function sorting(arr: Array<Privilege>): Array<Privilege> {
        return arr.slice(0, 20).sort(function (a, b) {
            return a.code.localeCompare(b.code);
        });
    }

    useEffect(() => {
        console.log(additionalPrivileges);
    }, [])

    const keyUpHandler = (val: string): void => {
        setSearch(val);
        setAdditionalPrivileges(filter(val));
    }

    const filter = (val: string):Array<Privilege> => {
        return sorting(filterSearch(filterRolePrivileges(), val));
    }

    const filterSearch = (arr: Array<Privilege>, val:string):Array<Privilege> => {
        return arr.filter(priv => (
                priv.code.toUpperCase().indexOf(val.toUpperCase()) > -1
                || priv.name.toUpperCase().indexOf(val.toUpperCase()) > -1
                || priv.description.toUpperCase().indexOf(val.toUpperCase()) > -1
            )
        )
    }

    function addPrivilegeClickHandler(priv: Privilege) {
        props.accessRole.privileges.push(priv);
        setAdditionalPrivileges(filter(search));
    }

    function rolePrivilegesClickHandler(priv: Privilege) {
        props.accessRole.privileges = props.accessRole.privileges.filter(el => el.code !== priv.code);
        setAdditionalPrivileges(filter(search));
    }

    return (
        <Container fluid className={`AddPrivilegeForm`}>
            <Form.Group className={`AddPrivilegeForm__group`} controlId="formRoleCodes">
                <Form.Label className={`AddPrivilegeForm__label`}>Поиск привилегий</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите код привилегии"
                    onKeyUp={(event) => {
                        keyUpHandler((event.target as HTMLInputElement).value)
                    }}
                />
            </Form.Group>

            <Form.Group className={`AddPrivilegeForm__listRoles`}>
                <Form.Label className={`AddPrivilegeForm__label`}>Доступные привилегии:</Form.Label>
                {additionalPrivileges.map(priv => (
                    <Container key={priv.id} className={`AddPrivilegeForm__addRole`}>
                        <Form.Check // prettier-ignore
                            type={"checkbox"}
                            id={`${priv.id}`}
                            label={`${priv.name}`}
                            onClick={() => addPrivilegeClickHandler(priv)}
                        />
                    </Container>
                ))}
            </Form.Group>

            <Form.Group className={`AddPrivilegeForm__userRolesList`} controlId="formAddedRoleCodes">
                <Form.Label className={`AddPrivilegeForm__label`}>Привилегии роли:</Form.Label>
                <Container fluid className={`AddPrivilegeForm__Roles p-0 d-flex`}>
                    {props.accessRole.privileges.map((priv) => (
                        <div key={priv.code} onClick={() => rolePrivilegesClickHandler(priv)}>
                            <CustomBadge
                                showImg={"right"}
                                title={priv.name}
                                icon={<Icon iconName={"Trash3Fill"}/>}
                            />
                        </div>
                    ))}
                </Container>
            </Form.Group>
        </Container>
    );
}

export default AddPrivilegeForm;