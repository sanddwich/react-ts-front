import { Container } from "react-bootstrap";
import "./MainHeader.scss";

interface MainHeaderInterface {}

const MainHeader = (props: MainHeaderInterface) => {
  return (
    <Container fluid className="MainHeader p-0">
      <h1>MainHeader</h1>
    </Container>
  );
};

export default MainHeader;
