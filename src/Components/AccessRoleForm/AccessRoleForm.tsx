import React from 'react';
import './AccessRoleForm.scss';
import {Container, Form} from "react-bootstrap";
import AccessRole from "../../Solid/Entities/AccessRole";
import {useForm} from "react-hook-form";
import AddPrivilegeForm from "../AddPrivilegeForm/AddPrivilegeForm";

interface AccessRoleFormProps {
    accessRole: AccessRole
    buttonFunction: (accessRole: AccessRole) => void
}

const AccessRoleForm = (props: AccessRoleFormProps) => {
    const minLength = 3;

    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors},
    } = useForm<AccessRole>({})

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
                                value: /^[a-zA-Zа-яА-Я-_]+$/i,
                                message: 'Недопустимые символы. Доступн только латинские, кириллица и цифры',
                            },
                        })}
                    />
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
                                value: /^[a-zA-Zа-яА-Я-_]+$/i,
                                message: 'Недопустимые символы. Доступн только латинские, кириллица и цифры',
                            },
                        })}
                    />
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
                            }
                        })}
                    />
                </Form.Group>
                <AddPrivilegeForm accessRole={props.accessRole} />
            </Form>
        </Container>
    );
}

export default AccessRoleForm;