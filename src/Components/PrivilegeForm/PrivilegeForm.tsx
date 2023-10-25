import React from 'react';
import './PrivilegeForm.scss';
import {Button, Container, Form} from "react-bootstrap";
import Privilege from "../../Solid/Entities/Privilege";
import {useForm} from "react-hook-form";
import AddPrivilegeForm from "../AddPrivilegeForm/AddPrivilegeForm";

interface PrivilegeFormProps {
    privilege: Privilege
    applyButtonFunction?: () => Promise<any>
}

const PrivilegeForm = (props: PrivilegeFormProps) => {
    const minLength = 3;

    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors},
    } = useForm<Privilege>({})

    const buttonClickHandler = (data: Privilege):void => {
        updatePropsPrivilege(data);
        !!props.applyButtonFunction && props.applyButtonFunction();
    }

    const updatePropsPrivilege = (privilege: Privilege): void => {
        props.privilege.code = privilege.code.toUpperCase();
        props.privilege.name = privilege.name.toUpperCase();
        props.privilege.description = privilege.description.toUpperCase();
    }

    return (
        <Container fluid className={`PrivilegeForm`}>
            <Form>
                <Form.Group className={`PrivilegeForm__group`} controlId="formCode">
                    <Form.Control
                        type="text"
                        placeholder="code"
                        defaultValue={!!props.privilege && !!props.privilege.code ? props.privilege.code : ""}
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
                            className={`PrivilegeForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.code.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className={`PrivilegeForm__group`} controlId="formName">
                    <Form.Control
                        type="text"
                        placeholder="name"
                        defaultValue={!!props.privilege && !!props.privilege.name ? props.privilege.name : ""}
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
                            className={`PrivilegeForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.name.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className={`PrivilegeForm__group`} controlId="formDescription">
                    <Form.Control
                        type="text"
                        placeholder="description"
                        defaultValue={!!props.privilege && !!props.privilege.description ? props.privilege.description : ""}
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
                            className={`PrivilegeForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.description.message}
                        </Form.Text>
                    )}
                </Form.Group>

                {!!props.applyButtonFunction && (
                    <Form.Group className={`PrivilegeForm__buttonCont`} controlId={`formBasicButton`}>
                        <Button
                            className={`PrivilegeForm__button`}
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

export default PrivilegeForm;