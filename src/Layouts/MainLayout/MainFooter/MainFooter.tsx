import { Container } from "react-bootstrap";
import "./MainFooter.scss";

interface MainFooterInterface {}

const MainFooter = (props: MainFooterInterface) => {
  return (
    <Container fluid className="MainFooter p-0">
      <h1>MainFooter</h1>
    </Container>
  );
};

export default MainFooter;
