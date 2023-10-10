import React, {useContext, useEffect, useState} from 'react';
import './AdminUsers.scss';
import {Accordion, Button, Container, Modal, Table} from "react-bootstrap";
import {Context} from "../../index";
import Loader from "../../Components/Loader/Loader";
import MessageComponent from "../../Components/MessageComponent/MessageComponent";
import User from "../../Solid/Entities/User";
import FullScreenLoader from "../../Components/FullScreenLoader/FullScreenLoader";
import CustomModal from "../../Components/CustomModal/CustomModal";
import UserForm from "../../Components/UserForm/UserForm";

interface AdminUsersProps {
}

const AdminUsers = (props: AdminUsersProps) => {
    const [loader, setLoader] = useState<boolean>(true);
    const {appStore} = useContext(Context);
    const [error, setError] = useState<string>("");
    const [users, setUsers] = useState<Array<User>>([]);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError("");
        }, 5000);
    }

    useEffect(() => {
        appStore.restApiUserController.getAll(appStore.token)
            .then(res => {
                if (!!res.status && res.status == 200) {
                    console.log(res.data);
                    setUsers(res.data.users);
                    return;
                }

                showError("Проблема доступа к API");
            })
            .catch(e => console.warn("RequestApiError: ", e))
            .finally(() => setLoader(false));
    }, []);

    const updateUser = (user: User): void => {
        setLoader(true);
        appStore.restApiUserController.update(appStore.token, user)
            .then(res => {

            })
            .catch(e => console.warn("RequestApiError: ", e))
            .finally(() => setLoader(false));
    }

    function deleteUser(user: User) {

    }

    function updateButtonClick(user: User) {
        setUser(user);
        handleShow();
    }

    function deleteButtonClick(user: User) {

    }

    return (
        <Container fluid className={`AdminUsers`}>
            <CustomModal
                title={"Пользователь"}
                show={show}
                handleClose={() => setShow(false)}
                keyboard={false}
            >
                <UserForm user={user} />
            </CustomModal>

            {loader ? (
                <FullScreenLoader>
                    <Loader />
                </FullScreenLoader>
            ) : (
                <>
                    {!!error && <MessageComponent message={error} variant={"danger"}/>}
                    <h3>Работа с пользователями:</h3>
                    {!!users.length ? (
                        <Accordion defaultActiveKey="0">
                            {users.map(user => (
                                <Accordion.Item key={user.id} eventKey={user.username}>
                                    <Accordion.Header className={`AdminUsers__headers`}>{user.username}</Accordion.Header>
                                    <Accordion.Body>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>Username</td>
                                                    <td>{!!user.username && user.username}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{!!user.email && user.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{!!user.name && user.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Surname</td>
                                                    <td>{!!user.surname && user.surname}</td>
                                                </tr>
                                                <tr>
                                                    <td>CreateDate</td>
                                                    <td>{!!user.createdDate && String(user.createdDate)}</td>
                                                </tr>
                                                <tr>
                                                    <td>ModifiedDate</td>
                                                    <td>{!!user.modifiedDate && String(user.modifiedDate)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Active</td>
                                                    <td>{!!user.active && user.active}</td>
                                                </tr>
                                                <tr>
                                                    <td>Actions</td>
                                                    <td>
                                                        <Button
                                                            className={`AdminUsers__button`}
                                                            variant={"primary"}
                                                            onClick={() => updateButtonClick(user)}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            className={`AdminUsers__button`}
                                                            variant={"danger"}
                                                            onClick={() => deleteButtonClick(user)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    ) : (
                        <p className={`text-danger`}>Пользователи отсутствуют в БД</p>
                    )}
                </>
            )}
        </Container>
    );
}

export default AdminUsers