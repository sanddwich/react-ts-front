import React, {useContext, useState} from 'react';
import './AuthForm.scss';
import {Button, Container, Form} from "react-bootstrap";
import AuthRequestInterface from "../../Interfaces/AuthRequestInterface";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom"
import {Context} from "../../index";
import Loader from "../Loader/Loader";

interface AuthFormInterface {
    buttonClickHandler: (authData: AuthRequestInterface) => void
}

const AuthForm = (props: AuthFormInterface) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {appStore} = useContext(Context);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors},
    } = useForm<AuthRequestInterface>({})

    const authorize = async (authData: AuthRequestInterface): Promise<boolean> => {
        const res = await appStore.apiService.authenticate(authData);
        if (res.status == 200) {
            appStore.authDefaultSettings(res.data.token);
            return true;
        }

        return false;
    }

    const minLength: number = 3;

    const resetFields = (): void => {
        resetField('username')
        resetField('password')
    }

    const buttonClickHandler = async (data: AuthRequestInterface):Promise<any> => {
        setLoading(true);
        const res = await authorize(data);
        if (!!res) navigate(appStore.routes.adminLinks.node);
        resetFields();
        setLoading(false);
    }

    return (
        <Container className={`AuthForm`}>
            <div className={`AuthForm__formName`}>Авторизашечко</div>
            <Form className={`AuthForm__form`}>
                <Form.Group className={`AuthForm__group`} controlId="formBasicText">
                    <Form.Label className={`AuthForm__label`}>Логин</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Логин"
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
                            className={`AuthForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {errors.username.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className={`AuthForm__group`} controlId="formBasicPassword">
                    <Form.Label className={`AuthForm__label`}>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        {...register('password', {
                            required: {value: true, message: 'Обязательное поле для заполнения'},
                            minLength: {
                                value: minLength,
                                message: 'Недостаточное кол-во символов. Минимальное: ' + minLength,
                            },
                        })}
                    />
                    {errors.password && (
                        <Form.Text
                            className={`AuthForm__muted text-muted`}
                            // onKeyUp={() => passwordKeyUpHandler()}
                        >
                            {errors.password.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className={`AuthForm__buttonCont`} controlId={`formBasicButton`}>
                    {loading ? <Loader/> : (
                        <Button
                            className={`AuthForm__button`}
                            variant="light"
                            type="button"
                            onClick={handleSubmit((data) => buttonClickHandler(data))}
                        >
                            Вход
                        </Button>
                    )}
                </Form.Group>
            </Form>
        </Container>
    );
}

export default AuthForm;