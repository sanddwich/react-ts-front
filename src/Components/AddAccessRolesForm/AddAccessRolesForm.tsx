import React, {useContext, useEffect, useState} from 'react';
import './AddAccessRolesForm.scss';
import User from "../../Solid/Entities/User";
import {Button, Container, Form} from "react-bootstrap";
import Loader from "../Loader/Loader";
import {useForm} from "react-hook-form";
import AccessRole from "../../Solid/Entities/AccessRole";
import {Context} from "../../index";
import CustomBadge from "../CustomBadge/CustomBadge";

interface AddAccessRolesFormProps {
    user?: User
    buttonClickHandler?: (user: User | undefined) => void
    formAtForm?: boolean
}

const AddAccessRolesForm = (props: AddAccessRolesFormProps) => {
    const [formAtForm, setFormAtForm] = useState<boolean>(!!props.formAtForm);
    const [loading, setLoading] = useState<boolean>(false);
    const {appStore} = useContext(Context);
    const [userRoles, setUserRoles] = useState<Array<AccessRole>>(() => {
            if (!!props.user && !!props.user.accessRoles) return props.user.accessRoles;
            return [];
        }
    );
    const [additionalRoles, setAdditionalRoles] = useState<Array<AccessRole>>(() => {
        let res = appStore.accessRoles;
        userRoles.map(role => {
            res = res.filter(f => f.code !== role.code);
        });
        return sorting(res);
    });
    const [addRolesPool, setAddRolesPool] = useState<Array<AccessRole>>(() => {
        return additionalRoles;
    });
    const [search, setSearch] = useState<string>("");

    function sorting(arr: Array<AccessRole>): Array<AccessRole> {
        return arr.slice(0, 20).sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    const buttonClickHandler = () => {
        let user = undefined;
        if (!!props.user) {
            user = props.user;
            user.accessRoles = userRoles;
        }

        if (!!props.buttonClickHandler) props.buttonClickHandler(user);
    }

    const keyUpHandler = (val: string): void => {
        setSearch(val);
        if (!!val) {
            setAdditionalRoles(addRolesPool.filter(role => (
                role.code.toUpperCase().indexOf(val.toUpperCase()) > -1
                || role.name.toUpperCase().indexOf(val.toUpperCase()) > -1
                || role.description.toUpperCase().indexOf(val.toUpperCase()) > -1
            )));
        } else {
            setAdditionalRoles(addRolesPool);
        }
    }

    const addRoleClickHandler = (role: AccessRole): void => {
        setAdditionalRoles(
            sorting(additionalRoles.filter(el => el.code !== role.code))
        );
        userRoles.push(role);
        setUserRoles(userRoles);
    }

    const userRoleClickHandler = (role: AccessRole): void => {
        setUserRoles(
            userRoles.filter(el => el.code !== role.code)
        );
        additionalRoles.push(role);
        setAdditionalRoles(sorting(additionalRoles));
    }

    return (
        <Container fluid className={`AddAccessRolesForm`}>
            {/*<Form>*/}
            <Form.Group className={`AddAccessRolesForm__group`} controlId="formRoleCodes">
                <Form.Label className={`AddAccessRolesForm__label`}>Логин</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите код роли"
                    onKeyUp={(event) => {
                        keyUpHandler((event.target as HTMLInputElement).value)
                    }}
                />
            </Form.Group>

            <Form.Group className={`AddAccessRolesForm__listRoles`}>
                <Form.Label className={`AddAccessRolesForm__label`}>Доступные роли:</Form.Label>
                {additionalRoles.map(role => (
                    <Container key={role.id} className={`AddAccessRolesForm__addRole`}>
                        <Form.Check // prettier-ignore
                            type={"checkbox"}
                            id={`${role.id}`}
                            label={`${role.name}`}
                            onClick={() => addRoleClickHandler(role)}
                        />
                    </Container>
                ))}
            </Form.Group>

            <Form.Group className={`AddAccessRolesForm__userRolesList`} controlId="formAddedRoleCodes">
                <Form.Label className={`AddAccessRolesForm__label`}>Роли пользователя:</Form.Label>
                <Container fluid className={`AddAccessRolesForm__Roles p-0 d-flex`}>
                    {userRoles.map((role) => (
                        <div key={role.code} onClick={() => userRoleClickHandler(role)}>
                            <CustomBadge
                                showImg={"right"}
                                title={role.name}
                            />
                        </div>
                    ))}
                </Container>
            </Form.Group>

            {!formAtForm && (
                <Form.Group className={`AddAccessRolesForm__buttonCont`} controlId={`formBasicButton`}>
                    {loading ? <Loader/> : (
                        <Button
                            className={`AddAccessRolesForm__button`}
                            variant="primary"
                            type="button"
                            onClick={() => buttonClickHandler()}
                        >
                            Применить
                        </Button>
                    )}
                </Form.Group>
            )}

            {/*</Form>*/}
        </Container>
    );
}

export default AddAccessRolesForm;