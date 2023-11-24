import "./Main.scss";
import {Container, Button, Badge} from "react-bootstrap";
import {observer} from "mobx-react";

interface MainInterface {
}

const Main = (props: MainInterface) => {


    function calculateHandler() {
        console.log("a" && "" && "c");
        console.log("a" && "" || "c");
        console.log("" ?? "c");
    }

    return (
        <Container className={`Main mt-2`}>
            <Button
                variant={"dark"}
                className={`Main__button`}
                onClick={() => calculateHandler()}
            >
                Calculate
            </Button>
        </Container>
    );
};

export default observer(Main);
