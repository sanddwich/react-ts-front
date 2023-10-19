import React, {useContext, useEffect, useState} from 'react';
import './AdminUsers.scss';
import {Accordion, Badge, Button, Container, Form, Modal, Table} from "react-bootstrap";
import {Context} from "../../index";
import Loader from "../../Components/Loader/Loader";
import MessageComponent from "../../Components/MessageComponent/MessageComponent";
import User from "../../Solid/Entities/User";
import FullScreenLoader from "../../Components/FullScreenLoader/FullScreenLoader";
import CustomModal from "../../Components/CustomModal/CustomModal";
import UserForm from "../../Components/UserForm/UserForm";
import {AxiosResponse} from "axios";
import {Icon} from "../../Components/Icon";
import {AddUpdateType} from "../../Interfaces/AddUpdateType";
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
    const [warning, setWarning] = useState<string>("");
    const [formMode, setFormMode] = useState<AddUpdateType>("ADD");
    const [userAccessRoleCopy, setUserAccessRoleCopy] = useState<Array<AccessRole>>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

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

    const showWarning = (message: string) => {
        setWarning(message);
        setTimeout(() => {
            setWarning("");
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
        if (formMode == "UPDATE") {
            await updateUserClickHandler(user);
            return;
        }

        if (formMode == "ADD") {
            await addUserClickHandler(user);
            return;
        }
    }

    const addUserClickHandler = async (user: User): Promise<any> => {
        handleClose();
        setLoader(true);
        await addUser(user);
        setLoader(false);
    }

    const updateUserClickHandler = async (user: User): Promise<any> => {
        handleClose();
        setLoader(true);
        await updateUser(user);
        setLoader(false);
    }

    const deleteButtonClickHandler = async (user: User):Promise<any> => {
        setShowDeleteModal(false);
        setLoader(true);
        await deleteUser(user);
        setLoader(false);
    }

    const searchClickHandler = async ():Promise<any> => {
        setLoader(true);
        await searchUsers(search);
        setSearch("");

        setLoader(false);
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

    const addUser = async (user: User): Promise<AxiosResponse> => {
        const res = await appStore.restApiUserController.create(appStore.token, user);
        if (!!res.status) {
            if (res.status == 200) {
                console.log(res.data);
                showSuccess("Новый пользователь '" + user.username + "' создан!");
                await getAllUsers();
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
                console.log(res.data);
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

    const deleteUser = async(user: User): Promise<any> => {
        const res = await appStore.restApiUserController.delete(appStore.token, user);
        if (!!res.status) {
            if (res.status == 200) {
                console.log(res.data);
                showWarning("Пользователь '" + user.username + "' удален!");
                await getAllUsers();
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const searchUsers = async (val: string): Promise<any> => {
        const res = await appStore.restApiUserController.find(appStore.token, val);
        if (!!res.status) {
            if (res.status == 200) {
                console.log(res.data);
                if (!!res.data.users.length) {
                    setUsers(res.data.users);
                } else {
                    setUsers([]);
                    showWarning("Пользователей по указанному запросу не найдено!")
                }
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    function updateUserButtonClickHandler(user: User) {
        setFormMode("UPDATE");
        setUser(user);
        setUserAccessRoleCopy(user.accessRoles.slice(0));
        handleShow();
    }

    const addUserButtonClickHandler = ():void => {
        setFormMode("ADD");
        setUser(new User(
            undefined,
            new Date(),
            new Date(),
            undefined,
            undefined,
            "",
            "",
            "",
            true,
            undefined,
            []
        ));
        setUserAccessRoleCopy([]);
        handleShow();
    }

    function deleteButtonClick(user: User) {
        setUser(user);
        setShowDeleteModal(true);
    }
    
    const keyUpHandler = (val: string):void => {
        setSearch(val);
    }

    const closeUserForm = ():void => {
        if (!!user?.accessRoles) user.accessRoles = userAccessRoleCopy;
        setShow(false);
    }

    const onCloseDeleteModal = ():void => {
        setShowDeleteModal(false);
    }

    const applyDeleteUser = ():void => {
        if (!!user) deleteButtonClickHandler(user)
            .finally();
    }

    return (
        <Container fluid className={`AdminUsers`}>
            <CustomModal
                title={"Пользователь"}
                show={show}
                handleClose={() => closeUserForm()}
                keyboard={false}
            >
                <UserForm
                    user={user}
                    buttonClickHandler={formButtonClickHandler}
                    formMode={formMode}
                />
            </CustomModal>

            <CustomModal
                title={`Удаление пользователя`}
                show={showDeleteModal}
                handleClose={onCloseDeleteModal}
                keyboard={false}
                applyButton={true}
                applyButtonFunction={applyDeleteUser}
            >
                <p>
                {`Вы действительно хотите удалить пользователя 
                ${user?.username} [${user?.email}]?`}
                </p>
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
                    {!!warning && <MessageComponent message={warning} variant={"warning"}/>}
                    <h3>Работа с пользователями:</h3>

                    <Container fluid className={`AdminUsers__search p-0 d-flex align-items-end`}>
                        <Form.Group className={`AdminUsers__group`} controlId="formUsernames">
                            <Form.Label className={`AdminUsers__label`}>Поиск по логину</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите часть логина пользователя"
                                className={`AdminUsers__searchTextField`}
                                onKeyUp={(event) => {
                                    keyUpHandler((event.target as HTMLInputElement).value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className={`AdminUsers__group`} controlId="actionButtons">
                            <Button
                                variant={"secondary"}
                                className={`AdminUsers__button`}
                                onClick={() => searchClickHandler()}
                            >
                                <Icon className={`AdminUsers__buttonImg`} iconName={"Search"} />
                                Поиск
                            </Button>
                            <Button
                                variant={"primary"}
                                className={`AdminUsers__button`}
                                onClick={() => addUserButtonClickHandler()}
                            >
                                <Icon className={`AdminUsers__buttonImg`} iconName={"PersonFillAdd"} />
                                Добавить нового пользователя
                            </Button>
                        </Form.Group>
                    </Container>

                    {!!users.length && (
                        <Accordion defaultActiveKey="0">
                            {users.map(user => (
                                <Accordion.Item key={user.id} eventKey={user.username}>
                                    <Accordion.Header
                                        className={`AdminUsers__headers`}
                                    >
                                        {`${user.username}:`}
                                        <i className={`AdminUsers__headersI`}>{`[${user.email}]`}</i>
                                        <div className={`AdminUsers__badge`}>
                                            {!!user.active
                                            ? (<Badge bg={"success"}>Активен</Badge>)
                                            : (<Badge bg={"danger"}>Не активен</Badge>)}
                                        </div>
                                    </Accordion.Header>
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
                                                <td>{!!user.active
                                                    ? (<Badge bg={"success"}>Активен</Badge>)
                                                    : (<Badge bg={"danger"}>Не активен</Badge>)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Actions</td>
                                                <td>
                                                    <Button
                                                        className={`AdminUsers__button`}
                                                        variant={"primary"}
                                                        onClick={() => updateUserButtonClickHandler(user)}
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