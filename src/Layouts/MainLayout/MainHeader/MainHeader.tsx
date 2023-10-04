import {Badge, Container, Dropdown, Navbar, Offcanvas} from "react-bootstrap";
import "./MainHeader.scss";
import {Icon} from "../../../Components/Icon";
import {useContext, useState} from "react";
import {Context} from "../../../index";
import CustomDropdownMenu from "../../../Components/CustomDropdownMenu/CustomDropdownMenu";
import {observer} from "mobx-react";

interface MainHeaderInterface {
}

const MainHeader = (props: MainHeaderInterface) => {
    const [ddMenu, setDdMenu] = useState<boolean>(false);
    const {appStore} = useContext(Context);

    const linkClickHandler = ():void => {
        setDdMenu(false);
    }

    return (
        <Container fluid className="MainHeader p-0">
            <Navbar
                className={`MainHeader__navbar justify-content-between align-items-center`}
            >
                <Icon
                    iconName={"Stack"}
                    color={'#495057'}
                    size={50}
                    className={"MainHeader__icon"}
                    onClick={() => setDdMenu(true)}
                />
                <h1 className={"m-0"}>
                    <Badge bg={'none'} className={"MainHeader__badge"}>AppHeader</Badge>
                </h1>
            </Navbar>

            <Offcanvas
                show={ddMenu}
                onHide={() => setDdMenu(false)} {...props}
                id={`customCanvas`}
                key={appStore.linksVersion}
            >
                <Offcanvas.Header className={`customCanvas__header`} closeButton>
                    <Offcanvas.Title className={`customCanvas__title`}>Менюшечко</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={`customCanvas__body`}>
                    {appStore.clientLinks.map(route =>
                        <CustomDropdownMenu
                            key={route.authType}
                            menu={route}
                            name={route.group}
                            onLinkClick={() => linkClickHandler()}
                        />
                    )}
                    {/*<CustomDropdownMenu*/}
                    {/*    menu={appStore.routes.userLinks}*/}
                    {/*    name={'Пользовательские'}*/}
                    {/*    onLinkClick={() => linkClickHandler()}*/}

                    {/*/>*/}
                    {/*<CustomDropdownMenu*/}
                    {/*    menu={appStore.routes.adminLinks}*/}
                    {/*    name={'Авторизованные'}*/}
                    {/*    onLinkClick={() => linkClickHandler()}*/}
                    {/*/>*/}
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default observer(MainHeader);
