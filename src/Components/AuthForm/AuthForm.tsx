import React, {useState} from 'react';
import './AuthForm.scss';
import {Button, Container, Form} from "react-bootstrap";
import AuthRequestInterface from "../../Interfaces/AuthRequestInterface";

interface AuthFormInterface {
    buttonClickHandler: (authData: AuthRequestInterface) => void
}

const AuthForm = (props: AuthFormInterface) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loginMute, setLoginMute] = useState<boolean>(false);
    const [passwordMute, setPasswordMute] = useState<boolean>(false);
    const [loginMuteText, setLoginMuteText] = useState<string>("Muted text Text.");
    const [passwordMuteText, setPasswordMuteText] = useState<string>("Muted text Password.");

    const buttonClickHandler = ():void => {

    }

    const loginKeyUpHandler = ():void => {

    }

    const passwordKeyUpHandler = ():void => {

    }

    const sendValidData = ():void => {
        props.buttonClickHandler({
            username, password
        });
    }

    return (
        <Container className={`AuthForm`}>
            <div className={`AuthForm__formName`}>Авторизашечко</div>
            <Form className={`AuthForm__form`}>
                <Form.Group className={`AuthForm__group`} controlId="formBasicText">
                    <Form.Label className={`AuthForm__label`}>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Логин"/>
                    {loginMute && (
                        <Form.Text
                            className={`AuthForm__muted text-muted`}
                            // onKeyUp={event => loginKeyUpHandler()}
                        >
                            {loginMuteText}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className={`AuthForm__group`} controlId="formBasicPassword">
                    <Form.Label className={`AuthForm__label`}>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль"/>
                    {passwordMute && (
                        <Form.Text
                            className={`AuthForm__muted text-muted`}
                            // onKeyUp={() => passwordKeyUpHandler()}
                        >
                            {passwordMuteText}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className={`AuthForm__buttonCont`} controlId={`formBasicButton`}>
                    <Button
                        className={`AuthForm__button`}
                        variant="light"
                        type="button"
                        onClick={() => buttonClickHandler()}
                    >
                        Вход
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default AuthForm;