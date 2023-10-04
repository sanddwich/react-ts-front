import "./App.scss";
import {Button, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from "./AppRoutes/AppRoutes";
import {useContext} from "react";
import {Context} from "./index";
import {observer} from "mobx-react";
import Loader from "./Components/Loader/Loader";

function App() {
    const {appStore} = useContext(Context)
    return (
        <>
            {appStore.initialize ? <Loader/> : (
                <Container fluid={true} className="App p-0">
                    <AppRoutes/>
                </Container>)
            }
        </>
    );
}

export default observer(App);
