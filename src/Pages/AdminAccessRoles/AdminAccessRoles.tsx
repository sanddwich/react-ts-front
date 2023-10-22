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

interface AdminAccessRolesProps {
}

const AdminAccessRoles = (props: AdminAccessRolesProps) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const {appStore} = useContext(Context);
    const [accessRole, setAccessRole] = useState<AccessRole>(AccessRole.getEmptyAccessRole());
    const [accessRoleForm, setAccessRoleForm] = useState<boolean>(false);
    const [deleteForm, setDeleteForm] = useState<boolean>(false);
    const [privilegesListBack, setPrivilegesListBack] = useState<Array<Privilege>>([]);

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

    const searchClickHandler = (): void => {

    }

    const addUserButtonClickHandler = (): void => {

    }
    
    const updateFromActivate = (role: AccessRole): void => {
        setAccessRole(role);
        setPrivilegesListBack(role.privileges.slice(0));
        setAccessRoleForm(true);
    }

    const deleteFromActivate = (role: AccessRole): void => {
        setAccessRole(role);
    }

    const applyAccessRoleFormClick = (role: AccessRole) => {

    }

    function onCloseAccessRoleFormHandler() {
        accessRole.privileges = privilegesListBack;
        setAccessRoleForm(false);
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
                    buttonFunction={applyAccessRoleFormClick}
                />
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
                                onClick={() => addUserButtonClickHandler()}
                            >
                                <Icon className={`AdminAccessRoles__buttonImg`} iconName={"PersonFillAdd"} />
                                Добавить новую роль
                            </Button>
                        </Form.Group>
                    </Container>

                    {!!appStore.accessRoles.length
                        ? (
                            <Accordion defaultActiveKey="0">
                                {appStore.accessRoles.map(role => (
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