import {useContext, useState} from "react";
import "./Main.scss";
import {Container, Button, Badge} from "react-bootstrap";
import axios from "axios";
import {Context} from "../../index";
import {observer} from "mobx-react";

interface MainInterface {
}

const Main = (props: MainInterface) => {
    const [details, setDetails] = useState(false);
    const {appStore} = useContext(Context);
    const [apiResponse, setApiResponse] = useState("");

    const apiGetTest = async () => {
        const url = appStore.backEnd.apiUrl + appStore.backEnd.authApiRootPoint;
        const response = await axios.get(url);

        if (!!response && response.status === 200 && !!response.data) {
            setApiResponse(response.data);
        }

        console.log(response);
    }

    const generateToken = (): void => {
        appStore.setToken(randomString(30));
    }

    const randomString = (i: number): string => {
        let rnd = '';
        while (rnd.length < i)
            rnd += Math.random().toString(36).substring(2);
        return rnd.substring(0, i);
    };

    return (
        <Container className="Main p-0s">
            <h1>Main</h1>
            <Button
                variant={details ? "info" : "warning"}
                onClick={() => setDetails(!details)}
                className={"m-1"}
            >
                {details ? "Hide" : "Show"}
            </Button>
            {details && (
                <Container className="details">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi illo
                    sunt earum non, fugiat ullam magnam animi placeat laboriosam veniam
                    dolor? Ut, eius. Necessitatibus temporibus maiores architecto, odit
                    fuga ex!
                </Container>
            )}

            <Container></Container>

            <Button
                variant={"success"}
                onClick={() => apiGetTest()}
                className={"m-1"}
            >Api Get Test</Button>
            {!!apiResponse && <div>{apiResponse}</div>}


            <Container fluid className={"token mt-3 p-0"}>
                <div className={"w-100 m-1"}><Badge className={"Badge"} bg={"secondary"}>{appStore.userData.token}</Badge></div>
                <Button variant={"dark"} className={"m-1"} onClick={() => generateToken()}>TokenGen</Button>
            </Container>
        </Container>

    );
};

export default observer(Main);
