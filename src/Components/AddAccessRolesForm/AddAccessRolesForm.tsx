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
    buttonClickHandler: (accessRoles: AccessRole[]) => void
}

const AddAccessRolesForm = (props: AddAccessRolesFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {appStore} = useContext(Context);
    const [roles, setRoles] = useState<Array<AccessRole>>(
        !!props.user && !!props.user.accessRoles ? props.user.accessRoles : []
    );
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        console.log(roles);
    }, [])

    const buttonClickHandler = () => {
        console.log(roles);
    }

    const keyUpHandler = (val:string):void => {
        setSearch(val);
    }

    return (
        <Container fluid className={`UserForm`}>
            <Form>
                <Form.Group className={`UserForm__group`} controlId="formBasicTextName">
                    {/*<Form.Label className={`UserForm__label`}>Логин</Form.Label>*/}
                    <Form.Control
                        type="text"
                        placeholder="name"
                        onKeyUp={(event) => {
                            keyUpHandler((event.target as HTMLInputElement).value)
                        }}
                    />
                </Form.Group>

                <Form.Group className={`UserForm__group`} controlId="formBasicTextName">
                    <Container fluid className={`UserForm__Roles p-0 d-flex`}>
                        {roles.map((role) => (
                            <CustomBadge key={role.code} showImg={"right"} title={role.name}/>
                        ))}
                    </Container>
                </Form.Group>

                <Form.Group className={`UserForm__buttonCont`} controlId={`formBasicButton`}>
                {loading ? <Loader/> : (
                    <Button
                        className={`UserForm__button`}
                        variant="primary"
                        type="button"
                        onClick={() => buttonClickHandler()}
                    >
                        Применить
                    </Button>
                )}
                </Form.Group>
            </Form>
        </Container>
    );
}

export default AddAccessRolesForm;