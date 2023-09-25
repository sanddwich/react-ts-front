import {Badge, Container, Dropdown, Navbar, Offcanvas} from "react-bootstrap";
import "./MainHeader.scss";
import {Icon} from "../../../Components/Icon";
import {useContext, useState} from "react";
import {Context} from "../../../index";
import {NavLink} from "react-router-dom";

interface MainHeaderInterface {
}

const MainHeader = (props: MainHeaderInterface) => {
    const [ddMenu, setDdMenu] = useState<boolean>(false);
    const {appStore} = useContext(Context);

    return (
        <Container fluid className="MainHeader p-0">
            <Navbar
                className={`bg-body-tertiary justify-content-between align-items-center`}
            >
                <Icon
                    iconName={"Stack"}
                    color={'#495057'}
                    size={50}
                    className={"MainHeader__icon"}
                    onClick={() => setDdMenu(true)}
                />
                <h1>
                    <Badge
                        bg="secondary"
                        className={"m-3"}
                    >AppHeader</Badge>
                </h1>
            </Navbar>

            <Offcanvas show={ddMenu} onHide={() => setDdMenu(false)} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Менюшечко</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <Dropdown>
                        <Container fluid>
                            <Dropdown.Toggle>Пользователь</Dropdown.Toggle>
                        </Container>
                        <Dropdown.Menu>
                            {appStore.routes.userLinks.urls.map((value, index) =>
                                <NavLink to={appStore.routes.userLinks.node + value.url}>
                                    <Dropdown.Item key={index}>{value.title}</Dropdown.Item>
                                </NavLink>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default MainHeader;
