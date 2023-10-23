import React, {useContext, useEffect, useState} from 'react';
import './AdminAccessRoles.scss';
import {Accordion, Badge, Button, Container, Form, Table} from "react-bootstrap";
import MessageComponent from "../../Components/MessageComponent/MessageComponent";
import FullScreenLoader from "../../Components/FullScreenLoader/FullScreenLoader";
import Loader from "../../Components/Loader/Loader";
import {AxiosResponse} from "axios";
import {Context} from "../../index";
import {Icon} from "../../Components/Icon";
import AccessRole from "../../Solid/Entities/AccessRole";
import UserForm from "../../Components/UserForm/UserForm";
import CustomModal from "../../Components/CustomModal/CustomModal";
import AccessRoleForm from "../../Components/AccessRoleForm/AccessRoleForm";
import Privilege from "../../Solid/Entities/Privilege";
import User from "../../Solid/Entities/User";
import {AddUpdateType} from "../../Interfaces/AddUpdateType";

interface AdminAccessRolesProps {
}

const AdminAccessRoles = (props: AdminAccessRolesProps) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const {appStore} = useContext(Context);
    const [accessRoleList, setAccessRoleList] = useState<Array<AccessRole>>([]);
    const [accessRole, setAccessRole] = useState<AccessRole>(AccessRole.getEmptyAccessRole());
    const [accessRoleForm, setAccessRoleForm] = useState<boolean>(false);
    const [deleteForm, setDeleteForm] = useState<boolean>(false);
    const [privilegesListBack, setPrivilegesListBack] = useState<Array<Privilege>>([]);
    const [formMode, setFormMode] = useState<AddUpdateType>("ADD");

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
                setAccessRoleList(res.data.accessRoles)
                appStore.setAccessRoles(res.data.accessRoles);
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const keyUpHandler = (val: string):void => {
        setSearch(val);
    }

    const searchClickHandler = async ():Promise<any> => {
        if (!!search && search.length > 2) {
            await searchAccessRoles(search);
        } else {
            await getAllData();
        }
    }

    const addFromActivate = (): void => {
        setAccessRole(AccessRole.getEmptyAccessRole());
        setFormMode("ADD");
        setAccessRoleForm(true);
    }
    
    const updateFromActivate = (role: AccessRole): void => {
        setAccessRole(role);
        setFormMode("UPDATE");
        setPrivilegesListBack(role.privileges.slice(0));
        setAccessRoleForm(true);
    }

    const deleteFromActivate = (role: AccessRole): void => {
        setAccessRole(role);
        setDeleteForm(true);
    }

    const applyAccessRoleFormClick = (role: AccessRole) => {

    }

    const applyUpdateAccessRole = async ():Promise<any> => {
        setAccessRoleForm(false);
        setLoader(true);

        if (!!accessRole && formMode == "UPDATE") {
            await updateAccessRole(AccessRole.toUppercaseAccessRoleData(accessRole));
        } else if (!!accessRole && formMode == "ADD") {
            await addAccessRole(AccessRole.toUppercaseAccessRoleData(accessRole));
        }

        await getAllData();
        setLoader(false);
    }

    const applyDeleteAccessRole = async ():Promise<any> => {
        if (!!accessRole) {
            setDeleteForm(false);
            setLoader(true);
            await deleteAccessRole(accessRole);
            await getAllData();
            setLoader(false);
        }
    }

    const onCloseDeleteModalHandler = ():void => {
        setDeleteForm(false);
    }

    function onCloseAccessRoleFormHandler() {
        accessRole.privileges = privilegesListBack;
        setAccessRoleForm(false);
    }

    const addAccessRole = async (accessRole: AccessRole): Promise<AxiosResponse> => {
        const res = await appStore.restApiAccessRoleController.create(appStore.token, accessRole);
        if (!!res.status) {
            if (res.status == 200) {
                showSuccess("Новая роль '" + accessRole.code + "' создана!");
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const updateAccessRole = async (accessRole: AccessRole): Promise<AxiosResponse> => {
        const res = await appStore.restApiAccessRoleController.update(appStore.token, accessRole);
        if (!!res.status) {
            if (res.status == 200) {
                showSuccess("Роль '" + accessRole.code + "' обновлена!");
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const deleteAccessRole = async(accessRole: AccessRole): Promise<any> => {
        const res = await appStore.restApiAccessRoleController.delete(appStore.token, accessRole);
        if (!!res.status) {
            if (res.status == 200) {
                showWarning("Роль '" + accessRole.code + "' удалена!");
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const searchAccessRoles = async (val: string): Promise<any> => {
        const res = await appStore.restApiAccessRoleController.find(appStore.token, val);
        if (!!res.status) {
            if (res.status == 200) {
                if (!!res.data.accessRoles.length) {
                    setAccessRoleList(res.data.accessRoles);
                } else {
                    setAccessRoleList([]);
                    showWarning("Ролей по указанному запросу не найдено!")
                }
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    return (
        <Container fluid className={`AdminAccessRoles`}>
            <CustomModal
                title={"Роль"}
                show={accessRoleForm}
                handleClose={() => onCloseAccessRoleFormHandler()}
                keyboard={false}
            >
                <AccessRoleForm
                    accessRole={accessRole}
                    applyButtonFunction={applyUpdateAccessRole}
                />
            </CustomModal>

            <CustomModal
                title={`Удаление роли`}
                show={deleteForm}
                handleClose={() => onCloseDeleteModalHandler()}
                keyboard={false}
                applyButtonFunction={applyDeleteAccessRole}
            >
                <p>
                    {`Вы действительно хотите удалить роль 
                    ${accessRole.code}?`}
                </p>
            </CustomModal>

            {loader ? (
                <FullScreenLoader>
                    <Loader/>
                </FullScreenLoader>
            ) : (
                <>
                    <h3>Работа с ролями:</h3>
                    {!!error && <MessageComponent message={error} variant={"danger"}/>}
                    {!!success && <MessageComponent message={success} variant={"success"}/>}
                    {!!warning && <MessageComponent message={warning} variant={"warning"}/>}

                    <Container fluid className={`AdminAccessRoles__search p-0 d-flex align-items-end`}>
                        <Form.Group className={`AdminAccessRoles__group`} controlId="formUsernames">
                            <Form.Label className={`AdminAccessRoles__label`}>Поиск</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите текст"
                                className={`AdminAccessRoles__searchTextField`}
                                onKeyUp={(event) => {
                                    keyUpHandler((event.target as HTMLInputElement).value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className={`AdminAccessRoles__group`} controlId="actionButtons">
                            <Button
                                variant={"secondary"}
                                className={`AdminAccessRoles__button`}
                                onClick={() => searchClickHandler()}
                            >
                                <Icon className={`AdminAccessRoles__buttonImg`} iconName={"Search"} />
                                Поиск
                            </Button>
                            <Button
                                variant={"primary"}
                                className={`AdminAccessRoles__button`}
                                onClick={() => addFromActivate()}
                            >
                                <Icon className={`AdminAccessRoles__buttonImg`} iconName={"PersonFillAdd"} />
                                Добавить новую роль
                            </Button>
                        </Form.Group>
                    </Container>

                    {!!accessRoleList.length
                        ? (
                            <Accordion defaultActiveKey="0">
                                {accessRoleList.map(role => (
                                    <Accordion.Item key={role.id} eventKey={role.code}>
                                        <Accordion.Header
                                            className={`AdminAccessRoles__headers`}
                                        >
                                            {`${role.code}`}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <tbody>
                                                <tr>
                                                    <td>Role Code</td>
                                                    <td>{!!role.code && role.code}</td>
                                                </tr>
                                                <tr>
                                                    <td>Role Name</td>
                                                    <td>{!!role.name && role.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Role Description</td>
                                                    <td>{!!role.description && role.description}</td>
                                                </tr>
                                                <tr>
                                                    <td>Actions</td>
                                                    <td>
                                                        <Button
                                                            className={`AdminAccessRoles__button`}
                                                            variant={"primary"}
                                                            onClick={() => updateFromActivate(role)}
                                                        >
                                                            Изменить
                                                        </Button>
                                                        <Button
                                                            className={`AdminAccessRoles__button`}
                                                            variant={"danger"}
                                                            onClick={() => deleteFromActivate(role)}
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
                        )
                        : (
                            <p className={`text-danger`}>Ролей не найдено</p>
                        )
                    }
                </>
            )}
        </ Container>
    );
}

export default  AdminAccessRoles;