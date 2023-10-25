import React, {useContext, useEffect, useState} from 'react';
import './AdminPrivilege.scss';
import {Accordion, Button, Container, Form, Table} from "react-bootstrap";
import {Context} from "../../index";
import Privilege from "../../Solid/Entities/Privilege";
import {AddUpdateType} from "../../Interfaces/AddUpdateType";
import {AxiosResponse} from "axios";
import CustomModal from "../../Components/CustomModal/CustomModal";
import PrivilegeForm from "../../Components/PrivilegeForm/PrivilegeForm";
import FullScreenLoader from "../../Components/FullScreenLoader/FullScreenLoader";
import Loader from "../../Components/Loader/Loader";
import MessageComponent from "../../Components/MessageComponent/MessageComponent";
import {Icon} from "../../Components/Icon";

interface AdminPrivilegeProps {
}

const AdminPrivilege = (props: AdminPrivilegeProps) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const {appStore} = useContext(Context);
    const [privilegeList, setPrivilegeList] = useState<Array<Privilege>>([]);
    const [privilege, setPrivilege] = useState<Privilege>(Privilege.getEmptyPrivilege());
    const [privilegeFormVisible, setPrivilegeFormVisible] = useState<boolean>(false);
    const [deletePrivilegeFormVisible, setDeletePrivilegeFormVisible] = useState<boolean>(false);
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
        await getAllPrivileges();
        setLoader(false);
    }

    const getAllPrivileges = async (): Promise<AxiosResponse> => {
        const res = await appStore.restApiPrivilegeController.getAll(appStore.token)
        if (!!res.status) {
            if (res.status == 200) {
                appStore.setPrivileges(res.data.privileges);
                setPrivilegeList(res.data.privileges);
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const addPrivilege = async (privilege: Privilege): Promise<AxiosResponse> => {
        const res = await appStore.restApiPrivilegeController.create(appStore.token, privilege);
        if (!!res.status) {
            if (res.status == 200) {
                showSuccess("Новая привилегия '" + privilege.code + "' создана!");
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const updatePrivilege = async (privilege: Privilege): Promise<AxiosResponse> => {
        const res = await appStore.restApiPrivilegeController.update(appStore.token, privilege);
        if (!!res.status) {
            if (res.status == 200) {
                showSuccess("Привилегия '" + privilege.code + "' обновлена!");
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const deletePrivilege = async (privilege: Privilege): Promise<any> => {
        const res = await appStore.restApiPrivilegeController.delete(appStore.token, privilege);
        if (!!res.status) {
            if (res.status == 200) {
                showWarning("Привилегия '" + privilege.code + "' удалена!");
            }

            if (res.status == 404) {
                showError("Ошибка обращения API");
                !!res.data.error && console.warn("Ошибка обращения API: ", res.data.error);
            }
        }

        return res;
    }

    const searchPrivilege = async (val: string): Promise<any> => {
        const res = await appStore.restApiPrivilegeController.find(appStore.token, val);
        if (!!res.status) {
            if (res.status == 200) {
                if (!!res.data.privileges.length) {
                    setPrivilegeList(res.data.privileges);
                    setSearch("");
                } else {
                    setPrivilegeList([]);
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

    const onOpenPrivilegeFormHandler = (element: Privilege, formMode: AddUpdateType):void => {
        setPrivilege(element);
        setFormMode(formMode);
        setPrivilegeFormVisible(true);
    }

    const onClosePrivilegeFormHandler = ():void => {
        setPrivilegeFormVisible(false);
    }

    const onOpenDeletePrivilegeFormHandler = (element: Privilege):void => {
        setPrivilege(element);
        setDeletePrivilegeFormVisible(true);
    }

    const onCloseDeletePrivilegeFormHandler = ():void => {
        setDeletePrivilegeFormVisible(false);
    }

    const applyAddUpdatePrivilegeFormButton = async ():Promise<any> => {
        setPrivilegeFormVisible(false);
        setLoader(true);
        if (formMode == "ADD") {
            await addPrivilege(privilege);
        } else if (formMode == "UPDATE") {
            await updatePrivilege(privilege);
        }
        await getAllPrivileges();
        setLoader(false);
    }

    const applyDeletePrivilegeFormButton = async ():Promise<any> => {
        setDeletePrivilegeFormVisible(false);
        setLoader(true);
        await deletePrivilege(privilege);
        await getAllPrivileges();
        setLoader(false);
    }
    
    const keyUpHandler = (val: string):void => {
        setSearch(val);
    }
    
    const searchPrivilegeClickHandler = async (): Promise<any> => {
        setLoader(true);
        if (!!search && search.length > 2) {
            await searchPrivilege(search);
        } else {
            await getAllPrivileges();
        }
        setLoader(false);
    }

    return (
        <Container fluid className={`AdminPrivilege`}>
            <CustomModal
                title={"Роль"}
                show={privilegeFormVisible}
                handleClose={() => onClosePrivilegeFormHandler()}
                keyboard={false}
            >
                <PrivilegeForm
                    privilege={privilege}
                    applyButtonFunction={applyAddUpdatePrivilegeFormButton}
                />
            </CustomModal>

            <CustomModal
                title={`Удаление привилегии`}
                show={deletePrivilegeFormVisible}
                handleClose={() => onCloseDeletePrivilegeFormHandler()}
                keyboard={false}
                applyButtonFunction={applyDeletePrivilegeFormButton}
            >
                <p>
                    {`Вы действительно хотите удалить привилегию 
                    ${privilege.code}?`}
                </p>
            </CustomModal>

            {loader ? (
                <FullScreenLoader>
                    <Loader/>
                </FullScreenLoader>
            ) : (
                <>
                    <h3>Работа с привилегиями:</h3>
                    {!!error && <MessageComponent message={error} variant={"danger"}/>}
                    {!!success && <MessageComponent message={success} variant={"success"}/>}
                    {!!warning && <MessageComponent message={warning} variant={"warning"}/>}

                    <Container fluid className={`AdminPrivilege__search p-0 d-flex align-items-end`}>
                        <Form.Group className={`AdminPrivilege__group`} controlId="formUsernames">
                            <Form.Label className={`AdminPrivilege__label`}>Поиск</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите текст"
                                className={`AdminPrivilege__searchTextField`}
                                onKeyUp={(event) => {
                                    keyUpHandler((event.target as HTMLInputElement).value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className={`AdminPrivilege__group`} controlId="actionButtons">
                            <Button
                                variant={"secondary"}
                                className={`AdminPrivilege__button`}
                                onClick={() => searchPrivilegeClickHandler()}
                            >
                                <Icon className={`AdminPrivilege__buttonImg`} iconName={"Search"}/>
                                Поиск
                            </Button>
                            <Button
                                variant={"primary"}
                                className={`AdminPrivilege__button`}
                                onClick={() => onOpenPrivilegeFormHandler(
                                    Privilege.getEmptyPrivilege(),
                                    "ADD"
                                )}
                            >
                                <Icon className={`AdminPrivilege__buttonImg`} iconName={"PersonFillAdd"}/>
                                Добавить новую привилегию
                            </Button>
                        </Form.Group>
                    </Container>

                    {!!privilegeList.length
                        ? (
                            <Accordion defaultActiveKey="0">
                                {privilegeList.map(element => (
                                    <Accordion.Item key={element.id} eventKey={element.code}>
                                        <Accordion.Header
                                            className={`AdminPrivilege__headers`}
                                        >
                                            {`${element.code}`}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <tbody>
                                                <tr>
                                                    <td>Privilege Code</td>
                                                    <td>{!!element.code && element.code}</td>
                                                </tr>
                                                <tr>
                                                    <td>Privilege Name</td>
                                                    <td>{!!element.name && element.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Privilege Description</td>
                                                    <td>{!!element.description && element.description}</td>
                                                </tr>
                                                <tr>
                                                    <td>Actions</td>
                                                    <td>
                                                        <Button
                                                            className={`AdminPrivilege__button`}
                                                            variant={"primary"}
                                                            onClick={() => onOpenPrivilegeFormHandler(
                                                                element,
                                                                "UPDATE"
                                                            )}
                                                        >
                                                            Изменить
                                                        </Button>
                                                        <Button
                                                            className={`AdminPrivilege__button`}
                                                            variant={"danger"}
                                                            onClick={() => onOpenDeletePrivilegeFormHandler(element)}
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

export default AdminPrivilege;