import "./App.scss";
import { Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from "./AppRoutes/AppRoutes";

function App() {
  return (
    <Container fluid={true} className="App p-0">
      <AppRoutes />
    </Container>
  );
}

export default App;
