import React from 'react';
import './AccessRoleForm.scss';
import {Button, Container, Form} from "react-bootstrap";
import AccessRole from "../../Solid/Entities/AccessRole";
import {useForm} from "react-hook-form";
import AddPrivilegeForm from "../AddPrivilegeForm/AddPrivilegeForm";
import AddAccessRolesForm from "../AddAccessRolesForm/AddAccessRolesForm";
import Loader from "../Loader/Loader";

interface AccessRoleFormProps {
    accessRole: AccessRole
    applyButtonFunction?: () => Promise<any>
}

const AccessRoleForm = (props: AccessRoleFormProps) => {
    const minLength = 3;

    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors},
    } = useForm<AccessRole>({})

    const buttonClickHandler = (data: AccessRole):void => {
        updatePropsAccessRole(data);
        !!props.applyButtonFunction && props.applyButtonFunction();
    }

    const updatePropsAccessRole = (accessRole: AccessRole): void => {
        props.accessRole.code = accessRole.code;
        props.accessRole.name = accessRole.name;
        props.accessRole.description = accessRole.description;
    }

    return (
        <Container fluid className={`AccessRoleForm`}>
            <Form>
                <Form.Group className={`AccessRoleForm__group`} controlId="formCode">
                    <Form.Control
                        type="text"
                        placeholder="code"
                        defaultValue={!!props.accessRole && !!props.accessRole.code ? props.accessRole.code : ""}
                        {...register('code', {
                            required: {value: true, message: 'Обязательное поле для заполнения'},
                            minLength: {
                                value: minLength,
                                message: 'Недостаточное кол-во символов. Минимальное: ' + minLength,
                            },
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я0-9-_]+$/i,
                                message: 'Недопустимые символы. Доступны только латинские, кириллица и цифры',
                            },
                        })}
                    />
                    {errors.code && (
                        <Form.Text
                            className={`AccessRoleForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.code.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className={`AccessRoleForm__group`} controlId="formName">
                    <Form.Control
                        type="text"
                        placeholder="name"
                        defaultValue={!!props.accessRole && !!props.accessRole.name ? props.accessRole.name : ""}
                        {...register('name', {
                            required: {value: true, message: 'Обязательное поле для заполнения'},
                            minLength: {
                                value: minLength,
                                message: 'Недостаточное кол-во символов. Минимальное: ' + minLength,
                            },
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я0-9-_]+$/i,
                                message: 'Недопустимые символы. Доступны только латинские, кириллица и цифры',
                            },
                        })}
                    />
                    {errors.name && (
                        <Form.Text
                            className={`AccessRoleForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.name.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className={`AccessRoleForm__group`} controlId="formDescription">
                    <Form.Control
                        type="text"
                        placeholder="description"
                        defaultValue={!!props.accessRole && !!props.accessRole.description ? props.accessRole.description : ""}
                        {...register('description', {
                            required: {value: true, message: 'Обязательное поле для заполнения'},
                            minLength: {
                                value: minLength,
                                message: 'Недостаточное кол-во символов. Минимальное: ' + minLength,
                            },
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я0-9-_\s]+$/i,
                                message: 'Недопустимые символы. Доступны только латинские, кириллица и цифры',
                            },
                        })}
                    />
                    {errors.description && (
                        <Form.Text
                            className={`AccessRoleForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.description.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <AddPrivilegeForm accessRole={props.accessRole}/>

                {!!props.applyButtonFunction && (
                    <Form.Group className={`AccessRoleForm__buttonCont`} controlId={`formBasicButton`}>
                        <Button
                            className={`AccessRoleForm__button`}
                            variant="primary"
                            type="button"
                            onClick={handleSubmit((data) => buttonClickHandler(data))}
                        >
                            Применить
                        </Button>
                    </Form.Group>
                )}
            </Form>
        </Container>
    );
}

export default AccessRoleForm;