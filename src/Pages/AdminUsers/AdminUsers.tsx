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
import {AxiosResponse} from "axios";
import AddAccessRolesForm from "../../Components/AddAccessRolesForm/AddAccessRolesForm";
import AccessRole from "../../Solid/Entities/AccessRole";

interface AdminUsersProps {
}

const AdminUsers = (props: AdminUsersProps) => {
    const [loader, setLoader] = useState<boolean>(true);
    const {appStore} = useContext(Context);
    const [error, setError] = useState<string>("");
    const [users, setUsers] = useState<Array<User>>([]);
    const [show, setShow] = useState(false);
    const [accessRolesModal, setAccessRolesModal] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [success, setSuccess] = useState<string>("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError("");
        }, 5000);
    }

    const showSuccess = (message: string) => {
        setSuccess(message);
        setTimeout(() => {
            setSuccess("");
        }, 5000);
    }

    useEffect(() => {
        getAllData()
            .then()
            .catch(e => console.warn("getAllData ERROR: ", e))
            .finally()
    }, []);

    const getAllData = async (): Promise<any> => {
        setLoader(true);
        await getAllUsers();
        await getAllAccessRoles();
        await getAllPrivileges();
        setLoader(false);
    }

    const getAllPrivileges = async (): Promise<AxiosResponse> => {
        const res = await appStore.restApiPrivilegeController.getAll(appStore.token)
        if (!!res.status) {
            if (res.status == 200) {
                appStore.setPrivileges(res.data.privileges);
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const getAllAccessRoles = async (): Promise<AxiosResponse> => {
        const res = await appStore.restApiAccessRoleController.getAll(appStore.token);
        if (!!res.status) {
            if (res.status == 200) {
                appStore.setAccessRoles(res.data.accessRoles);
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const formButtonClickHandler = async (user: User): Promise<any> => {
        handleClose();
        setLoader(true);
        await updateUser(user);
        setLoader(false);
    }

    const accessRolesFormButtonClickHandler = async (user: User | undefined): Promise<any> => {
        setAccessRolesModal(false);

        if (!!user) {
            setLoader(true);
            await updateUser(user);
            setLoader(false);
        } else {
            setError("Ошибка обновления ролей пользователя!");
        }
    }

    const getAllUsers = async (): Promise<AxiosResponse> => {
        const res = await appStore.restApiUserController.getAll(appStore.token);
        if (!!res.status) {
            if (res.status == 200) {
                setUsers(res.data.users);
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const updateUser = async (user: User): Promise<AxiosResponse> => {
        const res = await appStore.restApiUserController.update(appStore.token, user);
        if (!!res.status) {
            if (res.status == 200) {
                showSuccess("Пользователь '" + user.username + "' обновлен!");
                await getAllUsers();
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    function deleteUser(user: User) {

    }

    function addRolesButtonClick(user: User) {
        setUser(user);
        setAccessRolesModal(true);
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
                <UserForm user={user} buttonClickHandler={formButtonClickHandler}/>
            </CustomModal>

            {/*<CustomModal*/}
            {/*    title={`Изменение ролей`}*/}
            {/*    show={accessRolesModal}*/}
            {/*    handleClose={() => setAccessRolesModal(false)}*/}
            {/*    keyboard={false}*/}
            {/*>*/}
            {/*    <AddAccessRolesForm*/}
            {/*        user={user}*/}
            {/*        buttonClickHandler={accessRolesFormButtonClickHandler}*/}
            {/*    />*/}
            {/*</CustomModal>*/}

            {loader ? (
                <FullScreenLoader>
                    <Loader/>
                </FullScreenLoader>
            ) : (
                <>
                    {!!error && <MessageComponent message={error} variant={"danger"}/>}
                    {!!success && <MessageComponent message={success} variant={"success"}/>}
                    <h3>Работа с пользователями:</h3>
                    {!!users.length && (
                        <Accordion defaultActiveKey="0">
                            {users.map(user => (
                                <Accordion.Item key={user.id} eventKey={user.username}>
                                    <Accordion.Header
                                        className={`AdminUsers__headers`}>{user.username}</Accordion.Header>
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
                                                        Изменить
                                                    </Button>
                                                    {/*<Button*/}
                                                    {/*    className={`AdminUsers__button`}*/}
                                                    {/*    variant={"info"}*/}
                                                    {/*    onClick={() => addRolesButtonClick(user)}*/}
                                                    {/*>*/}
                                                    {/*    Редактировать Роли*/}
                                                    {/*</Button>*/}
                                                    <Button
                                                        className={`AdminUsers__button`}
                                                        variant={"danger"}
                                                        onClick={() => deleteButtonClick(user)}
                                                    >
                                                        Удалить
                                                    </Button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )}
                </>
            )}
        </Container>
    );
}

export default AdminUsers