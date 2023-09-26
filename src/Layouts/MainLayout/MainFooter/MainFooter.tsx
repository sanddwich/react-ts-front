import {Badge, Container} from "react-bootstrap";
import "./MainFooter.scss";

interface MainFooterInterface {}

const MainFooter = (props: MainFooterInterface) => {
  return (
    <Container fluid className="MainFooter p-0 pb-2 d-flex justify-content-end">
        <div>
            <h4 className={"m-0"}>
                <Badge bg={'none'} className={"MainFooter__badge"}>@kiselevds</Badge>
            </h4>
        </div>
    </Container>
  );
};

export default MainFooter;
