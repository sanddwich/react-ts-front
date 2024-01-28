import "./Main.scss";
import {Container, Button, Badge, Row, Col} from "react-bootstrap";
import {observer} from "mobx-react";
import {useState} from "react";

interface MainInterface {
}

const Main = (props: MainInterface) => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const [param, setParam] = useState(0)

    function calculateHandler() {
        // console.log("a" && "" && "c");
        // console.log("a" && "" || "c");
        // console.log("" ?? "c");
        console.log("Type of NaN", typeof NaN);
        console.log([0, 1].concat([2, 3], [4, 5]));
        console.log("Что вернет выражение: ", "5" + 2);
        console.log("Какой метод используется для преобразования строки в число? ", Number("52.2"));
        console.log("" || [1]);
    }


    async function calculatePromise() {
        const result = await new Promise(async (resolve, reject) => {
            const resp = await fetch(url + "/1")
            resolve(resp.json())
        })
            .then(res => {
                console.log(res)
                return res
            })
            .then(async (res) => {
                let res2 = await fetch(url + "/2")
                res2 = await res2.json()
                return [res, res2]
            })
            .then()
            .catch(e => console.log(e.message));

        console.log(result)
    }

    function calculatePromise2() {
        setTimeout(() => {
            setParam(prev => prev + 1)
        }, 1000)

        setTimeout(() => {
            console.log(1)
        })

        new Promise((resolve, reject) => {
            console.log(2)
            resolve("")
        })
            .then(() => {
                new Promise((resolve, reject) => {
                    console.log(5)
                    resolve(1)
                })
                    .then(() => console.log(6)).catch()
                console.log(3)
            })
            .then(() => {
                console.log(4)
            })
            .then(() => {
                new Promise((resolve, reject) => {
                    setTimeout(() => console.log(7))
                }).then().catch()
            })
            .then(() => {
                console.log(8)
            })
            .catch(e => console.log(e.message));
    }

    function calculateHandler3() {
        const result = Promise.all([
            new Promise((resolve, reject) => {
                resolve(1)
            }).then(() => console.log(1)).catch(),

            new Promise((resolve, reject) => {
                resolve(1)
            }).then(() => console.log(2)).catch()
        ])
            .then(res => {
                console.log("res: ", res)
                console.log(3)
            })
            .catch()


        console.log("result: ", result)
    }

    const calculateHandler4 = async () => {
        const result = await new Promise((resolve, reject) => {
            const res = fetch(url + "/3")
            resolve(res)
        })
            .then(res => {
                // res = await res.json()
                console.log(res)
                // return(555)
            })
            .then()
            .catch()

        console.log(result)
    }

    return (
        <Container className={`Main mt-2`}>
            <Row className={`pb-2`}>
                <div>
                    <Button
                        variant={"dark"}
                        className={`Main__button1`}
                        onClick={() => calculateHandler()}
                    >
                        Calculate console
                    </Button>
                </div>
            </Row>
            <Row className={`pb-2`}>
                <div>
                    <Button
                        variant={"primary"}
                        className={`Main__button2`}
                        onClick={() => calculatePromise()}
                    >
                        Calculate Promises
                    </Button>
                </div>
            </Row>
            <Row className={`pb-2`}>
                <Col>
                    <div>
                        <Button
                            variant={"primary"}
                            className={`Main__button3`}
                            onClick={() => calculatePromise2()}
                        >
                            Calculate Promises 2
                        </Button>
                    </div>
                </Col>
                <Col>{param}</Col>
            </Row>
            <Row className={`pb-2`}>
                <div>
                    <Button
                        variant={"danger"}
                        className={`Main__button4`}
                        onClick={() => calculateHandler3()}
                    >
                        Calculate PromiseAll
                    </Button>
                </div>
            </Row>
            <Row className={`pb-2`}>
                <div>
                    <Button
                        variant={"success"}
                        className={`Main__button5`}
                        onClick={() => calculateHandler4()}
                    >
                        Calculate Promise THEN
                    </Button>
                </div>
            </Row>
        </Container>
    );
};

export default observer(Main);
