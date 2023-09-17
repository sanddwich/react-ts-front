import {useState} from "react";
import "./Main.scss";
import {Container, Button} from "react-bootstrap";
import axios from "axios";

interface MainInterface {
}

const Main = (props: MainInterface) => {
    const [details, setDetails] = useState(false);
    const apiAuthUrl = "http://localhost:8000/api/v1/auth/";
    // const apiAuthUrl = "https://fakestoreapi.com/products";

    const apiGetTest = async () => {
        const response = await axios.get(apiAuthUrl);
        console.log(response);
    }

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
        </Container>
    );
};

export default Main;
