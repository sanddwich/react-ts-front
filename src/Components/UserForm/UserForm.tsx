import React, {useContext, useState} from 'react';
import './UserForm.scss';
import {Button, Container, Form} from "react-bootstrap";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Loader from "../Loader/Loader";
import User from "../../Solid/Entities/User";
import {ChangeEvent} from "react/index";
import AddAccessRolesForm from "../AddAccessRolesForm/AddAccessRolesForm";

interface UserFormProps {
    user?: User
    buttonClickHandler: (user: User) => void
}

const UserForm = (props: UserFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {appStore} = useContext(Context);
    const navigate = useNavigate();
    const minLength: number = 3;
    const [passwordRepeatError, setPasswordRepeatError] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");
    const [active, setActive] = useState<boolean>(
        !!props.user && !!props.user.active ? props.user.active : true
    );

    const prKeyUpHandler = (val:string): void => {
        setPasswordRepeat(val);
        !!passwordRepeatError && setPasswordRepeatError("");
    }

    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors},
    } = useForm<User>({})

    const buttonClickHandler = (data: User) => {
        if (!!data.password && !!passwordRepeat && data.password !== passwordRepeat) {
            setPasswordRepeatError("Пароли не совпадают!");
            return;
        }

        const user: User = new User(
            !!props.user && !!props.user.id ? props.user.id : undefined,
            !!props.user && !!props.user.createdDate ? props.user.createdDate: new Date(),
            new Date(),
            data.name,
            data.surname,
            data.username,
            data.password,
            data.email,
            active,
            data.accessToken,
            !!props.user && !!props.user.accessRoles ? props.user.accessRoles : []
        );

        resetFields();
        props.buttonClickHandler(user);
    }

    const resetFields = (): void => {
        resetField('name')
        resetField('surname')
        resetField('username')
        resetField('email')
        resetField('password')
    }

    return (
        <Container fluid className={`UserForm`}>
            <Form>
                <Form.Group className={`UserForm__group`} controlId="formBasicTextName">
                    {/*<Form.Label className={`UserForm__label`}>Логин</Form.Label>*/}
                    <Form.Control
                        type="text"
                        placeholder="name"
                        defaultValue={!!props.user && !!props.user.name ? props.user.name : ""}
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
                    {errors.name && (
                        <Form.Text
                            className={`UserForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.name.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className={`UserForm__group`} controlId="formBasicTextSurname">
                    {/*<Form.Label className={`UserForm__label`}>Логин</Form.Label>*/}
                    <Form.Control
                        type="text"
                        placeholder="surname"
                        defaultValue={!!props.user && !!props.user.surname ? props.user.surname : ""}
                        {...register('surname', {
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
                    {errors.surname && (
                        <Form.Text
                            className={`UserForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.surname.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className={`UserForm__group`} controlId="formBasicTextUsername">
                    {/*<Form.Label className={`UserForm__label`}>Логин</Form.Label>*/}
                    <Form.Control
                        type="text"
                        placeholder="username"
                        defaultValue={!!props.user && !!props.user.username ? props.user.username : ""}
                        {...register('username', {
                            required: {value: true, message: 'Обязательное поле для заполнения'},
                            minLength: {
                                value: minLength,
                                message: 'Недостаточное кол-во символов. Минимальное: ' + minLength,
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9-_]+$/i,
                                message: 'Недопустимые символы. Доступн только латинские и цифры',
                            },
                        })}
                    />
                    {errors.username && (
                        <Form.Text
                            className={`UserForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.username.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className={`UserForm__group`} controlId="formBasicTextEmail">
                    {/*<Form.Label className={`UserForm__label`}>Логин</Form.Label>*/}
                    <Form.Control
                        type="text"
                        placeholder="email"
                        defaultValue={!!props.user && !!props.user.email ? props.user.email : ""}
                        {...register('email', {
                            required: {value: true, message: 'Обязательное поле для заполнения'},
                            minLength: {
                                value: minLength,
                                message: 'Недостаточное кол-во символов. Минимальное: ' + minLength,
                            },
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                message: 'Неверный email',
                            },
                        })}
                    />
                    {errors.email && (
                        <Form.Text
                            className={`UserForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.email.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className={`UserForm__group`} controlId="formBasicTextActive">
                    {/*<Form.Label className={`UserForm__label`}>Логин</Form.Label>*/}
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Активный"
                        checked={active}
                        onChange={() => setActive(!active)}
                    />
                </Form.Group>

                <Form.Group className={`UserForm__group`} controlId="formBasicPassword">
                    {/*<Form.Label className={`UserForm__label`}>Пароль</Form.Label>*/}
                    <Form.Control
                        type="password"
                        placeholder="password"
                    />
                    {errors.password && (
                        <Form.Text
                            className={`UserForm__muted text-muted`}
                            // onKeyUp={() => passwordKeyUpHandler()}
                        >
                            {errors.password.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className={`UserForm__group`} controlId="formBasicPasswordRepeat">
                    {/*<Form.Label className={`UserForm__label`}>Пароль</Form.Label>*/}
                    <Form.Control
                        type="password"
                        placeholder="password repeat"
                        onKeyUp={(event) => {
                            prKeyUpHandler((event.target as HTMLInputElement).value)
                        }}
                    />
                    {passwordRepeatError && (
                        <Form.Text
                            className={`UserForm__muted text-muted`}
                            // onKeyUp={() => passwordKeyUpHandler()}
                        >
                            {passwordRepeatError}
                        </Form.Text>
                    )}
                </Form.Group>
                
                <AddAccessRolesForm user={props.user} formAtForm={true} />

                <Form.Group className={`UserForm__buttonCont`} controlId={`formBasicButton`}>
                    {loading ? <Loader/> : (
                        <Button
                            className={`UserForm__button`}
                            variant="primary"
                            type="button"
                            onClick={handleSubmit((data) => buttonClickHandler(data))}
                        >
                            Применить
                        </Button>
                    )}
                </Form.Group>
            </Form>
        </Container>
    );
}

export default UserForm